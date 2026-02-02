import z from "zod";
import { regionSchema } from "./auth";
import { paymentSchema } from "./payment";

export const orderStatusSchema = z.enum([
    "Esperando Pago", 
    "Procesando", 
    "En Transito", 
    "Entregado", 
    "Cancelado", 
    "Orden Expirada"
]); 

export const orderStatusKeysSchema = z.enum([
    "Pending", 
    "Processing", 
    "Sent", 
    "Delivered", 
    "Cancelled", 
    "Expired"
])

export const customerSchema = z.object({
    userId: z.string().nullable(), 
    email: z.email().optional(), 
    name: z.string().optional(), 
    surname: z.string().optional(), 
    phone: z.string().optional(), 
    isGuest: z.boolean()
})

export const shippingAddressSchema = z.object({
    country: z.string(), 
    region: regionSchema.optional(), 
    city: z.string().optional(), 
    cityArea: z.string().optional(), 
    street: z.string().optional(), 
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
    id: z.string(), 
    trackingNumber: z.string(), 
    customer: customerSchema,
    shippingAddress: shippingAddressSchema,
    status: orderStatusSchema, 
    items: z.array(itemSchema), 

    subtotal: z.number(), 
    shipping: z.number().min(0).optional(), 
    shippingMethod: z.string().optional(), 
    total: z.number().min(0),

    paymentId: z.union([
        z.string().optional(), // For requests/old format
        paymentSchema // For admin response with populated order
    ]),

    stockReservedAt: z.iso.datetime(),
    stockReservationExpiresAt: z.iso.datetime(),

    archivedAt: z
        .nullable(
            z.iso.datetime().transform((str) => new Date(str))
        ),

    deliveredAt: z
        .nullable(
            z.iso.datetime().transform((str) => new Date(str))
        ),
    
    saveData: z.boolean().optional(), 

    createdAt: z
        .iso.datetime()
        .transform((str) => new Date(str)),
    updatedAt: z
        .iso.datetime()
        .transform((str) => new Date(str)),
})

export const orderTotalsSchema = orderSchema.pick({
    subtotal: true,
    shipping: true,
    total: true,
});


export const publicShippingAddressSchema = shippingAddressSchema.pick({
    country: true,
    region: true, 
    city: true, 
    cityArea: true,
});

export const publicCustomerSchema = customerSchema.pick({
    name: true,
    surname: true
});

export const getOrderByNumberResponseSchema = z.object({
    id: z.string(),
    trackingNumber: z.string(),
    status: orderStatusSchema,
    createdAt: z
        .iso.datetime()
        .transform((str) => new Date(str)),
    updatedAt: z
        .iso.datetime()
        .transform((str) => new Date(str)),
    stockReservationExpiresAt: z
        .iso.datetime()
        .transform((str) => new Date(str)),
    deliveredAt: z
        .iso.datetime()
        .nullable(),
    items: z.array(itemSchema), 
    totals: orderTotalsSchema,
    shippingAddress: publicShippingAddressSchema,
    shippingMethod: z.string().optional(),
    customer: publicCustomerSchema,
})

export const createOrderFormSchema = z.object({
    items: z.array(z.object({
        productId: z.string(), 
        quantity: z.number().min(1)
    }))
})

export const updateOrderFormSchema = z.object({
    customer: z.object({
        email: z.email(), 
        name: z.string(), 
        surname: z.string(), 
        phone: z.number().optional(), 
        isGuest: z.boolean(), 
    }), 
    shippingAddress: z.object({
        country: z.string(), 
        region: regionSchema, 
        city: z.string(), 
        cityArea: z.string(), 
        street: z.string(), 
        reference: z.string().optional(), 
        zipCode: z.string().optional(), 
    }), 
    shipping: z.number().min(0), 
    shippingMethod: z.string(), 
    saveData: z.boolean(),
})


export const getOrdersResponseSchema = z.object({
    orders: z.array(orderSchema), 
    totalOrders: z.number().min(0), 
    totalPages: z.number().min(0), 
    perPage: z.number().min(0), 
    currentPage: z.number().min(0), 
    filters: z.object({
        trackingNumber: z.string().nullable(), 
        status: z.string().nullable(), 
        email: z.string().nullable(), 
        hasPayment: z.boolean().nullable(), 
        isGuest: z.boolean().nullable(), 
        startDate: z
            .nullable(
                z.iso.datetime().transform((str) => new Date(str))
            ),
        endDate: z
            .nullable(
                z.iso.datetime().transform((str) => new Date(str))
            ),
        sortBy: z.enum([
            "date", 
            "createdAt"
        ]), 
        sortOrder: z.enum([
            "asc",
            "desc"
        ]), 
        includeArchived: z.boolean().nullable()
    })
})

export const getAuthUserOrdersResponseSchema = z.object({
    orders: z.array(orderSchema), 
    totalOrders: z.number().min(0), 
    totalPages: z.number().min(0), 
    perPage: z.number().min(0), 
    currentPage: z.number().min(0), 
    filters: z.object({
        trackingNumber: z.string().nullable(), 
        status: z.string().nullable(), 
        sortBy: z.enum([
            "date", 
            "createdAt"
        ]), 
        sortOrder: z.enum([
            "asc",
            "desc"
        ])
    })
})

export type OrderStatus = z.infer<typeof orderStatusSchema>
export type OrderStatusKeys = z.infer<typeof orderStatusKeysSchema>
export type Item = z.infer<typeof itemSchema>
export type Customer = z.infer<typeof customerSchema>
export type Order = z.infer<typeof orderSchema>
export type PublicOrder = z.infer<typeof getOrderByNumberResponseSchema>
export type CreateOrderForm = z.infer<typeof createOrderFormSchema>
export type UpdateOrderCheckoutForm = z.infer<typeof updateOrderFormSchema>