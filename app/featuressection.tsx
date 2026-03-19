"use client";

import { useRef } from "react";
import { useInView } from "framer-motion";
import { useCostData } from "./hooks/useCostData";
import FeatureCard from "./featuredCard";
import { tokens } from "./tokens";
import { CARDS } from "./cards";

export default function FeaturesSection() {
  const { data, isLoading, isError } = useCostData();
  const sectionRef = useRef<HTMLElement>(null);
  const inView = useInView(sectionRef, { once: true, margin: "-80px" });

  return (
    <section
      ref={sectionRef}
      className="flex flex-wrap justify-center gap-4 mt-5 px-4"
    >
      {isLoading &&
        CARDS.map((_, i) => (
          <div key={i} className="card-container w-full sm:w-[300px]">
            <div
              className="card-border h-[200px] animate-pulse"
              style={{ background: tokens.colors.bgCard }}
            />
          </div>
        ))}

      {isError && (
        <p style={{ color: tokens.colors.textMuted }}>Something went wrong</p>
      )}

      {data &&
        CARDS.map((card, i) => (
          <FeatureCard
            key={card.title}
            card={card}
            data={data}
            index={i}
            inView={inView}
          />
        ))}
    </section>
  );
}
