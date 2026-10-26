"use client";

import { useState } from "react";
import { DEMOS, demoPath } from "@/lib/demos";

const SITE = "https://opensite.gr";

export default function DemosPage() {
  const [copied, setCopied] = useState("");

  async function copy(url: string) {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(url);
      setTimeout(() => setCopied(""), 1500);
    } catch {
      window.prompt("Copy URL", url);
    }
  }

  return (
    <div>
      <h1 className="font-headline-lg text-headline-lg text-text-primary">Demos</h1>
      <p className="mt-2 font-body-sm text-body-sm text-text-secondary">
        Client demos live in <code>public/demos/&lt;slug&gt;/demo.html</code> and are listed in <code>src/lib/demos.ts</code>. Add <code>?clean</code> to hide the placeholder notes for a meeting.
      </p>

      <div className="mt-8 overflow-x-auto">
        <table className="w-full min-w-[720px] border-collapse font-body-sm text-body-sm">
          <thead>
            <tr className="border-b border-surface-border text-left font-label-sm text-label-sm uppercase tracking-wide text-text-secondary">
              <th className="py-3 pr-4">Demo</th>
              <th className="py-3 pr-4">Type</th>
              <th className="py-3 pr-4">Created</th>
              <th className="py-3 pr-4">URL</th>
              <th className="py-3 pr-4"></th>
            </tr>
          </thead>
          <tbody>
            {DEMOS.map((d) => {
              const url = SITE + demoPath(d.slug);
              const meeting = `${SITE}/demos/${d.slug}/demo.html?clean`;
              return (
                <tr key={d.slug} className="border-b border-surface-border/60">
                  <td className="py-3 pr-4">
                    <a href={demoPath(d.slug)} target="_blank" rel="noopener" className="text-text-primary hover:text-primary">
                      {d.name}
                    </a>
                    {d.instagram && (
                      <a href={d.instagram} target="_blank" rel="noopener" className="ml-2 text-text-secondary hover:text-primary">
                        IG
                      </a>
                    )}
                  </td>
                  <td className="py-3 pr-4 text-text-secondary">{d.kind}</td>
                  <td className="py-3 pr-4 text-text-secondary">{d.created}</td>
                  <td className="py-3 pr-4">
                    <button onClick={() => copy(url)} className="text-text-secondary hover:text-primary" title="Copy URL">
                      {copied === url ? "Copied ✓" : url.replace("https://", "")}
                    </button>
                  </td>
                  <td className="py-3 pr-4 whitespace-nowrap">
                    <a href={demoPath(d.slug)} target="_blank" rel="noopener" className="mr-4 text-primary">
                      Open
                    </a>
                    <button onClick={() => copy(meeting)} className="text-text-secondary hover:text-primary">
                      {copied === meeting ? "Copied ✓" : "Copy meeting link"}
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
