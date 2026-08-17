"use client";

import React, { useState } from "react";
import { FiChevronDown } from "react-icons/fi";

interface AccordionData {
  title: string;
  content: string;
}

export default function Accordion({
  data,
}: {
  data: AccordionData[];
}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <div className="flex flex-col border-y border-neutral-800">
      {data.map((item, index) => {
        const isOpen = openIndex === index;

        return (
          <div
            key={index}
            className="border-b border-neutral-800 last:border-b-0"
          >
            <button
              type="button"
              onClick={() => toggleAccordion(index)}
              className="flex w-full items-center justify-between gap-5 py-5 text-left"
            >
              <span className="text-base font-semibold text-neutral-200">
                {item.title}
              </span>

              <FiChevronDown
                className={`size-5 shrink-0 text-neutral-400 transition-transform duration-200 ${
                  isOpen ? "rotate-180" : ""
                }`}
              />
            </button>

            <div
              className={`grid transition-[grid-template-rows] duration-200 ease-in-out ${
                isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
              }`}
            >
              <div className="overflow-hidden">
                <p className="pb-5 pr-8 text-sm leading-7 text-neutral-400">
                  {item.content}
                </p>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}