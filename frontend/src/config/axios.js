import axios from "axios";

const axiosClient = axios.create({
  baseURL: "https://192.168.0.17:3000",
});

export default axiosClient;
