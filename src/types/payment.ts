import z, { any } from "zod";

export const paymentStatusSchema = z.enum([
    "pending", 
    "approved", 
    "rejected", 
    "cancelled", 
    "refunded", 
    "expired"
])

export const paymentSchema = z.object({
    orderId: z.string(), 
    provider: z.string(), 
    mpPaymentId: z.string().optional(), 
    mpPreferenceId: z.string(), 
    mpStatus: z.string().optional(), 
    amount: z.number().min(0), 
    currency: z.enum(["CLP"]), 
    status: paymentStatusSchema, 
    rejectionReason: z.string().optional(), 
    paymentMethod: z.string().optional(), 
    metadata: z.object(any).optional(), 
    createdAt: z
        .iso.datetime()
        .transform((str) => new Date(str)),
    updatedAt: z
        .iso.datetime()
        .transform((str) => new Date(str)),
})

export type PaymentStatus = z.infer<typeof paymentStatusSchema>
export type Payment = z.infer<typeof paymentSchema>