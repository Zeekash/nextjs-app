"use server";

interface Company {
  id: string;
  name: string;
  email: string;
}

export async function get(): Promise<Company[]> {
  const res = await fetch(`${process.env.APP_URL}/companies`, {
    cache: "no-store",
  });

  return await res.json();
}