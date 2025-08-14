import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function DetalhesCliente() {

    const monthOptions = [];
    const currentDate = new Date();

    for (let i = 0; i < 12; i++) {
        const date = new Date(currentDate);
        date.setMonth(currentDate.getMonth() - i);

        const displayValue = new Intl.DateTimeFormat('pt-BR', { month: 'long', year: 'numeric' }).format(date);
        const optionValue = date.toISOString().slice(0, 7);

        monthOptions.push(
            <option key={optionValue} value={optionValue}>
                {displayValue.charAt(0).toUpperCase() + displayValue.slice(1)}
            </option>
        );
    }

    const [data, setData] = useState(
        [ //tableData, no futuro, irá guardar as informações dos funcionários recebidas por requisições http
            {
                id: 4,
                nome: "DESS HOLIDAY",
                cpf: "122512250-12",
                email: "roaring.knight@gmail.com",
                matricula: "000000000",
                categoria: "Graduação",
                bolsista: true,
                totalMensal: "0"
            },
            {
                id: 5,
                nome: "ASGORE DREEMUR",
                cpf: "999999999-99",
                email: "truck@gmail.com",
                matricula: "111111111",
                categoria: "Graduação",
                bolsista: true,
                totalMensal: "0"
            },
            {
                id: 6,
                nome: "NOELLE HOLLIDAY",
                cpf: "121212120-12",
                email: "susie.fancluber@gmail.com",
                matricula: "222222222",
                categoria: "Graduação",
                bolsista: true,
                totalMensal: "0"
            },
        ])

    const id = useParams()["id"] //CPF tirado dos parâmetros do link
    const [found, setFound] = useState(false) //Se o funcionário com o cpf foi encontrado
    const [clienteData, setClienteData] = useState({ cpf: "", nome: "", email: "", matricula: "", categoria: "", bolsista: false, totalMensal: "" })
    useEffect(() => {
        getClienteData()
    }, [])

    const getClienteData = () => { //Recebe os dados do funcionário pelo cpf
        for (var i = 0; i < data.length; i++) {
            if (data[i]["id"].toString() == id) {
                setClienteData({
                    cpf: data[i]["cpf"], nome: data[i]["nome"], email: data[i]["email"],
                    matricula: data[i]["matricula"], categoria: data[i]["categoria"], bolsista: data[i]["bolsista"],
                    totalMensal: data[i]["totalMensal"]
                })
                setFound(true)
                break
            }
        }
    }

    return (
        <div className="p-4 sm:ml-64 flex flex-col min-h-screen">
            <div className="group flex">
                <h1 className="font-semibold font-sans text-6xl text-sky-900">Informações Gerais</h1>
            </div>
            {found ?
                <div className="flex-grow flex items-center justify-center">
                    <div className="bg-white mx-auto my-25 p-5 w-7/10 h-100 rounded-lg">
                        <div className="flex justify-between items-center mb-6">
                            <h2 className="text-2xl font-semibold text-gray-800">
                                Visualizar dados do Cliente:
                            </h2>
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <select
                                        className="border border-gray-300 rounded-md py-2 px-3 pr-8 appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    >
                                        {monthOptions}
                                    </select>
                                    <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                                            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
                                        </svg>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <hr className="my-1 h-0.5 border-t-0 bg-neutral-100" />
                        <div className="flex justify-between items-center mb-6">
                            <div className="text-2xl grid grid-cols-1">
                                <h1><span className="font-bold">Nome: </span>{clienteData["nome"]}</h1>
                                <h1><span className="font-bold">CPF: </span>{clienteData["cpf"]}</h1>
                                <h1><span className="font-bold">Email: </span>{clienteData["email"]}</h1>
                                <h1><span className="font-bold">Matrícula: </span>{clienteData["matricula"]}</h1>
                                <h1><span className="font-bold">Categoria: </span>{clienteData["categoria"]}</h1>
                                <h1><span className="font-bold">Bolsista: </span>{clienteData["bolsista"] ? "SIM" : "NÃO"}</h1>
                                <br />
                                <h1><span className="font-bold">Gasto total mensal: </span>{clienteData["totalMensal"]}</h1>
                            </div>
                            <div>
                                {"Aqui vai ficar o calendário coloridinho <3"} 
                            </div>
                        </div>

                    </div>
                </div>
                :
                <span className="text-2xl m-auto text-red-500">Não foi possível encontrar funcionário com ID {id}</span>
            }
        </div>
    );
}