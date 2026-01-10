import z from "zod";

export const productTypesSchema = z.enum([
    "Anillo", 
    "Collar", 
    "Pulsera", 
    "Aros"
])

export const ringAttributesSchema = z.object({
    size: z.string(), 
    material: z.string(), 
    gemstone: z.string().optional(), 
    carats: z.string().optional(), 
})

export const necklaceAttributesSchema = z.object({
    length: z.string(), 
    material: z.string(), 
    claspType: z.string().optional(), 
    chainType: z.string().optional(), 
})

export const braceletAttributesSchema = z.object({
    length: z.string(), 
    material: z.string(), 
    claspType: z.string().optional(), 
    style: z.string().optional(), 
})

export const earringAttributesSchema = z.object({
    type: z.string(), 
    material: z.string(), 
    backType: z.string(), 
    length: z.string().optional(), 
})

export const productAttributesSchema = z.union([
    ringAttributesSchema, 
    necklaceAttributesSchema, 
    braceletAttributesSchema, 
    earringAttributesSchema
])

export const discountSchema = z.object({
    percentage: z.number().min(0).max(100), 
    isActive: z.boolean(), 
    startDate: z.iso.datetime().optional(), 
    endDate: z.iso.datetime().optional() 
})

export const productSchema = z.object({
    name: z.string(), 
    description: z.string(), 
    basePrice: z.number().min(0), 
    discount: discountSchema.optional(), 
    productType: productTypesSchema, 
    images: z.array(z.url()).min(3, {
        message: "El producto debe tener al menos 3 imágenes"
    }), 
    stock: z.number().min(0), 
    reserved: z.number().min(0), 
    category: z.string(), 
    tags: z.array(z.string()).optional(), 
    isActive: z.boolean(), 
    attributes: productAttributesSchema,
    createdAt: z
        .iso.datetime()
        .transform((str) => new Date(str)),
    updatedAt: z
        .iso.datetime()
        .transform((str) => new Date(str)),
})

export type ProductAttributes = z.infer<typeof productAttributesSchema>
export type Discount = z.infer<typeof discountSchema>
export type Product = z.infer<typeof productSchema>