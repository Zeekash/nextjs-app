export async function getBlogsByCategory(
  slug: string,
  page: number = 1
): Promise<any> {
  const res = await fetch(
    `${process.env.APP_URL}/category/${slug}?page=${page}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch blogs by category");
  }

  const json = await res.json();

  return json.data;
}