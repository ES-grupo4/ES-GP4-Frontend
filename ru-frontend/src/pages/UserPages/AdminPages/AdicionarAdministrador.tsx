import type { ReactElement, ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import UploadIcon from "../../../assets/IconAddFuncionario";
import routes from "../../../services/routes";
import validarCPF from "../../../utils/validarCpf";
import { readExcelFile, type RowData } from "../../../utils/lerPlanilha";

function AdicionarAdministrador(): ReactElement {
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleRegisterSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Administrador a ser registrado:", { cpf, nome, email, senha });
    if (cpf == "" || nome == "" || email == "" || senha == "") {
      alert("Preencha todos os campos!")
    } else if (!validarCPF(cpf)) {
      alert("Insira um CPF válido")
    } else {
      const response = await addAdmin({ cpf: cpf, nome: nome, email: email, senha: senha })
      if (response.status == 200) {
        alert(`Administrador ${nome} registrado com sucesso!`);
      } else {
        alert(`Ocorreu um erro ao criar o administrador`);
      }
    }
  };

  const handleFileChange = async (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const jsonData = await readExcelFile(file);
      await addAdminJson(jsonData);
    } catch (err) {
      console.error("Erro ao ler planilha:", err);
    }
  };

  const addAdminJson = async (jsonData: RowData[]) => {
    const errors: string[] = [];

    for (const admin of jsonData) {
      const msg = verifyAdmin(admin);

      if (msg === "OK") {
        const response = await addAdmin({
          cpf: admin["cpf"],
          nome: admin["nome"],
          email: admin["email"],
          senha: admin["senha"]
        });

        console.log(response);

        if (response.status !== 200) {
          console.log(response.response.data["detail"]);
          errors.push(`${admin["cpf"]}: ${response.response.data["detail"]}`);
        }
      } else {
        errors.push(`${admin["cpf"]}: ${msg}`);
      }
    } 

    console.log(errors);

    if (errors.length > 0) {
      alert("Alguns administradores não foram cadastrados:\n" + errors.join("\n"));
    } else {
      alert("Todos os administradores foram adicionados com sucesso!");
    }
  };

  const verifyAdmin = (adminData: Record<string, unknown>) => {
    if (adminData["cpf"] == undefined || adminData["nome"] == undefined || adminData["email"] == undefined || adminData["senha"] == undefined) {
      return "Campos obrigatórios faltando!";
    } else if (typeof adminData["cpf"] === "string" && !validarCPF(adminData["cpf"])) {
      return "CPF inválido";
    }
    return "OK";
  }

  const addAdmin = async (data: { cpf: string, nome: string, email: string, senha: string }): Promise<any> => {
    try {
      const response = await routes.createAdmin(data);
      return response;
    } catch (e) {
      return e;
    }
  }

  return (
    <div className="p-4 sm:ml-64 min-h-screen font-sans">
      <header className="group flex">
        <h1 className="font-semibold font-sans text-6xl text-sky-900">Adicionar Administrador</h1>
      </header>
      <div className="container md:p-8">
        <main className="max-w-2xl space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Importar planilha de administradores:
            </h2>
            <div>
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-gray-100 border border-gray-300 rounded-md p-3 flex items-center justify-between text-gray-500 hover:bg-gray-200 transition-colors"
              >
                <span>Inserir planilha (.xlsx, .csv)</span>
                <UploadIcon />
              </label>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                onChange={handleFileChange}
                accept=".xlsx, .xls, .csv"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              Registrar Administrador:
            </h2>
            <form onSubmit={handleRegisterSubmit} className="space-y-5">
              <div>
                <label
                  htmlFor="cpf"
                  className="block text-md font-medium text-gray-700 mb-1"
                >
                  CPF:
                </label>
                <input
                  type="text"
                  id="cpf"
                  value={cpf}
                  onChange={(e) => setCpf(e.target.value)}
                  className="w-full p-3 bg-gray-100 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="nome"
                  className="block text-md font-medium text-gray-700 mb-1"
                >
                  Nome:
                </label>
                <input
                  type="text"
                  id="nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  className="w-full p-3 bg-gray-100 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="block text-md font-medium text-gray-700 mb-1"
                >
                  Email:
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full p-3 bg-gray-100 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block text-md font-medium text-gray-700 mb-1"
                >
                  Senha:
                </label>
                <input
                  type="password"
                  id="password"
                  value={senha}
                  onChange={(e) => setSenha(e.target.value)}
                  className="w-full p-3 bg-gray-100 border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  required
                />
              </div>
              <div className="pt-2">
                <button
                  type="submit"
                  className="bg-[#28a745] text-white font-bold py-2 px-6 rounded-md hover:bg-[#218838] transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500"
                >
                  Registrar
                </button>
              </div>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}

export default AdicionarAdministrador;
