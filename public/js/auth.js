/* ================= LOGIN & REGISTER FUNCTIONALITY ================= */

// LOGIN FORM
const loginForm = document.getElementById("loginForm");
if (loginForm) {
    loginForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const email = document.getElementById("loginEmail").value;
        const password = document.getElementById("loginPassword").value;

        // Validate input
        if (!email || !password) {
            alert("Please fill in all fields");
            return;
        }

        // Save to localStorage (basic authentication)
        const users = JSON.parse(localStorage.getItem("users")) || [];
        const user = users.find(u => u.email === email && u.password === password);

        if (user) {
            localStorage.setItem("currentUser", JSON.stringify(user));
            alert("Login successful!");
            window.location.href = "index.html";
        } else {
            alert("Invalid email or password");
        }
    });
}

// REGISTER FORM
const registerForm = document.getElementById("registerForm");
if (registerForm) {
    registerForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const name = document.getElementById("name").value;
        const email = document.getElementById("email").value;
        const password = document.getElementById("password").value;

        // Validate input
        if (!name || !email || !password) {
            alert("Please fill in all fields");
            return;
        }

        // Check if email already exists
        const users = JSON.parse(localStorage.getItem("users")) || [];
        if (users.find(u => u.email === email)) {
            alert("Email already registered");
            return;
        }

        // Add new user
        const newUser = { id: Date.now(), name, email, password };
        users.push(newUser);
        localStorage.setItem("users", JSON.stringify(users));

        alert("Account created successfully! Please login.");
        window.location.href = "login.html";
    });
}

// Check if user is logged in
function checkLogin() {
    const currentUser = localStorage.getItem("currentUser");
    return currentUser ? JSON.parse(currentUser) : null;
}

// Logout function
function logout() {
    localStorage.removeItem("currentUser");
    window.location.href = "index.html";
}
