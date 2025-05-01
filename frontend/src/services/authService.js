import axios from "axios";

const API_URL = "http://localhost:8080/api/auth"; // Update the URL if needed

const login = (credentials) => {
  return axios.post(`${API_URL}/login`, credentials);
};

const signup = (data) => {
  return axios.post(`${API_URL}/signup`, data);
};

export default {
  login,
  signup,
};
