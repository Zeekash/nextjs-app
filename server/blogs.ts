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
 console.log("json.data", json.data);
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

export async function getPost(slug: string): Promise<any> {
  if (!slug) {
    throw new Error("Post slug is required");
  }

  const res = await fetch(
    `${process.env.APP_URL}/blogs/${slug}`,
    {
      cache: "no-store",
    }
  );

  if (res.status === 404) {
    return null;
  }

  if (!res.ok) {
    throw new Error(`Failed to fetch post data: ${res.status}`);
  }

  const json = await res.json();

  return json.data;
}
