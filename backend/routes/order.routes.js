const express = require('express');
const router = express.Router();
const { placeOrder, getOrders, requestReturn } = require('../controllers/order.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.use(authMiddleware);

router.get('/', getOrders);
router.post('/', placeOrder);
router.put('/:id/return', requestReturn);

module.exports = router;
