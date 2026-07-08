import type { Metadata } from "next";
import type { ReactNode } from "react";

export const metadata: Metadata = {
    title: "Contact Us - Get Support & Ask Questions | My Moving Journey",
    description:
        "Have questions or need support with your moving? Contact My Moving Journey for support, technical issues, or to share feedback and ideas.",
    keywords: ["Contact Us"],
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://mymovingjourney.com/contact-us",
    },
    openGraph: {
        title: "Contact Us - Get Support & Ask Questions | My Moving Journey",
        description:
            "Have questions or need support with your moving? Contact My Moving Journey for support, technical issues, or to share feedback and ideas.",
        url: "https://mymovingjourney.com/contact-us",
        siteName: "My Moving Journey",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Contact Us - Get Support & Ask Questions | My Moving Journey",
        description:
            "Have questions or need support with your moving? Contact My Moving Journey for support, technical issues, or to share feedback and ideas.",
    },
};

export default function ContactUsLayout({
    children,
}: {
    children: ReactNode;
}) {
    return <>{children}</>;
}