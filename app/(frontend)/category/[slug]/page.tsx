import Link from "next/link";
import {
  FaArrowRight,
  FaBookOpen,
  FaHome,
  FaSearch,
} from "react-icons/fa";

import BlogCard from "@/components/frontend/Blogcard";
import { getBlogsByCategory } from "@/server/category";

type PageProps = {
  params: Promise<{
    slug: string;
  }>;

  searchParams: Promise<{
    page?: string;
  }>;
};

type BlogPost = {
  title: string;
  slug: string;
  description: string;
  image: string;
  img_alt: string;
};

const CategoryBlogsPage = async ({
  params,
  searchParams,
}: PageProps) => {
  const { slug } = await params;
  const { page = "1" } = await searchParams;

  const requestedPage = Number(page);

  const selectedPage =
    Number.isNaN(requestedPage) || requestedPage < 1
      ? 1
      : requestedPage;

  // Fetch first API page
  const firstPageData = await getBlogsByCategory(slug, 1);

  const lastPage =
    firstPageData?.posts?.last_page ?? 1;

  const currentPage = Math.min(
    selectedPage,
    lastPage
  );

  // Fetch page 2 up to selected page
  const remainingPageData =
    currentPage > 1
      ? await Promise.all(
          Array.from(
            { length: currentPage - 1 },
            (_, index) =>
              getBlogsByCategory(slug, index + 2)
          )
        )
      : [];

  // Merge all fetched API responses
  const allPageData = [
    firstPageData,
    ...remainingPageData,
  ];

  // Merge posts from all loaded pages
  const posts: BlogPost[] = allPageData.flatMap(
    (pageData) => pageData?.posts?.data ?? []
  );

  const categoryName =
    firstPageData?.category?.name ||
    decodeURIComponent(slug)
      .replaceAll("-", " ")
      .replace(/\b\w/g, (letter: string) =>
        letter.toUpperCase()
      );

  const categoryPageUrl = `/category/${slug}`;

  const hasMorePages = currentPage < lastPage;

  const getImageUrl = (image: string) => {
    if (!image) {
      return "/images/blog-placeholder.jpg";
    }

    if (
      image.startsWith("http://") ||
      image.startsWith("https://")
    ) {
      return image;
    }

    const imageBaseUrl =
      process.env.BLOG_IMAGE_URL?.replace(/\/$/, "");

    return imageBaseUrl
      ? `${imageBaseUrl}/${image}`
      : `/${image}`;
  };

  const getShowMoreUrl = () => {
    return `${categoryPageUrl}?page=${
      currentPage + 1
    }`;
  };

  return (
    <main className="mt-[10vh] min-h-screen bg-white pb-16 pt-20 sm:pt-20 lg:pt-20">
      <div className="mx-auto w-full max-w-[1280px] px-4 sm:px-6 lg:px-8">
        {/* Breadcrumb and heading */}
        <div className="mb-10 flex justify-center">
          <div className="w-fit">
            <nav
              aria-label="Breadcrumb"
              className="mb-6 flex flex-wrap items-center gap-2 text-sm font-medium text-slate-900 sm:text-base"
            >
              <Link
                href="/"
                className="flex items-center gap-2 transition-colors hover:text-sky-800"
              >
                <FaHome className="text-sm" />
                <span>Home</span>
              </Link>

              <FaArrowRight className="text-xs" />

              <Link
                href="/blogs"
                className="transition-colors hover:text-sky-800"
              >
                Blogs
              </Link>

              <FaArrowRight className="text-xs" />

              <Link
                href={categoryPageUrl}
                aria-current="page"
                className="font-semibold transition-colors hover:text-sky-800"
              >
                {categoryName}
              </Link>
            </nav>

            <h1 className="font-serif text-4xl font-bold leading-tight text-slate-950 sm:text-5xl">
              {categoryName}
            </h1>
          </div>
        </div>

        {/* Total blogs and search UI */}
        <div className="mb-10 flex flex-col gap-5 md:flex-row md:items-center md:justify-between">
          <div className="inline-flex w-fit items-center gap-2 rounded-full bg-[#e6f7fd] px-4 py-3 text-sm text-[#076d98] shadow-sm">
            <FaBookOpen className="text-lg" />

            <span>
              Total Blogs:{" "}
              <strong>
                {firstPageData?.posts?.total ??
                  posts.length}
              </strong>
            </span>
          </div>

          {/* Search UI only — no functionality yet */}
          <div className="flex w-full overflow-hidden rounded-full bg-white shadow-md md:w-[350px]">
            <input
              type="search"
              placeholder="Search blogs..."
              aria-label="Search blogs"
              className="min-w-0 flex-1 bg-white px-5 py-3 text-sm text-slate-900 outline-none placeholder:text-gray-500"
            />

            <button
              type="button"
              aria-label="Search blogs"
              className="flex w-14 shrink-0 items-center justify-center bg-sky-800 text-white transition-colors hover:bg-sky-900"
            >
              <FaSearch />
            </button>
          </div>
        </div>

        {/* Blog cards */}
        {posts.length > 0 ? (
          <>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
              {posts.map((post) => (
                <Link
                  key={post.slug}
                  href={`/blogs/${post.slug}`}
                  className="block h-full"
                >
                  <BlogCard
                    image={getImageUrl(post.image)}
                    category={categoryName}
                    title={post.title}
                    author="Admin"
                    date="Recently published"
                    className="h-full transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                  />
                </Link>
              ))}
            </div>

            {/* Show More */}
            {hasMorePages && (
              <div className="mt-12 flex justify-center">
                <Link
                  href={getShowMoreUrl()}
                  scroll={false}
                  className="inline-flex min-w-[178px] items-center justify-center rounded-full bg-[#146d93] px-8 py-3 text-base font-medium text-white transition-colors duration-300 hover:bg-[#0d5878]"
                >
                  Show More
                </Link>
              </div>
            )}
          </>
        ) : (
          <div className="rounded-2xl border border-gray-200 bg-gray-50 px-6 py-20 text-center">
            <h2 className="font-serif text-2xl font-semibold text-slate-950">
              No blogs found
            </h2>

            <p className="mt-2 text-sm text-gray-600">
              There are currently no posts in this
              category.
            </p>
          </div>
        )}
      </div>
    </main>
  );
};

export default CategoryBlogsPage;