import axios from "axios";

const api = axios.create({
 baseURL: process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api",
  withCredentials: true,
});

// attach access token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem("accessToken");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

api.interceptors.request.use(
  (config) => {
    console.log(
      "REQUEST:",
      config.url
    );

    return config;
  }
);

api.interceptors.response.use(
  (response) => response,
  (error) => {
    console.log(
      "FAILED:",
      error.config?.url,
      error.response?.status
    );

    return Promise.reject(error);
  }
);

export default api;