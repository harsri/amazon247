const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function main() {
  try {
    console.log('Testing Prisma connection...');
    
    // Test connection
    await prisma.$queryRaw`SELECT 1`;
    console.log('✅ Database connection successful!');
    
    // Check existing categories
    const categories = await prisma.category.findMany();
    console.log(`✅ Found ${categories.length} categories`);
    
    // Check existing products
    const productCount = await prisma.product.count();
    console.log(`✅ Found ${productCount} products`);
    
  } catch (error) {
    console.error('❌ Error occurred:', error.message);
    console.error('Full error:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
