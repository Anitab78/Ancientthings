# PostgreSQL Database Setup Guide for Ancient Things

## STEP 1: Install PostgreSQL

### Windows Installation:
1. Download PostgreSQL from: https://www.postgresql.org/download/windows/
2. Choose version 15 or latest
3. Run installer:
   - Set password for `postgres` user (remember this!)
   - Default port: 5432
   - Install pgAdmin 4 (GUI tool - useful!)
4. After installation, PostgreSQL service runs automatically

### Verify Installation:
```bash
psql --version
psql -U postgres -h localhost
```

---

## STEP 2: Create Database and Tables

Open Command Prompt and connect to PostgreSQL:
```bash
psql -U postgres -h localhost
```

Enter password when prompted, then run these SQL commands:

```sql
-- Create database
CREATE DATABASE ancients_db;

-- Connect to database
\c ancients_db

-- Create products table
CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100) NOT NULL,
    price DECIMAL(10, 2) NOT NULL,
    mrp DECIMAL(10, 2) NOT NULL,
    stock INTEGER NOT NULL,
    size VARCHAR(100),
    brand VARCHAR(100),
    delivery VARCHAR(100),
    description TEXT,
    image VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create users table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Create orders table
CREATE TABLE orders (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
    total_price DECIMAL(10, 2) NOT NULL,
    shipping_address TEXT NOT NULL,
    status VARCHAR(50) DEFAULT 'confirmed',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    estimated_delivery TIMESTAMP
);

-- Create order_items table (items in each order)
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id UUID NOT NULL REFERENCES orders(id) ON DELETE CASCADE,
    product_id INTEGER NOT NULL REFERENCES products(id),
    quantity INTEGER NOT NULL,
    price DECIMAL(10, 2) NOT NULL
);

-- Create indexes for faster queries
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_order_items_order_id ON order_items(order_id);
```

### Verify Tables Created:
```sql
\dt
\q
```

---

## STEP 3: Insert Sample Products

```sql
psql -U postgres -d ancients_db
```

Run these SQL commands to insert products:

```sql
INSERT INTO products (name, category, price, mrp, stock, size, brand, delivery, description, image) VALUES
('Wood Craft Wall Decor', 'woodcraft', 1149, 1915, 44, '12 x 8 inches', 'Ancient Artisans', 'Jan 24 - Feb 03', 'Handcrafted wooden wall decor made by skilled artisans', '/images/woodcraft.JPG'),
('Brass Pooja Lamp', 'pooja', 1299, 1899, 20, '10 inches', 'Heritage Brass', 'Jan 27 - Feb 06', 'Traditional brass lamp ideal for daily pooja rituals', '/images/poojacraft.jpg'),
('Madhubani Painting', 'madhubani', 2499, 3499, 12, '18 x 24 inches', 'Bihar Folk Arts', 'Jan 25 - Feb 02', 'Authentic hand-painted Madhubani artwork', '/images/madhurani paintings.jpg'),
('Resin Earrings', 'resin', 699, 999, 50, 'Medium', 'ResinCraft', 'Jan 26 - Feb 04', 'Stylish handmade resin earrings with unique designs', '/images/resine.jpg'),
('Decorative Candle', 'candles', 499, 799, 60, 'Standard', 'Glow Art', 'Jan 24 - Feb 01', 'Aromatic decorative candle for home decor', '/images/candle.jpg'),
('Handmade Cushion', 'cushion', 899, 1299, 30, '16 x 16 inches', 'Soft Loom', 'Jan 27 - Feb 05', 'Comfortable handmade cushion with ethnic design', '/images/handmadecushion.jpg'),
('Wall Clock', 'wall-clock', 1599, 2199, 18, '12 inches', 'Time Heritage', 'Jan 28 - Feb 07', 'Vintage handmade wall clock with antique finish', '/images/clock.jpg'),
('Traditional Saree', 'sarees', 1898, 2799, 15, 'Free Size', 'Ethnic Weaves', 'Jan 29 - Feb 08', 'Traditional handcrafted saree with intricate designs', '/images/saree.jpg'),
('Decorative Bottle', 'bottle', 1000, 1499, 22, 'Medium', 'Ancient Decor', 'Jan 26 - Feb 03', 'Hand-painted decorative glass bottle with ancient designs', '/images/bottle.jpg'),
('Tealights Pack', 'lights', 1099, 1599, 40, 'Pack of 10', 'Glow Home', 'Jan 25 - Feb 02', 'Decorative tealight candles for festivals and celebrations', '/images/tealights.jpg');

-- Verify
SELECT COUNT(*) FROM products;
```

---

## STEP 4: Update Node.js Backend

Install PostgreSQL driver:
```bash
npm install pg
```

Done! Now follow the backend code updates in the next files.

---

## Connection Details for Backend

```
Host: localhost
Port: 5432
Database: ancients_db
User: postgres
Password: (your password)
```

Update your `.env` file:
```
PORT=5000
JWT_SECRET=your_ancient_things_secret_key_123
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ancients_db
DB_USER=postgres
DB_PASSWORD=your_postgres_password
```

---

## Useful PostgreSQL Commands

```bash
# Connect to database
psql -U postgres -d ancients_db

# List all tables
\dt

# Describe table structure
\d products

# View all data in a table
SELECT * FROM products;

# Delete all data (be careful!)
DELETE FROM products;

# Drop entire database
DROP DATABASE ancients_db;

# Exit
\q
```

---

## Next Steps
1. Install PostgreSQL ✓
2. Create database and tables ✓
3. Install pg package ✓
4. Update backend files (db.js, routes, etc.)
5. Restart backend server
6. Test all endpoints

See updated backend files for PostgreSQL integration!
