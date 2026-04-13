# 🚀 ANCIENTSS Project - Complete Setup Guide

## 📋 Project Overview
ANCIENTSS is a full-stack e-commerce platform for handcrafted Indian artisan products with:
- ✅ React Frontend (Vite)
- ✅ Node.js/Express Backend
- ✅ PostgreSQL Database
- ✅ JWT Authentication
- ✅ Shopping Cart System
- ✅ Order Management

---

## 🛠️ Prerequisites

### Required Software:
- **Node.js** (v16 or higher) - Download from nodejs.org
- **PostgreSQL** (v12 or higher) - Download from postgresql.org
- **npm** or **yarn** - Comes with Node.js
- **Git** (optional)

### Verify Installation:
```bash
node --version
npm --version
psql --version
```

---

## 📂 Project Structure

```
d:\ancientss\anicients2\
├── frontend/           # React app (Vite)
│   ├── src/
│   ├── public/
│   ├── vite.config.ts
│   └── tsconfig.app.json
├── backend/           # Node.js API
│   ├── routes/
│   ├── middleware/
│   ├── config/
│   ├── database/
│   ├── server.js
│   ├── package.json
│   └── .env
└── README.md
```

---

## 🗄️ DATABASE SETUP

### Step 1: Create Database
```bash
# Open PostgreSQL
psql -U postgres

# In psql console, run:
CREATE DATABASE ancientss;
\c ancientss

# Run the schema file
\i 'D:\ancientss\anicients2\backend\database\schema.sql'

# Verify tables were created
\dt
```

### Step 2: Insert Sample Data
```sql
INSERT INTO products (name, category, description, price, mrp, stock, size, brand, delivery, image) 
VALUES 
('Wooden Box with Carvings', 'woodcraft', 'Intricately carved wooden storage box', 899, 1499, 35, '8 x 8 x 5 inches', 'Wood Masters', 'Jan 25 - Feb 02', '/images/wooden-box.jpg'),
('Decorative Candle', 'candles', 'Handmade decorative scented candle', 499, 799, 50, 'Small', 'Craft House', 'Jan 24 - Feb 01', '/images/candle.jpg'),
('Traditional Saree', 'sarees', 'Beautiful hand-woven traditional saree', 1898, 2499, 20, 'Standard', 'Heritage Textiles', 'Jan 27 - Feb 05', '/images/saree.jpg');
-- Add more products as needed
```

---

## 🔧 BACKEND SETUP

### Step 1: Navigate to Backend
```bash
cd d:\ancientss\anicients2\backend
```

### Step 2: Install Dependencies
```bash
npm install
```

### Step 3: Configure Environment
Edit `.env` file with your database credentials:
```env
DB_HOST=localhost
DB_PORT=5432
DB_USER=postgres
DB_PASSWORD=your_postgres_password
DB_NAME=ancientss
PORT=5000
JWT_SECRET=your_super_secret_jwt_key_change_in_production
JWT_EXPIRY=7d
CORS_ORIGIN=http://localhost:5174
NODE_ENV=development
```

### Step 4: Start Backend Server
```bash
npm run dev
# Or for production:
npm start
```

**Expected Output:**
```
✅ Server running on port 5000
📍 API Base URL: http://localhost:5000/api
🏥 Health Check: http://localhost:5000/api/health
```

**Test Backend:**
```bash
# In browser or curl:
http://localhost:5000/api/health
# Should return: {"success": true, "message": "Server is running"}
```

---

## 🎨 FRONTEND SETUP

### Step 1: Install Dependencies
```bash
cd d:\ancientss\anicients2
npm install
```

### Step 2: Configure API URL
The frontend is pre-configured to use `http://localhost:5000/api`
(See: `src/api/api.js`)

### Step 3: Start Development Server
```bash
npm run dev
```

**Expected Output:**
```
  ➜  Local:   http://localhost:5174/
  ➜  press h + enter to show help
```

---

## 📱 USAGE GUIDE

### 1. Browse Products (No Login Required)
- Open `http://localhost:5174`
- View products in HOME page
- Click on categories to filter products
- Click on product cards to see details

### 2. User Registration
- Click "Sign Up" in navbar
- Fill in: Email, Password, Name, Phone
- Account created & auto-logged in

### 3. Add to Cart
- Browse products
- Click "Add to Cart" button
- View cart (top-right icon)

### 4. Checkout
- Click cart icon
- Review items
- Enter shipping address
- Click "Place Order"
- Order confirmation shown

