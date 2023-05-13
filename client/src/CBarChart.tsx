import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import { CBarChartProps } from "./interfaces/cBarChart";

function CBarChart({width, height, data}:CBarChartProps) {
  return (
    <BarChart
      width={width}
      height={height}
      data={data}
      margin={{
        top: 20,
        right: 30,
        left: 20,
        bottom: 5,
      }}
    >
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" />
      <YAxis />
      <Tooltip />
      <Legend />
      <Bar dataKey="value" stackId="a" fill="#8884d8" legendType="none" />
    </BarChart>
  );
}

export default CBarChart;
