const express = require('express');
const router = express.Router();

const sodaCtrl = require('../controllers/soda');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');



router.get('/',auth , sodaCtrl.getAllSodas);
router.get('/:id', auth, sodaCtrl.getOneSoda);
router.post('/', auth, multer, sodaCtrl.createSoda );
// router.put('/:id', auth, multer, beerCtrl.modifyBeer);
// router.delete('/:id', auth, beerCtrl.deleteBeer);

module.exports = router;