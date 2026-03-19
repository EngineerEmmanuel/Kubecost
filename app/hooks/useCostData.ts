import { useQuery } from "@tanstack/react-query";

export const useCostData = () => {
  return useQuery({
    queryKey: ["cost-data"],
    queryFn: async () => {
      const res = await fetch("https://dummyjson.com/products");
      if (!res.ok) throw new Error("Failed to fetch");

      const data = await res.json();
      const products = data.products;

      return {
        // Card 1 — Cost Monitoring
        totalCost: (products[0].price * 100).toFixed(2),
        savings: products[1].discountPercentage.toFixed(1),
        alerts: products[2].stock < 50 ? "Budget risk" : "Stable",

        // Card 2 — Save 70% on Infrastructure
        savedAmount: (products[3].price * 70).toFixed(0),
        optimizedServices: products[4].stock,
        reduction: products[5].discountPercentage.toFixed(1),

        // Card 3 — Accurate Data for Decision Making
        dataPoints: products[6].stock * 10,
        accuracy: (90 + products[7].rating).toFixed(1),
        lastUpdated: "Just now",
      };
    },
  });
};
