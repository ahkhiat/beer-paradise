const express = require('express');
const router = express.Router();

const beerCtrl = require('../controllers/beer');

const auth = require('../middleware/auth');


router.post('/', auth, beerCtrl.createBeer );

router.get('/',auth, beerCtrl.getAllBeers);

router.get('/:id', auth, beerCtrl.getOneBeer);



module.exports = router;