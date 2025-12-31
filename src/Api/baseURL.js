import axios from "axios";

// const baseURL = axios.create({
//   baseURL: "https://eshop-api-project.vercel.app",
// });//production
const baseURL = axios.create({ baseURL: "http://127.0.0.1:8000" }); //development
export default baseURL;
