import api from './api';
import type { Compra } from '../types/Compra';

export const CompraService = {

    create: async (compraData: Compra): Promise<any> => {
        const response = await api.post('/compra/', compraData);
        return response.data;
    }

}