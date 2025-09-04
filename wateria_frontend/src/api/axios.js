import axios from "axios";

const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_URL || "http://localhost:8080",
  headers: {
    "Content-Type": "application/json",
  },
});

// Add interceptor to attach JWT token
apiClient.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Handle expired/invalid token (401)
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if(!error.response){
      window.location.href = '/server-down';
    }
    else if (error.response?.status === 401 || error.response?.status === 403) {
      localStorage.removeItem("token");
      localStorage.setItem("sessionExpired", "true");
      window.location.href = "/session-expired";
    }
    return Promise.reject(error);
  }
);

export default apiClient;
