export function cleanAttributes(
    attrs: Record<string, unknown>
): Record<string, string | number> {
    return Object.fromEntries(
        Object.entries(attrs).filter(
        ([_, value]) =>
            value !== "" &&
            value !== undefined &&
            value !== null
        )
    ) as Record<string, string | number>;
}

export function sanitize<T>(obj: T): T {
    if (Array.isArray(obj)) {
        return obj
        .map(sanitize)
        .filter(v => v !== undefined) as unknown as T;
    }

    if (typeof obj === "object" && obj !== null) {
        const cleaned = Object.entries(obj)
        .filter(([_, value]) => value !== "" && value !== undefined && value !== null)
        .map(([key, value]) => [key, sanitize(value)]);

        return Object.fromEntries(cleaned) as T;
    }

    return obj;
}