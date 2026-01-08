"use client";
import { createAccount } from "@/src/api/AuthAPI";
import { RegisterUserForm } from "@/src/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"
import { toast } from "react-toastify";
import Swal, { SweetAlertTheme } from "sweetalert2";
import ErrorMessage from "../ui/ErrorMessage";

export default function RegisterForm() {
    const initialValues : RegisterUserForm = {
        name: "", 
        email: "",
        password: "", 
        confirmPassword: ""
    }

    const { register, handleSubmit, reset, watch, formState: { errors }, clearErrors } = useForm({
        defaultValues: initialValues
    });

    //const router = useRouter();

    const { mutate, isPending } = useMutation({
        mutationFn: createAccount, 
        onError: (error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            Swal.fire({
                title: "Hemos enviado un email de verificación 📥🧑‍💼",
                text: "Confirma tu cuenta para completar tu registro en Morango Joyas",
                icon: "info",
                theme: `${localStorage.getItem("theme") as SweetAlertTheme}`
            })
            reset();
        }
    })

    const handleRegister = (formData: RegisterUserForm) => {
        console.log("📝 Submitting form:", formData.email);
        mutate(formData);
    }

    const password = watch('password');

    return (
        <form 
            className="p-12 bg-white dark:bg-stone-700 rounded-md"
            onSubmit={(e) => {
                // Clear server errors before validation
                clearErrors();
                // Then handle submit normally
                handleSubmit(handleRegister)(e);
            }}
        >
            <h1 className="text-4xl font-bold mb-2">
                Crear cuenta
            </h1>

            <p className="paragraph">
                Registrate en {" "}
                <span className='highlight'>Morango Joyas</span>
            </p>

            <div className="border max-w-68 border-orange-300" />

            <div className="space-y-8 my-4">
                <div className="">
                    <label htmlFor="name">
                        Nombre
                    </label>
                    <input 
                        className="input" 
                        type="text" 
                        placeholder="Ingresa tu nombre"
                        id="name"
                        {...register("name", { required: "El nombre no puede ir vacío" })}
                        onChange={(e) => {
                            register("name").onChange(e);
                            // Clear server error when user starts typing
                            if (errors.name?.type === 'server') {
                                clearErrors('name');
                            }
                        }}
                    />
                    {errors.name && <ErrorMessage variant="inline">{errors.name.message}</ErrorMessage>}
                </div>

                <div className="">
                    <label htmlFor="email">
                        Correo Electrónico
                    </label>
                    <input 
                        className="input" 
                        type="email" 
                        placeholder="Ingresa tu email"
                        id="email"
                        {...register("email", { 
                            required: "El email no puede ir vacío",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Email inválido"
                            }
                        })}
                        onChange={(e) => {
                            register("email").onChange(e);
                            // Clear server error when user starts typing
                            if (errors.email?.type === 'server') {
                                clearErrors('email');
                            }
                        }}
                    />
                    {errors.email && <ErrorMessage variant="inline">{errors.email.message}</ErrorMessage>}
                </div>

                <div className="">
                    <label htmlFor="password">
                        Password
                    </label>
                    <input 
                        className="input" 
                        type="password" 
                        placeholder="Create a secure Password"
                        id="password"
                        {...register("password", {
                            required: "La contraseña no puede ir vacía",
                            minLength: {
                                value: 7,
                                message: 'La contraseña debe tener al menos 7 caracteres'
                            }
                        })}
                        onChange={(e) => {
                            register("password").onChange(e);
                            // Clear server error when user starts typing
                            if (errors.password?.type === 'server') {
                                clearErrors('password');
                            }
                        }}
                    />
                    {errors.password && <ErrorMessage variant="inline">{errors.password.message}</ErrorMessage>}
                </div>

                <div className="">
                    <label htmlFor="confirmPassword">
                        Confirmar contraseña
                    </label>
                    <input 
                        className="input" 
                        type="password" 
                        placeholder="Reescribe la contraseña"
                        id="confirmPassword"
                        {...register("confirmPassword", {
                            required: "Confirmar la constraseña es obligatorio",
                            validate: value => value === password || "Las contraseñas no coinciden"
                        })}
                        onChange={(e) => {
                            register("confirmPassword").onChange(e);
                            // Clear server error when user starts typing
                            if (errors.confirmPassword?.type === 'server') {
                                clearErrors('confirmPassword');
                            }
                        }}
                    />
                    {errors.confirmPassword && <ErrorMessage variant="inline">{errors.confirmPassword.message}</ErrorMessage>}
                </div>
            </div>

            <input
                className="button"
                type="submit"
                value={isPending ? "Creando cuenta..." : "Registrarse"}
                disabled={isPending}
            />
        </form>
    )
}