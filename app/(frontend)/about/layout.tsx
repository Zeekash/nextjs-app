import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "About Us | My Moving Journey",
    description:
        "We built My Moving Journey because moving was messy. Now it’s easier to find verified, reliable movers in USA without wasting time or energy.",
    keywords: ["About Us"],
    robots: {
        index: true,
        follow: true,
    },
       alternates: {
        canonical: "/about",
    },
    openGraph: {
        description:
            "Learn more about My Moving Journey, our mission to connect people with reliable moving companies, and how we make the moving process easier.",
        type: "website",
        url: "https://mymovingjourney.com/about",
    },
};

export default function AboutLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}