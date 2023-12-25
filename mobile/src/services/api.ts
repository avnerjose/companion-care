import axios from "axios";

const prodURL = "https://backend-production-4790.up.railway.app";
const devURL = "http://127.0.0.1:8000";

export const api = axios.create({
  baseURL: prodURL,
});