### 5. View Orders
- Click profile icon
- View "My Orders"
- Click order to see details

---

## 🔐 AUTHENTICATION

### Login Flow:
1. User enters email & password
2. Backend validates credentials
3. JWT token returned
4. Token stored in localStorage
5. All requests include token in Authorization header

### Token Expiry:
- Default: 7 days
- After expiry: User must login again

---

## 📡 API ENDPOINTS

### Products
```
GET  /api/products                    # Get all products
GET  /api/products/:id                # Get product by ID
GET  /api/products/category/:category # Get by category
GET  /api/products/search/:keyword    # Search products
```

### Users
```
POST /api/users/register              # Register new user
POST /api/users/login                 # Login user
GET  /api/users/profile               # Get user profile (Protected)
PUT  /api/users/profile               # Update profile (Protected)
```

### Cart
```
GET    /api/cart                      # Get cart (Protected)
POST   /api/cart/add                  # Add to cart (Protected)
PUT    /api/cart/update/:cartId       # Update item (Protected)
DELETE /api/cart/remove/:cartId       # Remove item (Protected)
DELETE /api/cart/clear                # Clear cart (Protected)
```

### Orders
```
POST /api/orders/create               # Create order (Protected)
GET  /api/orders                      # Get all orders (Protected)
GET  /api/orders/:orderId             # Get order details (Protected)
PUT  /api/orders/:orderId/status      # Update status (Protected)
```

---

## 🐛 TROUBLESHOOTING

### Backend won't start
**Error:** `Error: connect ECONNREFUSED 127.0.0.1:5432`
**Solution:** Make sure PostgreSQL is running
```bash
# Windows Services: Search for PostgreSQL, ensure it's running
# Or via command line (if PostgreSQL is installed):
pg_ctl -D "C:\Program Files\PostgreSQL\data" start
```

### Database connection fails
**Error:** `FATAL: database "ancientss" does not exist`
**Solution:** Create the database using the steps above

### API returns CORS error
**Error:** `Access to XMLHttpRequest has been blocked by CORS policy`
**Solution:** Ensure backend server is running and CORS_ORIGIN matches frontend URL

### Login not working
**Error:** `Invalid credentials`
**Solution:** 
- Verify user exists in database
- Check password is correct
- Ensure backend is running

### Frontend can't connect to backend
**Error:** Network error when adding to cart
**Solution:**
- Frontend URL: `http://localhost:5174`
- Backend URL: `http://localhost:5000`
- Both must be running
- Check CORS_ORIGIN in `.env`

---

## 📊 DATABASE SCHEMA

### Users Table
```sql
users: id, email, password, name, phone, address, city, state, pincode, country
```

### Products Table
```sql
products: id, name, category, description, price, mrp, stock, size, brand, delivery, image
```

### Cart Table
```sql
cart: id, user_id, product_id, quantity
```

### Orders Table
```sql
orders: id, user_id, order_number, total_amount, status, payment_status, shipping_address
```

### Order Items Table
```sql
order_items: id, order_id, product_id, quantity, price
```

---

## 🚀 DEPLOYMENT (Future)

### Frontend (Vercel/Netlify)
```bash
npm run build
# Deploy dist/ folder
```

### Backend (Railway/Render/Heroku)
```bash
# Update .env with production database
# Push to GitHub
# Connect to Railway/Render
# Auto-deployed
```

---

## 📝 ADDITIONAL FEATURES TO ADD

- [ ] Password reset functionality
- [ ] Email verification
- [ ] Wishlist feature
- [ ] Product reviews & ratings
- [ ] Payment gateway integration (Stripe/Razorpay)
- [ ] Admin dashboard
- [ ] Email notifications
- [ ] Inventory tracking
- [ ] Discount codes
- [ ] Promotional banners

---

## 📞 SUPPORT

For issues or questions:
1. Check troubleshooting section above
2. Review API documentation in `backend/API_DOCS.md`
3. Check browser console for frontend errors
4. Check terminal for backend errors

---

## ✅ CHECKLIST

Before going live:
- [ ] Database created and schema applied
- [ ] Backend server running on port 5000
- [ ] Frontend running on port 5174
- [ ] Can register and login
- [ ] Can add products to cart
- [ ] Can place orders
- [ ] Received order confirmation

---

**Setup Complete! 🎉**

Your ANCIENTSS e-commerce platform is now ready to use!
