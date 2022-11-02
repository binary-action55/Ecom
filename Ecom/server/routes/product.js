const express = require('express');
const path = require('path');
const rootDirectory = require('../utils/rootDirectory');

const router = express.Router();
const productController = require(path.join(rootDirectory,'controller','product'));
const cartController = require(path.join(rootDirectory,'controller','cart'));

router.get('/',productController.getAllProducts);
router.post('/',productController.addProduct);
router.get('/cart',cartController.getCartItems);
router.post('/cart',cartController.addToCart);

module.exports = router;