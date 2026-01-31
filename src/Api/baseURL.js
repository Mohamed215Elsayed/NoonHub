import axios from "axios";

const baseURL = axios.create({
  baseURL: "https://eshop-api-project.vercel.app",
//   baseURL: "http://127.0.0.1:8000",
    withCredentials: true, 
});
export default baseURL;

  // "start:prod": "set NODE_ENV=production&& node app.js",