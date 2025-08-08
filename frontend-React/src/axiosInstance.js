import axios from "axios";

const baseURL = import.meta.env.VITE_BACKEND_BASE_API;
const axiousInstance = axios.create({
  baseURL: baseURL,
});

export default axiousInstance;
