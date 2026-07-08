import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { companyImageUrl, getCompanyShow, assetUrl } from "@/server/company";
import type { Company, Review } from "@/types/company";
import ReadMoreReview from "./ReadMoreReview";
import styles from "./company-show.module.css";


function cx(classes: string) {
    return classes
        .split(/\s+/)
        .filter(Boolean)
        .map((className) => {
            const mapped = (styles as Record<string, string>)[className];
            return mapped ? `${className} ${mapped}` : className;
        })
        .join(" ");
}

type PageProps = {
    params: Promise<{
        slug: string;
    }>;
    searchParams: Promise<{
        sort?: string;
        page?: string;
        id?: string;
    }>;
};

const serviceLabels: Record<string, string> = {
    local_mover: "Local Moving",
    long_distance_mover: "Long Distance & Interstate Moving",
    residential_moving: "Residential Moving",
    commercial_office_moving: "Commercial & Office Relocation",
    packing_unpacking_services: "Professional Packing Services",
    storage_services: "Secure Storage Solutions",
    international_moving: "International Moving",
    specialty_moving: "Specialty Moving",
    labor_only_moving: "Labor-Only Moving",
    truck_rental: "Truck Rental",
    containers_moving: "Containers Moving",
};

const fallbackFaqs = (companyName: string) => [
    {
        question: `How do I contact ${companyName} through this profile page?`,
        answer: `You can reach ${companyName} directly from this page by using the contact form or phone number listed in their profile. You can also request a free moving quote to start planning your relocation right away.`,
    },
    {
        question: `Where can I see the moving services offered by ${companyName}?`,
        answer: `Each moving company lists its specific services in the “Services Offered” section of their profile. You can explore that section to learn exactly what ${companyName} provides.`,
    },
    {
        question: "Are the prices shown on this profile final?",
        answer: `No. The prices shown are average estimates gathered from customer reviews. Your final quote from ${companyName} may differ based on factors like distance, move size, season, and extra services.`,
    },
    {
        question: `Can I read reviews from previous customers of ${companyName}?`,
        answer: `Yes. Scroll down on this profile page to see verified reviews and ratings from real customers who have used ${companyName} for their moves. These reviews can help you understand their service quality and reliability.`,
    },
    {
        question: `Does ${companyName} operate in other locations or states?`,
        answer: `${companyName} may have multiple service locations depending on their coverage area. Check the Service Areas section of this profile to see if they provide moving services to other locations.`,
    },
];

function value(value: unknown, fallback = "Not Provided") {
    if (value === null || value === undefined || value === "") return fallback;
    return String(value);
}

function money(value: unknown) {
    const numeric = Number(value || 0);
    return numeric > 0 ? `$${numeric.toFixed(1)}` : "$0.0";
}

function round(value: unknown, decimals = 1) {
    const numeric = Number(value || 0);
    return Number.isFinite(numeric) ? numeric.toFixed(decimals) : "0.0";
}

function formatDate(date?: string | null) {
    if (!date) return "";
    const parsed = new Date(date);
    if (Number.isNaN(parsed.getTime())) return String(date);

    return parsed.toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
    });
}

function companyAddress(company: Company) {
    const city = company.city?.name || "";
    const state = company.state?.abv || company.state?.name || "";
    const zip = company.city?.zip_code || "";
    const street = company.street || "";

    return [street, [city, state].filter(Boolean).join(" "), zip]
        .filter(Boolean)
        .join(", ") || "Not Found";
}

function initials(name?: string | null) {
    const parts = String(name || "User")
        .trim()
        .split(/\s+/)
        .filter(Boolean);

    return parts
        .slice(0, 2)
        .map((part) => part.charAt(0).toUpperCase())
        .join("") || "U";
}

function Stars({ rating }: { rating?: number | string | null }) {
    const numeric = Number(rating || 0);
    const full = Math.floor(numeric);
    const hasHalf = numeric - full > 0;

    return (
        <span aria-label={`${round(numeric)} out of 5 stars`}>
            {Array.from({ length: 5 }).map((_, index) => {
                const starNumber = index + 1;
                const filled = starNumber <= full || (starNumber === full + 1 && hasHalf);
                return (
                    <span key={starNumber} aria-hidden="true" style={{ color: filled ? "#E3780D" : "#ddd" }}>
                        ★
                    </span>
                );
            })}
        </span>
    );
}

