const express = require('express');
const router = express.Router();
const { getAddresses, addAddress, updateAddress, setDefaultAddress, deleteAddress } = require('../controllers/address.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.use(authMiddleware);

router.get('/', getAddresses);
router.post('/', addAddress);
router.put('/:id', updateAddress);
router.put('/:id/default', setDefaultAddress);
router.delete('/:id', deleteAddress);

module.exports = router;
