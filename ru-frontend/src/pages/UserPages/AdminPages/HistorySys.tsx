import { useState } from "react";
import MonthYearDropdown from "../../../components/MonthDropdown";

export default function HistorySys() {

    const currentDate = new Date();

    const [year, setYear] = useState<number>(new Date().getFullYear());
        const [month, setMonth] = useState<number>(new Date().getMonth());

    for (let i = 0; i < 12; i++) {
        const date = new Date(currentDate);
        date.setMonth(currentDate.getMonth() - i);

        const displayValue = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(date);
        const optionValue = date.toISOString().slice(0, 7);

    }

    function handleChange(year: number, month: number): void {
        throw new Error("Function not implemented.");
    }

    return (
        <div className="p-4 sm:ml-64 flex flex-col min-h-screen">
            <div className="group flex">
                <h1 className="font-semibold font-sans text-6xl text-sky-900">Histórico do Sistema</h1>
            </div>

            <div className="flex-grow flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-7xl min-h-[700px] flex flex-col">

                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Histórico do Sistema
                        </h2>

                        <div className="flex items-center gap-4">
                            <MonthYearDropdown
                                        selectedYear={year}
                                        selectedMonth={month}
                                        onChange={handleChange}
                                        startYear={2000}
                                    />

                            <button
                                type="button"
                                onClick={() => console.log("Botão de imprimir clicado!")}
                                className="p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-6 w-6 text-gray-600"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor"
                                    strokeWidth={2}
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <div className="bg-gray-200 border border-gray-300 rounded-lg p-4 overflow-y-auto flex-grow max-h-120">
                        <div className="space-y-1">
                            {/* log ficticio temporario enquanto não tem BD*/}
                            <p className="font-mono text-sm text-gray-800">
                                [19/06/2025 21:47] Bolsista 000000000-00 adicionado pelo funcionário 111111111-11
                            </p>
                            <p className="font-mono text-sm text-gray-800">
                                [19/06/2025 21:49] Bolsista 000000000-00 adicionado pelo funcionário 111111111-11
                            </p>
                            <p className="font-mono text-sm text-gray-800">
                                [19/06/2025 21:52] Bolsista 000000000-00 adicionado pelo funcionário 111111111-11
                            </p>
                            <p className="font-mono text-sm text-gray-800">
                                [20/06/2025 21:52] Bolsista 000000000-01 removido pelo funcionário 111111111-11
                            </p>
                            <p className="font-mono text-sm text-gray-800">
                                [20/06/2025 21:52] Relatório ABRIL-2025 emitido pelo funcionário 111111111-11
                            </p> <p className="font-mono text-sm text-gray-800">
                                [19/06/2025 21:47] Bolsista 000000000-00 adicionado pelo funcionário 111111111-11
                            </p>
                            <p className="font-mono text-sm text-gray-800">
                                [19/06/2025 21:49] Bolsista 000000000-00 adicionado pelo funcionário 111111111-11
                            </p>
                            <p className="font-mono text-sm text-gray-800">
                                [19/06/2025 21:52] Bolsista 000000000-00 adicionado pelo funcionário 111111111-11
                            </p>
                            <p className="font-mono text-sm text-gray-800">
                                [20/06/2025 21:52] Bolsista 000000000-01 removido pelo funcionário 111111111-11
                            </p>
                            <p className="font-mono text-sm text-gray-800">
                                [20/06/2025 21:52] Relatório ABRIL-2025 emitido pelo funcionário 111111111-11
                            </p> <p className="font-mono text-sm text-gray-800">
                                [19/06/2025 21:47] Bolsista 000000000-00 adicionado pelo funcionário 111111111-11
                            </p>
                            <p className="font-mono text-sm text-gray-800">
                                [19/06/2025 21:49] Bolsista 000000000-00 adicionado pelo funcionário 111111111-11
                            </p>
                            <p className="font-mono text-sm text-gray-800">
                                [19/06/2025 21:52] Bolsista 000000000-00 adicionado pelo funcionário 111111111-11
                            </p>
                            <p className="font-mono text-sm text-gray-800">
                                [20/06/2025 21:52] Bolsista 000000000-01 removido pelo funcionário 111111111-11
                            </p>
                            <p className="font-mono text-sm text-gray-800">
                                [20/06/2025 21:52] Relatório ABRIL-2025 emitido pelo funcionário 111111111-11
                            </p> <p className="font-mono text-sm text-gray-800">
                                [19/06/2025 21:47] Bolsista 000000000-00 adicionado pelo funcionário 111111111-11
                            </p>
                            <p className="font-mono text-sm text-gray-800">
                                [19/06/2025 21:49] Bolsista 000000000-00 adicionado pelo funcionário 111111111-11
                            </p>
                            <p className="font-mono text-sm text-gray-800">
                                [19/06/2025 21:52] Bolsista 000000000-00 adicionado pelo funcionário 111111111-11
                            </p>
                            <p className="font-mono text-sm text-gray-800">
                                [20/06/2025 21:52] Bolsista 000000000-01 removido pelo funcionário 111111111-11
                            </p>
                            <p className="font-mono text-sm text-gray-800">
                                [20/06/2025 21:52] Relatório ABRIL-2025 emitido pelo funcionário 111111111-11
                            </p> <p className="font-mono text-sm text-gray-800">
                                [19/06/2025 21:47] Bolsista 000000000-00 adicionado pelo funcionário 111111111-11
                            </p>
                            <p className="font-mono text-sm text-gray-800">
                                [19/06/2025 21:49] Bolsista 000000000-00 adicionado pelo funcionário 111111111-11
                            </p>
                            <p className="font-mono text-sm text-gray-800">
                                [19/06/2025 21:52] Bolsista 000000000-00 adicionado pelo funcionário 111111111-11
                            </p>
                            <p className="font-mono text-sm text-gray-800">
                                [20/06/2025 21:52] Bolsista 000000000-01 removido pelo funcionário 111111111-11
                            </p>
                            <p className="font-mono text-sm text-gray-800">
                                [20/06/2025 21:52] Relatório ABRIL-2025 emitido pelo funcionário 111111111-11
                            </p> <p className="font-mono text-sm text-gray-800">
                                [19/06/2025 21:47] Bolsista 000000000-00 adicionado pelo funcionário 111111111-11
                            </p>
                            <p className="font-mono text-sm text-gray-800">
                                [19/06/2025 21:49] Bolsista 000000000-00 adicionado pelo funcionário 111111111-11
                            </p>
                            <p className="font-mono text-sm text-gray-800">
                                [19/06/2025 21:52] Bolsista 000000000-00 adicionado pelo funcionário 111111111-11
                            </p>
                            <p className="font-mono text-sm text-gray-800">
                                [20/06/2025 21:52] Bolsista 000000000-01 removido pelo funcionário 111111111-11
                            </p>
                            <p className="font-mono text-sm text-gray-800">
                                [20/06/2025 21:52] Relatório ABRIL-2025 emitido pelo funcionário 111111111-11
                            </p> <p className="font-mono text-sm text-gray-800">
                                [19/06/2025 21:47] Bolsista 000000000-00 adicionado pelo funcionário 111111111-11
                            </p>
                            <p className="font-mono text-sm text-gray-800">
                                [19/06/2025 21:49] Bolsista 000000000-00 adicionado pelo funcionário 111111111-11
                            </p>
                            <p className="font-mono text-sm text-gray-800">
                                [19/06/2025 21:52] Bolsista 000000000-00 adicionado pelo funcionário 111111111-11
                            </p>
                            <p className="font-mono text-sm text-gray-800">
                                [20/06/2025 21:52] Bolsista 000000000-01 removido pelo funcionário 111111111-11
                            </p>
                            <p className="font-mono text-sm text-gray-800">
                                [20/06/2025 21:52] Relatório ABRIL-2025 emitido pelo funcionário 111111111-11
                            </p> <p className="font-mono text-sm text-gray-800">
                                [19/06/2025 21:47] Bolsista 000000000-00 adicionado pelo funcionário 111111111-11
                            </p>
                            <p className="font-mono text-sm text-gray-800">
                                [19/06/2025 21:49] Bolsista 000000000-00 adicionado pelo funcionário 111111111-11
                            </p>
                            <p className="font-mono text-sm text-gray-800">
                                [19/06/2025 21:52] Bolsista 000000000-00 adicionado pelo funcionário 111111111-11
                            </p>
                            <p className="font-mono text-sm text-gray-800">
                                [20/06/2025 21:52] Bolsista 000000000-01 removido pelo funcionário 111111111-11
                            </p>
                            <p className="font-mono text-sm text-gray-800">
                                [20/06/2025 21:52] Relatório ABRIL-2025 emitido pelo funcionário 111111111-11
                            </p> <p className="font-mono text-sm text-gray-800">
                                [19/06/2025 21:47] Bolsista 000000000-00 adicionado pelo funcionário 111111111-11
                            </p>
                            <p className="font-mono text-sm text-gray-800">
                                [19/06/2025 21:49] Bolsista 000000000-00 adicionado pelo funcionário 111111111-11
                            </p>
                            <p className="font-mono text-sm text-gray-800">
                                [19/06/2025 21:52] Bolsista 000000000-00 adicionado pelo funcionário 111111111-11
                            </p>
                            <p className="font-mono text-sm text-gray-800">
                                [20/06/2025 21:52] Bolsista 000000000-01 removido pelo funcionário 111111111-11
                            </p>
                            <p className="font-mono text-sm text-gray-800">
                                [20/06/2025 21:52] Relatório ABRIL-2025 emitido pelo funcionário 111111111-11
                            </p>
                        </div>
                    </div>

                    <div className="flex justify-end mt-8">
                        <button
                            type="button"
                            onClick={() => console.log("Botão 'Atualizar' clicado")}
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