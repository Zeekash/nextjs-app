"use client";

import { useState } from "react";
import { sendContactMessage } from "@/server/contact-us";
import styles from "./contact-us.module.css";

const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "Contact Us - Get Support & Ask Questions | My Moving Journey",
    url: "https://mymovingjourney.com/contact-us",
    description:
        "Have questions or need support with your moving? Contact My Moving Journey for support, technical issues, or to share feedback and ideas.",
};

const webSiteJsonLd = {
    "@context": "https://schema.org/",
    "@type": "WebSite",
    name: "MyMovingJourney",
    url: "https://mymovingjourney.com",
};

export default function ContactUsPage() {
    const [loading, setLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState("");
    const [errors, setErrors] = useState<Record<string, string[]>>({});

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();

        setLoading(true);
        setSuccessMessage("");
        setErrors({});

        const form = e.currentTarget;
        const formData = new FormData(form);

        try {
            const res = await sendContactMessage(formData);

            if (!res.success) {
                setErrors(res.errors || {});
                return;
            }

            setSuccessMessage(
                res.message || "Message sent! We'll get back to you shortly."
            );

            form.reset();
        } catch (error: any) {
            setErrors({
                server: [error?.message || "Something went wrong."],
            });
        } finally {
            setLoading(false);
        }
    }

    return (
        <>
            <main className={styles.page}>
                <section>
                    <div className={styles.topContainer}>
                        <div className={styles.topContent}>
                            <h1>Contact Us</h1>

                            <p>
                                We’re here to support you every step of the way.
                                Whether you have questions about planning your move,
                                need assistance finding trusted movers, or just want
                                to share feedback about your experience, the{" "}
                                <strong>
                                    <a href="https://mymovingjourney.com/">
                                        My Moving Journey
                                    </a>
                                </strong>{" "}
                                team is ready to help.
                            </p>
                        </div>
                    </div>
                </section>

                <section className={styles.mainSection}>
                    <div className={styles.formCard}>
                        <h2>Have a question or inquiry?</h2>

                        <p className={styles.subtitle}>
                            Please feel free to get in touch with us using the
                            contact form
                        </p>

                        {successMessage && (
                            <div className={`${styles.successMsg} ${styles.show}`}>
                                <CheckCircleIcon />
                                {successMessage}
                            </div>
                        )}

                        {errors.server?.[0] && (
                            <div className={styles.errorBox}>
                                {errors.server[0]}
                            </div>
                        )}

                        <form onSubmit={handleSubmit}>
                            <FieldError errors={errors} name="name">
                                <div className={styles.field}>
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        name="name"
                                        placeholder="Your Name"
                                    />
                                </div>
                            </FieldError>

                            <FieldError errors={errors} name="email">
                                <div className={styles.field}>
                                    <label>Email Address</label>
                                    <input
                                        type="email"
                                        name="email"
                                        placeholder="Email"
                                    />
                                </div>
                            </FieldError>

                            <FieldError errors={errors} name="phone_no">
                                <div className={styles.field}>
                                    <label>Phone Number</label>
                                    <input
                                        type="text"
                                        name="phone_no"
                                        placeholder="Phone Number"
                                    />
                                </div>
                            </FieldError>

                            <FieldError errors={errors} name="subject">
                                <div className={styles.field}>
                                    <label>What can we help with?</label>
                                    <input
                                        type="text"
                                        name="subject"
                                        placeholder="Subject"
                                    />
                                </div>
                            </FieldError>

                            <FieldError errors={errors} name="message">
                                <div className={styles.field}>
                                    <label>Message</label>
                                    <textarea
                                        name="message"
                                        placeholder="Tell us how we can help you…"
                                    />
                                </div>
                            </FieldError>

                            <button
                                className={styles.formBtn}
                                type="submit"
                                disabled={loading}
                            >
                                <SendIcon />
                                {loading ? "Sending..." : "Send Message"}
                            </button>
                        </form>

                        <div className={styles.formPrivacy}>
                            <LockIcon />
                            We never share your information with third parties.
                        </div>
                    </div>

                    <aside className={styles.sidebar}>
                        <h2 className={styles.sidebarTagline}>
                            Your move,
                            <br />
                            our <em>priority</em>
                        </h2>

                        <p className={styles.sidebarDesc}>
                            We're not just a directory — we're your partner from
                            first quote to final box. Reach out for any reason.
                        </p>

                        <div className={styles.reasonList}>
                            <ReasonCard
                                icon={<InfoIcon />}
                                title="General questions"
                                desc="Curious how the platform works or what services are available? We'll walk you through it."
                            />

                            <ReasonCard
                                icon={<ToolIcon />}
                                title="Technical issues"
                                desc="Running into a bug or glitch? Share the details and we'll get things back on track fast."
                            />

                            <ReasonCard
                                icon={<UserIcon />}
                                title="Account support"
                                desc="Trouble logging in or managing your profile? We'll sort it out quickly."
                            />

                            <ReasonCard
                                icon={<StarIcon />}
                                title="Feedback & ideas"
                                desc="We're always improving. Your suggestions shape what we build next."
                            />
                        </div>

                        <div className={styles.socialBlock}>
                            <h3>Stay connected</h3>
                            <p>Tips, guides &amp; moving news — follow us</p>

                            <div className={styles.socialLinks}>
                                <a
                                    href="https://www.facebook.com/mymovingjourney/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.socialLink}
                                    aria-label="Facebook"
                                >
                                    <FacebookIcon />
                                </a>

                                <a
                                    href="https://x.com/mymovingjourney"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.socialLink}
                                    aria-label="X / Twitter"
                                >
                                    <TwitterIcon />
                                </a>

                                <a
                                    href="https://www.pinterest.com/mymovingjourneyus/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.socialLink}
                                    aria-label="Pinterest"
                                >
                                    <PinterestIcon />
                                </a>

                                <a
                                    href="https://www.linkedin.com/company/mymovingjourney/"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className={styles.socialLink}
                                    aria-label="LinkedIn"
                                >
                                    <LinkedinIcon />
                                </a>
                            </div>
                        </div>
                    </aside>
                </section>

                <section className={styles.contactStrip}>
                    <a href="tel:7869803050" className={styles.stripItem}>
                        <div className={`${styles.stripIcon} ${styles.phone}`}>
                            <PhoneIcon />
                        </div>

                        <div>
                            <div className={styles.stripLabel}>Call Anytime</div>
                            <div className={styles.stripValue}>
                                (786) 980-3050
                            </div>
                        </div>
                    </a>

                    <a
                        href="mailto:info@mymovingjourney.com"
                        className={styles.stripItem}
                    >
                        <div className={`${styles.stripIcon} ${styles.email}`}>
                            <EmailIcon />
                        </div>

                        <div>
                            <div className={styles.stripLabel}>Email Support</div>
                            <div className={styles.stripValue}>
                                info@mymovingjourney.com
                            </div>
                        </div>
                    </a>

                    <a
                        href="https://maps.google.com"
                        target="_blank"
                        rel="noopener noreferrer"
                        className={styles.stripItem}
                    >
                        <div className={`${styles.stripIcon} ${styles.location}`}>
                            <LocationIcon />
                        </div>

                        <div>
                            <div className={styles.stripLabel}>Our Office</div>
                            <div className={styles.stripValue}>
                                3680 Wilshire Blvd, Ste P04-1032, Los Angeles,
                                CA 90010, USA
                            </div>
                        </div>
                    </a>
                </section>
            </main>

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
        </>
    );
}

