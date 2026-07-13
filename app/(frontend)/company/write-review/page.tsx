import { getAllCompanies } from "@/server/company";
import type { CompaniesResponse } from "@/types/company";
import SearchBox from "./SearchBox";

function normalizeCompaniesResponse(result: any): CompaniesResponse {
  return {
    data: Array.isArray(result?.data) ? result.data : [],
    current_page: Number(result?.current_page || 1),
    last_page: Number(result?.last_page || 1),
    links: result?.links || "",
  };
}

export default async function Page() {
  const response = normalizeCompaniesResponse(await getAllCompanies());

  return (
    <SearchBox
      initialCompanies={response.data}
    />
  );
}