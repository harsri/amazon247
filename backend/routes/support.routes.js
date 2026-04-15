const express = require('express');
const router = express.Router();
const supportController = require('../controllers/support.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.use(authMiddleware);

router.post('/', supportController.submitTicket);
router.get('/', supportController.getMyTickets);

module.exports = router;
