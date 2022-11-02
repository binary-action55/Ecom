const express = require('express');
const path = require('path');
const rootDirectory = require('../utils/rootDirectory');

const router = express.Router();
const productController = require(path.join(rootDirectory,'controller','product'));

router.get('/',productController.getAllProducts);
router.post('/',productController.addProduct);

module.exports = router;