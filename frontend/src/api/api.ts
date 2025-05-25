import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000', // svi servisi kroz YARP
  withCredentials: true,
});

export default api;
