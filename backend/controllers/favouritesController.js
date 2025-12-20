const User = require('../models/User');

exports.getFavourites = async (req, res) => {
  
  const email = (req.params.email || '').toLowerCase();
  
  const tokenEmail = (req.user && req.user.email || '').toLowerCase();
  
  if (email !== tokenEmail) return res.status(403).json({ message: 'Forbidden' });
  
  const user = await User.findOne({ email }, { favourites: 1 }).lean();
  
  res.json((user && user.favourites) || []);
};

exports.setFavourites = async (req, res) => {
  
  const email = (req.params.email || '').toLowerCase();
  
  const tokenEmail = (req.user && req.user.email || '').toLowerCase();
  
  if (email !== tokenEmail) return res.status(403).json({ message: 'Forbidden' });
  
  const list = req.body || [];
  
  const user = await User.findOneAndUpdate({ email }, { $set: { favourites: list } }, { new: true, projection: { favourites: 1 } });
  
  if (!user) return res.status(404).json({ message: 'User not found' });
  
  res.json(user.favourites || []);
  
};
