import { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login({
  setLogged,
}: {
  logged: boolean;
  setLogged: (logged: boolean) => void;
}) {
  const navigate = useNavigate();
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (login === "admin" && password === "admin") {
      setLogged(true);
      navigate("/user/");
    } else {
      alert("Usuário ou senha inválidos");
    }
  };

  const onChangelogin = (event: React.ChangeEvent<HTMLInputElement>) => {
    setLogin(event.target.value);
  };

  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };

  return (
    <>
      <h1 className="text-6xl font-bold text-center m-20 text-indigo-900">SysAdminRU</h1>

      <div className="flex items-center justify-center bg-gray-100">
        <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-xl shadow-md">
          <h2 className="text-2xl font-bold text-center text-gray-900">
            Login
          </h2>
          <div className="space-y-6 p-4 border border-gray-300 rounded-xl border-4">
            <div>
              <label
                htmlFor="login"
                className="text-sm font-medium text-gray-700"
              >
                Login:
              </label>
              <input
                id="login"
                name="login"
                type="text"
                required
                className="w-full px-3 py-2 mt-1 bg-gray-200 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={login}
                onChange={onChangelogin}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="text-sm font-medium text-gray-700"
              >
                Senha:
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="w-full px-3 py-2 mt-1 bg-gray-200 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
                value={password}
                onChange={onChangePassword}
              />
            </div>
            <div className="flex items-center justify-between">
              <button
                type="submit"
                className="w-full m-1 px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                onClick={handleSubmit}
              >
                Entrar
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Login;
