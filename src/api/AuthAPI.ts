import { isAxiosError } from "axios";
import { getUsersSchema, LoginUserForm, RegisterUserForm, ResetPasswordForm, UpdateUserPasswordForm, UpdateUserProfileForm, userSchema } from "../types";
import api from "@/lib/axios";

type OrderSearchParams = {
    page: number, 
    perPage: number,
    confirmed?: boolean, 
    search?: string, 
    sortBy?: "name",
    sortOrder?: "asc" | "desc"
}

//? 📦 Get users with filtering and sorting
export async function getUsers(params: OrderSearchParams) {
    try {
        //! Destructure Params
        const { 
            page, 
            perPage,
            confirmed, 
            search, 
            sortBy, 
            sortOrder
        } = params

        // Base URL
        let url = `/auth/admin?perPage=${perPage}&page=${page}`;

        //* Conditionally add confirmed if it exists
        if (confirmed) {
            url += `&confirmed=${encodeURIComponent(confirmed)}`;
        }

        //* Conditionally add search if it exists
        if (search) {
            url += `&search=${encodeURIComponent(search)}`;
        }

        //* Conditionally add sortBy if it exists
        if (sortBy) {
            url += `&sortBy=${encodeURIComponent(sortBy)}`;
        }

        //* Conditionally add sortOrder if it exists
        if (sortOrder) {
            url += `&sortOrder=${encodeURIComponent(sortOrder)}`;
        }

        const { data } = await api.get(url);
        //console.log(data)
        
        const response = getUsersSchema.safeParse(data);
        if(response.success) {
            //console.log("✅ Respuesta exitosa de la API:", response.data);
            return response.data;
        }

        console.error("Schema Validation Failed", response.error);
    } catch (error) {
        console.error("❌ Error en la solicitud:", error);

        if (isAxiosError(error)) {
            console.error("🔍 Error de Axios detectado:");
            console.error("➡️ Código de estado:", error.response?.status);
            console.error("➡️ Mensaje de error:", error.response?.data?.errors || error.message);
            console.error("➡️ Respuesta completa:", error.response?.data);

            // Lanzamos un error más detallado para que pueda ser manejado correctamente
            throw new Error(error.response?.data?.errors[0].message || "Ocurrió un error en la API");
        } else {
            console.error("⚠️ Error desconocido:", error);
            throw new Error("Error inesperado. Intenta nuevamente.");
        }
	}
}

//? ♟️ Get user by ID
export async function getUserById(userId: string) {
    try {
        const { data } = await api.get(`/auth/admin/${userId}`)
        
        const response = userSchema.safeParse(data);
        if(response.success) {
            //console.log("✅ Respuesta exitosa de la API:", response.data);
            return response.data;
        }

        console.error("Schema Validation Failed", response.error);
    } catch (error) {
        console.error("❌ Error en la solicitud:", error);

        if (isAxiosError(error)) {
            console.error("🔍 Error de Axios detectado:");
            console.error("➡️ Código de estado:", error.response?.status);
            console.error("➡️ Mensaje de error:", error.response?.data?.errors || error.message);
            console.error("➡️ Respuesta completa:", error.response?.data);

            // Lanzamos un error más detallado para que pueda ser manejado correctamente
            throw new Error(error.response?.data?.errors[0].message || "Ocurrió un error en la API");
        } else {
            console.error("⚠️ Error desconocido:", error);
            throw new Error("Error inesperado. Intenta nuevamente.");
        }
	}
}

//? 🛠️ Register new user account
export async function createAccount(formData: RegisterUserForm) {
	try {
		const url = "/auth/register";
		const response = await api.post(url, formData);

		return response.data;
	} catch (error) {
        console.error("❌ Error en la solicitud:", error);

        if (isAxiosError(error)) {
            console.error("🔍 Error de Axios detectado:");
            console.error("➡️ Código de estado:", error.response?.status);
            console.error("➡️ Mensaje de error:", error.response?.data?.errors || error.message);
            console.error("➡️ Respuesta completa:", error.response?.data);

            // Lanzamos un error más detallado para que pueda ser manejado correctamente
            throw new Error(error.response?.data?.errors[0].message || "Ocurrió un error en la API");
        } else {
            console.error("⚠️ Error desconocido:", error);
            throw new Error("Error inesperado. Intenta nuevamente.");
        }
	}
}

