import pg from 'pg';
const { Pool } = pg;

// Fallback product data
const fallbackProducts = [
  { id: 1, name: "Wood Craft Wall Decor", category: "woodcraft", price: 1149, mrp: 1915, stock: 44, size: "12 x 8 inches", brand: "Ancient Artisans", delivery: "Jan 24 - Feb 03", description: "Handcrafted wooden wall decor", image: "/images/woodcraft.JPG" },
  { id: 2, name: "Brass Pooja Lamp", category: "pooja", price: 1299, mrp: 1899, stock: 20, size: "10 inches", brand: "Heritage Brass", delivery: "Jan 27 - Feb 06", description: "Traditional brass lamp", image: "/images/poojacraft.jpg" },
  { id: 3, name: "Madhubani Painting", category: "madhubani", price: 2499, mrp: 3499, stock: 12, size: "18 x 24 inches", brand: "Bihar Folk Arts", delivery: "Jan 25 - Feb 02", description: "Hand-painted Madhubani art", image: "/images/madhurani paintings.jpg" },
  { id: 4, name: "Resin Earrings", category: "resin", price: 699, mrp: 999, stock: 50, size: "Medium", brand: "ResinCraft", delivery: "Jan 26 - Feb 04", description: "Handmade resin earrings", image: "/images/resine.jpg" },
  { id: 5, name: "Decorative Candle", category: "candles", price: 499, mrp: 799, stock: 60, size: "Standard", brand: "CandleArt", delivery: "Jan 23 - Feb 01", description: "Scented candles", image: "/images/candles.jpg" },
  { id: 6, name: "Glass Painting", category: "glassart", price: 899, mrp: 1299, stock: 30, size: "10 x 12 inches", brand: "GlassArt Studios", delivery: "Jan 28 - Feb 05", description: "Hand-painted glass art", image: "/images/glass_painting.jpg" },
  { id: 7, name: "Handmade Earrings", category: "handmade", price: 599, mrp: 899, stock: 40, size: "One Size", brand: "ArtisanJewels", delivery: "Jan 25 - Feb 03", description: "Traditional earrings", image: "/images/handmade_earrings.jpg" },
  { id: 8, name: "Photo Frame", category: "frames", price: 449, mrp: 699, stock: 55, size: "8 x 10 inches", brand: "FrameArt", delivery: "Jan 26 - Feb 04", description: "Wooden photo frames", image: "/images/photo_frame.jpg" },
  { id: 9, name: "Lamp", category: "lamps", price: 1599, mrp: 2299, stock: 25, size: "18 inches", brand: "LampCraft", delivery: "Jan 24 - Feb 02", description: "Traditional brass lamp", image: "/images/lamp.jpg" },
  { id: 10, name: "Pottery Vase", category: "pottery", price: 799, mrp: 1199, stock: 35, size: "12 inches", brand: "PotteryWorks", delivery: "Jan 27 - Feb 05", description: "Hand-thrown ceramic vase", image: "/images/pottery.jpg" },
];

let useDatabase = false;
let pool = null;

try {
  pool = new Pool({
    host: process.env.DB_HOST || 'localhost',
    port: process.env.DB_PORT || 5432,
    database: process.env.DB_NAME || 'ancients_db',
    user: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || 'postgres',
  });

  pool.on('connect', () => {
    useDatabase = true;
    console.log('✓ Connected to PostgreSQL Database');
  });

  pool.on('error', (err) => {
    useDatabase = false;
    console.log('⚠️ Using fallback data (PostgreSQL not connected)');
  });
} catch (err) {
  console.log('⚠️ PostgreSQL connection failed, using fallback data');
}

// ================= PRODUCTS FUNCTIONS =================
const getProducts = async () => {
    try {
        if (!useDatabase || !pool) return fallbackProducts;
        const result = await pool.query('SELECT * FROM products ORDER BY id');
        return result.rows;
    } catch (err) {
        console.log('Using fallback products');
        return fallbackProducts;
    }
};

const getProductById = async (id) => {
    try {
        if (!useDatabase || !pool) return fallbackProducts.find(p => p.id === parseInt(id));
        const result = await pool.query('SELECT * FROM products WHERE id = $1', [id]);
        return result.rows[0];
    } catch (err) {
        return fallbackProducts.find(p => p.id === parseInt(id));
    }
};

