import z from "zod";

export const productTypesSchema = z.enum([
	"Anillo",
	"Collar",
	"Pulsera",
	"Aros",
]);

export const ringAttributesSchema = z.object({
	size: z.string(),
	material: z.string(),
	gemstone: z.string().optional(),
	carats: z.number().optional(),
});

export const necklaceAttributesSchema = z.object({
	length: z.string(),
	material: z.string(),
	claspType: z.string().optional(),
	chainType: z.string().optional(),
});

export const braceletAttributesSchema = z.object({
	length: z.string(),
	material: z.string(),
	claspType: z.string().optional(),
	style: z.string().optional(),
});

export const earringAttributesSchema = z.object({
	type: z.string(),
	material: z.string(),
	backType: z.string(),
	length: z.string().optional(),
});

export const ringProductSchema = z.object({
	productType: z.literal("Anillo"),
	attributes: ringAttributesSchema,
});

export const necklaceProductSchema = z.object({
	productType: z.literal("Collar"),
	attributes: necklaceAttributesSchema,
});

export const braceletProductSchema = z.object({
	productType: z.literal("Pulsera"),
	attributes: braceletAttributesSchema,
});

export const earringProductSchema = z.object({
	productType: z.literal("Aros"),
	attributes: earringAttributesSchema,
});

export const productAttributesByTypeSchema = z.discriminatedUnion(
	"productType",
	[
		ringProductSchema,
		necklaceProductSchema,
		braceletProductSchema,
		earringProductSchema,
	]
);

export const discountSchema = z.object({
	percentage: z.number().min(0).max(100),
	isActive: z.boolean(),
	startDate: z.iso.datetime().optional(),
	endDate: z.iso.datetime().optional(),
});

export const productSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    basePrice: z.number().min(0),
    discount: discountSchema.optional(),
    productType: productTypesSchema,
    images: z.array(z.url()).min(3, {
        message: "El producto debe tener al menos 3 imágenes",
    }),
    stock: z.number().min(0),
    reserved: z.number().min(0),
    category: z.string(),
    tags: z.array(z.string()).optional(),
    isActive: z.boolean(),
    createdAt: z.iso.datetime().transform((str) => new Date(str)),
    updatedAt: z.iso.datetime().transform((str) => new Date(str)),

}).and(productAttributesByTypeSchema);

export const categoryCountSchema = z.object({
    productCount: z.number().min(0), 
    category: z.string()
})

export const productCategoriesResponseSchema = z.object({
	categories: z.array(
		categoryCountSchema
	),
	totalCategories: z.number().min(0),
	totalProducts: z.number().min(0),
});

export const enrichedProductSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string(),
    basePrice: z.number().min(0),
    discount: discountSchema.optional(),
    productType: productTypesSchema,
    images: z.array(z.url()).min(3, {
        message: "El producto debe tener al menos 3 imágenes",
    }),
    stock: z.number().min(0),
    reserved: z.number().min(0),
    category: z.string(),
    tags: z.array(z.string()).optional(),
    isActive: z.boolean(),
    createdAt: z.iso.datetime().transform((str) => new Date(str)),
    updatedAt: z.iso.datetime().transform((str) => new Date(str)),

    finalPrice: z.number().min(0), 
    hasActiveDiscount: z.boolean(),
    savings: z.number().min(0), 
    availableStock: z.number().min(0), 

}).and(productAttributesByTypeSchema);

export const getProductsResponseSchema = z.object({
    products: z.array(enrichedProductSchema),
	totalProducts: z.number().int().min(0), 
	totalPages: z.number().int().min(0), 
	perPage: z.number().int().min(0), 
	currentPage: z.number().int().min(0), 
	filters: z.object({
		productType: z.union([
            productTypesSchema, 
            z.null()
        ]), 
        category: z.union([
            z.string(), 
            z.null()
        ]), 
        priceRange: z.union([
            z.object({
                min: z.string().optional(),
                max: z.string().optional(),
            }).refine(
                v => v.min !== undefined || v.max !== undefined,
                { message: "At least min or max must be defined" }
            ),
            z.null()
        ]),
        tags: z.union([
            z.array(z.string()), 
            z.null()
        ]), 
        onSale: z.boolean(), 
        sortBy: z.enum(["createdAt", "basePrice", "price", "name", "category"]), 
        sortOrder: z.enum(["asc", "desc"])
	})
})

export const getProductByIdResponseSchema = z.object({
    product: enrichedProductSchema, 
    relatedProducts:z.array(enrichedProductSchema)
})

export const getProductsByIdsResponseSchema = z.object({
    products: z.array(enrichedProductSchema), 
    total: z.number().min(0)
})

export type ProductTypes = z.infer<typeof productTypesSchema>;
export type ProductAttributes = z.infer<typeof productAttributesByTypeSchema>;
export type DiscountForm = z.infer<typeof discountSchema>;
export type Product = z.infer<typeof productSchema>;
export type EnrichedProduct = z.infer<typeof enrichedProductSchema>
export type ProductForm = Pick<
    Product,
    | "name"
    | "description"
    | "basePrice"
    | "productType"
    | "images"
    | "stock"
    | "category"
    | "tags"
    | "isActive"
> & {
    attributes: Attributes;
};

export type CategoryCount = z.infer<typeof categoryCountSchema>; 
export type RingAttributes = z.infer<typeof ringAttributesSchema>;
export type NecklaceAttributes = z.infer<typeof necklaceAttributesSchema>;
export type BraceletAttributes = z.infer<typeof braceletAttributesSchema>;
export type EarringAttributes = z.infer<typeof earringAttributesSchema>;

export type Attributes =
    | RingAttributes
    | NecklaceAttributes
    | BraceletAttributes
    | EarringAttributes;