import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AdminPages from "./AdminPages/AdminPages"
import SideNavBar from "../../components/SideNavBar";
import Dashboard from "./Dashboard";
import LogoutButton from "../../components/LogoutButton";
import MeusDados from "./MeusDados";
import Clientes from "./Clientes";
export default function UserPages() { //Guarda páginas gerais de um usuário/funcionário
    const [admin, setAdmin] = useState(true); //Custom Hook temporário, para fins de conveniência, com o objetivo de informar se o usuário é admin ou não

    return (
        <>
            <LogoutButton/>
            <SideNavBar admin={admin}/>
            <Routes>
                <Route path="/" element={<MeusDados/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/clientes" element={<Clientes/>}/>
                {admin == true && 
                    <Route path="/administracao/*" element={<AdminPages/>}/> //Apenas poderão ser acessadas quando o usuário for admin
                }
            </Routes>
        </>
    )
}