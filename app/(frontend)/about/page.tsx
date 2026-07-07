
import styles from "./about-us.module.css";



const focusCards = [
    {
        icon: "/assets/img/about-us/cost-calculator.svg",
        alt: "cost-calculator",
        title: "Moving Cost Calculator",
        text: "get instant estimates for your move.",
        href: "/cost-estimator",
        button: "Get your Quote",
    },
    {
        icon: "/assets/img/about-us/moving-resources.svg",
        alt: "moving-resources",
        title: "Best Long Distance Movers",
        text: "explore best movers that specialize in long-distance moves",
        href: "https://mymovingjourney.com/resource/best-long-distance-moving-companies",
        button: "Get the Best Movers",
    },
    {
        icon: "/assets/img/about-us/compare-movers.svg",
        alt: "compare-movers",
        title: "Compare Movers",
        text: "line them up side by side and choose",
        href: "/compare-movers",
        button: "Compare Movers Now",
    },
    {
        icon: "/assets/img/about-us/movers-directory.svg",
        alt: "movers-directory",
        title: "Verified Movers Directory",
        text: "browse licensed moving companies from our A–Z movers list",
        href: "/movers-list",
        button: "Find Your Mover",
    },
];

const trackRecord = [
    {
        title: "500+ Verified Movers",
        text: "Every company you see here has been checked for licensing, reviews, and credibility before being added.",
    },
    {
        title: "3,500+ Cities Covered",
        text: "From small towns to major metros, we help people find movers in USA wherever they are.",
    },
    {
        title: "1000+ Users Helped",
        text: "People across the USA rely on our platform to compare movers and make informed decisions.",
    },
];

const sawItems = [
    "Movers listed on dozens of websites with no real checks behind them.",
    "Prices are changing every day with no clear reason.",
    "Reviews written to impress, not to inform.",
    "People searching “local movers near me” or “long distance movers in USA” and getting overwhelmed instead of being helped.",
    "A hundred “moving directories,” but none that actually verified anything.",
];

const changedItems = [
    "Every company listed on My Moving Journey is a verified moving company, checked for licenses, insurance, and authenticity.",
    "We built a moving platform that puts clarity first, no fake stars and no hidden details.",
    "We added tools that let people compare moving companies honestly, without needing ten tabs open.",
    "We focused on quality, not quantity.",
    "We made information simple enough for anyone to find movers online without second-guessing every click.",
];

const expectations = [
    {
        title: "Verified movers only",
        text: "Every mover listed here goes through a basic check for licensing, reviews, and credibility. If something doesn’t add up, we don’t list it. We want you to see only trusted movers in USA, not random names copied from somewhere else.",
    },
    {
        title: "Clear information",
        text: "We avoid complicated terms and long descriptions. You’ll find pricing details, services offered, and reviews, so you can make your decision without confusion.",
    },
    {
        title: "Regular updates",
        text: "Things change, and so do companies. We update listings often, review feedback, and remove movers that no longer meet our standards.",
    },
    {
        title: "Useful tools",
        text: "Whether you want to compare moving companies, find movers online near you, or get a free moving quote, everything is designed to save you time.",
    },
    {
        title: "Steady improvement",
        text: "We keep listening to people who use the site. Every review, every suggestion helps us make My Moving Journey a little more useful and trustworthy each day.",
    },
];

const webPageJsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: "About Us | My Moving Journey",
    url: "https://mymovingjourney.com/about",
    description:
        "We built My Moving Journey because moving was messy. Now it’s easier to find verified, reliable movers in USA without wasting time or energy.",
    potentialAction: {
        "@type": "ReadAction",
        target: "https://mymovingjourney.com/about",
    },
};

