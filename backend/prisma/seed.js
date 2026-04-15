const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Create Categories
  const catElectronics = await prisma.category.upsert({
    where: { name: 'Electronics' },
    update: {},
    create: { name: 'Electronics', description: 'Gadgets, phones, and more.' }
  });

  const catFashion = await prisma.category.upsert({
    where: { name: 'Fashion' },
    update: {},
    create: { name: 'Fashion', description: 'Clothing and apparel.' }
  });

  const catBooks = await prisma.category.upsert({
    where: { name: 'Books' },
    update: {},
    create: { name: 'Books', description: 'Novels, biographies, academic.' }
  });

  // Create Products
  const products = [
    {
      title: 'Amazon Echo Dot',
      description: 'Smart speaker with Alexa.',
      price: 49.99,
      stock: 100,
      ratings: 4.5,
      categoryId: catElectronics.id,
    },
    {
      title: 'Apple iPhone 14 Pro',
      description: 'Latest Apple iPhone with dynamic island.',
      price: 999.00,
      stock: 50,
      ratings: 4.8,
      categoryId: catElectronics.id,
    },
    {
      title: 'Sony WH-1000XM5',
      description: 'Noise cancelling wireless headphones.',
      price: 348.00,
      stock: 25,
      ratings: 4.7,
      categoryId: catElectronics.id,
    },
    {
      title: 'Men\'s Casual T-Shirt',
      description: 'Comfortable cotton t-shirt.',
      price: 15.99,
      stock: 200,
      ratings: 4.2,
      categoryId: catFashion.id,
    },
    {
      title: 'The Great Gatsby',
      description: 'Classic novel by F. Scott Fitzgerald.',
      price: 10.99,
      stock: 80,
      ratings: 4.6,
      categoryId: catBooks.id,
    }
  ];

  for (const prod of products) {
    await prisma.product.create({
      data: prod
    });
  }

  // Create some pincodes
  const pincodes = [
    { pincode: '100001', city: 'New York', state: 'NY' },
    { pincode: '900001', city: 'Los Angeles', state: 'CA' },
    { pincode: '303001', city: 'Atlanta', state: 'GA' }
  ];

  for (const pin of pincodes) {
    await prisma.deliverablePincode.upsert({
      where: { pincode: pin.pincode },
      update: {},
      create: pin
    });
  }

  console.log('Seeding complete!');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
