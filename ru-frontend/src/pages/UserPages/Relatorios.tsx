import { useEffect, useState } from "react";
import MonthYearDropdown from "../../components/MonthDropdown";
import RelatorioTemplate from "../../components/RelatorioTemplate";
import routes from "../../services/routes";
import axios from "axios";

export default function Relatorios() {
    const cpf = localStorage.getItem('cpf')
    const [year, setYear] = useState<number>(new Date().getFullYear());
    const [month, setMonth] = useState<number>(new Date().getMonth() + 1);
    const [loaded, setLoaded] = useState(false);
    const [error, setError] = useState(false);
    const [data, setData] = useState({
        cpf: cpf,
        periodStr: `${month}/${year}`,
        nome_empresa: "Fulano de Sal",
        faturamento_bruto_mensal: 0,
        clientes_registrados: {
            total: 0,
            externos: 0,
            professores: 0,
            tecnicos: 0,
            alunos: {
                total: 0,
                pos_graduacao: 0,
                em_graduacao: 0,
                ambos: 0,
                bolsistas: 0
            }
        },
        funcionarios_ativos: 0,
        administradores_ativos: 1,
        desativados: 0,
        funcionarios_adicionados_mes: 0,
        compras_por_tipo: {
            total: 0,
            externos: 0,
            professores: 0,
            tecnicos: 0,
            alunos: {
                total: 0,
                pos_graduacao: 0,
                em_graduacao: 0,
                ambos: 0,
                bolsistas: 0
            }
        }
    });

    useEffect(() => {
        const getRelatorioData = async () => {
            try {
                const response = await routes.getRelatorio(month, year);
                console.log(response)
                setData({
                    ...response.data,
                    cpf: cpf,
                    periodStr: `${month}/${year}`
                })
                setLoaded(true);
            } catch (e) {
                setError(true);
                if (axios.isAxiosError(e)) {
                    alert(`Ocorreu um erro ao resgatar o relatório: ${e.response?.data["detail"]}`)
                } else {
                    alert(`Ocorreu um erro desconhecido ao resgatar o relatório!`)
                }
                setData({
                    cpf: cpf,
                    periodStr: `${month}/${year}`,
                    nome_empresa: "Fulano de Sal",
                    faturamento_bruto_mensal: 0,
                    clientes_registrados: {
                        total: 0,
                        externos: 0,
                        professores: 0,
                        tecnicos: 0,
                        alunos: {
                            total: 0,
                            pos_graduacao: 0,
                            em_graduacao: 0,
                            ambos: 0,
                            bolsistas: 0
                        }
                    },
                    funcionarios_ativos: 0,
                    administradores_ativos: 1,
                    desativados: 0,
                    funcionarios_adicionados_mes: 0,
                    compras_por_tipo: {
                        total: 0,
                        externos: 0,
                        professores: 0,
                        tecnicos: 0,
                        alunos: {
                            total: 0,
                            pos_graduacao: 0,
                            em_graduacao: 0,
                            ambos: 0,
                            bolsistas: 0
                        }
                    }
                })
            }


        }
        getRelatorioData();
    }, [year, month])

    function handleChange(yearNew: number, monthNew: number): void {
        setError(false);
        setLoaded(false);
        setData({ ...data, periodStr: `${monthNew}/${yearNew}` })
        setYear(yearNew);
        setMonth(monthNew);
    }

    let content;

    if (loaded) {
        content = <RelatorioTemplate data={data} />;
    } else if (error) {
        content = <p className="text-center text-red-400">Ocorreu um erro ao resgatar o relatório.</p>;
    } else {
        content = <p className="text-center text-gray-500">Carregando relatório...</p>;
    }
    return (
        <div className="p-4 sm:ml-64">
            <div className="group flex">
                <h1 className="font-semibold font-sans text-6xl text-sky-900">Relatórios</h1>
            </div>
            <br />
            <div className="flex-grow flex items-center justify-center">
                <div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-7xl min-h-[700px] flex flex-col">

                    <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold text-gray-800">
                            Relatório com base em mês e ano
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
                        {content}
                    </div>
                </div>
            </div>
        </div>
    );
}