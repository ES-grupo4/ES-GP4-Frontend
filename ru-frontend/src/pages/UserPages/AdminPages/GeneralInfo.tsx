import { useEffect, useState } from "react";

export default function GeneralInfo() {

    const [currentInfo, setCurrentInfo] = useState({
        empresa: "X",
        preco: "12,99"
    });

    const [newEmpresa, setNewEmpresa] = useState("");
    const [newPreco, setNewPreco] = useState("");

    const handlePriceChange = (value: string) => {
        const regex = /^[0-9]*(,?[0-9]{0,2})?$/;
        if (regex.test(value)) {
            setNewPreco(value);
        }
    };

    const handleUpdate = () => {
        // Converte o preço para o formato com ponto 
        const precoParaSalvar = newPreco.replace(',', '.');
        console.log("Novo Preço para salvar no banco de dados:", precoParaSalvar);

        setCurrentInfo({
            empresa: newEmpresa || currentInfo.empresa,
            preco: newPreco || currentInfo.preco
        });

        setNewEmpresa("");
        setNewPreco("");
    };

    return (
        <div className="p-4 sm:ml-64 flex flex-col min-h-screen">
            <div className="group flex">
                <h1 className="font-semibold font-sans text-6xl text-sky-900">Informações Gerais</h1>
            </div>

            <div className="flex-grow flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-6xl min-h-[500px] flex flex-col">

                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-semibold text-gray-800">
                            Visualizar e editar informações gerais:
                        </h2>
                        <div className="text-lg font-semibold text-gray-700">
                            <span>Mês atual: </span>
                            <span className="font-bold">Julho</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 border border-gray-300 rounded-lg flex-grow">
                        <div className="border-r border-gray-300">
                            <div className="bg-gray-200 p-3 rounded-tl-lg">
                                <h3 className="text-lg font-bold text-gray-700">Informações atuais</h3>
                            </div>
                            <div className="p-4">
                                <p className="text-gray-600 mb-2">
                                    <span className="text-lg font-semibold">Empresa Responsável:</span> {currentInfo.empresa}
                                </p>
                                <p className="text-gray-600">
                                    <span className="text-lg font-semibold">Preço da Refeição:</span> R$: {currentInfo.preco}
                                </p>
                            </div>
                        </div>

                        <div>
                            <div className="bg-gray-200 p-3 rounded-tr-lg">
                                <h3 className="text-lg font-bold text-gray-700">Informações novas</h3>
                            </div>
                            <div className="p-4 space-y-4">
                                <input
                                    type="text"
                                    value={newEmpresa}
                                    onChange={(e) => setNewEmpresa(e.target.value)}
                                    className="shadow-sm focus:ring-blue-500 focus:border-blue-500 block w-full sm:text-sm border-gray-300 rounded-md p-2"
                                    placeholder="Nova Empresa"
                                />
                                <div className="relative rounded-md shadow-sm">
                                    <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <span className="text-gray-500 sm:text-sm font-semibold">R$</span>
                                    </div>
                    
                                    <input
                                        type="text" 
                                        inputMode="decimal" 
                                        value={newPreco}
                                        onChange={(e) => handlePriceChange(e.target.value)} 
                                        className="focus:ring-blue-500 focus:border-blue-500 block w-full pl-9 sm:text-sm border-gray-300 rounded-md p-2"
                                        placeholder="Novo Preço"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                    
                    <div className="flex justify-end mt-8">
                        <button
                            type="button"
                            onClick={handleUpdate}
                            className="inline-flex items-center px-6 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                        >
                            Atualizar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}