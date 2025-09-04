import ReactECharts from "echarts-for-react";
import ChartCard from "./ChartCard";

const getDayOfWeek = (dateUTC: string): number => {
  const date = new Date(dateUTC);
  return date.getUTCDay();
};

const UserActivityChart = ({ data }: { data: any }) => {
  const serie = [0, 0, 0, 0, 0, 0, 0];

  data.forEach((item: any) => {
    ++serie[getDayOfWeek(item.horario)];
    console.log(item.horario)
  });

  const series = [
    {
      name: "Compras",
      type: "line",
      smooth: true,
      data: serie,
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
  ];

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
      data: ["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"],
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
    series: series,
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
