# API Testing Guide

## Setup for Testing

### Prerequisites
- Backend running on http://localhost:5000
- PostgreSQL connected with sample data
- JWT token from login/register

### Tool Options
- **cURL** (Command Prompt)
- **Postman** (GUI)
- **VS Code REST Client** Extension

---

## API Endpoints

### 1. GET /api/products
**Get all products**

```bash
curl http://localhost:5000/api/products
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "name": "Ancient Roman Coin",
      "category": "Coins",
      "price": "99.99",
      "mrp": "149.99",
      "stock": 50,
      "image": "/images/product1.jpg"
    },
    ...
  ]
}
```

---

### 2. GET /api/products/:id
**Get single product**

```bash
curl http://localhost:5000/api/products/1
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": 1,
    "name": "Ancient Roman Coin",
    "category": "Coins",
    "price": "99.99",
    "mrp": "149.99",
    "stock": 50,
    "size": "2cm",
    "brand": "Roman Empire",
    "delivery": "Free Shipping",
    "description": "Authentic Roman coin replica",
    "image": "/images/product1.jpg",
    "created_at": "2024-01-15T10:30:00.000Z"
  }
}
```

**Errors:**
- 404: Product not found
- 500: Database error

---

### 3. GET /api/products/category/:category
**Filter products by category**

Categories: Coins, Amulets, Pottery, Weapons, Masks, Statues, Tablets, Lamps

```bash
curl http://localhost:5000/api/products/category/Coins
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    // Products with category "Coins"
  ]
}
```

---

### 4. POST /api/users/register
**Register new user**

```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response (201):**
```json
{
  "success": true,
  "message": "User registered successfully",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Errors:**
- 400: Email already registered
- 400: Missing fields
- 500: Database error

**Save token for next requests:**
```
Token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

---

### 5. POST /api/users/login
**User login**

```bash
curl -X POST http://localhost:5000/api/users/login \
  -H "Content-Type: application/json" \
  -d '{
    "email": "john@example.com",
    "password": "password123"
  }'
```

**Response (200):**
```json
{
  "success": true,
  "message": "Login successful",
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "john@example.com"
  }
}
```

**Errors:**
- 401: Invalid email or password
- 400: Missing fields
- 500: Database error

---

### 6. GET /api/users/profile
**Get user profile (requires token)**

```bash
curl http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

Replace `YOUR_JWT_TOKEN` with token from login/register.

**Response (200):**
```json
{
  "success": true,
  "user": {
    "id": "550e8400-e29b-41d4-a716-446655440000",
    "name": "John Doe",
    "email": "john@example.com",
    "created_at": "2024-01-15T10:30:00.000Z"
  }
}
```

**Errors:**
- 401: No token provided
- 401: Invalid token
- 404: User not found
- 500: Database error

---

### 7. POST /api/orders
**Create order (requires token)**

```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer YOUR_JWT_TOKEN" \
  -d '{
    "items": [
      {
        "id": 1,
        "name": "Ancient Roman Coin",
        "price": 99.99,
        "quantity": 2
      },
      {
        "id": 2,
        "name": "Egyptian Scarab",
        "price": 49.99,
        "quantity": 1
      }
    ],
    "totalPrice": 249.97,
    "shippingAddress": "123 Main St, New York, NY 10001"
  }'
```

**Response (201):**
```json
{
  "success": true,
  "message": "Order placed successfully",
  "order": {
    "id": "660e8400-e29b-41d4-a716-446655440000",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "total_amount": "249.97",
    "status": "confirmed",
    "shipping_address": "123 Main St, New York, NY 10001",
    "created_at": "2024-01-15T11:00:00.000Z",
    "items": [
      {
        "product_id": 1,
        "quantity": 2,
        "price": 99.99
      },
      {
        "product_id": 2,
        "quantity": 1,
        "price": 49.99
      }
    ]
  }
}
```

**Effects:**
- Creates entry in `orders` table
- Adds entries to `order_items` table
- Reduces stock in `products` table

**Errors:**
- 400: No items in order
- 401: No token provided
- 500: Database error

---

### 8. GET /api/orders
**Get user's orders (requires token)**

