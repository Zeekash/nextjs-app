import { ResourceEasyBullet } from "@/app/(frontend)/resource/[slug]/Components/ResourceEasySection";

export const easySectionData: {
  title: string;
  subtitle: string;
  bullets: ResourceEasyBullet[];
  ctaText: string;
} = {
  title: "We're here to make it easy.",
  subtitle:
    "Every move is personal. Let's find the mover that makes your move stress-free.",
  bullets: [
    { label: "Best for heavier loads", value: "1-800-PACK-RAT" },
    { label: "Best for DIY moves", value: "MovingYourself" },
    { label: "Best for overall flexibility", value: "PODS Moving and Storage" },
    { label: "Best for affordable moves", value: "MovingPlace" },
    { label: "Best for city moves", value: "Zippy Shell", fullWidth: true },
  ],
  ctaText: "Want to know what your move will cost?",
};

export const companyDetail = {
  name: "1-800-PACK-RAT",
  logo: "/assets/img/resource/1800-pack-rat.webp",
  rating: 4.9,
  tagline: "Best for heavier loads",
  features: ["Steel containers", "Long-term storage", "Door-to-door service"],
  description: [
    "1-800-PACK-RAT is a moving container company that offers all-steel containers for local and long-distance moves. Their containers are weather-resistant and designed to keep your belongings safe during transport and storage.",
    "The company provides flexible loading and unloading timelines, making it a solid choice for DIY movers who want control over their schedule without driving a rental truck.",
  ],
  accordions: [
    {
      title: "Company Overview",
      items: [
        { label: "Company Name", value: "1-800-PACK-RAT" },
        { label: "Best For", value: "Heavier loads and long-term storage" },
        { label: "Container Material", value: "All-steel, weather-resistant" },
        { label: "Service Area", value: "Most of the U.S. (varies by location)" },
        { label: "Storage Options", value: "On-site and facility storage available" },
        { label: "Phone", value: "1-800-PACK-RAT" },
        { label: "USDOT / MC #", value: "USDOT 1534531 — MC 648624 (verify on FMCSA)." },
        { label: "DMV No", value: "TxDMV No. 006488080C" },
      ],
    },
    {
      title: "Why We Picked It",
      intro:
        "There are a lot of container brands out there, but only a few line up with what real movers care about: sturdy builds, clear pricing, and dependable coverage. 1-800-PACK-RAT makes our list of <strong>best moving container companies</strong> because the way they operate actually helps on moving day.",
      highlights: [
        {
          text: "Their units are steel-framed with barn-style doors and ground-level loading, which means easier packing and better protection in bad weather.",
        },
        {
          text: "Simple \"you pack, they move (or store)\" process with <strong>time built</strong> in. Your initial booking includes up to 30 days of use, and you can add more time if plans change.",
        },
        {
          text: "Their quote flow spells out monthly rent, delivery, transport, and taxes, so you can compare apples to apples before you book.",
        },
        {
          text: "Three standard sizes, <strong>8-, 12-, and 16-foot</strong>, cover everything from studios to multi-room homes. Published capacity details make it easier to choose the right size the first time.",
        },
      ],
    },
    {
      title: "What the Company Does Best",
      intro:
        "Best for: Long-distance and cross-country household moves, DIY packers who want built-in storage flexibility.",
      pros: [
        "All-steel, weather-resistant containers with ground-level and wide barn-style doors.",
        "Flexible timeline for loading, transport, and storage.",
        "Three practical sizes (8/12/16 ft.) that cover studios to multi-room homes.",
        "Door-to-door service plus access to facility storage.",
        "Straightforward quotes that show delivery, transport, and storage.",
        "Solid option for out-of-state relocations.",
      ],
      cons: [
        "Can price higher than some <strong>moving container companies</strong>.",
        "Service area isn't universal; availability varies by city and season.",
        "Driveway space/permits may be required in stricter neighborhoods or HOAs.",
        "Delivery windows can be multi-day <strong>during peak season</strong>.",
      ],
    },
    {
      title: "Average Cost — How They Quote",
      paragraphs: [
        "With 1-800-PACK-RAT, your price is made of a few simple parts: container rent (the first <strong>30 days are typically included</strong>), delivery and pickup, the line-haul for the miles your container travels, taxes, and any add-ons you choose (extra storage time, contents protection, optional labor).",
        "You share where you're moving from and to, when you need the container, and what size you want. They then give you a clear <strong>moving estimate</strong> online or by phone that shows each piece so you can compare it to other <strong>best moving container companies</strong>.",
        "<strong>For example:</strong> The average long-distance move with 1-800-PACK-RAT is around <strong>$3,080</strong>, and about <strong>$4,559</strong> for ~1,750 miles with a 16-ft container.",
      ],
      scenario: {
        title: "Sample scenario",
        items: [
          "Two-bedroom home, roughly 1,200–1,500 miles with one 16-ft container.",
          "<strong>Base container + first 30 days</strong> included in package",
          "<strong>Delivery + pickup:</strong> itemized on the order",
          "<strong>Line-haul (distance):</strong> main cost driver",
          "<strong>Contents protection (optional):</strong> tiered add-on",
        ],
      },
      summary:
        "<strong>Estimated total:</strong> ~$3,800–$4,800 based on recent averages for similar mileage and size.",
    },
    {
      title: "Available Container Sizes",
      tables: [
        {
          title: "Available Container Sizes",
          headers: [
            "Size",
            "Approx. Exterior Dimensions",
            "Capacity (Rooms / Cu. Ft.)",
            "Weight Limit",
            "Typical Use",
          ],
          rows: [
            ["8 ft", "~7.2' W x 7.8' H x 8.5' L", "1–2 rooms", "Up to 4,000 lbs", "Small apartments moves."],
            ["12 ft", "7.75' W x 7.5' H x 12' L", "~620 cu. ft. (1–2 bedrooms)", "Up to 4,000 lbs", "Local moves and storage"],
            ["16 ft", "(largest; similar to a 10'x15' storage room)", "~3–4 rooms", "Up to 6,000 lbs", "Most popular for 2–3 bedroom moves."],
          ],
        },
        {
          title: "Container Types Offered",
          headers: ["Type", "Sizes", "Notes"],
          rows: [
            ["Residential portable storage containers", "8 ft, 12 ft, 16 ft", "All-steel, weather-resistant and barn-style doors."],
            ["PACK-RAT PRO (commercial)", "Varies", "High-gauge steel, reinforced locks/hinges."],
          ],
        },
      ],
    },
  ],
};

