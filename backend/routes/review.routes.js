const express = require('express');
const router = express.Router();
const { getReviews, addReview } = require('../controllers/review.controller');
const authMiddleware = require('../middlewares/auth.middleware');

router.get('/:productId', getReviews);
router.post('/:productId', authMiddleware, addReview);

module.exports = router;
