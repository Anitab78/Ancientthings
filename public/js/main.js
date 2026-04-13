/* ================= PRODUCT DATA ================= */
const products = [
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

/* ================= RENDER PRODUCTS ================= */
const grid = document.getElementById("productGrid");

function renderProducts(list) {
    if (!grid) return;
    
    grid.innerHTML = "";
    list.forEach(p => {
        const card = document.createElement("div");
        card.className = "card";
        card.innerHTML = `
            <a href="product.html?id=${p.id}">
                <img src="${p.image}" alt="${p.name}">
            </a>
            <div class="card-body">
                <h4>${p.name}</h4>
                <p class="price">₹${p.price}</p>
                <button class="add-cart" onclick="addToCart(${p.id}, event)">Add to Cart</button>
            </div>
        `;
        grid.appendChild(card);
    });
}

/* ================= FILTER PRODUCTS ================= */
function filterProducts(category) {
    const filtered = category === 'all' ? products : products.filter(p => p.category === category);
    renderProducts(filtered);
}

/* ================= CART MANAGEMENT ================= */
let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(productId, event) {
    event.preventDefault();
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product);
        localStorage.setItem("cart", JSON.stringify(cart));
        alert(product.name + " added to cart!");
    }
}

/* ================= HERO BANNER SLIDER ================= */
document.addEventListener("DOMContentLoaded", () => {
    const slider = document.getElementById("heroSlider");
    if (!slider) return;
    
    const slides = document.querySelectorAll(".hero-slide");
    let currentIndex = 0;
    const totalSlides = slides.length;
    const slideInterval = 4000;
    let autoSlide;

    function updateSlider() {
        slider.style.transform = `translateX(-${currentIndex * 100}%)`;
    }

    window.moveSlide = function(direction) {
        currentIndex += direction;
        if (currentIndex < 0) currentIndex = totalSlides - 1;
        if (currentIndex >= totalSlides) currentIndex = 0;
        updateSlider();
        resetAutoSlide();
    };

    function startAutoSlide() {
        autoSlide = setInterval(() => {
            currentIndex++;
            if (currentIndex >= totalSlides) currentIndex = 0;
            updateSlider();
        }, slideInterval);
    }

    function resetAutoSlide() {
        clearInterval(autoSlide);
        startAutoSlide();
    }

    updateSlider();
    startAutoSlide();

    // Load products on home page
    renderProducts(products);
});
