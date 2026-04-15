const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Categories
  const catElectronics = await prisma.category.upsert({
    where: { name: 'Electronics' },
    update: {},
    create: { name: 'Electronics', description: 'Gadgets, phones, laptops and more.' }
  });
  const catFashion = await prisma.category.upsert({
    where: { name: 'Fashion' },
    update: {},
    create: { name: 'Fashion', description: 'Clothing, footwear and accessories.' }
  });
  const catBooks = await prisma.category.upsert({
    where: { name: 'Books' },
    update: {},
    create: { name: 'Books', description: 'Novels, self-help, academics and more.' }
  });
  const catHome = await prisma.category.upsert({
    where: { name: 'Home & Kitchen' },
    update: {},
    create: { name: 'Home & Kitchen', description: 'Appliances, cookware and home decor.' }
  });

  const products = [
    {
      title: 'Amazon Echo Dot (5th Gen)',
      description: 'Meet Echo Dot — Our most popular smart speaker with Alexa. The sleek, compact design delivers crisp vocals and balanced bass for full sound. Control smart home devices, play music, check the news, set alarms and more.',
      features: JSON.stringify(['Built-in Alexa voice assistant', 'Improved audio quality with deeper bass', 'Connect to compatible smart home devices', 'Set timers, alarms and reminders hands-free', 'Ask Alexa questions and get instant answers']),
      brand: 'Amazon',
      price: 3499,
      stock: 100,
      ratings: 4.5,
      ratingCount: 1240,
      categoryId: catElectronics.id,
      images: [
        'https://m.media-amazon.com/images/I/61TXnbIiSAL._SL1000_.jpg',
        'https://m.media-amazon.com/images/I/71f2GN31SbL._SL1000_.jpg',
        'https://m.media-amazon.com/images/I/61XMdpQMK+L._SL1000_.jpg'
      ]
    },
    {
      title: 'Apple iPhone 15 Pro',
      description: 'iPhone 15 Pro is the first iPhone to feature an aerospace-grade titanium design, using the same alloy that spacecraft use for its strength-to-weight ratio. Titanium has one of the best strength-to-weight ratios of any metal, making these the lightest Pro models ever.',
      features: JSON.stringify(['A17 Pro chip with 6-core GPU', 'Pro camera system with 48MP main', 'Titanium design - lightest Pro ever', 'Action button for quick controls', 'USB-C with USB 3 speeds', 'Up to 29 hours video playback']),
      brand: 'Apple',
      price: 134900,
      stock: 50,
      ratings: 4.8,
      ratingCount: 3450,
      categoryId: catElectronics.id,
      images: [
        'https://m.media-amazon.com/images/I/815pMPa7VvL._SL1500_.jpg',
        'https://m.media-amazon.com/images/I/61q2WE6Y3dL._SL1500_.jpg',
        'https://m.media-amazon.com/images/I/719g3ljafQL._SL1500_.jpg'
      ]
    },
    {
      title: 'Sony WH-1000XM5 Wireless Headphones',
      description: 'Industry-leading noise canceling with Dual Noise Sensor technology. Next-level music with unprecedented sound quality from the Integrated Processor V1. Crystal clear hands-free calling with 4 beamforming microphones and precise voice pickup.',
      features: JSON.stringify(['Industry-leading noise cancellation', '30-hour battery life with quick charge', 'Multipoint connection for 2 devices', 'Touch sensor controls', 'Speak-to-chat technology', 'Foldable design for portability']),
      brand: 'Sony',
      price: 24990,
      stock: 25,
      ratings: 4.7,
      ratingCount: 892,
      categoryId: catElectronics.id,
      images: [
        'https://m.media-amazon.com/images/I/51aXvjzcukL._SL1500_.jpg',
        'https://m.media-amazon.com/images/I/6151+JoUFEL._SL1500_.jpg',
        'https://m.media-amazon.com/images/I/71o8Q5XJS5L._SL1500_.jpg'
      ]
    },
    {
      title: 'Samsung Galaxy Tab S9',
      description: 'Meet Galaxy Tab S9. The all-new brilliant display, powerful performance, and lasting battery life give you everything you need to work, create, and play. With S Pen included in the box and IP68 water and dust resistance.',
      features: JSON.stringify(['11-inch Dynamic AMOLED 2X display', 'Snapdragon 8 Gen 2 processor', 'S Pen included in box', 'IP68 water and dust resistant', '8400mAh battery', '256GB storage expandable via microSD']),
      brand: 'Samsung',
      price: 68999,
      stock: 30,
      ratings: 4.6,
      ratingCount: 567,
      categoryId: catElectronics.id,
      images: [
        'https://m.media-amazon.com/images/I/71AEjRRcGnL._SL1500_.jpg',
        'https://m.media-amazon.com/images/I/71FkyMmY4BL._SL1500_.jpg'
      ]
    },
    {
      title: "Men's Slim Fit Formal Shirt",
      description: "Premium quality slim fit formal shirt crafted from 100% pure cotton. Perfect for office wear, meetings and formal occasions. Wrinkle-resistant fabric that maintains its shape throughout the day.",
      features: JSON.stringify(['100% pure cotton fabric', 'Slim fit design', 'Machine washable', 'Wrinkle-resistant', 'Available in multiple colors', 'Full button-down front']),
      brand: 'Arrow',
      price: 1299,
      stock: 200,
      ratings: 4.2,
      ratingCount: 2310,
      categoryId: catFashion.id,
      images: [
        'https://m.media-amazon.com/images/I/71w3P5C0eSL._SY741_.jpg',
        'https://m.media-amazon.com/images/I/71Bv+2NorFL._SY741_.jpg'
      ]
    },
    {
      title: 'Running Sports Shoes',
      description: 'Lightweight and breathable running shoes designed for endurance athletes. The cushioned midsole provides energy return with every stride, while the durable rubber outsole ensures excellent traction on all surfaces.',
      features: JSON.stringify(['Lightweight mesh upper for breathability', 'EVA cushioned midsole', 'Rubber outsole with multi-directional grip', 'Padded collar and tongue', 'Standard lace-up closure', 'Suitable for gym, running and casual wear']),
      brand: 'Nike',
      price: 4999,
      stock: 150,
      ratings: 4.4,
      ratingCount: 1820,
      categoryId: catFashion.id,
      images: [
        'https://m.media-amazon.com/images/I/71w8R4NVanL._SY575_.jpg',
        'https://m.media-amazon.com/images/I/71GH4A+FUXL._SY575_.jpg'
      ]
    },
    {
      title: 'Atomic Habits by James Clear',
      description: 'No matter your goals, Atomic Habits offers a proven framework for improving—every day. James Clear, one of the world\'s leading experts on habit formation, reveals practical strategies that will teach you exactly how to form good habits, break bad ones, and master the tiny behaviors that lead to remarkable results.',
      features: JSON.stringify(['Paperback: 320 pages', 'Language: English', 'Publisher: Penguin Random House', 'Bestseller in Self-Help category', 'Named one of the best books of 2018', 'Over 15 million copies sold worldwide']),
      brand: 'Penguin',
      price: 399,
      stock: 80,
      ratings: 4.9,
      ratingCount: 45600,
      categoryId: catBooks.id,
      images: [
        'https://m.media-amazon.com/images/I/91bYsX41DVL._SL1500_.jpg',
        'https://m.media-amazon.com/images/I/81wgcld4wxL._SL1500_.jpg'
      ]
    },
    {
      title: 'The Alchemist',
      description: "Paulo Coelho's masterpiece tells the mystical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure. His quest will lead him to riches far different—and far more satisfying—than he ever imagined.",
      features: JSON.stringify(['Paperback: 208 pages', 'Language: English', 'Publisher: HarperCollins', 'Over 65 million copies sold', 'Translated into 80 languages', 'International bestseller']),
      brand: 'HarperCollins',
      price: 299,
      stock: 120,
      ratings: 4.7,
      ratingCount: 32100,
      categoryId: catBooks.id,
      images: [
        'https://m.media-amazon.com/images/I/71aFt4+OTOL._SL1360_.jpg'
      ]
    },
    {
      title: 'Philips Air Fryer HD9252',
      description: 'Cook your favourite fried food with up to 90% less fat. The Philips Air Fryer uses Rapid Air Technology to swiftly circulate hot air giving you great tasting results. Perfect for frying, baking, grilling and roasting.',
      features: JSON.stringify(['Up to 90% less fat than traditional frying', '4.1L XXL capacity, serves 4 people', 'Rapid Air Technology for faster cooking', 'Digital touchscreen with 7 presets', 'Dishwasher safe parts', '15-minute auto shut off']),
      brand: 'Philips',
      price: 7999,
      stock: 45,
      ratings: 4.3,
      ratingCount: 3780,
      categoryId: catHome.id,
      images: [
        'https://m.media-amazon.com/images/I/616u+NkVvdL._SL1500_.jpg',
        'https://m.media-amazon.com/images/I/61d+pDvqxQL._SL1500_.jpg'
      ]
    },
    {
      title: 'Milton Thermosteel Flip Lid Flask',
      description: 'Milton Thermosteel Flip Lid Flask keeps beverages hot for up to 24 hours and cold for up to 24 hours. Made from food-grade stainless steel, this flask is 100% leak proof and suitable for daily use, travel and outdoor activities.',
      features: JSON.stringify(['Keeps hot 24 hours, cold 24 hours', '1000ml capacity', 'Food-grade stainless steel', '100% leak-proof flip lid', 'Easy to clean wide mouth', 'BPA Free']),
      brand: 'Milton',
      price: 649,
      stock: 300,
      ratings: 4.5,
      ratingCount: 12400,
      categoryId: catHome.id,
      images: [
        'https://m.media-amazon.com/images/I/61i1JFBZJSL._SL1500_.jpg',
        'https://m.media-amazon.com/images/I/71j-d7Q8Z0L._SL1500_.jpg'
      ]
    }
  ];

  for (const prod of products) {
    const { images, ...prodData } = prod;
    const created = await prisma.product.create({ data: prodData });
    for (const url of images) {
      await prisma.productImage.create({ data: { productId: created.id, url } });
    }
  }

  // Pincodes (Indian)
  const pincodes = [
    { pincode: '110001', city: 'New Delhi', state: 'Delhi' },
    { pincode: '400001', city: 'Mumbai', state: 'Maharashtra' },
    { pincode: '560001', city: 'Bengaluru', state: 'Karnataka' },
    { pincode: '600001', city: 'Chennai', state: 'Tamil Nadu' },
    { pincode: '700001', city: 'Kolkata', state: 'West Bengal' },
    { pincode: '500001', city: 'Hyderabad', state: 'Telangana' },
    { pincode: '302001', city: 'Jaipur', state: 'Rajasthan' },
    { pincode: '380001', city: 'Ahmedabad', state: 'Gujarat' },
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
