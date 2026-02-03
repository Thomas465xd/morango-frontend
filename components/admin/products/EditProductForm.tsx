"use client";
import React, { useEffect, useMemo, useRef, useState } from "react";
import Image from "next/image";
import { useForm } from "react-hook-form";
import {
	Upload,
	X,
	Package,
	DollarSign,
	Camera,
	Tag,
	Layers,
    ArrowBigRightDash,
    PencilLine,
} from "lucide-react";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getProductById, updateProduct } from "@/src/api/ProductAPI";
import { toast } from "react-toastify";
import { CldUploadWidget, CloudinaryUploadWidgetResults } from "next-cloudinary";
import Link from "next/link";
import { Attributes, BraceletAttributes, EarringAttributes, NecklaceAttributes, ProductForm, ProductTypes, RingAttributes } from "@/src/types/product";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { FieldErrors } from "react-hook-form";
import { useRouter } from "next/navigation";
import AdminFormSkeleton from "@/components/skeletons/AdminFormSkeleton";
import { categories, productTypes } from "@/src/types";

function isRingErrors(
    errors: FieldErrors<Attributes> | undefined
): errors is FieldErrors<RingAttributes> {
    return !!errors;
}

function isNecklaceErrors(
    errors: FieldErrors<Attributes> | undefined
): errors is FieldErrors<NecklaceAttributes> {
    return !!errors;
}

function isEarringErrors(
    errors: FieldErrors<Attributes> | undefined
): errors is FieldErrors<EarringAttributes> {
    return !!errors;
}

function isBraceletErrors(
    errors: FieldErrors<Attributes> | undefined
): errors is FieldErrors<BraceletAttributes> {
    return !!errors;
}

export type CreateProductPayload = Omit<ProductForm, "attributes"> & {
    attributes: Record<string, string | number>;
};

type EditProductFormProps = {
    productId: string
}