function FieldError({
    children,
    errors,
    name,
}: {
    children: React.ReactNode;
    errors: Record<string, string[]>;
    name: string;
}) {
    const message = errors?.[name]?.[0];

    return (
        <>
            {children}
            {message && <p className={styles.fieldError}>{message}</p>}
        </>
    );
}

function ReasonCard({
    icon,
    title,
    desc,
}: {
    icon: React.ReactNode;
    title: string;
    desc: string;
}) {
    return (
        <div className={styles.reasonCard}>
            <div className={styles.reasonIcon}>{icon}</div>

            <div>
                <div className={styles.reasonTitle}>{title}</div>
                <div className={styles.reasonDesc}>{desc}</div>
            </div>
        </div>
    );
}

function SendIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <line x1="22" y1="2" x2="11" y2="13" />
            <polygon points="22 2 15 22 11 13 2 9 22 2" />
        </svg>
    );
}

function LockIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect x="3" y="11" width="18" height="11" rx="2" ry="2" />
            <path d="M7 11V7a5 5 0 0110 0v4" />
        </svg>
    );
}

function CheckCircleIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 11.08V12a10 10 0 11-5.93-9.14" />
            <polyline points="22 4 12 14.01 9 11.01" />
        </svg>
    );
}

function InfoIcon() {
    return (
        <svg viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" />
            <path d="M12 16v-4M12 8h.01" />
        </svg>
    );
}

