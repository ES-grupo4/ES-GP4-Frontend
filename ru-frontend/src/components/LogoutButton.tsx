import { useNavigate } from "react-router-dom";
import { UrlRouter } from "../constants/UrlRouter";

export default function LogoutButton({setLogged}: {setLogged: (logged: boolean) => void}){

    const navigate = useNavigate();

    const logoutAction = () => {
        localStorage.removeItem("token");
        setLogged(false);
        navigate(UrlRouter.login);
    }

    return(
    <button className="absolute top-0 right-0 m-5 text-red-800 hover:text-red-950 font-semibold text-2xl cursor-pointer" onClick={logoutAction}>Logout</button>)
}