"use client";
import { forgotPasswordEmail } from "@/src/api/AuthAPI";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ErrorMessage from "../ui/ErrorMessage";
import { useTimer } from "@/src/hooks/useTimer";
import { useEffect, useState } from "react";

type ForgotPasswordFormData = {
    email: string; 
}

const COOLDOWN_MS = 30_000;
const STORAGE_KEY = "resend_code_cooldown";

export default function ForgotPasswordForm() {
    const [expiresAt, setExpiresAt] = useState<number | undefined>(undefined);
    
    const initialValues : ForgotPasswordFormData = {
        email: ""
    }

    useEffect(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        if (stored) {
            setExpiresAt(Number(stored));
        }
    }, []);

    const { timeRemaining, isExpired } = useTimer(expiresAt);

    const { register, handleSubmit, formState: { errors } } = useForm<ForgotPasswordFormData>({ defaultValues: initialValues })

    const { mutate, isPending } = useMutation({
        mutationFn: forgotPasswordEmail, 
        onError: (error: Error) => {
            toast.error(error.message)
        },
        onSuccess: (data) => {
            const expiry = Date.now() + COOLDOWN_MS;

            localStorage.setItem(STORAGE_KEY, expiry.toString());
            setExpiresAt(expiry);

            toast.success(data.message || "Hemos enviado las instrucciones a tu email")
        }
    })

    const handleCode  = (formData: ForgotPasswordFormData) => {
        mutate(formData); 
    }

    return (
        <div className="flex flex-col items-center gap-5 mt-5 mb-5">
            <form 
                className="form"
                onSubmit={handleSubmit(handleCode)}
            >
                <h1 className="text-4xl font-bold mb-2">
                    Reestablecer Contraseña
                </h1>
    
                <p className="paragraph w-[25em]">
                    Proporciona el email de tu cuenta
                    Morango Joyas para {' '} 
                    <span className='highlight'>Enviar Instrucciones</span>
                </p>
            
                <div className="border max-w-68 border-orange-300" />

                <div className="space-y-2 mt-8">
                    <div className="">
                        <label htmlFor="">
                            Correo Electrónico
                        </label>
                        <input 
                            className="input" 
                            type="text" 
                            id="email"
                            placeholder="Ingresa el email que registraste"
                            {...register("email", { 
                                required: "El Correo no puede ir vacío",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Correo inválido"
                                }
                            })}
                        />
                    </div>
                    {errors.email && <ErrorMessage variant="inline">{errors.email.message}</ErrorMessage>}
                </div>

                <div className="flex-center mt-8">
                    <button 
                        className="button"
                        type="submit"
                        disabled={!isExpired || isPending}
                    >
                    {!isExpired
                        ? `Reenviar en ${timeRemaining}`
                        : "Enviar Instrucciones"}
                    </button>
                </div>
            </form>
        </div>
    );
}
