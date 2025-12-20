const User = require('../models/User');

exports.getBookings = async (req, res) => {
  
  const email = (req.params.email || '').toLowerCase();
  
  const tokenEmail = (req.user && req.user.email || '').toLowerCase();
  
  if (email !== tokenEmail) return res.status(403).json({ message: 'Forbidden' });
  
  const user = await User.findOne({ email }, { bookings: 1 }).lean();
  
  res.json((user && user.bookings) || []);
};

exports.setBookings = async (req, res) => {
  const email = (req.params.email || '').toLowerCase();

  const tokenEmail = (req.user && req.user.email || '').toLowerCase();
  
  if (email !== tokenEmail) return res.status(403).json({ message: 'Forbidden' });
  
  const list = req.body || [];
  
  const user = await User.findOneAndUpdate({ email }, { $set: { bookings: list } }, { new: true, projection: { bookings: 1 } });
  
  
  if (!user) return res.status(404).json({ message: 'User not found' });

  res.json(user.bookings || []);
};




