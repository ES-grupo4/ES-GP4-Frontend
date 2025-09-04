import { FiUsers, FiActivity } from "react-icons/fi";
import MetricCard from "../../components/MetricCard";
import RecentActivity from "../../components/RecentActivityDashboard";
import UserActivityChart from "../../components/UserActivityChart";
import MealDistributionChart from "../../components/MealDistributionChart";
import { useEffect, useState } from "react";
import routes from "../../services/routes";

interface WeekRange {
  ini: string;
  fim: string;
}

const formatDate = (date: Date): string => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

const getWeekRange = (date: Date = new Date()): WeekRange => {
  const currentDate = new Date(date);
  currentDate.setDate(currentDate.getDate() + 1); // Add one day to the provided date
  
  const firstDay = new Date(currentDate);
  // If the provided date is not Monday, get the previous Monday
  if (firstDay.getDay() !== 1) {
    const day = firstDay.getDay();
    const diff = firstDay.getDate() - day + (day === 0 ? -6 : 1); // Adjust to get Monday
    firstDay.setDate(diff);
  }

  // Set time to start of day
  firstDay.setHours(0, 0, 0, 0);

  // Calculate last day (Friday of the same week)
  const lastDay = new Date(firstDay);
  lastDay.setDate(firstDay.getDate() + 6);
  lastDay.setHours(23, 59, 59, 999);

  return { 
    ini: formatDate(firstDay), 
    fim: formatDate(lastDay) 
  };
};

export default function Dashboard() {
  const [semanal, setSemanal] = useState([]);
  const [jantar, setJantar] = useState(0);
  const [almoco, setAlmoco] = useState(0);
  const [clientes, setClientes] = useState(0);
  const [historico, setHistorico] = useState<any>([]);
  const [refeicao, setRefeicao] = useState(0)

  useEffect(() => {
    const fetch = async () => {
      let erro = false;

      const historicos = await routes.getHistorico().then((res) => res.data);

      const week = getWeekRange();

      const almocos = await routes
        .getAlmocos(week)
        .then((res) => res.data)
        .catch(() => (erro = true));

      const jantas = await routes
        .getJantas(week)
        .then((res) => res.data)
        .catch(() => (erro = true));

      const clientes = await routes
        .getAllClientes(1, "", "")
        .then((res) => res.data);

      const semanal = await routes.getCompras(week).then((res) => res.data)

      const refeicaos = await routes.getInformacoesGerais().then(res => res.data)

      if (erro) return;

      setRefeicao(refeicaos.preco_almoco)
      setHistorico(historicos);
      setClientes(clientes.items.length);
      setJantar(jantas.items.length);
      setAlmoco(almocos.items.length);
      setSemanal(semanal.items)
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
      <br/>
      <div className="w-full grid grid-cols-2 gap-6 mb-5">
        <MetricCard
          title="Total de Clientes"
          value={clientes}
          icon={<FiUsers size={20} />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <UserActivityChart data={semanal} />
        <MealDistributionChart almoco={almoco} jantar={jantar} />
      </div>

      {/* Main Content */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="lg:col-span-2">
          <RecentActivity activities={historico} />
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
                <p className="text-xl font-bold">{semanal.length / 5}</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Preço Refeição</p>
                <p className="text-xl font-bold">R$ {(refeicao / 100).toFixed(2).replace(".", ",")}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
