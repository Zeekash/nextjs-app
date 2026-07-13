"use client";

import { useState } from "react";
import { getAllCompanies, searchCompanies } from "@/server/company";
import type { Company, CompaniesResponse } from "@/types/company";
import CompanyCard from "./CompanyCard";

type Props = {
  initialCompanies: Company[];
};

function normalizeCompaniesResponse(result: any): CompaniesResponse {
  return {
    data: Array.isArray(result?.data) ? result.data : [],
    current_page: Number(result?.current_page || 1),
    last_page: Number(result?.last_page || 1),
    links: result?.links || "",
  };
}

export default function SearchBox({ initialCompanies }: Props) {
  const [search, setSearch] = useState("");
  const [companies, setCompanies] = useState(initialCompanies);
  const [loading, setLoading] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);

  async function handleSearch() {
    try {
      setLoading(true);

      const keyword = search.trim();

      if (!keyword) {
        const response = normalizeCompaniesResponse(
          await getAllCompanies()
        );

        setCompanies(response.data);
        setHasSearched(false);
        return;
      }

      const response = normalizeCompaniesResponse(
        await searchCompanies(keyword)
      );

      setCompanies(response.data);
      setHasSearched(true);
    } catch {
      setCompanies([]);
      setHasSearched(true);
    } finally {
      setLoading(false);
    }
  }

  const title = hasSearched
    ? `Result Found: ${companies.length}`
    : `Total Companies: ${companies.length}`;

  return (
    <section className="w-full flex flex-col items-center justify-center mt-40 md:mt-40 sm:mt-35 max-sm:mt-30">
      <div className="w-[65vw] flex flex-col md:w-[85vw] lg:w-[65vw] sm:w-[90vw] max-sm:w-[95vw]">

        <div className="w-full rounded-[20px] bg-[linear-gradient(45deg,#116087,#4c94a25e)] px-5 py-10 text-center mb-14">

          <h1 className="font-serif text-[34px] md:text-[46px] font-bold text-[#111] mb-7">
            Search Company
          </h1>

          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSearch();
            }}
            className="w-full max-w-[960px] mx-auto flex flex-col sm:flex-row gap-3"
          >
            <input
              type="search"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search..."
              autoComplete="off"
              className="w-full h-[55px] rounded-lg bg-white px-5 text-[16px] outline-none"
            />

            <button
              type="submit"
              disabled={loading}
              className="h-[55px] min-w-[110px] rounded-lg bg-[#116087] px-6 text-white font-bold hover:bg-[#1e6581]"
            >
              {loading ? "Searching..." : "Search"}
            </button>
          </form>
        </div>

        <div className="flex items-center gap-1 mb-9">
          <h3 className="font-serif text-[22px] md:text-[24px] font-bold">
            {title}
          </h3>
        </div>

        {companies.length === 0 ? (
          <div className="w-full rounded-[15px] border border-[#c8e0eb] text-center text-[20px] font-semibold">
            {loading ? "Loading companies..." : "No company found."}
          </div>
        ) : (
          <div className="flex flex-row gap-7 max-sm:flex-col">
            {companies.map((company) => (
              <CompanyCard
                key={company.id}
                company={company}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}