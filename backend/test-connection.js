require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient({
  log: ['query', 'error', 'warn'],
});

async function test() {
  try {
    console.log('Testing connection...');
    const categories = await prisma.category.findMany();
    console.log('✅ Query successful! Found categories:', categories.length);
  } catch (error) {
    console.error('❌ Error:', error);
  } finally {
    await prisma.$disconnect();
    console.log('Connection closed');
  }
}

test();
