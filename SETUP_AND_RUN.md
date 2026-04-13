# 🏛️ Ancient Things - Complete Setup Guide

## ✅ Step 1: Install PostgreSQL

1. Download PostgreSQL from https://www.postgresql.org/download/windows/
2. Run the installer and choose:
   - Installation directory: `C:\Program Files\PostgreSQL\15` (or latest)
   - Password for postgres user: `postgres` (as configured in .env)
   - Port: `5432` (default)
   - Locale: English, United States

3. After installation, PostgreSQL will start automatically

## ✅ Step 2: Create Database

Open **pgAdmin 4** (installed with PostgreSQL) or use **psql**:

### Using pgAdmin 4:
1. Open pgAdmin 4
2. Login with email and password you set during installation
3. Right-click **Databases** → **Create** → **Database**
4. Name: `ancients_db`
5. Click **Save**

### OR Using psql (Command Line):
```powershell
psql -U postgres -h localhost
```
Then paste these commands:

```sql
CREATE DATABASE ancients_db;
\c ancients_db

CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE products (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    category VARCHAR(100),
    price DECIMAL(10, 2),
    mrp DECIMAL(10, 2),
    stock INTEGER,
    size VARCHAR(100),
    brand VARCHAR(100),
    delivery VARCHAR(100),
    description TEXT,
    image VARCHAR(500),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE orders (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL REFERENCES users(id),
    total_price DECIMAL(10, 2),
    status VARCHAR(50) DEFAULT 'pending',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE TABLE order_items (
    id VARCHAR(36) PRIMARY KEY,
    order_id VARCHAR(36) NOT NULL REFERENCES orders(id),
    product_id INTEGER NOT NULL REFERENCES products(id),
    quantity INTEGER,
    price DECIMAL(10, 2),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Insert sample products
INSERT INTO products (name, category, price, mrp, stock, size, brand, delivery, description, image) VALUES
('Wood Craft Wall Decor', 'woodcraft', 1149, 1915, 44, '12 x 8 inches', 'Ancient Artisans', 'Jan 24 - Feb 03', 'Handcrafted wooden wall decor made by skilled artisans', '/images/woodcraft.JPG'),
('Brass Pooja Lamp', 'pooja', 1299, 1899, 20, '10 inches', 'Heritage Brass', 'Jan 27 - Feb 06', 'Traditional brass lamp ideal for daily pooja rituals', '/images/poojacraft.jpg'),
('Madhubani Painting', 'madhubani', 2499, 3499, 12, '18 x 24 inches', 'Bihar Folk Arts', 'Jan 25 - Feb 02', 'Authentic hand-painted Madhubani artwork', '/images/madhurani paintings.jpg'),
('Resin Earrings', 'resin', 699, 999, 50, 'Medium', 'ResinCraft', 'Jan 26 - Feb 04', 'Stylish handmade resin earrings with unique designs', '/images/resine.jpg'),
('Decorative Candle', 'candles', 499, 799, 60, 'Standard', 'CandleArt', 'Jan 23 - Feb 01', 'Scented decorative candles handmade with natural wax', '/images/candles.jpg'),
('Glass Painting', 'glassart', 899, 1299, 30, '10 x 12 inches', 'GlassArt Studios', 'Jan 28 - Feb 05', 'Beautiful hand-painted glass art with traditional designs', '/images/glass_painting.jpg'),
('Handmade Earrings', 'handmade', 599, 899, 40, 'One Size', 'ArtisanJewels', 'Jan 25 - Feb 03', 'Unique handmade earrings with traditional patterns', '/images/handmade_earrings.jpg'),
('Photo Frame', 'frames', 449, 699, 55, '8 x 10 inches', 'FrameArt', 'Jan 26 - Feb 04', 'Wooden photo frames with intricate carvings', '/images/photo_frame.jpg'),
('Lamp', 'lamps', 1599, 2299, 25, '18 inches', 'LampCraft', 'Jan 24 - Feb 02', 'Traditional brass lamp with decorative designs', '/images/lamp.jpg'),
('Pottery Vase', 'pottery', 799, 1199, 35, '12 inches', 'PotteryWorks', 'Jan 27 - Feb 05', 'Hand-thrown ceramic vase with traditional glaze', '/images/pottery.jpg');

\q
```

## ✅ Step 3: Verify Database Connection

Test the connection:
```powershell
# From the project directory
cd d:\ancientss\anicients2

# Test database connection (optional - for verification)
psql -U postgres -h localhost -d ancients_db -c "SELECT COUNT(*) FROM products;"
```

