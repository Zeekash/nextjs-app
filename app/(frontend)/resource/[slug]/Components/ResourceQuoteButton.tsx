"use client";

import { useMovingCalculatorModal } from "@/components/frontend/MovingCalculatorModal";

export default function ResourceQuoteButton({ className = "" }: { className?: string }) {
  const { openModal } = useMovingCalculatorModal();

  return (
    <button
      type="button"
      onClick={() => openModal()}
      className={`
        bg-[#116087] text-white px-6 py-3 md:px-8 md:py-3 rounded-full
        font-semibold text-[14px] md:text-[16px]
        hover:bg-[#0b4f70] transition-all duration-300
        ${className}
      `}
    >
      Get Quote
    </button>
  );
}
