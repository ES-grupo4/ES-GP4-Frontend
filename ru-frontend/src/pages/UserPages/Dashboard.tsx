import {
  FiUsers,
  FiCalendar,
  FiDollarSign,
  FiAlertCircle,
  FiActivity,
  FiPieChart,
} from "react-icons/fi";
import MetricCard from "../../components/MetricCard";
import RecentActivity from "../../components/RecentActivityDashboard";
import UserActivityChart from "../../components/UserActivityChart";
import MealDistributionChart from "../../components/MealDistributionChart";

const activities = [
  { id: 1, title: "Novo usuário cadastrado", time: "2 min atrás" },
  { id: 2, title: "Atualização de cardápio", time: "1 hora atrás" },
  { id: 3, title: "Relatório mensal gerado", time: "3 horas atrás" },
];

const userActivitiesOption = {
  tooltip: {
    trigger: "axis",
    axisPointer: {
      type: "shadow",
    },
  },
  grid: {
    left: "3%",
    right: "4%",
    bottom: "3%",
    containLabel: true,
  },
  xAxis: {
    type: "category",
    data: ["Seg", "Ter", "Qua", "Qui", "Sex", "Sáb", "Dom"],
    axisLine: {
      lineStyle: {
        color: "#E5E7EB",
      },
    },
    axisLabel: {
      color: "#6B7280",
    },
  },
  yAxis: {
    type: "value",
    axisLine: {
      show: false,
    },
    splitLine: {
      lineStyle: {
        color: "#F3F4F6",
      },
    },
    axisLabel: {
      color: "#6B7280",
    },
  },
  series: [
    {
      name: "Usuários",
      type: "line",
      smooth: true,
      data: [120, 200, 150, 80, 70, 110, 130],
      itemStyle: {
        color: "#3B82F6",
      },
      areaStyle: {
        color: {
          type: "linear",
          x: 0,
          y: 0,
          x2: 0,
          y2: 1,
          colorStops: [
            {
              offset: 0,
              color: "rgba(59, 130, 246, 0.2)",
            },
            {
              offset: 1,
              color: "rgba(59, 130, 246, 0.02)",
            },
          ],
        },
      },
    },
  ],
};

const MealDistributionChartOptions = {
  tooltip: {
    trigger: "item",
  },
  legend: {
    bottom: "5%",
    left: "center",
    textStyle: {
      color: "#6B7280",
    },
  },
  series: [
    {
      name: "Refeições",
      type: "pie",
      radius: ["40%", "70%"],
      avoidLabelOverlap: false,
      itemStyle: {
        borderRadius: 10,
        borderColor: "#fff",
        borderWidth: 2,
      },
      label: {
        show: false,
        position: "center",
      },
      emphasis: {
        label: {
          show: true,
          fontSize: "18",
          fontWeight: "bold",
        },
      },
      labelLine: {
        show: false,
      },
      data: [
        { value: 35, name: "Almoço", itemStyle: { color: "#3B82F6" } },
        { value: 30, name: "Jantar", itemStyle: { color: "#10B981" } },
        { value: 25, name: "Lanche", itemStyle: { color: "#F59E0B" } },
        { value: 10, name: "Café da Manhã", itemStyle: { color: "#8B5CF6" } },
      ],
    },
  ],
};

export default function Dashboard() {
  return (
    <div className="p-4 sm:ml-64">
      <div className="group flex">
        <h1 className="font-semibold font-sans text-6xl text-sky-900">
          Histórico do Sistema
        </h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <MetricCard
          title="Total de Usuários"
          value="1,234"
          icon={<FiUsers size={20} />}
          trend="+12% do mês passado"
        />
        <MetricCard
          title="Agendamentos Hoje"
          value="42"
          icon={<FiCalendar size={20} />}
          trend="+5% em relação a ontem"
        />
        <MetricCard
          title="Faturamento Mensal"
          value="R$ 24,780"
          icon={<FiDollarSign size={20} />}
          trend="+8% do mês passado"
        />
        <MetricCard
          title="Alertas"
          value="3"
          icon={<FiAlertCircle size={20} />}
        />
      </div>

      {/* Charts Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
        <UserActivityChart option={userActivitiesOption} />
        <MealDistributionChart option={MealDistributionChartOptions} />
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

          <div className="bg-white rounded-lg shadow p-6">
            <h3 className="text-lg font-semibold mb-4 flex items-center">
              <FiPieChart className="mr-2 text-purple-600" />
              Ações Rápidas
            </h3>
            <div className="space-y-3">
              <button className="w-full text-left px-4 py-3 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 transition-colors">
                Adicionar Novo Usuário
              </button>
              <button className="w-full text-left px-4 py-3 bg-green-50 text-green-600 rounded-lg hover:bg-green-100 transition-colors">
                Gerar Relatório
              </button>
              <button className="w-full text-left px-4 py-3 bg-purple-50 text-purple-600 rounded-lg hover:bg-purple-100 transition-colors">
                Gerenciar Cardápio
              </button>
              <button className="w-full text-left px-4 py-3 bg-amber-50 text-amber-600 rounded-lg hover:bg-amber-100 transition-colors">
                Visualizar Alertas
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
