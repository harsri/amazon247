const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const placeOrder = async (req, res) => {
  const { address, paymentMethod } = req.body;
  const userId = req.userId;

  if (!address || !paymentMethod) {
    return res.status(400).json({ error: "Address and payment method are required." });
  }

  try {
    const result = await prisma.$transaction(async (tx) => {
      // 1. Get user's cart items
      const cartItems = await tx.cartItem.findMany({
        where: { userId },
        include: { product: true }
      });

      if (cartItems.length === 0) {
        throw new Error("Cart is empty");
      }

      let totalAmount = 0;

      // 2. Validate stock and calculate total
      for (const item of cartItems) {
        if (item.product.stock < item.quantity) {
          throw new Error(`Product ${item.product.title} is out of stock or insufficient quantity.`);
        }
        totalAmount += item.product.price * item.quantity;
      }

      // 3. Create the order
      const order = await tx.order.create({
        data: {
          userId,
          totalAmount,
          address,
          paymentMethod,
          status: "PENDING",
        }
      });

      // 4. Create order items and decrement stock
      for (const item of cartItems) {
        await tx.orderItem.create({
          data: {
            orderId: order.id,
            productId: item.productId,
            quantity: item.quantity,
            price: item.product.price
          }
        });

        await tx.product.update({
          where: { id: item.productId },
          data: { stock: { decrement: item.quantity } }
        });
      }

      // 5. Clear the cart
      await tx.cartItem.deleteMany({
        where: { userId }
      });

      return order;
    });

    res.status(201).json({ message: "Order placed successfully", order: result });
  } catch (error) {
    console.error("Place Order Error:", error);
    res.status(400).json({ error: error.message || "Failed to place order." });
  }
};

const getOrders = async (req, res) => {
  try {
    const orders = await prisma.order.findMany({
      where: { userId: req.userId },
      include: {
        orderItems: {
          include: {
             product: true
          }
        }
      },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json({ orders });
  } catch (error) {
    console.error("Get Orders Error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  placeOrder,
  getOrders
};