function ProgressRow({ label, count, percentage }: { label: string; count: number; percentage: number }) {
    const safePercentage = Math.min(100, Math.max(0, Number(percentage || 0)));

    return (
        <div className={cx("review_progress_row")}>
            <div className={cx("review_progress_label")}>{label}</div>
            <div className={cx("review_progress_track")} aria-hidden="true">
                <div
                    className={cx("review_progress_fill")}
                    style={{ width: `${safePercentage}%` }}
                />
            </div>
            <div className={cx("review_progress_count")}>({count})</div>
        </div>
    );
}

function SortLinks({ slug, currentSort }: { slug: string; currentSort?: string }) {
    const items = [
        { label: "Default", href: `/mover/${slug}` },
        { label: "Rating - Low to High", href: `/mover/${slug}?sort=rate_asc` },
        { label: "Rating - High to Low", href: `/mover/${slug}?sort=rate_desc` },
        { label: "Newest", href: `/mover/${slug}?sort=newest` },
        { label: "Oldest", href: `/mover/${slug}?sort=oldest` },
    ];

    const activeLabel = items.find((item) => currentSort && item.href.includes(`sort=${currentSort}`))?.label || "Sort By";

    return (
        <details className={cx("sort_dropdown")}>
            <summary className={cx("sort_trigger")}>{activeLabel}</summary>
            <div className={cx("sort_menu")}>
                {items.map((item) => {
                    const active = currentSort ? item.href.includes(`sort=${currentSort}`) : item.label === "Default";
                    return (
                        <a key={item.label} className={cx(active ? "sort_link active" : "sort_link")} href={item.href}>
                            {item.label}
                        </a>
                    );
                })}
            </div>
        </details>
    );
}