export const thingsToKeepInMind = {
  title: "Things to Keep in Mind Before Choosing a Container Company",
  intro: [
    "Before you book your move, take a minute to think about what really matters. Not all moving container companies are the same, and the cheapest option isn't always the smartest one.",
    "Keep these things in mind before choosing a moving container company:",
  ],
  items: [
    {
      title: "Understand Your Timeline",
      description:
        "Be clear about when you need the container dropped off and picked up. Some reliable moving container companies can deliver in a day or two, while others may take a week.",
    },
    {
      title: "Know What's Included in the Price",
      description:
        "A low quote doesn't always mean a better deal. Ask what's covered in the quote, like delivery, pickup, mileage, and storage time. Extra fees can add up fast, and your total moving costs might end up higher than expected.",
    },
    {
      title: "Choose the Right Container Size",
      description:
        "Not every move needs the biggest box. A smaller portable storage container can save you space and money. If you're unsure, ask for size recommendations based on your home size or number of rooms.",
    },
    {
      title: "Read Real Customer Reviews",
      description:
        "Spend ten minutes checking moving container reviews on trusted platforms like Google or My Moving Journey. Look for patterns like do customers complain about delays or damages.",
    },
    {
      title: "Check How the Company Communicates",
      description:
        "If a company ignores your calls or takes forever to respond before you even book, that's a bad sign. The best moving container companies stay responsive, clear, and easy to work with from start to finish.",
    },
  ],
};

