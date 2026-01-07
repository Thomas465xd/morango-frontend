import { toast } from "react-toastify";

export const copyToClipboard = async (text: string, notification?: string) => {
    try {
        await navigator.clipboard.writeText(text);
        toast.info(notification || "Copiado al portapapeles");
    } catch (error) {
        toast.error("Error al copiar");
        console.error("Error al copiar:", error);
    }
};