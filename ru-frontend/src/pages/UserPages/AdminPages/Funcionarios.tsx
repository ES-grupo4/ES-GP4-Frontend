import { useEffect, useState } from "react"
import EntityTable from "../../../components/EntityTable"
import { UrlRouter } from "../../../constants/UrlRouter"
import { Link } from "react-router-dom"
import routes from "../../../services/routes"

export default function Funcionarios() {

    const [data, setData] = useState([])
    const [page, setPage] = useState(1)
    const [pageQtd, setPageQtd] = useState(1)

    const next = () => {
        if (page === pageQtd) return;

        setPage(page + 1);
    };

    const prev = () => {
        if (page === 1) return;

        setPage(page - 1);
    };
    useEffect(() => {
        const getFuncionarioData = async () => {
            const response = await routes.getAllFuncionarios(page);
            console.log(response)
            const data = response.data["items"].filter((func: { [x: string]: string }) => func["tipo"] == "funcionario")
            setPageQtd(response.data["total_pages"]);
            setData(data);
        }
        getFuncionarioData();
    }, [page])

    return (
        <div className="p-4 sm:ml-64">
            <div className="group flex">
                <h1 className="font-semibold font-sans text-6xl text-sky-900">Funcionários</h1>
                <Link to={UrlRouter.usuario.administracao.funcionarios.adicionar} className="bg-green-700 hover:bg-green-950 rounded-xl h-15 w-15 mx-4 my-2 cursor-pointer" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="white" className="size-15">
                        <path strokeLinecap="butt" strokeLinejoin="miter" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </Link>
            </div>
            <br />
            <EntityTable tableData={data} columns={["id", "nome", "cpf", "email", "data_entrada"]} url={UrlRouter.usuario.administracao.funcionarios.editar.split(":")[0]} hasChart={false} chartUrl="" 
            page={page} total_pages={pageQtd} prev={prev} next={next}/>

        </div>)
}