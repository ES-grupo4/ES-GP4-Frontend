type MetricCardProps = {
  title: string;
  value: string | number;
  icon: React.ReactNode;
  trend?: string;
};

const MetricCard = ({ title, value, icon, trend }: MetricCardProps) => (
  <div className="bg-white rounded-lg shadow p-6 flex items-start">
    <div className="p-3 rounded-full bg-blue-100 text-blue-600 mr-4">
      {icon}
    </div>
    <div>
      <p className="text-sm font-medium text-gray-500">{title}</p>
      <p className="text-2xl font-bold text-gray-800">{value}</p>
      {trend && (
        <span className="text-xs text-green-500 flex items-center">
          {trend}
        </span>
      )}
    </div>
  </div>
);

export default MetricCard;
