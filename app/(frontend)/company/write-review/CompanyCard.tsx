import Link from "next/link";
import type { Company } from "@/types/company";

type Props = {
  company: Company;
};

export default function CompanyCard({ company }: Props) {
  const companyName = company.label || company.value || "Company";
  const companyImage = company.image || "/img/samplelogo.webp";
  const address = company.address || "Not Found";
  const website = company.website || "";
  const phone = company.phone || "";
  const additionalPhone = company.additional_phone || "";

  return (
    <div className="w-[50%] sm:flex-wrap max-sm:w-full rounded-[15px] border border-[#c8e0eb] bg-white p-6 flex flex-row gap-5 items-center max-sm:flex-col">

      <Link
        href={`/company/${company.slug}`}
        className="w-[150px] flex-shrink-0"
      >
        <img
          src={companyImage}
          alt={companyName}
          className="w-[140px] h-[80px] object-contain"
        />
      </Link>

      <div className="flex-1">

        <h3 className="text-[22px] md:text-[24px] font-bold text-[#041b22] mb-2">
          {companyName}
        </h3>

        <p className="my-2">
          <strong>Address:</strong> {address}
        </p>

        <p className="my-2">
          <strong>Site:</strong>{" "}
          {website ? (
            <a
              href={website}
              target="_blank"
              rel="nofollow noopener noreferrer"
              className="hover:underline"
            >
              {website}
            </a>
          ) : (
            "Not Found"
          )}
        </p>

        <p className="my-2">
          <strong>Phone:</strong>{" "}
          {phone ? (
            <a href={`tel:${phone}`}>
              {phone}
            </a>
          ) : (
            "Not Found"
          )}

          {additionalPhone && (
            <>
              {" "}
              ,{" "}
              <a href={`tel:${additionalPhone}`}>
                {additionalPhone}
              </a>
            </>
          )}
        </p>

        <Link
          href={`/review/${company.slug}`}
          className="mt-4 inline-flex h-[37px] w-[150px] items-center justify-center bg-[#116087] text-white hover:bg-[#1e6581]"
        >
          Write Review
        </Link>

      </div>
    </div>
  );
}