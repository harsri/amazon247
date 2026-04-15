const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getWishlist = async (req, res) => {
  try {
    const wishlist = await prisma.wishlistItem.findMany({
      where: { userId: req.userId },
      include: {
        product: {
          include: { images: true, category: true }
        }
      }
    });
    res.status(200).json({ wishlistItems: wishlist });
  } catch (error) {
    console.error('Get Wishlist Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

// Toggle: add if not wishlisted, remove if already wishlisted
const toggleWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.userId;

    const existing = await prisma.wishlistItem.findUnique({
      where: { userId_productId: { userId, productId } }
    });

    if (existing) {
      await prisma.wishlistItem.delete({ where: { id: existing.id } });
      return res.status(200).json({ message: 'Removed from wishlist', action: 'removed' });
    }

    const newItem = await prisma.wishlistItem.create({
      data: { userId, productId }
    });
    res.status(201).json({ message: 'Added to wishlist', action: 'added', item: newItem });
  } catch (error) {
    console.error('Toggle Wishlist Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { id } = req.params;
    await prisma.wishlistItem.delete({ where: { id: parseInt(id) } });
    res.status(200).json({ message: 'Item removed from wishlist' });
  } catch (error) {
    console.error('Remove from Wishlist Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = { getWishlist, toggleWishlist, removeFromWishlist };