const webSiteJsonLd = {
    "@context": "https://schema.org/",
    "@type": "WebSite",
    name: "MyMovingJourney",
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

export default function AboutPage() {
    return (
        <main className={styles.page}>
            <section className={styles.hero}>
                <div className={styles.container}>
                    <div className={styles.bannerHead}>
                        <div className={styles.heroContent}>
                            <h1>About Us</h1>
                            <p>
                                We Started My Moving Journey Because Moving Wasn’t
                                Supposed to Be This Hard.
                            </p>
                        </div>
                    </div>
                </div>
            </section>

            <section className={styles.focusSection}>
                <div className={styles.container}>
                    <h2>What We Focus On</h2>

                    <div className={styles.focusGrid}>
                        {focusCards.map((card) => (
                            <div className={styles.focusCard} key={card.title}>
                                <div className={styles.focusIcon}>
                                    <img src={card.icon} alt={card.alt} />
                                </div>
                                <h3>{card.title}</h3>
                                <p>{card.text}</p>
                                <a href={card.href} className={styles.btnComp}>
                                    {card.button}
                                </a>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <div className={styles.containerMain}>
                <div className={styles.container}>
                    <h2 className={styles.faqHeading}>How It All Started?</h2>

                    <p>Every move starts with a reason. Ours started with frustration.</p>
                    <p>
                        Back then, moving felt like chaos; not the kind with boxes and
                        tape, but the kind that comes from trying to find people you can
                        trust. We were planning a move, just like anyone else, and we
                        thought the internet would make it easy.
                    </p>
                    <p>
                        Type movers in USA, scroll a bit, compare a few prices, book a
                        mover, done. That’s how it was supposed to go.
                    </p>
                    <p className={styles.accordingTo}>It didn’t.</p>
                    <p>
                        We spent days jumping from one site to another. Some had hundreds
                        of names, others barely worked. The reviews looked copied and
                        pasted, the prices never matched what we were told over the phone,
                        and every website claimed to be “the best.” We started wondering if
                        anyone was checking what these companies actually did.
                    </p>
                    <p className={styles.accordingTo}>
                        There wasn’t one place that felt real.
                    </p>
                    <p>
                        Not one space where you could find verified moving companies and
                        actually believe the information in front of you.
                    </p>
                    <p className={styles.accordingTo}>
                        That’s when the idea started to form.
                    </p>
                    <p>
                        What if there was a single moving platform that didn’t try to sell
                        you something first, but helped you find movers online who were
                        actually licensed, reviewed, and transparent?
                    </p>
                    <p>
                        We weren’t thinking of building a business. We were thinking of
                        fixing something that clearly didn’t work.
                    </p>
                    <p>
                        The early days of My Moving Journey were rough. We built lists by
                        hand, called movers ourselves, checked licenses, and read reviews
                        line by line. We deleted more companies than we added.
                    </p>
                    <p>
                        But with every small check and every verified name, the idea felt
                        more solid, like maybe we could actually make moving a little less
                        frustrating for people like us.
                    </p>
                    <p>
                        Over time, that list became a full moving directory USA; a place
                        where you can compare moving companies, read honest reviews, and
                        choose from movers who are really in the business of helping, not
                        scamming.
                    </p>
                    <p>
                        That’s how <strong>My Moving Journey</strong> started. A belief that
                        if no one else was going to fix this, we would.
                    </p>
                </div>

                <section className={styles.focusSection}>
                    <div className={styles.container}>
                        <h2>Our Track Record</h2>

                        <div className={styles.trackGrid}>
                            {trackRecord.map((item) => (
                                <div className={styles.trackCard} key={item.title}>
                                    <h3>{item.title}</h3>
                                    <p>{item.text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                <div className={styles.container}>
                    <h2 className={styles.faqHeading}>What We Saw, What We Changed</h2>
                    <p>
                        The more we looked, the clearer it became; the moving world was
                        just messy.
                    </p>
                    <p>
                        People were doing everything right and still ending up with the
                        wrong movers.
                    </p>
                    <p>So we slowed down, paid attention, and started changing things.</p>

                    <p className={styles.accordingTo}>What We Saw</p>
                    <LocationList items={sawItems} />

                    <p className={styles.accordingTo}>What We Changed</p>
                    <LocationList items={changedItems} />
                </div>

                <div className={styles.container}>
                    <div className={styles.rankingSection}>
                        <h2>Our Mission</h2>
                        <p>
                            Our mission is to make finding movers in the USA clear, honest,
                            and effortless. My Moving Journey was built to help people
                            connect with verified moving companies they can truly trust.
                        </p>
                        <p>
                            Moving is already stressful; finding help for it shouldn’t be.
                            That’s really what drives us.
                        </p>
                    </div>
                </div>

                <div className={styles.container}>
                    <h2 className={styles.faqHeading}>What You Can Expect From Us</h2>
                    <div className={styles.narrowText}>
                        <p className={styles.introText}>
                            We built My Moving Journey to make things clear for people who
                            are tired of searching through confusing websites and uncertain
                            listings. Everything here is made to be easy to understand and
                            simple to use.
                        </p>
                    </div>
                    <p>
                        You will get reliable information that helps you find movers in USA
                        you can actually count on
                    </p>

                    {expectations.map((item) => (
                        <div className={styles.stepSection} key={item.title}>
                            <h3 className={styles.stepSubtitle}>{item.title}</h3>
                            <p className={styles.stepContent}>{item.text}</p>
                        </div>
                    ))}
                </div>

                <section className={styles.focusSection}>
                    <div className={styles.container}>
                        <h2 className={styles.textStart}>We’re Glad You’re Here</h2>
                        <p>
                            If you’ve read this far, you probably understand what My Moving
                            Journey is really about.
                        </p>
                        <p>
                            We know what it feels like to be unsure about who to trust or
                            where to start. That’s why we built this space.
                        </p>
                        <p>
                            We’re not a big company. We’re a small group of people who’ve
                            been through the same stress, the same searching, the same late
                            nights looking for <strong>movers in USA</strong> that won’t
                            disappear when things get real. We built this for people like us;
                            people who just want to move without being misled.
                        </p>
                        <p>
                            So if My Moving Journey helps you find even one mover that makes
                            your next step easier, then it’s doing what it was meant to do.
                        </p>

                        <div className={styles.gitCard}>
                            <h2>Stay Connected</h2>
                            <p>We love keeping our moving community engaged!</p>
                            <p>
                                Follow us on social media to get helpful moving tips, real
                                updates, and small ideas that make your next move easier.
                            </p>

                            <div className={styles.gitSocial}>
                                <div className={styles.gitSocialIcons}>
                                    <a
                                        href="https://www.facebook.com/mymovingjourney/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`${styles.gitSocialBtn} ${styles.facebook}`}
                                    >
                                        <span>Facebook</span>
                                    </a>
                                    <a
                                        href="https://www.linkedin.com/company/mymovingjourney/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`${styles.gitSocialBtn} ${styles.linkedin}`}
                                    >
                                        <span>LinkedIn</span>
                                    </a>
                                    <a
                                        href="https://x.com/mymovingjourney"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`${styles.gitSocialBtn} ${styles.twitter}`}
                                    >
                                        <span>Twitter</span>
                                    </a>
                                    <a
                                        href="https://www.pinterest.com/mymovingjourneyUS/"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className={`${styles.gitSocialBtn} ${styles.pinterest}`}
                                    >
                                        <span>Pinterest</span>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </div>

            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }}
            />
            <script
                type="application/ld+json"
                dangerouslySetInnerHTML={{ __html: JSON.stringify(webSiteJsonLd) }}
            />
        </main>
    );
}

function LocationList({ items }: { items: string[] }) {
    return (
        <div className={styles.locationList}>
            {items.map((item) => (
                <div className={styles.locationItem} key={item}>
                    <span className={styles.checkIcon} aria-hidden="true">
                        ✓
                    </span>
                    <span>{item}</span>
                </div>
            ))}
        </div>
    );
}
