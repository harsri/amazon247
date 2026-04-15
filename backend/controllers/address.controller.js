const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

const getAddresses = async (req, res) => {
  try {
    const addresses = await prisma.address.findMany({
      where: { userId: req.userId },
      orderBy: [{ isDefault: 'desc' }, { createdAt: 'desc' }]
    });
    res.status(200).json({ addresses });
  } catch (error) {
    console.error('Get Addresses Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const addAddress = async (req, res) => {
  try {
    const { fullName, phone, email, houseNo, addressLine1, addressLine2, city, state, pincode, landmark, addressType } = req.body;

    if (!fullName || !phone || !houseNo || !addressLine1 || !city || !state || !pincode) {
      return res.status(400).json({ error: 'Please fill all required fields.' });
    }

    // Check if this is the first address — auto-set as default
    const count = await prisma.address.count({ where: { userId: req.userId } });
    const isDefault = count === 0;

    const address = await prisma.address.create({
      data: {
        userId: req.userId,
        fullName,
        phone,
        email: email || '',
        houseNo,
        addressLine1,
        addressLine2: addressLine2 || '',
        city,
        state,
        pincode,
        landmark: landmark || '',
        addressType: addressType || 'HOME',
        isDefault
      }
    });

    res.status(201).json({ message: 'Address added successfully.', address });
  } catch (error) {
    console.error('Add Address Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const updateAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await prisma.address.findFirst({ where: { id: parseInt(id), userId: req.userId } });
    if (!existing) return res.status(404).json({ error: 'Address not found.' });

    const address = await prisma.address.update({
      where: { id: parseInt(id) },
      data: { ...req.body }
    });

    res.status(200).json({ message: 'Address updated.', address });
  } catch (error) {
    console.error('Update Address Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const setDefaultAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await prisma.address.findFirst({ where: { id: parseInt(id), userId: req.userId } });
    if (!existing) return res.status(404).json({ error: 'Address not found.' });

    // Unset all other defaults first
    await prisma.address.updateMany({
      where: { userId: req.userId },
      data: { isDefault: false }
    });

    const address = await prisma.address.update({
      where: { id: parseInt(id) },
      data: { isDefault: true }
    });

    res.status(200).json({ message: 'Default address updated.', address });
  } catch (error) {
    console.error('Set Default Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

const deleteAddress = async (req, res) => {
  try {
    const { id } = req.params;
    const existing = await prisma.address.findFirst({ where: { id: parseInt(id), userId: req.userId } });
    if (!existing) return res.status(404).json({ error: 'Address not found.' });

    await prisma.address.delete({ where: { id: parseInt(id) } });

    // If deleted was default, set the next one as default
    if (existing.isDefault) {
      const next = await prisma.address.findFirst({ where: { userId: req.userId }, orderBy: { createdAt: 'desc' } });
      if (next) await prisma.address.update({ where: { id: next.id }, data: { isDefault: true } });
    }

    res.status(200).json({ message: 'Address deleted.' });
  } catch (error) {
    console.error('Delete Address Error:', error);
    res.status(500).json({ error: 'Internal server error.' });
  }
};

module.exports = { getAddresses, addAddress, updateAddress, setDefaultAddress, deleteAddress };
