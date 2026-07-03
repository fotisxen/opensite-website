"use client";

import { useState, useRef, useEffect } from "react";

const options = [
  "E-commerce Store",
  "SaaS Platform",
  "Corporate Website",
  "Custom Development",
  "Other",
];

interface CustomSelectProps {
  name: string;
  value: string;
  onChange: (value: string) => void;
}

export function CustomSelect({ name, value, onChange }: CustomSelectProps) {
  const [open, setOpen] = useState(false);
  const ref = useRef<HTMLDivElement>(null);

  // Close on outside click
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, []);

  const selected = value || options[0];

  return (
    <div ref={ref} className="relative w-full">
      {/* Hidden native input so form data still works */}
      <input type="hidden" name={name} value={selected} />

      {/* Trigger */}
      <button
        type="button"
        onClick={() => setOpen((o) => !o)}
        className="flex w-full items-center justify-between rounded-xl border border-surface-border bg-background/50 px-4 py-3 text-left text-text-secondary outline-none transition-all hover:border-primary-container/50 focus:border-transparent focus:ring-2 focus:ring-primary-container"
      >
        <span>{selected}</span>
        <span
          className={`material-symbols-outlined text-[18px] transition-transform duration-200 ${open ? "rotate-180" : ""}`}
        >
          expand_more
        </span>
      </button>

      {/* Dropdown */}
      {open && (
        <ul className="absolute left-0 right-0 top-[calc(100%+6px)] z-50 overflow-hidden rounded-xl border border-surface-border bg-background shadow-lg">
          {options.map((opt) => (
            <li key={opt}>
              <button
                type="button"
                onClick={() => {
                  onChange(opt);
                  setOpen(false);
                }}
                className={`flex w-full items-center justify-between px-4 py-3 text-left text-sm transition-colors hover:bg-primary-container/10 hover:text-primary-container ${
                  selected === opt
                    ? "bg-primary-container/10 font-medium text-primary-container"
                    : "text-text-primary"
                }`}
              >
                {opt}
                {selected === opt && (
                  <span className="material-symbols-outlined text-[16px] text-primary-container">
                    check
                  </span>
                )}
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}