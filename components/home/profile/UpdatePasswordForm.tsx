"use client"; 
import ErrorMessage from "@/components/ui/ErrorMessage"
import { updatePassword } from "@/src/api/AuthAPI"
import { UpdateUserPasswordForm } from "@/src/types"
import { useMutation } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { toast } from "react-toastify"
import Swal, { SweetAlertTheme } from "sweetalert2"
import { Eye, EyeOff, Lock, AlertCircle, Check } from "lucide-react"
import { useState } from "react"
import Divider from "@/components/ui/Divider";

export default function UpdatePasswordForm() {
    const [showCurrentPassword, setShowCurrentPassword] = useState(false);
    const [showNewPassword, setShowNewPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const initialValues: UpdateUserPasswordForm = {
        current_password: "",
        password: "",
        confirmPassword: ""
    }

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm<UpdateUserPasswordForm>({
        defaultValues: initialValues,
        mode: "onChange"
    })

    const { mutate, isPending } = useMutation({
        mutationFn: updatePassword,
        onError: (error) => {
            toast.error(error.message || "Ha ocurrido un error actualizando tu contraseña.")
        },
        onSuccess: (data) => {
            toast.success(data.message || "Contraseña actualizada exitosamente")
            reset()
            setShowCurrentPassword(false);
            setShowNewPassword(false);
            setShowConfirmPassword(false);
        }
    })

    const password = watch('password');
    const confirmPassword = watch('confirmPassword');

    const handleChangePassword = (formData: UpdateUserPasswordForm) => {
        Swal.fire({
            title: "Confirmar Cambio de Contraseña",
            text: "¿Estás seguro de que deseas cambiar tu contraseña?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#f97316",
            cancelButtonColor: "#d33",
            confirmButtonText: "Sí, Cambiar",
            cancelButtonText: "Cancelar",
            theme: `${localStorage.getItem("theme") as SweetAlertTheme}`,
        }).then((result) => {
            if (result.isConfirmed) {
                mutate(formData);
            }
        });
    }

    const passwordsMatch = password === confirmPassword && password.length > 0;

    return (
        <section className="max-w-4xl mx-auto my-8 space-y-8">
            {/* Information Alert */}
            <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg flex items-start gap-3">
                <AlertCircle size={18} className="text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                <p className="text-sm text-blue-800 dark:text-blue-300">
                    Tu contraseña se encripta y se almacena de forma segura en nuestros servidores.
                </p>
            </div>

            <form
                onSubmit={handleSubmit(handleChangePassword)}
                className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 space-y-6"
                noValidate
            >
                {/* Form Header */}
                <div className="flex items-center gap-3 pb-4 border-b border-zinc-200 dark:border-zinc-700">
                    <Lock size={24} className="text-orange-500 dark:text-orange-400" />
                    <div>
                        <h2 className="text-lg font-semibold text-zinc-900 dark:text-zinc-100">
                            Cambiar Contraseña
                        </h2>
                        <p className="text-sm text-zinc-500 dark:text-zinc-400">
                            Actualiza tu contraseña para mantener tu cuenta segura
                        </p>
                    </div>
                </div>

                {/* Current Password */}
                <div className="space-y-2">
                    <label
                        htmlFor="current_password"
                        className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    >
                        Contraseña Actual <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                        <input
                            id="current_password"
                            type={showCurrentPassword ? "text" : "password"}
                            placeholder="Ingresa tu contraseña actual"
                            className="w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-200 transition-colors pr-10"
                            {...register("current_password", {
                                required: "La contraseña actual es requerida",
                            })}
                        />
                        <button
                            type="button"
                            onClick={() => setShowCurrentPassword(!showCurrentPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                            aria-label={showCurrentPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        >
                            {showCurrentPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    </div>
                    {errors.current_password && (
                        <ErrorMessage variant="inline">
                            {errors.current_password.message}
                        </ErrorMessage>
                    )}
                </div>

                <Divider 
                    text="Nueva Contraseña"
                />

                {/* New Password */}
                <div className="space-y-2">
                    <label
                        htmlFor="password"
                        className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    >
                        Nueva Contraseña <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                        <input
                            id="password"
                            type={showNewPassword ? "text" : "password"}
                            placeholder="Crea una nueva contraseña"
                            className="w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-200 transition-colors pr-10"
                            {...register("password", {
                                required: "La nueva contraseña es requerida",
                                minLength: {
                                    value: 8,
                                    message: "La contraseña debe tener al menos 8 caracteres"
                                }
                            })}
                        />
                        <button
                            type="button"
                            onClick={() => setShowNewPassword(!showNewPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                            aria-label={showNewPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        >
                            {showNewPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    </div>
                    {errors.password && (
                        <ErrorMessage variant="inline">
                            {errors.password.message}
                        </ErrorMessage>
                    )}
                    {password && password.length >= 8 && (
                        <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                            <Check size={14} />
                            Contraseña válida
                        </p>
                    )}
                </div>

                {/* Confirm Password */}
                <div className="space-y-2">
                    <label
                        htmlFor="confirmPassword"
                        className="text-sm font-medium text-zinc-700 dark:text-zinc-300"
                    >
                        Confirmar Nueva Contraseña <span className="text-red-500">*</span>
                    </label>

                    <div className="relative">
                        <input
                            id="confirmPassword"
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder="Confirma tu nueva contraseña"
                            className="w-full px-4 py-2.5 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-200 transition-colors pr-10"
                            {...register("confirmPassword", {
                                required: "Debes confirmar tu nueva contraseña",
                                validate: value => value === password || "Las contraseñas no coinciden"
                            })}
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-300 transition-colors"
                            aria-label={showConfirmPassword ? "Ocultar contraseña" : "Mostrar contraseña"}
                        >
                            {showConfirmPassword ? (
                                <EyeOff size={18} />
                            ) : (
                                <Eye size={18} />
                            )}
                        </button>
                    </div>
                    {errors.confirmPassword && (
                        <ErrorMessage variant="inline">
                            {errors.confirmPassword.message}
                        </ErrorMessage>
                    )}
                    {passwordsMatch && (
                        <p className="text-xs text-green-600 dark:text-green-400 flex items-center gap-1">
                            <Check size={14} />
                            Las contraseñas coinciden
                        </p>
                    )}
                </div>

                {/* Password Requirements */}
                <div className="p-4 bg-zinc-50 dark:bg-zinc-700/50 border border-zinc-200 dark:border-zinc-700 rounded-lg">
                    <p className="text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-3">
                        Requisitos de contraseña:
                    </p>
                    <ul className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
                        <li className={`flex items-center gap-2 ${password && password.length >= 8 ? 'text-green-600 dark:text-green-400' : ''}`}>
                            <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${password && password.length >= 8 ? 'bg-green-600 border-green-600' : 'border-zinc-300 dark:border-zinc-600'}`}>
                                {password && password.length >= 8 && (
                                    <Check size={12} className="text-white" />
                                )}
                            </span>
                            Mínimo 8 caracteres
                        </li>
                        <li className={`flex items-center gap-2 ${passwordsMatch ? 'text-green-600 dark:text-green-400' : ''}`}>
                            <span className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${passwordsMatch ? 'bg-green-600 border-green-600' : 'border-zinc-300 dark:border-zinc-600'}`}>
                                {passwordsMatch && (
                                    <Check size={12} className="text-white" />
                                )}
                            </span>
                            Las contraseñas deben coincidir
                        </li>
                    </ul>
                </div>

                {/* Submit Button */}
                <button
                    type="submit"
                    disabled={isPending || !passwordsMatch}
                    className="button w-full flex-center gap-2"
                >
                    <Lock size={18} />
                    {isPending ? "Actualizando..." : "Cambiar Contraseña"}
                </button>

                {/* Help Text */}
                <p className="text-xs text-zinc-500 dark:text-zinc-400 text-center">
                    <span className="text-red-500">*</span> Campos requeridos
                </p>
            </form>
        </section>
    )
}