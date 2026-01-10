"use client";

import { confirmToken } from "@/src/api/AuthAPI";
import { useMutation } from "@tanstack/react-query";
import { useRouter, useSearchParams } from "next/navigation";
import { toast } from "react-toastify";
import Swal, { SweetAlertTheme } from "sweetalert2";
import Loader from "../ui/Loader";
import ErrorMessage from "../ui/ErrorMessage";
import { useEffect } from "react";

export default function ConfirmAccountForm() {
    const searchParams = useSearchParams();
    const router = useRouter();

    const token = searchParams.get("token");

    const { mutate, isPending, isError } = useMutation({
        mutationFn: confirmToken,
        onSuccess: () => {
            Swal.fire({
                title: "🎉 ¡Cuenta Confirmada! 🎉",
                text: "Tu cuenta de Morango Joyas ha sido confirmada correctamente.",
                icon: "success",
                confirmButtonText: "Ir a Iniciar Sesión",
                theme: `${localStorage.getItem("theme") as SweetAlertTheme}`,
            }).then(() => {
                router.push("/auth/login");
            });
        },
        onError: (error: Error) => {
            toast.error(error.message || "Token inválido o expirado");
        },
    });

    // Trigger validation once token exists
    useEffect(() => {
        if (!token) return;

        mutate(token);
    }, [token, mutate]);

    // ⏳ Loading state
    if (isPending) {
        return <Loader />;
    }

    // ❌ Invalid or missing token
    if (!token || isError) {
        return (
            <div className="flex flex-col items-center gap-5 mt-5 mb-5">
                <div className="form">
                    <ErrorMessage variant="standard">
                        El token es inválido o ha expirado.
                    </ErrorMessage>
                </div>
            </div>
        );
    }

    // This will not be seen be the user because Sweetalert redirect
    return (
        <div className="flex flex-col items-center gap-5 mt-5 mb-5">
            <div className="form">
                <h1 className="text-4xl font-bold mb-2">
                    🎉 ¡Cuenta Confirmada! 🎉
                </h1>

                <p className="paragraph">
                    Tu cuenta de Morango Joyas {" "}
                    <span className="highlight">ha sido confirmada.</span>
                </p>

                <div className="border max-w-68 border-orange-300" />
            </div>
        </div>
    );
}
