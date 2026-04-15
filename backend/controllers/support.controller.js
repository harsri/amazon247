const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const submitTicket = async (req, res) => {
  try {
    const { subject, message, category } = req.body;
    const userId = req.userId;

    if (!subject || !message) {
      return res.status(400).json({ error: 'Subject and message are required.' });
    }

    const ticket = await prisma.supportTicket.create({
      data: { userId, subject, message, category: category || 'Other' }
    });

    res.status(201).json({ message: 'Support ticket submitted successfully', ticket });
  } catch (error) {
    console.error('Submit Ticket Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const getMyTickets = async (req, res) => {
  try {
    const tickets = await prisma.supportTicket.findMany({
      where: { userId: req.userId },
      orderBy: { createdAt: 'desc' }
    });

    res.status(200).json({ tickets });
  } catch (error) {
    console.error("Get Tickets Error:", error);
    res.status(500).json({ error: "Internal server error." });
  }
};

module.exports = {
  submitTicket,
  getMyTickets
};
