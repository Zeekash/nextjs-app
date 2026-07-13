"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import type { MoverCompany, MoverListData } from "@/types/mover-list";
import styles from "./mover-list.module.css";

interface GroupedCompanies {
    numeric: MoverCompany[];
    letters: Record<string, MoverCompany[]>;
}

const faqs = [
    {
        id: "licensed",
        question: "How do I know if a moving company is licensed and verified?",
        answer: (
            <>
                Before hiring, always check if the mover has a valid USDOT number listed
                under the{" "}
                <a
                    href="https://www.fmcsa.dot.gov/"
                    target="_blank"
                    rel="nofollow noopener noreferrer"
                >
                    Federal Motor Carrier Safety Administration (FMCSA)
                </a>
                . Every mover in our directory is licensed and verified through these
                records, so you don’t have to double-guess their legitimacy.
            </>
        ),
    },
    {
        id: "compare",
        question: "What should I look for when comparing moving companies?",
        answer: (
            <>
                Start with the basics: licensing, insurance, and clear pricing. Then
                compare how they communicate, how detailed their quotes are, and what real
                customers say about them. A mover that answers clearly and gives you time
                to decide is usually the one you can trust.
            </>
        ),
    },
    {
        id: "local-long-distance",
        question: "Are local movers and long-distance movers different?",
        answer: (
            <>
                Yes. Local movers handle short-distance or in-state relocations, while
                interstate or long-distance movers manage moves across state lines. Each
                type follows different licensing rules.
            </>
        ),
    },
    {
        id: "avoid-scams",
        question: "How can I avoid moving scams or fake companies?",
        answer: (
            <>
                Stay away from movers who ask for large cash deposits upfront, don’t share
                a business address, or refuse to give a{" "}
                <a href="/blogs/how-to-check-a-moving-companys-usdot-number">
                    USDOT number
                </a>
                . Always use trusted sources so you can find movers without worrying about
                scams.
            </>
        ),
    },
];

function groupCompanies(companies: MoverCompany[]): GroupedCompanies {
    const numeric: MoverCompany[] = [];
    const letters: Record<string, MoverCompany[]> = {};

    companies.forEach((company) => {
        const firstLetter = String(company.company_name || "")
            .trim()
            .charAt(0)
            .toUpperCase();

        if (!firstLetter) return;

        if (/^[0-9]$/.test(firstLetter)) {
            numeric.push(company);
            return;
        }

        if (!letters[firstLetter]) {
            letters[firstLetter] = [];
        }

        letters[firstLetter].push(company);
    });

    return {
        numeric,
        letters: Object.keys(letters)
            .sort()
            .reduce<Record<string, MoverCompany[]>>((acc, letter) => {
                acc[letter] = letters[letter];
                return acc;
            }, {}),
    };
}

