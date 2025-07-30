import {useState } from "react"
import EntityTable from "../../../components/EntityTable"
import { UrlRouter } from "../../../constants/UrlRouter"

export default function Funcionarios() {

    const [data, setData] = useState(
        [ //tableData, no futuro, irá guardar as informações dos funcionários recebidas por requisições http
            {
                id: 3,
                Nome: "EVRART CLAIRE",
                CPF: "222222222-22",
                Email: "helper.finder@gmail.com"
            },
        ])

    return (
        <div className="p-4 sm:ml-64">
            <div className="group flex">
                <h1 className="font-semibold font-sans text-6xl text-sky-900">Administradores</h1>
                <button className="bg-green-700 hover:bg-green-950 rounded-xl h-15 w-15 mx-4 my-2 cursor-pointer" type="button">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={3} stroke="white" className="size-15">
                        <path strokeLinecap="butt" strokeLinejoin="miter" d="M12 4.5v15m7.5-7.5h-15" />
                    </svg>
                </button>
            </div>
            <br />
            <EntityTable tableData={data} columns={["id","Nome","CPF","Email"]} url={UrlRouter.usuario.administracao.administradores.editar.split(":")[0]}/>
            
        </div>)
}