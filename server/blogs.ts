"use server";

export  async function getBlogMetaData(page = 1): Promise<any> {
  const res = await fetch(
    `${process.env.APP_URL}/blogs?page=${page}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch");
  }

  const json = await res.json();

  return json.data;
}


export  async function getBlogPost(slug: string): Promise<any> {
  const res = await fetch(
    `${process.env.APP_URL}/blogs/${slug}`,
    { cache: "no-store" }
  );

  if (!res.ok) {
    throw new Error("Failed to fetch blog post");
  }

  const json = await res.json();

  return json.data;
}