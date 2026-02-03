//? Users
export const userSortByValues = ["name"] as const; 
export type UserSortBy = typeof userSortByValues[number]; 

//? Products
export const productTypeValues = ["Aros", "Anillo", "Pulsera", "Collar"] as const;
export type ProductType = typeof productTypeValues[number]; 

export const productSortByValues = ["category", "basePrice", "name"] as const;
export type ProductSortBy = typeof productSortByValues[number];

export function parseSortByProducts(value: string | null): ProductSortBy {
    if (productSortByValues.includes(value as ProductSortBy)) {
        return value as ProductSortBy;
    }

    return "name"; // default
}

export function parseProductType(
    value: string | null
): ProductType | undefined {
    if (productTypeValues.includes(value as ProductType)) {
        return value as ProductType;
    }
    return undefined;
}

//? Orders
export const statusValues = ["Pending", "Processing", "Sent", "Delivered", "Cancelled", "Expired"] as const; 
export type StatusType = typeof statusValues[number];

export const orderSortByValues = ["date"] as const; 
export type OrderSortBy = typeof orderSortByValues[number]; 

export function parseOrderStatus(
    value: string | null
): StatusType | undefined {
    if (statusValues.includes(value as StatusType)) {
        return value as StatusType;
    }

    return undefined;
}

//? Payments
export const paymentStatusValues = ["pending", "approved", "rejected", "cancelled", "refunded", "expired"] as const; 
export type PaymentStatusType = typeof paymentStatusValues[number]; 


export const paymentSortByValues = ["date", "amount"] as const; 
export type PaymentSortBy = typeof paymentSortByValues[number]; 

export function parsePaymentStatus(
    value: string | null
) : PaymentStatusType | undefined {
    if (paymentStatusValues.includes(value as PaymentStatusType)) {
        return value as PaymentStatusType; 
    }

    return undefined; 
}

//* General
export const sortOrderValues = ["asc", "desc"] as const;
export type SortOrder = typeof sortOrderValues[number];

export function parseSortOrder(value: string | null): SortOrder {
    if (sortOrderValues.includes(value as SortOrder)) {
        return value as SortOrder;
    }
    return "desc";
}

export function getFirst(value: string | string[] | undefined) : string | undefined {
    return Array.isArray(value) ? value[0] : value;
}

// Parse number query params
export function parseNumber(value: string | undefined) : number | undefined {
    if (!value) return undefined;
    const parsed = Number(value);
    return Number.isNaN(parsed) ? undefined : parsed;
};

// Parse boolean query params
export function parseBoolean(value: string | null, defaultValue: boolean) {
    if (value === "true") return true;
    if (value === "false") return false;
    return defaultValue;
}
