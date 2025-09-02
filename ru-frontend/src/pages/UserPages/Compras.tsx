import UploadIcon from '../../assets/IconAddFuncionario';
import React, { useState, type ChangeEvent, useEffect } from 'react';
import { CompraService } from '../../services/CompraService';
import type { Compra, Precos } from '../../types/Compra';
import { readExcelFile } from '../../utils/lerPlanilha';

export default function Compras() {

    const [compraData, setCompraData] = useState<Compra>({
        usuario_id: 0,
        horario: new Date().toISOString(),
        local: 'Exatas',
        forma_pagamento: 'credito',
        preco_compra: 0,
    });

    const [precos, setPrecos] = useState<Precos | null>(null);

    useEffect(() => {
        // Posteriormente uma chamada dos preços ao backend

        const mockPrecos = {
            preco_almoco: 1600,
            preco_meia_almoco: 800,
            preco_jantar: 1400,
            preco_meia_jantar: 700,
        };

        setPrecos(mockPrecos);
        setCompraData(prevState => ({
            ...prevState,
            preco_compra: mockPrecos.preco_almoco
        }));

    }, []);

    const handleFileChange = async (event: ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;
    
        try {
          const jsonData = await readExcelFile(file);
          await CompraService.addComprasFromSheet(jsonData);
        } catch (err) {
          console.error("Erro ao ler planilha:", err);
          alert("Ocorreu um erro ao processar a planilha.");
        }
    
        event.target.value = "";
    };

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        let parsedValue = value;

        if (name === 'usuario_id') {
            const intValue = parseInt(value, 10);
            if (intValue < 0) return;
            parsedValue = intValue.toString();
        }

        setCompraData(prevState => ({
            ...prevState,
            [name]: name === 'preco_compra' ? parseInt(parsedValue, 10) : (name === 'usuario_id' ? parseInt(parsedValue, 10) : parsedValue),
        }));
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();

        if (compraData.usuario_id <= 0){
            alert("ID de usuário não pode ser igual ou menor que zero");
            return;
        } else if (compraData.preco_compra <= 0){
            alert("O valor de uma refeição não pode ser igual ou menor que zero");
            return;
        }

        try {
            await CompraService.create(compraData);
            alert('Compra registrada com sucesso!');
            setCompraData({
                usuario_id: 0,
                horario: new Date().toISOString(),
                local: 'Exatas',
                forma_pagamento: 'credito',
                preco_compra: precos?.preco_almoco || 0,
            });
        } catch (error) {
            console.error('Erro ao registrar compra:', error);
            alert('Falha ao registrar a compra. Verifique os dados e tente novamente.');
        }
    }

    return (
        <div className="p-4 sm:ml-64 flex flex-col min-h-screen">

            <div className="group flex justify-between items-center w-full max-w-4xl mb-8">
                <h1 className="font-semibold font-sans text-6xl text-sky-900">Adicionar Compra</h1>
            </div>

            <div className="space-y-6 w-full max-w-4xl mx-auto">

                <div className="bg-white p-6 shadow-md rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Importar planilha de compras:</h2>
                    <div>
                        <label
                            htmlFor="file-upload"
                            className="cursor-pointer bg-gray-100 border border-gray-300 rounded-md p-3 flex items-center justify-between text-gray-500 hover:bg-gray-200 transition-colors"
                        >
                            <span>Inserir planilha</span>
                            <UploadIcon />
                        </label>
                        <input
                            id="file-upload"
                            name="file-upload"
                            type="file"
                            className="sr-only"
                            onChange={handleFileChange}
                            accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
                        />
                    </div>
                </div>

                <form onSubmit={handleSubmit} className="bg-white p-6 shadow-md rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Registrar compra:</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-bold mb-1">ID do Usuário:</label>
                            <input 
                                type="number" 
                                name="usuario_id"
                                value={compraData.usuario_id}
                                onChange={handleChange}
                                min="0"
                                className="bg-gray-100 p-2 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            />
                        </div>
                        
                        <div>
                            <label className="block text-gray-700 font-bold mb-1">Pagamento:</label>
                            <select 
                                name="forma_pagamento"
                                value={compraData.forma_pagamento}
                                onChange={handleChange}
                                className="bg-gray-100 p-2 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="credito">Crédito</option>
                                <option value="debito">Débito</option>
                                <option value="pix">Pix</option>
                                <option value="dinheiro">Dinheiro</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-1">Local:</label>
                            <select 
                                name="local"
                                value={compraData.local}
                                onChange={handleChange}
                                className="bg-gray-100 p-2 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option>Exatas</option>
                                <option>Humanas</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-bold mb-1">Horário da Compra:</label>
                            <input 
                                type="datetime-local" 
                                name="horario"
                                value={compraData.horario.substring(0, 16)}
                                onChange={handleChange}
                                className="bg-gray-100 p-2 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" 
                            />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-bold mb-1">Preço da Compra:</label>
                            <select 
                                name="preco_compra"
                                value={compraData.preco_compra}
                                onChange={handleChange}
                                className="bg-gray-100 p-2 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                {precos && (
                                    <>
                                        <option value={precos.preco_almoco}>Almoço - R$ {precos.preco_almoco / 100}</option>
                                        <option value={precos.preco_meia_almoco}>Meio Almoço - R$ {precos.preco_meia_almoco / 100}</option>
                                        <option value={precos.preco_jantar}>Jantar - R$ {precos.preco_jantar / 100}</option>
                                        <option value={precos.preco_meia_jantar}>Meio Jantar - R$ {precos.preco_meia_jantar / 100}</option>
                                    </>
                                )}
                            </select>
                        </div>

                    </div>

                    <div className="mt-6 text-center">
                        <button type="submit" className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300">
                            Registrar
                        </button>
                    </div>
                </form>

            </div>
        </div>
    );
}