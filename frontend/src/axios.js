// src/axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:5050/api/v1",
  withCredentials: true,
});

export default instance;
