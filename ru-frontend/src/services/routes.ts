import api from "./api.ts"

const login = (cpf : String,senha : String) => {
    return api.post("/auth/login", {
        cpf,
        senha,
      });
}

//Admin e Funcionário

const createAdmin = (adminData:{}) => {
    return api.post(`/funcionario/`,{...adminData,tipo:"admin",data_entrada:new Date().toISOString().slice(0, 10)});
}

const createFuncionario = (funcData:{}) => {
    return api.post(`/funcionario/`,{...funcData,tipo:"funcionario",data_entrada:new Date().toISOString().slice(0, 10)});
}

const updateFuncionario = (id : String,funcData : {}) => {
    return api.put(`/funcionario/${id}`,funcData);
}

const getAllFuncionarios = (page:number) => {
    return api.get(`/funcionario/?page=${page}`);
}
const getAllAdministradores = (page:number) => {
    return api.get(`/funcionario/admin/?page=${page}`);
}

const getFuncionarioById = (id : String) => {
    return api.get(`/funcionario/?id=${id}`);
}

const getAdministradorById = (id : String) => {
    return api.get(`/funcionario/admin/?id=${id}`);
}

const removeFuncionarioByCpf = (cpf : String) => {
    return api.post(`/funcionario/${cpf}/desativar/?data_saida=${ new Date().toISOString().slice(0, 10)}`)
}

//Cliente

const criarCliente = (clienteData : {}) => {
    return api.post(`/cliente`,clienteData);
}

const getAllClientes = (page:number) => {
    return api.get(`/cliente/?page=${page}`);
}

export default {
    login,
    getAllFuncionarios,
    getFuncionarioById,
    updateFuncionario,
    createFuncionario,
    createAdmin,
    getAllAdministradores,
    removeFuncionarioByCpf,
    getAdministradorById,
    criarCliente,
    getAllClientes
}