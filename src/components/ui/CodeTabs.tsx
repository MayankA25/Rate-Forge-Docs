"use client";
import React, { useState } from "react";

interface Tab {
  title: string;
  language: string;
  code: string;
}

export default function CodeTabs({ tabs }: { tabs: Tab[] }) {
    const [defaultIndex, setDefaultIndex] = useState(0);
  return (
    <div className="flex items-center">
      {tabs.map((tab, index) => {
        return (
          <span
            key={index}
            className={`flex cursor-pointer items-center justify-center rounded-t-lg px-5 py-1 font-bold transition-all duration-200 hover:bg-neutral-800 ${defaultIndex == index ? "bg-neutral-900" : "bg-neutral-950"}`}

            onClick={()=>{
                setDefaultIndex(index);
            }}
          >
            {tab.title}
          </span>
        );
      })}
    </div>
  );
}
