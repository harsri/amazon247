const { PrismaClient } = require('@prisma/client');
const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  const catElectronics = await prisma.category.upsert({
    where: { name: 'Electronics' }, update: {},
    create: { name: 'Electronics', description: 'Gadgets, phones, laptops and more.' }
  });
  const catFashion = await prisma.category.upsert({
    where: { name: 'Fashion' }, update: {},
    create: { name: 'Fashion', description: 'Clothing, footwear and accessories.' }
  });
  const catBooks = await prisma.category.upsert({
    where: { name: 'Books' }, update: {},
    create: { name: 'Books', description: 'Novels, self-help, academics and more.' }
  });
  const catHome = await prisma.category.upsert({
    where: { name: 'Home & Kitchen' }, update: {},
    create: { name: 'Home & Kitchen', description: 'Appliances, cookware and home decor.' }
  });

  const products = [
    {
      title: 'Amazon Echo Dot (5th Gen)',
      description: 'Meet Echo Dot — Our most popular smart speaker with Alexa. The sleek, compact design delivers crisp vocals and balanced bass for full sound.',
      features: JSON.stringify(['Built-in Alexa voice assistant', 'Improved audio quality with deeper bass', 'Smart home device control', 'Set timers and alarms hands-free', 'Stream music from Spotify, Amazon Music']),
      tags: 'smart speaker,alexa,echo,voice assistant,bluetooth speaker,wireless,amazon device',
      brand: 'Amazon', price: 3499, stock: 100, ratings: 4.5, ratingCount: 1240,
      categoryId: catElectronics.id,
      images: [
        'https://picsum.photos/seed/echo1/600/600',
        'https://picsum.photos/seed/echo2/600/600',
        'https://picsum.photos/seed/echo3/600/600'
      ]
    },
    {
      title: 'Apple iPhone 15 Pro',
      description: 'iPhone 15 Pro features aerospace-grade titanium design, A17 Pro chip, 48MP pro camera system, and USB-C with USB 3 speeds.',
      features: JSON.stringify(['A17 Pro chip with 6-core GPU', '48MP Main camera with optical zoom', 'Titanium design', 'Action button', 'USB-C with USB 3', 'Up to 29 hours video playback']),
      tags: 'iphone,apple,phone,mobile,smartphone,5g,camera phone,ios,titanium',
      brand: 'Apple', price: 134900, stock: 50, ratings: 4.8, ratingCount: 3450,
      categoryId: catElectronics.id,
      images: [
        'https://picsum.photos/seed/iphone1/600/600',
        'https://picsum.photos/seed/iphone2/600/600',
        'https://picsum.photos/seed/iphone3/600/600'
      ]
    },
    {
      title: 'Sony WH-1000XM5 Wireless Headphones',
      description: 'Industry-leading noise canceling headphones with Dual Noise Sensor technology. 30-hour battery life with quick charge.',
      features: JSON.stringify(['Industry-leading noise cancellation', '30-hour battery life', 'Multipoint connection', 'Touch sensor controls', 'Speak-to-chat', 'Foldable design']),
      tags: 'headphones,sony,wireless,bluetooth,noise cancelling,music,audio,over ear,anc',
      brand: 'Sony', price: 24990, stock: 25, ratings: 4.7, ratingCount: 892,
      categoryId: catElectronics.id,
      images: [
        'https://picsum.photos/seed/sony1/600/600',
        'https://picsum.photos/seed/sony2/600/600',
        'https://picsum.photos/seed/sony3/600/600'
      ]
    },
    {
      title: 'Samsung Galaxy Tab S9',
      description: 'Galaxy Tab S9 with Dynamic AMOLED 2X display, Snapdragon 8 Gen 2, S Pen included, and IP68 water resistance.',
      features: JSON.stringify(['11" Dynamic AMOLED 2X', 'Snapdragon 8 Gen 2', 'S Pen included', 'IP68 rated', '8400mAh battery', '256GB expandable storage']),
      tags: 'tablet,samsung,galaxy,android,s pen,drawing tablet,portable,computing',
      brand: 'Samsung', price: 68999, stock: 30, ratings: 4.6, ratingCount: 567,
      categoryId: catElectronics.id,
      images: [
        'https://picsum.photos/seed/tab1/600/600',
        'https://picsum.photos/seed/tab2/600/600'
      ]
    },
    {
      title: 'boAt Rockerz 450 Bluetooth Headphones',
      description: 'Wireless headphones with 40mm drivers, 15 hour battery, padded ear cushions. Ideal for gym, travel and daily commute.',
      features: JSON.stringify(['40mm dynamic drivers', '15 hours playback', 'Soft padded ear cushions', 'Lightweight 225g', 'Built-in mic for calls', 'Dual connectivity: BT+AUX']),
      tags: 'headphones,boat,bluetooth,wireless,budget,music,earphones,gym headphones',
      brand: 'boAt', price: 1299, stock: 200, ratings: 4.1, ratingCount: 18500,
      categoryId: catElectronics.id,
      images: [
        'https://picsum.photos/seed/boat1/600/600',
        'https://picsum.photos/seed/boat2/600/600'
      ]
    },
    {
      title: "Men's Slim Fit Formal Shirt",
      description: "Premium quality slim fit formal shirt crafted from 100% pure cotton. Wrinkle-resistant fabric suitable for offices and formal events.",
      features: JSON.stringify(['100% cotton', 'Slim fit', 'Machine washable', 'Wrinkle-resistant', 'Multiple colors', 'Full button-down']),
      tags: 'shirt,formal,mens,cotton,office wear,slim fit,clothing,fashion',
      brand: 'Arrow', price: 1299, stock: 200, ratings: 4.2, ratingCount: 2310,
      categoryId: catFashion.id,
      images: [
        'https://picsum.photos/seed/shirt1/600/600',
        'https://picsum.photos/seed/shirt2/600/600'
      ]
    },
    {
      title: 'Running Sports Shoes',
      description: 'Lightweight breathable running shoes with EVA cushioned midsole and rubber outsole for traction on all surfaces.',
      features: JSON.stringify(['Mesh upper for breathability', 'EVA midsole', 'Rubber outsole', 'Padded collar', 'Standard lace-up', 'Gym & running compatible']),
      tags: 'shoes,running,sports,nike,sneakers,gym shoes,footwear,athletic',
      brand: 'Nike', price: 4999, stock: 150, ratings: 4.4, ratingCount: 1820,
      categoryId: catFashion.id,
      images: [
        'https://picsum.photos/seed/shoes1/600/600',
        'https://picsum.photos/seed/shoes2/600/600'
      ]
    },
    {
      title: 'Atomic Habits by James Clear',
      description: 'A proven framework for improving every day. Practical strategies to form good habits, break bad ones, and master tiny behaviors.',
      features: JSON.stringify(['320 pages', 'English', 'Penguin Random House', 'Self-Help Bestseller', '15M+ copies sold']),
      tags: 'book,habits,self help,bestseller,james clear,productivity,life improvement',
      brand: 'Penguin', price: 399, stock: 80, ratings: 4.9, ratingCount: 45600,
      categoryId: catBooks.id,
      images: [
        'https://picsum.photos/seed/atomic1/600/600',
        'https://picsum.photos/seed/atomic2/600/600'
      ]
    },
    {
      title: 'The Alchemist by Paulo Coelho',
      description: "A mystical story of Santiago, an Andalusian shepherd boy who yearns to travel in search of a worldly treasure as extravagant as any ever found.",
      features: JSON.stringify(['208 pages', 'English', 'HarperCollins', '65M copies sold', '80 languages']),
      tags: 'book,novel,fiction,bestseller,paulo coelho,classic,spiritual,journey',
      brand: 'HarperCollins', price: 299, stock: 120, ratings: 4.7, ratingCount: 32100,
      categoryId: catBooks.id,
      images: [
        'https://picsum.photos/seed/alch1/600/600'
      ]
    },
    {
      title: 'Philips Air Fryer HD9252',
      description: 'Cook with up to 90% less fat. Rapid Air Technology for crispy results. 4.1L capacity, 7 presets, dishwasher safe parts.',
      features: JSON.stringify(['90% less fat', '4.1L capacity', 'Rapid Air Tech', '7 presets', 'Dishwasher safe', '15-min auto shut off']),
      tags: 'air fryer,kitchen,cooking,philips,healthy cooking,appliance,frying,baking',
      brand: 'Philips', price: 7999, stock: 45, ratings: 4.3, ratingCount: 3780,
      categoryId: catHome.id,
      images: [
        'https://picsum.photos/seed/fryer1/600/600',
        'https://picsum.photos/seed/fryer2/600/600'
      ]
    },
    {
      title: 'Milton Thermosteel Flask 1L',
      description: 'Keeps beverages hot/cold for 24 hours. 100% leak-proof, food-grade stainless steel, BPA free.',
      features: JSON.stringify(['Hot/Cold 24 hours', '1000ml', 'Stainless steel', 'Leak-proof', 'Wide mouth', 'BPA Free']),
      tags: 'flask,water bottle,thermos,steel,travel,hot water,cold water,insulated',
      brand: 'Milton', price: 649, stock: 300, ratings: 4.5, ratingCount: 12400,
      categoryId: catHome.id,
      images: [
        'https://picsum.photos/seed/flask1/600/600',
        'https://picsum.photos/seed/flask2/600/600'
      ]
    },
    {
      title: 'Realme Narzo 60 5G Smartphone',
      description: 'Powerful 5G smartphone with 6.4" AMOLED display, Dimensity 6100+, 50MP AI camera, 5000mAh battery with 33W fast charge.',
      features: JSON.stringify(['6.4" AMOLED display', 'Dimensity 6100+', '50MP AI camera', '5000mAh battery', '33W SUPERVOOC', '128GB storage']),
      tags: 'phone,mobile,smartphone,realme,5g,android,budget phone,camera phone',
      brand: 'Realme', price: 14999, stock: 75, ratings: 4.3, ratingCount: 6780,
      categoryId: catElectronics.id,
      images: [
        'https://picsum.photos/seed/realme1/600/600',
        'https://picsum.photos/seed/realme2/600/600'
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

  const pincodes = [
    { pincode: '110001', city: 'New Delhi', state: 'Delhi' },
    { pincode: '400001', city: 'Mumbai', state: 'Maharashtra' },
    { pincode: '560001', city: 'Bengaluru', state: 'Karnataka' },
    { pincode: '600001', city: 'Chennai', state: 'Tamil Nadu' },
    { pincode: '700001', city: 'Kolkata', state: 'West Bengal' },
    { pincode: '500001', city: 'Hyderabad', state: 'Telangana' },
    { pincode: '302001', city: 'Jaipur', state: 'Rajasthan' },
    { pincode: '380001', city: 'Ahmedabad', state: 'Gujarat' },
    { pincode: '226001', city: 'Lucknow', state: 'Uttar Pradesh' },
    { pincode: '834001', city: 'Ranchi', state: 'Jharkhand' },
  ];

  for (const pin of pincodes) {
    await prisma.deliverablePincode.upsert({ where: { pincode: pin.pincode }, update: {}, create: pin });
  }

  console.log('Seeding complete!');
}

main()
  .catch((e) => { console.error(e); process.exit(1); })
  .finally(async () => { await prisma.$disconnect(); });
