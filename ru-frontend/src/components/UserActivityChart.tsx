import ReactECharts from "echarts-for-react";
import ChartCard from "./ChartCard";

const UserActivityChart = ({ data }: { data: any }) => {
  const option = {
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
      data: ["Seg", "Ter", "Qua", "Qui", "Sex"],
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
        data: data,
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

  return (
    <ChartCard title="Atividade Semanal">
      <ReactECharts
        option={option}
        style={{ height: "300px" }}
        opts={{ renderer: "svg" }}
      />
    </ChartCard>
  );
};

export default UserActivityChart;
