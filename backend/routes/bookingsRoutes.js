const express = require('express');
const router = express.Router();
const bookingsCtrl = require('../controllers/bookingsController');
const auth = require('../middlewares/auth');

router.get('/:email', auth, bookingsCtrl.getBookings);
router.put('/:email', auth, bookingsCtrl.setBookings);

module.exports = router;
