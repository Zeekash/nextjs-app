import Image from "next/image";
import { FaUser } from "react-icons/fa6";

import Breadcrumbs from "@/components/frontend/BreadCrumbs";
import MovingCalculator from "@/components/frontend/MovingCalculator";
import Faqs from "@/components/frontend/Faqs";
import { getPost } from "@/server/blogs";

export function getTableOfContents(html: string) {
  const toc: any[] = [];
  const stack: any[] = [];

  const updatedHtml = html.replace(
    /<h([1-6])[^>]*>(.*?)<\/h\1>/gis,
    (_, level, content) => {
      const title = content.replace(/<[^>]+>/g, "").trim();

      if (!title) return _;

      const id = title
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-+|-+$/g, "");

      const item = {
        title,
        id,
        subheadings: [],
      };

      while (stack.length && stack.at(-1).level >= Number(level)) {
        stack.pop();
      }

      stack.length
        ? stack.at(-1).item.subheadings.push(item)
        : toc.push(item);

      stack.push({
        level: Number(level),
        item,
      });

      return `<h${level} id="${id}">${content}</h${level}>`;
    }
  );

  return {
    tableOfContents: toc,
    updatedHtml,
  };
}

function flattenTableOfContents(items: any[], depth = 0): any[] {
  return items.flatMap((item) => [
    {
      ...item,
      depth,
    },
    ...flattenTableOfContents(item.subheadings || [], depth + 1),
  ]);
}

async function fetchBackendCss(): Promise<string> {
  try {
    const res = await fetch("http://localhost:8000/assets/css/post-show.css", {
      next: { revalidate: 3600 },
    });
    if (!res.ok) return "";
    return await res.text();
  } catch {
    return "";
  }
}

