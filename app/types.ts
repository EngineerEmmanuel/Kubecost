export type CostData = {
  totalCost: string;
  savings: string;
  alerts: string;
  savedAmount: string;
  optimizedServices: number;
  reduction: string;
  dataPoints: number;
  accuracy: string;
  lastUpdated: string;
};

export type Metric = {
  prefix?: string;
  value: number;
  suffix?: string;
};

export type CardConfig = {
  category: string;
  title: string;
  icon: string;
  primary: (d: CostData) => Metric;
  secondary: (d: CostData) => string;
};
