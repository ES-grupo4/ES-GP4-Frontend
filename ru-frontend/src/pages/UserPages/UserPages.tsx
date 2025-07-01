import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import AdminPages from "./AdminPages/AdminPages"
import SideNavBar from "../../components/SideNavBar";
import Dashboard from "./Dashboard";
export default function UserPages() { //Guarda páginas gerais de um usuário/funcionário
    const [admin, setAdmin] = useState(true); //Custom Hook temporário, para fins de conveniência, com o objetivo de informar se o usuário é admin ou não

    return (
        <>
            <SideNavBar admin={admin}/>
            <Routes>
                <Route path="/" element={<Dashboard/>}/>
                {admin == true && 
                    <Route path="/admin/*" element={<AdminPages/>}/> //Apenas poderão ser acessadas quando o usuário for admin
                }
            </Routes>
        </>
    )
}