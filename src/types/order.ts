import z from "zod";
import { regionSchema } from "./auth";

export const orderStatusSchema = z.enum([
    "Esperando Pago", 
    "Procesando", 
    "En Transito", 
    "Entregado", 
    "Cancelado", 
    "Orden Expirada"
]); 

export const customerSchema = z.object({
    userId: z.string().nullable(), 
    email: z.email(), 
    name: z.string(), 
    surname: z.string(), 
    phone: z.string().optional(), 
    isGuest: z.boolean()
})

export const shippingAddressSchema = z.object({
    country: z.string(), 
    region: regionSchema, 
    city: z.string(), 
    cityArea: z.string(), 
    street: z.string(), 
    reference: z.string().optional(), 
    zipCode: z.string().optional(), 
})

export const itemSchema = z.object({
    productId: z.string(), 
    productName: z.string(), 
    productImage: z.string(), 
    basePrice: z.number().min(0), 
    discount: z.number().min(0).max(100), 
    finalPrice: z.number().min(0), 
    quantity: z.number().min(0), 
    itemTotal: z.number().min(0), 
})

export const orderSchema = z.object({
    trackingNumber: z.string(), 
    customer: customerSchema,
    shippingAddress: shippingAddressSchema,
    status: orderStatusSchema, 
    items: z.array(itemSchema), 

    subtotal: z.number(), 
    shipping: z.number().min(0), 
    shippingMethod: z.string(), 
    total: z.number().min(0),

    paymentId: z.string().optional(), 

    stockReservedAt: z.iso.datetime(),
    stockReservationExpiresAt: z.iso.datetime(),

    deliveredAt: z.iso.datetime().optional(), 
    
    saveData: z.boolean(), 

    createdAt: z
        .iso.datetime()
        .transform((str) => new Date(str)),
    updatedAt: z
        .iso.datetime()
        .transform((str) => new Date(str)),
})

export type OrderStatus = z.infer<typeof orderStatusSchema>
export type Item = z.infer<typeof itemSchema>
export type Customer = z.infer<typeof customerSchema>
export type Order = z.infer<typeof orderSchema>