import ReactECharts from "echarts-for-react";
import ChartCard from "./ChartCard";

const MealDistributionChart = ({ option }: { option: any }) => {
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
