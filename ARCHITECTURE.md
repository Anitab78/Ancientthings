# PostgreSQL Architecture & Data Flow

## System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                     ANCIENT THINGS E-COMMERCE                   │
└─────────────────────────────────────────────────────────────────┘

┌──────────────────────┐          ┌──────────────────────┐
│   FRONTEND (Vite)    │          │   BACKEND (Express)  │
│  http://5173         │◄────────►│  http://5000         │
│                      │  REST API│                      │
│ - React Components   │          │ - Route Handlers     │
│ - Product Display    │          │ - Authentication     │
│ - Cart Management    │          │ - Business Logic     │
│ - User Auth          │          │ - Database Access    │
└──────────────────────┘          └──────────────────────┘
                                            ▼
                                  ┌──────────────────┐
                                  │  postgres.js     │
                                  │  Connection Pool │
                                  └────────┬─────────┘
                                           ▼
                          ┌────────────────────────────────┐
                          │   PostgreSQL Database (Port 5432)
                          └────────────────────────────────┘
                                    ▼
                    ┌──────────────────────────────────────┐
                    │          4 Related Tables           │
                    ├──────────────────────────────────────┤
                    │  products    │ users               │
                    │  orders      │ order_items         │
                    └──────────────────────────────────────┘
```

---

## Data Flow: User Registration

```
User enters credentials
        │
        ▼
┌─────────────────────────────────────┐
│  POST /api/users/register           │
│  Frontend sends: name, email, pass  │
└─────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────┐
│  Backend Route Handler              │
│  1. Validate input                  │
│  2. Hash password (bcryptjs)        │
│  3. Generate UUID for user ID       │
└─────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────┐
│  postgres.js                        │
│  Call: db.createUser(...)           │
│  SQL: INSERT INTO users...          │
└─────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────┐
│  PostgreSQL Database                │
│  Write to users table               │
│  id, name, email, password          │
└─────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────┐
│  Generate JWT Token                 │
│  Valid for 7 days                   │
└─────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────┐
│  Response (201 Created)             │
│  Send: token, user data             │
│  Frontend stores token in localStorage
└─────────────────────────────────────┘
```

---

## Data Flow: Create Order

```
User clicks "Place Order"
        │
        ▼
┌─────────────────────────────────────┐
│  POST /api/orders                   │
│  Frontend sends:                    │
│  - items (product ID, quantity)     │
│  - totalPrice                       │
│  - shippingAddress                  │
│  - JWT token (Authorization header) │
└─────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────┐
│  Auth Middleware                    │
│  verifyToken()                      │
│  Decode JWT → Set req.userId        │
└─────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────┐
│  Order Route Handler                │
│  1. Generate order UUID             │
│  2. Validate items exist            │
│  3. Prepare data                    │
└─────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────┐
│  postgres.js - Step 1               │
│  Call: db.createOrder(...)          │
│  SQL: INSERT INTO orders...         │
└─────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────┐
│  PostgreSQL - orders table          │
│  Create order record                │
│  id, user_id, total_amount, status  │
└─────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────┐
│  postgres.js - Step 2               │
│  Call: db.addOrderItems(...)        │
│  SQL: INSERT INTO order_items...    │
├─────────────────────────────────────┤
│  For each item:                     │
│  - order_id                         │
│  - product_id                       │
│  - quantity                         │
│  - price                            │
└─────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────┐
│  PostgreSQL - order_items table     │
│  Create line items                  │
│  Links order → products             │
└─────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────┐
│  postgres.js - Step 3               │
│  For each item:                     │
│  Call: db.updateProductStock(...)   │
│  SQL: UPDATE products SET stock...  │
└─────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────┐
│  PostgreSQL - products table        │
│  Reduce stock for each product      │
│  stock = stock - quantity           │
└─────────────────────────────────────┘
        │
        ▼
┌─────────────────────────────────────┐
│  Response (201 Created)             │
│  Send: order details with items     │
│  Frontend shows confirmation        │
└─────────────────────────────────────┘
```

---

## Database Table Relationships

```
┌─────────────────┐
│     users       │  ◄─────┐
├─────────────────┤        │
│ id (UUID) ← PK  │        │ FK
│ name            │        │
│ email (UNIQUE)  │        │
│ password        │        │
│ created_at      │        │
└─────────────────┘        │
                           │
                      ┌────┴──────────┐
                      │               │
                 ┌────▼──────────┐   │
                 │    orders     │   │
                 ├───────────────┤   │
                 │ id (UUID) ← PK│───┘ FK
                 │ user_id       │
                 │ total_amount  │
                 │ status        │
                 │ shipping_addr │
                 │ created_at    │
                 └────┬──────────┘
                      │ FK
                 ┌────▼─────────────┐
                 │  order_items     │
                 ├──────────────────┤
                 │ id → PK          │
                 │ order_id ← FK    │
                 │ product_id ← FK  │
                 │ quantity         │
                 │ price            │
                 └────┬─────────────┘
                      │ FK
                 ┌────▼──────────┐
                 │   products    │
                 ├───────────────┤
                 │ id ← PK       │
                 │ name          │
                 │ category      │
                 │ price         │
                 │ mrp           │
                 │ stock         │
                 │ brand         │
                 │ description   │
                 │ image         │
                 │ created_at    │
                 └───────────────┘

