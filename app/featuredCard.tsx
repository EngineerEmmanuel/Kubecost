"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { tokens } from "./tokens";
import BorderSVG from "./bordersvg";
import AnimatedMetric from "./animatedMetric";
import type { CostData, CardConfig } from "./types";

type Props = {
  card: CardConfig;
  data: CostData;
  index: number;
  inView: boolean;
};

export default function FeatureCard({ card, data, index, inView }: Props) {
  const metric = card.primary(data);
  const [countStarted, setCountStarted] = useState(false);

  useEffect(() => {
    if (!inView) return;
    const timer = setTimeout(() => setCountStarted(true), index * 150 + 400);
    return () => clearTimeout(timer);
  }, [inView, index]);

  return (
    <div className="card-container w-full sm:w-[300px]">
      <motion.div
        className="card-border h-[200px] flex flex-col"
        initial={{ opacity: 0, y: 40 }}
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
        transition={{
          duration: 0.55,
          delay: index * 0.15,
          ease: [0.25, 0.46, 0.45, 0.94],
        }}
        whileHover={{
          scale: 1.03,
          boxShadow: "0 12px 32px rgba(59, 206, 206, 0.15)",
          transition: { duration: 0.2 },
        }}
      >
        <BorderSVG />

        <div className="flex justify-between gap-2">
          <div>
            <p
              className="text-xs uppercase tracking-wide mb-0.5"
              style={{ color: tokens.colors.textMuted }}
            >
              {card.category}
            </p>
            <h5>{card.title}</h5>
          </div>
          <img
            src={card.icon}
            alt={`${card.title} icon`}
            width={60}
            height={60}
          />
        </div>

        <AnimatedMetric
          prefix={metric.prefix}
          value={metric.value}
          suffix={metric.suffix}
          animate={countStarted}
        />

        <p className="text-sm mt-1" style={{ color: tokens.colors.textMuted }}>
          {card.secondary(data)}
        </p>

        <a href="#" className="btn-primary mt-auto w-fit">
          Learn More
        </a>
      </motion.div>
    </div>
  );
}
