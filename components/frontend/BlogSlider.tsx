"use client";

import Image from "next/image";
import Link from "next/link";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import type { Blog } from "@/types/blogs";

import "swiper/css";

function getBlogImageUrl(image: string, baseUrl?: string) {
  if (!image) return "";
  if (image.startsWith("http")) return image;
  if (image.startsWith("/")) return image;
  const base = baseUrl || "";
  return base ? `${base}/${image}` : `/${image}`;
}

function formatDate(dateString?: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  if (isNaN(date.getTime())) return dateString;
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function stripHtml(html: string) {
  return html.replace(/<[^>]*>/g, "");
}

export default function BlogSlider({
  blogs,
  imageBaseUrl,
}: {
  blogs: Blog[];
  imageBaseUrl?: string;
}) {
  if (!blogs || blogs.length === 0) {
    return <p className="text-center text-gray-600">No blogs found.</p>;
  }

  return (
    <div className="relative">
      <Swiper
        modules={[Autoplay]}
        spaceBetween={24}
        slidesPerView={1}
        grabCursor
        loop
        autoplay={{ delay: 4000, disableOnInteraction: false }}
        breakpoints={{
          640: {
            slidesPerView: 2,
          },
          1024: {
            slidesPerView: 3,
          },
        }}
        className="blog-swiper"
      >
        {blogs.map((blog) => {
          const image = blog.image || blog.featured_image || "";
          const excerpt =
            blog.short_description ||
            blog.excerpt ||
            (blog.description ? stripHtml(blog.description).slice(0, 140) + "..." : "");

          return (
            <SwiperSlide key={blog.id || blog.slug} className="h-auto">
              <Link
                href={`/blogs/${blog.slug}`}
                className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden h-[460px] max-h-[460px] flex flex-col"
              >
                <div className="relative w-full aspect-16/10 overflow-hidden shrink-0">
                  {image ? (
                    <Image
                      src={getBlogImageUrl(image, imageBaseUrl)}
                      alt={blog.title}
                      fill
                      unoptimized
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className="object-cover"
                    />
                  ) : (
                    <div className="w-full h-full bg-gray-200 flex items-center justify-center text-gray-500">
                      No Image
                    </div>
                  )}
                </div>

                <div className="p-5 flex flex-col flex-1">
                  <h3 className="text-[22px] font-bold text-[#111827] leading-tight urbanfont line-clamp-2">
                    {blog.title}
                  </h3>

                  <p className="mt-2 text-sm text-gray-500">
                    Published Date:{" "}
                    <span className="text-gray-700">
                      {formatDate(blog.published_at || blog.created_at)}
                    </span>
                  </p>

                  <p className="mt-4 text-[16px] text-[#374151] leading-relaxed line-clamp-3 flex-1">
                    {excerpt}
                  </p>
                </div>
              </Link>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </div>
  );
}
