const Admin = require('../models/Admin');
const Trip = require('../models/Trip');
const User = require('../models/User');

exports.getMyProfile = async (req, res) => {
  if (!req.user || !req.user.id) return res.status(401).json({ message: 'Not authenticated' });
  const admin = await Admin.findOne({ userId: req.user.id }).lean();
  if (!admin) return res.status(404).json({ message: 'Admin profile not found' });
  res.json({ admin });
};

exports.updateMyProfile = async (req, res) => {
  if (!req.user || !req.user.id) return res.status(401).json({ message: 'Not authenticated' });
  const allowed = ['phone', 'department', 'permissions'];
  const update = {};
  for (const k of allowed) { if (req.body[k] !== undefined) update[k] = req.body[k]; }
  const admin = await Admin.findOneAndUpdate(
    { userId: req.user.id },
    { $set: update },
    { new: true }
  ).lean();
  if (!admin) return res.status(404).json({ message: 'Admin profile not found' });
  res.json({ admin });
};

exports.listAdmins = async (_req, res) => {
  const admins = await Admin.find({}).populate('userId', { password: 0 }).lean();
  res.json(admins || []);
};

// ---- Stats ----
exports.getStats = async (_req, res) => {
  const [users, trips] = await Promise.all([
    User.find({}, { bookings: 1 }).lean(),
    Trip.countDocuments(),
  ]);
  const totalUsers = users.length;
  const totalTrips = trips;
  let totalBookings = 0;
  let totalRevenue = 0;
  for (const u of users) {
    const list = Array.isArray(u.bookings) ? u.bookings : [];
    totalBookings += list.length;
    for (const b of list) {
      // expect booking to optionally have numeric price and paid flag
      const price = typeof b?.price === 'number' ? b.price : 0;
      const paid = !!b?.paid;
      if (paid) totalRevenue += price;
    }
  }
  res.json({ totalUsers, totalTrips, totalBookings, totalRevenue });
};

// ---- Trips CRUD ----
exports.listTrips = async (_req, res) => {
  const trips = await Trip.find({}).lean();
  res.json(trips || []);
};

exports.createTrip = async (req, res) => {
  const body = req.body || {};
  const trip = new Trip({
    destination: body.destination,
    price: body.price,
    duration: body.duration,
    seatsAvailable: body.seatsAvailable || 0,
    description: body.description || '',
    image: body.image || '',
    city: body.city || '',
    state: body.state || '',
  });
  await trip.save();
  res.status(201).json({ trip });
};

exports.updateTrip = async (req, res) => {
  const id = req.params.id;
  const allowed = ['destination','price','duration','seatsAvailable','description','image','city','state','completed'];
  const update = {};
  for (const k of allowed) { if (req.body[k] !== undefined) update[k] = req.body[k]; }
  const trip = await Trip.findByIdAndUpdate(id, { $set: update }, { new: true }).lean();
  if (!trip) return res.status(404).json({ message: 'Trip not found' });
  res.json({ trip });
};

exports.deleteTrip = async (req, res) => {
  const id = req.params.id;
  const ok = await Trip.findByIdAndDelete(id);
  if (!ok) return res.status(404).json({ message: 'Trip not found' });
  res.json({ ok: true });
};

exports.getTrip = async (req, res) => {
  const id = req.params.id;
  const trip = await Trip.findById(id).lean();
  if (!trip) return res.status(404).json({ message: 'Trip not found' });
  res.json({ trip });
};

// ---- Bookings management ----
exports.listAllBookings = async (_req, res) => {
  const users = await User.find({}, { email: 1, name: 1, bookings: 1 }).lean();
  const bookings = [];
  for (const u of users) {
    const list = Array.isArray(u.bookings) ? u.bookings : [];
    for (const b of list) {
      bookings.push({
        userEmail: u.email,
        userName: u.name,
        id: b.id,
        status: b.status || 'pending',
        paid: !!b.paid,
        price: typeof b.price === 'number' ? b.price : 0,
        booking: b.booking || b,
      });
    }
  }
  res.json(bookings);
};

exports.updateBookingStatus = async (req, res) => {
  const email = (req.params.email || '').toLowerCase();
  const bookingId = req.params.bookingId;
  const status = req.body && req.body.status;
  if (!status) return res.status(400).json({ message: 'status required' });
  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: 'User not found' });
  let changed = false;
  user.bookings = (Array.isArray(user.bookings) ? user.bookings : []).map((b) => {
    if (String(b.id) === String(bookingId)) {
      changed = true;
      return { ...b, status };
    }
    return b;
  });
  await user.save();
  if (!changed) return res.status(404).json({ message: 'Booking not found' });
  res.json({ ok: true });
};

// ---- User management ----
exports.setUserBlocked = async (req, res) => {
  const email = (req.params.email || '').toLowerCase();
  const blocked = !!(req.body && req.body.blocked);
  const user = await User.findOneAndUpdate(
    { email },
    { $set: { isBlocked: blocked } },
    { new: true, projection: { password: 0 } }
  ).lean();
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ user });
};

exports.getUserDetails = async (req, res) => {
  const email = (req.params.email || '').toLowerCase();
  const user = await User.findOne(
    { email },
    { password: 0 }
  ).lean();
  if (!user) return res.status(404).json({ message: 'User not found' });
  res.json({ user });
};