```bash
curl http://localhost:5000/api/orders \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response (200):**
```json
{
  "success": true,
  "data": [
    {
      "id": "660e8400-e29b-41d4-a716-446655440000",
      "user_id": "550e8400-e29b-41d4-a716-446655440000",
      "total_amount": "249.97",
      "status": "confirmed",
      "created_at": "2024-01-15T11:00:00.000Z",
      "items": [...]
    }
  ]
}
```

**Errors:**
- 401: No token provided
- 500: Database error

---

### 9. GET /api/orders/:id
**Get specific order (requires token)**

```bash
curl http://localhost:5000/api/orders/660e8400-e29b-41d4-a716-446655440000 \
  -H "Authorization: Bearer YOUR_JWT_TOKEN"
```

**Response (200):**
```json
{
  "success": true,
  "data": {
    "id": "660e8400-e29b-41d4-a716-446655440000",
    "user_id": "550e8400-e29b-41d4-a716-446655440000",
    "total_amount": "249.97",
    "status": "confirmed",
    "shipping_address": "123 Main St, New York, NY 10001",
    "created_at": "2024-01-15T11:00:00.000Z",
    "items": [
      {
        "product_id": 1,
        "name": "Ancient Roman Coin",
        "quantity": 2,
        "price": 99.99
      }
    ]
  }
}
```

**Errors:**
- 404: Order not found
- 403: Not authorized (user trying to access other user's order)
- 401: No token provided
- 500: Database error

---

### 10. POST /api/cart/calculate
**Calculate cart total (no auth needed)**

```bash
curl -X POST http://localhost:5000/api/cart/calculate \
  -H "Content-Type: application/json" \
  -d '{
    "items": [
      {
        "id": 1,
        "name": "Ancient Roman Coin",
        "price": 99.99,
        "quantity": 2
      }
    ]
  }'
```

**Response (200):**
```json
{
  "success": true,
  "subtotal": 199.98,
  "gst": 35.9964,
  "total": 235.9764
}
```

---

## Complete Test Workflow

### Step 1: Register User
```bash
curl -X POST http://localhost:5000/api/users/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"password123"}'
```
**Copy the token from response**

### Step 2: Get All Products
```bash
curl http://localhost:5000/api/products
```

### Step 3: Get Single Product
```bash
curl http://localhost:5000/api/products/1
```

### Step 4: Calculate Cart
```bash
curl -X POST http://localhost:5000/api/cart/calculate \
  -H "Content-Type: application/json" \
  -d '{"items":[{"id":1,"name":"Roman Coin","price":99.99,"quantity":2}]}'
```

### Step 5: Create Order
```bash
curl -X POST http://localhost:5000/api/orders \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer TOKEN_HERE" \
  -d '{"items":[{"id":1,"name":"Roman Coin","price":99.99,"quantity":1}],"totalPrice":99.99,"shippingAddress":"123 Main St"}'
```

### Step 6: Get User Orders
```bash
curl http://localhost:5000/api/orders \
  -H "Authorization: Bearer TOKEN_HERE"
```

### Step 7: Get Specific Order
```bash
curl http://localhost:5000/api/orders/ORDER_ID_HERE \
  -H "Authorization: Bearer TOKEN_HERE"
```

### Step 8: Get User Profile
```bash
curl http://localhost:5000/api/users/profile \
  -H "Authorization: Bearer TOKEN_HERE"
```

---

## Status Codes Reference

| Code | Meaning |
|------|---------|
| 200 | Success (GET) |
| 201 | Created (POST) |
| 400 | Bad Request (invalid data) |
| 401 | Unauthorized (no/invalid token) |
| 403 | Forbidden (not authorized) |
| 404 | Not Found |
| 500 | Server Error (database issue) |

---

## Database Verification Commands

Verify data in PostgreSQL:

```bash
psql -U postgres -d ancients_db -h localhost

# View all products
SELECT * FROM products LIMIT 5;

# View all users
SELECT id, name, email, created_at FROM users;

# View all orders
SELECT * FROM orders;

# View order items
SELECT * FROM order_items;

# Count total products
SELECT COUNT(*) FROM products;

# Exit
\q
```

---

## Using Postman

1. Download Postman: https://www.postman.com/download/
2. Import requests by creating collection
3. Set Base URL: http://localhost:5000
4. For authenticated requests, go to Headers and add:
   - Key: `Authorization`
   - Value: `Bearer YOUR_JWT_TOKEN`

---

## Frontend Testing

1. Open http://localhost:5173
2. Register new user (will call /api/users/register)
3. Login (will call /api/users/login, stores token)
4. Browse products (calls /api/products)
5. Add to cart
6. Checkout (calls /api/orders)
7. View orders (calls /api/orders)

All frontend operations use the same API endpoints tested above.
