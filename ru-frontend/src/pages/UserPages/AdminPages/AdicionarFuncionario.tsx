import type { ReactElement, ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import UploadIcon from "../../../assets/IconAddFuncionario";

function AdicionarFuncionario(): ReactElement {
  const [cpf, setCpf] = useState("");
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");

  const handleRegisterSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log("Funcionário a ser registrado:", { cpf, nome, email });
    alert(`Funcionário ${nome} registrado com sucesso!`);
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files.length > 0) {
      const fileName = event.target.files[0].name;
      console.log("Planilha selecionada:", fileName);
      alert(`Planilha "${fileName}" importada!`);
    }
  };

  return (
    <div className="p-4 sm:ml-64 bg-[#F0F2FF] min-h-screen font-sans">
      <div className="container md:p-8">
        <header className="flex justify-between items-center mb-8">
          <h1 className="text-3xl md:text-4xl font-bold text-[#3A4D6A]">
            Adicionar Funcionário
          </h1>
        </header>

        <main className="max-w-2xl space-y-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-4">
              Importar planilha de funcionários:
            </h2>
            <div>
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-gray-100 border border-gray-300 rounded-md p-3 flex items-center justify-between text-gray-500 hover:bg-gray-200 transition-colors"
              >
                <span>Inserir planilha</span>
                <UploadIcon />
              </label>
              <input
                id="file-upload"
                name="file-upload"
                type="file"
                className="sr-only"
                onChange={handleFileChange}
                accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              />
            </div>
          </div>

          <div className="bg-white p-6 rounded-lg shadow-sm">
            <h2 className="text-lg font-semibold text-gray-800 mb-6">
              Registrar Funcionário:
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

export default AdicionarFuncionario;
