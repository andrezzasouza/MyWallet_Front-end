import axios from 'axios';

const API = axios.create({
  baseURL: "https://mywallet-back-end.herokuapp.com",
});

export default API;