"use client";

import { FloatingWhatsApp } from "react-floating-whatsapp";
import LogoImage from "@/public/logo.jpg";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

export default function WhatsappButtonClient() {
	const { theme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	if (!mounted) return null;

	return (
		<FloatingWhatsApp
			phoneNumber="+56 9 8219 2688"
			accountName="Morango Joyas"
			statusMessage="Tiempo de Respuesta de 1 hora normalmente"
			chatMessage="Bienvenido a Morango Joyas ¿En qué podemos ayudarte hoy? 🫡💎"
			placeholder="Hola, quería preguntar si tenían..."
			allowClickAway={false}
			allowEsc
			darkMode={theme === "dark"}
			avatar={LogoImage.src}
		/>
	);
}
