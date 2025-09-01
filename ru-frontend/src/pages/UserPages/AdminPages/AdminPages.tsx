import { Route, Routes } from "react-router-dom";
import Funcionarios from "./Funcionarios";
import EditarFuncionario from "./EditarFuncionario";
import GeneralInfo from "./GeneralInfo";
import HistorySys from "./HistorySys";
import AdicionarFuncionario from "./AdicionarFuncionario";
import Administradores from "./Administradores";
import EditarAdministrador from "./EditarAdministrador";
import AdicionarAdministrador from "./AdicionarAdministrador";

export default function AdminPages({setLogged}: {setLogged: (logged: boolean) => void}) {
    return (
        <>
            <Routes>
                <Route path="/administradores" element={<Administradores/>}/>
                <Route path="/administradores/adicionar" element={<AdicionarAdministrador/>}/>
                <Route path="/administradores/editar/:id" element={<EditarAdministrador setLogged={setLogged}/>}/>
                <Route path="/funcionarios" element={<Funcionarios/>}/>
                <Route path="/funcionarios/adicionar" element={<AdicionarFuncionario/>}/>
                <Route path="/funcionarios/editar/:id" element={<EditarFuncionario setLogged={setLogged}/>}/>
                <Route path="/informacoes" element={<GeneralInfo/>}/>
                <Route path="/historico-sistema" element={<HistorySys/>}/>

                <Route path="/funcionarios/novo" element={<AdicionarFuncionario />} />
            </Routes>
        </>
    )
}