const BlogPage = async ({ params }: any) => {
  const { slug } = await params;

  const data = await getPost(slug);
  const post = data.post;
  const faqs = data.faqs;
  // const image = await `http://localhost:8000/public/posts/image/${post.image}`;
  const image_alt = post.img_alt

  const { tableOfContents, updatedHtml } = getTableOfContents(
    post.body || ""
  );
  const backendCss = await fetchBackendCss();
  const flattenedTable = flattenTableOfContents(tableOfContents);
  const visibleHeadings = flattenedTable.slice(0, 5);
  const hiddenHeadings = flattenedTable.slice(5);

  const category = data.categories?.find(
    (item: any) => item.id === post.post_category_id
  );

  const breadcrumbs = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Blogs",
      href: "/blogs",
    },
    {
      label: category?.name || "Blog",
      href: category ? `/category/${category.slug}` : "/blogs",
    },
    {
      label: post.title || "Blog Post",
    },
  ];

  console.log("Admin Name:", post.admin_id);
  const publishedName =
    post.published_by?.name || post.admin?.name || "Admin";

  const publishedImage =
    post.published_by?.image || post.admin?.image || null;

  const editedName =
    post.edited_by?.name || "My Moving Journey";

  const editedImage = post.edited_by?.image || null;

  const publishedDate = post.published_at
    ? new Date(post.published_at).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
    : "Not available";

  const updatedDate = post.updated_at
    ? new Date(post.updated_at).toLocaleDateString("en-US", {
      month: "short",
      day: "2-digit",
      year: "numeric",
    })
    : "Not available";

  return (
    <main className="flex w-full flex-col items-center justify-center bg-white px-3 pb-4 pt-[110px] sm:px-4">
      {/* Blog header */}
      <section className="flex w-full max-w-[1070px] flex-col items-start rounded-[10px] bg-[#eaf8fd] px-4 pb-4 pt-8 sm:px-5 sm:pt-10 lg:mt-[10px] lg:px-6">
        <Breadcrumbs items={breadcrumbs} />

        <h1 className="mt-[14px] w-full text-left font-serif text-[30px] font-bold leading-[1.08] tracking-[-0.7px] text-black sm:text-[36px] lg:text-[42px]">
          {post.title || "Blog Post"}
        </h1>

        <div className="mt-6 flex w-full flex-col items-start gap-4 sm:flex-row sm:items-center sm:gap-0">
          {/* Published By */}
          <div className="flex items-center">
            <div className="relative flex size-[27px] shrink-0 items-center justify-center overflow-hidden rounded-full bg-[#247da5] text-white">
              {publishedImage ? (
                <Image
                  src={publishedImage}
                  alt={publishedName}
                  fill
                  sizes="27px"
                  className="object-cover"
                />
              ) : (
                <FaUser className="text-[15px]" />
              )}
            </div>

            <div className="ml-2 flex flex-col items-start">
              <p className="flex flex-wrap items-center gap-x-1 text-[13px] leading-[16px] text-black">
                <span className="font-bold">Published By:</span>
                <span>{publishedName}</span>
              </p>

              <p className="mt-[2px] text-[9px] leading-[12px] text-[#52646d]">
                Published: {publishedDate}
              </p>
            </div>
          </div>

          {/* Edited By */}
          <div className="flex items-center sm:ml-5 sm:border-l sm:border-[#9bb5bf] sm:pl-5">
            <div className="relative flex size-[27px] shrink-0 items-center justify-center overflow-hidden rounded-[7px] bg-[#247da5] text-white">
              {editedImage ? (
                <Image
                  src={editedImage}
                  alt={editedName}
                  fill
                  sizes="27px"
                  className="object-cover"
                />
              ) : (
                <FaUser className="text-[15px]" />
              )}
            </div>

            <div className="ml-2 flex flex-col items-start">
              <p className="flex flex-wrap items-center gap-x-1 text-[13px] leading-[16px] text-black">
                <span className="font-bold">Edited By:</span>
                <span>{editedName}</span>
              </p>

              <p className="mt-[2px] text-[9px] leading-[12px] text-[#52646d]">
                Updated: {updatedDate}
              </p>
            </div>
          </div>
        </div>

        <div className="mt-6 flex w-full min-w-0">
          <MovingCalculator />
        </div>
      </section>

      <section className="pt-4 m-0 flex justify-center">
        <img
          src={`http://localhost:8000/public/posts/image/${post.image}`}
          alt={image_alt}
          className="lg:h-[63vh] w-[80vw] object-contain md:h-[50vh] sm:h-[40vh] max-sm:h-[34vh]"
        />

      </section>

      {/* Table of Contents */}
      {flattenedTable.length > 0 && (
        <section className="mt-8 w-full max-w-[1070px]">
          <div className="overflow-hidden rounded-[12px] border border-[#c5d7df] bg-[#dcebf1]">
            <input
              type="checkbox"
              id="toc-toggle"
              className="peer sr-only"
            />

            <div className="border-l-4 border-[#086a96] px-6 pb-5 pt-5 sm:px-7">
              <h2 className="mb-4 font-serif text-[26px] font-medium text-[#08618c] sm:text-[30px]">
                Table of Contents
              </h2>

              <ul className="list-disc space-y-4 pl-8 text-[16px] text-black sm:text-[18px]">
                {visibleHeadings.map((item, index) => (
                  <li
                    key={`${item.id}-${index}`}
                    style={{
                      marginLeft: `${item.depth * 18}px`,
                    }}
                  >
                    <a
                      href={`#${item.id}`}
                      className="transition-colors duration-200 hover:text-[#086a96]"
                    >
                      {item.title}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {hiddenHeadings.length > 0 && (
              <div className="grid grid-rows-[0fr] border-l-4 border-[#086a96] opacity-0 transition-all duration-500 ease-in-out peer-checked:grid-rows-[1fr] peer-checked:opacity-100">
                <div className="overflow-hidden">
                  <ul className="list-disc space-y-4 px-6 pb-5 pl-14 text-[16px] text-black sm:px-7 sm:pl-[60px] sm:text-[18px]">
                    {hiddenHeadings.map((item, index) => (
                      <li
                        key={`${item.id}-${index}`}
                        style={{
                          marginLeft: `${item.depth * 18}px`,
                        }}
                      >
                        <a
                          href={`#${item.id}`}
                          className="transition-colors duration-200 hover:text-[#086a96]"
                        >
                          {item.title}
                        </a>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            )}

            {hiddenHeadings.length > 0 && (
              <>
                <label
                  htmlFor="toc-toggle"
                  className="block w-full cursor-pointer bg-[#086a96] px-8 py-2 text-left font-semibold text-white transition-colors duration-300 hover:bg-[#075777] peer-checked:hidden"
                >
                  Show More
                </label>

                <label
                  htmlFor="toc-toggle"
                  className="hidden w-full cursor-pointer bg-[#086a96] px-8 py-2 text-left font-semibold text-white transition-colors duration-300 hover:bg-[#075777] peer-checked:block"
                >
                  Show Less
                </label>
              </>
            )}
          </div>
        </section>
      )}

      {/* Blog HTML */}
      <section className="mt-8 w-full max-w-[1070px]">
        {/* Define the CSS variables the backend CSS relies on, then inject it */}
        <style dangerouslySetInnerHTML={{
          __html: `
            @import url('https://fonts.googleapis.com/css2?family=Urbanist:ital,wght@0,100..900;1,100..900&display=swap');

            .blog-content {
              --family: 'Urbanist', sans-serif;
              --para-family: 'Urbanist', sans-serif;
              --color: #116087;
              --bg: #116087;
              font-family: 'Urbanist', sans-serif;
            }

            /* Fix Tailwind resetting standard elements */
            .blog-content h1 { font-size: 2.5em; font-weight: 700; margin: 1em 0 0.5em; }
            .blog-content h2 { font-size: 2em; font-weight: 700; margin: 1em 0 0.5em; }
            .blog-content h3 { font-size: 1.75em; font-weight: 700; margin: 1em 0 0.5em; }
            .blog-content h4 { font-size: 1.5em; font-weight: 700; margin: 1em 0 0.5em; }
            .blog-content h5 { font-size: 1.25em; font-weight: 700; margin: 1em 0 0.5em; }
            .blog-content h6 { font-size: 1em; font-weight: 700; margin: 1em 0 0.5em; }

            .blog-content table { width: 100%; border-collapse: collapse; margin: 1.5em 0; }
            .blog-content table th, .blog-content table td { border: 1px solid #cbd5e1; padding: 0.75em; text-align: left; }
            .blog-content table th { background-color: #f1f5f9; font-weight: 600; }
            
            .blog-content ul { list-style-type: disc; padding-left: 1.5em; margin: 1em 0; }
            .blog-content ol { list-style-type: decimal; padding-left: 1.5em; margin: 1em 0; }
            .blog-content img { max-width: 100%; height: auto; }

            ${backendCss}
          `
        }} />
        <div
          id="content"
          className="blog-content"
          dangerouslySetInnerHTML={{ __html: updatedHtml }}
        />
      </section>

      {/* Calculator */}
      <section className="mt-8 w-full max-w-[1070px]">
        <MovingCalculator />
      </section>

      {/* FAQs */}
      <section className="mt-15 w-[60vw] md:w-[90vw] max-sm:w-[90vw]">
        <Faqs
          faqs={faqs}
          questionBgColor="#006b9f"
          textColor="#ffffff"
        />
      </section>
    </main>
  );
};

export default BlogPage;