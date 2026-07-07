"use client";

import { useState } from "react";

const Faqs = ({
  faqs,
  questionBgColor = "#ffffff",
  textColor = "#000000",
}: any) => {
  const [open, setOpen] = useState(-1);

  const faqList = Array.isArray(faqs) ? faqs : [];

  return (
    <section className="bg-white py-16">
      <div className="mx-auto max-w-6xl px-4">
        <h2 className="mb-10 font-serif text-[42px] font-bold text-[#081C33] md:text-[56px] sm:text-[48px] max-sm:text-[30px]">
          Frequently Asked Questions
        </h2>

        <div className="space-y-5">
          {faqList.map((faq: any, index: number) => (
            <div
              key={faq.id || index}
              className="overflow-hidden rounded-xl border border-[#C7D7E4] bg-white"
            >
              <button
                type="button"
                onClick={() => setOpen(open === index ? -1 : index)}
                style={{ backgroundColor: questionBgColor }}
                className="flex w-full items-center justify-between px-6 py-6 text-left"
              >
               <h3
                style={{ color: textColor }}
                className="font-serif text-[22px] md:text-[24px]"
                >
                {faq.question}
                </h3>

                <svg
                  className={`h-5 w-5 shrink-0 transition-transform duration-300 ease-in-out ${
                    open === index ? "rotate-180" : ""
                  }`}
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M19 9l-7 7-7-7"
                  />
                </svg>
              </button>

              <div
                className={`grid bg-white transition-all duration-500 ease-in-out ${
                  open === index
                    ? "grid-rows-[1fr] opacity-100"
                    : "grid-rows-[0fr] opacity-0"
                }`}
              >
                <div className="overflow-hidden">
                  <div className="border-t border-[#C7D7E4] bg-white px-6 py-6">
                    <p className="text-[18px] leading-9 text-[#374151]">
                      {faq.answer}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Faqs;