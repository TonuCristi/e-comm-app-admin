import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_APP_LOCAL_API_URL,
});

api.interceptors.request.use(
  function (config) {
    config.headers.Authorization = `Bearer ${localStorage.getItem("token")}`;

    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

export default api;
