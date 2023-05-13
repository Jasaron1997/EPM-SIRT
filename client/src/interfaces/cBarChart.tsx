interface CBarChartProps {
  width: number;
  height: number;
  data: DataCBarChart[];
}

interface DataCBarChart {
  color: string;
  fill: string;
  name: string;
  value: number;
}
export type { CBarChartProps,DataCBarChart };
