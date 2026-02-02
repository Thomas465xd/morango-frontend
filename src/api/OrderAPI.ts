import api from "@/lib/axios";
import { isAxiosError } from "axios";
import { CreateOrderForm, getAuthUserOrdersResponseSchema, getOrderByNumberResponseSchema, getOrdersResponseSchema, orderSchema, OrderStatusKeys, UpdateOrderCheckoutForm } from "../types";

type OrderSearchParams = {
    page: number, 
    perPage: number,
    trackingNumber?: string, 
    status?: OrderStatusKeys, 
    email?: string, 
    hasPayment?: boolean, 
    isGuest?: boolean, 
    includeArchived?: boolean, 
    startDate?: Date, 
    endDate?: Date, 
    sortBy?: "date",
    sortOrder?: "asc" | "desc"
}

//? 📦 Get orders with filtering and sorting
export async function getOrders(params: OrderSearchParams) {
    try {
        //! Destructure Params
        const { 
            page, 
            perPage,
            trackingNumber, 
            status, 
            email,
            hasPayment, 
            isGuest, 
            includeArchived, 
            startDate, 
            endDate, 
            sortBy, 
            sortOrder
        } = params

        // Base URL
        let url = `/orders/admin?perPage=${perPage}&page=${page}`;

        //* Conditionally add trackingNumber if it exists
        if (trackingNumber) {
            url += `&trackingNumber=${encodeURIComponent(trackingNumber)}`;
        }

        //* Conditionally add status if it exists
        if (status) {
            url += `&status=${encodeURIComponent(status)}`;
        }

        //* Conditionally add email if it exists
        if (email) {
            url += `&email=${encodeURIComponent(email)}`;
        }

        //* Conditionally add hasPayment if it exists
        if (hasPayment) {
            url += `&hasPayment=${encodeURIComponent(hasPayment)}`;
        }

        //* Conditionally add isGuest if it exists
        if (isGuest) {
            url += `&isGuest=${encodeURIComponent(isGuest)}`;
        }

        //* Conditionally add includeArchived if it exists
        if (includeArchived) {
            url += `&includeArchived=${encodeURIComponent(includeArchived)}`;
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
        
        const response = getOrdersResponseSchema.safeParse(data);
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

//? 📋 Get Order by ID | ADMIN
export async function getOrderById(orderId: string) {
	try {
		const url = `/orders/admin/${orderId}`;
		const { data } = await api.get(url);
        //console.log("✅ Respuesta exitosa de la API:", response.data);

        const response = orderSchema.safeParse(data);
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

//? 📋 Get Order by Tracking Number | PUBLIC ORDER TRACKING & CHECKOUT
export async function getOrderByNumber(trackingNumber: string) {
	try {
		const url = `/orders/public/${trackingNumber}`;
		const { data } = await api.get(url);
        //console.log("✅ Respuesta exitosa de la API:", response.data);

        const response = getOrderByNumberResponseSchema.safeParse(data);
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

//? 🧱 Get authenticated orders for user 
export async function getAuthUserOrders(params: OrderSearchParams) {
    try {
        //! Destructure Params
        const { 
            page, 
            perPage,
            trackingNumber, 
            status, 
            sortBy, 
            sortOrder
        } = params

        // Base URL
        let url = `/orders?perPage=${perPage}&page=${page}`;

        //* Conditionally add trackingNumber if it exists
        if (trackingNumber) {
            url += `&trackingNumber=${encodeURIComponent(trackingNumber)}`;
        }

        //* Conditionally add status if it exists
        if (status) {
            url += `&status=${encodeURIComponent(status)}`;
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
        
        const response = getAuthUserOrdersResponseSchema.safeParse(data);
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

//? 📋 Get Order by ID | AUTH USER
export async function getAuthUserOrderById(orderId: string) {
	try {
		const url = `/orders/${orderId}`;
		const { data } = await api.get(url);
        // console.log("✅ Respuesta exitosa de la API:", data);

        const response = orderSchema.safeParse(data);
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

//? 🛠️ Register Order
export async function createOrder(formData: CreateOrderForm) {
	try {
		const url = "/orders";
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

//? ✍️ Update Order Checkout Info
export async function updateOrderCheckoutInfo({ orderId, formData } : { orderId: string, formData: UpdateOrderCheckoutForm }) {
	try {
		const url = `/orders/checkout/${orderId}`;
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

//? ✍️📋 Update Order Status | ADMIN
export async function updateOrderStatus({ orderId, status, deliveredAt } : { orderId: string, status: OrderStatusKeys, deliveredAt?: Date }) {
	try {
        // Only append deliveredAt if it exists
        const formData = deliveredAt ? {
            status, 
            deliveredAt
        } : {
            status
        }

		const url = `/orders/admin/status/${orderId}`;
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

//? ❌ Archive Order | Soft delete
export async function archiveOrder(orderId: string) {
	try {
		const url = `/orders/admin/archive/${orderId}`;
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

//? ❌ Delete Order 
export async function deleteOrder(orderId: string) {
	try {
		const url = `/orders/admin/${orderId}`;
		const response = await api.delete(url);

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