"use client";
import React, { useState } from "react";
import { Send } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import emailjs from "@emailjs/browser"
// import { useEffect } from "react";
// import { useSearchParams } from "next/navigation";
import ErrorMessage from "@/components/ui/ErrorMessage";
import { useThemeForModal } from "@/src/hooks/useTheme";

type ContactForm = {
	firstName: string;
	lastName: string;
	email: string;
	phone: string;
	subject: string;
	message: string;
}

export default function ContactForm() {
    const theme = useThemeForModal();
    // const searchParams = useSearchParams();
    
    const initialValues : ContactForm = {
        firstName: "", 
        lastName: "", 
        email: "", 
        phone: "", 
        subject: "", 
        message: ""
    }

    const {	
        register,
		handleSubmit,
		formState: { errors },
		// setValue,
		// watch,
		reset, 
    } = useForm<ContactForm>({defaultValues: initialValues});

	const [isSubmitting, setIsSubmitting] = useState(false);

    // // Auto-fill form from query parameters
    // useEffect(() => {
    //     const propertyParam = searchParams.get('property');
    //     const messageParam = searchParams.get('message');

    //     if (propertyParam) {
    //         // Set subject to property title
    //         setValue('subject', decodeURIComponent(propertyParam), {
    //             shouldValidate: true,
    //             shouldDirty: true
    //         });
    //     }

    //     if (messageParam) {
    //         // Set message from query param
    //         setValue('message', decodeURIComponent(messageParam), {
    //             shouldValidate: true,
    //             shouldDirty: true
    //         });
    //     }
    // }, [searchParams, setValue]);

	const onSubmit = async (formData: ContactForm) => {
        try {
            setIsSubmitting(true)

            await emailjs.send(
                'service_zr1b4xh',
                'template_lbf0o2p',
                {
                    from_name: `${formData.firstName} ${formData.lastName}`,
                    from_email: formData.email,
                    phone: formData.phone,
                    subject: formData.subject,
                    message: formData.message,
                },
                'Egwo5MvqZT-kt5DuA'
            );

            setIsSubmitting(false)
            reset()
            toast.success("Mensaje enviado correctamente", {
                theme: theme
            });
        } catch (error) {
            console.error(error)
            toast.error("Error al Enviar el Formulario", {
                theme: theme
            });
            setIsSubmitting(false)
            return
        }
	};

	return (
        <form 
            className="bg-white dark:bg-zinc-900 rounded-3xl p-8 lg:p-12 shadow-xl border border-zinc-200 dark:border-zinc-800"
            noValidate
            onSubmit={handleSubmit(onSubmit)}
        >
            <div className="space-y-6">
                {/* Name Fields */}
                <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                        <label
                            htmlFor="firstName"
                            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
                        >
                            Nombre{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-300 ${
                                errors.firstName
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-zinc-300 dark:border-zinc-700"
                            }`}
                            placeholder="Tu nombre"
                            {...register("firstName", {
                                required: "El nombre no puede ir vacío"
                            })}
                        />
                        {errors.firstName && <ErrorMessage variant="inline">{errors.firstName.message}</ErrorMessage>}
                    </div>

                    <div>
                        <label
                            htmlFor="lastName"
                            className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
                        >
                            Apellido{" "}
                            <span className="text-red-500">*</span>
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-300 ${
                                errors.lastName
                                    ? "border-red-500 focus:ring-red-500"
                                    : "border-zinc-300 dark:border-zinc-700"
                            }`}
                            placeholder="Tu apellido"
                            {...register("lastName", {
                                required: "El apellido no puede ir vacío"
                            })}
                        />
                        {errors.lastName && <ErrorMessage variant="inline">{errors.lastName.message}</ErrorMessage>}
                    </div>
                </div>

                {/* Email Field */}
                <div>
                    <label
                        htmlFor="email"
                        className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
                    >
                        Email{" "}
                        <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="email"
                        id="email"
                        className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-300 ${
                            errors.email
                                ? "border-red-500 focus:ring-red-500"
                                : "border-zinc-300 dark:border-zinc-700"
                        }`}
                        placeholder="tu@email.com"
                        autoCorrect="off"
                        autoCapitalize="none"
                        {...register("email", {
                            required: "El Correo Electrónico es obligatorio",
                            pattern: {
                                value: /\S+@\S+\.\S+/,
                                message: "El Email no es válido"
                        }
                    })}
                    />
                    {errors.email && <ErrorMessage variant="inline">{errors.email.message}</ErrorMessage>}
                </div>

                {/* Phone Field */}
                <div>
                    <label
                        htmlFor="phone"
                        className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
                    >
                        Teléfono
                    </label>
                    <input
                        type="tel"
                        id="phone"
                        className="w-full px-4 py-3 rounded-xl border border-zinc-300 dark:border-zinc-700 transition-all duration-200 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-300"
                        placeholder="+56 9 1234 5678"
                        {...register("phone", {
                            required: "El Teléfono es obligatorio",
                            pattern: {
                                value: /^(\+56\s?9\d{8}|9\d{8})$/,
                                message: "Formato de teléfono inválido. Ejemplo: +56912345678 o 912345678"
                            }
                        })}
                    />
                    {errors.phone && <ErrorMessage variant="inline">{errors.phone.message}</ErrorMessage>}
                </div>

                {/* Subject Field - Changed to input instead of select */}
                <div>
                    <label
                        htmlFor="subject"
                        className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
                    >
                        Asunto{" "}
                        <span className="text-red-500">*</span>
                    </label>
                    <input
                        type="text"
                        id="subject"
                        className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-300 ${
                            errors.subject
                                ? "border-red-500 focus:ring-red-500"
                                : "border-zinc-300 dark:border-zinc-700"
                        }`}
                        placeholder="Asunto de tu consulta"
                        {...register("subject", {
                            required: "El asunto es obligatorio",
                            minLength: {
                                value: 3,
                                message: "El Asunto debe tener al menos 3 caracteres",
                            },
                        })}
                    />
                    {errors.subject && <ErrorMessage variant="inline">{errors.subject.message}</ErrorMessage>}
                </div>

                {/* Message Field */}
                <div>
                    <label
                        htmlFor="message"
                        className="block text-sm font-medium text-zinc-700 dark:text-zinc-300 mb-2"
                    >
                        Mensaje{" "}
                        <span className="text-red-500">*</span>
                    </label>
                    <textarea
                        id="message"
                        rows={6}
                        className={`w-full px-4 py-3 rounded-xl border transition-all duration-200 bg-zinc-50 dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 focus:outline-none focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-300 resize-none ${
                            errors.message
                                ? "border-red-500 focus:ring-red-500"
                                : "border-zinc-300 dark:border-zinc-700"
                        }`}
                        placeholder="Cuéntanos en qué podemos ayudarte..."
                        {...register("message", {
                            required: "El Mensaje no puede ir vacío",
                            minLength: {
                                value: 10,
                                message: "El Mensaje debe tener al menos 10 caracteres",
                            },
                        })}
                    />
                    {errors.message && <ErrorMessage variant="inline">{errors.message.message}</ErrorMessage>}
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-zinc-800 hover:bg-zinc-900 dark:bg-zinc-700 dark:hover:bg-zinc-600 text-white font-medium py-4 px-6 rounded-xl transition-all duration-200 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-orange-200 dark:focus:ring-orange-300 focus:ring-offset-2 dark:focus:ring-offset-zinc-900"
                >
                    {isSubmitting ? (
                        <>
                            <div className="w-5 h-5 border-2 border-white/20 border-t-white rounded-full animate-spin" />
                            Enviando mensaje...
                        </>
                    ) : (
                        <>
                            <Send className="w-5 h-5" />
                            Enviar mensaje
                        </>
                    )}
                </button>
            </div>
        </form>
	);
}