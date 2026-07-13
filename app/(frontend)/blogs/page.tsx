import Link from "next/link";
import { FiPhoneCall } from "react-icons/fi";
import BlogCard from "@/components/frontend/Blogcard";
import SearchBar from "@/components/frontend/BlogSearchBar";
import { getBlogMetaData } from "@/server/blogs";

export default async function BlogPage({ searchParams }: any) {
  const resolvedParams = await searchParams;
  const page = Number(resolvedParams?.page || 1);
  const search = resolvedParams?.search || "";

  const data = await getBlogMetaData(page);

  const blogs = data.posts.data;
  const categories = data.categories;
  const popularArticles = data.featured_posts;
  console.log("articles:", popularArticles)
  const filteredBlogs = search
    ? blogs.filter((blog: any) =>
      `${blog.title} ${blog.description}`
        .toLowerCase()
        .includes(search.toLowerCase())
    )
    : blogs;


  const webPageJsonLd = {
    "@context": "http://schema.org",
    "@type": "WebPage",
    name: "Moving Blogs | My Moving Journey",
    url: "https://mymovingjourney.com/blogs",
    description: "Read our latest moving blogs and tips from experts to help you prepare for your next move.",
  };

  const breadcrumbJsonLd = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        item: {
          "@id": "https://mymovingjourney.com",
          name: "Home",
        },
      },
      {
        "@type": "ListItem",
        position: 2,
        item: {
          "@id": "https://mymovingjourney.com/blogs",
          name: "Blogs",
        },
      },
    ],
  };

  const webSiteJsonLd = {
    "@context": "https://schema.org/",
    "@type": "WebSite",
    name: "MyMovingJourney",
    url: "https://mymovingjourney.com",
    potentialAction: {
      "@type": "SearchAction",
      target: "https://www.mymovingjourney.com/company-search?search={search}",
      "query-input": "required name=search",
    },
  };

  return (
    <>
      {/* HERO (UNCHANGED) */}
      <section
        className="h-48  max-sm:h-70 sm:h-75 lg:h-96 bg-cover bg-center relative "
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1588279294076-00c6196adc27?q=80&w=1175&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/40" />

        <div className="relative max-w-7xl mx-auto h-full flex items-center px-4 sm:px-6 lg:px-8">
          <div className="text-white">
            <div className="flex items-center gap-2 text-sm opacity-90">
              <Link href="/">Home</Link>
              <span>➜</span>
              <Link href="/blogs">Blogs</Link>
            </div>
            <h1 className="mt-2 text-3xl sm:text-4xl lg:text-5xl font-bold">
              Moving Blogs
            </h1>
          </div>
        </div>
      </section>

      <div className="bg-gray-50 py-8 sm:py-10 lg:py-14">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-4 lg:flex-row">

            {/* MAIN */}
            <main className="min-w-0 flex-1 space-y-6 lg:pr-12">
              <div className="flex flex-wrap items-stretch gap-6">
                {filteredBlogs.map((blog: any, i: number) => {
                  const author = data.authors?.find((a: any) => a.id === blog.admin_id);
                  const authorName = author ? author.name : "N/A";
                  const date = blog.created_at
                    ? new Date(blog.created_at).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })
                    : "";

                  return (
                    <Link
                      key={blog.slug || i}
                      href={`/blogs/${blog.slug}`}
                      className="flex w-full sm:w-[48%]"
                    >
                      <BlogCard
                        className="h-full w-full"
                        title={blog.title}
                        description={blog.description}
                        image={`${process.env.ASSET_URL}/public/posts/image/${blog.image}`}
                        category="Blog"
                        author={authorName}
                        date={date}
                        slug={blog.slug}
                      />
                    </Link>
                  );
                })}
              </div>

              {/* PAGINATION */}
{data.posts.last_page > 1 && (
  <div className="mt-10 flex items-center justify-center gap-3">

    {/* Previous */}
    <Link
      href={`/blogs?page=${Math.max(page - 1, 1)}`}
      className={`flex h-10 w-10 items-center justify-center rounded-full border text-lg
      ${
        page === 1
          ? "pointer-events-none opacity-40"
          : "bg-[#116087] text-white"
      }`}
    >
      ‹
    </Link>


    {/* Pages */}
    {Array.from(
      { length: data.posts.last_page },
      (_, i) => i + 1
    )
      .filter((p) => {
        // show first 6 pages
        if (p <= 6) return true;

        // show last 3 pages
        if (p >= data.posts.last_page - 2) return true;

        // current page area
        if (
          p >= page - 1 &&
          p <= page + 1
        )
          return true;

        return false;
      })
      .map((p, index, arr) => {

        // add dots
        const previous = arr[index - 1];

        return (
          <div key={p} className="flex items-center gap-3">

            {previous && p - previous > 1 && (
              <span className="text-xl text-slate-600">
                ...
              </span>
            )}

            <Link
              href={`/blogs?page=${p}`}
              className={`flex h-10 w-10 items-center justify-center rounded-full border text-sm font-medium
              ${
                page === p
                  ? "bg-[#116087] text-white border-[#116087]"
                  : "bg-white text-slate-800 hover:bg-slate-100"
              }`}
            >
              {p}
            </Link>

          </div>
        );
      })}


    {/* Next */}
    <Link
      href={`/blogs?page=${Math.min(
        page + 1,
        data.posts.last_page
      )}`}
      className={`flex h-10 w-10 items-center justify-center rounded-full border text-lg
      ${
        page === data.posts.last_page
          ? "pointer-events-none opacity-40"
          : "bg-[#116087] text-white"
      }`}
    >
      ›
    </Link>

  </div>
)}
            </main>

            {/* SIDEBAR (UNCHANGED UI) */}
            <aside className="w-full space-y-5 lg:w-80 lg:shrink-0">

              <section className="rounded-2xl flex flex-col gap-4 bg-white p-4 shadow-sm sm:p-5">
                <SearchBar />

                <div
                  className="p-5 text-center shadow-sm"
                  style={{ backgroundColor: "#116087", color: "#ffffff" }}
                >
                  <h2 className="text-xl font-semibold">
                    Get a Quick Moving Quote
                  </h2>

                  <a
                    href="tel:+17869803050"
                    className="mt-3 flex items-center justify-center gap-2 text-2xl font-bold"
                  >
                    <FiPhoneCall />
                    <span>(786) 980-3050</span>
                  </a>

                  <p className="mt-3 text-sm font-bold" style={{ color: "#BDB6B6" }}>
                    Speak with an expert 24/7
                  </p>
                </div>
              </section>

              <section className="rounded-2xl p-4 shadow-sm sm:p-5" style={{ backgroundColor: "#e7eff1" }}>
                <h2 className="text-lg font-semibold text-slate-900">
                  Categories
                </h2>

                <div className="mt-4 space-y-3">
                  {categories.map((category) => (
                    <Link href={`/category/${category.slug}`}>
                      <div
                        key={category.name}
                        className="flex items-center justify-between rounded-xl px-2 py-1 text-sm text-slate-700"
                      >
                        <span className="font-bold" style={{ color: "#051f00cc" }} >{category.name}</span>
                        <span className="rounded-full  px-2.5 py-0.5 text-xs font-semibold text-white" style={{ backgroundColor: "#116087" }}>
                          {category.posts_count}
                        </span>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>

              <section className="rounded-2xl bg-white p-4 shadow-sm sm:p-5">
                <h2 className="text-lg font-semibold text-slate-900">
                  Popular Articles
                </h2>

                <div className="mt-4 space-y-4">
                  {popularArticles.map((article: any, i: number) => (
                    <Link href={`/blogs/${article.slug}`}>
                      <article
                        key={i}
                        className="flex items-start gap-3 rounded-xl p-2 transition hover:bg-slate-50"
                      >
                        <img
                        src={`${process.env.ASSET_URL}/public/posts/image/${article.image}`}
                        alt={article.img_alt}
                        className="h-14 w-14 rounded-lg object-cover sm:h-16 sm:w-16"
                      />

                      <div className="min-w-0">
                        <p className="text-xs font-semibold uppercase tracking-wide text-sky-700">
                          Blog
                        </p>
                        <h3 className="mt-1 text-sm font-semibold leading-5 text-slate-900">
                          {article.title}
                        </h3>
                        <p className="mt-1 text-xs text-slate-500">
                          {article.description}
                        </p>
                      </div>
                    </article>
                  </Link>
                ))}
                </div>
              </section>

            </aside>

          </div>
        </div>
      </div>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbJsonLd) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
      />
    </>
  );
}