import type { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import routes from "../../services/routes";

interface UserData {
	nome: string;
	cpf: string;
	email: string;
	tipo: string;
}

interface PaginatedUserResponse {
	items: UserData[];
	page: number;
	page_size: number;
	total_pages: number;
	total_in_page: number;
}

export default function MeusDados() {
	const [userData, setUserData] = useState<UserData | null>(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchUserData = async () => {
			try {
				const cpf = localStorage.getItem("cpf");
				const userType = localStorage.getItem("tipo");

				if (!cpf || !userType) {
					throw new Error("Usuário não autenticado.");
				}

				let response: AxiosResponse<PaginatedUserResponse>;

				if (userType === "admin") {
					response = await routes.getAdministradorByCpf(cpf);
				} else {
					response = await routes.getFuncionarioByCpf(cpf);
				}

				if (response.data?.items?.[0]) {
					setUserData(response.data.items[0]);
				} else {
					throw new Error("Usuário não encontrado.");
				}
			} catch (err) {
				console.error("Erro ao buscar dados do usuário:", err);
				setError("Não foi possível carregar os dados do usuário.");
			} finally {
				setLoading(false);
			}
		};

		fetchUserData();
	}, []);

	if (loading) {
		return <div className="p-4 sm:ml-64">Carregando dados...</div>;
	}

	if (error) {
		return <div className="p-4 sm:ml-64 text-red-500">{error}</div>;
	}

	return (
		<div className="p-4 sm:ml-64">
			<div className="group flex">
				<h1 className="font-semibold font-sans text-6xl text-sky-900">
					Meus Dados
				</h1>
			</div>

			<div className="bg-white mx-auto my-25 p-8 w-5/10 rounded-lg">
				<div className="space-y-4 text-gray-700">
					<p className="text-lg">
						<span className="font-bold">NOME:</span> {userData?.nome}
					</p>
					<p className="text-lg">
						<span className="font-bold">CPF:</span> {userData?.cpf}
					</p>
					<p className="text-lg">
						<span className="font-bold">E-MAIL:</span> {userData?.email}
					</p>
					<p className="text-lg uppercase">
						<span className="font-bold">CARGO:</span> {userData?.tipo}
					</p>
				</div>
			</div>
		</div>
	);
}
