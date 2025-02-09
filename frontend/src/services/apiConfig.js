import axios from "axios";
import { BASE_URL } from "../constants/url";

const apiConfig = axios.create({
  baseURL: BASE_URL, // Base URL for API
  timeout: 10000000, // Request timeout
  headers: { "Content-Type": "application/json" },
});

export default apiConfig;
