import z from "zod";
import { orderStatusSchema } from "./order";

export const paymentStatusSchema = z.enum([
    "pending", 
    "approved", 
    "rejected", 
    "cancelled", 
    "refunded", 
    "expired"
])

// Schema for populated order reference in payment response
const populatedOrderSchema = z.object({
    id: z.string(),
    customer: z.object({
        email: z.string().email(),
        name: z.string(),
        surname: z.string()
    }),
    status: z.lazy(() => orderStatusSchema),
    trackingNumber: z.string(),
    total: z.number().min(0)
})

export const paymentSchema = z.object({
    id: z.string().optional(), // MongoDB _id field
    orderId: z.union([
        z.string(), // For requests/old format
        populatedOrderSchema // For admin response with populated order
    ]),
    provider: z.string(), 
    mpPaymentId: z.string().optional(), 
    mpPreferenceId: z.string(), 
    mpStatus: z.string().optional(), 
    amount: z.number().min(0), 
    currency: z.enum(["CLP"]), 
    status: paymentStatusSchema, 
    rejectionReason: z.string().optional(), 
    paymentMethod: z.string().optional(), 
    metadata: z.unknown().optional(),
    retryToken: z.string().optional(),
    retryTokenExpiresAt: z
        .union([
            z.string().datetime(),
            z.null()
        ])
        .optional()
        .transform((val) => val ? new Date(val) : undefined),
    createdAt: z
        .iso.datetime()
        .transform((str) => new Date(str)),
    updatedAt: z
        .iso.datetime()
        .transform((str) => new Date(str)),
})

export const createPaymentFormSchema = z.object({
    orderId: z.string(), 
    token: z.string(), 
    payment_method_id: z.string(), 
    installments: z.number().min(1), 
    issuer_id: z.union([z.string(), z.number()]).transform(String),
    payer: z.object({
        identification: z.object({
            number: z.union([z.string(), z.number()]).transform(String), 
            type: z.string()
        }),
        email: z.email()
    })
})

export const getPaymentStatusResponseSchema = z.object({
    trackingNumber: z.string(), 
    paymentStatus: paymentStatusSchema, 
    mpStatus: z.string(), 
    rejectionReason: z.string().nullable(), 
    paymentMethod: z.string().optional(), 
    amount: z.number().min(1),
    paymentId: z.string(), 
    orderStatus: z.lazy(() => orderStatusSchema),
    retryToken: z.string()
})

export const retryPaymentResponseSchema = z.object({
    message: z.string(), 
    orderId: z.string(), 
    amount: z.number().min(1), 
    paymentId: z.string(), 
    preferenceId: z.string(), 
    initPoint: z.string(), 
    sandboxInitPoint: z.string()
})

export const getPaymentsAdminResponseSchema = z.object({
    payments: z.array(paymentSchema), 
    totalPayments: z.number().min(0), 
    totalPages: z.number().min(0), 
    perPage: z.number().min(0), 
    currentPage: z.number().min(0), 
    filters: z.object({
        status: z.string().nullable(), 
        search: z.string().nullable(), 
        startDate: z
            .union([
                z.string().datetime(),
                z.null()
            ])
            .optional()
            .transform((val) => val ? new Date(val) : null),
        endDate: z
            .union([
                z.string().datetime(),
                z.null()
            ])
            .optional()
            .transform((val) => val ? new Date(val) : null),
        sortBy: z.enum([
            "date", 
            "createdAt"
        ]), 
        sortOrder: z.union([
            z.literal(1),
            z.literal(-1),
            z.enum(["asc", "desc"])
        ])
    })
})

export type PaymentStatus = z.infer<typeof paymentStatusSchema>
export type Payment = z.infer<typeof paymentSchema>
export type CreatePaymentForm = z.infer<typeof createPaymentFormSchema>
export type PopulatedOrder = z.infer<typeof populatedOrderSchema>