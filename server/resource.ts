"use server";

import type { ApiResponse, ResourcePageResponse } from "@/app/(frontend)/resource/[slug]/resource";

function getBaseUrl(): string {
  const envUrl = process.env.APP_URL || process.env.NEXT_PUBLIC_APP_URL;
  if (envUrl) {
    return envUrl.replace(/\/$/, "");
  }
  return "http://localhost:8000";
}

export async function getResourcePageBySlug(
  slug: string
): Promise<ResourcePageResponse | null> {
  try {
    const url = `http://localhost:8000/api/resource-page/${slug}`;
    console.log("Fetching resource page:", url);

    const res = await fetch(url, {
      cache: "no-store",
    });

    if (!res.ok) {
      console.error("Resource page fetch failed:", res.status, res.statusText);
      return null;
    }

    const json: ApiResponse<ResourcePageResponse> = await res.json();

    if (!json.success) {
      console.error("Resource page API returned success=false");
      return null;
    }

    return json.data;
  } catch (error) {
    console.error("Resource page fetch error:", error);
    return null;
  }
}
