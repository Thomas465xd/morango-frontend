import z from "zod";

export const searchSchema = z.object({
	search: z
		.string()
		.trim()
		.min(3, { message: "La búsqueda debe ser de almenos 3 caracteres" }),
});

export type SearchForm = z.infer<typeof searchSchema>