function ToolIcon() {
    return (
        <svg viewBox="0 0 24 24">
            <path d="M14.7 6.3a1 1 0 000 1.4l1.6 1.6a1 1 0 001.4 0l3.77-3.77a6 6 0 01-7.94 7.94l-6.91 6.91a2.12 2.12 0 01-3-3l6.91-6.91a6 6 0 017.94-7.94l-3.76 3.76z" />
        </svg>
    );
}

function UserIcon() {
    return (
        <svg viewBox="0 0 24 24">
            <path d="M20 21v-2a4 4 0 00-4-4H8a4 4 0 00-4 4v2" />
            <circle cx="12" cy="7" r="4" />
        </svg>
    );
}

function StarIcon() {
    return (
        <svg viewBox="0 0 24 24">
            <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
        </svg>
    );
}

function FacebookIcon() {
    return (
        <svg viewBox="0 0 24 24">
            <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
        </svg>
    );
}

function TwitterIcon() {
    return (
        <svg viewBox="0 0 24 24">
            <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />
        </svg>
    );
}

function PinterestIcon() {
    return (
        <svg viewBox="0 0 24 24">
            <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.22-5.17 1.22-5.17s-.31-.62-.31-1.54c0-1.45.84-2.53 1.88-2.53.89 0 1.32.67 1.32 1.47 0 .9-.57 2.24-.86 3.48-.25 1.04.51 1.88 1.53 1.88 1.83 0 3.07-2.33 3.07-5.08 0-2.09-1.4-3.66-3.94-3.66-2.87 0-4.67 2.14-4.67 4.54 0 .82.24 1.4.62 1.85.17.2.19.28.13.51-.04.17-.14.57-.18.73-.06.24-.24.33-.44.24-1.24-.51-1.82-1.89-1.82-3.43 0-2.55 2.15-5.63 6.44-5.63 3.46 0 5.73 2.52 5.73 5.22 0 3.58-1.97 6.27-4.87 6.27-.97 0-1.89-.52-2.2-1.11l-.6 2.34c-.22.84-.8 1.89-1.2 2.53.91.27 1.86.41 2.85.41 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
        </svg>
    );
}

function LinkedinIcon() {
    return (
        <svg viewBox="0 0 24 24">
            <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
            <circle cx="4" cy="4" r="2" />
        </svg>
    );
}

function PhoneIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M22 16.92v3a2 2 0 01-2.18 2 19.79 19.79 0 01-8.63-3.07A19.5 19.5 0 013.07 9.81a19.79 19.79 0 01-3.07-8.67A2 2 0 012 .18h3a2 2 0 012 1.72c.127.96.361 1.903.7 2.81a2 2 0 01-.45 2.11L6.09 7.91a16 16 0 006 6l1.27-1.27a2 2 0 012.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0122 16.92z" />
        </svg>
    );
}

function EmailIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
            <polyline points="22,6 12,13 2,6" />
        </svg>
    );
}

function LocationIcon() {
    return (
        <svg
            viewBox="0 0 24 24"
            fill="none"
            strokeWidth="1.8"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0118 0z" />
            <circle cx="12" cy="10" r="3" />
        </svg>
    );
}