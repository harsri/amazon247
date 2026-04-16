require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function checkCounts() {
  try {
    const productCount = await prisma.product.count();
    const categoryCount = await prisma.category.count();
    console.log('✅ Total products:', productCount);
    console.log('✅ Total categories:', categoryCount);
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

checkCounts();
