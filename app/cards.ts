import type { CardConfig } from "./types";

export const CARDS: CardConfig[] = [
  {
    category: "Cost Visibility",
    title: "Cost Monitoring",
    icon: "/cost.gif",
    primary: (d: any) => ({ prefix: "$", value: parseFloat(d.totalCost) }),
    secondary: (d: any) => `Savings: ${d.savings}%  ·  Status: ${d.alerts}`,
  },
  {
    category: "Infrastructure",
    title: "Save 70%",
    icon: "/savings.gif",
    primary: (d) => ({
      prefix: "$",
      value: parseFloat(d.savedAmount),
      suffix: " saved",
    }),
    secondary: (d) =>
      `${d.optimizedServices} services optimised  ·  ${d.reduction}% reduction`,
  },
  {
    category: "Decision Making",
    title: "Accurate Cost Data",
    icon: "/target.gif",
    primary: (d) => ({ value: d.dataPoints, suffix: " data points" }),
    secondary: (d) => `Accuracy: ${d.accuracy}%  ·  Updated: ${d.lastUpdated}`,
  },
];
