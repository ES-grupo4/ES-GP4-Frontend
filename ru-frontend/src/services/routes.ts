import api from "./api.ts";

const login = (cpf: String, senha: String) => {
  return api.post("/auth/login", {
    cpf,
    senha,
  });
};

//Admin e Funcionário

const createAdmin = (adminData: {}) => {
  return api.post(`/funcionario/`, {
    ...adminData,
    tipo: "admin",
    data_entrada: new Date().toISOString().slice(0, 10),
  });
};

const createFuncionario = (funcData: {}) => {
  return api.post(`/funcionario/`, {
    ...funcData,
    tipo: "funcionario",
    data_entrada: new Date().toISOString().slice(0, 10),
  });
};

const updateFuncionario = (id: String, funcData: {}) => {
  return api.put(`/funcionario/${id}`, funcData);
};

const getAllFuncionarios = (page: number) => {
  return api.get(`/funcionario/?page=${page}`);
};
const getAllAdministradores = (page: number) => {
  return api.get(`/funcionario/admin/?page=${page}`);
};
const getFuncionarioById = (id: String) => {
  return api.get(`/funcionario/?id=${id}`);
};

const getHistorico = () => {
  return api.get("/historico_acoes/");
};

const getCompras = (token: string) => {

    api.defaults.headers.common["Authorization"] = token

  return api.get("/compra/");
};


const getAdministradorById = (id : String) => {
    return api.get(`/funcionario/admin/?id=${id}`);
}

const removeFuncionarioById = (id : String) => {
    return api.post(`/funcionario/${id}/anonimizar/?data_saida=${ new Date().toISOString().slice(0, 10)}`)
}

//Cliente

const criarCliente = (clienteData : {}) => {
    return api.post(`/cliente`,clienteData);
}

const getAllClientes = (page:number) => {
    return api.get(`/cliente/?page=${page}`);
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
    removeFuncionarioById,
    getAdministradorById,
    criarCliente,
    getAllClientes,
    getClienteById,
    updateCliente,
    apagarCliente,
  getHistorico,
  getCompras,
};
