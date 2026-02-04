import { createPayment } from "@/src/api/PaymentAPI";
import { CreatePaymentForm } from "@/src/types";
import { Payment } from "@mercadopago/sdk-react";
import { IPaymentBrickCustomization } from "@mercadopago/sdk-react/esm/bricks/payment/type";
import { useMutation } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { useRouter } from "next/navigation";
import { memo, useMemo } from "react";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useThemeForModal } from "@/src/hooks/useTheme";

type CheckoutPaymentProps = {
    orderId: string; 
	preferenceId: string;
    initPoint: string; 
    paymentId: string; 
	amount: number;
};

export function CheckoutPayment({
    orderId, 
	preferenceId,
	amount,
    initPoint, 
}: CheckoutPaymentProps) {
	const { theme } = useTheme();
    const router = useRouter();
    const themeForModal = useThemeForModal(); 

    console.log("CheckoutPayment render");

    const initialization = useMemo(() => ({
        preferenceId,
        amount,
    }), [preferenceId, amount]);

	const customization = useMemo<IPaymentBrickCustomization>(() => ({
		paymentMethods: {
			creditCard: ["all"],
			prepaidCard: "all",
			debitCard: "all",
			mercadoPago: "all",
			ticket: "all",
			bankTransfer: "all",
		},
		visual: {
			style: {
				theme: (theme === "dark" ? "dark" : "default") as
					| "dark"
					| "flat"
					| "default"
					| "bootstrap"
					| undefined,
				customVariables: {
					// Text colors
					textPrimaryColor: theme === "dark" ? "#fef3e2" : "#1c1917", // orange-100 : stone-900
					textSecondaryColor:
						theme === "dark" ? "#d4d4d8" : "#57534e", // zinc-300 : stone-600

					// Background colors
					inputBackgroundColor:
						theme === "dark" ? "#27272a" : "#ffffff", // zinc-800 : white
					formBackgroundColor:
						theme === "dark" ? "#18181b" : "#fafaf9", // zinc-900 : stone-50

					// Base/Brand colors (Orange theme)
					baseColor: theme === "dark" ? "#fed7aa" : "#000000", // orange-200 : black
					baseColorFirstVariant:
						theme === "dark" ? "#fcd34d" : "#fb923c", // orange-300 : orange-400
					baseColorSecondVariant:
						theme === "dark" ? "#fbbf24" : "#18181b", // orange-300 darker : zinc-900

					// Status colors
					errorColor: "#dc2626", // red-600
					successColor: "#16a34a", // green-600

					// Outline/Border colors
					outlinePrimaryColor:
						theme === "dark" ? "#52525b" : "#d6d3d1", // zinc-600 : stone-300
					outlineSecondaryColor:
						theme === "dark" ? "#3f3f46" : "#e7e5e4", // zinc-700 : stone-200

					// Button
					buttonTextColor: theme === "dark" ? "#18181b" : "#ffffff", // zinc-900 : white

					// Font sizes
					// fontSizeExtraSmall: "0.75rem", // 12px
					// fontSizeSmall: "0.875rem", // 14px
					// fontSizeMedium: "1rem", // 16px
					// fontSizeLarge: "1.125rem", // 18px
					// fontSizeExtraLarge: "1.25rem", // 20px

					// Font weights
					fontWeightNormal: "400",
					fontWeightSemiBold: "600",

					// Form inputs
					formInputsTextTransform: "none",

					// Input padding
					inputVerticalPadding: "12px",
					inputHorizontalPadding: "16px",

					// Box shadows
					inputFocusedBoxShadow:
						theme === "dark"
							? "0 0 0 2px rgba(254, 215, 170, 0.3)" // orange-200 with opacity
							: "0 0 0 2px rgba(253, 186, 116, 0.3)", // orange-300 with opacity
					inputErrorFocusedBoxShadow:
						"0 0 0 2px rgba(220, 38, 38, 0.3)", // red-600 with opacity

					// Border widths
					inputBorderWidth: "1px",
					inputFocusedBorderWidth: "1px",

					// Border radius
					borderRadiusSmall: "0.25rem", // 4px
					borderRadiusMedium: "0.5rem", // 8px
					borderRadiusLarge: "0.75rem", // 12px
					borderRadiusFull: "9999px",

					// Form padding
					formPadding: "24px",
				},
			},
		},
	}), [theme]);

	const paymentMutation = useMutation({
		mutationFn: createPayment,
        onError: (error) => {
            toast.error(error.message || "Error al procesar pago")
        }, 
        onSuccess: (data) => {
            toast.info(data.message || "Pago procesado 📋")
        }
	});

    // The Payment Brick passes data in this structure:
    // { formData: { token, payment_method_id, issuer_id, installments, ... } }

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = async ({ selectedPaymentMethod, formData } : { selectedPaymentMethod?: string; formData?: any; }) => {
        //* Wallet flow → MP handles everything
        console.log(selectedPaymentMethod, formData)
        if (selectedPaymentMethod === "wallet_purchase") {
            Swal.fire({
                title: "Redirigiendo a Mercado Pago...",
                allowOutsideClick: false,
                showConfirmButton: false,
                didOpen: () => Swal.showLoading(),
            });

            // Esto es clave
            window.location.href = initPoint;

            //! VERY IMPORTANT:
            // Resolve immediately so the Brick can redirect
            return Promise.resolve(); 
        }

        //* Others flow (credit card, debit card, etc...)
        try {
            Swal.fire({
                title: "Confirmando pago...",
                html: 'Porfavor espera un momento mientras tu solicitud es procesada.',
                allowOutsideClick: false, // Prevents closing by clicking outside
                showConfirmButton: false,
                theme: themeForModal,
                didOpen: () => {
                    Swal.showLoading();
                },
            })

            //console.log("Payment Brick onSubmit data:", data);

            // Validate required fields before sending
            if (!formData.token) {
                throw new Error("Token de tarjeta no generado");
            }
            if (!formData.payment_method_id) {
                throw new Error("Método de pago no seleccionado");
            }
            if (!formData.issuer_id) {
                throw new Error("Emisor no seleccionado");
            }
            if (!formData.payer) {
                throw new Error("Identificación no seleccionada")
            }

            const payload: CreatePaymentForm = {
                orderId,
                token: formData.token,
                payment_method_id: formData.payment_method_id,
                installments: Number(formData.installments) || 1,
                issuer_id: formData.issuer_id,
                payer: {
                    identification: formData.payer.identification,
                    email: formData.payer.email,
                },
            };

            // console.log("Sending payment payload:", payload);

            const result = await paymentMutation.mutateAsync(payload);
            Swal.close()

            console.log("Payment successful:", result);

            router.replace(`/checkout/pending/${orderId}`)
            
            return Promise.resolve();
        } catch (error) {
            Swal.close(); 
            toast.error(error instanceof Error ? error.message : "Error al procesar pago");
            return Promise.reject(error);
        }
    };

    // // eslint-disable-next-line @typescript-eslint/no-explicit-any
    // if ((window as any).MercadoPago) return;

	return (
		<div className="w-full">
			<Payment
				initialization={initialization}
				customization={customization}
				onSubmit={onSubmit}
				onReady={() => {
					console.log("Payment Brick ready");
				}}
				onError={(error) => {
					console.error("MP Brick error:", error);
				}}
			/>
		</div>
	);
}

export default memo(CheckoutPayment);