Legend:
← PK = Primary Key
← FK = Foreign Key
◄─── = Relationship
```

---

## Query Examples

### Get User's Orders with Items

```sql
SELECT 
  o.*,
  json_agg(
    json_build_object(
      'product_id', oi.product_id,
      'product_name', p.name,
      'quantity', oi.quantity,
      'price', oi.price
    )
  ) as items
FROM orders o
LEFT JOIN order_items oi ON o.id = oi.order_id
LEFT JOIN products p ON oi.product_id = p.id
WHERE o.user_id = $1
GROUP BY o.id;
```

### Get Product with Stock Status

```sql
SELECT 
  id,
  name,
  price,
  stock,
  CASE 
    WHEN stock > 10 THEN 'In Stock'
    WHEN stock > 0 THEN 'Low Stock'
    ELSE 'Out of Stock'
  END as availability
FROM products;
```

---

## Security Features

```
┌──────────────────────────────────────┐
│      SECURITY LAYERS                 │
└──────────────────────────────────────┘

1. PASSWORD PROTECTION
   ├─ User enters password
   ├─ bcryptjs hashes it (10 salt rounds)
   └─ Only hash stored in database
   
2. SQL INJECTION PREVENTION
   ├─ Parameterized queries: $1, $2, $3
   ├─ Never concatenate user input
   └─ PostgreSQL handles escaping

3. AUTHENTICATION
   ├─ JWT token on login/register
   ├─ Token expires in 7 days
   └─ Verified on protected routes

4. AUTHORIZATION
   ├─ Users can only view own orders
   ├─ Verified by comparing user_id
   └─ 403 Forbidden if unauthorized

5. DATABASE CONSTRAINTS
   ├─ email column UNIQUE
   ├─ Foreign key relationships
   ├─ NOT NULL on critical fields
   └─ Type validation (UUID, DECIMAL, etc.)

6. HTTPS (Production Only)
   ├─ Encrypt data in transit
   ├─ Use SSL certificates
   └─ .env secrets not exposed
```

---

## Performance Optimizations

```
┌──────────────────────────────────────┐
│      CONNECTION POOL                 │
│      (backend/database/postgres.js)  │
└──────────────────────────────────────┘

Max Connections: 20
Idle Timeout: 30 seconds
Connection Timeout: 5 seconds
Verification: Every 10 seconds

Benefits:
✓ Reuse connections (no overhead)
✓ Automatic reconnection on failure
✓ Handle concurrent requests
✓ Prevent connection exhaustion
✓ Better resource usage

Alternative: Without pool
✗ New connection per query
✗ Network latency per request
✗ Expensive authentication
✗ Slower response times
```

---

## API Response Flow

```
REQUEST: GET /api/products

┌─────────────────────────────────┐
│ Browser                         │
│ fetch('http://localhost:5000/api/products')
└────────────┬────────────────────┘
             │ HTTP GET
             ▼
┌─────────────────────────────────┐
│ Express Route Handler           │
│ productRoutes.js:               │
│   router.get('/', async...)     │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│ Database Query                  │
│ await db.getProducts()          │
│ SQL: SELECT * FROM products     │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│ PostgreSQL Pool                 │
│ Connection from pool            │
│ Execute SQL                     │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│ Database Disk                   │
│ Fetch rows from products table  │
│ Return result rows              │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│ Route Handler                   │
│ Format response                 │
│ JSON.stringify()                │
└────────────┬────────────────────┘
             │
             ▼
┌─────────────────────────────────┐
│ HTTP Response (200 OK)          │
│ Content-Type: application/json  │
│ [ ... product array ... ]       │
└────────────┬────────────────────┘
             │ JSON over HTTP
             ▼
┌─────────────────────────────────┐
│ Browser                         │
│ Parse JSON                      │
│ Update UI with products         │
└─────────────────────────────────┘

Time breakdown:
Network: ~10-50ms
Query execution: ~5-20ms
Connection pool: ~1-5ms
Total: ~20-75ms
```

---

## Environment Variables

```
┌─────────────────────────────────────┐
│  .env file (Not in Git)             │
├─────────────────────────────────────┤
│ JWT_SECRET=secret_key               │
│ PORT=5000                           │
│ NODE_ENV=development                │
│                                     │
│ DB_HOST=localhost                   │
│ DB_PORT=5432                        │
│ DB_NAME=ancients_db                 │
│ DB_USER=postgres                    │
│ DB_PASSWORD=your_password           │
└─────────────────────────────────────┘

Used in:
1. server.js → PORT
2. middleware/auth.js → JWT_SECRET
3. database/postgres.js → DB_* variables

Production (.env.production):
- Use strong random JWT_SECRET
- Use database remote host
- Use environment variables for secrets
- Never commit to version control
```

---

## Module Dependencies Graph

```
server.js
├─ cors
├─ express
├─ dotenv/config
├─ productRoutes.js
│  └─ database/postgres.js ← DB connection
├─ userRoutes.js
│  ├─ bcryptjs
│  ├─ jsonwebtoken
│  ├─ uuid
│  └─ database/postgres.js
├─ orderRoutes.js
│  ├─ uuid
│  ├─ middleware/auth.js → verifyToken
│  └─ database/postgres.js
└─ cartRoutes.js

database/postgres.js
└─ pg (PostgreSQL client)
```

This architecture ensures scalability, security, and maintainability! 🚀
