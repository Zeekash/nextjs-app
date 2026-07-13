"use client";

export interface ResourceEasyBullet {
  label: string;
  value: string;
  fullWidth?: boolean;
}

interface ResourceEasySectionProps {
  title: string;
  subtitle: string;
  bullets: ResourceEasyBullet[];
  ctaText: string;
  ctaButton: React.ReactNode;
}

export default function ResourceEasySection({
  title,
  subtitle,
  bullets,
  ctaText,
  ctaButton,
}: ResourceEasySectionProps) {
  return (
    <section className="py-12 md:py-20 px-4">
      <div className="max-w-5xl mx-auto bg-[#EAF6FA] rounded-3xl p-6 md:p-12">
        <h2 className="text-center text-[26px] md:text-[36px] font-bold text-[#111827] urbanfont">
          {title}
        </h2>

        <p className="mt-4 text-center text-[14px] md:text-[16px] text-[#4B5563] max-w-2xl mx-auto">
          {subtitle}
        </p>

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4 max-w-3xl mx-auto">
          {bullets.map((bullet, index) => (
            <div
              key={index}
              className={`flex items-start gap-3 ${
                bullet.fullWidth ? "md:col-span-2 md:max-w-[50%]" : ""
              }`}
            >
              <span className="w-2 h-2 rounded-full bg-[#116087] mt-2 shrink-0" />
              <p className="text-[14px] md:text-[16px] text-[#374151]">
                <span className="font-semibold text-[#116087]">{bullet.label}:</span>{" "}
                {bullet.value}
              </p>
            </div>
          ))}
        </div>

        <div className="mt-10 bg-[#DBEFF7] rounded-2xl p-4 md:p-5 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="bg-white text-[#111827] text-[14px] md:text-[16px] font-medium rounded-full px-5 py-3 text-center md:text-left">
            {ctaText}
          </p>

          {ctaButton}
        </div>
      </div>
    </section>
  );
}
