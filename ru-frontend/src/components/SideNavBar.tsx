import { Link } from "react-router-dom";

export default function SideNavBar({ admin }: { admin: boolean }) {
    return (
        <div>
            <aside id="default-sidebar" className="fixed top-0 left-0 z-40 w-64 h-screen transition-transform -translate-x-full sm:translate-x-0" aria-label="Sidebar">
                <div className="h-full px-3 py-2 overflow-y-auto bg-white">
                    <ul className="space-y-2 font-medium">
                        <li>
                            <Link to="#" className="flex items-center hover:bg-gray-200 group h-15 rounded-4xl">
                                <svg className="rounded-full bg-sky-800 size-5 mx-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 21"></svg>
                                <span className="ms-3 text-black">Dashboard</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="flex items-center hover:bg-gray-200 group h-15 rounded-4xl">
                                <svg className="rounded-full bg-yellow-400 size-5 mx-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 21"></svg>
                                <span className="ms-3 text-black">Relatórios</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="flex items-center hover:bg-gray-200 group h-15 rounded-4xl">
                                <svg className="rounded-full bg-red-700 size-5 mx-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 21"></svg>
                                <span className="ms-3 text-black">Clientes</span>
                            </Link>
                        </li>
                        <li>
                            <Link to="#" className="flex items-center hover:bg-gray-200 group h-15 rounded-4xl">
                                <svg className="rounded-full bg-green-600 size-5 mx-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 21"></svg>
                                <span className="ms-3 text-black">Compras</span>
                            </Link>
                        </li>
                    </ul>
                    {admin == true &&
                        <div>
                            <div className="flex items-center">
                                <hr className="flex-grow border-t border-gray-300" />
                                <span className="px-3 text-xs text-gray-500">Administração</span>
                                <hr className="flex-grow border-t border-gray-300" />
                            </div>
                            <ul className="space-y-2 font-medium">
                                <li>
                                    <Link to="/user/admin/" className="flex items-center hover:bg-gray-200 group h-15 rounded-4xl">
                                        <svg className="rounded-full bg-purple-800 size-5 mx-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 21"></svg>
                                        <span className="ms-3 text-black">Funcionários</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/user/admin/historysys" className="flex items-center hover:bg-gray-200 group h-15 rounded-4xl">
                                        <svg className="rounded-full bg-pink-400 size-5 mx-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 21"></svg>
                                        <span className="ms-3 text-black">Histórico do Sistema</span>
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/user/admin/infogeral" className="flex items-center hover:bg-gray-200 group h-15 rounded-4xl">
                                        <svg className="rounded-full bg-cyan-400 size-5 mx-2" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 22 21"></svg>
                                        <span className="ms-3 text-black">Informações Gerais</span>
                                    </Link>
                                </li>
                            </ul>
                        </div>}
                </div>
            </aside>
        </div>)
}