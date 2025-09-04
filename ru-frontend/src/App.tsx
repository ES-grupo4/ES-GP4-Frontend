import "./App.css";
import { useEffect, useState } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { UrlRouter } from "./constants/UrlRouter";
import Login from "./pages/Login";
import UserPages from "./pages/UserPages/UserPages";
import api from "./services/api";

function App() {
	const [logged, setLogged] = useState(false);
	const [admin, setAdmin] = useState(true); //useState(false)

	useEffect(() => {
		const token = localStorage.getItem("token");
		if (token) {
			api.defaults.headers.common.Authorization = `Bearer ${token}`;
			setLogged(true);
			setAdmin(localStorage.getItem("tipo") === "admin");
		} else {
			setLogged(false);
		}
	}, []);

	return (
		<BrowserRouter>
			<Routes>
				<Route
					path={UrlRouter.login}
					element={
						!logged ? <Login setLogged={setLogged} /> : <Navigate to="/user" />
					}
				/>
				<Route
					path="/user/*"
					element={
						logged ? (
							<UserPages setLogged={setLogged} admin={admin} />
						) : (
							<Navigate to={UrlRouter.login} />
						)
					}
				/>
			</Routes>
		</BrowserRouter>
	);
}

export default App;
