import { useEffect, useState } from "react"
import {useParams } from "react-router-dom"
import routes from "../../services/routes";

export default function EditarCliente() {

    const id = useParams()["id"] //CPF tirado dos parâmetros do link
    const [found, setFound] = useState(false) //Se o funcionário com o cpf foi encontrado
    const [clienteData, setClienteData] = useState({ cpf: "", nome: "", matricula: "", tipo: "", tipoGraduacao: "", bolsista: "" })
    useEffect(() => {
        getAdministradorData()
    }, [])

    const getAdministradorData = async () => { //Recebe os dados do funcionário pelo cpf
        if (id != null) {
            const response = await routes.getClienteById(id);
            const clientes = [response.data];
            console.log(response)

            let tipoGradTemp = "";

            if (clientes[0]["graduando"] && clientes[0]["pos_graduando"]) {
                tipoGradTemp = "graduacao_e_pos";
            } else if (clientes[0]["graduando"]) {
                tipoGradTemp = "graduacao";
            } else if (clientes[0]["pos_graduando"]) {
                tipoGradTemp = "pos_graduacao";
            } else {
                tipoGradTemp = "nenhuma";
            }

            if (clientes.length != 0) {
                setClienteData({
                    cpf: clientes[0]["cpf"], nome: clientes[0]["nome"], matricula: clientes[0]["matricula"],
                    tipo: clientes[0]["tipo"],
                    tipoGraduacao: tipoGradTemp,
                    bolsista: clientes[0]["bolsista"] ? "Sim" : 'Nao'
                })
                setFound(true)
                console.log({
                    cpf: clientes[0]["cpf"], nome: clientes[0]["nome"], matricula: clientes[0]["matricula"],
                    tipo: clientes[0]["tipo"],
                    tipoGraduacao: tipoGradTemp,
                    bolsista: clientes[0]["bolsista"] ? "Sim" : 'Nao'
                })
            }
        }

    }

    const onChangeName = (e: React.ChangeEvent<any>) => {
        setClienteData({
            cpf: clienteData["cpf"], nome: e.target.value, matricula: clienteData["matricula"],
            tipo: clienteData["tipo"], tipoGraduacao: clienteData["tipoGraduacao"], bolsista: clienteData["bolsista"]
        })
    }

    const onChangeMatricula = (e: React.ChangeEvent<any>) => {
        setClienteData({
            cpf: clienteData["cpf"], nome: clienteData["nome"], matricula: e.target.value,
            tipo: clienteData["tipo"], tipoGraduacao: clienteData["tipoGraduacao"], bolsista: clienteData["bolsista"]
        })
    }

    const onChangeTipo = (e: React.ChangeEvent<any>) => {
        setClienteData({
            cpf: clienteData["cpf"], nome: clienteData["nome"], matricula: clienteData["matricula"],
            tipo: e.target.value, tipoGraduacao: clienteData["tipoGraduacao"], bolsista: clienteData["bolsista"]
        })
    }

    const onChangeTipoGraduacao = (e: React.ChangeEvent<any>) => {
        setClienteData({
            cpf: clienteData["cpf"], nome: clienteData["nome"], matricula: clienteData["matricula"],
            tipo: clienteData["tipo"], tipoGraduacao: e.target.value, bolsista: clienteData["bolsista"]
        })
    }


    const onChangeBolsista = (e: React.ChangeEvent<any>) => {
        setClienteData({
            cpf: clienteData["cpf"], nome: clienteData["nome"], matricula: clienteData["matricula"],
            tipo: clienteData["tipo"], tipoGraduacao: clienteData["tipoGraduacao"], bolsista: e.target.value
        })
    }

    

    const salvarAlteracoes = async () => {
        if (id != null) {
            let data = {}
            if (clienteData["nome"] != "") {
                data = { ...data, nome: clienteData["nome"] }
            }
            if (clienteData["matricula"] != "") {
                data = { ...data, matricula: clienteData["matricula"] }
            }
            let graduando = false;
            let pos_graduando = false;
            switch (clienteData["tipoGraduacao"]) {
                case ("graduando"):
                    graduando = true;
                    break;
                case ("pos_graduando"):
                    pos_graduando = true;
                    break;
                case ("graduacao_e_pos"):
                    graduando = true;
                    pos_graduando = true;
                    break;
            }
            data = {
                ...data,
                bolsista: clienteData["bolsista"] === "Sim",
                tipo: clienteData["tipo"],
                graduando: graduando, pos_graduando: pos_graduando
            }
            const response = await routes.updateCliente(id, data);
            if (response.status == 200) {
                alert("Cliente atualizado com sucesso!");
            } else {
                alert("Ocorreu um erro ao atualizar o cliente")
            }
            console.log(response);
        }
    }

    return (
        <div className="p-4 sm:ml-64">
            <div className="group flex">
                <h1 className="font-semibold font-sans text-6xl text-sky-900">Editar Dados</h1>
            </div>
            <br />
            {found ?
                <div className="bg-white mx-auto my-25 p-5 w-7/10 h-100 rounded-lg">
                    <span className="text-2xl"><span className="font-bold">CPF:</span> {clienteData["cpf"]}</span>
                    <div className="mt-20 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <span className="text-2xl font-bold">Nome:</span>
                        <input type="text" id="name" value={clienteData["nome"]} onChange={onChangeName} className="bg-gray-200 border border-gray-300 text-gray-900 text-m rounded-lg block w-3/4 p-2.5" placeholder="Nome do Funcionário" required />
                    </div>
                    <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <span className="text-2xl font-bold">Matrícula: </span>
                        <input type="text" id="name" value={clienteData["matricula"]} onChange={onChangeMatricula} className="bg-gray-200 border border-gray-300 text-gray-900 text-m rounded-lg block w-3/4 p-2.5" placeholder="Matricula do Funcionário" required />
                    </div>
                    <div className="flex space-x-4 my-5">
                        <div className="inline-block relative w-32">
                            <label
                                htmlFor="matricula"
                                className="block text-md font-bold mb-1"
                            >
                                Tipo de Cliente:
                            </label>
                            <select
                                value={clienteData["tipo"]}
                                onChange={onChangeTipo}
                                className="block w-full px-4 py-2 pr-8 text-gray-700 bg-white border border-gray-300 rounded shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option key={0} value={"aluno"}>Aluno</option>
                                <option key={1} value={"professor"}>Professor</option>
                                <option key={2} value={"tecnico"}>Técnico</option>
                            </select>
                            <div className="pointer-events-none absolute mt-8 inset-y-0 right-0 flex items-center px-2 text-gray-700">▼</div>
                        </div>
                        <div className="inline-block relative w-48">
                            <label
                                htmlFor="matricula"
                                className="block text-md font-bold mb-1"
                            >
                                Formação:
                            </label>
                            <select
                                value={clienteData["tipoGraduacao"]}
                                onChange={onChangeTipoGraduacao}
                                className="block w-full px-4 py-2 pr-8 text-gray-700 bg-white border border-gray-300 rounded shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option key={0} value={"nenhuma"}>Nenhuma</option>
                                <option key={1} value={"pos_graduacao"}>Pós Graduação</option>
                                <option key={2} value={"graduacao_e_pos"}>Graduação e Pós</option>
                                <option key={3} value={"graduacao"}>Graduação</option>
                            </select>
                            <div className="pointer-events-none absolute mt-8 inset-y-0 right-0 flex items-center px-2 text-gray-700">▼</div>
                        </div>
                        <div className="inline-block relative w-48">
                            <label
                                htmlFor="matricula"
                                className="block text-md font-bold mb-1"
                            >
                                Bolsista:
                            </label>
                            <select
                                value={clienteData["bolsista"]}
                                onChange={onChangeBolsista}
                                className="block w-full px-4 py-2 pr-8 text-gray-700 bg-white border border-gray-300 rounded shadow-md appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                            >
                                <option key={0} value={"Nao"}>Não</option>
                                <option key={1} value={"Sim"}>Sim</option>
                            </select>
                            <div className="pointer-events-none absolute mt-8 inset-y-0 right-0 flex items-center px-2 text-gray-700">▼</div>
                        </div>
                    </div>
                    <div className="mt-20 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <button type="button" onClick={salvarAlteracoes} className="cursor-pointer bg-green-700 hover:bg-green-800 focus:ring-4 rounded-lg text-m text-white font-bold  px-5 py-2.5 me-2 mb-2">Salvar Alterações</button>
                    </div>
                </div>
                :
                <span className="text-2xl m-auto text-red-500">Não foi possível encontrar Cliente com ID {id}</span>
            }



        </div >)
}