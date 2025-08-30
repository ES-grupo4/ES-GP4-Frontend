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

const getAllFuncionarios = (page:number, busca: string) => {
    return api.get(`/funcionario/admins?page=${page}&tipo_funcionario=funcionario&busca=${busca}`);
}
const getAllAdministradores = (page:number, busca: string) => {
    return api.get(`/funcionario/admins?page=${page}&tipo_funcionario=admin&busca=${busca}`);
}

const getFuncionarioById = (id : String) => {
    return api.get(`/funcionario/?id=${id}`);
}

const getAdministradorById = (id : String) => {
    return api.get(`/funcionario/admin/?id=${id}`);
}

const desativarFuncionarioByCpf = (cpf : String) => {
    return api.post(`/funcionario/${cpf}/desativar/?data_saida=${ new Date().toISOString().slice(0, 10)}`)
}

const getFuncionarioByCpf = (cpf: String) => {
    return api.get(`/funcionario/?cpf=${cpf}`);
}

const getAdministradorByCpf = (cpf: String) => {
    return api.get(`/funcionario/admin/?cpf=${cpf}`);
}

//Cliente

const criarCliente = (clienteData : {}) => {
    return api.post(`/cliente`,clienteData);
}

const getAllClientes = (page:number, busca:string, tipo:string) => {
    if(tipo !== ""){
        return api.get(`/cliente/buscar-clientes-todos-campos/?page=${page}&search_term=${busca}&tipo=${tipo}`);
    }
    return api.get(`/cliente/buscar-clientes-todos-campos/?page=${page}&search_term=${busca}`);
}

const getClienteById = (id:String) => {
    return api.get(`/cliente/id/${id}`);
}

const updateCliente = (id:String, clienteData: {}) => {
    return api.put(`/cliente/id/${id}`,clienteData); //return api.put(`/cliente/?id=${id}`,clienteData);
}

const apagarCliente = (id:String) => {
    return api.delete(`/cliente/${id}`)
}

export default {
    login,
    getAllFuncionarios,
    getFuncionarioById,
    updateFuncionario,
    createFuncionario,
    createAdmin,
    getAllAdministradores,
    removeFuncionarioByCpf: desativarFuncionarioByCpf,
    getAdministradorById,
    getFuncionarioByCpf,
    getAdministradorByCpf,
    criarCliente,
    getAllClientes,
    getClienteById,
    updateCliente,
    apagarCliente
}