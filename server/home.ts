"use server";

import { HomeResponse } from "@/types/home";

export async function getHomeData(): Promise<HomeResponse> {
  const res = await fetch(`${process.env.APP_URL}/home`, {
    cache: "no-store",
  });

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  const json = await res.json();

  return json.data;
}