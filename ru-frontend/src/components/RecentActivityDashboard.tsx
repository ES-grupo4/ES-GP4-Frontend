import ChartCard from "./ChartCard";

const RecentActivity = ({ activities }: { activities: any }) => {
	const realAct = [] as any[];

	if (activities.length !== 0) {
		activities.items.forEach((item: any, i: number) => {
			if (i < 3) realAct.push(item);
		});
	}

	return (
		<ChartCard title="Atividades Recentes">
			<div className="space-y-4">
				{realAct.map((activity: any) => (
					<div
						key={activity.id}
						className="flex items-start pb-3 border-b border-gray-100 last:border-0"
					>
						<div className="w-2 h-2 bg-blue-500 rounded-full mt-2 mr-3"></div>
						<div>
							<p className="text-sm font-medium">{activity.acao}</p>
							<p className="text-xs text-gray-500">{activity.data}</p>
						</div>
					</div>
				))}
			</div>
		</ChartCard>
	);
};

export default RecentActivity;
