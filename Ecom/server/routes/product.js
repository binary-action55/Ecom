const express = require('express');
const path = require('path');
const rootDirectory = require('../utils/rootDirectory');

const router = express.Router();
const productController = require(path.join(rootDirectory,'controller','product'));
const cartController = require(path.join(rootDirectory,'controller','cart'));
const orderController = require(path.join(rootDirectory,'controller','order'));

router.get('/',productController.getAllProducts);
router.post('/',productController.addProduct);
router.get('/cart',cartController.getCartItems);
router.post('/cart',cartController.addToCart);
router.get('/order',orderController.getOrders);

module.exports = router;