import type {
    AverageBoxRow,
    BoxCosts,
    BoxType,
    BoxTypeRow,
    CalculatorResultRow,
    ContentItem,
    FaqItem,
    PackingStyle,
    PackingStyleOption,
} from "./calculator.types";

export const PAGE_COPY = {
    breadcrumb: "Home → Packing Calculator",

    title: "Moving Box Calculator",

    description:
        "Not sure how many boxes you need? Enter the number of rooms, people moving, and your packing style to get a quick moving box and packing cost estimate.",

    calculatorDescription:
        "The calculator uses your home size, number of people moving, and packing style to estimate the boxes and packing supplies needed for your move.",

    averageBoxesDescription:
        "These figures provide a general reference. Your calculated result will depend on the exact values entered in the calculator.",

    boxTypesDescription:
        "Different belongings require different box sizes. Use the following guide to choose the right box for each item.",
};

export const PACKING_MULTIPLIERS: Record<
    PackingStyle,
    number
> = {
    light: 0.8,
    average: 1,
    heavy: 1.3,
};

export const BOX_DISTRIBUTION: Record<
    BoxType,
    number
> = {
    small: 0.4,
    medium: 0.35,
    large: 0.15,
    wardrobe: 0.05,
    dishPack: 0.05,
};

export const BOX_PRICES: BoxCosts = {
    small: 1.5,
    medium: 2,
    large: 2.5,
    wardrobe: 10,
    dishPack: 5,
};

export const PACKING_STYLE_OPTIONS: PackingStyleOption[] = [
    {
        value: "light",
        label: "Light Packer",
    },
    {
        value: "average",
        label: "Average Packer",
    },
    {
        value: "heavy",
        label: "Heavy Packer",
    },
];

export const CALCULATOR_RESULT_ROWS: CalculatorResultRow[] = [
    {
        key: "small",
        label: "Small Boxes",
    },
    {
        key: "medium",
        label: "Medium Boxes",
    },
    {
        key: "large",
        label: "Large Boxes",
    },
    {
        key: "wardrobe",
        label: "Wardrobe Boxes",
    },
    {
        key: "dishPack",
        label: "Dish Packs",
    },
];

export const BOX_SIZE_GUIDE: ContentItem[] = [
    {
        title: "Small boxes",
        text: "Best for books, tools, canned goods, small appliances, and other heavy items.",
    },
    {
        title: "Medium boxes",
        text: "Suitable for kitchen items, toys, electronics, clothing, and household accessories.",
    },
    {
        title: "Large boxes",
        text: "Useful for bedding, pillows, towels, lampshades, and lightweight bulky belongings.",
    },
    {
        title: "Wardrobe boxes",
        text: "Designed for hanging clothes, suits, dresses, jackets, and long garments.",
    },
    {
        title: "Dish packs",
        text: "Best for plates, cups, glasses, kitchenware, and other fragile belongings.",
    },
];

export const CALCULATOR_STEPS: ContentItem[] = [
    {
        title: "Step 1",
        text: "Enter the number of rooms in your home.",
    },
    {
        title: "Step 2",
        text: "Enter the number of people moving.",
    },
    {
        title: "Step 3",
        text: "Choose whether you are a light, average, or heavy packer.",
    },
    {
        title: "Step 4",
        text: "Click Calculate to view the estimated box quantities and costs.",
    },
];

export const BOX_COUNT_FACTORS: ContentItem[] = [
    {
        title: "Size of Your Home",
        text: "Larger homes usually contain more belongings and therefore require more moving boxes.",
    },
    {
        title: "Number of People",
        text: "More people normally means more clothes, personal belongings, kitchen items, and household supplies.",
    },
    {
        title: "Packing Style",
        text: "Light packers need fewer boxes, while heavy packers generally need more boxes for additional belongings.",
    },
    {
        title: "Type of Belongings",
        text: "Books, dishes, clothing, fragile items, and bulky belongings may require different box sizes.",
    },
];

