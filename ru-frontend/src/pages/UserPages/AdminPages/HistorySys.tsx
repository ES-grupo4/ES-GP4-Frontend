import { useEffect, useState } from "react";
import MonthYearDropdown from "../../../components/MonthDropdown";
import routes from "../../../services/routes";
import { AxiosResponse } from "axios";

export default function HistorySys() {

    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [month, setMonth] = useState<number>(new Date().getMonth());
    const [histTxt, setHistTxt] = useState("");
    const [page, setPage] = useState(1)
    const [pageQtd, setPageQtd] = useState(1)

    useEffect(() => {
        const getHistorico = async () => {
            try {
                const response = await routes.getHistoricoByMonth(month, year, page)
                setPageQtd(response.data["total_pages"])
                makeHistTxt(response);
            } catch (e) {
                setHistTxt("Ocorreu um erro ao resgatar o histórico: " + e);
            }
        }
        getHistorico();
    }, [year, month, page])

    const makeHistTxt = (response: AxiosResponse) => {
        console.log(response);
        console.log(response.data["items"].length);
        console.log(response.data["items"] != undefined)
        if (response.data["items"] != undefined && response.data["items"].length > 0) {
            var tempHistTxt = "";
            response.data["items"].forEach((item: { [x: string]: any; }) => {
                tempHistTxt += `[${item["data"]}] ${item["ator_nome"]} (id: ${item["ator_id"]}; cpf: ${item["ator_cpf"]}) ${item["acao"]} ${item["alvo_nome"]} (id: ${item["alvo_id"]}; cpf: ${item["alvo_cpf"]})\n`
            });
            setHistTxt(tempHistTxt);
        } else {
            setHistTxt("[Histórico Vazio!]")
        }
    }

    const handleDownload = () => {
        const blob = new Blob([histTxt], { type: 'text/plain;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `historico_${month}/${year}_pg${page}.txt`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(url);
    };

    const changePage = (e: React.ChangeEvent<any>) => {
        setPage(e.target.value)
    }

    function handleChange(newYear: number, newMonth: number): void {
        setMonth(newMonth);
        setYear(newYear);
    }

    return (
        <div className="p-4 sm:ml-64 flex flex-col min-h-screen">
            <div className="group flex mb-6">
                <h1 className="font-semibold font-sans text-6xl text-sky-900">Histórico do Sistema</h1>
            </div>
            <div className="flex-grow flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-7xl min-h-[600px] flex flex-col">

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
                            {pageQtd != 0 &&
                                <div>
                                    Página Selecionada:
                                    <select
                                        value={page}
                                        onChange={changePage}
                                        className="ml-5 border border-gray-300 rounded-lg px-3 py-2 text-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {Array.from({ length: pageQtd }, (_, i) => i + 1).map((page) => (
                                            <option key={page} value={page}>
                                                {page}
                                            </option>
                                        ))}
                                    </select>
                                </div>}

                            <button
                                type="button"
                                onClick={handleDownload}
                                className="cursor-pointer p-2 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
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

                    <div className="bg-gray-200 border border-gray-300 rounded-lg p-4 overflow-y-auto flex-grow">
                        <pre className="whitespace-pre overflow-x-auto min-h-[600px]">{histTxt}</pre>
                    </div>

                </div>
            </div>
        </div>
    );
}