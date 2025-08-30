import { useEffect, useState } from "react"
import { useParams } from "react-router-dom"
import RemoveButton from "../../components/RemoveButton"

export default function EditarCliente() {

    const [data, setData] = useState(
        [ //tableData, no futuro, irá guardar as informações dos funcionários recebidas por requisições http
            {
                id: 4,
                nome: "DESS HOLIDAY",
                cpf: "122512250-12",
                email: "roaring.knight@gmail.com"
            },
            {
                id: 5,
                nome: "ASGORE DREEMUR",
                cpf: "999999999-99",
                email: "truck@gmail.com"
            },
            {
                id: 6,
                nome: "NOELLE HOLLIDAY",
                cpf: "121212120-12",
                email: "susie.fancluber@gmail.com"
            },
        ])

    const id = useParams()["id"] //CPF tirado dos parâmetros do link
    const [found, setFound] = useState(false) //Se o funcionário com o cpf foi encontrado
    const [ClienteData, setClienteData] = useState({cpf:"" ,nome: "", email: "" })
    useEffect(() => {
        getClienteData()
    }, [])

    const getClienteData = () => { //Recebe os dados do funcionário pelo cpf
        for (var i = 0; i < data.length; i++) {
            if (data[i]["id"].toString() == id) {
                setClienteData({cpf: data[i]["cpf"] ,nome: data[i]["nome"], email: data[i]["email"] })
                setFound(true)
                break
            }
        }
    }

        const onChangeName = (e: React.ChangeEvent<any>) => {
            setClienteData({ cpf: ClienteData["cpf"],nome: e.target.value, email: ClienteData["email"] })
        }

        const onChangeEmail = (e: React.ChangeEvent<any>) => {
            setClienteData({ cpf: ClienteData["cpf"],nome: ClienteData["nome"], email: e.target.value })
        }

        const excluirCliente = () => {
            console.log("Excluir Cliente")
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
                        <span className="text-2xl"><span className="font-bold">CPF:</span> {ClienteData["cpf"]}</span>
                        <div className="mt-20 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                            <span className="text-2xl font-bold">Nome:</span>
                            <input type="text" id="name" value={ClienteData["nome"]} onChange={onChangeName} className="bg-gray-200 border border-gray-300 text-gray-900 text-m rounded-lg block w-3/4 p-2.5" placeholder="Nome do Funcionário" required />
                        </div>
                        <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                            <span className="text-2xl font-bold">Email: </span>
                            <input type="text" id="name" value={ClienteData["email"]} onChange={onChangeEmail} className="bg-gray-200 border border-gray-300 text-gray-900 text-m rounded-lg block w-3/4 p-2.5" placeholder="Email do Funcionário" required />
                        </div>

                        <div className="mt-20 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                            <button type="button" onClick={salvarAlteracoes} className="cursor-pointer bg-green-700 hover:bg-green-800 focus:ring-4 rounded-lg text-m text-white font-bold  px-5 py-2.5 me-2 mb-2">Salvar Alterações</button>
                            <RemoveButton onClickFunction={excluirCliente} />
                        </div>
                    </div>
                    :
                    <span className="text-2xl m-auto text-red-500">Não foi possível encontrar funcionário com ID {id}</span>
                }



            </div >)
    }