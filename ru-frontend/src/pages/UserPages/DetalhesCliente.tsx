import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import MonthYearDropdown from "../../components/MonthDropdown";
import SingleMonthCalendar from "../../components/SingleMonthCalendar";
import routes from "../../services/routes";

function formatDateLocal(date: Date): string {
	const year = date.getFullYear();
	const month = String(date.getMonth() + 1).padStart(2, "0");
	const day = String(date.getDate()).padStart(2, "0");
	return `${year}-${month}-${day}`;
}

export default function DetalhesCliente() {
	const [year, setYear] = useState<number>(new Date().getFullYear());
	const [month, setMonth] = useState<number>(new Date().getMonth());

	const handleChange = (newYear: number, newMonth: number) => {
		setYear(newYear);
		setMonth(newMonth - 1);
	};

	const [highlights, setHighlights] = useState<Record<string, string>>({});

	const { id } = useParams<{ id: string }>();
	const [found, setFound] = useState(false);
	const [loading, setLoading] = useState(true);
	const [clienteData, setClienteData] = useState({
		cpf: "",
		nome: "",
		matricula: "",
		tipo: "",
		graduando: false,
		pos_graduando: false,
		bolsista: false,
		tipo_graduacao: "",
	});

	useEffect(() => {
		const getClienteData = async () => {
			if (!id) {
				setLoading(false);
				setFound(false);
				return;
			}
			try {
				const response = await routes.getClienteById(id);
				const data = response.data;

				if (data.graduando && data.pos_graduando) {
					data.tipo_graduacao = "Graduação e Pós";
				} else if (data.graduando) {
					data.tipo_graduacao = "Graduação";
				} else if (data.pos_graduando) {
					data.tipo_graduacao = "Pós Graduação";
				} else {
					data.tipo_graduacao = "Nenhuma";
				}

				setClienteData(data);
				setFound(true);
			} catch (error) {
				console.error("Failed to fetch client data:", error);
				setFound(false);
			} finally {
				setLoading(false);
			}
		};

		getClienteData();
	}, [id]);

	useEffect(() => {
		let isActive = true;

		const getCompras = async () => {
			if (!id) return;

			try {
				const response = await routes.getComprasByCliente(id, year, month + 1);
				const compras = response.data;
				const fimAlmoco = (await routes.getInformacoesGerais()).data.fim_almoco;
				const [stringHoras, stringMinutos, stringSegundos] =
					fimAlmoco.split(":");
				if (isActive) {
					const dailyPurchases: Record<
						string,
						{ manha: boolean; noite: boolean }
					> = {};
					compras.forEach((compra: { horario: string }) => {
						const date = new Date(compra.horario);
						const day = formatDateLocal(date);
						const dataFimAlmoco = new Date(
							date.getFullYear(),
							date.getMonth(),
							date.getDate(),
							parseInt(stringHoras, 10),
							parseInt(stringMinutos, 10),
							parseInt(stringSegundos, 10),
						);

						if (!dailyPurchases[day]) {
							dailyPurchases[day] = { manha: false, noite: false };
						}
						if (date < dataFimAlmoco) {
							dailyPurchases[day].manha = true;
						} else {
							dailyPurchases[day].noite = true;
						}
					});

					const newHighlights: Record<string, string> = {};
					for (const day in dailyPurchases) {
						const { manha, noite } = dailyPurchases[day];
						if (manha && noite) {
							newHighlights[day] = "green";
						} else if (manha) {
							newHighlights[day] = "yellow";
						} else if (noite) {
							newHighlights[day] = "blue";
						}
					}
					setHighlights(newHighlights);
					console.log("New highlights generated:", newHighlights);
				}
			} catch (error) {
				console.error("Failed to fetch purchase data:", error);
				alert(`Ocorreu um eror ao buscar os detalhes do cliente:${error}`);
			}
		};

		getCompras();

		return () => {
			isActive = false;
		};
	}, [id, year, month]);

	if (loading) {
		return (
			<div className="p-4 sm:ml-64 flex justify-center items-center h-screen">
				<h1 className="text-2xl font-semibold">Carregando...</h1>
			</div>
		);
	}

	console.log("Highlights passed to calendar:", highlights);

	return (
		<div className="p-4 sm:ml-64 flex flex-col min-h-screen">
			<div className="group flex">
				<h1 className="font-semibold font-sans text-6xl text-sky-900">
					Detalhes do Cliente
				</h1>
			</div>
			{found ? (
				<div className="flex-grow flex items-center justify-center">
					<div className="bg-white mx-auto my-25 p-5 w-7/10 h-100 rounded-lg">
						<div className="flex justify-between items-center mb-6">
							<h2 className="text-2xl font-semibold text-gray-800">
								Visualizar dados do Cliente:
							</h2>
							<div className="flex items-center gap-4">
								<div className="relative">
									<MonthYearDropdown
										selectedYear={year}
										selectedMonth={month + 1}
										onChange={handleChange}
										startYear={2000}
									/>
									<div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
										<svg
											className="fill-current h-4 w-4"
											xmlns="http://www.w3.org/2000/svg"
											viewBox="0 0 20 20"
										>
											<path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" />
										</svg>
									</div>
								</div>
							</div>
						</div>
						<hr className="my-1 h-0.5 border-t-0 bg-neutral-100" />
						<div className="flex justify-between items-center mb-6 gap-5">
							<div className="text-2xl grid grid-cols-1">
								<h1>
									<span className="font-bold">Nome: </span>
									{clienteData.nome}
								</h1>
								<h1>
									<span className="font-bold">CPF: </span>
									{clienteData.cpf}
								</h1>
								<h1>
									<span className="font-bold">Matrícula: </span>
									{clienteData.matricula}
								</h1>
								<h1>
									<span className="font-bold">Categoria: </span>
									{clienteData.tipo.charAt(0).toUpperCase() +
										clienteData.tipo.slice(1)}
								</h1>
								<h1>
									<span className="font-bold">Vínculo: </span>
									{clienteData.tipo_graduacao}
								</h1>
								<h1>
									<span className="font-bold">Bolsista: </span>
									{clienteData.bolsista ? "SIM" : "NÃO"}
								</h1>
							</div>

							<div className="w-100">
								<SingleMonthCalendar
									year={year}
									month={month + 1}
									highlights={highlights}
								/>
							</div>

							<div className="flex flex-col gap-2">
								<div key={1} className="flex items-center gap-2">
									<span className="w-4 h-4 rounded-full bg-yellow-500"></span>
									<span className="font-bold text-black">Refeição Manhã</span>
								</div>
								<div key={2} className="flex items-center gap-2">
									<span className="w-4 h-4 rounded-full bg-blue-700"></span>
									<span className="font-bold text-black">Refeição Noite</span>
								</div>
								<div key={3} className="flex items-center gap-2">
									<span className="w-4 h-4 rounded-full bg-green-600"></span>
									<span className="font-bold text-black">Ambas Refeições</span>
								</div>
							</div>
						</div>
					</div>
				</div>
			) : (
				<span className="text-2xl m-auto text-red-500">
					Não foi possível encontrar cliente com ID {id}
				</span>
			)}
		</div>
	);
}
