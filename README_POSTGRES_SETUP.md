# PostgreSQL Migration - Complete Setup Guide

## ✅ What Has Been Completed

### 1. Backend Routes Updated for PostgreSQL
- **productRoutes.js** ✓ Updated with async/await and parameterized queries
- **userRoutes.js** ✓ Updated with user registration, login, and profile endpoints  
- **orderRoutes.js** ✓ Updated with order creation and retrieval
- **middleware/auth.js** ✓ Updated to set req.userId for all routes

### 2. Database Module Created
- **backend/database/postgres.js** ✓ Connection pooling with 12 async functions
  - getProducts()
  - getProductById(id)
  - getProductsByCategory(category)
  - updateProductStock(id, newStock)
  - getUserByEmail(email)
  - createUser(id, name, email, password)
  - getUserById(id)
  - createOrder(...)
  - addOrderItems(...)
  - getUserOrders(userId)
  - getOrderById(id)
  - closePool()

### 3. Environment Configuration
- **.env** ✓ Updated with database credentials
  - DB_HOST=localhost
  - DB_PORT=5432
  - DB_NAME=ancients_db
  - DB_USER=postgres
  - DB_PASSWORD=postgres

### 4. Documentation Created
- **QUICK_START.md** - Fast setup in 5 steps
- **DATABASE_CONNECTION_GUIDE.md** - Complete setup with SQL scripts
- **POSTGRESQL_MIGRATION_SUMMARY.md** - What changed and why
- **START_SERVERS.md** - How to start both servers
- **API_TESTING.md** - How to test all endpoints

---

## 🚀 How to Get Started (For You)

### Step 1: Install PostgreSQL
1. Download from: https://www.postgresql.org/download/windows/
2. Run installer
3. When asked for postgres password, set it to something you remember
4. Complete installation

### Step 2: Create Database
Open Command Prompt:
```bash
psql -U postgres -h localhost
```
When prompted, enter your postgres password.

Then copy-paste this entire SQL block:
```sql
-- Create database
CREATE DATABASE ancients_db;

-- Connect to database
\c ancients_db

-- Products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(50),
    price DECIMAL(10, 2),
    mrp DECIMAL(10, 2),
    stock INTEGER,
    size VARCHAR(50),
    brand VARCHAR(100),
    delivery VARCHAR(50),
    description TEXT,
    image VARCHAR(255),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Users table
CREATE TABLE users (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    total_amount DECIMAL(10, 2),
    status VARCHAR(50),
    shipping_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order items table
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id UUID NOT NULL REFERENCES orders(id),
    product_id INTEGER NOT NULL REFERENCES products(id),
    quantity INTEGER,
    price DECIMAL(10, 2)
);

-- Insert sample products
INSERT INTO products (name, category, price, mrp, stock, size, brand, delivery, description, image) VALUES
('Ancient Roman Coin', 'Coins', 99.99, 149.99, 50, '2cm', 'Roman Empire', 'Free Shipping', 'Authentic Roman coin replica', '/images/product1.jpg'),
('Egyptian Scarab', 'Amulets', 49.99, 79.99, 30, '3cm', 'Egypt', 'Standard', 'Handcrafted scarab beetle amulet', '/images/product2.jpg'),
('Greek Vase Replica', 'Pottery', 199.99, 299.99, 15, '20cm', 'Greece', 'Express', 'Red-figure pottery design', '/images/product3.jpg'),
('Viking Shield', 'Weapons', 249.99, 399.99, 10, '60cm', 'Scandinavia', 'Standard', 'Viking warrior shield replica', '/images/product4.jpg'),
('Mayan Mask', 'Masks', 129.99, 199.99, 25, '15cm', 'Mayan', 'Free Shipping', 'Traditional Mayan ceremonial mask', '/images/product5.jpg'),
('Chinese Bronze Buddha', 'Statues', 179.99, 279.99, 12, '25cm', 'China', 'Express', 'Ming Dynasty style bronze statue', '/images/product6.jpg'),
('Sumerian Tablet', 'Tablets', 89.99, 139.99, 40, '10cm', 'Mesopotamia', 'Standard', 'Cuneiform inscription replica', '/images/product7.jpg'),
('Indian Brass Lamp', 'Lamps', 69.99, 109.99, 35, '15cm', 'India', 'Free Shipping', 'Traditional oil lamp design', '/images/product8.jpg'),
('Japanese Samurai Sword', 'Weapons', 299.99, 499.99, 8, '90cm', 'Japan', 'Express', 'Handcrafted katana replica', '/images/product9.jpg'),
('African Tribal Mask', 'Masks', 139.99, 219.99, 20, '20cm', 'Africa', 'Standard', 'Carved wooden tribal mask', '/images/product10.jpg');
```

