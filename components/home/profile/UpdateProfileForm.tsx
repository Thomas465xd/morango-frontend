"use client"; 
import { updateProfile } from "@/src/api/AuthAPI";
import { UpdateUserProfileForm, User, regions } from "@/src/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useEffect, useRef } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { Mail, Phone, MapPin, Save, AlertCircle, Check } from "lucide-react";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useThemeForModal } from "@/src/hooks/useTheme";

type UpdateProfileFormProps = {
    user: User
}

export default function UpdateProfileForm({ user } : UpdateProfileFormProps) {
    const theme = useThemeForModal();
    const initialValues : UpdateUserProfileForm = {
        name: user.name, 
        surname: user.surname, 
        email: user.email, 
        phone: user.phone || undefined, 
        address: {
            country: user.address.country || "Chile", 
            region: user.address.region, 
            city: user.address.city, 
            cityArea: user.address.cityArea, 
            street: user.address.street, 
            zipCode: user.address.zipCode
        }
    }

    const { 
        register, 
        handleSubmit, 
        formState: { errors, isDirty }, 
        reset,
        watch
    } = useForm<UpdateUserProfileForm>({
        defaultValues: initialValues, 
        mode: "onChange",
        shouldUnregister: false
    });

    const queryClient = useQueryClient();
    const { mutate, isPending } = useMutation({
        mutationFn: updateProfile, 
        onError: (error) => {
            toast.error(error.message || "Error al editar cuenta.");
        },
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["user"] });
            toast.success(data.message || "Perfil actualizado exitosamente");
            reset(watch());
        }
    });

    //! Refetch form data | For async communication
    const didInitRef = useRef(false);

    useEffect(() => {
        if (user && !didInitRef.current) {
            didInitRef.current = true

            const formData : UpdateUserProfileForm = {
                name: user.name ?? "",
                surname: user.surname ?? "",
                email: user.email ?? "",
                phone: user.phone || undefined, 
                address: {
                    country: user.address.country || "Chile", 
                    region: user.address.region || undefined, 
                    city: user.address.city || undefined, 
                    cityArea: user.address.cityArea || undefined, 
                    street: user.address.street || undefined, 
                    zipCode: user.address.zipCode || undefined, 
                }
            };
            
            reset(formData);
        }
    }, [user, reset]);

    const handleEditProfile = (formData: UpdateUserProfileForm) => {
        Swal.fire({
            title: "¿Revisaste los Datos Ingresados?",
            text: "¿Estás seguro de los cambios a realizar en tu perfil?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, Actualizar ✅",
            cancelButtonText: "No, Cancelar",
            theme: theme,
        }).then((result) => {
            if (result.isConfirmed) {
                if(formData.phone === "") {
                    formData.phone = undefined; 
                }

                mutate(formData);
            }
        });
    };

    return (
        <section className="max-w-4xl mx-auto my-8">
            <form onSubmit={handleSubmit(handleEditProfile)} className="space-y-8">
                {/* Information Alert */}
                <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg flex items-start gap-3">
                    <AlertCircle size={20} className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                    <p className="text-sm text-blue-800 dark:text-blue-300">
                        Esta información se utilizará para tu perfil y también para pre-llenar los datos de envío cuando realices una compra.
                    </p>
                </div>

                {/* Personal Information Section */}
                <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-orange-100 mb-6 flex items-center gap-2">
                        <Mail size={20} />
                        Información Personal
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Name */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                Nombre <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register("name", {
                                    required: "El nombre es requerido",
                                    minLength: { value: 2, message: "Mínimo 2 caracteres" }
                                })}
                                type="text"
                                placeholder="Tu nombre"
                                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-200 transition-colors"
                            />
                            {errors.name && <ErrorMessage variant="inline">{errors.name.message}</ErrorMessage>}
                        </div>

                        {/* Surname */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                Apellidos <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register("surname", {
                                    required: "El apellido es requerido",
                                    minLength: { value: 2, message: "Mínimo 2 caracteres" }
                                })}
                                type="text"
                                placeholder="Tus apellidos"
                                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-200 transition-colors"
                            />
                            {errors.surname && <ErrorMessage variant="inline">{errors.surname.message}</ErrorMessage>}
                        </div>

                        {/* Email */}
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                Correo Electrónico <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register("email", {
                                    required: "El correo es requerido",
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Correo electrónico inválido"
                                    }
                                })}
                                type="email"
                                placeholder="tu@correo.com"
                                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-200 transition-colors"
                            />
                            {errors.email && <ErrorMessage variant="inline">{errors.email.message}</ErrorMessage>}
                        </div>

                        {/* Phone */}
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300 flex items-center gap-2">
                                <Phone size={16} />
                                Teléfono <span className="text-zinc-400 text-xs">(Opcional)</span>
                            </label>
                            <input
                                {...register("phone", {
                                    pattern: {
                                        value: /^(\+56\s?9\d{8}|9\d{8})$/,
                                        message: "Formato de teléfono inválido. Ej: 912345678"
                                    }
                                })}
                                type="tel"
                                placeholder="+56 9 12345678"
                                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-200 transition-colors"
                            />
                            {errors.phone && <ErrorMessage variant="inline">{errors.phone.message}</ErrorMessage>}
                            <p className="text-xs text-zinc-500 dark:text-zinc-400">
                                Formato: +56 9 xxxxxxxx o 9xxxxxxxx
                            </p>
                        </div>
                    </div>
                </div>

                {/* Shipping Address Section */}
                <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6">
                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-orange-100 mb-6 flex items-center gap-2">
                        <MapPin size={20} />
                        Información de Envío
                    </h2>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Country */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                País <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register("address.country", {
                                    required: "El país es requerido"
                                })}
                                type="text"
                                placeholder="Chile"
                                disabled
                                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-zinc-100 dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 cursor-not-allowed opacity-60"
                            />
                        </div>

                        {/* Region */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                Región <span className="text-red-500">*</span>
                            </label>
                            <select
                                {...register("address.region", {
                                    required: "La región es requerida"
                                })}
                                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-200 transition-colors"
                            >
                                <option value="">Selecciona una región</option>
                                {regions.map((region) => (
                                    <option key={region} value={region}>
                                        {region}
                                    </option>
                                ))}
                            </select>
                            {errors.address?.region && <ErrorMessage variant="inline">{errors.address.region.message}</ErrorMessage>}
                        </div>

                        {/* City */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                Ciudad <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register("address.city", {
                                    required: "La ciudad es requerida"
                                })}
                                type="text"
                                placeholder="Santiago"
                                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-200 transition-colors"
                            />
                            {errors.address?.city && <ErrorMessage variant="inline">{errors.address.city.message}</ErrorMessage>}
                        </div>

                        {/* City Area / Comuna */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                Comuna <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register("address.cityArea", {
                                    required: "La comuna es requerida"
                                })}
                                type="text"
                                placeholder="Las Condes"
                                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-200 transition-colors"
                            />
                            {errors.address?.cityArea && <ErrorMessage variant="inline">{errors.address.cityArea.message}</ErrorMessage>}
                        </div>

                        {/* Street Address */}
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                Dirección <span className="text-red-500">*</span>
                            </label>
                            <input
                                {...register("address.street", {
                                    required: "La dirección es requerida"
                                })}
                                type="text"
                                placeholder="Calle y número, ej: Av. Cristóbal Colón 1234"
                                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-200 transition-colors"
                            />
                            {errors.address?.street && <ErrorMessage variant="inline">{errors.address.street.message}</ErrorMessage>}
                        </div>

                        {/* Zip Code */}
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-zinc-700 dark:text-zinc-300">
                                Código Postal <span className="text-zinc-400 text-xs">(Opcional)</span>
                            </label>
                            <input
                                {...register("address.zipCode", {
                                    minLength: {
                                        value: 7,
                                        message: "El código postal debe tener al menos 7 caracteres"
                                    }
                                })}
                                type="text"
                                placeholder="7591248"
                                className="w-full px-4 py-2 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-200 transition-colors"
                            />
                            {errors.address?.zipCode && <ErrorMessage variant="inline">{errors.address.zipCode.message}</ErrorMessage>}
                        </div>
                    </div>
                </div>

                {/* Submit Section */}
                <div className="flex flex-col sm:flex-row gap-4">
                    <button
                        type="submit"
                        disabled={isPending}
                        className="button w-full flex-center gap-2"
                    >
                        <Save size={18} />
                        {isPending ? "Guardando..." : "Guardar Cambios"}
                    </button>

                    {isDirty && !isPending && (
                        <div className="flex-center gap-2 px-8 py-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                            <AlertCircle size={18} className="text-blue-600 dark:text-blue-400" />
                            <span className="text-sm text-nowrap text-blue-800 dark:text-blue-300">
                                Tienes cambios sin guardar
                            </span>
                        </div>
                    )}

                    {!isDirty && !isPending && (
                        <div className="flex-center gap-2 px-8 py-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                            <Check size={18} className="text-green-600 dark:text-green-400" />
                            <span className="text-sm text-nowrap text-green-800 dark:text-green-300">
                                Todos los cambios guardados
                            </span>
                        </div>
                    )}
                </div>

                {/* Required Fields Note */}
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    <span className="text-red-500">*</span> Campos requeridos
                </p>
            </form>
        </section>
    )
}
