// API Configuration
const API_BASE_URL = 'http://localhost:5000/api';

// Helper function for API calls
const apiCall = async (endpoint, options = {}) => {
  const token = localStorage.getItem('authToken');
  
  const headers = {
    'Content-Type': 'application/json',
    ...options.headers,
  };

  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  try {
    const response = await fetch(`${API_BASE_URL}${endpoint}`, {
      ...options,
      headers,
    });

    const data = await response.json();

    if (!response.ok) {
      throw new Error(data.message || 'API Error');
    }

    return data;
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// ================= PRODUCTS API =================
export const productsAPI = {
  // Get all products
  getAll: async (page = 1, limit = 10, category = null) => {
    const params = new URLSearchParams({ page, limit });
    if (category) params.append('category', category);
    return apiCall(`/products?${params}`);
  },

  // Get product by ID
  getById: async (id) => {
    return apiCall(`/products/${id}`);
  },

  // Get products by category
  getByCategory: async (category) => {
    return apiCall(`/products/category/${category}`);
  },

  // Search products
  search: async (keyword) => {
    return apiCall(`/products/search/${keyword}`);
  }
};

// ================= USER API =================
export const userAPI = {
  // Register
  register: async (email, password, name, phone = '') => {
    const data = await apiCall('/users/register', {
      method: 'POST',
      body: JSON.stringify({ email, password, name, phone })
    });
    
    if (data.token) {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  },

  // Login
  login: async (email, password) => {
    const data = await apiCall('/users/login', {
      method: 'POST',
      body: JSON.stringify({ email, password })
    });
    
    if (data.token) {
      localStorage.setItem('authToken', data.token);
      localStorage.setItem('user', JSON.stringify(data.user));
    }
    
    return data;
  },

  // Get profile
  getProfile: async () => {
    return apiCall('/users/profile');
  },

  // Update profile
  updateProfile: async (profileData) => {
    return apiCall('/users/profile', {
      method: 'PUT',
      body: JSON.stringify(profileData)
    });
  },

  // Logout
  logout: () => {
    localStorage.removeItem('authToken');
    localStorage.removeItem('user');
  }
};

// ================= CART API =================
export const cartAPI = {
  // Get cart
  get: async () => {
    return apiCall('/cart');
  },

  // Add to cart
  add: async (productId, quantity = 1) => {
    return apiCall('/cart/add', {
      method: 'POST',
      body: JSON.stringify({ product_id: productId, quantity })
    });
  },

  // Update cart item
  update: async (cartId, quantity) => {
    return apiCall(`/cart/update/${cartId}`, {
      method: 'PUT',
      body: JSON.stringify({ quantity })
    });
  },

  // Remove from cart
  remove: async (cartId) => {
    return apiCall(`/cart/remove/${cartId}`, {
      method: 'DELETE'
    });
  },

  // Clear cart
  clear: async () => {
    return apiCall('/cart/clear', {
      method: 'DELETE'
    });
  }
};

// ================= ORDERS API =================
export const ordersAPI = {
  // Create order
  create: async (shippingAddress) => {
    return apiCall('/orders/create', {
      method: 'POST',
      body: JSON.stringify({ shipping_address: shippingAddress })
    });
  },

  // Get all orders
  getAll: async () => {
    return apiCall('/orders');
  },

  // Get order details
  getById: async (orderId) => {
    return apiCall(`/orders/${orderId}`);
  },

  // Update order status
  updateStatus: async (orderId, status) => {
    return apiCall(`/orders/${orderId}/status`, {
      method: 'PUT',
      body: JSON.stringify({ status })
    });
  }
};

export default {
  productsAPI,
  userAPI,
  cartAPI,
  ordersAPI,
  apiCall
};
