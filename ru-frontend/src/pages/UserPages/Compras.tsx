import React, { type ChangeEvent } from 'react';
import UploadIcon from '../../assets/IconAddFuncionario';

export default function Compras() {

    const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
        if (event.target.files && event.target.files.length > 0) {
            const fileName = event.target.files[0].name;
            console.log("Planilha selecionada:", fileName);
            alert(`Planilha "${fileName}" importada!`);
        }
    };

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

                <div className="bg-white p-6 shadow-md rounded-lg">
                    <h2 className="text-xl font-semibold mb-4">Registrar compra:</h2>
                    <div className="grid grid-cols-2 gap-4">
                        <div>
                            <label className="block text-gray-700 font-bold mb-1">ID:</label>
                            <input type="text" className="bg-gray-100 p-2 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>
                        <div>
                            <label className="block text-gray-700 font-bold mb-1">CPF:</label>
                            <input type="text" className="bg-gray-100 p-2 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
                        </div>

                        <div>
                            <label className="block text-gray-700 font-bold mb-1">MAT:</label>
                            <input type="text" className="bg-gray-100 p-2 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
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
                            <input type="text" placeholder="xx:xx XX/XX/XX" className="bg-gray-100 p-2 rounded-md border border-gray-300 w-full focus:outline-none focus:ring-2 focus:ring-blue-500" />
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