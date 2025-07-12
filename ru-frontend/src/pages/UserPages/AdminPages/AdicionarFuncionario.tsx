import type { ReactElement } from "react";
import Box from "../../../components/Box";

function AdicionarFuncionario(): ReactElement {
  return (
    <div className="p-4 sm:ml-64">
      <Box>
        <h3>Importar planilha de usuarios</h3>
        <input type="file" className="w-full"></input>
      </Box>
    </div>
  );
}

export default AdicionarFuncionario;