export const movingContainerCost = {
  title: "How Much Do Moving Containers Cost?",
  intro: "Here is the rough idea of how much container companies will charge you.",
  sections: [
    {
      title: "Typical Cost Breakdown",
      description: "Here are some real-world ballpark figures to give you a feel.",
      table: {
        headers: ["Type of Move", "Typical Cost Range", "What Affects It"],
        rows: [
          ["Local (within ~30 miles)", "$150 – $700 for a 1-2 bedroom move using a container.", "Number of items, how long you keep the container, and delivery pickup distance"],
          ["Regional (250-1,000 miles)", "$450 – $2,000+ depending on size and route.", "Distance, container size, storage time"],
          ["Long-Distance / Cross-Country", "Averages around $6,050, according to recent data.", "Distance, container reuse policy, transit time"],
        ],
      },
    },
    {
      title: "Monthly Rental & Delivery Costs",
      description:
        "Now, if you're using a container like a <strong>temporary storage</strong> or self-pack option from a container company, you can expect these rough costs:",
      table: {
        headers: ["Item", "Typical Range", "Notes"],
        rows: [
          ["Monthly rental of a standard container", "~$75-$200/month (average ~$125)", "Depends on size, condition, and location"],
          ["Delivery & pickup fees", "~$70-$150+ each way", "Higher if driveway is tough to access or miles away"],
          ["Special features or large size", "Rates can go up significantly for high-cube container or insulated models", "Extra height, doors on both ends, insulation, etc."],
        ],
      },
    },
  ],
};

export const whatToAsk = {
  title: "What To Ask and Consider",
  intro:
    "When you're talking with any of the moving container companies, here are the questions you should ask to get a clear on the full picture:",
  questions: [
    "What size container do you recommend for my [home size / number of rooms]?",
    "What's included in the monthly rental rate? Does it include storage time and pickup/drop-off?",
    "Is delivery and pickup counted separately or built into the price?",
    "If I keep the container a little longer than planned, what happens to the rate?",
    "Are there any <strong>hidden fees</strong> I should know about (access fees, stacking, site prep)?",
    "How do you handle one-way moves for those needing <strong>moving containers for out-of-state moves</strong>?",
  ],
};

export const movingContainerSizes = {
  title: "Moving Container Sizes",
  paragraphs: [
    "When you're renting a moving <strong>container</strong>, one of the first questions you'll face is, 'What size do I actually need?'",
    "It sounds simple, but choosing the right size can be a bit tricky. If you go too small, and you'll end up cramming boxes. And if you go too big, and you'll pay for space you never use.",
    "The good thing is, most <strong>moving container companies</strong> offer a few standard options that cover pretty much every type of move.",
    "Here's a simple breakdown to help you decide:",
  ],
  table: {
    headers: [
      "Container Size",
      "Average Dimensions (L x W x H)",
      "Ideal For",
      "Space Capacity",
      "Typical Price Range",
    ],
    rows: [
      ["Small (8 ft)", "8' x 7' x 8'", "Studio or 1-bedroom apartment", "400–500 sq. ft.", "$150 – $300 per month"],
      ["Medium (12 ft)", "12' x 8' x 8'", "1–2 bedroom home", "600–800 sq. ft.", "$250 – $400 per month"],
      ["Large (16 ft)", "16' x 8' x 8'", "2–3 bedroom home", "1,000–1,200 sq. ft.", "$350 – $600 per month"],
      ["Extra-Large (20–40 ft)", "20–40' x 8' x 8.5'", "3+ bedroom homes or long-distance moving container companies services", "1,500+ sq. ft.", "$500 – $900+ per month"],
    ],
  },
  note: "Note: Prices vary by location, time of year, and how long you keep the container.",
};
