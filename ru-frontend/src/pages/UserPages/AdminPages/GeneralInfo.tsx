import { useEffect, useState } from "react";
import api from "../../../services/routes.ts";
import {
	converterParaInteiro,
	converterParaReal,
	normalizar,
} from "../../../utils/converterCentavos.ts";

export default function GeneralInfo() {
	const [apiInfo, setApiInfo] = useState({});

	const [currentInfo, setCurrentInfo] = useState({
		nome_empresa: "",
		preco_almoco: "",
		preco_meia_almoco: "",
		preco_jantar: "",
		preco_meia_jantar: "",
		inicio_almoco: "",
		fim_almoco: "",
		inicio_jantar: "",
		fim_jantar: "",
	});

	const [formData, setFormData] = useState({
		nome_empresa: "",
		preco_almoco: "",
		preco_meia_almoco: "",
		preco_jantar: "",
		preco_meia_jantar: "",
		inicio_almoco: "",
		fim_almoco: "",
		inicio_jantar: "",
		fim_jantar: "",
	});

	useEffect(() => {
		const fetchData = async () => {
			try {
				const info = await api.getInformacoesGerais().then((res) => res.data);
				console.log(info);
				setCurrentInfo({
					nome_empresa: info.nome_empresa ?? "",
					preco_almoco: converterParaReal(parseInt(info.preco_almoco, 10)),
					preco_meia_almoco: converterParaReal(
						parseInt(info.preco_meia_almoco ?? "", 10),
					),
					preco_jantar: converterParaReal(
						parseInt(info.preco_jantar ?? "", 10),
					),
					preco_meia_jantar: converterParaReal(
						parseInt(info.preco_meia_jantar ?? "", 10),
					),
					inicio_almoco: info.inicio_almoco ?? "",
					fim_almoco: info.fim_almoco ?? "",
					inicio_jantar: info.inicio_jantar ?? "",
					fim_jantar: info.fim_jantar ?? "",
				});
				setApiInfo(info);
			} catch (error) {
				console.error("Error fetching general info:", error);
			}
		};
		fetchData();
	}, []);

	const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		if (name.includes("preco")) {
			const regex = /^[\d,]+$/;
			if (regex.test(value)) {
				setFormData((prev) => ({
					...prev,
					[name]: value,
				}));
			}
		} else {
			setFormData((prev) => ({
				...prev,
				[name]: value,
			}));
		}
	};

	const handleTimeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { name, value } = e.target;
		setFormData((prev) => ({
			...prev,
			[name]: value,
		}));
	};

	const handleUpdate = async () => {
		try {
			// Format price values
			const formattedData = {
				...formData,
				preco_almoco: formData.preco_almoco
					? converterParaInteiro(formData.preco_almoco)
					: "",
				preco_meia_almoco: formData.preco_meia_almoco
					? converterParaInteiro(formData.preco_meia_almoco)
					: "",
				preco_jantar: formData.preco_jantar
					? converterParaInteiro(formData.preco_jantar)
					: "",
				preco_meia_jantar: formData.preco_meia_jantar
					? converterParaInteiro(formData.preco_meia_jantar)
					: "",
			};

			const newInfo = {
				...apiInfo,
				...formattedData,
			} as {
				nome_empresa: string;
				preco_almoco: string;
				preco_meia_almoco: string;
				preco_jantar: string;
				preco_meia_jantar: string;
				inicio_almoco: string;
				fim_almoco: string;
				inicio_jantar: string;
				fim_jantar: string;
			};
			let error = false;
			Object.values(newInfo).forEach((value) => {
				console.log(value);
				if (value === undefined || value === "") {
					error = true;
				}
			});
			if (error) {
				alert("Preencha todos os campos!");
			} else {
				const response = await api.setInformacoesGerais(newInfo);
				console.log("Update successful:", response);

				// Clear form fields after successful update
				setFormData({
					nome_empresa: "",
					preco_almoco: "",
					preco_meia_almoco: "",
					preco_jantar: "",
					preco_meia_jantar: "",
					inicio_almoco: "",
					fim_almoco: "",
					inicio_jantar: "",
					fim_jantar: "",
				});

				// Show success message or update UI as needed
				console.log("Information updated successfully");
				alert("Informações gerais atualizadas com sucesso!");
				setCurrentInfo((prev) => ({
					...prev,
					...formData,
					preco_almoco: normalizar(formData.preco_almoco),
					preco_meia_almoco: normalizar(formData.preco_meia_almoco),
					preco_jantar: normalizar(formData.preco_jantar),
					preco_meia_jantar: normalizar(formData.preco_meia_jantar),
				}));
			}
		} catch (error) {
			console.error("Error updating information:", error);
			alert("Ouve um erro ao atualizar as informações gerais.");
		}
	};

	return (
		<div className="p-4 sm:ml-64 flex flex-col min-h-screen">
			<div className="group flex">
				<h1 className="font-semibold font-sans text-6xl text-sky-900">
					Informações Gerais
				</h1>
			</div>

			<div className="flex-grow flex items-center justify-center">
				<div className="bg-white rounded-lg shadow-lg p-8 w-full max-w-6xl min-h-[500px] flex flex-col">
					<div className="flex justify-between items-center mb-6">
						<h2 className="text-2xl font-semibold text-gray-800">
							Visualizar e editar informações gerais:
						</h2>
						<div className="text-lg font-semibold text-gray-700">
							<span>Mês atual: </span>
							<span className="font-bold">Julho</span>
						</div>
					</div>

					<div className="grid grid-cols-1 md:grid-cols-2 border border-gray-300 rounded-lg flex-grow">
						<div className="border-r border-gray-300">
							<div className="bg-gray-200 p-3 rounded-tl-lg">
								<h3 className="text-lg font-bold text-gray-700">
									Informações atuais
								</h3>
							</div>
							<div className="p-4 space-y-4">
								<p className="text-gray-600">
									<span className="font-semibold">Empresa Responsável:</span>{" "}
									{currentInfo.nome_empresa || "Não definido"}
								</p>
								<p className="text-gray-600">
									<span className="font-semibold">Preço Almoço:</span>{" "}
									{currentInfo.preco_almoco || "Não definido"}
								</p>
								<p className="text-gray-600">
									<span className="font-semibold">Preço Meia Almoço:</span>{" "}
									{currentInfo.preco_meia_almoco || "Não definido"}
								</p>
								<p className="text-gray-600">
									<span className="font-semibold">Preço Jantar:</span>{" "}
									{currentInfo.preco_jantar || "Não definido"}
								</p>
								<p className="text-gray-600">
									<span className="font-semibold">Preço Meia Jantar:</span>{" "}
									{currentInfo.preco_meia_jantar || "Não definido"}
								</p>
								<p className="text-gray-600">
									<span className="font-semibold">Horário Almoço:</span>{" "}
									{currentInfo.inicio_almoco && currentInfo.fim_almoco
										? `${currentInfo.inicio_almoco} - ${currentInfo.fim_almoco}`
										: "Não definido"}
								</p>
								<p className="text-gray-600">
									<span className="font-semibold">Horário Jantar:</span>{" "}
									{currentInfo.inicio_jantar && currentInfo.fim_jantar
										? `${currentInfo.inicio_jantar} - ${currentInfo.fim_jantar}`
										: "Não definido"}
								</p>
							</div>
						</div>

						<div>
							<div className="bg-gray-200 p-3 rounded-tr-lg">
								<h3 className="text-lg font-bold text-gray-700">
									Informações novas
								</h3>
							</div>
							<div className="p-4 space-y-4">
								<div>
									<label
										htmlFor="nome_empresa"
										className="block text-sm font-medium text-gray-700 mb-1"
									>
										Nome da Empresa
									</label>
									<input
										type="text"
										id="nome_empresa"
										name="nome_empresa"
										className="w-full px-3 py-2 border border-gray-300 rounded-md"
										value={formData.nome_empresa}
										onChange={handleInputChange}
										placeholder="Digite o nome da empresa"
									/>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<label
											htmlFor="preco_almoco"
											className="block text-sm font-medium text-gray-700 mb-1"
										>
											Preço Almoço
										</label>
										<input
											type="text"
											id="preco_almoco"
											name="preco_almoco"
											className="w-full px-3 py-2 border border-gray-300 rounded-md"
											value={formData.preco_almoco}
											onChange={handleInputChange}
											placeholder="Ex: 11,00"
										/>
									</div>
									<div>
										<label
											htmlFor="preco_meia_almoco"
											className="block text-sm font-medium text-gray-700 mb-1"
										>
											Preço Meia Almoço
										</label>
										<input
											type="text"
											id="preco_meia_almoco"
											name="preco_meia_almoco"
											className="w-full px-3 py-2 border border-gray-300 rounded-md"
											value={formData.preco_meia_almoco}
											onChange={handleInputChange}
											placeholder="Ex: 5,50"
										/>
									</div>
									<div>
										<label
											htmlFor="preco_jantar"
											className="block text-sm font-medium text-gray-700 mb-1"
										>
											Preço Jantar
										</label>
										<input
											type="text"
											id="preco_jantar"
											name="preco_jantar"
											className="w-full px-3 py-2 border border-gray-300 rounded-md"
											value={formData.preco_jantar}
											onChange={handleInputChange}
											placeholder="Ex: 12,00"
										/>
									</div>
									<div>
										<label
											htmlFor="preco_meia_jantar"
											className="block text-sm font-medium text-gray-700 mb-1"
										>
											Preço Meia Jantar
										</label>
										<input
											type="text"
											id="preco_meia_jantar"
											name="preco_meia_jantar"
											className="w-full px-3 py-2 border border-gray-300 rounded-md"
											value={formData.preco_meia_jantar}
											onChange={handleInputChange}
											placeholder="Ex: 6,00"
										/>
									</div>
								</div>

								<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
									<div>
										<h4 className="font-medium text-gray-700 mb-2">
											Horário do Almoço
										</h4>
										<div className="grid grid-cols-2 gap-2">
											<div>
												<label
													htmlFor="inicio_almoco"
													className="block text-sm text-gray-600 mb-1"
												>
													Início
												</label>
												<input
													type="time"
													id="inicio_almoco"
													name="inicio_almoco"
													className="w-full px-3 py-2 border border-gray-300 rounded-md"
													value={formData.inicio_almoco}
													onChange={handleTimeChange}
												/>
											</div>
											<div>
												<label
													htmlFor="fim_almoco"
													className="block text-sm text-gray-600 mb-1"
												>
													Fim
												</label>
												<input
													type="time"
													id="fim_almoco"
													name="fim_almoco"
													className="w-full px-3 py-2 border border-gray-300 rounded-md"
													value={formData.fim_almoco}
													onChange={handleTimeChange}
												/>
											</div>
										</div>
									</div>
									<div>
										<h4 className="font-medium text-gray-700 mb-2">
											Horário do Jantar
										</h4>
										<div className="grid grid-cols-2 gap-2">
											<div>
												<label
													htmlFor="inicio_jantar"
													className="block text-sm text-gray-600 mb-1"
												>
													Início
												</label>
												<input
													type="time"
													id="inicio_jantar"
													name="inicio_jantar"
													className="w-full px-3 py-2 border border-gray-300 rounded-md"
													value={formData.inicio_jantar}
													onChange={handleTimeChange}
												/>
											</div>
											<div>
												<label
													htmlFor="fim_jantar"
													className="block text-sm text-gray-600 mb-1"
												>
													Fim
												</label>
												<input
													type="time"
													id="fim_jantar"
													name="fim_jantar"
													className="w-full px-3 py-2 border border-gray-300 rounded-md"
													value={formData.fim_jantar}
													onChange={handleTimeChange}
												/>
											</div>
										</div>
									</div>
								</div>

								<div className="pt-4 flex justify-end">
									<button
										className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-6 rounded-md transition-colors"
										onClick={handleUpdate}
									>
										Atualizar Informações
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}
