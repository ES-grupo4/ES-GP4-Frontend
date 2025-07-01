import { useNavigate } from "react-router-dom";

export default function LogoutButton(){

    const navigate = useNavigate();

    const logoutAction = () => {
        navigate("/");
    }

    return(
    <button className="absolute top-0 right-0 m-5 text-red-800 hover:text-red-950 font-semibold text-2xl cursor-pointer" onClick={logoutAction}>Logout</button>)
}