function ReviewCard({ review, companySlug }: { review: Review; companySlug: string }) {
    const text = review.your_review || review.message || review.review || "";

    return (
        <div className={cx("timeline-card")}>
            <div className={cx("row")}>
                <div className={cx("col-lg-3 d-flex align-items-center justify-content-center")}>
                    <div className={cx("mt-1 mb-0 user_name_ico")}>
                        <div className={cx("name_first_letter")}>
                            <span className={cx("name_reviewer")}>{initials(review.name)}</span>
                        </div>
                        {value(review.name, "Anonymous")}
                    </div>
                </div>

                <div className={cx("col-lg-9 mt-lg-0 mt-3")}>
                    <div className={cx("card_bg")}>
                        <div className={cx("card-content")}>
                            <div className={cx("d-flex justify-content-between align-items-center")}>
                                <div style={{ display: "flex", flexDirection: "column" }}>
                                    <span style={{ color: "#000000b5" }}>Reviewed {formatDate(review.created_at)}</span>
                                    <span className={cx("review_card_star")}><Stars rating={review.overall_rating} /></span>
                                </div>

                                <a className={cx("btn btn-outline-primary share_btn")} href={`/mover/${companySlug}?id=${review.id}`}>
                                    Share
                                </a>
                            </div>
                        </div>

                        {review.review_subject && <p className={cx("mt-1")}><b>{review.review_subject}</b></p>}

                        <ReadMoreReview text={text} className={cx("user_feedback mt-2")} />

                        <div className={cx("details d-flex flex-wrap align-items-center justify-content-between")}>
                            <div className={cx("move_from")}>
                                <p className={cx("move_size mb-0")}><strong>Move Size:</strong> {value(review.move_size, "Not Provided")}</p>
                                <span className={cx("time-stamp")}><strong>Move Date:</strong> {formatDate(review.created_at)}</span>
                            </div>
                            <div className={cx("share_btn_cost d-flex flex-column")}>
                                <span className={cx("move_cost text-white px-sm-2 px-1 rounded-1")}>Move Cost: {money(review.service_cost)}</span>
                            </div>
                            {review.respond && (
                                <div className={cx("d-flex flex-column col-sm-12 align-items-center p-3 official_response_box")}>
                                    <h5 className={cx("w-100 text-start fs-5")}>Official Company Response</h5>
                                    <div className={cx("w-100")} dangerouslySetInnerHTML={{ __html: review.respond }} />
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export async function generateMetadata({ params, searchParams }: PageProps): Promise<Metadata> {
    const { slug } = await params;
    const query = await searchParams;
    const response = await getCompanyShow(slug, query);

    if (!response?.success) {
        return {
            title: "Company Not Found",
            robots: { index: false, follow: false },
        };
    }

    const { company, stats, current_date } = response.data;
    const totalReviews = stats.total_reviews || 0;
    const title = totalReviews
        ? `${totalReviews} ${totalReviews > 1 ? "Reviews" : "Review"} For ${company.meta_title || company.company_name}`
        : company.company_name;
    const description = company.meta_description || `See reviews up to ${current_date || "today"} from previous customers of ${company.company_name}. Compare moving companies and get a free estimate.`;

    return {
        title,
        description,
        keywords: [company.company_name],
        robots: query.page || query.sort ? { index: false, follow: false } : { index: true, follow: true },
        openGraph: {
            title,
            description,
            images: [companyImageUrl(company.image)],
        },
        twitter: {
            card: "summary_large_image",
            title,
            description,
            images: [companyImageUrl(company.image)],
        },
    };
}

export default async function CompanyShowPage({ params, searchParams }: PageProps) {
    const { slug } = await params;
    const query = await searchParams;
    const response = await getCompanyShow(slug, query);

    if (!response?.success) {
        notFound();
    }

    const data = response.data;
    const company = data.company;
    const stats = data.stats;
    const starBreakdown = data.star_breakdown;
    const reviews = data.reviews.data || [];
    const selectedReview = data.selected_review;
    const address = companyAddress(company);
    const services = Object.entries(serviceLabels).filter(([field]) => Number(company[field] || 0) === 1);
    const faqs = data.faq && data.faq.length > 0
        ? data.faq.map((faq) => ({ question: faq.question || "Question", answer: faq.answer || "" }))
        : fallbackFaqs(company.company_name);
    const positivePercentage = Math.round(Number(data.sentiment.positive_percentage || 0));
    const negativePercentage = Math.round(Number(data.sentiment.negative_percentage || 0));
    const mapSrc = `https://www.google.com/maps?q=${encodeURIComponent(address)}&z=15&output=embed`;
    const verifiedIcon = assetUrl("assets/img/MMJ_Verified_new.svg");

    const schemaReviews = reviews.map((review) => ({
        "@type": "Review",
        author: { "@type": "Person", name: review.name || "Anonymous" },
        datePublished: review.created_at ? new Date(review.created_at).toISOString().slice(0, 10) : undefined,
        name: review.review_subject || "Review",
        description: review.your_review || review.message || review.review || "",
        reviewRating: {
            "@type": "Rating",
            bestRating: stats.max_rating || 5,
            worstRating: stats.min_rating || 1,
            ratingValue: review.overall_rating || 0,
        },
    }));

    const movingCompanySchema = {
        "@context": "http://schema.org",
        "@type": "MovingCompany",
        name: company.company_name,
        telephone: company.phone_no,
        url: `/mover/${company.slug}`,
        logo: companyImageUrl(company.image),
        image: companyImageUrl(company.image),
        priceRange: `${stats.min_price || 0} - ${stats.max_price || 0}`,
        description: company.meta_description || `See reviews from previous customers of ${company.company_name}. Compare moving companies and get a free estimate.`,
        email: company.company_email,
        contactPoint: [{
            "@type": "ContactPoint",
            telephone: company.phone_no,
            contactType: "Customer service",
            email: company.company_email,
            url: `/mover/${company.slug}`,
        }],
        address: {
            "@type": "PostalAddress",
            addressLocality: company.city?.name,
            addressRegion: company.state?.abv,
            postalCode: company.city?.zip_code,
            streetAddress: company.street,
        },
        ...(reviews.length > 0 ? {
            aggregateRating: {
                "@type": "AggregateRating",
                bestRating: stats.max_rating || 5,
                worstRating: stats.min_rating || 1,
                reviewCount: stats.total_reviews,
                ratingValue: stats.average_rating,
            },
            review: schemaReviews,
        } : {}),
    };

    const faqSchema = {
        "@context": "https://schema.org",
        "@type": "FAQPage",
        mainEntity: faqs.map((faq) => ({
            "@type": "Question",
            name: faq.question,
            acceptedAnswer: { "@type": "Answer", text: faq.answer },
        })),
    };

    return (
        <main className={cx("companyPage")}>
            <section className={cx("final_show py-4")}>
                <div className={cx("container")}>
                    <div className={cx("show_breadcrumbs mt-5 mt-md-0 mb-3 mb-md-0")}>
                        <div className={cx("col-12")}>
                            <nav className={cx("pb-1 mb-0 rounded-3")} aria-label="breadcrumb">
                                <ol className={cx("breadcrumb mb-0")}>
                                    <li className={cx("breadcrumb-item")}><a href="/" className={cx("py-2")}>⌂ Home</a></li>
                                    <li className={cx("breadcrumb-item")}><a href="/mover-list" className={cx("py-2")}>Movers List</a></li>
                                    <li className={cx("breadcrumb-item active")} aria-current="page">{company.company_name}</li>
                                </ol>
                            </nav>
                        </div>
                    </div>

                    <div className={cx("upper_show")}>
                        <div className={cx("row")}>
                            <div className={cx("col-lg-2 d-flex align-items-center justify-content-center")}>
                                <div className={cx("company_logo_wrap")}>
                                    <img src={companyImageUrl(company.image)} className={cx("show_comp")} alt={company.company_name} />
                                </div>
                            </div>

                            <div className={cx("col-lg-5 d-flex flex-column justify-content-center")}>
                                <h1 className={cx("show_comp_name mb-0")}>{company.company_name}</h1>
                                <div>
                                    {Number(company.is_claimed || 0) === 0 ? (
                                        <a href={`/claim/${company.slug}`} className={cx("claim_tag")}>Claim Your Business?</a>
                                    ) : (
                                        <>
                                            <strong style={{ fontWeight: 700 }}>Claimed Mover</strong>
                                            {verifiedIcon && <img src={verifiedIcon} loading="lazy" alt="mmj verified" style={{ width: 18, marginLeft: 6 }} />}
                                        </>
                                    )}
                                </div>
                                <div className={cx("rating_line")}>
                                    <span className={cx("review_card_star hero_stars")}><Stars rating={stats.average_rating} /></span>
                                    <span className={cx("rating_company_small")}>{Number(stats.average_rating || 0) > 0 ? `${round(stats.average_rating)}/5` : "Not Rated"}</span>
                                </div>
                                <a href={`/review/${company.slug}`} className={cx("share_review mt-2 mb-1")}>Share Your Feedback</a>
                                <span className={cx("total_reviews")}>Based on {stats.total_reviews} Reviews</span>
                                <div className={cx("d-sm-flex")} style={{ marginTop: 15 }}>
                                    <a target="_blank" href={`/contact-mover/${company.slug}`}>
                                        <button className={cx("get_company_quote")}>Contact Mover</button>
                                    </a>
                                </div>
                            </div>

                            <div className={cx("col-lg-5")}>
                                <div className={cx("company_detail_sec")}>
                                    <div className={cx("company_detail_title")}>Mover Information</div>
                                    <div className={cx("row company_detai_list")}>
                                        <div className={cx("col-4")}><strong>Email:</strong></div>
                                        <div className={cx("col-7")}><a href={`mailto:${company.company_email}`} rel="nofollow">{value(company.company_email, "Not Found")}</a></div>
                                    </div>
                                    <div className={cx("row company_detai_list")}>
                                        <div className={cx("col-4")}><strong>Phone Number:</strong></div>
                                        <div className={cx("col-7")}>
                                            <a href={`tel:${company.phone_no}`} rel="nofollow">{value(company.phone_no, "Not Found")}</a>
                                            {company.additional_phone_no ? <> , <a href={`tel:${company.additional_phone_no}`} rel="nofollow">{company.additional_phone_no}</a></> : null}
                                        </div>
                                    </div>
                                    <div className={cx("row align-items-center company_detai_list")}>
                                        <div className={cx("col-4")}><strong>Website:</strong></div>
                                        <div className={cx("col-7")}><a href={company.company_website || "#"} target="_blank" rel="nofollow">{value(company.company_website, "Not Found")}</a></div>
                                    </div>
                                    <div className={cx("row company_detai_list border-0")}>
                                        <div className={cx("col-4")}><strong>Address:</strong></div>
                                        <div className={cx("col-7")}>{address}</div>
                                    </div>
                                    <div className={cx("d-flex align-items-center justify-content-center")}>
                                        <a href="#license-section" className={cx("license_sec")}><span className={cx("lisence")}>See all License</span></a>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <section className={cx("container_main pb-5 mx-3 mx-md-auto")}>
                <div className={cx("map_wrap")}>
                    <iframe
                        width="100%"
                        height="100%"
                        style={{ border: 0 }}
                        loading="lazy"
                        allowFullScreen
                        referrerPolicy="no-referrer-when-downgrade"
                        src={mapSrc}
                    />
                </div>

                <h2 className={cx("about_company")}>About {company.company_name}</h2>
                <p>{company.about_company || "Not Provided"}</p>

                <div className={cx("mt-4")}>
                    <div className={cx("form_wrap")}>
                        <div className={cx("col-lg-12 col-12 mx-auto mt-3")}>
                            <div className={cx("form_wrapper")}>
                                <form className={cx("main_banner_form")}>
                                    <div className={cx("d-lg-flex justify-content-lg-between justify-content-center align-items-center")}>
                                        <span className={cx("mb-2 form_heading")}>Let’s Calculate Your Moving Cost!</span>
                                        <p className={cx("miles_upp")}>Moving Distance: 0 miles</p>
                                    </div>
                                    <div className={cx("form_bg")}>
                                        <div className={cx("row")}>
                                            <div className={cx("col-lg-4 mt-lg-0 mt-2")}>
                                                <div className={cx("input_outer")}>
                                                    <label htmlFor="external_zipfrom">Moving from*</label>
                                                    <input type="text" id="external_zipfrom" name="moving-from" placeholder="Enter City Name" autoComplete="off" />
                                                </div>
                                            </div>
                                            <div className={cx("col-lg-4 mt-lg-0 mt-2")}>
                                                <div className={cx("input_outer")}>
                                                    <label htmlFor="external_ziptosearch">Moving to*</label>
                                                    <input type="text" id="external_ziptosearch" name="moving-to" placeholder="Enter City Name" autoComplete="off" />
                                                </div>
                                            </div>
                                            <div className={cx("col-lg-4 d-flex align-items-center justify-content-center justify-content-md-end text-center")}>
                                                <a href="/moving-cost-calculator"><button className={cx("quote-btn mt-3 mt-md-0")} type="button">Cost Calculator</button></a>
                                            </div>
                                        </div>
                                    </div>
                                    <div className={cx("col-lg-12 mt-1")}>
                                        <p className={cx("mt-2 mb-0 text-center secure_info")}>Your personal information is always safe and encrypted.</p>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>

                <div className={cx("container")}>
                    <div className={cx("lower_show")}>
                        <div className={cx("row")}>
                            <div className={cx("col-lg-12")}>
                                <div className={cx("row")}>
                                    <div className={cx("col-md-12 col-12 pt-1 pe-lg-4 order-lg-1 mx-auto")}>
                                        <div className={cx("show_review_head mb-3 d-sm-flex justify-content-between align-items-center gap-2")}>
                                            <span />
                                            <h3 className={cx("fs-2 mt-3 reviews-summary-text")}>Reviews Summary</h3>
                                            <a href={`/review/${company.slug}`} target="_blank"><button className={cx("get_company_quote")}>Write a Review</button></a>
                                        </div>

                                        <section className={cx("review_summary_section")}>
                                            <div className={cx("review_summary_grid")}>
                                                <div className={cx("company_progress_sec review_progress_card")}>
                                                    <ProgressRow label="5 Star" count={starBreakdown.star_5.count} percentage={starBreakdown.star_5.percentage} />
                                                    <ProgressRow label="4 Star" count={starBreakdown.star_4.count} percentage={starBreakdown.star_4.percentage} />
                                                    <ProgressRow label="3 Star" count={starBreakdown.star_3.count} percentage={starBreakdown.star_3.percentage} />
                                                    <ProgressRow label="2 Star" count={starBreakdown.star_2.count} percentage={starBreakdown.star_2.percentage} />
                                                    <ProgressRow label="1 Star" count={starBreakdown.star_1.count} percentage={starBreakdown.star_1.percentage} />
                                                </div>

                                                <div className={cx("review_stats_side")}>
                                                    <div className={cx("review_stat_box review_rating_box")}>
                                                        <div className={cx("rating_company")}>{round(stats.average_rating)}/5</div>
                                                        <div className={cx("review_card_star review_stat_stars")}><Stars rating={stats.average_rating} /></div>
                                                        <p className={cx("review_stat_label")}>{stats.total_reviews} Reviews</p>
                                                    </div>
                                                    <div className={cx("review_stat_box review_price_box")}>
                                                        <div className={cx("average_price")}>{money(stats.average_cost)}</div>
                                                        <p className={cx("review_stat_label")}>Average Price</p>
                                                    </div>
                                                </div>
                                            </div>
                                        </section>

                                        {selectedReview && (
                                            <div className={cx("mt-2")}>
                                                <h4>Review</h4>
                                                <div className={cx("row my-1 mb-3 px-2 py-3 comp-profile-div")}>
                                                    <div className={cx("col-12")}>
                                                        <div className={cx("my-0 d-flex flex-wrap")}>
                                                            <div>
                                                                <h4 id="sub_title-of-company-name" className={cx("mt-1 mb-0")}>👤 {value(selectedReview.name, "Anonymous")}</h4>
                                                                <span className={cx("m-0 w-auto m-md-auto review_card_star")}><Stars rating={selectedReview.overall_rating} /></span>
                                                            </div>
                                                            <div className={cx("d-flex flex-column ms-sm-auto time-parent-div")}>
                                                                <p className={cx("move_size")}><strong>Move Size:</strong> {value(selectedReview.move_size)}</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className={cx("col-12 mt-1")}>
                                                        <ReadMoreReview text={selectedReview.your_review || selectedReview.message || selectedReview.review} className={cx("user_feedback")} />
                                                        <div className={cx("d-flex align-items-center justify-content-between flex-wrap w-100")}>
                                                            <div className={cx("move_from")}>
                                                                <span className={cx("time-stamp")}><strong>Date:</strong> {formatDate(selectedReview.created_at)}</span>
                                                            </div>
                                                            <span className={cx("move_cost text-white px-2 py-1 rounded-1 mt-sm-0 mt-2")}>Move Cost: {money(selectedReview.service_cost)}</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div className={cx("d-flex justify-content-between align-items-center mt-3 flex-wrap gap-2")}>
                                            <h3 className={cx("fs-2 mt-4 read-reviews-summary")}>Read All Reviews</h3>
                                            <SortLinks slug={company.slug} currentSort={query.sort} />
                                        </div>
                                    </div>
                                </div>

                                <div className={cx("timeline")} id="reviews">
                                    {reviews.length > 0 ? reviews.map((review) => (
                                        <ReviewCard key={review.id} review={review} companySlug={company.slug} />
                                    )) : <p>No reviews found.</p>}
                                </div>

                                {data.reviews.pagination.last_page > 1 && (
                                    <div className={cx("pagination_wrap")}>
                                        {data.reviews.pagination.links?.prev && <a href={`/mover/${company.slug}?page=${data.reviews.pagination.current_page - 1}${query.sort ? `&sort=${query.sort}` : ""}`}>Previous</a>}
                                        <span>Page {data.reviews.pagination.current_page} of {data.reviews.pagination.last_page}</span>
                                        {data.reviews.pagination.links?.next && <a href={`/mover/${company.slug}?page=${data.reviews.pagination.current_page + 1}${query.sort ? `&sort=${query.sort}` : ""}`}>Next</a>}
                                    </div>
                                )}

                                <section className={cx("company-section pt-2 pt-md-4 pb-3")}>
                                    <div className={cx("d-flex flex-wrap justify-content-center gap-4")}>
                                        <div className={cx("review-box positive")}>
                                            <div className={cx("review-icon")}>👍</div>
                                            <p className={cx("review-text")}><strong>{positivePercentage}%</strong> of reviews<br />are positive</p>
                                        </div>
                                        <div className={cx("review-box negative")}>
                                            <div className={cx("review-icon")}>👎</div>
                                            <p className={cx("review-text")}><strong>{negativePercentage}%</strong> of reviews<br />are negative</p>
                                        </div>
                                    </div>

                                    

                                    <div className={cx("mb-3 mb-md-5")} id="license-section">
                                        <h2 className={cx("mb-2 mb-md-4")}>Company Info</h2>
                                        <div className={cx("row g-3 company-info-boxes")}>
                                            <InfoCard label="Founding Year" value={company.founding_year} />
                                            <InfoCard label="Dot #:" value={company.us_dot_no} href={`https://safer.fmcsa.dot.gov/query.asp?query_type=queryCarrierSnapshot&query_param=USDOT&query_string=${company.us_dot_no || ""}`} />
                                            <InfoCard label="FMCSA Rating" value="None" />
                                            <InfoCard label="Number of truck" value={company.trucks} />
                                            <InfoCard label="MC number" value={company.icc_mc_license_no} href={`https://safer.fmcsa.dot.gov/query.asp?query_type=queryCarrierSnapshot&query_param=MC_MX&query_string=${company.icc_mc_license_no || ""}`} />
                                            <InfoCard label="No deposit required" value="" />
                                            <InfoCard label="Pay by credit Card" value="" />
                                            <InfoCard label="Ask for special discounts" value="" />
                                        </div>
                                    </div>

                                    {services.length > 0 && (
                                        <div>
                                            <h2 className={cx("mb-4")}>Services Offered By {company.company_name}</h2>
                                            <ul className={cx("list-unstyled company-services")}>
                                                {services.map(([field, label]) => (
                                                    <li key={field}>➜ {label}</li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </section>

                                <div className={cx("licenses_section pb-3")}>
                                    <section className={cx("stm-process-section")}>
                                        <h2 className={cx("stm-process-title mb-3")}>How Can You Book Your Move with {company.company_name}?</h2>
                                        <p className={cx("stm-process-subtext")}>If you are planning to book {company.company_name}, here’s how you can do that :</p>

                                        <div className={cx("row g-3")}>
                                            {[
                                                ["Explore the Profile", `View ${company.company_name}’s verified details, services, and customer reviews to understand their expertise.`],
                                                ["Share Your Move Details", "Use the “Contact Movers” form to enter your moving details and type of move."],
                                                ["Receive a Free Estimate", `${company.company_name} reviews your request and provides a clear, upfront estimate according to your needs.`],
                                                ["Discuss and Finalize", "A moving coordinator connects with you to confirm services and finalize the moving plan."],
                                                ["Confirm Your Booking", `Approve the quote and confirm your move schedule directly with ${company.company_name}.`],
                                                ["Enjoy a Smooth Move", `On moving day, ${company.company_name}’s crew handles everything professionally.`],
                                            ].map(([title, text]) => (
                                                <div className={cx("col-md-6 mt-4")} key={title}>
                                                    <div className={cx("stm-process-card")}>
                                                        <h3>{title}</h3>
                                                        <p>{text}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </section>

                                    <section className={cx("stm-section")}>
                                        <h2 className={cx("stm-heading")}>Average Moving Cost of {company.company_name}</h2>
                                        <ul className={cx("stm-list")}>
                                            <li>Based on {stats.total_reviews} verified customer reviews who moved both locally and long-distance, we found that the average moving cost of {company.company_name} is around <b>{money(stats.average_cost)}</b>.</li>
                                            <li>This average gives you a realistic idea of what people usually pay when hiring {company.company_name} for their move. In many cases, their long-distance pricing tends to come in below the market average.</li>
                                            <li>The <span className={cx("stm-highlight")}>Average interstate move</span> of a 3-bedroom household is around <span className={cx("stm-highlight")}>$4,800</span>.</li>
                                        </ul>
                                        <p className={cx("mt-2")}><b>Important:</b> These cost estimates come directly from customer review data, not from {company.company_name} itself. Your actual quote may differ depending on your move’s size, distance, timing, and any additional services like packing or storage.</p>
                                    </section>

                                    <section className={cx("stm-section")}>
                                        <div className={cx("stm-alert-box mt-3")}>
                                            For the most accurate pricing, it’s always best to request a personalized quote using our <a href="/moving-cost-calculator"><b>moving cost calculator</b></a> and compare it.
                                        </div>
                                    </section>

                                    <div className={cx("faq-section")}>
                                        <h2>Frequently Asked Questions</h2>
                                        <div className={cx("accordion")} id="faqAccordion">
                                            {faqs.map((faq, index) => (
                                                <details className={cx("accordion-item")} key={`${faq.question}-${index}`}>
                                                    <summary className={cx("accordion-button collapsed")}>{faq.question}</summary>
                                                    <div className={cx("accordion-body")}>{faq.answer}</div>
                                                </details>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(movingCompanySchema) }} />
            <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqSchema) }} />
        </main>
    );
}

function InfoCard({ label, value: rawValue, href }: { label: string; value?: unknown; href?: string }) {
    const display = value(rawValue, rawValue === "" ? "" : "Not Provided");

    return (
        <div className={cx("col-6 col-md-3")}>
            <div className={cx("info-card")}>
                <p>{label}</p>
                {display ? (
                    <div className={cx("company-info-boxes-2")}>
                        {href ? <a href={href} rel="nofollow" target="_blank">{display}</a> : display}
                    </div>
                ) : null}
            </div>
        </div>
    );
}
