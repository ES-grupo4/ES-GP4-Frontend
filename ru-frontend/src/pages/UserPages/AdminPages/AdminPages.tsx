import { Route, Routes } from "react-router-dom";
import Funcionarios from "./Funcionarios";
import EditarFuncionario from "./EditarFuncionario";
import GeneralInfo from "./GeneralInfo";
import HistorySys from "./HistorySys";

export default function AdminPages() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Funcionarios/>}/>
                <Route path="/editarfuncionario/:cpf" element={<EditarFuncionario/>}/>
                <Route path="/infogeral" element={<GeneralInfo/>}/>
                <Route path="/historysys" element={<HistorySys/>}/>

            </Routes>
        </>
    )
}