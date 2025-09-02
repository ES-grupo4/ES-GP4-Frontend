import api from './api';
import type { Compra } from '../types/Compra';
import type { RowData } from '../utils/lerPlanilha';

export const CompraService = {
    create: async (compraData: Compra): Promise<any> => {
        const response = await api.post('/compra/', compraData);
        return response;
    },

    addComprasFromSheet: async (jsonData: RowData[]) => {
        const errors: string[] = [];
        const comprasValidas: Compra[] = [];
    
        for (const row of jsonData) {
            const originalUserId = row.usuario_id;
    
            const usuario_id = parseInt(String(row.usuario_id), 10);
            const preco_compra = parseInt(String(row.preco_compra), 10);
            const dateFromSheet = new Date(row.horario);
            const local = String(row.local);
            const forma_pagamento = String(row.forma_pagamento);
    
            const validationErrors: string[] = [];
            if (isNaN(usuario_id) || usuario_id <= 0) {
                validationErrors.push(`ID de usuário inválido: ${row.usuario_id}`);
            }
            if (isNaN(preco_compra)) {
                validationErrors.push(`Preço de compra inválido: ${row.preco_compra}`);
            }
            if (isNaN(dateFromSheet.getTime())) {
                validationErrors.push(`Horário inválido: ${row.horario}`);
            }
    
            if (validationErrors.length > 0) {
                errors.push(`Linha com ID ${originalUserId || 'desconhecido'}: ${validationErrors.join(', ')}`);
                continue;
            }
    
            const pad = (num: number) => String(num).padStart(2, '0');
            const year = dateFromSheet.getFullYear();
            const month = pad(dateFromSheet.getMonth() + 1);
            const day = pad(dateFromSheet.getDate());
            const hours = pad(dateFromSheet.getHours());
            const minutes = pad(dateFromSheet.getMinutes());
            const seconds = pad(dateFromSheet.getSeconds());
            const horarioString = `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
    
            const compraData: Compra = {
                usuario_id: usuario_id,
                horario: horarioString,
                local: local as 'exatas' | 'humanas',
                forma_pagamento: forma_pagamento as 'credito' | 'debito' | 'pix' | 'dinheiro',
                preco_compra: preco_compra,
            };
            comprasValidas.push(compraData);
        }
    
        if (errors.length > 0) {
            alert("Erros de validação encontrados. Nenhuma compra foi adicionada:\n" + errors.join("\n"));
            return;
        }
    
        const transactionErrors: string[] = [];
        for (const compra of comprasValidas) {
            try {
                await CompraService.create(compra);
            } catch (e: any) {
                const errorDetail = e.response?.data?.detail || 'Erro ao criar compra.';
                transactionErrors.push(`ID ${compra.usuario_id}: ${errorDetail}`);
            }
        }

        if (transactionErrors.length > 0) {
            alert("Algumas compras não foram cadastradas durante a transação:\n" + transactionErrors.join("\n"));
        } else {
            alert("Todas as compras foram adicionadas com sucesso!");
        }
    },

};