export default function MoverListClient({
    data,
    updatedDate,
}: {
    data: MoverListData;
    updatedDate: string;
}) {
    const router = useRouter();
    const [searchValue, setSearchValue] = useState(data.search || "");
    const [expandedSections, setExpandedSections] = useState<Record<string, boolean>>({});
    const [openFaq, setOpenFaq] = useState<string | null>(null);

    const grouped = useMemo(() => groupCompanies(data.companies || []), [data.companies]);

    function handleSearchSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        const value = searchValue.trim();

        if (!value) {
            router.push("/mover-list#mover");
            return;
        }

        router.push(`/mover-list?search=${encodeURIComponent(value)}#mover`);
    }

    function toggleSection(sectionKey: string) {
        const savedY = window.scrollY;

        setExpandedSections((prev) => ({
            ...prev,
            [sectionKey]: !prev[sectionKey],
        }));

        window.requestAnimationFrame(() => {
            window.scrollTo({ top: savedY });
        });
    }

    return (
        <main className={styles.page}>
            <div className={styles.containerMain}>
                <div className={styles.container} style={{ marginTop: '48px' }}>
                    <div className={styles.innerContainer}>
                        <nav className={styles.breadcrumbWrap} aria-label="breadcrumb">
                            <ol className={styles.breadcrumb}>
                                <li>
                                    <a href="/">
                                        <span className={styles.homeIcon}>⌂</span> Home
                                    </a>
                                </li>
                                <li aria-current="page">Movers List</li>
                            </ol>
                        </nav>

                        <h1 className={styles.mainHeading}>Mover List A-Z</h1>

                        <div className={styles.authorBox}>
                            <div className={styles.authorInfo}>
                                <img src="/assets/img/author_img.png" alt="Author" />
                                <div>
                                    <span className={styles.authorLabel}>Author</span>
                                    <h6 className={styles.authorName}>
                                        <a
                                            href="https://www.linkedin.com/in/honey-jay/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            Honey Jay <span aria-hidden="true">in</span>
                                        </a>
                                    </h6>
                                </div>
                            </div>
                            <div className={styles.updatedBox}>
                                <span className={styles.authorLabel}>Updated:</span>
                                <strong>{updatedDate}</strong>
                            </div>
                        </div>

                        <p>
                            Below is our ultimate Movers Directory, last updated in{" "}
                            {updatedDate}. Our movers&apos; list is arranged in alphabetical
                            order. You can browse all mover brands — over{" "}
                            <strong>{data.total_company}</strong> in total — from A to Z
                            here.
                        </p>

                        <section className={styles.moverSearchSection}>
                            <div className={styles.moverBox}>
                                <form onSubmit={handleSearchSubmit}>
                                    <h2 className={styles.moverBoxTitle}>Search Movers</h2>
                                    <p className={styles.searchSubtext}>
                                        Find reliable and professional movers for your next
                                        relocation
                                    </p>

                                    <div className={styles.searchGrid}>
                                        <div className={styles.moverInputGroup} id="mover">
                                            <input
                                                type="search"
                                                name="search"
                                                value={searchValue}
                                                onChange={(e) => setSearchValue(e.target.value)}
                                                placeholder="Search Movers By Name"
                                                className={styles.moverSearchInput}
                                            />
                                        </div>

                                        <button className={styles.moverSubmitBtn} type="submit">
                                            Search
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </section>
                    </div>

                    <div className={styles.innerContainer}>
                        <div className={styles.resultTitle}>
                            {data.search === "" ? (
                                <h3>All Movers ({data.total_company})</h3>
                            ) : (
                                <h3>
                                    Found {data.count} result{data.count === 1 ? "" : "s"} for
                                    “{data.search}”
                                </h3>
                            )}
                        </div>

                        <hr className={styles.divider} />

                        {grouped.numeric.length > 0 && (
                            <CompanySection
                                label="0–9"
                                sectionKey="numeric"
                                companies={grouped.numeric}
                                expanded={Boolean(expandedSections.numeric)}
                                onToggle={() => toggleSection("numeric")}
                            />
                        )}

                        {Object.entries(grouped.letters).map(([letter, companies]) => (
                            <CompanySection
                                key={letter}
                                label={letter}
                                sectionKey={letter}
                                companies={companies}
                                expanded={Boolean(expandedSections[letter])}
                                onToggle={() => toggleSection(letter)}
                            />
                        ))}

                        {data.companies.length === 0 && (
                            <p className={styles.emptyText}>No movers found.</p>
                        )}
                    </div>

                    <section className={styles.innerContainer}>
                        <p className={styles.accordingTo}>Key Facts:</p>

                        <ol className={styles.keyFactsList}>
                            <li>
                                <div className={styles.listing}>
                                    <span>
                                        100% of the movers listed here are licensed movers in
                                        the USA, verified through official databases
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div className={styles.listing}>
                                    <span>
                                        Around 80% of the companies in our Moving Companies
                                        Directory offer instant quotes or online booking.
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div className={styles.listing}>
                                    <span>
                                        Every mover in this A–Z list operates with a valid USDOT
                                        number or state authorization.
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div className={styles.listing}>
                                    <span>
                                        Nearly 60% of the movers on our list specialize in
                                        interstate or long-distance moves, while others focus on
                                        local moving services within your area.
                                    </span>
                                </div>
                            </li>
                            <li>
                                <div className={styles.listing}>
                                    <span>
                                        Our database includes <strong>{data.total_company}</strong>{" "}
                                        active moving companies, and we update it monthly to help
                                        users find movers they can trust
                                    </span>
                                </div>
                            </li>
                        </ol>

                        <section className={styles.moversByStateSection}>
                            <div className={styles.moversStateCard}>
                                <div className={styles.stateHeader}>
                                    <h2 className={styles.stateTitle}>Movers by State</h2>
                                </div>

                                <div className={styles.statesGrid}>
                                    {data.all_states?.map((state) => (
                                        <div className={styles.stateItem} key={state.slug}>
                                            <a
                                                href={`/state/${state.slug}`}
                                                className={styles.stateLink}
                                            >
                                                <span className={styles.stateName}>{state.state}</span>
                                            </a>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </section>

                        <section className={styles.faqSection}>
                            <h2>Frequently Asked Questions</h2>

                            <div className={styles.accordion}>
                                {faqs.map((faq) => {
                                    const isOpen = openFaq === faq.id;

                                    return (
                                        <div className={styles.accordionItem} key={faq.id}>
                                            <h3 className={styles.accordionHeader}>
                                                <button
                                                    type="button"
                                                    className={`${styles.accordionButton} ${
                                                        isOpen ? styles.open : ""
                                                    }`}
                                                    onClick={() =>
                                                        setOpenFaq(isOpen ? null : faq.id)
                                                    }
                                                    aria-expanded={isOpen}
                                                >
                                                    {faq.question}
                                                </button>
                                            </h3>

                                            {isOpen && (
                                                <div className={styles.accordionBody}>
                                                    {faq.answer}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </section>
                    </section>
                </div>
            </div>
        </main>
    );
}

function CompanySection({
    label,
    sectionKey,
    companies,
    expanded,
    onToggle,
}: {
    label: string;
    sectionKey: string;
    companies: MoverCompany[];
    expanded: boolean;
    onToggle: () => void;
}) {
    const visibleCompanies = expanded ? companies : companies.slice(0, 8);
    const hasMore = companies.length > 8;

    return (
        <div className={styles.companySectionWrap}>
            <div className={styles.brandSection}>
                <h5>{label}</h5>
                <div className={styles.brandLinks}>
                    {visibleCompanies.map((company) => (
                        <a
                            href={`/mover/${company.slug}`}
                            className={styles.companyLink}
                            key={`${sectionKey}-${company.id}`}
                            dangerouslySetInnerHTML={{
                                __html: company.highlighted_name || company.company_name,
                            }}
                        />
                    ))}
                </div>
            </div>

            {hasMore && (
                <button
                    type="button"
                    className={styles.seeToggleLink}
                    onClick={onToggle}
                >
                    {expanded ? "See Less" : "See More"}
                </button>
            )}

            <hr className={styles.divider} />
        </div>
    );
}
