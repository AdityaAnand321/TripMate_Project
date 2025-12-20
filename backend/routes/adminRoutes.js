const express = require('express');
const router = express.Router();
const adminCtrl = require('../controllers/adminController');
const auth = require('../middlewares/auth');
const requireAdmin = require('../middlewares/admin');

// Admin profile for current user
router.get('/me', auth, requireAdmin, adminCtrl.getMyProfile);
router.put('/me', auth, requireAdmin, adminCtrl.updateMyProfile);

// List admins
router.get('/', auth, requireAdmin, adminCtrl.listAdmins);

// Stats
router.get('/stats', auth, requireAdmin, adminCtrl.getStats);

// Trips CRUD
router.get('/trips', auth, requireAdmin, adminCtrl.listTrips);
router.post('/trips', auth, requireAdmin, adminCtrl.createTrip);
router.get('/trips/:id', auth, requireAdmin, adminCtrl.getTrip);
router.put('/trips/:id', auth, requireAdmin, adminCtrl.updateTrip);
router.delete('/trips/:id', auth, requireAdmin, adminCtrl.deleteTrip);

// Bookings management
router.get('/bookings', auth, requireAdmin, adminCtrl.listAllBookings);
router.put('/bookings/:email/:bookingId/status', auth, requireAdmin, adminCtrl.updateBookingStatus);

// User management
router.put('/users/:email/blocked', auth, requireAdmin, adminCtrl.setUserBlocked);
router.get('/users/:email', auth, requireAdmin, adminCtrl.getUserDetails);

module.exports = router;
