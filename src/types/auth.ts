import { z } from "zod";

export const regionSchema = z.enum([
    "Arica y Parinacota",
    "Tarapacá",
    "Antofagasta",
    "Atacama",
    "Coquimbo",
    "Valparaíso",
    "Metropolitana de Santiago",
    "O'Higgins",
    "Maule",
    "Ñuble",
    "Biobío",
    "La Araucanía",
    "Los Ríos",
    "Los Lagos",
    "Aysén",
    "Magallanes"
])

export const rolesSchema = z.enum([
    "customer", 
    "admin"
])

export const addressSchema = z.object({
    country: z.string().optional(), 
    region: regionSchema.optional(), 
    city: z.string().optional(), 
    cityArea: z.string().optional(), 
    street: z.string().optional(), 
    reference: z.string().optional(), 
    zipCode: z.string().optional()
})

export const userSchema = z.object({
    id: z.string(), 
    name: z.string(), 
    surname: z.string(), 
    email: z.email(), 
    phone: z.string().optional(), 
    password: z.string().nullable(), 
    confirmed: z.boolean(), 
    role: rolesSchema, 
    address: addressSchema, 

	createdAt: z
		.string()
		.datetime()
		.transform((str) => new Date(str)),
	updatedAt: z
		.string()
		.datetime()
		.transform((str) => new Date(str)),
})

export const getUserSchema = z.object({
    currentUser: userSchema
})

export const getUsersSchema = z.object({
    users: z.array(userSchema), 
    totalUsers: z.number().min(0), 
    totalPages: z.number().min(0), 
    perPage: z.number().min(0), 
    currentPage: z.number().min(0), 
    filters: z.object({
        confirmed: z.string().nullable(), 
        search: z.string().nullable(), 
        sortBy: z.string(), 
        sortOrder: z.number()
    })
})

export const registerSchema = z.object({
    name: z.string(), 
    surname: z.string(), 
    email: z.email(), 
    password: z.string().min(7), 
    confirmPassword: z.string().min(7), 
})

export const loginSchema = userSchema.pick({
    email: true, 
    password: true
})

export const resetPasswordSchema = registerSchema.pick({
    password: true, 
    confirmPassword: true, 
})

export const updatePasswordSchema = z.object({
    current_password: z.string(), 
    password: z.string(), 
    confirmPassword: z.string()
})

export const updateProfileSchema = userSchema.pick({
    name: true, 
    surname: true, 
    email: true, 
    phone: true, 
    address: true
}).merge(z.object({
    address: addressSchema.pick({
        country: true, 
        region: true, 
        city: true, 
        cityArea: true, 
        street: true, 
        zipCode: true
    })
}))

//? 📋 Auth Types
export type Regions = z.infer<typeof regionSchema>
export type Address = z.infer<typeof addressSchema>
export type Roles = z.infer<typeof rolesSchema>
export type User = z.infer<typeof userSchema>
export type RegisterUserForm = z.infer<typeof registerSchema>
export type LoginUserForm = z.infer<typeof loginSchema>
export type ResetPasswordForm= z.infer<typeof resetPasswordSchema>
export type UpdateUserPasswordForm= z.infer<typeof updatePasswordSchema>
export type UpdateUserProfileForm= z.infer<typeof updateProfileSchema> 