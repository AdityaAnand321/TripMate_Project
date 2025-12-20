const express = require('express');
const router = express.Router();
const userCtrl = require('../controllers/userController');
const auth = require('../middlewares/auth');
const requireAdmin = require('../middlewares/admin');

// Admin-only: list all users
router.get('/', auth, requireAdmin, userCtrl.listUsers);
router.post('/', userCtrl.signup);
router.post('/login', userCtrl.login);
router.get('/me', require('../middlewares/auth'), userCtrl.me);
router.post('/logout', userCtrl.logout);
router.put('/:email', auth, userCtrl.updateProfile);

module.exports = router;
