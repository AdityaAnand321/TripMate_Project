function requireAdmin(req, res, next) {
  const user = req.user;
  if (!user) return res.status(401).json({ message: 'Not authenticated' });
  if (!user.isAdmin) return res.status(403).json({ message: 'Admin only' });
  next();
}

module.exports = requireAdmin;
