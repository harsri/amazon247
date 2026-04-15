const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getWishlist = async (req, res) => {
  try {
    const wishlist = await prisma.wishlistItem.findMany({
      where: { userId: req.userId },
      include: {
        product: {
           include: {
              images: true
           }
        }
      }
    });

    res.status(200).json({ wishlistItems: wishlist });
  } catch (error) {
    console.error("Get Wishlist Error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const addToWishlist = async (req, res) => {
  try {
    const { productId } = req.body;
    const userId = req.userId;

    const existingItem = await prisma.wishlistItem.findUnique({
      where: {
        userId_productId: {
          userId,
          productId
        }
      }
    });

    if (existingItem) {
      return res.status(400).json({ error: "Item already in wishlist." });
    }

    const newItem = await prisma.wishlistItem.create({
      data: {
        userId,
        productId
      }
    });

    res.status(201).json({ message: "Added to wishlist", item: newItem });
  } catch (error) {
    console.error("Add to Wishlist Error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const removeFromWishlist = async (req, res) => {
  try {
    const { id } = req.params;

    await prisma.wishlistItem.delete({
      where: { id: parseInt(id) }
    });

    res.status(200).json({ message: "Item removed from wishlist" });
  } catch (error) {
    console.error("Remove from Wishlist Error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  getWishlist,
  addToWishlist,
  removeFromWishlist
};
