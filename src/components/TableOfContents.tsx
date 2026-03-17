"use client";

import { useState, useEffect } from "react";

interface TocItem {
  id: string;
  text: string;
  level: number;
}

interface TableOfContentsProps {
  headings: TocItem[];
}

export default function TableOfContents({ headings }: TableOfContentsProps) {
  const [activeId, setActiveId] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState(true);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      {
        rootMargin: "-80px 0px -80% 0px",
        threshold: 0,
      }
    );

    headings.forEach((heading) => {
      const element = document.getElementById(heading.id);
      if (element) observer.observe(element);
    });

    return () => observer.disconnect();
  }, [headings]);

  if (headings.length === 0) return null;

  return (
    <>
      {/* Mobile Toggle */}
      <div className="lg:hidden mb-6">
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          className="flex items-center gap-2 w-full px-4 py-3 bg-white border border-gray-200 rounded-lg text-sm font-medium text-navy shadow-sm"
        >
          <svg
            className="w-4 h-4 text-gold"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h7"
            />
          </svg>
          Table of Contents
          <svg
            className={`w-4 h-4 ml-auto transition-transform ${isCollapsed ? "" : "rotate-180"}`}
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
        {!isCollapsed && (
          <nav className="mt-2 bg-white border border-gray-200 rounded-lg p-4 shadow-sm">
            <ul className="space-y-2">
              {headings.map((heading) => (
                <li
                  key={heading.id}
                  style={{ paddingLeft: `${(heading.level - 2) * 16}px` }}
                >
                  <a
                    href={`#${heading.id}`}
                    onClick={() => setIsCollapsed(true)}
                    className={`block text-sm py-1 transition-colors ${
                      activeId === heading.id
                        ? "text-gold-dark font-medium"
                        : "text-text-muted hover:text-navy"
                    }`}
                  >
                    {heading.text}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        )}
      </div>

      {/* Desktop Sticky Sidebar */}
      <nav className="hidden lg:block sticky top-24">
        <p className="text-xs font-semibold text-gold uppercase tracking-wider mb-3">
          On this page
        </p>
        <ul className="space-y-1 border-l-2 border-gray-200">
          {headings.map((heading) => (
            <li
              key={heading.id}
              style={{ paddingLeft: `${(heading.level - 2) * 12 + 16}px` }}
            >
              <a
                href={`#${heading.id}`}
                className={`block text-sm py-1.5 transition-colors border-l-2 -ml-0.5 ${
                  activeId === heading.id
                    ? "text-gold-dark font-medium border-gold"
                    : "text-text-muted hover:text-navy border-transparent"
                }`}
              >
                {heading.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </>
  );
}
