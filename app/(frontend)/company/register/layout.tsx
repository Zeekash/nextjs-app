import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Register Your Moving Company | My Moving Journey",
    description:
        "Get Listed your Moving Company in our huge database to get millions of people exposure. Register now your company account!.",
    keywords: [
        "register moving company",
        "moving company registration",
        "list moving company",
        "verified movers USA",
        "My Moving Journey",
    ],
    robots: {
        index: false,
        follow: false,
    },
    openGraph: {
        title: "Register Your Moving Company | My Moving Journey",
        description:
            "Join My Moving Journey and list your moving company so customers can find and trust your services online.",
        url: "https://mymovingjourney.com/registration",
        siteName: "My Moving Journey",
        type: "website",
    },
    twitter: {
        card: "summary_large_image",
        title: "Register Your Moving Company | My Moving Journey",
        description:
            "Register your moving company with My Moving Journey and reach customers searching for trusted movers in the USA.",
    },
};

export default function RegistrationLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return <>{children}</>;
}