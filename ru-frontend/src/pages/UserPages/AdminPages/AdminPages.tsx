import { Route, Routes } from "react-router-dom";
import Funcionarios from "./Funcionarios";

export default function AdminPages() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Funcionarios/>}/>
            </Routes>
        </>
    )
}