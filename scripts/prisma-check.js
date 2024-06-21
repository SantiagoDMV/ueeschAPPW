const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

function generate() {
  const prismaClientPath = path.join(__dirname, '..', 'node_modules', '.prisma', 'client', 'index.js');
  
  if (!fs.existsSync(prismaClientPath)) {
    console.log('Generating Prisma client...');
    execSync('npx prisma generate', { stdio: 'inherit' });
  } else {
    console.log('Prisma client already exists. Skipping generation.');
  }
}

module.exports = { generate };
