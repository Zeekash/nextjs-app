export type PackingStyle =
    | "light"
    | "average"
    | "heavy";

export type BoxType =
    | "small"
    | "medium"
    | "large"
    | "wardrobe"
    | "dishPack";

export type BoxQuantities = Record<BoxType, number>;

export type BoxCosts = Record<BoxType, number>;

export interface PackingCalculation {
    baseBoxes: number;
    totalBoxes: number;
    multiplier: number;
    results: BoxQuantities;
    costs: BoxCosts;
    totalCost: number;
}

export interface PackingStyleOption {
    value: PackingStyle;
    label: string;
}

export interface CalculatorResultRow {
    key: BoxType;
    label: string;
}

export interface ContentItem {
    title: string;
    text: string;
}

export interface AverageBoxRow {
    homeSize: string;
    estimatedBoxes: string;
    suggestedBoxes: string;
}

export interface BoxTypeRow {
    type: string;
    size: string;
    bestFor: string;
}

export interface FaqItem {
    question: string;
    answer: string;
}