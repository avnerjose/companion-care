import axios from "axios";

// const devURL = "http://127.0.0.1:8000";
export const api = axios.create({
  baseURL: "https://companion-care-backend-production.up.railway.app",
});
