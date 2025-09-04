export interface Compra {
	usuario_id: number;
	horario: string;
	local: string;
	forma_pagamento: string;
	preco_compra: number;
}

export interface Precos {
	preco_almoco: number;
	preco_meia_almoco: number;
	preco_jantar: number;
	preco_meia_jantar: number;
}
