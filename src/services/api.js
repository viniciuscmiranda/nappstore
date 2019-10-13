import axios from "axios";
// Get server route
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL
});

export default api;
