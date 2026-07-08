import type { Metadata } from "next";
import { getPost } from "@/server/blogs";

type Props = {
  params: Promise<{ slug: string }>;
};

export async function generateMetadata({
  params,
}: Props): Promise<Metadata> {
  const { slug } = await params;
  const data = await getPost(slug);

  if (!data || !data.post) {
    return {
      title: "Blog Not Found | My Moving Journey",
      description: "The requested blog could not be found.",
    };
  }

  const post = data.post;

  return {
    title: post.meta_title || `${post.title} | My Moving Journey`,
    description: post.meta_description || post.short_description || "Read this amazing blog on My Moving Journey",
    keywords: post.meta_keywords ? (Array.isArray(post.meta_keywords) ? post.meta_keywords : post.meta_keywords.split(",")) : [post.title],
    robots: {
      index: true,
      follow: true,
    },
    alternates: {
      canonical: `/blogs/${slug}`,
    },
    openGraph: {
      title: post.meta_title || post.title,
      description: post.meta_description || post.short_description,
      type: "article",
      url: `https://mymovingjourney.com/blogs/${slug}`,
      images: post.image
        ? [
            {
              url: post.image,
              alt: post.img_alt || post.title,
            },
          ]
        : [],
    },
  };
}

export default function BlogDetailLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
