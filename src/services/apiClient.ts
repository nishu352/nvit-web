import axios from "axios";

const getBaseUrl = () => {
  if (process.env.NEXT_PUBLIC_API_BASE_URL) return process.env.NEXT_PUBLIC_API_BASE_URL;
  if (process.env.NEXT_PUBLIC_API_URL) return process.env.NEXT_PUBLIC_API_URL;
  if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
    return "http://localhost:5001/api/v1";
  }
  if (process.env.NODE_ENV === "development") {
    return "http://localhost:5001/api/v1";
  }
  return "https://nvit-backend-production-d6c6.up.railway.app/api/v1";
};

export const apiClient = axios.create({
  baseURL: getBaseUrl(),
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
  timeout: 15000,
});

apiClient.interceptors.request.use((config) => {
  if (!config.baseURL || config.baseURL.includes("railway.app")) {
    if (typeof window !== "undefined" && (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1")) {
      config.baseURL = "http://localhost:5001/api/v1";
    }
  }
  return config;
});
