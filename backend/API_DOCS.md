# Ancient Things Backend API

## Setup & Installation

```bash
npm install
npm run server:dev
```

Server runs on: `http://localhost:5000`

## API Endpoints

### Products
- `GET /api/products` - Get all products
- `GET /api/products/:id` - Get product by ID
- `GET /api/products/category/:category` - Get products by category

### Users
- `POST /api/users/register` - Register new user
- `POST /api/users/login` - Login user
- `GET /api/users/profile` - Get user profile (requires token)

### Orders
- `POST /api/orders` - Create order (requires token)
- `GET /api/orders/user/:userId` - Get user orders (requires token)
- `GET /api/orders/:id` - Get order by ID (requires token)

### Cart
- `GET /api/cart` - Cart info
- `POST /api/cart/calculate` - Calculate cart total with taxes

## Authentication

Include JWT token in header:
```
Authorization: Bearer <token>
```

## Example Requests

### Register
```json
POST /api/users/register
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
```

### Login
```json
POST /api/users/login
{
  "email": "john@example.com",
  "password": "password123"
}
```

### Create Order
```json
POST /api/orders
Headers: Authorization: Bearer <token>
{
  "items": [
    { "id": 1, "name": "Product", "quantity": 2, "price": 1149 }
  ],
  "totalPrice": 2298,
  "shippingAddress": "123 Main St, City"
}
```

## Data Storage

- Products: `/backend/data/products.json`
- Users: `/backend/data/users.json`
- Orders: `/backend/data/orders.json`

*(For production, use MongoDB or PostgreSQL)*
