"use client";
import { login } from "@/src/api/AuthAPI";
import { LoginUserForm } from "@/src/types";
import { useMutation } from "@tanstack/react-query";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form"
import { toast } from "react-toastify";
import Swal, { SweetAlertTheme } from "sweetalert2";
import ErrorMessage from "../ui/ErrorMessage";

export default function LoginForm() {
    const initialValues : LoginUserForm = {
        email: "",
        password: ""
    }

    const router = useRouter();

    const { register, handleSubmit, reset, formState: { errors } } = useForm<LoginUserForm>({defaultValues: initialValues});

    const { mutate } = useMutation({
        mutationFn: login,
        onError: (error: Error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            Swal.fire({
                title: "Inicio de sesión exitoso 🍾",
                text: data.message, 
                icon: "success",
                theme: `${localStorage.getItem("theme") as SweetAlertTheme}`
            }).then(() => {
                router.push("/");
            })

            reset()
        }
    })

    const handleLogin = (formData: LoginUserForm) => {
        console.log("📝 Submitting form:", formData.email);
        mutate(formData);
    }
    
    return (
        <form 
            className="p-12 bg-white dark:bg-stone-700 rounded-md"
            onSubmit={handleSubmit(handleLogin)}
        >
            <h1 className="text-4xl font-bold mb-2">
                Iniciar Sesión
            </h1>

            <p className="paragraph">
                Ingresa a tu cuenta de {" "}
                <span className='highlight'>Morango Joyas</span>
            </p>

            <div className="border max-w-68 border-amber-400" />

            <div className="space-y-8 my-4">
                <div className="">
                    <label htmlFor="">
                        Correo Electrónico
                    </label>
                    <input 
                        className="input" 
                        type="text" 
                        id="email"
                        placeholder="Entra el email que registraste"
                        {...register("email", { 
                            required: "El Correo no puede ir vacío",
                            pattern: {
                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                message: "Correo inválido"
                            }
                        })}
                    />
                    {errors.email && <ErrorMessage variant="inline">{errors.email.message}</ErrorMessage>}
                </div>

                <div className="">
                    <label htmlFor="">
                        Contraseña
                    </label>
                    <input 
                        className="input" 
                        id="password"
                        type="password" 
                        placeholder="Ingresa la contraseña de tu cuenta"
                        {...register("password", {
                            required: "La contraseña no puede ir vacía",
                        })}
                    />
                    {errors.password && <ErrorMessage variant="inline">{errors.password.message}</ErrorMessage>}
                </div>
            </div>

            <button
                className="button"
                type="submit"
            >
                Iniciar sesión
            </button>
        </form>
    )
}
