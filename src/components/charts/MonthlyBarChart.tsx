"use client";

import { useState } from "react";

export interface MonthlyPoint {
  label: string;
  income: number;
  expense: number;
}

// Validated with the dataviz skill's palette checker against this site's
// dark surface (#0c1321) — the theme's own secondary/error tokens are too
// pale/low-chroma for chart marks, so analytics uses this pair instead.
const COLORS = { income: "#0d9488", expense: "#e11d48" };

function niceMax(value: number) {
  if (value <= 0) return 100;
  const magnitude = Math.pow(10, Math.floor(Math.log10(value)));
  const normalized = value / magnitude;
  const step = normalized <= 1 ? 1 : normalized <= 2 ? 2 : normalized <= 5 ? 5 : 10;
  return step * magnitude;
}

export default function MonthlyBarChart({ data }: { data: MonthlyPoint[] }) {
  const [hover, setHover] = useState<{ i: number; series: "income" | "expense" } | null>(null);

  const width = 720;
  const height = 280;
  const padding = { top: 16, right: 16, bottom: 28, left: 56 };
  const plotW = width - padding.left - padding.right;
  const plotH = height - padding.top - padding.bottom;

  const rawMax = Math.max(1, ...data.map((d) => Math.max(d.income, d.expense)));
  const max = niceMax(rawMax);
  const ticks = [0, max * 0.25, max * 0.5, max * 0.75, max];

  const groupW = plotW / Math.max(1, data.length);
  const barW = Math.min(24, groupW * 0.32);
  const gap = 2;

  const y = (v: number) => plotH - (v / max) * plotH;
  const fmt = (n: number) => `€${Math.round(n).toLocaleString("en-US")}`;

  return (
    <div>
      <div className="flex items-center gap-5 font-label-sm text-label-sm uppercase tracking-wide text-text-secondary">
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS.income }} />
          Income
        </span>
        <span className="flex items-center gap-1.5">
          <span className="h-2 w-2 rounded-full" style={{ backgroundColor: COLORS.expense }} />
          Expense
        </span>
      </div>

      <svg viewBox={`0 0 ${width} ${height}`} className="mt-3 w-full overflow-visible" role="img">
        <g transform={`translate(${padding.left},${padding.top})`}>
          {ticks.map((t) => (
            <g key={t}>
              <line x1={0} x2={plotW} y1={y(t)} y2={y(t)} stroke="#8d90a0" strokeOpacity={0.18} strokeWidth={1} />
              <text x={-8} y={y(t)} textAnchor="end" dominantBaseline="middle" className="fill-text-secondary font-label-sm text-[10px]">
                {t === 0 ? "0" : `${Math.round(t / 1000)}k`}
              </text>
            </g>
          ))}

          {data.map((d, i) => {
            const groupX = i * groupW;
            const incomeH = (d.income / max) * plotH;
            const expenseH = (d.expense / max) * plotH;
            const incomeX = groupX + groupW / 2 - barW - gap / 2;
            const expenseX = groupX + groupW / 2 + gap / 2;

            return (
              <g key={d.label}>
                <rect
                  x={incomeX}
                  y={plotH - incomeH}
                  width={barW}
                  height={Math.max(incomeH, 0)}
                  rx={4}
                  fill={COLORS.income}
                  opacity={hover && hover.i === i && hover.series !== "income" ? 0.5 : 1}
                  onPointerEnter={() => setHover({ i, series: "income" })}
                  onPointerLeave={() => setHover(null)}
                  className="cursor-pointer"
                />
                <rect
                  x={expenseX}
                  y={plotH - expenseH}
                  width={barW}
                  height={Math.max(expenseH, 0)}
                  rx={4}
                  fill={COLORS.expense}
                  opacity={hover && hover.i === i && hover.series !== "expense" ? 0.5 : 1}
                  onPointerEnter={() => setHover({ i, series: "expense" })}
                  onPointerLeave={() => setHover(null)}
                  className="cursor-pointer"
                />
                <text x={groupX + groupW / 2} y={plotH + 16} textAnchor="middle" className="fill-text-secondary font-label-sm text-[10px]">
                  {d.label}
                </text>

                {hover && hover.i === i && (
                  <g transform={`translate(${groupX + groupW / 2},${plotH - Math.max(incomeH, expenseH) - 12})`}>
                    <foreignObject x={-65} y={-38} width={130} height={34} style={{ overflow: "visible" }}>
                      <div className="pointer-events-none rounded-lg border border-surface-border bg-surface-card px-2 py-1 text-center shadow-lg">
                        <p className="font-label-sm text-label-sm font-semibold text-text-primary">
                          {fmt(hover.series === "income" ? d.income : d.expense)}
                        </p>
                        <p className="font-label-sm text-[9px] uppercase text-text-secondary">
                          {hover.series === "income" ? "Income" : "Expense"} · {d.label}
                        </p>
                      </div>
                    </foreignObject>
                  </g>
                )}
              </g>
            );
          })}
        </g>
      </svg>
    </div>
  );
}
