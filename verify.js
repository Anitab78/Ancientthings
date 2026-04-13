#!/usr/bin/env node

/**
 * Ancient Things - Complete System Verification
 * This script verifies all components are properly configured
 */

const fs = require('fs');
const path = require('path');

const projectRoot = 'd:\\ancientss\\anicients2';

console.log('\n╔═══════════════════════════════════════════════════════════════╗');
console.log('║      🏛️  ANCIENT THINGS - SYSTEM VERIFICATION                 ║');
console.log('╚═══════════════════════════════════════════════════════════════╝\n');

// Check 1: Project files
console.log('✓ Checking project structure...');
const requiredFiles = [
  'package.json',
  'vite.config.ts',
  '.env',
  'App.jsx',
  'main.jsx',
  'backend/server.js',
  'backend/routes/productRoutes.js',
  'backend/routes/userRoutes.js',
  'backend/routes/orderRoutes.js',
  'backend/routes/cartRoutes.js',
  'backend/database/postgres.js',
  'src/pages/home.jsx',
  'src/pages/login.jsx',
  'src/pages/register.jsx',
  'src/pages/products.jsx',
  'src/pages/ProductDetail.jsx',
  'src/componets/navbar.jsx',
  'src/componets/footer.jsx',
  'src/componets/productgrid.jsx',
  'src/componets/productcard.jsx',
  'src/data/product.jsx'
];

let missingFiles = [];
requiredFiles.forEach(file => {
  const filePath = path.join(projectRoot, file);
  if (!fs.existsSync(filePath)) {
    missingFiles.push(file);
  }
});

if (missingFiles.length === 0) {
  console.log('  ✅ All required files present');
} else {
  console.log('  ❌ Missing files:');
  missingFiles.forEach(f => console.log(`     - ${f}`));
}

// Check 2: Dependencies
console.log('\n✓ Checking dependencies...');
const packageJson = JSON.parse(fs.readFileSync(path.join(projectRoot, 'package.json'), 'utf8'));

const requiredDeps = [
  'react',
  'react-dom',
  'react-router-dom',
  'express',
  'pg',
  'bcryptjs',
  'jsonwebtoken',
  'uuid',
  'cors'
];

let missingDeps = [];
requiredDeps.forEach(dep => {
  if (!packageJson.dependencies[dep]) {
    missingDeps.push(dep);
  }
});

if (missingDeps.length === 0) {
  console.log('  ✅ All dependencies declared in package.json');
} else {
  console.log('  ❌ Missing dependencies:');
  missingDeps.forEach(d => console.log(`     - ${d}`));
}

// Check 3: Environment variables
console.log('\n✓ Checking environment configuration...');
const envFile = path.join(projectRoot, '.env');
if (fs.existsSync(envFile)) {
  const envContent = fs.readFileSync(envFile, 'utf8');
  const requiredEnvVars = ['JWT_SECRET', 'PORT', 'DB_HOST', 'DB_PORT', 'DB_NAME', 'DB_USER', 'DB_PASSWORD'];
  
  let missingEnvVars = [];
  requiredEnvVars.forEach(varName => {
    if (!envContent.includes(varName)) {
      missingEnvVars.push(varName);
    }
  });
  
  if (missingEnvVars.length === 0) {
    console.log('  ✅ All environment variables configured');
  } else {
    console.log('  ⚠️  Missing environment variables:');
    missingEnvVars.forEach(v => console.log(`     - ${v}`));
  }
} else {
  console.log('  ❌ .env file not found');
}

// Check 4: Backend routes
console.log('\n✓ Checking backend routes...');
const serverFile = fs.readFileSync(path.join(projectRoot, 'backend/server.js'), 'utf8');
const requiredRoutes = [
  'productRoutes',
  'userRoutes',
  'orderRoutes',
  'cartRoutes'
];

let missingRoutes = [];
requiredRoutes.forEach(route => {
  if (!serverFile.includes(route)) {
    missingRoutes.push(route);
  }
});

if (missingRoutes.length === 0) {
  console.log('  ✅ All routes imported and registered');
} else {
  console.log('  ❌ Missing routes:');
  missingRoutes.forEach(r => console.log(`     - ${r}`));
}

// Summary
console.log('\n╔═══════════════════════════════════════════════════════════════╗');
console.log('║                      VERIFICATION SUMMARY                     ║');
console.log('╚═══════════════════════════════════════════════════════════════╝\n');

const totalIssues = missingFiles.length + missingDeps.length + missingRoutes.length;

if (totalIssues === 0) {
  console.log('✅ SYSTEM IS READY TO RUN!\n');
  console.log('Next steps:');
  console.log('  1. Start backend:  npm run server');
  console.log('  2. Start frontend: npm run dev');
  console.log('  3. Open: http://localhost:5173\n');
  process.exit(0);
} else {
  console.log(`❌ Found ${totalIssues} issues that need fixing\n`);
  process.exit(1);
}
