import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { CreatePaymentForm, getPaymentsAdminResponseSchema, getPaymentStatusResponseSchema, paymentSchema, PaymentStatus, retryPaymentResponseSchema } from "../types";

type PaymentSearchParams = {
    page: number, 
    perPage: number,
    search?: string, // Email or tracking Number 
    status?: PaymentStatus, 
    startDate?: Date, 
    endDate?: Date, 
    sortBy?: "date" | "amount",
    sortOrder?: "asc" | "desc"
}

//* 📦 Get Payments with filtering and sorting
export async function getPayments(params: PaymentSearchParams) {
    try {
        //! Destructure Params
        const { 
            page, 
            perPage,
            search, 
            status, 
            startDate, 
            endDate, 
            sortBy, 
            sortOrder
        } = params

        // Base URL
        let url = `/payments/admin?perPage=${perPage}&page=${page}`;

        //* Conditionally add search if it exists
        if (search) {
            url += `&search=${encodeURIComponent(search)}`;
        }

        //* Conditionally add status if it exists
        if (status) {
            url += `&status=${encodeURIComponent(status)}`;
        }

        //* Conditionally add startDate if it exists
        if (startDate) {
            url += `&startDate=${encodeURIComponent(startDate.toISOString())}`;
        }

        //* Conditionally add endDate if it exists
        if (endDate) {
            url += `&endDate=${encodeURIComponent(endDate.toISOString())}`;
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
        
        const response = getPaymentsAdminResponseSchema.safeParse(data);
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

//* ⛓️ Get Payment by ID Admin
export async function getPaymentByIdAdmin(paymentId: string) {
	try {
		const url = `/payments/admin/${paymentId}`;
		const { data } = await api.get(url);
        // console.log(data)

        const response = paymentSchema.safeParse(data);
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

//* ⛓️ Get Payment by ID Auth User
export async function getPaymentByIdUser (paymentId: string) {
	try {
		const url = `/payments/${paymentId}`;
		const { data } = await api.get(url);

        const response = paymentSchema.safeParse(data);
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

//? 🛠️ Create MP Payment Preference
export async function createPreference(orderId: string) {
	try {
		const url = "/payments/create-preference";
		const response = await api.post(url, { orderId });

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

//? 🛠️ Retry MP Payment Preference | Update preference for an unpaid order
export async function retryPaymentPreference({ orderId, token } : { orderId: string, token: string }) {
	try {
		const url = `/payments/order/retry/${orderId}?token=${token}`;
		const { data } = await api.post(url);

        const response = retryPaymentResponseSchema.safeParse(data);
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

//? 🛠️ Create MP Payment
export async function createPayment(formData: CreatePaymentForm) {
	try {
		const url = "/payments/create-payment";
        // console.log("FormDATa", formData)
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

//? 🛠️ ADMIN Process Refund
export async function processRefund(paymentId: string) {
	try {
		const url = `/payments/admin/refund/${paymentId}`;
        // console.log("FormDATa", formData)
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

//* ⛓️ Get Payment status for order PUBLIC
export async function getPaymentStatus(orderId: string) {
	try {
		const url = `/payments/order/status/${orderId}`;
		const { data } = await api.get(url);

        const response = getPaymentStatusResponseSchema.safeParse(data);
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

// 	5416 7526 0258 2580 
// test master card for mp