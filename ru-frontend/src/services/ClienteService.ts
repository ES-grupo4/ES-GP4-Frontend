import api from "./api"

export interface PaginatedResponse<T> {
    total_in_page: number;
    page: number;
    page_size: number;
    total_pages: number;
    items: T[];
}

export interface Cliente {
    id: number;
    nome: string;
    cpf: string;
    email: string;
    matricula: string;
    categoria: string;
    bolsista: boolean;
    totalMensal: string;
}

export const getClientes = async (page: number = 1, pageSize: number = 10) => {
    try {
        const response = await api.get<PaginatedResponse<Cliente>>('/cliente/', {
            params: {
                page: page,
                page_size: pageSize
            }
        });
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar clientes:", error);
        throw error;
    }
}

export const getClienteByCpf = async (cpf : string) => {
    try {
        const response = await api.get(`/cliente/${cpf}`);
        return response.data;
    } catch (error) {
        console.error("Erro ao buscar cliente: ", error);
        throw error;
    }
};
