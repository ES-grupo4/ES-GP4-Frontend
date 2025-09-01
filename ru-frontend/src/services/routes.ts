import api from "./api.ts";

const login = (cpf: string, senha: string) => {
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

const updateFuncionario = (id: string, funcData: {}) => {
  return api.put(`/funcionario/${id}`, funcData);
};

const getAllFuncionarios = (page: number, busca: string) => {
  return api.get(
    `/funcionario/admins?page=${page}&tipo_funcionario=funcionario&busca=${busca}&desativados=${false}`
  );
};
const getAllAdministradores = (page: number, busca: string) => {
  return api.get(
    `/funcionario/admins?page=${page}&tipo_funcionario=admin&busca=${busca}&desativados=${false}`
  );
};
const getFuncionarioById = (id: string) => {
  return api.get(`/funcionario/?id=${id}`);
};

const getHistorico = () => {
  return api.get("/historico_acoes/");
};

const getHistoricoByMonth = (month:number,year:number,page:number) => {
  return api.get(`/historico_acoes/?mes=${month}&ano=${year}&page=${page}&page_size=${100}`);
};


const getAdministradorById = (id: string) => {
  return api.get(`/funcionario/admin/?id=${id}`);
};

const desativarFuncionarioByCpf = (cpf: string) => {
  return api.post(
    `/funcionario/${cpf}/desativar/?data_saida=${new Date()
      .toISOString()
      .slice(0, 10)}`
  );
};

const getFuncionarioByCpf = (cpf: string) => {
  return api.get(`/funcionario/?cpf=${cpf}`);
};

const getAdministradorByCpf = (cpf: string) => {
  return api.get(`/funcionario/admin/?cpf=${cpf}`);
};

//Cliente

const criarCliente = (clienteData: {}) => {
  return api.post(`/cliente`, clienteData);
};

const getAllClientes = (page: number, busca: string, tipo: string) => {
  if (tipo !== "") {
    return api.get(
      `/cliente/buscar-clientes-todos-campos/?page=${page}&termo_busca=${busca}&tipo=${tipo}`
    );
  }
  return api.get(
    `/cliente/buscar-clientes-todos-campos/?page=${page}&termo_busca=${busca}`
  );
};

const getClienteById = (id: string) => {
  return api.get(`/cliente/id/${id}`);
};

const updateCliente = (id: string, clienteData: {}) => {
  return api.put(`/cliente/id/${id}`, clienteData); 
};

const apagarCliente = (id: string) => {
  return api.delete(`/cliente/${id}`);
};

// Relatorio

const getComprasByCliente = (cliente_id: string, year: number, month: number) => {
    return api.get(`/compra/cliente/${cliente_id}/${year}/${month}`);
};

const getRelatorio = (month: number, year: number) => {
  return api.get(`/relatorio/${year}/${month}`);
};

// Informacoes Gerais

const getInformacoesGerais = () => {
  return api.get("/informacoes-gerais/");
};

// Compras

const getAlmocos = (week: any) => {
  return api.get(
    `/compra/?refeicao=almoço&data_inicio=${week.ini}&data_fim=${week.fim}`
  );
};

const getJantas = (week: any) => {
  return api.get(
    `/compra/?refeicao=jantar&data_inicio=${week.ini}&data_fim=${week.fim}`,
    {}
  );
};

const getCompras = (week: any) => {
  return api.get(`/compra/?data_inicio=${week.ini}&data_fim=${week.fim}`);
};

const setInformacoesGerais = (object: {
  nome_empresa: string;
  preco_almoco: string;
  preco_meia_almoco: string;
  preco_jantar: string;
  preco_meia_jantar: string;
  inicio_almoco: string;
  fim_almoco: string;
  inicio_jantar: string;
  fim_jantar: string;
}) => {
  return api.post("/informacoes-gerais/", object);
};

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
  apagarCliente,
  getComprasByCliente,
  getRelatorio,
  getHistorico,
  getAlmocos,
  getJantas,
  getInformacoesGerais,
  setInformacoesGerais,
  getCompras,
  getHistoricoByMonth
};
