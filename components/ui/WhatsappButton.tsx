"use client";

import { FloatingWhatsApp } from "react-floating-whatsapp";
import LogoImage from "@/public/logo.jpg";
import { useTheme } from "next-themes";
import { useCallback, useEffect, useState } from "react";

export default function WhatsappButtonClient() {
	const { theme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => setMounted(true), []);

	// Fix aria-hidden-focus: when the chat box is hidden (aria-hidden="true"),
	// make all focusable elements inside it inert so they can't receive focus
	const fixAriaHiddenFocus = useCallback(() => {
		const chatBox = document.querySelector('[aria-hidden="true"][class*="whatsapp"]') as HTMLElement | null;
		if (chatBox) {
			chatBox.setAttribute("inert", "");
		}

		// Also handle the case where aria-hidden is removed (chat opens)
		const visibleChatBox = document.querySelector('[class*="whatsappChatBox"]') as HTMLElement | null;
		if (visibleChatBox && !visibleChatBox.getAttribute("aria-hidden")) {
			visibleChatBox.removeAttribute("inert");
		}
	}, []);

	useEffect(() => {
		if (!mounted) return;

		// Run fix after initial render
		const timer = setTimeout(fixAriaHiddenFocus, 500);

		// Observe DOM changes to re-apply fix when chat opens/closes
		const observer = new MutationObserver(fixAriaHiddenFocus);
		const wrapper = document.querySelector('[class*="floatingWhatsapp"]');
		if (wrapper) {
			observer.observe(wrapper, {
				attributes: true,
				subtree: true,
				attributeFilter: ["aria-hidden"],
			});
		}

		return () => {
			clearTimeout(timer);
			observer.disconnect();
		};
	}, [mounted, fixAriaHiddenFocus]);

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