Exit psql:
```
\q
```

### Step 3: Update .env Password
Edit `.env` file at `d:\ancientss\anicients2\.env`:
Change:
```
DB_PASSWORD=postgres
```
to your actual postgres password you set in Step 1.

### Step 4: Start Backend
Open Command Prompt:
```bash
cd d:\ancientss\anicients2
npm run server
```

Wait for: **✓ Connected to PostgreSQL Database**

### Step 5: Start Frontend (in new Command Prompt)
```bash
cd d:\ancientss\anicients2
npm run dev
```

### Step 6: Test
- Open http://localhost:5173
- Register with email and password
- Browse products from PostgreSQL
- Create order (stock updates automatically)
- ✓ Done!

---

## 📋 File Structure

```
d:\ancientss\anicients2\
├── backend/
│   ├── database/
│   │   └── postgres.js ✅ NEW - Database connection & functions
│   ├── routes/
│   │   ├── productRoutes.js ✅ UPDATED
│   │   ├── userRoutes.js ✅ UPDATED
│   │   ├── orderRoutes.js ✅ UPDATED
│   │   └── cartRoutes.js
│   ├── middleware/
│   │   └── auth.js ✅ UPDATED
│   └── server.js
├── src/
│   └── [frontend files]
├── public/
│   └── [static files & images]
├── .env ✅ UPDATED
├── package.json
│
├── QUICK_START.md ✅ NEW - 5-step setup
├── DATABASE_CONNECTION_GUIDE.md ✅ NEW - Complete setup guide
├── POSTGRESQL_MIGRATION_SUMMARY.md ✅ NEW - What changed
├── START_SERVERS.md ✅ NEW - How to start servers
├── API_TESTING.md ✅ NEW - API endpoint testing
│
└── [other files]
```

---

## 🔑 Key Changes Made

### Before (JSON Storage)
```javascript
// Old way - reading JSON files
const products = JSON.parse(fs.readFileSync('products.json'));
const user = products.find(p => p.id === id);
```

### After (PostgreSQL)
```javascript
// New way - querying database
const user = await db.getUserById(id);
```

### Benefits
- ✅ Faster queries with indexing
- ✅ No file locking issues
- ✅ Multiple concurrent users
- ✅ ACID transactions
- ✅ Data relationships/integrity
- ✅ Easy backups
- ✅ Production-ready

---

## 📝 Important Notes

1. **PostgreSQL must be running** before starting backend
   - Windows Services → postgresql-x64-15 → Right-click "Start"

2. **Password in .env must match** your postgres installation password

3. **Database name must be "ancients_db"** (not optional)

4. **JWT tokens expire in 7 days** - users will need to login again

5. **All queries are parameterized** - protected against SQL injection

6. **Stock updates automatically** when orders are created

---

## 🆘 Troubleshooting

### "Cannot connect to database"
```
1. Check PostgreSQL is running (Windows Services)
2. Check .env password is correct
3. Check .env database name is "ancients_db"
4. Try: psql -U postgres -h localhost -d ancients_db
```

### "relation 'products' does not exist"
```
1. Run all SQL commands from Step 2 above
2. Ensure you're in database: \c ancients_db
3. Verify with: \dt (shows all tables)
```

### "Unexpected token" or module errors
```
1. Delete node_modules folder
2. Run: npm install
3. Try again
```

### Port 5000 or 5173 already in use
```
1. Find what's using it: netstat -ano | findstr :5000
2. Kill the process: taskkill /PID xxxx /F
3. Or use different port: change in server.js
```

---

## ✅ Verification Checklist

- [ ] PostgreSQL installed and running
- [ ] Command `psql --version` works
- [ ] Database "ancients_db" created
- [ ] All 4 tables created (products, users, orders, order_items)
- [ ] 10 products inserted
- [ ] .env file has correct password
- [ ] Backend starts with "Connected to PostgreSQL Database"
- [ ] Frontend starts at http://localhost:5173
- [ ] Can register and login
- [ ] Can browse products
- [ ] Can create orders
- [ ] Stock updates after order

---

## 🎯 Next Steps

1. Follow the 6 steps above to get PostgreSQL running
2. Start backend: `npm run server`
3. Start frontend: `npm run dev`
4. Test the application
5. Check [API_TESTING.md](API_TESTING.md) to test individual endpoints

Your e-commerce app is now powered by a real database! 🚀