const getProductsByCategory = async (category) => {
    try {
        if (!useDatabase || !pool) return fallbackProducts.filter(p => p.category === category);
        const result = await pool.query('SELECT * FROM products WHERE category = $1', [category]);
        return result.rows;
    } catch (err) {
        return fallbackProducts.filter(p => p.category === category);
    }
};

const updateProductStock = async (id, newStock) => {
    try {
        if (!useDatabase || !pool) {
            const product = fallbackProducts.find(p => p.id === id);
            if (product) product.stock = newStock;
            return product;
        }
        const result = await pool.query(
            'UPDATE products SET stock = $1 WHERE id = $2 RETURNING *',
            [newStock, id]
        );
        return result.rows[0];
    } catch (err) {
        return fallbackProducts.find(p => p.id === id);
    }
};

// ================= USERS FUNCTIONS =================
const getUserByEmail = async (email) => {
    try {
        if (!useDatabase || !pool) return null;
        const result = await pool.query('SELECT * FROM users WHERE email = $1', [email]);
        return result.rows[0];
    } catch (err) {
        return null;
    }
};

const createUser = async (id, name, email, hashedPassword) => {
    try {
        if (!useDatabase || !pool) return { id, name, email };
        const result = await pool.query(
            'INSERT INTO users (id, name, email, password) VALUES ($1, $2, $3, $4) RETURNING id, name, email',
            [id, name, email, hashedPassword]
        );
        return result.rows[0];
    } catch (err) {
        return { id, name, email };
    }
};

const getUserById = async (id) => {
    try {
        if (!useDatabase || !pool) return null;
        const result = await pool.query('SELECT id, name, email FROM users WHERE id = $1', [id]);
        return result.rows[0];
    } catch (err) {
        return null;
    }
};

// ================= ORDERS FUNCTIONS =================
const createOrder = async (orderId, userId, totalPrice, shippingAddress, estimatedDelivery) => {
    try {
        if (!useDatabase || !pool) return { id: orderId, user_id: userId, total_price: totalPrice };
        const result = await pool.query(
            'INSERT INTO orders (id, user_id, total_price, shipping_address, estimated_delivery) VALUES ($1, $2, $3, $4, $5) RETURNING *',
            [orderId, userId, totalPrice, shippingAddress, estimatedDelivery]
        );
        return result.rows[0];
    } catch (err) {
        return { id: orderId, user_id: userId, total_price: totalPrice };
    }
};

const addOrderItems = async (orderId, items) => {
    try {
        if (!useDatabase || !pool) return true;
        for (const item of items) {
            await pool.query(
                'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ($1, $2, $3, $4)',
                [orderId, item.id, item.quantity, item.price]
            );
        }
        return true;
    } catch (err) {
        return true;
    }
};

const getUserOrders = async (userId) => {
    try {
        if (!useDatabase || !pool) return [];
        const result = await pool.query(
            `SELECT o.*, 
                    json_agg(json_build_object('id', oi.id, 'product_id', oi.product_id, 'quantity', oi.quantity, 'price', oi.price)) as items
             FROM orders o
             LEFT JOIN order_items oi ON o.id = oi.order_id
             WHERE o.user_id = $1
             GROUP BY o.id
             ORDER BY o.created_at DESC`,
            [userId]
        );
        return result.rows;
    } catch (err) {
        return [];
    }
};

const getOrderById = async (orderId) => {
    try {
        if (!useDatabase || !pool) return null;
        const result = await pool.query(
            `SELECT o.*, 
                    json_agg(json_build_object('id', oi.id, 'product_id', oi.product_id, 'quantity', oi.quantity, 'price', oi.price)) as items
             FROM orders o
             LEFT JOIN order_items oi ON o.id = oi.order_id
             WHERE o.id = $1
             GROUP BY o.id`,
            [orderId]
        );
        return result.rows[0];
    } catch (err) {
        return null;
    }
};

// ================= CONNECTION CLOSE =================
const closePool = async () => {
    await pool.end();
};

export {
    pool,
    getProducts,
    getProductById,
    getProductsByCategory,
    updateProductStock,
    getUserByEmail,
    createUser,
    getUserById,
    createOrder,
    addOrderItems,
    getUserOrders,
    getOrderById,
    closePool
};
