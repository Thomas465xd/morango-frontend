"use client";

import { initMercadoPago } from "@mercadopago/sdk-react";
import { useEffect } from "react";

export default function MercadoPagoProvider({
	children,
}: {
	children: React.ReactNode;
}) {
	useEffect(() => {
		initMercadoPago(process.env.NEXT_PUBLIC_MP_PUBLIC_KEY!, {
			locale: "es-CL",
		});
	}, []);

	return <>{children}</>;
}
