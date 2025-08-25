import React from 'react';

export default function Compras() {
    return (
        <div className="p-4 sm:ml-64 flex flex-col min-h-screen bg-gray-100">
            
            <div className="group flex justify-between items-center w-full max-w-4xl mb-8">
                <h1 className="font-semibold font-sans text-6xl text-sky-900">Adicionar Compra</h1>
            </div>

            <div className="space-y-6 w-full max-w-4xl mx-auto">

                <div className="bg-white p-6 shadow-md rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Importar planilha de compras:</h2>
                    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden">
                        <input
                            type="text"
                            placeholder="Inserir planilha"
                            className="flex-grow p-2 text-gray-700 bg-gray-50 focus:outline-none"
                            readOnly
                        />
                        <label htmlFor="file-upload" className="cursor-pointer bg-gray-200 px-4 py-2">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0l-4 4m4-4v12" />
                            </svg>
                        </label>
                        <input id="file-upload" type="file" className="hidden" />
                    </div>
                </div>

                <div className="bg-white p-6 shadow-md rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Registrar compra:</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-bold mb-1">ID:</label>
                            <input type="text" className="bg-gray-100 p-2 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-1">CPF:</label>
                            <input type="text" className="bg-gray-100 p-2 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-bold mb-1">MAT:</label>
                            <input type="text" className="bg-gray-100 p-2 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-1">Tipo do Cliente:</label>
                            <select className="bg-gray-100 p-2 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>Normal</option>
                                <option>Bolsista</option>
                            </select>
                        </div>
                        
                        <div>
                            <label className="block text-gray-700 font-bold mb-1">Pagamento:</label>
                            <select className="bg-gray-100 p-2 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>Cartão</option>
                                <option>Pix</option>
                            </select>
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-1">Local:</label>
                            <select className="bg-gray-100 p-2 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500">
                                <option>Campina Grande</option>
                                <option>Cajazeiras</option>
                                <option>Cuité</option>
                                <option>Patos</option>
                                <option>Pombal</option>
                                <option>Sousa</option>
                                <option>Sumé</option>
                            </select>
                        </div>

                        <div>
                            <label className="block text-gray-700 font-bold mb-1">Horário da Compra:</label>
                            <input type="text" placeholder="xx:xx XX/XX/XX" className="bg-gray-100 p-2 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500"/>
                        </div>

                    </div>
                    
                    <div className="mt-6 text-center">
                        <button className="bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition duration-300">
                            Registrar
                        </button>
                    </div>
                </div>

            </div>
        </div>
    );
}