import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:8080/api",
  headers: {
    "Content-Type": "application/json",
  },
});

<<<<<<< HEAD
=======

// Interceptor to add JWT token automatically
api.interceptors.request.use(config => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});


>>>>>>> c752b84 (Fixed profile update persistence by correcting userId handling and using a dedicated UpdateUserRequestDTO, ensuring PUT /users/{id} reliably saves changes to the database)
export default api;
