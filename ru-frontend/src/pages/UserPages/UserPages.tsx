import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AdminPages from "./AdminPages/AdminPages"
import SideNavBar from "../../components/SideNavBar";
import Dashboard from "./Dashboard";
import LogoutButton from "../../components/LogoutButton";
import MeusDados from "./MeusDados";
import Clientes from "./Clientes";
import EditarCliente from "./EditarCliente";
import AdicionarCliente from "./AdicionarCliente";
import DetalhesCliente from "./DetalhesCliente";
export default function UserPages({setLogged}: {setLogged: (logged: boolean) => void}) { //Guarda páginas gerais de um usuário/funcionário

    const [admin, setAdmin] = useState(true); //Custom Hook temporário, para fins de conveniência, com o objetivo de informar se o usuário é admin ou não

    return (
        <>
            <LogoutButton setLogged={setLogged}/>
            <SideNavBar admin={admin}/>
            <Routes>
                <Route path="/" element={<MeusDados/>}/>
                <Route path="/dashboard" element={<Dashboard/>}/>
                <Route path="/clientes" element={<Clientes/>}/>
                <Route path="/clientes/editar/:id" element={<EditarCliente/>}/>
                <Route path="/clientes/adicionar" element={<AdicionarCliente/>}/>
                <Route path="/clientes/detalhes/:id" element={<DetalhesCliente/>}/>
                {admin == true && 
                    <Route path="/administracao/*" element={<AdminPages/>}/> //Apenas poderão ser acessadas quando o usuário for admin
                }
            </Routes>
        </>
    )
}