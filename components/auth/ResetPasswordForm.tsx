"use client";
import { resetPassword } from "@/src/api/AuthAPI";
import { ResetPasswordForm } from "@/src/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form"
import { toast } from "react-toastify";
import ErrorMessage from "../ui/ErrorMessage";
import Swal, { SweetAlertTheme } from "sweetalert2";
import Loader from "../ui/Loader";

export default function LoginForm() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const initialValues : ResetPasswordForm = {
        password: "",
        confirmPassword: ""
    }

    const token = searchParams.get("token");

    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<ResetPasswordForm>({ defaultValues: initialValues });

    const { mutate, isPending } = useMutation({
        mutationFn: resetPassword,
        onError: (error: Error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            Swal.fire({
                title: "🔐 Contraseña Actualizada",
                text: "Tu contraseña fue actualizada correctamente.",
                icon: "success",
                confirmButtonText: "Iniciar Sesión",
                theme: `${localStorage.getItem("theme") as SweetAlertTheme}`,
            }).then(() => {
                router.push("/home/login");
            });

            reset();

            reset()
        }
    })

    const handleReset = (formData: ResetPasswordForm) => {
        if (!token) {
            toast.error("Token inválido o faltante");
            return;
        }

        const payload = {
            formData,
            token,
        };

        mutate(payload);
    }
    
    const password = watch("password")

    if (!token) {
        return (
            <form 
                className="p-12 bg-white dark:bg-stone-700 rounded-md max-w-[460px]"
                onSubmit={handleSubmit(handleReset)}
            >
                <h1 className="text-4xl font-bold mb-2">
                    Establecer Contraseña
                </h1>

                <p className="paragraph">
                    Ingresa tu nueva contraseña para tu cuenta {" "}
                    <span className='highlight'>Morango Joyas</span>
                </p>

                <div className="border max-w-68 border-orange-300 mb-12" />

                <ErrorMessage>
                    El enlace para restablecer la contraseña es inválido o ha expirado.
                </ErrorMessage>
            </form>
        );
    }

    if (isPending) {
        return <Loader />;
    }

    return (
        <form 
            className="form"
            onSubmit={handleSubmit(handleReset)}
        >
            <h1 className="text-4xl font-bold mb-2">
                Reestablecer Contraseña
            </h1>

            <p className="paragraph w-[25em]">
                Ingresa tu nueva contraseña para tu cuenta {" "}
                <span className='highlight'>Morango Joyas</span>
            </p>

            <div className="border max-w-68 border-orange-300" />

            <div className="space-y-8 my-4">
                <div className="space-y-2">
                    <div className="">
                        <label htmlFor="">
                            Nueva Contraseña
                        </label>
                        <input 
                            className="input" 
                            type="password" 
                            id="password"
                            placeholder="Ingresa tu nueva contraseña"
                            {...register("password", {
                                required: "La Contraseña es Obligatoria",
                                minLength: {
                                    value: 8,
                                    message: 'La Contraseña debe de ser de al menos 8 caracteres'
                                }
                            })}
                        />
                    </div>
                    {errors.password && <ErrorMessage variant="inline">{errors.password.message}</ErrorMessage>}
                </div>

                <div className="space-y-2">
                    <div className="">
                        <label htmlFor="">
                            Confirmar Contraseña
                        </label>
                        <input 
                            className="input" 
                            id="confirmPassword"
                            type="password" 
                            placeholder="Repite tu nueva contraseña"
                            {...register("confirmPassword", {
                                required: "Repetir la contraseña es obligatorio",
                                validate: value => value === password || 'Las Contraseñas no coinciden'
                            })}
                        />
                    </div>
                    {errors.confirmPassword && <ErrorMessage variant="inline">{errors.confirmPassword.message}</ErrorMessage>}
                </div>
            </div>

            <button
                className="button"
                type="submit"
            >
                Establecer Constraseña
            </button>
        </form>
    )
}
