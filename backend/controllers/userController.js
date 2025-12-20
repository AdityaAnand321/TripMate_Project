const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const JWT_SECRET = process.env.JWT_SECRET || 'dev-secret-change-me';

function getAdminEmailSet() {
  const raw = process.env.ADMIN_EMAILS || '';
  return new Set(
    raw
      .split(',')
      .map((s) => s.trim().toLowerCase())
      .filter(Boolean)
  );
}

exports.listUsers = async (req, res) => {
  const users = await User.find({}, { password: 0 }).lean();
  res.json(users || []);
};

exports.signup = async (req, res) => {
  const { name, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ message: 'email and password required' });
  const exists = await User.findOne({ email: email.toLowerCase() });
  if (exists) return res.status(409).json({ message: 'User already exists' });
  const hashed = await bcrypt.hash(password, 8);
  // Admin account creation via signup is disabled; all signups are standard users
  const user = new User({ name: name || '', email: email.toLowerCase(), password: hashed, isAdmin: false });
  await user.save();
  const safe = { id: user._id, name: user.name, email: user.email, isAdmin: !!user.isAdmin };
  res.status(201).json({ user: safe });
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  const user = await User.findOne({ email: (email || '').toLowerCase() });
  if (!user) return res.status(401).json({ message: 'Invalid credentials' });
  if (user.isBlocked) return res.status(403).json({ message: 'Account blocked. Contact support.' });
  const ok = await bcrypt.compare(password, user.password);
  if (!ok) return res.status(401).json({ message: 'Invalid credentials' });
  const adminEmails = getAdminEmailSet();
  const isAdmin = !!user.isAdmin || adminEmails.has(String(user.email).toLowerCase());
  const token = jwt.sign(
    { email: user.email, id: user._id, name: user.name, isAdmin },
    JWT_SECRET,
    { expiresIn: '12h' }
  );
  // set token as HttpOnly cookie
  res.cookie('token', token, { httpOnly: true, sameSite: 'lax' });
  const safe = { id: user._id, name: user.name, email: user.email, isAdmin };
  // Update admin lastLogin if applicable
  if (isAdmin) {
    try {
      const Admin = require('../models/Admin');
      await Admin.findOneAndUpdate(
        { userId: user._id },
        { $set: { lastLogin: new Date() } },
        { upsert: true }
      );
    } catch (e) {
      console.error('Failed to update admin lastLogin', e);
    }
  }
  res.json({ user: safe });
};

exports.me = async (req, res) => {
  if (!req.user) return res.status(401).json({ message: 'Not authenticated' });
  const user = await User.findOne({ email: req.user.email }, { password: 0 }).lean();
  if (!user) return res.status(404).json({ message: 'User not found' });
  const adminEmails = getAdminEmailSet();
  const isAdmin = !!user.isAdmin || adminEmails.has(String(user.email).toLowerCase());
  user.isAdmin = isAdmin;
  res.json({ user });
};

exports.logout = async (req, res) => {
  res.clearCookie('token');
  res.json({ ok: true });
};

exports.updateProfile = async (req, res) => {
  const email = (req.params.email || '').toLowerCase();
  const tokenEmail = (req.user && req.user.email || '').toLowerCase();
  if (email !== tokenEmail) return res.status(403).json({ message: 'Forbidden' });
  const allowed = ['name', 'phone', 'country', 'city', 'avatar'];
  const update = {};
  for (const k of allowed) { if (req.body[k] !== undefined) update[k] = req.body[k]; }
  const user = await User.findOneAndUpdate({ email }, { $set: update }, { new: true, projection: { password: 0 } });
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ user });
};
