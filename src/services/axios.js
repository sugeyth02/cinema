import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'https://cinema-parcial2.herokuapp.com/',
});

export default axiosInstance;
