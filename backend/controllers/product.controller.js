const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getProducts = async (req, res) => {
  try {
    const { category, search, minPrice, maxPrice, sort } = req.query;

    const whereClause = {};

    if (category) {
      whereClause.category = { name: { contains: category } };
    }

    if (search) {
      whereClause.OR = [
        { title: { contains: search } },
        { description: { contains: search } },
        { brand: { contains: search } }
      ];
    }

    if (minPrice || maxPrice) {
      whereClause.price = {};
      if (minPrice) whereClause.price.gte = parseFloat(minPrice);
      if (maxPrice) whereClause.price.lte = parseFloat(maxPrice);
    }

    let orderBy = {};
    if (sort === 'price_asc') orderBy = { price: 'asc' };
    else if (sort === 'price_desc') orderBy = { price: 'desc' };
    else if (sort === 'rating_desc') orderBy = { ratings: 'desc' };

    const products = await prisma.product.findMany({
      where: whereClause,
      orderBy,
      include: {
        category: true,
        images: true
      }
    });

    res.status(200).json({ products });
  } catch (error) {
    console.error("Get Products Error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const getProductById = async (req, res) => {
  try {
    const { id } = req.params;

    const product = await prisma.product.findUnique({
      where: { id: parseInt(id) },
      include: {
        category: true,
        images: true
      }
    });

    if (!product) {
       return res.status(404).json({ error: "Product not found." });
    }

    res.status(200).json({ product });
  } catch (error) {
    console.error("Get Product By ID Error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

const checkDeliverability = async (req, res) => {
  try {
    const { pincode } = req.body;

    if (!pincode) {
      return res.status(400).json({ error: "Pincode is required." });
    }

    const deliverable = await prisma.deliverablePincode.findUnique({
      where: { pincode }
    });

    if (deliverable) {
      return res.status(200).json({ deliverable: true, message: `Delivery available to ${deliverable.city}, ${deliverable.state}` });
    } else {
      return res.status(200).json({ deliverable: false, message: "Delivery not available to this pincode." });
    }
  } catch (error) {
    console.error("Check Pincode Error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  getProducts,
  getProductById,
  checkDeliverability
};
