import { Route, Routes } from "react-router-dom";
import Funcionarios from "./Funcionarios";
import EditarFuncionario from "./EditarFuncionario";

export default function AdminPages() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Funcionarios/>}/>
                <Route path="/editarfuncionario/:cpf" element={<EditarFuncionario/>}/>
            </Routes>
        </>
    )
}