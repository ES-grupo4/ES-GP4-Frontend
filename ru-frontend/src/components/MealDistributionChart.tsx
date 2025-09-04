import ReactECharts from "echarts-for-react";
import ChartCard from "./ChartCard";

const MealDistributionChart = ({ almoco, jantar }: { almoco: any, jantar: any }) => {

  const option = {
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
        name: "Refeições Semanais",
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
          { value: almoco, name: "Almoço", itemStyle: { color: "#3B82F6" } },
          { value: jantar, name: "Jantar", itemStyle: { color: "#10B981" } },
        ],
      },
    ],
  };


  return (
    <ChartCard title="Distribuição de Refeições">
      <ReactECharts
        option={option}
        style={{ height: "300px" }}
        opts={{ renderer: "svg" }}
      />
    </ChartCard>
  );
};

export default MealDistributionChart;
