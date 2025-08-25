const dadosUsuario = {
  nome: "Kim Kitsuragi",
  cpf: "111111111-11",
  email: "kim.kitsuragi@gmail.com",
  categoria: "Funcionário"
};

export default function MeusDados() {
    return (
        <div className="p-4 sm:ml-64 flex flex-col min-h-screen relative">
            
            <div className="group flex justify-between items-center mb-8">
                <h1 className="font-semibold font-sans text-6xl text-sky-900">Meus Dados</h1>
            </div>

            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-white p-8 shadow-2xl rounded-lg w-full max-w-lg">
                
                <div className="space-y-4 text-gray-700">
                    <p className="text-lg"><span className="font-bold">NOME:</span> {dadosUsuario.nome}</p>
                    <p className="text-lg"><span className="font-bold">CPF:</span> {dadosUsuario.cpf}</p>
                    <p className="text-lg"><span className="font-bold">E-MAIL:</span> {dadosUsuario.email}</p>
                    <p className="text-lg"><span className="font-bold">CATEGORIA:</span> {dadosUsuario.categoria}</p>
                </div>
            </div>
        </div>
    );
}