// axios.js
import axios from "axios";

const instance = axios.create({
  baseURL: "https://lawfirm-backend-zxys.onrender.com",
  withCredentials: true,
});

export default instance;
