import axios from 'axios';

const API = axios.create({
  baseURL: "localhost:4000"
})

export default API;