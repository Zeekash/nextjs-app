import type { ResourceCompany, ResourceTopMover } from "@/app/(frontend)/resource/[slug]/resource";

const DEFAULT_IMAGE_BASE_URL = "http://localhost:8000";

export function getCompanyImageUrl(
  image: string,
  baseUrl = DEFAULT_IMAGE_BASE_URL
): string {
  if (!image) return "";
  if (image.startsWith("http://") || image.startsWith("https://")) {
    return image;
  }
  return `${baseUrl.replace(/\/$/, "")}/${image}`;
}

export function findCompanyById(
  companies: ResourceCompany[],
  companyId: number
): ResourceCompany | undefined {
  return companies.find((company) => company.id === companyId);
}

export function getMoverPoints(mover: ResourceTopMover): string[] {
  return [mover.point_one, mover.point_two, mover.point_three].filter(
    Boolean
  );
}

export function formatRating(
  rating: number | null | undefined,
  fallback = 0
): number {
  return rating ?? fallback;
}

export function renderHtmlContent(html: string): {
  __html: string;
} {
  return { __html: html };
}
