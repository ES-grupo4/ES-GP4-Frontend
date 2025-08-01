import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import RemoveButton from "../../../components/RemoveButton"

export default function EditarFuncionario() {

    const funcionarios = [ // Lista de funcionários, abstração temporária de um banco de dados
        { cpf: "111111111-11", nome: "Kim Kitsuragi", email: "tenente.kitsuragi@gmail.com" },
        { cpf: "000000000-00", nome: "Rafael Montes Cunha", email: "guaxinim.gamer@gmail.com" }
    ]

    const cpf = useParams()["cpf"] //CPF tirado dos parâmetros do link
    const [found, setFound] = useState(false) //Se o funcionário com o cpf foi encontrado
    const [funcionarioData, setFuncionarioData] = useState({ nome: "", email: "" })
    useEffect(() => {
        getFuncionarioData()
    }, [])

    const getFuncionarioData = () => { //Recebe os dados do funcionário pelo cpf
        for (var i = 0; i < funcionarios.length; i++) {
            if (funcionarios[i]["cpf"] == cpf) {
                setFuncionarioData({ nome: funcionarios[i]["nome"], email: funcionarios[i]["email"] })
                setFound(true)
                break
            }
        }
    }

        const onChangeName = (e: React.ChangeEvent<any>) => {
            setFuncionarioData({ nome: e.target.value, email: funcionarioData["email"] })
        }

        const onChangeEmail = (e: React.ChangeEvent<any>) => {
            setFuncionarioData({ nome: funcionarioData["nome"], email: e.target.value })
        }

        const excluirFuncionario = () => {
            console.log("Excluir Funcionario")
        }

        const salvarAlteracoes = () => {
            console.log("Salvar Alterações")
        }

        return (
            <div className="p-4 sm:ml-64">
                <div className="group flex">
                    <h1 className="font-semibold font-sans text-6xl text-sky-900">Editar Dados</h1>
                </div>
                <br />
                {found ?
                    <div className="bg-white mx-auto my-25 p-5 w-7/10 h-100 rounded-lg">
                        <span className="text-2xl"><span className="font-bold">CPF:</span> {cpf}</span>
                        <div className="mt-20 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                            <span className="text-2xl font-bold">Nome:</span>
                            <input type="text" id="name" value={funcionarioData["nome"]} onChange={onChangeName} className="bg-gray-200 border border-gray-300 text-gray-900 text-m rounded-lg block w-3/4 p-2.5" placeholder="Nome do Funcionário" required />
                        </div>
                        <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                            <span className="text-2xl font-bold">Email: </span>
                            <input type="text" id="name" value={funcionarioData["email"]} onChange={onChangeEmail} className="bg-gray-200 border border-gray-300 text-gray-900 text-m rounded-lg block w-3/4 p-2.5" placeholder="Email do Funcionário" required />
                        </div>

                        <div className="mt-20 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                            <button type="button" onClick={salvarAlteracoes} className="cursor-pointer bg-green-700 hover:bg-green-800 focus:ring-4 rounded-lg text-m text-white font-bold  px-5 py-2.5 me-2 mb-2">Salvar Alterações</button>
                            <RemoveButton onClickFunction={excluirFuncionario} />
                        </div>
                    </div>
                    :
                    <span className="text-2xl m-auto text-red-500">Não foi possível encontrar funcionário com CPF {cpf}</span>
                }



            </div >)
    }