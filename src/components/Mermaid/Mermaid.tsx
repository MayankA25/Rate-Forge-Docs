"use client";

import { useEffect, useRef } from "react";
import mermaid from "mermaid";

interface MermaidProps {
  chart: string;
}

export default function Mermaid({ chart }: MermaidProps) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;

    mermaid.initialize({
      startOnLoad: false,
      theme: "dark",
    });

    const renderChart = async () => {
      try {
        const id = `mermaid-${Date.now()}`;

        const { svg } = await mermaid.render(id, chart);

        if (ref.current) {
          ref.current.innerHTML = svg;
        }
      } catch (error) {
        console.error("Mermaid rendering error:", error);
      }
    };

    renderChart();
  }, [chart]);

  return <div ref={ref} className="w-full overflow-x-auto flex items-center justify-center" />;
}