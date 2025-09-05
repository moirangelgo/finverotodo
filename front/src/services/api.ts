import axios from "axios";

const baseURL = import.meta.env.VITE_API_URL || "http://localhost:8000";

export const api = axios.create({
  baseURL,
  timeout: 10000,
});

// interceptor simple (opcional) para errores
api.interceptors.response.use(
  r => r,
  err => {
    // puedes centralizar logging / errores aquí
    return Promise.reject(err);
  }
);
