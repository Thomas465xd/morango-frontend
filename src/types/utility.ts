import z from "zod";

export const searchSchema = z.object({
	search: z
		.string()
		.trim()
		.min(3, { message: "La búsqueda debe ser de almenos 3 caracteres" }),
});

export const cartItemSchema = z.object({
    productId: z.string(), 
    quantity: z.number().min(1)
})

export type SearchForm = z.infer<typeof searchSchema>
export type CartItem = z.infer<typeof cartItemSchema>
export type Cart = CartItem[]; 


//? ⛓️ UTILITY ARRAYS, OBJECTS & ENUMS ⛓️ ?//

export const navigation = {
    pages: [
        { name: "Inicio", href: "/home"},
        { name: "Joyas", href: "/home/products"},
        { name: "Nosotros", href: "/home/about" },
        { name: "Preguntas Frecuentes", href: "/home/questions" },
        { name: "Contacto", href: "/home/contact"}, 
    ],
};

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