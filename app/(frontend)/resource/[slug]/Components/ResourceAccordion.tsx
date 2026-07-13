"use client";

import { useState } from "react";
import { FaChevronDown, FaCheck, FaTimes } from "react-icons/fa";

export interface AccordionItem {
  label: string;
  value: string | React.ReactNode;
}

export interface AccordionHighlight {
  text: string;
}

export interface AccordionTable {
  title: string;
  headers: string[];
  rows: string[][];
}

interface ResourceAccordionProps {
  title: string;
  children?: React.ReactNode;
  items?: AccordionItem[];
  intro?: string;
  highlights?: AccordionHighlight[];
  pros?: string[];
  cons?: string[];
  paragraphs?: string[];
  scenario?: { title: string; items: string[] };
  summary?: string;
  tables?: AccordionTable[];
  defaultOpen?: boolean;
}

export default function ResourceAccordion({
  title,
  children,
  items,
  intro,
  highlights,
  pros,
  cons,
  paragraphs,
  scenario,
  summary,
  tables,
  defaultOpen = false,
}: ResourceAccordionProps) {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="border border-gray-200 rounded-xl overflow-hidden">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-5 bg-white hover:bg-gray-50 transition-colors"
      >
        <span className="text-[16px] md:text-[18px] font-semibold text-[#111827] urbanfont">
          {title}
        </span>
        <FaChevronDown
          className={`w-5 h-5 text-[#116087] transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </button>
      {isOpen && (
        <div className="p-5 border-t border-gray-100 text-[14px] md:text-[16px] text-[#374151] leading-7">
          {items ? (
            <ul className="space-y-4">
              {items.map((item, index) => (
                <li key={index} className="flex items-start gap-3">
                  <span className="w-5 h-5 rounded-full bg-[#116087] flex items-center justify-center text-white mt-0.5 shrink-0">
                    <FaCheck className="w-3 h-3" />
                  </span>
                  <p className="flex-1">
                    <span className="font-semibold text-[#111827]">
                      {item.label}:
                    </span>{" "}
                    <span className="text-[#374151]">{item.value}</span>
                  </p>
                </li>
              ))}
            </ul>
          ) : intro && highlights ? (
            <div>
              <p
                className="text-[14px] md:text-[16px] text-[#374151] leading-7"
                dangerouslySetInnerHTML={{ __html: intro }}
              />
              <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4">
                {highlights.map((highlight, index) => (
                  <div
                    key={index}
                    className="border border-gray-200 rounded-xl p-5 bg-white"
                    dangerouslySetInnerHTML={{ __html: highlight.text }}
                  />
                ))}
              </div>
            </div>
          ) : intro && pros && cons ? (
            <div>
              <p
                className="text-[14px] md:text-[16px] text-[#374151] leading-7"
                dangerouslySetInnerHTML={{ __html: intro }}
              />

              <p className="mt-6 text-[16px] md:text-[18px] font-semibold text-[#111827] urbanfont">
                Pros & Cons
              </p>

              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Pros */}
                <div className="bg-[#F8FAFB] border border-gray-200 rounded-xl p-5">
                  <h4 className="text-[16px] md:text-[18px] font-semibold text-[#111827] mb-4 urbanfont">
                    Pros
                  </h4>
                  <ul className="space-y-4">
                    {pros.map((pro, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-white mt-0.5 shrink-0">
                          <FaCheck className="w-3 h-3" />
                        </span>
                        <span
                          className="text-[14px] md:text-[16px] text-[#374151] leading-6 flex-1"
                          dangerouslySetInnerHTML={{ __html: pro }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Cons */}
                <div className="bg-[#F8FAFB] border border-gray-200 rounded-xl p-5">
                  <h4 className="text-[16px] md:text-[18px] font-semibold text-[#111827] mb-4 urbanfont">
                    Cons
                  </h4>
                  <ul className="space-y-4">
                    {cons.map((con, index) => (
                      <li key={index} className="flex items-start gap-3">
                        <span className="w-5 h-5 rounded-full bg-red-400 flex items-center justify-center text-white mt-0.5 shrink-0">
                          <FaTimes className="w-3 h-3" />
                        </span>
                        <span
                          className="text-[14px] md:text-[16px] text-[#374151] leading-6 flex-1"
                          dangerouslySetInnerHTML={{ __html: con }}
                        />
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          ) : paragraphs ? (
            <div className="space-y-5">
              {paragraphs.map((paragraph, index) => (
                <p
                  key={index}
                  className="text-[14px] md:text-[16px] text-[#374151] leading-7"
                  dangerouslySetInnerHTML={{ __html: paragraph }}
                />
              ))}

              {scenario && (
                <div>
                  <h4 className="text-[16px] md:text-[18px] font-semibold text-[#111827] mb-3 urbanfont">
                    {scenario.title}
                  </h4>
                  <ul className="space-y-2">
                    {scenario.items.map((item, index) => (
                      <li
                        key={index}
                        className="text-[14px] md:text-[16px] text-[#374151] leading-7"
                        dangerouslySetInnerHTML={{ __html: item }}
                      />
                    ))}
                  </ul>
                </div>
              )}

              {summary && (
                <p
                  className="text-[14px] md:text-[16px] text-[#374151] leading-7 font-semibold"
                  dangerouslySetInnerHTML={{ __html: summary }}
                />
              )}
            </div>
          ) : tables ? (
            <div className="space-y-8">
              {tables.map((table, tableIndex) => (
                <div key={tableIndex}>
                  <h4 className="text-[16px] md:text-[18px] font-semibold text-[#111827] mb-3 urbanfont">
                    {table.title}
                  </h4>
                  <div className="overflow-x-auto">
                    <table className="w-full border border-gray-200 rounded-xl overflow-hidden">
                      <thead className="bg-[#EAF6FA]">
                        <tr>
                          {table.headers.map((header, headerIndex) => (
                            <th
                              key={headerIndex}
                              className="text-left px-4 py-3 text-[14px] md:text-[16px] font-semibold text-[#111827] border-b border-gray-200"
                            >
                              {header}
                            </th>
                          ))}
                        </tr>
                      </thead>
                      <tbody>
                        {table.rows.map((row, rowIndex) => (
                          <tr
                            key={rowIndex}
                            className={rowIndex % 2 === 0 ? "bg-white" : "bg-[#F8FAFB]"}
                          >
                            {row.map((cell, cellIndex) => (
                              <td
                                key={cellIndex}
                                className="px-4 py-3 text-[14px] md:text-[16px] text-[#374151] border-b border-gray-200 align-top"
                                dangerouslySetInnerHTML={{ __html: cell }}
                              />
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            children
          )}
        </div>
      )}
    </div>
  );
}
