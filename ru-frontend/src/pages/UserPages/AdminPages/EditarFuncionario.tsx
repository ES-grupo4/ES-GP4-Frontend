import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom"
import RemoveButton from "../../../components/RemoveButton"
import routes from "../../../services/routes"
import { UrlRouter } from "../../../constants/UrlRouter";

export default function EditarFuncionario({ setLogged }: Readonly<{ setLogged: (logged: boolean) => void }>) {
    const navigate = useNavigate();
    const id = useParams()["id"] //CPF tirado dos parâmetros do link
    const [found, setFound] = useState(false) //Se o funcionário com o cpf foi encontrado
    const [funcionarioData, setFuncionarioData] = useState({ cpf: "", nome: "", email: "" })
    const [novaSenha, setNovaSenha] = useState("");
    useEffect(() => {
        getFuncionarioData()
    }, [])

    const getFuncionarioData = async () => { //Recebe os dados do funcionário pelo cpf
        if (id != null) {
            const response = await routes.getFuncionarioById(id);
            const funcionarios = response.data.items;
            console.log(funcionarios)
            if (funcionarios.length != 0) {
                setFuncionarioData({ cpf: funcionarios[0]["cpf"], nome: funcionarios[0]["nome"], email: funcionarios[0]["email"] })
                setFound(true)
            }
        }

    }

    const onChangeName = (e: React.ChangeEvent<any>) => {
        setFuncionarioData({ cpf: funcionarioData["cpf"], nome: e.target.value, email: funcionarioData["email"] })
    }

    const onChangeEmail = (e: React.ChangeEvent<any>) => {
        setFuncionarioData({ cpf: funcionarioData["cpf"], nome: funcionarioData["nome"], email: e.target.value })
    }

    const onChangeSenha = (e: React.ChangeEvent<any>) => {
        setNovaSenha(e.target.value)
    }

    const excluirFuncionario = async () => {
        const localCpf = localStorage.getItem("cpf");
        const confirmationRequired = localCpf === funcionarioData["cpf"];
        let confirmation = confirmationRequired ? confirm("O usuário a ser desativado é o mesmo que está logado. Prosseguir?") : false;
        if ((!confirmationRequired|| (confirmationRequired && confirmation)) && id != null) {
            try {
                const response = await routes.removeFuncionarioByCpf(funcionarioData["cpf"]);
                console.log(response);
                if (confirmationRequired) {
                    alert("Usuário atual desativado!");
                    localStorage.removeItem("token");
                    setLogged(false);
                    navigate(UrlRouter.login);
                } else {
                    alert("Funcionário desativado!");
                    navigate(-1);
                }
            } catch (e) {
                console.log(e);
                alert(`Ocorreu o seguinte problema ao desativar o funcionário:\n
                       ${e}`);
            }
        }
    }

    const salvarAlteracoes = async () => {
        if (id != null) {
            console.log("Salvar Alterações")
            let data = {}
            if (funcionarioData["nome"] != "") {
                data = { ...data, nome: funcionarioData["nome"] }
            }
            if (funcionarioData["email"] != "") {
                data = { ...data, email: funcionarioData["email"] }
            }
            if (novaSenha != "") {
                data = { ...data, senha: novaSenha };
            }
            console.log(data)
            const response = await routes.updateFuncionario(id, data);
            if (response.status == 200) {
                alert("Funcionario atualizado com sucesso!");
            } else {
                alert("Ocorreu um erro ao atualizar o funcionario")
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
                <div className="bg-white mx-auto my-25 p-5 w-7/10 h-130 rounded-lg">
                    <p className="text-2xl"><span className="font-bold">CPF:</span> {funcionarioData["cpf"]}</p>
                    <p className="text-2xl"><span className="font-bold">ID:</span> {id}</p>
                    <div className="mt-20 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <span className="text-2xl font-bold">Nome:</span>
                        <input type="text" id="name" value={funcionarioData["nome"]} onChange={onChangeName} className="bg-gray-200 border border-gray-300 text-gray-900 text-m rounded-lg block w-3/4 p-2.5" placeholder="Nome do Funcionário" required />
                    </div>
                    <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <span className="text-2xl font-bold">Email: </span>
                        <input type="text" id="name" value={funcionarioData["email"]} onChange={onChangeEmail} className="bg-gray-200 border border-gray-300 text-gray-900 text-m rounded-lg block w-3/4 p-2.5" placeholder="Email do Funcionário" required />
                    </div>
                    <div className="mt-5 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <span className="text-2xl font-bold">Nova Senha: </span>
                        <input type="password" id="senha" value={novaSenha} onChange={onChangeSenha} className="bg-gray-200 disabled:bg-gray-500 border border-gray-300 text-gray-900 text-m rounded-lg block w-3/4 p-2.5" placeholder="Nova Senha" required />
                    </div>
                    <div className="mt-20 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
                        <button type="button" onClick={salvarAlteracoes} className="cursor-pointer bg-green-700 hover:bg-green-800 focus:ring-4 rounded-lg text-m text-white font-bold  px-5 py-2.5 me-2 mb-2">Salvar Alterações</button>
                        <RemoveButton onClickFunction={excluirFuncionario} nomeEntidade={"funcionário"} />
                    </div>
                </div>
                :
                <span className="text-2xl m-auto text-red-500">Não foi possível encontrar funcionário com ID {id}</span>
            }



        </div >)
}