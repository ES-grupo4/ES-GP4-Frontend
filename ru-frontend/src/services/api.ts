import axios from "axios";
import { UrlRouter } from "../constants/UrlRouter";

const api = axios.create({
  baseURL: "http://localhost:8000",
});

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response && (error.response.status === 401 || error.response.status === 403)) {
      alert("Sessão expirada! Realize o login novamente!");
      localStorage.removeItem('token');
      localStorage.removeItem('cpf');
      localStorage.removeItem('tipo');
      window.location.href = UrlRouter.login;
      return Promise.reject(new Error('Unauthorized')); // A correção está aqui
    }
    return Promise.reject(new Error("Um erro ocorreu"));
  }
);

export default api;