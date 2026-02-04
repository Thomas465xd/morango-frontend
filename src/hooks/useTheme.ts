import { useEffect, useState } from "react";
import type { SweetAlertTheme } from "sweetalert2";

/**
 * Hook to safely get theme from localStorage after hydration
 * Prevents hydration mismatch by only reading localStorage on client
 */
export const useThemeForModal = () => {
    const [theme, setTheme] = useState<SweetAlertTheme | "light">("light");

    useEffect(() => {
        const storedTheme = localStorage.getItem("theme") as SweetAlertTheme | null;
        setTheme(storedTheme || "light");
    }, []);

    return theme;
};
