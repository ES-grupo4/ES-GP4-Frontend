import { useEffect, useState } from "react";
import EditIcon from "./EditIcon";
import { Link } from "react-router-dom";
import ChartIcon from "./ChartIcon";

export default function EntityTable({ tableData, columns, url, hasChart, chartUrl, page, total_pages, prev, next, setFilter, categoria, setCategoria }: Readonly<{
    tableData: any, columns: string[], url: string,
    hasChart: boolean, chartUrl: string, page: number, total_pages: number, prev: () => void, next: () => void, setFilter: (str: string) => void,
    categoria?: string, setCategoria?: (str: string) => void

}>) {
    const [table, setTable] = useState({ tableHtml: <div></div>, tableData: tableData, showTable: false })
    const [search, setSearch] = useState("")
    useEffect(() => {
        makeTable();
        console.log(tableData);
    }, [tableData])

    const onChangeSearch = (e: React.ChangeEvent<any>) => { // Define valor de busca antes de clicar para buscar
        e.preventDefault();
        setSearch(e.target.value)
    }

    const handleSearch = (e: React.ChangeEvent<any>) => { // Define o valor do filtro de busca
        e.preventDefault();
        setFilter(search)
    }

    const onChangeCategoria = (e: React.ChangeEvent<any>) => {
        if (categoria !== undefined && setCategoria !== undefined) {
            if (categoria === e.target.value) {
                setCategoria("");
            } else {
                setCategoria(e.target.value);
            }
        }
    }

    const makeTable = () => { // Contrói a tabela com base nos dados recebidos
        let thList: React.JSX.Element[] = []
        columns.forEach(col => {
            thList.push(
                <th scope="col" className="px-6 py-4" key={col}>
                    {col}
                </th>)
        });
        let head = <thead className="text-xs text-gray-700 uppercase bg-gray-300">
            <tr>
                {thList}
                <th scope="col" className="px-6 py-4">
                    Ações
                </th>
            </tr>
        </thead>
        let bodyTemp: React.JSX.Element[] = []
        for (let i = 0; i < tableData.length; i++) {
            let tdList: React.JSX.Element[] = []
            columns.forEach(col => {
                let cellContent = tableData[i][col];

                if (typeof cellContent === "boolean") {
                    cellContent = cellContent ? "Sim" : "Não";
                }

                tdList.push(
                    <td className="px-6 py-4" key={`${i}-${col}-td`}>
                        {cellContent}
                    </td>
                );
            });
            bodyTemp.push(
                <tr className="bg-white divide-gray-200 divide-x-3" key={i}>
                    {tdList}
                    <td className="flex justify-between items-center px-6 py-4">
                        {hasChart &&
                            <Link to={`${chartUrl}${tableData[i]["id"]}`} className="cursor-pointer hover:bg-gray-200 rounded-full">
                                <ChartIcon />
                            </Link>}
                        <Link to={`${url}${tableData[i]["id"]}`} className="cursor-pointer hover:bg-gray-200 rounded-full">
                            <EditIcon />
                        </Link>
                    </td>
                </tr>)
        }
        let body = <tbody className="divide-gray-200 divide-y-3 font-semibold text-gray-900">{bodyTemp}</tbody>
        let tableHtml = <table className="w-full text-sm text-left text-gray-500">{head}{<tbody><tr className="h-2" /></tbody>}{body}</table>
        setTable({ tableHtml: tableHtml, tableData: tableData, showTable: true })
    }

    return (
        <div>
            <div>
                <form className="flex items-center w-4/5 mx-auto">
                    <label htmlFor="simple-search" className="sr-only">Search</label>
                    <div className="relative w-full">
                        <input type="text" onChange={onChangeSearch} id="simple-search" className="h-13 bg-white border border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Pesquisar..." required />
                    </div>
                    <button type="button" onClick={handleSearch} className="p-4 ms-2 text-white bg-blue-700 rounded-full border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span className="sr-only">Buscar</span>
                    </button>
                </form>
                {categoria !== undefined && setCategoria !== undefined ?
                    <div className="flex justify-center gap-4">
                        <button
                            value={"aluno"}
                            onClick={onChangeCategoria}
                            className={`cursor-pointer px-6 h-10 my-2 rounded-full flex items-center justify-center text-sm font-semibold shadow-md transition-colors
                                    ${categoria === "aluno"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-800 hover:bg-gray-300"
                                }`}
                        >
                            Aluno
                        </button>
                        <button
                            value={"professor"}
                            onClick={onChangeCategoria}
                            className={`cursor-pointer px-6 h-10 my-2 rounded-full flex items-center justify-center text-sm font-semibold shadow-md transition-colors
                                    ${categoria === "professor"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-800 hover:bg-gray-300"
                                }`}
                        >
                            Professor
                        </button>
                        <button
                            value={"tecnico"}
                            onClick={onChangeCategoria}
                            className={`cursor-pointer px-6 h-10 my-2 rounded-full flex items-center justify-center text-sm font-semibold shadow-md transition-colors
                                    ${categoria === "tecnico"
                                    ? "bg-blue-600 text-white"
                                    : "bg-gray-100 text-gray-800 hover:bg-gray-300"
                                }`}
                        >
                            Técnico
                        </button>
                    </div> :
                    <br />}
                <div className="relative overflow-x-auto flex items-center w-4/5 mx-auto">
                    {table["showTable"] && table["tableHtml"]}
                </div>
            </div>
            <div className="flex flex-col items-center mt-5">
                <span className="text-sm text-gray-700">
                    Mostrando <span className="font-semibold text-gray-900">{page}</span> de <span className="font-semibold text-gray-900">{total_pages}</span> Páginas
                </span>
                <div className="inline-flex mt-2 xs:mt-0">
                    <button className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-sky-600 rounded-s disabled:bg-gray-400 hover:bg-gray-700 cursor-pointer disabled:cursor-not-allowed"
                        onClick={prev}
                        disabled={page == 1}>
                        Anterior
                    </button>
                    <button className="flex items-center justify-center px-4 h-10 text-base font-medium text-white bg-sky-600 disabled:bg-gray-400 border-0 border-s border-gray-700 rounded-e hover:bg-gray-700 cursor-pointer disabled:cursor-not-allowed"
                        onClick={next}
                        disabled={page == total_pages}>
                        Próxima
                    </button>
                </div>
            </div>
        </div>
    )

}