//? 📋 Login user
export async function login(formData: LoginUserForm) {
	try {
		const url = "/auth/login";
		const response = await api.post(url, formData);
        
		return response.data;
	} catch (error) {
        console.error("❌ Error en la solicitud:", error);

        if (isAxiosError(error)) {
            console.error("🔍 Error de Axios detectado:");
            console.error("➡️ Código de estado:", error.response?.status);
            console.error("➡️ Mensaje de error:", error.response?.data?.errors || error.message);
            console.error("➡️ Respuesta completa:", error.response?.data);

            // Lanzamos un error más detallado para que pueda ser manejado correctamente
            throw new Error(error.response?.data?.errors[0].message || "Ocurrió un error en la API");
        } else {
            console.error("⚠️ Error desconocido:", error);
            throw new Error("Error inesperado. Intenta nuevamente.");
        }
	}
}

//? 📥 Resend email verification code 
export async function resendCode(formData: { email: string }) {
	try {
		const url = "/auth/resend-verification";
		const response = await api.post(url, formData);

		return response.data;
	} catch (error) {
        console.error("❌ Error en la solicitud:", error);

        if (isAxiosError(error)) {
            console.error("🔍 Error de Axios detectado:");
            console.error("➡️ Código de estado:", error.response?.status);
            console.error("➡️ Mensaje de error:", error.response?.data?.errors || error.message);
            console.error("➡️ Respuesta completa:", error.response?.data);

            // Lanzamos un error más detallado para que pueda ser manejado correctamente
            throw new Error(error.response?.data?.errors[0].message || "Ocurrió un error en la API");
        } else {
            console.error("⚠️ Error desconocido:", error);
            throw new Error("Error inesperado. Intenta nuevamente.");
        }
	}
}

//? 📥 Resend email verification code 
export async function confirmToken(token: string) {
	try {
		const url = `/auth/confirm/${token}`;
		const response = await api.post(url);

		return response.data;
	} catch (error) {
        console.error("❌ Error en la solicitud:", error);

        if (isAxiosError(error)) {
            console.error("🔍 Error de Axios detectado:");
            console.error("➡️ Código de estado:", error.response?.status);
            console.error("➡️ Mensaje de error:", error.response?.data?.errors || error.message);
            console.error("➡️ Respuesta completa:", error.response?.data);

            // Lanzamos un error más detallado para que pueda ser manejado correctamente
            throw new Error(error.response?.data?.errors[0].message || "Ocurrió un error en la API");
        } else {
            console.error("⚠️ Error desconocido:", error);
            throw new Error("Error inesperado. Intenta nuevamente.");
        }
	}
}

//? 📥 Send forgot password email
export async function forgotPasswordEmail(formData: { email: string }) {
	try {
		const url = `/auth/forgot-password`;
		const response = await api.post(url, formData);

		return response.data;
	} catch (error) {
        console.error("❌ Error en la solicitud:", error);

        if (isAxiosError(error)) {
            console.error("🔍 Error de Axios detectado:");
            console.error("➡️ Código de estado:", error.response?.status);
            console.error("➡️ Mensaje de error:", error.response?.data?.errors || error.message);
            console.error("➡️ Respuesta completa:", error.response?.data);

            // Lanzamos un error más detallado para que pueda ser manejado correctamente
            throw new Error(error.response?.data?.errors[0].message || "Ocurrió un error en la API");
        } else {
            console.error("⚠️ Error desconocido:", error);
            throw new Error("Error inesperado. Intenta nuevamente.");
        }
	}
}

