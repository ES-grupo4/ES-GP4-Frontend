import type { Compra } from "../types/Compra";
import type { RowData } from "../utils/lerPlanilha";
import api from "./api";

const formatDateToString = (date: Date): string => {
	const pad = (num: number) => String(num).padStart(2, "0");
	const year = date.getFullYear();
	const month = pad(date.getMonth() + 1);
	const day = pad(date.getDate());
	const hours = pad(date.getHours());
	const minutes = pad(date.getMinutes());
	const seconds = pad(date.getSeconds());
	return `${year}-${month}-${day}T${hours}:${minutes}:${seconds}`;
};

export const CompraService = {
	create: async (compraData: Compra): Promise<any> => {
		const response = await api.post("/compra/", compraData);
		return response;
	},

	addComprasFromSheet: async (jsonData: RowData[]) => {
		const errors: string[] = [];
		const comprasValidas: { compra: Compra; line: number }[] = [];

		for (const [index, row] of jsonData.entries()) {
			const originalUserId = row.usuario_id;

			const usuario_id = parseInt(String(row.usuario_id), 10);
			const preco_compra = parseInt(String(row.preco_compra), 10);
			const dateFromSheet = new Date(row.horario);
			const local = String(row.local);
			const forma_pagamento = String(row.forma_pagamento);

			const validationErrors: string[] = [];
			if (Number.isNaN(usuario_id) || usuario_id <= 0) {
				validationErrors.push(`ID de usuário inválido: ${row.usuario_id}`);
			}
			if (Number.isNaN(preco_compra)) {
				validationErrors.push(`Preço de compra inválido: ${row.preco_compra}`);
			}
			if (Number.isNaN(dateFromSheet.getTime())) {
				validationErrors.push(`Horário inválido: ${row.horario}`);
			}

			if (validationErrors.length > 0) {
				errors.push(
					`Linha ${index + 1} (ID ${originalUserId || "desconhecido"}): ${validationErrors.join(", ")}`,
				);
				continue;
			}

			const horarioString = formatDateToString(dateFromSheet);

			const compraData: Compra = {
				usuario_id: usuario_id,
				horario: horarioString,
				local: local as "exatas" | "humanas",
				forma_pagamento: forma_pagamento as
					| "credito"
					| "debito"
					| "pix"
					| "dinheiro",
				preco_compra: preco_compra,
			};
			comprasValidas.push({ compra: compraData, line: index + 1 });
		}

		if (errors.length > 0) {
			alert(
				"Erros de validação encontrados. Nenhuma compra foi adicionada:\n" +
					errors.join("\n"),
			);
			return;
		}

		const transactionErrors: string[] = [];
		for (const { compra, line } of comprasValidas) {
			try {
				await CompraService.create(compra);
			} catch (e: any) {
				const errorDetail = e.response?.data?.detail || "Erro ao criar compra.";
				transactionErrors.push(
					`Linha ${line + 1} (ID ${compra.usuario_id}): ${errorDetail}`,
				);
			}
		}

		if (transactionErrors.length > 0) {
			alert(
				"Algumas compras não foram cadastradas durante a transação:\n" +
					transactionErrors.join("\n"),
			);
		} else {
			alert("Todas as compras foram adicionadas com sucesso!");
		}
	},
};
