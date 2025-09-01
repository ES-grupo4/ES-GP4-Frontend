import { useEffect, useState, type SetStateAction } from "react"
import EntityTable from "../../components/EntityTable"
import { UrlRouter } from "../../constants/UrlRouter"
import { Link } from "react-router-dom"
import routes from "../../services/routes"

export default function Clientes() {

    const [data, setData] = useState([])
    const [filter, setFilter] = useState("")
    const [categoria, setCategoria] = useState(""); // começa vazio
    const [page, setPage] = useState(1)
    const [pageQtd, setPageQtd] = useState(1)

    useEffect(() => {
        const getAdminData = async () => {
            console.log("CATEGORIA:" + categoria)
            const response = await routes.getAllClientes(page, filter, categoria);
            var data = response.data["items"]
            console.log(response)
            data.forEach((cliente: { [x: string]: string | boolean }) => {
                if (cliente["graduando"] == true && cliente["pos_graduando"] == true) {
                    cliente["tipo_graduacao"] = "Graduação e Pós"
                } else if (cliente["graduando"] == true) {
                    cliente["tipo_graduacao"] = "Graduação"
                } else if (cliente["pos_graduando"] == true) {
                    cliente["tipo_graduacao"] = "Pós Graduação"
                } else {
                    cliente["tipo_graduacao"] = "Nenhuma"
                }
                if (typeof cliente["tipo"] === "string") {
                    cliente["tipo"] = cliente["tipo"].charAt(0).toUpperCase() + cliente["tipo"].slice(1);
                }

            });
            if (response.data["items"].length == 0) {
                setPageQtd(1);
            } else {
                setPageQtd(response.data["total_pages"]);
            }
            setData(data);
        }
        getAdminData();
        
    }, [page, filter, categoria])


    const next = () => {
        if (page === pageQtd) return;

        setPage(page + 1);
    };

    const prev = () => {
        if (page === 1) return;

        setPage(page - 1);
    };

    return (
        <div className="p-4 sm:ml-64">
            <div className="group flex">
                <h1 className="font-semibold font-sans text-6xl text-sky-900">Clientes</h1>
                <Link to={UrlRouter.usuario.clientes.adicionar} className="bg-green-700 hover:bg-green-950 rounded-xl h-15 w-15 mx-4 my-2 cursor-pointer" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="white" className="size-15">
                        <path strokeLinecap="butt" strokeLinejoin="miter" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </Link>
            </div>
            
            <br />
            <EntityTable tableData={data} columns={["id", "nome", "cpf", "matricula", "tipo", "tipo_graduacao", "bolsista"]} url={UrlRouter.usuario.clientes.editar.split(':')[0]}
                hasChart={true} chartUrl={UrlRouter.usuario.clientes.detalhes.split(':')[0]}
                page={page} total_pages={pageQtd} prev={prev} next={next} setFilter={setFilter} categoria={categoria} setCategoria={setCategoria} />

        </div>)
}