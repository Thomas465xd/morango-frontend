export const productTypeValues = ["Aros", "Anillo", "Pulsera", "Collar"] as const;
export type ProductType = typeof productTypeValues[number]; 

export const sortByValues = ["category", "basePrice", "name"] as const;
export type SortBy = typeof sortByValues[number];

export const sortOrderValues = ["asc", "desc"] as const;
export type SortOrder = typeof sortOrderValues[number];

export function getFirst(value: string | string[] | undefined) : string | undefined {
    return Array.isArray(value) ? value[0] : value;
}

// Parse number query params
export function parseNumber(value: string | undefined) : number | undefined {
    if (!value) return undefined;
    const parsed = Number(value);
    return Number.isNaN(parsed) ? undefined : parsed;
};

export function parseSortBy(value: string | null): SortBy {
    if (sortByValues.includes(value as SortBy)) {
        return value as SortBy;
    }
    return "name"; // default
}

export function parseSortOrder(value: string | null): SortOrder {
    if (sortOrderValues.includes(value as SortOrder)) {
        return value as SortOrder;
    }
    return "desc";
}

export function parseProductType(
    value: string | null
): ProductType | undefined {
    if (productTypeValues.includes(value as ProductType)) {
        return value as ProductType;
    }
    return undefined;
}

// Parse boolean query params
export function parseBoolean(value: string | null, defaultValue: boolean) {
    if (value === "true") return true;
    if (value === "false") return false;
    return defaultValue;
}
