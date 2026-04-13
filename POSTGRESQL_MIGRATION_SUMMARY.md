# PostgreSQL Migration Summary

## What Was Changed

### 1. Backend Routes Updated
All backend routes have been updated to use PostgreSQL instead of JSON files.

#### `backend/routes/productRoutes.js`
- ✅ Imports from `../database/postgres.js`
- ✅ All route handlers are now `async/await`
- ✅ Queries use parameterized SQL: `$1, $2, $3` (prevents SQL injection)
- ✅ Uses database functions: `getProducts()`, `getProductById()`, `getProductsByCategory()`
- ✅ Proper error handling with try-catch

#### `backend/routes/userRoutes.js`
- ✅ Updated to use PostgreSQL functions
- ✅ Registration: `db.createUser(userId, name, email, hashedPassword)`
- ✅ Login: `db.getUserByEmail(email)`
- ✅ Profile: `db.getUserById(userId)`
- ✅ Password hashing with bcryptjs
- ✅ JWT token generation on success

#### `backend/routes/orderRoutes.js`
- ✅ Create orders: `db.createOrder()` and `db.addOrderItems()`
- ✅ Get user orders: `db.getUserOrders(userId)`
- ✅ Get order details: `db.getOrderById(orderId)`
- ✅ Automatic stock reduction when order created
- ✅ Authorization checks (users can only view their orders)

### 2. New Database Module
**File**: `backend/database/postgres.js`

12 async functions for database operations:
1. `getProducts()` - Select all products
2. `getProductById(id)` - Select single product
3. `getProductsByCategory(category)` - Filter products
4. `updateProductStock(id, newStock)` - Update inventory
5. `getUserByEmail(email)` - Find user by email
6. `createUser(id, name, email, password)` - Register user
7. `getUserById(id)` - Get user details
8. `createOrder(id, userId, amount, status, address)` - Create order
9. `addOrderItems(orderId, items)` - Add line items
10. `getUserOrders(userId)` - Get all user orders
11. `getOrderById(id)` - Get order with items
12. `closePool()` - Clean shutdown

**Features:**
- Connection pooling (max 20 connections)
- Error handling for each function
- Parameterized queries ($1, $2, etc.)
- Environment variable configuration

### 3. Authentication Middleware Updated
**File**: `backend/middleware/auth.js`

- ✅ Sets `req.userId` for route handlers to use
- ✅ JWT verification with secret from environment
- ✅ 7-day token expiration
- ✅ Bearer token format

### 4. Database Schema Created
**4 Tables with relationships:**

```
products
├── id (PRIMARY KEY)
├── name
├── category
├── price
├── mrp (MRP price)
├── stock (inventory)
├── size
├── brand
├── delivery
├── description
└── image

users
├── id (UUID PRIMARY KEY)
├── name
├── email (UNIQUE)
├── password
└── created_at

orders
├── id (UUID PRIMARY KEY)
├── user_id (FOREIGN KEY → users.id)
├── total_amount
├── status
├── shipping_address
└── created_at

order_items (junction table)
├── id (PRIMARY KEY)
├── order_id (FOREIGN KEY → orders.id)
├── product_id (FOREIGN KEY → products.id)
├── quantity
└── price
```

### 5. Environment Variables
**File**: `.env`

```env
JWT_SECRET=your_ancient_things_secret_key_123
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_PORT=5432
DB_NAME=ancients_db
DB_USER=postgres
DB_PASSWORD=postgres
```

### 6. Package Dependencies
All required packages installed:
- ✅ `pg` - PostgreSQL client
- ✅ `express` - Backend framework
- ✅ `bcryptjs` - Password hashing
- ✅ `jsonwebtoken` - JWT tokens
- ✅ `uuid` - Generate unique IDs
- ✅ `cors` - Cross-origin requests
- ✅ `dotenv` - Environment variables

---

## Migration Benefits

| Feature | JSON Files | PostgreSQL |
|---------|-----------|-----------|
| **Scalability** | Limited | Unlimited |
| **Transactions** | No | Yes |
| **Relationships** | Manual | Foreign Keys |
| **Concurrency** | No locks | ACID compliant |
| **Query Speed** | Slow (full file read) | Fast (indexed) |
| **Data Integrity** | Manual validation | Constraints |
| **Backup** | File copy | Built-in tools |
| **Security** | Basic | Advanced |

---

## Data Flow

### User Registration
1. Frontend: `POST /api/users/register` with name, email, password
2. Backend: Check if email exists in database
3. Hash password with bcryptjs
4. Insert user into PostgreSQL `users` table
5. Generate JWT token
6. Return token to frontend

### Creating Order
1. Frontend: `POST /api/orders` with items array and JWT token
2. Backend: Verify JWT token
3. Create order in `orders` table
4. Add each item to `order_items` table
5. Reduce stock in `products` table for each item
6. Return order details to frontend

### Getting Products
1. Frontend: `GET /api/products`
2. Backend: Query `products` table
3. Return product array to frontend
4. Frontend: Display products with images

---

## Testing the Migration

### 1. Test Backend Connection
```bash
npm run server
```
Look for: `✓ Connected to PostgreSQL Database`

### 2. Test Product Endpoint
```bash
curl http://localhost:5000/api/products
```
Should return array of products from database

### 3. Test Registration
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```
Should return JWT token

### 4. Complete Flow
1. Start servers: `npm run dev` and `npm run server`
2. Open http://localhost:5173
3. Register/Login
4. Browse products
5. Add to cart
6. Create order

---

## Important Notes

- **Database must be running** before starting backend
- **PostgreSQL port 5432** must be available
- **JWT token expires in 7 days** - users must login again
- **Passwords are hashed** with bcryptjs (10 salt rounds)
- **Stock updates automatically** when orders created
- **All queries are parameterized** (safe from SQL injection)

---

## Troubleshooting PostgreSQL

### "connect ECONNREFUSED"
PostgreSQL service not running:
1. Open Services (Windows + R: `services.msc`)
2. Find "postgresql-x64-15"
3. Right-click → "Start" if not running
4. Restart backend

### "password authentication failed"
Wrong credentials in `.env`:
1. Verify DB_PASSWORD matches postgres installation password
2. Connect manually: `psql -U postgres -h localhost`
3. Update `.env` file
4. Restart backend

### "database 'ancients_db' does not exist"
Database not created:
1. Run: `psql -U postgres -h localhost`
2. Run: `CREATE DATABASE ancients_db;`
3. Run table creation SQL from DATABASE_CONNECTION_GUIDE.md
4. Restart backend

---

## Next Phase

Your application is now:
- ✅ Running with PostgreSQL (production-ready)
- ✅ Has proper data relationships
- ✅ Can handle multiple users simultaneously
- ✅ Has transaction support for orders
- ✅ Secured against SQL injection

Next steps (optional):
- Add email notifications on order
- Implement order tracking
- Add product reviews
- Create admin dashboard
- Deploy to cloud (Heroku, AWS, etc.)
