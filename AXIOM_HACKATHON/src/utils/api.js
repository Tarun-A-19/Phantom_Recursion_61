import axios from 'axios';

// API Base URL - Update this if your backend is on a different port
const API_BASE_URL = 'http://localhost:5000/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add token to requests if available
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// ========== AUTHENTICATION APIs ==========

// Register a new user
export const registerUser = async (userData) => {
  try {
    const response = await api.post('/auth/register', userData);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Registration failed';
  }
};

// Login user
export const loginUser = async (credentials) => {
  try {
    const response = await api.post('/auth/login', credentials);
    if (response.data.token) {
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('user', JSON.stringify(response.data.user));
    }
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Login failed';
  }
};

// Get current user profile
export const getCurrentUser = async () => {
  try {
    const response = await api.get('/auth/me');
    return response.data;
  } catch (error) {
    throw error.response?.data?.message || 'Failed to get user profile';
  }
};

// Logout user
export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  sessionStorage.removeItem('user');
};

// Check if user is authenticated
export const isAuthenticated = () => {
  return !!localStorage.getItem('token');
};

// Get stored user data
export const getStoredUser = () => {
  const user = localStorage.getItem('user');
  return user ? JSON.parse(user) : null;
};

// ========== LOCATION APIs ==========

// Get user location with proper permission request
export const getUserLocation = () => {
  return new Promise((resolve, reject) => {
    if (!navigator.geolocation) {
      reject(new Error("Geolocation not supported by your browser"));
      return;
    }
    
    // Request location with high accuracy
    navigator.geolocation.getCurrentPosition(
      (position) => {
        resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          accuracy: position.coords.accuracy
        });
      },
      (error) => {
        let errorMessage = "";
        switch(error.code) {
          case error.PERMISSION_DENIED:
            errorMessage = "Location access denied. Please enable location permissions in your browser.";
            break;
          case error.POSITION_UNAVAILABLE:
            errorMessage = "Location information unavailable.";
            break;
          case error.TIMEOUT:
            errorMessage = "Location request timed out.";
            break;
          default:
            errorMessage = "An unknown error occurred.";
        }
        
        console.warn("Location error:", errorMessage);
        
        // Fallback to default location (Delhi) if permission denied
        resolve({ 
          lat: 28.6139, 
          lng: 77.2090,
          isDefault: true 
        });
      },
      {
        enableHighAccuracy: true,
        timeout: 10000,
        maximumAge: 0
      }
    );
  });
};

// ========== OCR APIs ==========

// Simulated OCR function
export const extractMedicineFromImage = async () => {
  await new Promise(resolve => setTimeout(resolve, 2000));
  return ["Paracetamol 500mg", "Cetirizine 10mg"];
};
