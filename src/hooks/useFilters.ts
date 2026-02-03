import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";

type FilterValue = string | string[] | null;

export function useFilters() {
    const router = useRouter();
    const searchParams = useSearchParams();

    // Set a filter (string or array) and reset page
    const setFilter = (key: string, value: FilterValue) => {
        const params = new URLSearchParams(searchParams.toString());

        params.delete(key);

        if (Array.isArray(value)) {
            value.forEach(v => params.append(key, v));
        } else if (value !== null) {
            params.set(key, value);
        }

        params.set("page", "1");
        router.push(`?${params.toString()}`);
    };

    // Single-value update
    const update = (key: string, value: string | null) => {
        setFilter(key, value);
    };

    const toggleSort = <T extends string>(field: T) => {
        const params = new URLSearchParams(searchParams.toString());

        const currentSortBy = params.get("sortBy");
        const currentOrder = params.get("sortOrder") ?? "desc";

        if (currentSortBy === field) {
            params.set("sortOrder", currentOrder === "asc" ? "desc" : "asc");
        } else {
            params.set("sortBy", field);
            params.set("sortOrder", "asc");
        }

        params.set("page", "1");
        router.replace(`?${params.toString()}`);
    };

    const resetParams = () => {
        router.push("?page=1");
    };

    return { setFilter, update, resetParams, toggleSort };
}
