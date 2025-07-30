import { Route, Routes } from "react-router-dom";
import Funcionarios from "./Funcionarios";
import EditarFuncionario from "./EditarFuncionario";
import GeneralInfo from "./GeneralInfo";
import HistorySys from "./HistorySys";
import AdicionarFuncionario from "./AdicionarFuncionario";
import Administradores from "./Administradores";

export default function AdminPages() {
    return (
        <>
            <Routes>
                <Route path="/administradores" element={<Administradores/>}/>
                <Route path="/funcionarios" element={<Funcionarios/>}/>
                <Route path="/funcionarios/editar/:id" element={<EditarFuncionario/>}/>
                <Route path="/informacoes" element={<GeneralInfo/>}/>
                <Route path="/historico-sistema" element={<HistorySys/>}/>

                <Route path="/funcionarios/novo" element={<AdicionarFuncionario />} />
            </Routes>
        </>
    )
}