import { useState } from "react";

export default function RemoveButton({ onClickFunction }: { onClickFunction: () => void }) {

    const [clicked, setClicked] = useState(false);

    const showConfirmacao = () => {
        setClicked(true);
    }

    const hideConfirmacao = () => {
        setClicked(false);
    }

    return (
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4">
            {clicked ?
                <div>
                    <button type="button" onClick={hideConfirmacao} className="cursor-pointer bg-blue-700 hover:bg-blue-800 focus:ring-4 rounded-lg text-m text-white font-bold  px-5 py-2.5 me-2 mb-2">Cancelar</button>
                    <button type="button" onClick={onClickFunction} className="cursor-pointer bg-red-700 hover:bg-red-800 focus:ring-4 rounded-lg text-m text-white font-bold  px-5 py-2.5 me-2 mb-2">Confirmar</button>
                </div>
                :
                <button type="button" onClick={showConfirmacao} className="cursor-pointer bg-red-700 hover:bg-red-800 focus:ring-4 rounded-lg text-m text-white font-bold  px-5 py-2.5 me-2 mb-2">Excluir Funcionário</button>
            }
        </div>)

}