import axios from "axios";

const baseURL = axios.create({
  baseURL: "https://eshop-back-mu.vercel.app",
//   baseURL: "http://127.0.0.1:8000",
    withCredentials: true, 
});
export default baseURL;

// export default baseURL;
  // "start:prod": "set NODE_ENV=production&& node app.js",