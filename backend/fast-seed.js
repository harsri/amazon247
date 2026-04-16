require('dotenv').config();
const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

// Helper function
const getRandomStock = () => Math.floor(Math.random() * 96) + 5;
const img = (seed) => `https://picsum.photos/seed/${seed}/400/400`;

// All product data (exact same as seed.js)
const allProductsData = {
  electronics: [
    { title: 'Apple iPhone 15 Pro (256GB) - Natural Titanium', description: 'iPhone 15 Pro with A17 Pro chip, 48MP camera system, titanium design, Action button, USB-C.', features: JSON.stringify(['A17 Pro chip','48MP Main camera','Titanium design','USB-C','Action button']), tags: 'iphone,apple,phone,mobile,smartphone,5g,camera,titanium,ios', brand: 'Apple', price: 134900, stock: 50, ratings: 4.8, ratingCount: 34500 },
    { title: 'Samsung Galaxy S24 Ultra 5G (12GB/256GB)', description: 'Galaxy AI powered flagship with 200MP camera, S Pen, Snapdragon 8 Gen 3, 6.8" QHD+ AMOLED.', features: JSON.stringify(['200MP camera','Galaxy AI','S Pen built-in','Snapdragon 8 Gen 3','5000mAh battery']), tags: 'samsung,galaxy,phone,mobile,5g,android,camera,ai', brand: 'Samsung', price: 129999, stock: 40, ratings: 4.7, ratingCount: 22100 },
    { title: 'OnePlus 12 5G (16GB/256GB) - Silky Black', description: 'Flagship killer with Snapdragon 8 Gen 3, 50MP Hasselblad camera, 100W SUPERVOOC, 2K ProXDR display.', features: JSON.stringify(['Snapdragon 8 Gen 3','Hasselblad camera','100W charging','2K display','OxygenOS 14']), tags: 'oneplus,phone,mobile,5g,android,fast charging,hasselblad', brand: 'OnePlus', price: 64999, stock: 60, ratings: 4.5, ratingCount: 15600 },
    { title: 'Realme Narzo 60 5G (6GB/128GB)', description: '5G smartphone with 6.4" AMOLED, Dimensity 6100+, 50MP AI camera, 5000mAh, 33W fast charge.', features: JSON.stringify(['6.4" AMOLED','Dimensity 6100+','50MP camera','5000mAh','33W charging']), tags: 'realme,phone,budget,5g,android,mobile', brand: 'Realme', price: 14999, stock: 100, ratings: 4.3, ratingCount: 8900 },
    { title: 'Redmi Note 13 Pro+ 5G (8GB/256GB)', description: '200MP OIS camera, 120W HyperCharge, 6.67" AMOLED 120Hz, Dimensity 7200 Ultra.', features: JSON.stringify(['200MP OIS camera','120W HyperCharge','6.67" AMOLED 120Hz','Dimensity 7200 Ultra','IP68']), tags: 'redmi,xiaomi,phone,mobile,5g,android,camera,budget', brand: 'Redmi', price: 29999, stock: 80, ratings: 4.4, ratingCount: 19200 },
    { title: 'Apple MacBook Air M2 (8GB/256GB)', description: '13.6" Liquid Retina display, Apple M2 chip, 18-hour battery, MagSafe charging, fanless design.', features: JSON.stringify(['Apple M2 chip','13.6" Liquid Retina','18hr battery','8GB unified memory','MagSafe']), tags: 'macbook,apple,laptop,m2,ultrabook,thin,lightweight', brand: 'Apple', price: 99900, stock: 30, ratings: 4.8, ratingCount: 12400 },
    { title: 'HP Pavilion 15 (i5/16GB/512GB SSD)', description: '15.6" FHD IPS, Intel i5-1335U, 16GB DDR4, 512GB SSD, Windows 11, backlit keyboard.', features: JSON.stringify(['Intel i5-1335U','16GB DDR4','512GB SSD','15.6" FHD IPS','Windows 11']), tags: 'hp,laptop,windows,i5,pavilion,student,office', brand: 'HP', price: 54990, stock: 45, ratings: 4.3, ratingCount: 6700 },
    { title: 'Lenovo IdeaPad Slim 3 (Ryzen 5/8GB/512GB)', description: '15.6" FHD, AMD Ryzen 5 7530U, 8GB RAM, 512GB SSD, thin & light design.', features: JSON.stringify(['AMD Ryzen 5 7530U','8GB RAM','512GB SSD','15.6" FHD','Thin & Light']), tags: 'lenovo,laptop,amd,ryzen,ideapad,student,budget laptop', brand: 'Lenovo', price: 42990, stock: 55, ratings: 4.2, ratingCount: 5400 },
    { title: 'Sony WH-1000XM5 Wireless Headphones', description: 'Industry-leading ANC, 30-hour battery, multipoint, speak-to-chat, Hi-Res Audio.', features: JSON.stringify(['Industry-leading ANC','30hr battery','Multipoint','Hi-Res Audio','Touch controls']), tags: 'headphones,sony,wireless,bluetooth,anc,noise cancelling,audio', brand: 'Sony', price: 24990, stock: 35, ratings: 4.7, ratingCount: 8900 },
    { title: 'boAt Rockerz 450 Bluetooth Headphones', description: '40mm drivers, 15hr battery, padded cushions, built-in mic. Budget wireless headphones.', features: JSON.stringify(['40mm drivers','15hr playback','Built-in mic','Dual connectivity','Lightweight']), tags: 'boat,headphones,bluetooth,wireless,budget,audio,gym', brand: 'boAt', price: 1299, stock: 200, ratings: 4.1, ratingCount: 45600 },
    { title: 'Apple AirPods Pro (2nd Generation) with USB-C', description: 'Active Noise Cancellation, Adaptive Transparency, Personalised Spatial Audio, USB-C charging.', features: JSON.stringify(['Active Noise Cancellation','Adaptive Transparency','Spatial Audio','USB-C','6hr battery']), tags: 'airpods,apple,earbuds,wireless,anc,bluetooth,tws', brand: 'Apple', price: 24900, stock: 40, ratings: 4.7, ratingCount: 18700 },
    { title: 'Samsung Galaxy Watch 6 Classic (47mm)', description: 'Rotating bezel, AMOLED display, BioActive Sensor, GPS, Wear OS by Google.', features: JSON.stringify(['Rotating bezel','AMOLED display','BioActive Sensor','GPS','Wear OS']), tags: 'smartwatch,samsung,galaxy,watch,fitness,health,gps', brand: 'Samsung', price: 34999, stock: 25, ratings: 4.5, ratingCount: 3200 },
    { title: 'Fire TV Stick 4K Max (2nd Gen)', description: 'Stream in 4K with Wi-Fi 6E, Alexa Voice Remote, Dolby Vision & Atmos.', features: JSON.stringify(['4K Ultra HD','Wi-Fi 6E','Dolby Vision','Dolby Atmos','Alexa Remote']), tags: 'fire tv,amazon,streaming,4k,alexa,entertainment', brand: 'Amazon', price: 6499, stock: 150, ratings: 4.4, ratingCount: 28900 },
    { title: 'Amazon Echo Dot (5th Gen) Smart Speaker', description: 'Compact smart speaker with Alexa. Improved audio, smart home control, routines.', features: JSON.stringify(['Alexa built-in','Improved bass','Smart home hub','Music streaming','Timers & alarms']), tags: 'echo,alexa,smart speaker,amazon,bluetooth,voice assistant', brand: 'Amazon', price: 3499, stock: 100, ratings: 4.5, ratingCount: 42100 },
    { title: 'JBL Charge 5 Portable Bluetooth Speaker', description: 'Powerful JBL Original Pro Sound, IP67 waterproof, 20-hour playtime, built-in powerbank.', features: JSON.stringify(['JBL Original Pro Sound','IP67','20hr playtime','Built-in powerbank','Dual bass radiators']), tags: 'jbl,speaker,bluetooth,portable,waterproof,outdoor,party', brand: 'JBL', price: 14999, stock: 40, ratings: 4.6, ratingCount: 11200 },
    { title: 'Canon EOS R50 Mirrorless Camera (Body Only)', description: '24.2MP APS-C CMOS, 4K video, 15fps continuous shooting, Eye Detection AF.', features: JSON.stringify(['24.2MP APS-C','4K video','Eye Detection AF','15fps shooting','Wi-Fi/Bluetooth']), tags: 'camera,canon,mirrorless,photography,4k,dslr', brand: 'Canon', price: 65990, stock: 15, ratings: 4.6, ratingCount: 1800 },
    { title: 'Logitech MX Master 3S Wireless Mouse', description: 'Precision 8K DPI sensor, quiet clicks, MagSpeed scroll, USB-C, works on glass.', features: JSON.stringify(['8K DPI sensor','Quiet clicks','MagSpeed scroll','USB-C charging','Multi-device']), tags: 'mouse,logitech,wireless,ergonomic,office,productivity', brand: 'Logitech', price: 8995, stock: 50, ratings: 4.7, ratingCount: 7600 },
    { title: 'Samsung 980 PRO 1TB NVMe SSD', description: 'PCIe Gen 4.0 x4, up to 7000MB/s read speed. For gaming PCs and creative workstations.', features: JSON.stringify(['1TB capacity','7000MB/s read','PCIe Gen 4.0','NVMe','5-year warranty']), tags: 'ssd,samsung,storage,nvme,pcie,gaming,computer', brand: 'Samsung', price: 7999, stock: 60, ratings: 4.8, ratingCount: 14300 },
    { title: 'Anker 737 Power Bank (24000mAh, 140W)', description: '140W bidirectional charging, smart display, PowerIQ 3.0, charges laptops.', features: JSON.stringify(['24000mAh','140W output','Smart display','USB-C + USB-A','Laptop charging']), tags: 'power bank,anker,charger,portable,usb-c,travel,battery', brand: 'Anker', price: 8999, stock: 45, ratings: 4.5, ratingCount: 5400 },
    { title: 'Apple iPad 10th Gen (64GB, Wi-Fi)', description: '10.9" Liquid Retina, A14 Bionic chip, 12MP cameras, USB-C, Touch ID.', features: JSON.stringify(['10.9" Liquid Retina','A14 Bionic','12MP cameras','USB-C','Touch ID']), tags: 'ipad,apple,tablet,drawing,student,a14,portable', brand: 'Apple', price: 33900, stock: 35, ratings: 4.6, ratingCount: 9800 },
    { title: 'Dell UltraSharp U2723QE 27" 4K Monitor', description: 'IPS Black tech, 4K UHD, USB-C hub, 98% DCI-P3, HDR 400, factory calibrated.', features: JSON.stringify(['27" 4K UHD','IPS Black','USB-C hub','98% DCI-P3','HDR 400']), tags: 'monitor,dell,4k,ultrasharp,usb-c,office,design', brand: 'Dell', price: 52990, stock: 20, ratings: 4.7, ratingCount: 3100 },
    { title: 'Noise ColorFit Pro 5 Smartwatch', description: '1.85" AMOLED, Bluetooth calling, 100+ sports modes, SpO2, heart rate, 7-day battery.', features: JSON.stringify(['1.85" AMOLED','Bluetooth calling','100+ sport modes','SpO2','7-day battery']), tags: 'smartwatch,noise,fitness,health,budget,calling watch', brand: 'Noise', price: 2999, stock: 120, ratings: 4.2, ratingCount: 22100 },
    { title: 'Zebronics Zeb-Transformer Gaming Keyboard', description: 'RGB mechanical feel, anti-ghosting, braided cable, multimedia keys, durable build.', features: JSON.stringify(['RGB backlit','Anti-ghosting','Braided cable','Multimedia keys','Plug & play']), tags: 'keyboard,gaming,rgb,zebronics,mechanical,budget,computer', brand: 'Zebronics', price: 799, stock: 180, ratings: 4.0, ratingCount: 18900 },
    { title: 'TP-Link Archer AX73 Wi-Fi 6 Router', description: 'AX5400 dual-band, 6 antennas, OFDMA, MU-MIMO, USB 3.0, HomeShield security.', features: JSON.stringify(['AX5400 dual-band','Wi-Fi 6','6 antennas','MU-MIMO','USB 3.0']), tags: 'router,tp-link,wifi 6,networking,internet,home network', brand: 'TP-Link', price: 7999, stock: 30, ratings: 4.4, ratingCount: 6700 },
    { title: 'Kindle Paperwhite (16GB) 2024', description: '6.8" glare-free display, adjustable warm light, up to 10 weeks battery, IPX8.', features: JSON.stringify(['6.8" 300ppi display','Adjustable warm light','10 weeks battery','IPX8','16GB storage']), tags: 'kindle,amazon,ereader,reading,books,paperwhite,portable', brand: 'Amazon', price: 14999, stock: 55, ratings: 4.7, ratingCount: 31200 },
    { title: 'Mi Power Bank 3i 20000mAh', description: 'Dual USB output, 18W fast charging, input via Micro-USB and Type-C, LED indicators.', features: JSON.stringify(['20000mAh','18W fast charging','Dual USB out','Type-C input','LED indicator']), tags: 'power bank,xiaomi,mi,charger,portable,budget,battery', brand: 'Xiaomi', price: 1399, stock: 200, ratings: 4.3, ratingCount: 56700 },
    { title: 'Boat Airdopes 141 TWS Earbuds', description: '42H total playtime, low latency, ENx noise cancellation, IPX4, IWP technology.', features: JSON.stringify(['42H playtime','ENx noise cancel','IPX4','Low latency','IWP tech']), tags: 'earbuds,boat,tws,bluetooth,wireless,budget,music', brand: 'boAt', price: 999, stock: 300, ratings: 4.1, ratingCount: 89200 },
    { title: 'Havells Instanio Prime 3L Instant Water Heater', description: '3L capacity, heavy duty anode rod, colour changing LED indicators, ISI certified.', features: JSON.stringify(['3L capacity','Anode rod','LED indicators','ISI certified','Rust-proof body']), tags: 'water heater,geyser,havells,bathroom,winter,appliance', brand: 'Havells', price: 3899, stock: 40, ratings: 4.3, ratingCount: 12100 },
    { title: 'Crompton Energion HS 1200mm Ceiling Fan', description: 'BLDC motor, remote control, energy saving (35W), anti-dust, 5-star rated.', features: JSON.stringify(['BLDC motor','Remote control','35W power','Anti-dust','5-star rated']), tags: 'fan,ceiling fan,crompton,bldc,energy saving,home,appliance', brand: 'Crompton', price: 3499, stock: 50, ratings: 4.4, ratingCount: 8900 },
    { title: 'Sony PlayStation 5 Slim (Digital Edition)', description: 'Next-gen gaming console, custom SSD, 4K gaming, DualSense controller, PS VR2 compatible.', features: JSON.stringify(['Custom SSD','4K gaming','DualSense controller','Ray tracing','PS VR2 ready']), tags: 'ps5,playstation,sony,gaming,console,4k gaming', brand: 'Sony', price: 39990, stock: 20, ratings: 4.8, ratingCount: 7600 },
  ]
};

