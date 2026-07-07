import type { Metadata } from "next";
import { getMoverList } from "@/server/mover-list";
import MoverListClient from "./page";

export const metadata: Metadata = {
    title: "Movers A–Z Directory | Search Licensed Movers in the USA",
    description:
        "Looking for a mover you can actually trust? Use our A–Z movers directory to search movers in the USA. They are all verified and easy to browse.",
    keywords: ["Movers List"],
    robots: {
        index: true,
        follow: true,
    },
    alternates: {
        canonical: "https://mymovingjourney.com/mover-list",
    },
    openGraph: {
        title: "Movers A–Z Directory | Search Licensed Movers in the USA",
        description:
            "Looking for a mover you can actually trust? Use our A–Z movers directory to search movers in the USA. They are all verified and easy to browse.",
        url: "https://mymovingjourney.com/mover-list",
        siteName: "My Moving Journey",
        type: "website",
    },
};

type PageProps = {
    searchParams?: Promise<{
        search?: string | string[];
    }>;
};

function getCurrentMonthYear() {
    return new Intl.DateTimeFormat("en-US", {
        month: "short",
        year: "numeric",
    }).format(new Date());
}

export default async function MoverListPage({ searchParams }: PageProps) {
    const params = await searchParams;

    const rawSearch = Array.isArray(params?.search)
        ? params?.search[0]
        : params?.search;

    const search = String(rawSearch || "").trim();

    const data = await getMoverList(search);

    const updatedDate = getCurrentMonthYear();

    const webPageJsonLd = {
        "@context": "https://schema.org",
        "@type": "WebPage",
        name: "Movers A–Z Directory | Search Licensed Movers in the USA",
        url: search
            ? `https://mymovingjourney.com/mover-list?search=${encodeURIComponent(search)}`
            : "https://mymovingjourney.com/mover-list",
        description:
            "Looking for a mover you can actually trust? Use our A–Z movers directory to search movers in the USA. They are all verified and easy to browse.",
        potentialAction: {
            "@type": "ReadAction",
            target: search
                ? `https://mymovingjourney.com/mover-list?search=${encodeURIComponent(search)}`
                : "https://mymovingjourney.com/mover-list",
        },
    };

    const webSiteJsonLd = {
        "@context": "https://schema.org/",
        "@type": "WebSite",
        name: "My Moving Journey",
        url: "https://mymovingjourney.com",
        publisher: {
            "@type": "Organization",
            name: "My Moving Journey",
            url: "https://mymovingjourney.com",
            logo: {
                "@type": "ImageObject",
                url: "https://mymovingjourney.com/assets/img/logo.png",
            },
        },
        potentialAction: {
            "@type": "SearchAction",
            target: "https://mymovingjourney.com/search?q={search_term_string}",
            "query-input": "required name=search_term_string",
        },
    };

    const breadcrumbJsonLd = {
        "@context": "https://schema.org/",
        "@type": "BreadcrumbList",
        itemListElement: [
            {
                "@type": "ListItem",
                position: 1,
                name: "My Moving Journey",
                item: "https://mymovingjourney.com/",
            },
            {
                "@type": "ListItem",
                position: 2,
                name: "Mover List (A-Z)",
                item: "https://mymovingjourney.com/mover-list",
            },
        ],
    };

    const faqJsonLd = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: [
            {
                "@type": "Question",
                name: "How do I know if a moving company is licensed and verified?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text:
                        "Before hiring, always check if the mover has a valid USDOT number listed under the Federal Motor Carrier Safety Administration (FMCSA). Every mover in our directory is licensed and verified through these records, so you don’t have to double-guess their legitimacy.",
                },
            },
            {
                "@type": "Question",
                name: "What should I look for when comparing moving companies?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text:
                        "Start with the basics: licensing, insurance, and clear pricing. Then compare how they communicate, how detailed their quotes are, and what real customers say about them. A mover that answers clearly and gives you time to decide is usually the one you can trust.",
                },
            },
            {
                "@type": "Question",
                name: "Are local movers and long-distance movers different?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text:
                        "Yes. Local movers handle short-distance or in-state relocations, while interstate or long-distance movers manage moves across state lines. Each type follows different licensing rules.",
                },
            },
            {
                "@type": "Question",
                name: "How can I avoid moving scams or fake companies?",
                acceptedAnswer: {
                    "@type": "Answer",
                    text:
                        "Stay away from movers who ask for large cash deposits upfront, don’t share a business address, or refuse to give a USDOT number. Always use trusted sources so you can find movers without worrying about scams.",
                },
            },
        ],
    };

    return (
        <>
            <MoverListClient data={data} updatedDate={updatedDate} />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(webPageJsonLd),
                }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(webSiteJsonLd),
                }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(breadcrumbJsonLd),
                }}
            />

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{
                    __html: JSON.stringify(faqJsonLd),
                }}
            />
        </>
    );
}