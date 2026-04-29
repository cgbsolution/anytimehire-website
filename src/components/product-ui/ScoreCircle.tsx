"use client";

import { motion, useInView } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import { cn } from "@/lib/utils";

type Props = {
  value: number;
  size?: number;
  stroke?: number;
  className?: string;
  label?: string;
};

export function ScoreCircle({
  value,
  size = 120,
  stroke = 10,
  className,
  label,
}: Props) {
  const ref = useRef<SVGSVGElement>(null);
  const inView = useInView(ref, { once: true, margin: "-40px" });
  const radius = (size - stroke) / 2;
  const circumference = 2 * Math.PI * radius;
  const offset = circumference * (1 - value / 100);

  const tone =
    value >= 70 ? "#12b76a" : value >= 40 ? "#f79009" : "#f04438";

  const [trackColor, setTrackColor] = useState("#e4e7ec");
  useEffect(() => {
    const update = () =>
      setTrackColor(
        document.documentElement.classList.contains("dark") ? "#1d2939" : "#e4e7ec",
      );
    update();
    const mo = new MutationObserver(update);
    mo.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => mo.disconnect();
  }, []);

  return (
    <div className={cn("relative inline-flex items-center justify-center", className)}>
      <svg
        ref={ref}
        width={size}
        height={size}
        viewBox={`0 0 ${size} ${size}`}
        className="-rotate-90"
      >
        <circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={trackColor}
          strokeWidth={stroke}
          fill="none"
        />
        <motion.circle
          cx={size / 2}
          cy={size / 2}
          r={radius}
          stroke={tone}
          strokeWidth={stroke}
          strokeLinecap="round"
          fill="none"
          strokeDasharray={circumference}
          initial={{ strokeDashoffset: circumference }}
          animate={{ strokeDashoffset: inView ? offset : circumference }}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
        />
      </svg>
      <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
        <span className="tabular text-2xl font-semibold text-ink-900 dark:text-ink-50">
          {value}
          <span className="text-base text-ink-500 dark:text-ink-400">%</span>
        </span>
        {label && (
          <span className="mt-0.5 text-[10px] font-medium uppercase tracking-[0.12em] text-ink-500 dark:text-ink-400">
            {label}
          </span>
        )}
      </div>
    </div>
  );
}
