"use client";

import { useEffect, useState } from "react";
import { tokens } from "./tokens";

function useCountUp(target: number, duration = 1200, start = false) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!start || target === 0) return;
    let startTime: number | null = null;

    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) requestAnimationFrame(step);
    };

    requestAnimationFrame(step);
  }, [target, duration, start]);

  return count;
}

type Props = {
  prefix?: string;
  value: number;
  suffix?: string;
  animate: boolean;
};

export default function AnimatedMetric({
  prefix,
  value,
  suffix,
  animate,
}: Props) {
  const count = useCountUp(value, 1200, animate);
  const display = value % 1 !== 0 ? value.toFixed(2) : count.toLocaleString();

  return (
    <p
      className="mt-3 text-2xl font-bold"
      style={{ color: tokens.colors.textPrimary }}
    >
      {prefix}
      {display}
      {suffix}
    </p>
  );
}
