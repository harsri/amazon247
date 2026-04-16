require('dotenv').config();
const { spawn } = require('child_process');

const child = spawn('node', ['prisma/seed.js'], {
  stdio: 'inherit',
  cwd: process.cwd(),
});

child.on('error', (err) => {
  console.error('Failed to start seed process', err);
  process.exit(1);
});

child.on('close', (code) => {
  console.log(`Seed process exited with code ${code}`);
  process.exit(code);
});
