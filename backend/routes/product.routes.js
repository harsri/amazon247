const express = require('express');
const router = express.Router();
const productController = require('../controllers/product.controller');

router.get('/', productController.getProducts);
router.get('/:id', productController.getProductById);
router.post('/pincode', productController.checkDeliverability);

module.exports = router;
