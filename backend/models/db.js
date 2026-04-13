import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Mock database - In production, use MongoDB or PostgreSQL
const dataDir = path.join(__dirname, '../data');
if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
}

// ================= PRODUCT DATA =================
const productsFile = path.join(dataDir, 'products.json');
const defaultProducts = [
    {
        id: 1,
        name: "Wood Craft Wall Decor",
        category: "woodcraft",
        price: 1149,
        mrp: 1915,
        stock: 44,
        size: "12 x 8 inches",
        brand: "Ancient Artisans",
        delivery: "Jan 24 - Feb 03",
        description: "Handcrafted wooden wall decor made by skilled artisans using traditional techniques.",
        image: "/images/woodcraft.JPG"
    },
    {
        id: 2,
        name: "Brass Pooja Lamp",
        category: "pooja",
        price: 1299,
        mrp: 1899,
        stock: 20,
        size: "10 inches",
        brand: "Heritage Brass",
        delivery: "Jan 27 - Feb 06",
        description: "Traditional brass lamp ideal for daily pooja rituals and home decor.",
        image: "/images/poojacraft.jpg"
    },
    {
        id: 3,
        name: "Madhubani Painting",
        category: "madhubani",
        price: 2499,
        mrp: 3499,
        stock: 12,
        size: "18 x 24 inches",
        brand: "Bihar Folk Arts",
        delivery: "Jan 25 - Feb 02",
        description: "Authentic hand-painted Madhubani artwork representing the finest of Indian folk art.",
        image: "/images/madhurani paintings.jpg"
    },
    {
        id: 4,
        name: "Resin Earrings",
        category: "resin",
        price: 699,
        mrp: 999,
        stock: 50,
        size: "Medium",
        brand: "ResinCraft",
        delivery: "Jan 26 - Feb 04",
        description: "Stylish handmade resin earrings with unique designs.",
        image: "/images/resine.jpg"
    },
    {
        id: 5,
        name: "Decorative Candle",
        category: "candles",
        price: 499,
        mrp: 799,
        stock: 60,
        size: "Standard",
        brand: "Glow Art",
        delivery: "Jan 24 - Feb 01",
        description: "Aromatic decorative candle for home decor.",
        image: "/images/candle.jpg"
    },
    {
        id: 6,
        name: "Handmade Cushion",
        category: "cushion",
        price: 899,
        mrp: 1299,
        stock: 30,
        size: "16 x 16 inches",
        brand: "Soft Loom",
        delivery: "Jan 27 - Feb 05",
        description: "Comfortable handmade cushion with ethnic design.",
        image: "/images/handmadecushion.jpg"
    },
    {
        id: 7,
        name: "Wall Clock",
        category: "wall-clock",
        price: 1599,
        mrp: 2199,
        stock: 18,
        size: "12 inches",
        brand: "Time Heritage",
        delivery: "Jan 28 - Feb 07",
        description: "Vintage handmade wall clock with antique finish.",
        image: "/images/clock.jpg"
    },
    {
        id: 8,
        name: "Traditional Saree",
        category: "sarees",
        price: 1898,
        mrp: 2799,
        stock: 15,
        size: "Free Size",
        brand: "Ethnic Weaves",
        delivery: "Jan 29 - Feb 08",
        description: "Traditional handcrafted saree with intricate designs.",
        image: "/images/saree.jpg"
    },
    {
        id: 9,
        name: "Decorative Bottle",
        category: "bottle",
        price: 1000,
        mrp: 1499,
        stock: 22,
        size: "Medium",
        brand: "Ancient Decor",
        delivery: "Jan 26 - Feb 03",
        description: "Hand-painted decorative glass bottle with ancient designs.",
        image: "/images/bottle.jpg"
    },
    {
        id: 10,
        name: "Tealights Pack",
        category: "lights",
        price: 1099,
        mrp: 1599,
        stock: 40,
        size: "Pack of 10",
        brand: "Glow Home",
        delivery: "Jan 25 - Feb 02",
        description: "Decorative tealight candles for festivals and celebrations.",
        image: "/images/tealights.jpg"
    }
];

// Initialize products file if it doesn't exist
if (!fs.existsSync(productsFile)) {
    fs.writeFileSync(productsFile, JSON.stringify(defaultProducts, null, 2));
}

// ================= DATABASE FUNCTIONS =================
const getProducts = () => {
    const data = fs.readFileSync(productsFile, 'utf-8');
    return JSON.parse(data);
};

const getProductById = (id) => {
    const products = getProducts();
    return products.find(p => p.id === parseInt(id));
};

const updateProduct = (id, updatedData) => {
    const products = getProducts();
    const index = products.findIndex(p => p.id === parseInt(id));
    if (index !== -1) {
        products[index] = { ...products[index], ...updatedData };
        fs.writeFileSync(productsFile, JSON.stringify(products, null, 2));
        return products[index];
    }
    return null;
};

// ================= USERS DATA =================
const usersFile = path.join(dataDir, 'users.json');
const getUsers = () => {
    if (!fs.existsSync(usersFile)) return [];
    const data = fs.readFileSync(usersFile, 'utf-8');
    return JSON.parse(data) || [];
};

const saveUsers = (users) => {
    fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
};

const getUserByEmail = (email) => {
    const users = getUsers();
    return users.find(u => u.email === email);
};

const addUser = (user) => {
    const users = getUsers();
    users.push(user);
    saveUsers(users);
    return user;
};

// ================= ORDERS DATA =================
const ordersFile = path.join(dataDir, 'orders.json');
const getOrders = () => {
    if (!fs.existsSync(ordersFile)) return [];
    const data = fs.readFileSync(ordersFile, 'utf-8');
    return JSON.parse(data) || [];
};

const saveOrders = (orders) => {
    fs.writeFileSync(ordersFile, JSON.stringify(orders, null, 2));
};

const addOrder = (order) => {
    const orders = getOrders();
    orders.push(order);
    saveOrders(orders);
    return order;
};

export {
    getProducts,
    getProductById,
    updateProduct,
    getUsers,
    saveUsers,
    getUserByEmail,
    addUser,
    getOrders,
    saveOrders,
    addOrder
};