Expected output: `count` should be `10` (10 products inserted)

## ✅ Step 4: Install Dependencies

```powershell
cd d:\ancientss\anicients2
npm install
```

## ✅ Step 5: Start the Servers

### Terminal 1: Start Backend Server
```powershell
cd d:\ancientss\anicients2
npm run server
```

You should see:
```
✓ Connected to PostgreSQL Database
Server running on port 5000
API Base URL: http://localhost:5000/api
```

### Terminal 2: Start Frontend Server
```powershell
cd d:\ancientss\anicients2
npm run dev
```

You should see:
```
VITE v5.x.x  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  press h to show help
```

## ✅ Step 6: Test the Application

1. Open browser to `http://localhost:5173`
2. You should see the Ancient Things e-commerce site
3. Click on "Products" to see all products from database
4. Click "Create Account" and register a new user
5. Login with your credentials
6. View products and add to cart

## 🧪 Test API Endpoints

In a new terminal, test the backend:

```powershell
# Get all products
curl -X GET "http://localhost:5000/api/products"

# Get single product
curl -X GET "http://localhost:5000/api/products/1"

# Register user
curl -X POST "http://localhost:5000/api/users/register" `
  -H "Content-Type: application/json" `
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'

# Login
curl -X POST "http://localhost:5000/api/users/login" `
  -H "Content-Type: application/json" `
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

## ❌ Troubleshooting

### PostgreSQL Connection Error
```
Error: connect ECONNREFUSED 127.0.0.1:5432
```
**Solution:**
- Ensure PostgreSQL is installed and running
- Check `.env` file has correct credentials
- Restart PostgreSQL service

### Port 5000 Already in Use
```
Error: listen EADDRINUSE: address already in use :::5000
```
**Solution:**
```powershell
# Kill process using port 5000
Get-Process | Where-Object {$_.ProcessName -eq 'node'} | Stop-Process -Force
# Or manually: npx kill-port 5000
```

### Port 5173 Already in Use
```
Error: EADDRINUSE: address already in use
```
**Solution:**
```powershell
Get-Process | Where-Object {$_.ProcessName -eq 'node'} | Stop-Process -Force
```

### Database Not Found
```
error: database "ancients_db" does not exist
```
**Solution:**
- Re-run the database creation commands in Step 2

### Module Not Found Errors
```
Cannot find module 'express' or 'pg'
```
**Solution:**
```powershell
cd d:\ancientss\anicients2
npm install
npm install pg express cors dotenv bcryptjs jsonwebtoken uuid
```

## 🔒 Security Notes

- ✅ Passwords are hashed with bcryptjs (10 rounds)
- ✅ JWT tokens expire after 7 days
- ✅ All database queries are parameterized (SQL injection protected)
- ✅ CORS is enabled for frontend
- ✅ Environment variables are used for sensitive data

## 📊 Project Structure

```
anicients2/
├── src/
│   ├── pages/
│   │   ├── home.jsx
│   │   ├── login.jsx
│   │   ├── register.jsx
│   │   ├── products.jsx
│   │   └── ProductDetail.jsx
│   ├── componets/
│   │   ├── navbar.jsx
│   │   ├── footer.jsx
│   │   ├── productgrid.jsx
│   │   ├── productcard.jsx
│   │   └── heroslider.jsx
│   ├── data/
│   │   └── product.jsx (local fallback data)
│   ├── App.tsx
│   └── index.css
├── backend/
│   ├── routes/
│   │   ├── productRoutes.js
│   │   ├── userRoutes.js
│   │   ├── orderRoutes.js
│   │   └── cartRoutes.js
│   ├── database/
│   │   └── postgres.js
│   └── server.js
├── .env (Configuration)
├── package.json
└── vite.config.ts
```

## 🎯 What's Included

- ✅ React Frontend with Vite
- ✅ Express.js Backend
- ✅ PostgreSQL Database
- ✅ JWT Authentication
- ✅ Product Management
- ✅ User Registration & Login
- ✅ Shopping Cart
- ✅ Order Management
- ✅ Security Best Practices

## 🚀 Next Steps

1. ✅ Setup complete - Application is running!
2. Test all features in the frontend
3. Check backend API with provided endpoints
4. Customize products and categories as needed
5. Deploy to production (AWS, Heroku, etc.)

---

**Everything is ready! Your Ancient Things e-commerce platform is live! 🎉**
