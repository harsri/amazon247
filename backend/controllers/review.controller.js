const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getReviews = async (req, res) => {
  try {
    const { productId } = req.params;
    const reviews = await prisma.review.findMany({
      where: { productId: parseInt(productId) },
      include: { user: { select: { id: true, name: true } } },
      orderBy: { createdAt: 'desc' }
    });
    res.status(200).json({ reviews });
  } catch (error) {
    console.error('Get Reviews Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const addReview = async (req, res) => {
  try {
    const { productId } = req.params;
    const { rating, comment } = req.body;

    if (!rating || !comment) {
      return res.status(400).json({ error: 'Rating and comment are required.' });
    }
    if (rating < 1 || rating > 5) {
      return res.status(400).json({ error: 'Rating must be between 1 and 5.' });
    }

    const review = await prisma.review.upsert({
      where: { userId_productId: { userId: req.userId, productId: parseInt(productId) } },
      update: { rating: parseInt(rating), comment },
      create: { userId: req.userId, productId: parseInt(productId), rating: parseInt(rating), comment }
    });

    // Recalculate product average rating
    const aggregate = await prisma.review.aggregate({
      where: { productId: parseInt(productId) },
      _avg: { rating: true },
      _count: { rating: true }
    });

    await prisma.product.update({
      where: { id: parseInt(productId) },
      data: {
        ratings: parseFloat((aggregate._avg.rating || 0).toFixed(1)),
        ratingCount: aggregate._count.rating
      }
    });

    res.status(201).json({ message: 'Review submitted successfully.', review });
  } catch (error) {
    console.error('Add Review Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = { getReviews, addReview };
