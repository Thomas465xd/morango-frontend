import z from "zod";

export const searchSchema = z.object({
	search: z
		.string()
		.trim()
		.min(3, { message: "La búsqueda debe ser de almenos 3 caracteres" }),
});

export type SearchForm = z.infer<typeof searchSchema>

export const productTypes = [
    { value: "Anillo", label: "Anillo" },
    { value: "Collar", label: "Collar" },
    { value: "Pulsera", label: "Pulsera" },
    { value: "Aros", label: "Aros" },
];

// More will be added in the future... 
// backend accepts any category, this is to enforce that admins don't randomly create new categories like
// gold, golden, Golden, Gold, etc...
export const categories = [
    "Anillos de Compromiso",
    "Fiesta", 
    "Casual", 
    "Oro",
    "Diamente",
    "Plata",
    "Piedras Preciosas",
];