import axios from "axios";

export default axios.create({
 baseURL: process.env.NODE_ENV == 'development'?'http://localhost:5001/captivators/api/v1':'/captivators/api/v1',
 // baseURL: "/captivators/api/v1/",
  responseType: "json"
});