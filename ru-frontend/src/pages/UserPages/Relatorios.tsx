import { useEffect, useState } from "react";
import MonthYearDropdown from "../../components/MonthDropdown";
import RelatorioTemplate from "../../components/RelatorioTemplate";
import routes from "../../services/routes";

export default function Relatorios() {

    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [month, setMonth] = useState<number>(new Date().getMonth());
    const [data, setData] = useState({cpf:localStorage.getItem('cpf'), periodStr:`${month}/${year}`});

    useEffect(() => {
        const getRelatorioData = async () => {
            const response = await routes.getRelatorio(month,year);
            console.log(response)
        }
        getRelatorioData();
    })

    function handleChange(yearNew: number, monthNew: number): void {
        setData({...data, periodStr: `${monthNew}/${yearNew}`})
        setYear(yearNew);
        setMonth(monthNew);
    }
    return (
        <div className="p-4 sm:ml-64">
            <div className="group flex">
                <h1 className="font-semibold font-sans text-6xl text-sky-900">Relatórios</h1>
            </div>
            <br/>
            <div className="flex-grow flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-7xl min-h-[700px] flex flex-col">

                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Relatório com base em mês e cano
                        </h2>

                        <div className="flex items-center gap-4">
                            <MonthYearDropdown
                                        selectedYear={year}
                                        selectedMonth={month}
                                        onChange={handleChange}
                                        startYear={2000}
                                    />
                        </div>
                    </div>
                    <div>
                        <RelatorioTemplate data={data}/>
                    </div>
                </div>
            </div>
        </div>
    );
}