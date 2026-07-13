import type { CompanyShowApiResponse,CompaniesResponse } from "@/types/company";

export type CompanyShowQuery = {
    sort?: string;
    page?: string | number;
    id?: string | number;
};

function getBaseUrl() {
    const baseUrl = process.env.APP_URL;

    if (!baseUrl) {
        throw new Error("APP_URL is missing in .env.local");
    }

    return baseUrl.replace(/\/+$/, "");
}

async function safeJson(res: Response) {
    try {
        return await res.json();
    } catch {
        return {};
    }
}

export function getBackendBaseUrl() {
    return getBaseUrl().replace(/\/api\/?$/, "");
}

export function assetUrl(path?: string | null) {
    if (!path) return null;

    if (/^https?:\/\//i.test(path)) {
        return path;
    }

    const cleanPath = String(path)
        .replace(/^\/+/, "")
        .replace(/^public\//, "storage/");

    return `${getBackendBaseUrl()}/${cleanPath}`;
}

export function companyImageUrl(path?: string | null) {
    if (!path) return `${getBackendBaseUrl()}/assets/img/mmj-favicon.png`;

    if (/^https?:\/\//i.test(path)) {
        return path;
    }

    const cleanPath = String(path).replace(/^\/+/, "");

    if (
        cleanPath.startsWith("companies/image/") ||
        cleanPath.startsWith("storage/") ||
        cleanPath.startsWith("assets/") ||
        cleanPath.startsWith("img/")
    ) {
        return `${getBackendBaseUrl()}/${cleanPath}`;
    }

    return `${getBackendBaseUrl()}/companies/image/${cleanPath}`;
}

export async function getCompanyShow(
    slug: string,
    query: CompanyShowQuery = {}
): Promise<CompanyShowApiResponse | null> {
    const params = new URLSearchParams();

    if (query.sort) {
        params.set("sort", String(query.sort));
    }

    if (query.page) {
        params.set("page", String(query.page));
    }

    if (query.id) {
        params.set("id", String(query.id));
    }

    const queryString = params.toString();

    const url = `${getBaseUrl()}/mover/${encodeURIComponent(slug)}${
        queryString ? `?${queryString}` : ""
    }`;

    const res = await fetch(url, {
        cache: "no-store",
        headers: {
            Accept: "application/json",
        },
    });

    const data = await safeJson(res);

    if (res.status === 404) {
        console.error("Company API 404:", {
            url,
            response: data,
        });

        return null;
    }

    if (!res.ok) {
        console.error("Company API Error:", {
            url,
            status: res.status,
            response: data,
        });

        throw new Error(`Failed to fetch company details. Status: ${res.status}`);
    }

    return data as CompanyShowApiResponse;
}

  const baseUrl =
    process.env.NEXT_PUBLIC_APP_URL || "http://localhost:8000/api";


export async function getAllCompanies(): Promise<CompaniesResponse> {
  const response = await fetch(`${baseUrl}/company/search`, {
    method: "GET",
    headers: {
      Accept: "application/json",
    },
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error("Failed to fetch all companies");
  }

  const result = await response.json();

  return result;
}

/**
 * Search companies by company name
 * API: /api/company/search/{companyName}
 */
export async function searchCompanies(
  companyName: string
): Promise<CompaniesResponse> {

   const encodedCompanyName = encodeURIComponent(companyName.trim());
  const response = await fetch(
    `${baseUrl}/company/search?search=${encodedCompanyName}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
      cache: "no-store",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to search companies");
  }

  const result = await response.json();
  return result
 
}