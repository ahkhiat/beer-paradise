const express = require('express');
const router = express.Router();

const beerCtrl = require('../controllers/beer');

const auth = require('../middleware/auth');
const multer = require('../middleware/multer-config');
const validate = require('../middleware/validate-inputs');



router.get('/',auth, beerCtrl.getAllBeers);
router.get('/:id', auth, beerCtrl.getOneBeer);
router.post('/', auth, multer, validate.beer,  beerCtrl.createBeer );
router.put('/:id', auth, multer, validate.beer, beerCtrl.modifyBeer);
router.delete('/:id', auth, beerCtrl.deleteBeer);
router.post('/:id/like', auth, validate.id, beerCtrl.likeBeer);


module.exports = router;