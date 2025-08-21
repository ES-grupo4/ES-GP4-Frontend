import api from "./api.ts"

const login = (cpf : String,senha : String) => {
    return api.post("/auth/login", {
        cpf,
        senha,
      });
}

const updateFuncionario = (id : String,funcData : {}) => {
    return api.put(`/funcionario/${id}`,funcData);
}

const getAllFuncionarios = () => {
    return api.get("/funcionario");
}

const getFuncionarioById = (id : String) => {
    return api.get(`/funcionario/?id=${id}`);
}
export default {
    login,
    getAllFuncionarios,
    getFuncionarioById,
    updateFuncionario
}