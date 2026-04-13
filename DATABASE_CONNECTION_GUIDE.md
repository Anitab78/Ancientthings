# PostgreSQL Database Setup & Connection Guide

## Overview
This guide walks you through setting up PostgreSQL for the Ancient Things e-commerce application. All backend routes have been updated to use PostgreSQL instead of JSON files.

---

## Step 1: Install PostgreSQL on Windows

### 1.1 Download PostgreSQL
- Visit: https://www.postgresql.org/download/windows/
- Click "Download the installer" 
- Download **PostgreSQL 15 or higher** (latest recommended)

### 1.2 Installation Steps
1. Run the downloaded installer
2. Follow the setup wizard:
   - **Installation Directory**: Keep default (usually `C:\Program Files\PostgreSQL\15`)
   - **Components**: Keep all checked (PostgreSQL Server, pgAdmin 4, Stack Builder, Command Line Tools)
   - **Data Directory**: Keep default
   - **Password**: Set a password for the `postgres` superuser (important - save this!)
   - **Port**: Keep default `5432`
   - **Locale**: Select your locale
3. Complete the installation
4. pgAdmin will launch after installation (you can close it for now)

### 1.3 Verify Installation
Open Command Prompt (Windows key + R, type `cmd`, press Enter):
```bash
psql --version
```
You should see: `psql (PostgreSQL) 15.x` or higher

---

## Step 2: Create Database and Tables

### 2.1 Connect to PostgreSQL
Open Command Prompt and run:
```bash
psql -U postgres -h localhost
```
When prompted, enter the password you set during installation.

You should see: `postgres=#`

### 2.2 Create Database
Run this command in psql:
```sql
CREATE DATABASE ancients_db;
```

### 2.3 Connect to Your Database
```bash
\c ancients_db
```
You should see: `You are now connected to database "ancients_db" as user "postgres".`

### 2.4 Create Tables
Run all these SQL commands:

**Products Table:**
```sql
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
```

**Users Table:**
```sql
CREATE TABLE users (
    id UUID PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Orders Table:**
```sql
CREATE TABLE orders (
    id UUID PRIMARY KEY,
    user_id UUID NOT NULL REFERENCES users(id),
    total_amount DECIMAL(10, 2),
    status VARCHAR(50),
    shipping_address TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Order Items Table:**
```sql
CREATE TABLE order_items (
    id SERIAL PRIMARY KEY,
    order_id UUID NOT NULL REFERENCES orders(id),
    product_id INTEGER NOT NULL REFERENCES products(id),
    quantity INTEGER,
    price DECIMAL(10, 2)
);
```

---

## Step 3: Insert Sample Data

Run these INSERT commands to add test products:

```sql
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

---

## Step 4: Update Environment Variables

Create or update `.env` file in the project root (`d:\ancientss\anicients2\.env`):

```env
# JWT Configuration
JWT_SECRET=your_super_secret_key_change_this_in_production

# PostgreSQL Database Configuration
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ancients_db
DB_USER=postgres
DB_PASSWORD=your_postgres_password

# Node Environment
NODE_ENV=development
```

**⚠️ Replace `your_postgres_password` with the actual password you set during PostgreSQL installation!**

---

## Step 5: Verify Database Connection

In Command Prompt, navigate to your project:
```bash
cd d:\ancientss\anicients2
```

Test the connection:
```bash
npm run server
```

You should see messages like:
```
Server running on http://localhost:5000
Database pool connected successfully
```

---

## Step 6: Test API Endpoints

Once the server is running, test these endpoints:

### Get All Products
```bash
curl http://localhost:5000/api/products
```
Response should include your 10 inserted products

### Register User
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"John Doe","email":"john@example.com","password":"password123"}'
```
Response will include a JWT token

### Login User
```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{"email":"john@example.com","password":"password123"}'
```

### Get User Profile
Use the token from login/register:
```bash
curl http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

---

## Useful PostgreSQL Commands

### Connect to Database
```bash
psql -U postgres -h localhost -d ancients_db
```

### View All Tables
```sql
\dt
```

### View Products
```sql
SELECT * FROM products;
```

### View Users
```sql
SELECT id, name, email, created_at FROM users;
```

### View Orders
```sql
SELECT * FROM orders;
```

### Drop Database (if you need to start over)
```sql
DROP DATABASE ancients_db;
```

### Exit psql
```sql
\q
```

---

## Troubleshooting

### "psql: command not found"
- Add PostgreSQL to PATH:
  1. Open Environment Variables (search in Windows)
  2. Click "Environment Variables"
  3. In "System variables", find "Path"
  4. Click "Edit" → "New"
  5. Add: `C:\Program Files\PostgreSQL\15\bin`
  6. Click OK and restart Command Prompt

### "connection refused" or "FATAL: password authentication failed"
- Check `.env` file has correct password
- Ensure PostgreSQL service is running:
  1. Press Windows key
  2. Type "Services"
  3. Find "postgresql-x64-15"
  4. Ensure status is "Running"

### "database ancients_db does not exist"
- Make sure you created the database with `CREATE DATABASE ancients_db;`
- Run the SQL table creation commands

### "relation 'products' does not exist"
- Ensure you connected to `ancients_db` with `\c ancients_db`
- Recreate the tables if needed

---

## Next Steps

1. ✅ Install PostgreSQL
2. ✅ Create database and tables
3. ✅ Insert sample products
4. ✅ Update `.env` file
5. ✅ Start backend server: `npm run server`
6. ✅ Test API endpoints
7. ✅ Start frontend: `npm run dev`
8. ✅ Test complete e-commerce flow

---

## Backend Routes Updated for PostgreSQL

All routes now use the `postgres.js` database module:

- **Products**: `GET /api/products` - Get all products from database
- **Products**: `GET /api/products/:id` - Get single product
- **Products**: `GET /api/products/category/:category` - Filter by category
- **Users**: `POST /api/users/register` - Register with database storage
- **Users**: `POST /api/users/login` - Login with database authentication
- **Users**: `GET /api/users/profile` - Get user profile from database
- **Orders**: `POST /api/orders` - Create order in database
- **Orders**: `GET /api/orders` - Get user's orders
- **Orders**: `GET /api/orders/:id` - Get order details

---

## Connection Pool Configuration

The `postgres.js` module uses a connection pool for optimal performance:
- **Max connections**: 20
- **Idle timeout**: 30 seconds
- **Connection timeout**: 5 seconds
- **Connection verification**: Every 10 seconds

This ensures efficient database resource usage and automatic reconnection on failure.

---

## Security Notes

- Never commit `.env` file to version control
- Change `JWT_SECRET` in production
- Use strong database password
- Consider SSL connections in production
- Implement rate limiting on endpoints
- Validate all user inputs before database queries

---

For issues or questions, check the PostgreSQL logs:
```bash
Windows Event Viewer → Windows Logs → Application
Filter for entries from "PostgreSQL"
```
