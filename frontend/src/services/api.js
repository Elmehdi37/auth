import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8000/",
  headers: {
    "Content-Type": "application/json",
    Accept: "application/json",
  },
  timeout: 5000,
  withCredentials: true,
  validateStatus: (status) => status >= 200 && status < 400,
});

export default api;
