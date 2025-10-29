import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://dummyjson.com", // Set directly or use an env variable
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;