export const AVERAGE_BOX_ROWS: AverageBoxRow[] = [
    {
        homeSize: "Studio Apartment",
        estimatedBoxes: "10–20",
        suggestedBoxes:
            "Small boxes and a few medium boxes",
    },
    {
        homeSize: "1-Bedroom Apartment",
        estimatedBoxes: "20–35",
        suggestedBoxes:
            "Small, medium, and a few large boxes",
    },
    {
        homeSize: "2-Bedroom Home",
        estimatedBoxes: "40–60",
        suggestedBoxes:
            "Medium, large, wardrobe, and dish boxes",
    },
    {
        homeSize: "3-Bedroom Home",
        estimatedBoxes: "60–80",
        suggestedBoxes:
            "Medium, large, and specialty boxes",
    },
    {
        homeSize: "4+ Bedroom Home",
        estimatedBoxes: "80–100+",
        suggestedBoxes:
            "A full range of standard and specialty boxes",
    },
];

export const BOX_TYPE_ROWS: BoxTypeRow[] = [
    {
        type: "Small Boxes",
        size: "1.5 cu. ft.",
        bestFor:
            "Books, tools, canned goods, and small appliances",
    },
    {
        type: "Medium Boxes",
        size: "3 cu. ft.",
        bestFor:
            "Clothing, kitchenware, toys, and electronics",
    },
    {
        type: "Large Boxes",
        size: "4.5 cu. ft.",
        bestFor:
            "Bedding, towels, pillows, and lightweight items",
    },
    {
        type: "Extra-Large Boxes",
        size: "6 cu. ft.",
        bestFor:
            "Comforters and lightweight bulky belongings",
    },
    {
        type: "Wardrobe Boxes",
        size: "Varies",
        bestFor:
            "Hanging clothes, suits, jackets, and dresses",
    },
    {
        type: "Dish Pack Boxes",
        size: "5 cu. ft.",
        bestFor:
            "Plates, glasses, cups, and fragile kitchenware",
    },
    {
        type: "TV Boxes",
        size: "Varies",
        bestFor:
            "Televisions, monitors, and flat-screen displays",
    },
];

export const PACKING_TIPS: ContentItem[] = [
    {
        title: "Declutter Before Packing",
        text: "Donate, sell, or discard items that you no longer need before purchasing boxes.",
    },
    {
        title: "Pack Room by Room",
        text: "Complete one room at a time and clearly label every box with its contents and destination room.",
    },
    {
        title: "Use Small Boxes for Heavy Items",
        text: "Books, tools, and canned goods should be packed in smaller boxes to keep them manageable.",
    },
    {
        title: "Use Large Boxes for Light Items",
        text: "Use larger boxes for pillows, bedding, towels, and other lightweight bulky belongings.",
    },
    {
        title: "Protect Fragile Belongings",
        text: "Use dish packs, protective padding, and clearly marked boxes for fragile items.",
    },
];

export const FAQS: FaqItem[] = [
    {
        question:
            "How many boxes do I need for a 2-bedroom home?",

        answer:
            "A typical 2-bedroom home may need approximately 40 to 60 boxes. The exact quantity depends on the number of people and their packing style.",
    },
    {
        question:
            "Which boxes should I use for fragile items?",

        answer:
            "Dish pack boxes are recommended for plates, cups, glasses, and kitchenware. Use protective padding inside each box.",
    },
    {
        question:
            "Can I use large boxes for books?",

        answer:
            "Small boxes are better for books because large boxes filled with books can become too heavy and difficult to move.",
    },
    {
        question:
            "Does packing style affect the estimate?",

        answer:
            "Yes. Light packing uses a multiplier of 0.8, average packing uses 1.0, and heavy packing uses 1.3.",
    },
    {
        question:
            "Does the calculator use live prices or an API?",

        answer:
            "No. All prices, ratios, percentages, and multipliers are stored locally in the calculator code.",
    },
];