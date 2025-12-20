const express = require('express');
const router = express.Router();

const userRoutes = require('./userRoutes');
const favRoutes = require('./favouritesRoutes');
const bookingsRoutes = require('./bookingsRoutes');
const adminRoutes = require('./adminRoutes');

router.use('/users', userRoutes);
router.use('/favourites', favRoutes);
router.use('/bookings', bookingsRoutes);
router.use('/admin', adminRoutes);

module.exports = router;