//? 🔐 Reset password with token
export async function resetPassword({ token, formData } : { token: string, formData: ResetPasswordForm }) {
	try {
		const url = `/auth/reset-password/${token}`;
		const response = await api.post(url, formData );

		return response.data;
	} catch (error) {
        console.error("❌ Error en la solicitud:", error);

        if (isAxiosError(error)) {
            console.error("🔍 Error de Axios detectado:");
            console.error("➡️ Código de estado:", error.response?.status);
            console.error("➡️ Mensaje de error:", error.response?.data?.errors || error.message);
            console.error("➡️ Respuesta completa:", error.response?.data);

            // Lanzamos un error más detallado para que pueda ser manejado correctamente
            throw new Error(error.response?.data?.errors[0].message || "Ocurrió un error en la API");
        } else {
            console.error("⚠️ Error desconocido:", error);
            throw new Error("Error inesperado. Intenta nuevamente.");
        }
	}
}

//? ♟️ Get current authenticated user
export async function getUser() {
	try {
		const url = "/auth/user";
		const response = await api.get(url);

		return response.data;
	} catch (error) {
        console.error("❌ Error en la solicitud:", error);

        if (isAxiosError(error)) {
            console.error("🔍 Error de Axios detectado:");
            console.error("➡️ Código de estado:", error.response?.status);
            console.error("➡️ Mensaje de error:", error.response?.data?.errors || error.message);
            console.error("➡️ Respuesta completa:", error.response?.data);

            // Lanzamos un error más detallado para que pueda ser manejado correctamente
            throw new Error(error.response?.data?.errors[0].message || "Ocurrió un error en la API");
        } else {
            console.error("⚠️ Error desconocido:", error);
            throw new Error("Error inesperado. Intenta nuevamente.");
        }
	}
}

//? ⛓️ Logout 
export async function logout() {
	try {
		const url = "/auth/logout";
		const response = await api.post(url);

		return response.data;
	} catch (error) {
        console.error("❌ Error en la solicitud:", error);

        if (isAxiosError(error)) {
            console.error("🔍 Error de Axios detectado:");
            console.error("➡️ Código de estado:", error.response?.status);
            console.error("➡️ Mensaje de error:", error.response?.data?.errors || error.message);
            console.error("➡️ Respuesta completa:", error.response?.data);

            // Lanzamos un error más detallado para que pueda ser manejado correctamente
            throw new Error(error.response?.data?.errors[0].message || "Ocurrió un error en la API");
        } else {
            console.error("⚠️ Error desconocido:", error);
            throw new Error("Error inesperado. Intenta nuevamente.");
        }
	}
}

//? 🪪 Update Profile | AUTH
export async function updateProfile(formData : UpdateUserProfileForm) {
	try {
		const url = "/auth/profile";
		const response = await api.patch(url, formData);

		return response.data;
	} catch (error) {
        console.error("❌ Error en la solicitud:", error);

        if (isAxiosError(error)) {
            console.error("🔍 Error de Axios detectado:");
            console.error("➡️ Código de estado:", error.response?.status);
            console.error("➡️ Mensaje de error:", error.response?.data?.errors || error.message);
            console.error("➡️ Respuesta completa:", error.response?.data);

            // Lanzamos un error más detallado para que pueda ser manejado correctamente
            throw new Error(error.response?.data?.errors[0].message || "Ocurrió un error en la API");
        } else {
            console.error("⚠️ Error desconocido:", error);
            throw new Error("Error inesperado. Intenta nuevamente.");
        }
	}
}

//? 🪪 Update Password | AUTH
export async function updatePassword(formData : UpdateUserPasswordForm) {
	try {
		const url = "/auth/update-password";
		const response = await api.patch(url, formData);

		return response.data;
	} catch (error) {
        console.error("❌ Error en la solicitud:", error);

        if (isAxiosError(error)) {
            console.error("🔍 Error de Axios detectado:");
            console.error("➡️ Código de estado:", error.response?.status);
            console.error("➡️ Mensaje de error:", error.response?.data?.errors || error.message);
            console.error("➡️ Respuesta completa:", error.response?.data);

            // Lanzamos un error más detallado para que pueda ser manejado correctamente
            throw new Error(error.response?.data?.errors[0].message || "Ocurrió un error en la API");
        } else {
            console.error("⚠️ Error desconocido:", error);
            throw new Error("Error inesperado. Intenta nuevamente.");
        }
	}
}