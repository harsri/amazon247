require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

async function listData() {
  try {
    const categories = await prisma.category.findMany();
    console.log('📁 Categories:');
    categories.forEach(cat => console.log(`   - ${cat.name} (${cat.id})`));
    
    console.log('\n📦 Products by category:');
    for (const cat of categories) {
      const count = await prisma.product.count({ where: { categoryId: cat.id } });
      console.log(`   ${cat.name}: ${count} products`);
    }

    const firstProducts = await prisma.product.findMany({ take: 5, select: { id: true, title: true, brand: true } });
    console.log('\n📝 First 5 products:');
    firstProducts.forEach(p => console.log(`   - ${p.id}. ${p.title} (${p.brand})`));
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await prisma.$disconnect();
  }
}

listData();
