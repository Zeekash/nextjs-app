import Image from "next/image";
import { FaCheck } from "react-icons/fa";

import StarRating from "@/components/frontend/StarRating";
import Faqs from "@/components/frontend/Faqs";
import ResourceAccordion from "@/app/(frontend)/resource/[slug]/Components/ResourceAccordion";
import ResourceCompanyCard from "@/app/(frontend)/resource/[slug]/Components/ResourceCompanyCard";
import ResourceQuoteButton from "@/app/(frontend)/resource/[slug]/Components/ResourceQuoteButton";
import ResourceEasySection from "@/app/(frontend)/resource/[slug]/Components/ResourceEasySection";

import { getResourcePageBySlug } from "@/server/resource";
import {
  findCompanyById,
  formatRating,
  getCompanyImageUrl,
  getMoverPoints,
  renderHtmlContent,
} from "@/app/(frontend)/resource/[slug]/utils.resource";

import type {
  ResourceBottomMover,
  ResourceCompany,
  ResourceTopMover,
} from "@/app/(frontend)/resource/[slug]/resource";

import {
  companyDetail,
  easySectionData,
  movingContainerCost,
  movingContainerSizes,
  thingsToKeepInMind,
  whatToAsk,
} from "@/app/(frontend)/resource/[slug]/constants";

interface ResourcePageProps {
  params: Promise<{ slug: string }>;
}