async function seedBatch() {
  try {
    console.log('🌱 Starting optimized seeding...');
    
    // Get categories
    const categories = await prisma.category.findMany();
    const catMap = {};
    categories.forEach(c => catMap[c.name.toLowerCase()] = c.id);
    
    console.log('📂 Found categories:', Object.keys(catMap).join(', '));
    
    // Count existing products
    const existingCount = await prisma.product.count();
    console.log(`📦 Already have ${existingCount} products`);
    
    // Prepare products to insert (batch insert all remaining)
    const toInsert = [];
    for (const [catName, products] of Object.entries(allProductsData)) {
      const catId = catMap[catName];
      if (!catId) {
        console.log(`⚠️  Category not found: ${catName}`);
        continue;
      }
      
      for (const prod of products) {
        const discountPercent = 15 + Math.floor(Math.random() * 15);
        const originalPrice = Math.round(prod.price * (100 + discountPercent) / 100);
        
        toInsert.push({
          categoryId: catId,
          title: prod.title,
          description: prod.description,
          price: prod.price,
          originalPrice,
          stock: getRandomStock(),
          ratings: prod.ratings,
          ratingCount: prod.ratingCount,
          features: prod.features,
          brand: prod.brand,
          tags: prod.tags,
          isPremium: false,
          boughtCount: 0,
          freeDelivery: true,
        });
      }
    }
    
    console.log(`✏️  Ready to insert ${toInsert.length} products...`);
    
    // Batch insert with smaller chunks
    const chunkSize = 10;
    for (let i = 0; i < toInsert.length; i += chunkSize) {
      const chunk = toInsert.slice(i, i + chunkSize);
      await prisma.product.createMany({ data: chunk });
      console.log(`✅ Inserted ${Math.min(i + chunkSize, toInsert.length)}/${toInsert.length}`);
    }
    
    const finalCount = await prisma.product.count();
    console.log(`\n🎉 Seeding complete! Total products: ${finalCount}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

seedBatch();
