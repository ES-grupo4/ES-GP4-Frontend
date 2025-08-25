import ReactECharts from "echarts-for-react";
import ChartCard from "./ChartCard";

const UserActivityChart = ({option}: {option: any}) => {
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

  export default UserActivityChart