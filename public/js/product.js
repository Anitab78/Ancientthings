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

/* ================= LOAD PRODUCT DETAILS ================= */
document.addEventListener("DOMContentLoaded", () => {
    const params = new URLSearchParams(window.location.search);
    const productId = parseInt(params.get("id"));

    const product = products.find(p => p.id === productId);

    if (product) {
        document.getElementById("productImage").src = product.image;
        document.getElementById("productName").innerText = product.name;
        document.getElementById("price").innerText = product.price;
        document.getElementById("mrp").innerText = product.mrp;
        document.getElementById("savings").innerText = product.mrp - product.price;
        document.getElementById("stock").innerText = product.stock;
        document.getElementById("size").innerText = product.size;
        document.getElementById("brand").innerText = product.brand;
        document.getElementById("delivery").innerText = product.delivery;
        document.getElementById("description").innerText = product.description;

        // Add to cart button
        const addCartBtn = document.querySelector(".add-cart");
        if (addCartBtn) {
            addCartBtn.addEventListener("click", () => {
                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                cart.push(product);
                localStorage.setItem("cart", JSON.stringify(cart));
                alert(product.name + " added to cart!");
            });
        }

        // Buy now button
        const buyNowBtn = document.querySelector(".buy-now");
        if (buyNowBtn) {
            buyNowBtn.addEventListener("click", () => {
                let cart = JSON.parse(localStorage.getItem("cart")) || [];
                cart.push(product);
                localStorage.setItem("cart", JSON.stringify(cart));
                window.location.href = "cart.html";
            });
        }
    } else {
        document.body.innerHTML = "<h2 style='text-align:center; margin-top: 50px;'>Product not found</h2>";
    }
});
