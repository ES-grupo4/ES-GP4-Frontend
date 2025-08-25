import ChartCard from "./ChartCard";

const RecentActivity = ({ activities }: { activities: any[] }) => {
  return (
    <ChartCard title="Atividades Recentes">
      <div className="space-y-4">
        {activities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-start pb-3 border-b border-gray-100 last:border-0"
          >
            <div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
            <div>
              <p className="text-sm font-medium">{activity.title}</p>
              <p className="text-xs text-gray-500">{activity.time}</p>
            </div>
          </div>
        ))}
      </div>
    </ChartCard>
  );
};

export default RecentActivity;
