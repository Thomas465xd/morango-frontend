"use client";
import { resendCode } from "@/src/api/AuthAPI";
import { useMutation } from "@tanstack/react-query";
import { useSearchParams } from "next/navigation";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ErrorMessage from "../ui/ErrorMessage";
import { useTimer } from "@/src/hooks/useTimer";
import { useState } from "react";

type NewCodeFormData = {
    email: string; 
}

const COOLDOWN_MS = 30_000;
const STORAGE_KEY = "resend_code_cooldown";

export default function NewCodeForm() {
    const searchParams = useSearchParams(); 

    const email = searchParams.get("email"); 

    const initialValues = {
        email: email || ""
    }

    const [expiresAt, setExpiresAt] = useState<number | undefined>(() => {
        const stored = localStorage.getItem(STORAGE_KEY);
        return stored ? Number(stored) : undefined;
    });

    const { timeRemaining, isExpired } = useTimer(expiresAt);

    const { register, handleSubmit, formState: { errors } } = useForm<NewCodeFormData>({ defaultValues: initialValues })

    const { mutate, isPending } = useMutation({
        mutationFn: resendCode, 
        onError: (error: Error) => {
            toast.error(error.message)
        },
        onSuccess: () => {
            const expiry = Date.now() + COOLDOWN_MS;

            localStorage.setItem(STORAGE_KEY, expiry.toString());
            setExpiresAt(expiry);

            toast.success(`Email enviado a "${email}"`)
        }
    })

    const handleCode  = (formData: NewCodeFormData) => {
        mutate(formData); 
    }

    if (email) return (
        <div className="flex flex-col items-center gap-5 mt-5 mb-5">
            <form 
                className="form"
                onSubmit={handleSubmit(handleCode)}
            >
                <h1 className="text-4xl font-bold mb-2">
                    Un paso más!!!
                </h1>
    
                <p className="paragraph">
                    Confirma tu cuenta abriendo el link de confirmación
                    enviado a {' '} 
                    <span className='highlight'>&quot;{email}&quot;</span>
                </p>
            
                <div className="border max-w-68 border-orange-300" />

                <input 
                    type="hidden"
                    id="email"
                    {...register("email", {
                        required: "Email no Proporcionado"
                    })}
                />
                {errors.email && <ErrorMessage variant="inline">{errors.email.message}</ErrorMessage>}

                <div className="flex-center mt-12">
                    <button 
                        className="button"
                        type="submit"
                        disabled={!isExpired || isPending}
                    >
                    {!isExpired
                        ? `Reenviar en ${timeRemaining}`
                        : "Reenviar Código"}
                    </button>
                </div>
            </form>
        </div>
    );
}
