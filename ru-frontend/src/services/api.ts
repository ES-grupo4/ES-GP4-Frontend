import axios from "axios";
import { UrlRouter } from "../constants/UrlRouter";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

 api.interceptors.response.use(
      (response) => response,
      async (error) => {
        const originalRequest = error.config;
        if (error.response && (error.response.status === 401 || error.response.status === 403)) {
          localStorage.removeItem('token'); 
          window.location.href = UrlRouter.login;
          return Promise.reject('Unauthorized');
        }
        return Promise.reject(error);
      }
    );

export default api;
