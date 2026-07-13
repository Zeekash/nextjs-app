import {
    BOX_DISTRIBUTION,
    BOX_PRICES,
    PACKING_MULTIPLIERS,
} from "./calculator.constants";

import type {
    BoxCosts,
    BoxQuantities,
    PackingCalculation,
    PackingStyle,
} from "./calculator.types";

function validatePositiveWholeNumber(
    value: number,
    fieldName: string,
): void {
    if (!Number.isInteger(value) || value < 1) {
        throw new Error(
            `${fieldName} must be a positive whole number with a minimum value of 1.`,
        );
    }
}

export function calculatePacking(
    rooms: number,
    people: number,
    packingStyle: PackingStyle,
): PackingCalculation {
    validatePositiveWholeNumber(
        rooms,
        "Number of rooms",
    );

    validatePositiveWholeNumber(
        people,
        "Number of people",
    );

    const multiplier =
        PACKING_MULTIPLIERS[packingStyle];

    const baseBoxes =
        rooms * 10 +
        people * 5;

    const totalBoxes = Math.max(
        1,
        Math.ceil(baseBoxes * multiplier),
    );

    const results: BoxQuantities = {
        small: Math.ceil(
            totalBoxes * BOX_DISTRIBUTION.small,
        ),

        medium: Math.ceil(
            totalBoxes * BOX_DISTRIBUTION.medium,
        ),

        large: Math.ceil(
            totalBoxes * BOX_DISTRIBUTION.large,
        ),

        wardrobe: Math.ceil(
            totalBoxes * BOX_DISTRIBUTION.wardrobe,
        ),

        dishPack: Math.ceil(
            totalBoxes * BOX_DISTRIBUTION.dishPack,
        ),
    };

    const costs: BoxCosts = {
        small:
            results.small *
            BOX_PRICES.small,

        medium:
            results.medium *
            BOX_PRICES.medium,

        large:
            results.large *
            BOX_PRICES.large,

        wardrobe:
            results.wardrobe *
            BOX_PRICES.wardrobe,

        dishPack:
            results.dishPack *
            BOX_PRICES.dishPack,
    };

    const totalCost =
        costs.small +
        costs.medium +
        costs.large +
        costs.wardrobe +
        costs.dishPack;

    return {
        baseBoxes,
        totalBoxes,
        multiplier,
        results,
        costs,
        totalCost,
    };
}

export function formatCurrency(
    value: number,
): string {
    return `$${value.toFixed(2)}`;
}