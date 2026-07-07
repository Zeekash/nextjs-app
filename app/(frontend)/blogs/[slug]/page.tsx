import Image from "next/image";
import { FaUser } from "react-icons/fa6";

import Breadcrumbs from "@/components/frontend/BreadCrumbs";
import MovingCalculator from "@/components/frontend/MovingCalculator";
import { getPost } from "@/server/blogs";
import Faqs from "@/components/frontend/Faqs";




const BlogPage = async ({ params }: any) => {
  const { slug } = await params;

  const data = await getPost(slug);
  const post = data.post;
    
  const category = data.categories?.find(
    (item: any) => item.id === post.post_category_id
  );
  const faqs= data.faqs;
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

  const publishedName =
    post.published_by?.name || post.admin?.name || "Admin";

  const publishedImage =
    post.published_by?.image || post.admin?.image || null;

  const editedName =
    post.edited_by?.name || "My Moving Journey";

  const editedImage =
    post.edited_by?.image || null;



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
  <main className="flex flex-col w-full justify-center items-center bg-white px-3 pb-4 pt-[110px] sm:px-4">
  <section className="lg:mt-[10px] flex w-full max-w-[1070px] flex-col items-start rounded-[10px] bg-[#eaf8fd] px-4 pb-4 pt-8 sm:px-5 sm:pt-10 lg:px-6">
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
              alt={publishedName || "Published by"}
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
            <span>{publishedName || "Admin"}</span>
          </p>

          <p className="mt-[2px] text-[9px] leading-[12px] text-[#52646d]">
            Published: {publishedDate || "Not available"}
          </p>
        </div>
      </div>

      {/* Edited By */}
      <div className="flex items-center sm:ml-5 sm:border-l sm:border-[#9bb5bf] sm:pl-5">
        <div className="relative flex size-[27px] shrink-0 items-center justify-center overflow-hidden rounded-[7px] bg-[#247da5] text-white">
          {editedImage ? (
            <Image
              src={editedImage}
              alt={editedName || "Edited by"}
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
            <span>{editedName || "My Moving Journey"}</span>
          </p>

          <p className="mt-[2px] text-[9px] leading-[12px] text-[#52646d]">
            Updated: {updatedDate || "Not available"}
          </p>
        </div>
      </div>
    </div>

    <div className="mt-6 flex w-full min-w-0">
      <MovingCalculator />
    </div>
  </section>


  <section>
    here the html 
  </section>


  <section>
      <MovingCalculator />
  </section>

  <section>
   <Faqs
  
  faqs={faqs}
  questionBgColor="#006b9f "
  textColor="#ffffff"
/>
  </section>

</main>
  );
};

export default BlogPage;