export default async function ResourcePage({ params }: ResourcePageProps) {
  const { slug } = await params;
  const data = await getResourcePageBySlug(slug ?? "temporibus-sit-nostr");

  if (!data) {
    return (
      <main className="min-h-screen bg-white mt-10 py-20 px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h1 className="text-2xl font-bold text-[#111827] mb-4 urbanfont">
            Resource page data not found
          </h1>
          <p className="text-[#374151] mb-2">Slug: <strong>{slug}</strong></p>
          <p className="text-[#374151]">
            Check the server console for the fetch URL and API response.
          </p>
        </div>
      </main>
    );
  }

  const { resourcePage, top_movers, bottom_movers, companies, faqs } = data;

  return (
    <main className="min-h-screen bg-white mt-10">
      {/* Featured Moving Companies Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-center text-[26px] md:text-[36px] font-bold text-[#111827] mb-10 md:mb-14 urbanfont">
            {resourcePage.title}
          </h1>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {top_movers.map((mover: ResourceTopMover) => {
              const company = findCompanyById(companies, mover.company_id);
              if (!company) return null;

              const points = getMoverPoints(mover);
              const rating = formatRating(company.average_rating, 0);
              const isHighlighted = mover.position === "1";

              return (
                <article
                  key={mover.id}
                  className={`
                    rounded-2xl border p-5 md:p-6 flex flex-col items-center text-center
                    transition-all duration-300 h-full
                    ${isHighlighted ? "border-[#116087] shadow-lg" : "border-gray-200 shadow-sm hover:shadow-md"}
                  `}
                >
                  <span className="text-[12px] md:text-[14px] font-semibold text-[#116087] uppercase tracking-wide">
                    {mover.heading}
                  </span>

                  <div className="relative w-[160px] h-[70px] my-4">
                    <Image
                      src={getCompanyImageUrl(company.image)}
                      alt={company.company_name}
                      fill
                      className="object-contain"
                      unoptimized
                    />
                  </div>

                  <h3 className="text-[18px] md:text-[20px] font-semibold text-[#111827] urbanfont">
                    {company.company_name}
                  </h3>

                  <div className="flex items-center gap-2 mt-2">
                    <StarRating rating={rating} size={16} />
                    <span className="text-[14px] text-[#4B5563]">
                      {rating.toFixed(1)}
                    </span>
                  </div>

                  <ul className="mt-4 space-y-2 w-full text-left">
                    {points.map((point, index) => (
                      <li
                        key={index}
                        className="flex items-start gap-3 border-b border-gray-100 pb-3 last:border-0"
                      >
                        <FaCheck className="w-4 h-4 text-[#116087] mt-0.5 shrink-0" />
                        <span className="text-[14px] md:text-[16px] text-[#374151] flex-1">
                          {point}
                        </span>
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    className={`
                      mt-auto pt-6 w-full py-3 px-6 rounded-lg font-semibold text-[14px] md:text-[16px]
                      transition-all duration-300
                      ${isHighlighted
                        ? "bg-[#116087] text-white hover:bg-[#0b4f70]"
                        : "bg-[#F1F6F8] text-[#116087] hover:bg-[#e2eef3]"
                      }
                    `}
                  >
                    Get Free Estimates
                  </button>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      {/* We're Here to Make It Easy Section */}
      <ResourceEasySection
        title={easySectionData.title}
        subtitle={easySectionData.subtitle}
        bullets={easySectionData.bullets}
        ctaText={easySectionData.ctaText}
        ctaButton={<ResourceQuoteButton />}
      />

      {/* Upper Content Block */}
      {resourcePage.upper_content && (
        <section className="py-12 md:py-16 px-4">
          <div
            className="max-w-5xl mx-auto text-[14px] md:text-[16px] text-[#374151] leading-7"
            dangerouslySetInnerHTML={renderHtmlContent(resourcePage.upper_content)}
          />
        </section>
      )}

      {/* Company Detail Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-[28px] md:text-[36px] font-bold text-[#111827] mb-6 urbanfont">
            {companyDetail.name}
          </h2>

          <ResourceCompanyCard
            name={companyDetail.name}
            logo={companyDetail.logo}
            rating={companyDetail.rating}
            tagline={companyDetail.tagline}
            features={companyDetail.features}
          />

          <div className="mt-8 space-y-5">
            {companyDetail.description.map((paragraph, index) => (
              <p
                key={index}
                className="text-[14px] md:text-[16px] text-[#374151] leading-7"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="mt-10 space-y-4">
            {companyDetail.accordions.map((accordion, index) => (
              <ResourceAccordion
                key={index}
                title={accordion.title}
                items={accordion.items}
                intro={accordion.intro}
                highlights={accordion.highlights}
                pros={accordion.pros}
                cons={accordion.cons}
                paragraphs={accordion.paragraphs}
                scenario={accordion.scenario}
                summary={accordion.summary}
                tables={accordion.tables}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Middle Content Block */}
      {resourcePage.middle_content && (
        <section className="py-12 md:py-16 px-4 bg-[#F8FAFB]">
          <div
            className="max-w-5xl mx-auto text-[14px] md:text-[16px] text-[#374151] leading-7"
            dangerouslySetInnerHTML={renderHtmlContent(resourcePage.middle_content)}
          />
        </section>
      )}

      {/* Compare Moving Container Companies Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-[26px] md:text-[36px] font-bold text-[#111827] mb-8 urbanfont">
            Compare the Best Moving Container Companies in USA
          </h2>

          <div className="border border-[#116087] rounded-xl overflow-hidden">
            <div className="hidden md:block overflow-x-auto">
              <table className="w-full min-w-[700px]">
                <thead className="bg-[#EAF6FA]">
                  <tr>
                    <th className="text-left px-6 py-4 text-[14px] md:text-[16px] font-semibold text-[#111827] border-b border-[#116087]/20 w-1/4">
                      Company
                    </th>
                    <th className="text-center px-6 py-4 text-[14px] md:text-[16px] font-semibold text-[#111827] border-b border-[#116087]/20 w-1/4">
                      Rating
                    </th>
                    <th className="text-center px-6 py-4 text-[14px] md:text-[16px] font-semibold text-[#111827] border-b border-[#116087]/20 w-1/4">
                      Service Availability
                    </th>
                    <th className="text-right px-6 py-4 text-[14px] md:text-[16px] font-semibold text-[#111827] border-b border-[#116087]/20 w-1/4">
                      Quote
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {bottom_movers.map((mover: ResourceBottomMover) => {
                    const company = findCompanyById(companies, mover.company_id);
                    if (!company) return null;
                    const rating = formatRating(company.average_rating, 0);

                    return (
                      <tr key={mover.id} className="bg-white border-b border-gray-100">
                        <td className="px-6 py-5">
                          <div className="relative w-[140px] h-[50px]">
                            <Image
                              src={getCompanyImageUrl(company.image)}
                              alt={company.company_name}
                              fill
                              className="object-contain object-left"
                              unoptimized
                            />
                          </div>
                        </td>
                        <td className="px-6 py-5">
                          <div className="flex items-center justify-center gap-2">
                            <span className="font-semibold text-[#111827] text-[16px]">
                              {rating.toFixed(1)}/5
                            </span>
                            <StarRating rating={rating} size={16} />
                          </div>
                        </td>
                        <td className="px-6 py-5 text-center text-[14px] md:text-[16px] text-[#374151]">
                          Excellent
                        </td>
                        <td className="px-6 py-5 text-right">
                          <button
                            type="button"
                            className="bg-[#116087] text-white px-5 py-2.5 rounded-lg font-semibold text-[14px] hover:bg-[#0b4f70] transition-colors"
                          >
                            Get Estimate
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="md:hidden">
              {bottom_movers.map((mover: ResourceBottomMover) => {
                const company = findCompanyById(companies, mover.company_id);
                if (!company) return null;
                const rating = formatRating(company.average_rating, 0);

                return (
                  <div key={mover.id} className="p-5 border-b border-gray-100 last:border-b-0">
                    <div className="flex items-center justify-between gap-4 mb-4">
                      <div className="relative w-[120px] h-[40px]">
                        <Image
                          src={getCompanyImageUrl(company.image)}
                          alt={company.company_name}
                          fill
                          className="object-contain object-left"
                          unoptimized
                        />
                      </div>
                      <span className="text-[14px] text-[#374151]">Excellent</span>
                    </div>

                    <div className="flex items-center gap-2 mb-4">
                      <span className="font-semibold text-[#111827]">{rating.toFixed(1)}/5</span>
                      <StarRating rating={rating} size={16} />
                    </div>

                    <button
                      type="button"
                      className="w-full bg-[#116087] text-white px-5 py-2.5 rounded-lg font-semibold text-[14px] hover:bg-[#0b4f70] transition-colors"
                    >
                      Get Estimate
                    </button>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Bottom Content Block */}
      {resourcePage.bottom_content && (
        <section className="py-12 md:py-16 px-4 bg-[#F8FAFB]">
          <div
            className="max-w-5xl mx-auto text-[14px] md:text-[16px] text-[#374151] leading-7"
            dangerouslySetInnerHTML={renderHtmlContent(resourcePage.bottom_content)}
          />
        </section>
      )}

      {/* Full Service Content Block */}
      {resourcePage.full_service_content && (
        <section className="py-12 md:py-16 px-4">
          <div
            className="max-w-5xl mx-auto text-[14px] md:text-[16px] text-[#374151] leading-7"
            dangerouslySetInnerHTML={renderHtmlContent(resourcePage.full_service_content)}
          />
        </section>
      )}

      {/* Other Service Content Block */}
      {resourcePage.other_service_content && (
        <section className="py-12 md:py-16 px-4 bg-[#F8FAFB]">
          <div
            className="max-w-5xl mx-auto text-[14px] md:text-[16px] text-[#374151] leading-7"
            dangerouslySetInnerHTML={renderHtmlContent(resourcePage.other_service_content)}
          />
        </section>
      )}

      {/* Bottom Movers Detail Cards */}
      {bottom_movers.length > 0 && (
        <section className="py-12 md:py-20 px-4">
          <div className="max-w-5xl mx-auto space-y-10">
            {bottom_movers.map((mover: ResourceBottomMover) => {
              const company = findCompanyById(companies, mover.company_id);
              return (
                <div key={mover.id}>
                  <h3 className="text-[22px] md:text-[28px] font-bold text-[#111827] mb-4 urbanfont">
                    {mover.heading}
                  </h3>
                  {mover.content && (
                    <div
                      className="text-[14px] md:text-[16px] text-[#374151] leading-7"
                      dangerouslySetInnerHTML={renderHtmlContent(mover.content)}
                    />
                  )}
                  {company && (
                    <div className="mt-4 p-4 bg-[#F8FAFB] rounded-xl">
                      <p className="text-[14px] md:text-[16px] text-[#374151]">
                        <strong>{company.company_name}</strong> — {company.city.name}, {company.state.abv}
                      </p>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </section>
      )}

      {/* Things to Keep in Mind Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-[26px] md:text-[36px] font-bold text-[#111827] mb-6 urbanfont">
            {thingsToKeepInMind.title}
          </h2>

          <div className="space-y-4 mb-8">
            {thingsToKeepInMind.intro.map((paragraph, index) => (
              <p
                key={index}
                className="text-[14px] md:text-[16px] text-[#374151] leading-7"
              >
                {paragraph}
              </p>
            ))}
          </div>

          <div className="space-y-4">
            {thingsToKeepInMind.items.map((item, index) => (
              <div
                key={index}
                className="border border-gray-200 rounded-xl p-5 md:p-6 bg-white"
              >
                <h3 className="text-[18px] md:text-[22px] font-semibold text-[#111827] mb-2 urbanfont">
                  {item.title}
                </h3>
                <p className="text-[14px] md:text-[16px] text-[#374151] leading-7">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How Much Do Moving Containers Cost Section */}
      <section className="py-12 md:py-20 px-4 bg-[#F8FAFB]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-[26px] md:text-[36px] font-bold text-[#111827] mb-4 urbanfont">
            {movingContainerCost.title}
          </h2>

          <p className="text-[14px] md:text-[16px] text-[#374151] leading-7 mb-10">
            {movingContainerCost.intro}
          </p>

          <div className="space-y-10">
            {movingContainerCost.sections.map((section, sectionIndex) => (
              <div key={sectionIndex}>
                <h3 className="text-[20px] md:text-[24px] font-semibold text-[#111827] mb-2 urbanfont">
                  {section.title}
                </h3>

                <p
                  className="text-[14px] md:text-[16px] text-[#374151] leading-7 mb-5"
                  dangerouslySetInnerHTML={renderHtmlContent(section.description)}
                />

                <div className="overflow-x-auto">
                  <table className="w-full min-w-[600px] border border-gray-200 rounded-xl overflow-hidden">
                    <thead className="bg-[#EAF6FA]">
                      <tr>
                        {section.table.headers.map((header, headerIndex) => (
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
                      {section.table.rows.map((row, rowIndex) => (
                        <tr
                          key={rowIndex}
                          className={rowIndex % 2 === 0 ? "bg-white" : "bg-[#F8FAFB]"}
                        >
                          {row.map((cell, cellIndex) => (
                            <td
                              key={cellIndex}
                              className="px-4 py-3 text-[14px] md:text-[16px] text-[#374151] border-b border-gray-200 align-top"
                              dangerouslySetInnerHTML={renderHtmlContent(cell)}
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
        </div>
      </section>

      {/* What To Ask and Consider Section */}
      <section className="py-12 md:py-20 px-4">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-[26px] md:text-[36px] font-bold text-[#111827] mb-4 urbanfont">
            {whatToAsk.title}
          </h2>

          <p className="text-[14px] md:text-[16px] text-[#374151] leading-7 mb-6">
            {whatToAsk.intro}
          </p>

          <ul className="space-y-3">
            {whatToAsk.questions.map((question, index) => (
              <li
                key={index}
                className="flex items-start gap-3 text-[14px] md:text-[16px] text-[#374151] leading-7"
              >
                <span className="w-2 h-2 rounded-full bg-[#116087] mt-2 shrink-0" />
                <span dangerouslySetInnerHTML={renderHtmlContent(question)} />
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Moving Container Sizes Section */}
      <section className="py-12 md:py-20 px-4 bg-[#F8FAFB]">
        <div className="max-w-5xl mx-auto">
          <h2 className="text-[26px] md:text-[36px] font-bold text-[#111827] mb-6 urbanfont">
            {movingContainerSizes.title}
          </h2>

          <div className="space-y-4 mb-8">
            {movingContainerSizes.paragraphs.map((paragraph, index) => (
              <p
                key={index}
                className="text-[14px] md:text-[16px] text-[#374151] leading-7"
                dangerouslySetInnerHTML={renderHtmlContent(paragraph)}
              />
            ))}
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[700px] border border-gray-200 rounded-xl overflow-hidden">
              <thead className="bg-[#EAF6FA]">
                <tr>
                  {movingContainerSizes.table.headers.map((header, index) => (
                    <th
                      key={index}
                      className="text-left px-4 py-3 text-[14px] md:text-[16px] font-semibold text-[#111827] border-b border-gray-200"
                    >
                      {header}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {movingContainerSizes.table.rows.map((row, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className={rowIndex % 2 === 0 ? "bg-white" : "bg-[#F8FAFB]"}
                  >
                    {row.map((cell, cellIndex) => (
                      <td
                        key={cellIndex}
                        className="px-4 py-3 text-[14px] md:text-[16px] text-[#374151] border-b border-gray-200 align-top"
                        dangerouslySetInnerHTML={renderHtmlContent(cell)}
                      />
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <p className="mt-6 text-[14px] md:text-[16px] text-[#374151] leading-7">
            {movingContainerSizes.note}
          </p>
        </div>
      </section>

      {/* FAQs Section */}
      <Faqs
        heading="Frequently Asked Questions (FAQs)"
        faqs={faqs}
        questionBgColor="#FFFFFF"
        textColor="#000000"
      />
    </main>
  );
}
