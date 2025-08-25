import { Routes, Route, Navigate } from "react-router-dom";
import AdminPages from "./AdminPages/AdminPages"
import SideNavBar from "../../components/SideNavBar";
import Dashboard from "./Dashboard";
import LogoutButton from "../../components/LogoutButton";
import MeusDados from "./MeusDados";
import Clientes from "./Clientes";
import EditarCliente from "./EditarCliente";
import AdicionarCliente from "./AdicionarCliente";
import DetalhesCliente from "./DetalhesCliente";
import { UrlRouter } from "../../constants/UrlRouter";
export default function UserPages({setLogged,admin}: {setLogged: (logged: boolean) => void, admin:boolean}) { //Guarda páginas gerais de um usuário/funcionário

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
                <Route path="/administracao/*"element={admin ? <AdminPages setLogged={setLogged} /> : <Navigate to={UrlRouter.usuario.default} />}/>
            </Routes>
        </>
    )
}