export default function EditProductForm({ productId } : EditProductFormProps) {
	const [uploadedImages, setUploadedImages] = useState<string[]>([]);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [tagInput, setTagInput] = useState("");
	const queryClient = useQueryClient();
    const router = useRouter(); 

    // Get product by ID
    const { data, isLoading, isError } = useQuery({
        queryKey: ["products", productId],
        queryFn: () => getProductById(productId),
        retry: false, 
        refetchOnWindowFocus: false,
        refetchOnReconnect: false,
        staleTime: Infinity,
    }); 

    const product = useMemo(() => data?.product, [data]);

    // console.log(product?.attributes)


    //? Update product mutation
	const { mutate } = useMutation({
		mutationFn: ({ productId, formData } : { productId: string, formData: CreateProductPayload}) => updateProduct({ productId, formData }),
		onError: (error) => {
			toast.error(error.message || "Error al crear el producto ❌");
		},
		onSuccess: (data) => {
			queryClient.invalidateQueries({ queryKey: ["products", productId] });
			toast.success(data.message || "Producto actualizado exitosamente 🎉");

			reset();
			setUploadedImages([]);

            router.back(); 
		},
	});

    const attributeDefaultsByType: Record<ProductTypes, Attributes> = {
        Anillo: {
            size: "",
            material: "",
            gemstone: undefined,
            carats: undefined,
        },
        Collar: {
            length: "",
            material: "",
            claspType: undefined,
            chainType: undefined,
        },
        Pulsera: {
            length: "",
            material: "",
            claspType: undefined,
            style: undefined,
        },
        Aros: {
            type: "",
            material: "",
            backType: "",
            length: undefined,
        },
    };

    const defaultProductType: ProductTypes = "Anillo";

    const initialValues: ProductForm = {
        name: "",
        description: "",
        basePrice: 0,
        productType: defaultProductType,
        images: [],
        stock: 0,
        category: "",
        tags: [],
        isActive: true,
        attributes: attributeDefaultsByType[defaultProductType],
    };

	const {
		register,
		handleSubmit,
		formState: { errors },
		setValue,
		watch,
		reset,
	} = useForm<ProductForm>({
		defaultValues: initialValues,
		mode: "onChange",
        shouldUnregister: false
	});

    //! Refetch form data | For async communication
    const didInitRef = useRef(false);

    useEffect(() => {
        if (product && !didInitRef.current) {
            didInitRef.current = true

			const formData : ProductForm = {
				name: product.name ?? "",
				description: product.description ?? "",
                basePrice: product.basePrice ?? 0,
				productType: product.productType ?? defaultProductType, // Cast to correct union type
				images: product.images ?? [],
                stock: product.stock ?? 0, 
                category: product.category ?? "", 
                tags: product.tags ?? [], 
                isActive: product.isActive ?? true, 
                attributes: product.attributes ?? attributeDefaultsByType[product.productType ?? defaultProductType]
			};
			
			// Reset form with new data
			reset(formData);
            
            // Sync uploadedImages state with form images
            setUploadedImages(product.images ?? []);
            
            // Ensure images field is properly set
            setValue("images", product.images ?? []);

            // Ensure tags field is properly set
            setValue("tags", product.tags ?? [])
        }
    }, [product, reset, setValue]);

	const selectedProductType = watch("productType");
	const currentTags = watch("tags") || product?.tags || [];

    const prevTypeRef = useRef<ProductTypes | null>(null);

    useEffect(() => {
        if (
            prevTypeRef.current &&
            prevTypeRef.current !== selectedProductType
        ) {
            setValue(
                "attributes",
                attributeDefaultsByType[selectedProductType]
            );
        }

        prevTypeRef.current = selectedProductType;
    }, [selectedProductType, setValue]);

    //& Cloudinary Image Uploads &//
	useEffect(() => {
		register("images", {
			required: "Se requieren al menos 3 imágenes",
			validate: (value) => {
				if (!value || value.length < 3) {
					return "Se requieren al menos 3 imágenes";
				}
				if (value.length > 10) {
					return "Máximo 10 imágenes permitidas";
				}
				return true;
			},
		});
	}, [register]);

    const handleCloudinaryUpload = (results: CloudinaryUploadWidgetResults) => {
        if (results.event === "success" && results.info) {
            const imageUrl = (results.info as { secure_url: string }).secure_url;

            setUploadedImages((prev) => {
                const newImages = [...prev, imageUrl];
                setValue("images", newImages, {
                    shouldValidate: true,
                    shouldDirty: true,
                    shouldTouch: true,
                });
                return newImages;
            });
        }
    };

	const removeImage = (index: number) => {
		setUploadedImages((prev) => {
			const newImages = prev.filter((_, i) => i !== index);
			setValue("images", newImages, {
				shouldValidate: true,
				shouldDirty: true,
				shouldTouch: true,
			});
			return newImages;
		});
	};

	const addTag = () => {
		if (tagInput.trim() && currentTags.length < 10) {
			const newTags = [...currentTags, tagInput.trim()];
			setValue("tags", newTags, { shouldValidate: true });
			setTagInput("");
		}
	};

	const removeTag = (index: number) => {
		const newTags = currentTags.filter((_, i) => i !== index);
		setValue("tags", newTags, { shouldValidate: true });
	};
    
    function cleanAttributes(
        attrs: Record<string, unknown>
    ): Record<string, string | number> {
        return Object.fromEntries(
            Object.entries(attrs).filter(
            ([_, value]) =>
                value !== "" &&
                value !== undefined &&
                value !== null
            )
        ) as Record<string, string | number>;
    }


    const onSubmit = async (formData: ProductForm) => {
        const payload: CreateProductPayload = {
            ...formData,
            attributes: cleanAttributes(formData.attributes),
            images: formData.images.filter(Boolean),
            tags: formData.tags?.filter(Boolean),
        };

        console.log("Payload sent to API:", payload);

        setIsSubmitting(true);
        try {
            await mutate({ productId, formData: payload });
        } finally {
            setIsSubmitting(false);
        }
    };

    if(isError) return null; 

    if(isLoading) return <AdminFormSkeleton />

	const renderAttributeFields = () => {
		switch (selectedProductType) {
			case "Anillo":
				return (
					<>
						<div>
							<label className="block text-sm font-medium mb-2">
								Talla <span className="text-red-500">*</span>
							</label>
							<input
								{...register("attributes.size", {
                                    required: "La talla no puede ir vacía"
                                })}
								type="text"
								placeholder="6, 7, 8..."
								className="input-admin"
							/>
                            {isRingErrors(errors.attributes) && errors.attributes.size && (
                                <ErrorMessage variant="inline">
                                    {errors.attributes.size.message}
                                </ErrorMessage>
                            )}
						</div>
						<div>
							<label className="block text-sm font-medium mb-2">
								Material <span className="text-red-500">*</span>
							</label>
							<input
								{...register("attributes.material", {
                                    required: "El material no puede ir vacío"
                                })}
								type="text"
								placeholder="Oro, Plata..."
								className="input-admin"
							/>
							{errors.attributes?.material && (
								<ErrorMessage variant="inline">
									{errors.attributes.material.message}
								</ErrorMessage>
							)}
						</div>
						<div>
							<label className="block text-sm font-medium mb-2">
								Piedra (opcional)
							</label>
							<input
								{...register("attributes.gemstone")}
								type="text"
								placeholder="Diamante, Rubí..."
								className="w-full px-4 py-3 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-stone-900 dark:text-white placeholder-stone-500 dark:placeholder-stone-400 focus:border-orange-300 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-100 focus:outline-none transition-colors"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-2">
								Quilates (opcional)
							</label>
							<input
								{...register("attributes.carats", {
                                    valueAsNumber: true,
                                    min: {
                                        value: 0.1, 
                                        message: "Los quilates deben ser mayor a 0.1"
                                    }
                                })}
								type="number"
								placeholder="0.5, 1.0..."
								className="w-full px-4 py-3 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-stone-900 dark:text-white placeholder-stone-500 dark:placeholder-stone-400 focus:border-orange-300 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-100 focus:outline-none transition-colors"
							/>
						</div>
					</>
				);

			case "Collar":
				return (
					<>
						<div>
							<label className="block text-sm font-medium mb-2">
								Largo <span className="text-red-500">*</span>
							</label>
							<input
								{...register("attributes.length")}
								type="text"
								placeholder="40cm, 50cm..."
								className="input-admin"
							/>
                            {isNecklaceErrors(errors.attributes) && errors.attributes.length && (
                                <ErrorMessage variant="inline">
                                    {errors.attributes.length.message}
                                </ErrorMessage>
                            )}
						</div>
						<div>
							<label className="block text-sm font-medium mb-2">
								Material <span className="text-red-500">*</span>
							</label>
							<input
								{...register("attributes.material")}
								type="text"
								placeholder="Oro, Plata..."
								className="input-admin"
							/>
                            {isNecklaceErrors(errors.attributes) && errors.attributes.material && (
                                <ErrorMessage variant="inline">
                                    {errors.attributes.material.message}
                                </ErrorMessage>
                            )}
						</div>
						<div>
							<label className="block text-sm font-medium mb-2">
								Tipo de Cierre (opcional)
							</label>
							<input
								{...register("attributes.claspType")}
								type="text"
								placeholder="Langosta, Resorte..."
								className="input-admin"
							/>
                            {isNecklaceErrors(errors.attributes) && errors.attributes.claspType && (
                                <ErrorMessage variant="inline">
                                    {errors.attributes.claspType.message}
                                </ErrorMessage>
                            )}
						</div>
						<div>
							<label className="block text-sm font-medium mb-2">
								Tipo de Cadena (opcional)
							</label>
							<input
								{...register("attributes.chainType")}
								type="text"
								placeholder="Cable, Barbada..."
								className="w-full px-4 py-3 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-stone-900 dark:text-white placeholder-stone-500 dark:placeholder-stone-400 focus:border-orange-300 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-100 focus:outline-none transition-colors"
							/>
						</div>
					</>
				);

			case "Pulsera":
				return (
					<>
						<div>
							<label className="block text-sm font-medium mb-2">
								Largo <span className="text-red-500">*</span>
							</label>
							<input
								{...register("attributes.length", {
                                    required: "El largo no puede ir vacío"
                                })}
								type="text"
								placeholder="18cm, 20cm..."
								className="input-admin"
							/>
                            {isBraceletErrors(errors.attributes) && errors.attributes.length && (
                                <ErrorMessage variant="inline">
                                    {errors.attributes.length.message}
                                </ErrorMessage>
                            )}
						</div>
						<div>
							<label className="block text-sm font-medium mb-2">
								Material <span className="text-red-500">*</span>
							</label>
							<input
								{...register("attributes.material", {
                                    required: "El material no puede ir vacío"
                                })}
								type="text"
								placeholder="Oro, Plata..."
								className="input-admin"
							/>
                            {isBraceletErrors(errors.attributes) && errors.attributes.material && (
                                <ErrorMessage variant="inline">
                                    {errors.attributes.material.message}
                                </ErrorMessage>
                            )}
						</div>
						<div>
							<label className="block text-sm font-medium mb-2">
								Tipo de Cierre (opcional)
							</label>
							<input
								{...register("attributes.claspType")}
								type="text"
								placeholder="Langosta, Resorte..."
								className="w-full px-4 py-3 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-stone-900 dark:text-white placeholder-stone-500 dark:placeholder-stone-400 focus:border-orange-300 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-100 focus:outline-none transition-colors"
							/>
						</div>
						<div>
							<label className="block text-sm font-medium mb-2">
								Estilo (opcional)
							</label>
							<input
								{...register("attributes.style")}
								type="text"
								placeholder="Cadena, Bangle..."
								className="w-full px-4 py-3 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-stone-900 dark:text-white placeholder-stone-500 dark:placeholder-stone-400 focus:border-orange-300 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-100 focus:outline-none transition-colors"
							/>
						</div>
					</>
				);

			case "Aros":
				return (
					<>
						<div>
							<label className="block text-sm font-medium mb-2">
								Tipo <span className="text-red-500">*</span>
							</label>
							<input
								{...register("attributes.type", {
                                    required: "El tipo de aro no puede ir vacío"
                                })}
								type="text"
								placeholder="Stud, Drop, Aro..."
								className="input-admin"
							/>
                            {isEarringErrors(errors.attributes) && errors.attributes.type && (
                                <ErrorMessage variant="inline">
                                    {errors.attributes.type.message}
                                </ErrorMessage>
                            )}
						</div>
						<div>
							<label className="block text-sm font-medium mb-2">
								Material <span className="text-red-500">*</span>
							</label>
							<input
								{...register("attributes.material", {
                                    required: "El material no puede ir vacío"
                                })}
								type="text"
								placeholder="Oro, Plata..."
								className="input-admin"
							/>
                            {isEarringErrors(errors.attributes) && errors.attributes.material && (
                                <ErrorMessage variant="inline">
                                    {errors.attributes.material.message}
                                </ErrorMessage>
                            )}
						</div>
						<div>
							<label className="block text-sm font-medium mb-2">
								Tipo de Cierre <span className="text-red-500">*</span>
							</label>
							<input
								{...register("attributes.backType", {
                                    required: "El tipo de cierre no puede ir vacío"
                                })}
								type="text"
								placeholder="Mariposa, Presión..."
								className="input-admin"
							/>
                            {isEarringErrors(errors.attributes) && errors.attributes.backType && (
                                <ErrorMessage variant="inline">
                                    {errors.attributes.backType.message}
                                </ErrorMessage>
                            )}
						</div>
						<div>
							<label className="block text-sm font-medium mb-2">
								Largo (opcional)
							</label>
							<input
								{...register("attributes.length")}
								type="text"
								placeholder="Para aros colgantes..."
								className="w-full px-4 py-3 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-stone-900 dark:text-white placeholder-stone-500 dark:placeholder-stone-400 focus:border-orange-300 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-100 focus:outline-none transition-colors"
							/>
						</div>
					</>
				);
		}
	};

	if (product) return (
		<div className="min-h-screen text-stone-900 dark:text-white transition-colors duration-300">
			<div className="max-w-7xl mx-auto">
				<div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
					<div className="lg:col-span-2 space-y-6">
						{/* Basic Information */}
						<div className="bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl p-6 transition-colors">
							<h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
								<Package
									size={20}
									className="text-orange-200 dark:text-orange-100"
								/>
								Información Básica
							</h2>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div className="md:col-span-2">
									<label className="block text-sm font-medium mb-2">
										Nombre del Producto <span className="text-red-500">*</span>
									</label>
									<input
										{...register("name", {
                                            required: "El nombre no puede ir vacío"
                                        })}
										type="text"
										placeholder="Anillo de compromiso con diamante..."
										className="input-admin"
									/>
									{errors.name && (
										<ErrorMessage variant="inline">
											{errors.name.message}
										</ErrorMessage>
									)}
								</div>

								<div>
									<label className="block text-sm font-medium mb-2">
										Tipo de Producto <span className="text-red-500">*</span>
									</label>
									<select
										{...register("productType", {
                                            required: "El tipo de producto es obligatorio"
                                        })}
										className="input-admin"
									>
										{productTypes.map((type) => (
											<option
												key={type.value}
												value={type.value}
											>
												{type.label}
											</option>
										))}
									</select>
									{errors.productType && (
										<ErrorMessage variant="inline">
											{errors.productType.message}
										</ErrorMessage>
									)}
								</div>

								<div>
									<label className="block text-sm font-medium mb-2">
										Categoría <span className="text-red-500">*</span>
									</label>
									<select
										{...register("category", {
                                            required: "La categoría no puede ir vacía"
                                        })}
										className="input-admin"
									>
										<option value="">
											Seleccionar categoría
										</option>
										{categories.map((cat) => (
											<option key={cat} value={cat}>
												{cat}
											</option>
										))}
									</select>
									{errors.category && (
										<ErrorMessage variant="inline">
											{errors.category.message}
										</ErrorMessage>
									)}
								</div>

								<div className="md:col-span-2">
									<label className="block text-sm font-medium mb-2">
										Descripción <span className="text-red-500">*</span>
									</label>
									<textarea
										{...register("description", {
                                            required: "La descripción no puede ir vacía", 
                                            minLength: {
                                                value: 10, 
                                                message: "La descripción debe tener al menos 10 caractéres"
                                            }
                                        })}
										rows={4}
										placeholder="Describe el producto en detalle..."
										className="input-admin"
									/>
									{errors.description && (
										<ErrorMessage variant="inline">
											{errors.description.message}
										</ErrorMessage>
									)}
								</div>
							</div>
						</div>

						{/* Price & Stock */}
						<div className="bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl p-6 transition-colors">
							<h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
								<DollarSign
									size={20}
									className="text-orange-200 dark:text-orange-100"
								/>
								Precio y Stock
							</h2>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								<div>
									<label className="block text-sm font-medium mb-2">
										Precio Base (CLP) <span className="text-red-500">*</span>
									</label>
									<input
										{...register("basePrice", {
											valueAsNumber: true,
                                            required: "El Precio no puede ir vacío",
                                            min: {
                                                value: 1, 
                                                message: "El precio debe ser mayor a 0"
                                            }
										})}
										type="number"
										step="1000"
										placeholder="50000"
										className="input-admin"
									/>
									{errors.basePrice && (
										<ErrorMessage variant="inline">
											{errors.basePrice.message}
										</ErrorMessage>
									)}
								</div>

								<div>
									<label className="block text-sm font-medium mb-2">
										Stock <span className="text-red-500">*</span>
									</label>
									<input
										{...register("stock", {
											valueAsNumber: true,
                                            required: "El Stock no puede ir vacío", 
                                            min: {
                                                value: 0, 
                                                message: "El stock no puede ser negativo"
                                            }
										})}
										type="number"
										placeholder="10"
										className="input-admin"
									/>
									{errors.stock && (
										<ErrorMessage variant="inline">
											{errors.stock.message}
										</ErrorMessage>
									)}
								</div>

								<div className="md:col-span-2">
									<label className="flex items-center gap-2">
										<input
											{...register("isActive", {
                                                required: "El Estado no puede ir vacío"
                                            })}
											type="checkbox"
											className="w-4 h-4 text-orange-200 dark:text-orange-100 rounded focus:ring-orange-200 dark:focus:ring-orange-100 focus:ring-2"
										/>
										<span className="text-sm font-medium">
											Producto activo (visible para
											clientes)
										</span>
									</label>
								</div>
							</div>
						</div>

						{/* Attributes */}
						<div className="bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl p-6 transition-colors">
							<h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
								<Layers
									size={20}
									className="text-orange-200 dark:text-orange-100"
								/>
								Características del {selectedProductType}
							</h2>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{renderAttributeFields()}
							</div>
						</div>

						{/* Tags */}
						<div className="bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl p-6 transition-colors">
							<h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
								<Tag
									size={20}
									className="text-orange-200 dark:text-orange-100"
								/>
								Etiquetas (opcional)
							</h2>

							<div className="flex flex-col gap-4 md:flex-row md:gap-2 mb-3">
								<input
									type="text"
									value={tagInput}
									onChange={(e) =>
										setTagInput(e.target.value)
									}
									onKeyPress={(e) =>
										e.key === "Enter" &&
										(e.preventDefault(), addTag())
									}
									placeholder="Agregar etiqueta..."
									className="flex-1 px-4 py-3 rounded-lg border border-stone-300 dark:border-stone-600 bg-white dark:bg-stone-700 text-stone-900 dark:text-white placeholder-stone-500 dark:placeholder-stone-400 focus:border-orange-300 dark:focus:border-orange-100 focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-100 focus:outline-none transition-colors"
								/>
								<button
									type="button"
									onClick={addTag}
									className="px-6 py-3 bg-orange-100 dark:bg-stone-700 text-stone-900 dark:text-white rounded-lg hover:bg-orange-200 dark:hover:bg-stone-600 transition-colors"
								>
									Agregar
								</button>
							</div>

							<div className="flex flex-wrap gap-2">
								{currentTags.map((tag, index) => (
									<span
										key={index}
										className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 dark:bg-stone-700 text-stone-900 dark:text-white rounded-full text-sm"
									>
										{tag}
										<button
											type="button"
											onClick={() => removeTag(index)}
											className="hover:text-red-500"
										>
											<X size={14} />
										</button>
									</span>
								))}
                            </div>
						{errors.tags && (
							<ErrorMessage variant="inline">
								{errors.tags.message}
							</ErrorMessage>
						)}
					</div>
				</div>

				{/* Image Upload Sidebar */}
				<div className="space-y-6 static lg:sticky lg:top-30 self-start">
					<div className="bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl p-6 transition-colors">
						<h2 className="text-xl font-semibold mb-4 flex items-center gap-2">
							<Camera
								size={20}
								className="text-orange-200 dark:text-orange-100"
							/>
							Imágenes del Producto
						</h2>

						<p className="text-sm mb-4 text-stone-600 dark:text-stone-400">
							Sube entre 3 y 10 imágenes de alta calidad del
							producto.
						</p>

						<div className="mb-4">
							<CldUploadWidget
								uploadPreset="next_morango-joyas"
                                signatureEndpoint="/api/sign-cloudinary-params"
								options={{
									multiple: true,
                                    cloudName: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
									maxFiles: 10,
									resourceType: "image",
									folder: "morango/products",
								}}
								onSuccess={handleCloudinaryUpload}
							>
								{({ open }) => (
									<div
										onClick={() => open()}
										className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-stone-300 dark:border-stone-600 rounded-lg cursor-pointer hover:bg-stone-100 dark:hover:bg-stone-700 transition-colors"
									>
										<div className="flex flex-col items-center justify-center pt-5 pb-6">
											<Upload className="w-8 h-8 mb-2 text-stone-500 dark:text-stone-400" />
											<p className="text-sm text-stone-500 dark:text-stone-400">
												<span className="font-semibold">
													Click para subir
												</span>{" "}
												o arrastra las imágenes
											</p>
										</div>
									</div>
								)}
							</CldUploadWidget>
						</div>

						<div className="grid grid-cols-2 gap-3">
							{uploadedImages.map((imageUrl, index) => (
								<div key={index} className="relative group">
									<Image
										src={imageUrl}
										alt={`Imagen ${index + 1}`}
										width={200}
										height={96}
										className="w-full h-24 object-cover rounded-lg"
									/>
									<button
										type="button"
										onClick={() => removeImage(index)}
										className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
									>
										<X size={16} />
									</button>
								</div>
							))}
						</div>
                            {uploadedImages.length < 3 && (
                                <div className="mt-3 text-center">
                                    <p className="text-sm text-red-500">
                                        {3 - uploadedImages.length} imágenes más
                                        requeridas
                                    </p>
                                </div>
                            )}
                            {errors.images && (
                                <div className="flex-center">
                                    <ErrorMessage variant="inline">
                                        {errors.images.message}
                                    </ErrorMessage>
                                </div>
                            )}
                        </div>

                        {/* Summary */}
                        <div className="bg-stone-50 dark:bg-stone-800 border border-stone-200 dark:border-stone-700 rounded-xl p-6 transition-colors">
                            <h3 className="text-lg font-semibold mb-3">
                                Resumen
                            </h3>
                            <div className="space-y-2 text-sm">
                                <div className="flex justify-between">
                                    <span className="text-stone-600 dark:text-stone-400">
                                        Imágenes:
                                    </span>
                                    <span
                                        className={
                                            uploadedImages.length >= 3
                                                ? "text-green-500"
                                                : "text-red-500"
                                        }
                                    >
                                        {uploadedImages.length}/3
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-stone-600 dark:text-stone-400">
                                        Precio:
                                    </span>
                                    <span>
                                        {watch("basePrice")
                                            ? `$${watch("basePrice").toLocaleString()}`
                                            : "No especificado"}
                                    </span>
                                </div>
                                <div className="flex justify-between">
                                    <span className="text-stone-600 dark:text-stone-400">
                                        Stock:
                                    </span>
                                    <span>
                                        {watch("stock") || "No especificado"}
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Submit Button */}
                    <div className="flex flex-col sm:flex-row sm:justify-between lg:col-span-2 gap-4 mt-6">
                        <button
                            onClick={handleSubmit(onSubmit)}
                            disabled={isSubmitting}
                            className="group button-orange-gradient justify-center"
                        >
                            {isSubmitting ? (
                                <>
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-stone-900 dark:border-white"></div>
                                    Actualizando Producto...
                                </>
                            ) : (
                                <>
                                    <PencilLine size={20} />
                                    Actualizar Producto
                                </>
                            )}
                        </button>
                        <Link
                            href="/admin/products"
                            className="button flex-center gap-2 rounded-lg"
                        >
                            Cancelar
                            <ArrowBigRightDash/>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}