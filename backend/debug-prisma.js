#!/usr/bin/env node
require('dotenv').config();

console.log('Step 1: require dependencies...');
try {
  const { PrismaClient } = require('@prisma/client');
  console.log('✅ @prisma/client loaded');
  
  const prisma = new PrismaClient({ 
    log: ['query', 'error', 'warn'] 
  });
  console.log('✅ PrismaClient created');
  
  (async () => {
    try {
      console.log('Step 2: Connect to database...');
      const result = await prisma.$queryRaw`SELECT 1 as test`;
      console.log('✅ Connection successful!', result);
      
      console.log('Step 3: Check product count...');
      const count = await prisma.product.count();
      console.log(`✅ Products in database: ${count}`);
      
    } catch (err) {
      console.error('❌ Query error:', err.message);
      console.error('Code:', err.code);
      console.error('Meta:', err.meta);
    } finally {
      await prisma.$disconnect();
    }
  })();
} catch (e) {
  console.error('❌ Import error:', e.message);
  console.error('Stack:', e.stack);
  process.exit(1);
}
