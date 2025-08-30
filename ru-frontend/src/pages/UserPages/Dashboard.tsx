import {
  FiUsers,
  FiDollarSign,
  FiActivity,
} from "react-icons/fi";
import MetricCard from "../../components/MetricCard";
import RecentActivity from "../../components/RecentActivityDashboard";
import UserActivityChart from "../../components/UserActivityChart";
import MealDistributionChart from "../../components/MealDistributionChart";
import { useEffect, useState } from "react";
import routes from "../../services/routes";

const activities = [
  { id: 1, title: "Novo usuário cadastrado", time: "2 min atrás" },
  { id: 2, title: "Atualização de cardápio", time: "1 hora atrás" },
  { id: 3, title: "Relatório mensal gerado", time: "3 horas atrás" },
];

export default function Dashboard() {

  const [semanal, setSemanal] = useState();
  const [jantar, setJantar] = useState();
  const [almoco, setAlmoco] = useState();
  const [historico, setHistorico] = useState();

  useEffect(() => {
    const fetch = async () => {
      console.log(localStorage.getItem('token'))
      
      const historico = await routes.getHistorico().then(res => res.data)

      const almoco = await routes.getCompras().then(res => res.data)


      console.log(almoco)

      console.log(historico)

      console.log()

    };

    fetch();
  }, []);

  return (
    <div className="p-4 sm:ml-64">
      <div className="group flex">
        <h1 className="font-semibold font-sans text-6xl text-sky-900">
          Dashboard
        </h1>
      </div>

      <div className="w-full grid grid-cols-2 gap-6 mb-5">
        <MetricCard
          title="Total de Usuários"
          value="1,234"
          icon={<FiUsers size={20} />}
          trend="+12% do mês passado"
        />
        <MetricCard
          title="Faturamento Mensal"
          value="R$ 24,780"
          icon={<FiDollarSign size={20} />}
          trend="+8% do mês passado"
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <UserActivityChart data={[120, 200, 150, 80, 70, 110, 130]} />
        <MealDistributionChart almoco={35} jantar={20} />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <RecentActivity activities={activities} />
        </div>

        {/* Quick Actions */}
        <div className="space-y-6">
          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FiActivity className="mr-2 text-blue-600" />
              Estatísticas Rápidas
            </h3>
            <div className="space-y-4">
              <div>
                <p className="text-sm text-gray-500">Média Diária</p>
                <p className="text-xl font-bold">245 refeições</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Taxa de Ocupação</p>
                <p className="text-xl font-bold">78%</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Próprio do Mês</p>
                <p className="text-xl font-bold">R$ 4,250</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
