"use client";

import { useState } from "react";

interface FAQItem {
  question: string;
  answer: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
}

export default function FAQAccordion({ items }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-3">
      {items.map((item, index) => (
        <div
          key={index}
          className="border border-gray-200 rounded-lg bg-white overflow-hidden shadow-sm"
        >
          <button
            onClick={() =>
              setOpenIndex(openIndex === index ? null : index)
            }
            className="w-full flex items-center justify-between px-5 py-4 text-left hover:bg-cream/50 transition-colors"
          >
            <span className="font-medium text-navy pr-4">
              {item.question}
            </span>
            <svg
              className={`w-5 h-5 text-gold shrink-0 transition-transform ${
                openIndex === index ? "rotate-180" : ""
              }`}
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          </button>
          {openIndex === index && (
            <div className="px-5 pb-4 border-t border-gray-100">
              <p className="text-sm text-text-dark leading-relaxed pt-3">
                {item.answer}
              </p>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}
