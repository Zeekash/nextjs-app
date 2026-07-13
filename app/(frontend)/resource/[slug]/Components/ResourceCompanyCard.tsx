import Image from "next/image";
import { FaCheckCircle } from "react-icons/fa";
import StarRating from "@/components/frontend/StarRating";

interface ResourceCompanyCardProps {
  name: string;
  logo: string;
  rating: number;
  tagline: string;
  features: string[];
}

export default function ResourceCompanyCard({
  name,
  logo,
  rating,
  tagline,
  features,
}: ResourceCompanyCardProps) {
  return (
    <div className="border border-gray-200 rounded-2xl p-5 md:p-6 flex flex-col lg:flex-row items-center lg:items-start gap-6">
      {/* Logo + Rating */}
      <div className="flex flex-col items-center min-w-[140px]">
        <div className="h-16 w-32 relative mb-3">
          <Image
            src={logo}
            alt={name}
            fill
            className="object-contain"
            unoptimized
          />
        </div>
        <StarRating rating={rating} size={20} />
        <p className="mt-1 text-[24px] font-bold text-[#111827]">{rating}</p>
      </div>

      {/* Info */}
      <div className="flex-1 text-center lg:text-left">
        <h2 className="text-[24px] md:text-[28px] font-bold text-[#111827] urbanfont">
          {name}
        </h2>
        <p className="mt-1 text-[16px] md:text-[18px] font-semibold text-[#116087]">
          {tagline}
        </p>
        <div className="mt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-center gap-1 text-[14px] md:text-[16px] text-[#374151]"
            >
              <FaCheckCircle className="w-4 h-4 text-[#116087]" />
              <span>{feature}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Buttons */}
      <div className="flex flex-col gap-3 min-w-[160px]">
        <button
          type="button"
          className="bg-[#116087] text-white px-6 py-2.5 rounded-full font-semibold text-[14px] md:text-[16px] hover:bg-[#0b4f70] transition-all duration-300"
        >
          Overview
        </button>
        <button
          type="button"
          className="bg-white text-[#116087] px-6 py-2.5 rounded-full font-semibold text-[14px] md:text-[16px] border border-[#116087] hover:bg-[#F1F6F8] transition-all duration-300"
        >
          Contact Mover
        </button>
      </div>
    </div>
  );
}
