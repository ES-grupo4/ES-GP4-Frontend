import { useEffect, useState } from "react";
import EditIcon from "./EditIcon";
import { Link } from "react-router-dom";

export default function EntityTable({ tableData, columns, url }: { tableData: any, columns: string[], url: string }) {
    const [table, setTable] = useState({ tableHtml: <div></div>, tableData: tableData, showTable: false })
    const [search, setSearch] = useState("")
    useEffect(() => { makeTable("") }, [])

    const onChangeSearch = (e: React.ChangeEvent<any>) => { // Define valor de busca antes de clicar para buscar
        setSearch(e.target.value)
    }

    const handleSearch = () => { // Define o valor do filtro de busca
        makeTable(search)
    }

    const makeTable = (filter: string) => { // Contrói a tabela com base nos dados recebidos
        var thList: React.JSX.Element[] = []
        columns.forEach(col => {
            thList.push(
                <th scope="col" className="px-6 py-4" key={col}>
                    {col}
                </th>)
        });
        var head = <thead className="text-xs text-gray-700 uppercase bg-gray-300">
            <tr>
                {thList}
                <th scope="col" className="px-6 py-4">
                    Ações
                </th>
            </tr>
        </thead>
        var bodyTemp: React.JSX.Element[] = []
        for (var i = 0; i < table["tableData"].length; i++) {
            if (filterEntity(table["tableData"][i], filter) == true) { // Se o funcionário passa pelo filtro, é adicionado à tabela
                var tdList: React.JSX.Element[] = []
                columns.forEach(col => {
                    tdList.push(
                        <td className="px-6 py-4" key={`${i}-${col}-td`}>
                            {table["tableData"][i][col]}
                        </td>)
                });
                bodyTemp.push(
                    <tr className="bg-white divide-gray-200 divide-x-3" key={i}>
                        {tdList}
                        <td className="px-6 py-4">
                            <Link to={`${url}${table["tableData"][i]["id"]}`} className="cursor-pointer hover:bg-gray-200 rounded-full">
                                <EditIcon />
                            </Link>
                        </td>
                    </tr>)
            }
        }
        var body = <tbody className="divide-gray-200 divide-y-3 font-semibold text-gray-900">{bodyTemp}</tbody>
        var tableHtml = <table className="w-full text-sm text-left text-gray-500">{head}{<tbody><tr className="h-2" /></tbody>}{body}</table>
        setTable({ tableHtml: tableHtml, tableData: table["tableData"], showTable: true })
    }

    const filterEntity = (entidade: any, filter: string) => { // Decide se o funcionário passa pelo filtro
        if (filter != "") {
            for (var i = 0; i < columns.length; i++) {
                if (entidade[columns[i]].toString().toUpperCase().includes(filter.toUpperCase())) {
                    return true
                }
            }
            return false
        }
        return true
    }

    return (
        <div>
            <div>
                <form className="flex items-center w-2/3 mx-auto">
                    <label htmlFor="simple-search" className="sr-only">Search</label>
                    <div className="relative w-full">
                        <input type="text" onChange={onChangeSearch} id="simple-search" className="h-13 bg-white border border-gray-300 text-gray-900 text-m rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Pesquisar funcionário..." required />
                    </div>
                    <button type="button" onClick={handleSearch} className="p-4 ms-2 text-white bg-blue-700 rounded-full border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 cursor-pointer">
                        <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                        <span className="sr-only">Buscar</span>
                    </button>
                </form>
                <br />
                <div className="relative overflow-x-auto flex items-center w-2/3 mx-auto">
                    {table["showTable"] && table["tableHtml"]}
                </div>
            </div>
        </div>
    )

}