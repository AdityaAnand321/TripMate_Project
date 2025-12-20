const express = require('express');
const router = express.Router();
const favCtrl = require('../controllers/favouritesController');
const auth = require('../middlewares/auth');

router.get('/:email', auth, favCtrl.getFavourites);
router.put('/:email', auth, favCtrl.setFavourites);

module.exports = router;
