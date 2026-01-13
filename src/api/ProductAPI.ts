import { isAxiosError } from "axios";
import { DiscountForm, ProductForm, ProductTypes, getProductsResponseSchema, productCategoriesResponseSchema } from "../types";
import api from "@/lib/axios";
import { CreateProductPayload } from "@/components/admin/products/CreateProductForm";

type ProductSearchParams = {
    page: number, 
    perPage: number,
    productType?: ProductTypes, 
    tags: string[], 
    category: string, 
    sale: boolean, 
    minPrice: number, 
    maxPrice: number, 
    isActive: boolean, 
    search: string,
    sortBy: "basePrice" | "name" | "category",
    sortOrder: "asc" | "desc"
}

//? 📦 Get products with filtering and sorting
export async function getProducts(params: ProductSearchParams) {
    try {
        //! Destructure Params
        const { 
            page, 
            perPage,
            productType, // Aros, Anillo
            tags, // ?tags=silver,gold || ?tags=silver&tags=gold
            category, // 
            sale, 
            minPrice, 
            maxPrice, 
            isActive, 
            search,
            sortBy, 
            sortOrder
        } = params

        // Base URL
        let url = `/products?perPage=${perPage}&page=${page}`;

        //* Conditionally add search (name or description) if it exists
        if (search) {
            url += `&search=${encodeURIComponent(search)}`;
        }

        //* Conditionally add productType if it exists
        if (productType) {
            url += `&productType=${encodeURIComponent(productType)}`;
        }

        //* Conditionally add tags if it exists
        if (tags && tags.length > 0) {
            url += `&tags=${encodeURIComponent(tags.join(","))}`;
        }

        //* Conditionally add category if it exists
        if (category) {
            url += `&category=${encodeURIComponent(category)}`;
        }

        //* Conditionally add sale if it exists
        if (sale) {
            url += `&sale=${encodeURIComponent(sale)}`;
        }

        //* Conditionally add minPrice if it exists
        if (minPrice) {
            url += `&minPrice=${encodeURIComponent(minPrice)}`;
        }

       //* Conditionally add maxPrice if it exists
        if (maxPrice) {
            url += `&maxPrice=${encodeURIComponent(maxPrice)}`;
        }

        //* Conditionally add isActive if it exists
        if (isActive !== undefined && isActive !== null) {
            url += `&isActive=${encodeURIComponent(isActive)}`;
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
        
        const response = getProductsResponseSchema.safeParse(data);
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

//? 📋 Get Products Categories with product count per category (list all unique categories) | pagination 
export async function getProductsCategories({ page, perPage } : { page: number, perPage: number }) {
	try {
		const url = `/auth/register?page=${page}&perPage=${perPage}`;
		const { data } = await api.get(url);
        //console.log("✅ Respuesta exitosa de la API:", response.data);

        const response = productCategoriesResponseSchema.safeParse(data);
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

//? 🛠️ Register new Product
export async function createProduct(formData: CreateProductPayload) {
	try {
		const url = "/products";
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

//? ✍️ Edit Product 
export async function updateProduct({ productId, formData } : { productId: string, formData: CreateProductPayload}) {
	try {
		const url = `/products/${productId}`;
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

//? ✍️ Update Product Discount
export async function updateDiscount({ productId, formData } : { productId: string, formData: DiscountForm }) {
	try {
		const url = `/products/discounts/${productId}`;
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

//? 🛠️ Register new Product
export async function deleteProduct(productId: string) {
	try {
		const url = `/products/${productId}`;
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