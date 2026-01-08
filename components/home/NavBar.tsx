"use client";

import { Clock, Facebook, Instagram, Linkedin, Mail } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import MobileNav from "./MobileNav";
import ThemeToggle from "../ui/DarkMode";
import DesktopNav from "./DesktopNav";

export const navigation = {
	pages: [
        { name: "Inicio", href: "/home"},
        { name: "Collares", href: "/home/products?productType=collares"},
		{ name: "Nosotros", href: "/home/about" },
		{ name: "Preguntas Frecuentes", href: "/home/questions" },
        { name: "Contacto", href: "/home/contact"}, 
	],
};

export default function NavBar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

	return (
        <>
            {/* Mobile menu */}
            <MobileNav
                open={mobileMenuOpen}
                onClose={() => setMobileMenuOpen(false)}
                navigation={navigation}
            />

            <header className="relative z-10">
                <nav aria-label="Top">
                    {/* Top navigation */}
                    <div className="bg-zinc-800 dark:bg-zinc-800/50 border-b-zinc-700 border-b-2">
                        <div className="mx-auto flex-between h-14 max-w-7xl px-4 sm:px-6 lg:px-8">
                            <div className="hidden lg:block relative z-20">
                                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                                    <div className="flex justify-between items-center py-2 text-sm">
                                        <div className="flex justify-center lg:justify-start space-x-4">
                                            <Link
                                                href="https://www.facebook.com/jup.propiedades"
                                                className="text-gray-400 hover:text-blue-400 transition duration-200 p-2 rounded-full hover:bg-white/10"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="Facebook de JUP Propiedades"
                                            >
                                                <Facebook size={18} />
                                            </Link>
                                            <Link
                                                href="https://www.instagram.com/jup.cl"
                                                className="text-gray-400 hover:text-pink-400 transition duration-200 p-2 rounded-full hover:bg-white/10"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="Instagram de JUP Propiedades"
                                            >
                                                <Instagram size={18} />
                                            </Link>
                                            <Link
                                                href="#"
                                                className="text-gray-400 hover:text-blue-500 transition duration-200 p-2 rounded-full hover:bg-white/10"
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                aria-label="LinkedIn de JUP Propiedades"
                                            >
                                                <Linkedin size={18} />
                                            </Link>
                                            <Link
                                                href="mailto:contacto@jup.cl"
                                                className="text-gray-400 hover:text-green-400 transition-all duration-200 p-2 rounded-full hover:bg-white/10"
                                                aria-label="Enviar correo a soporte"
                                            >
                                                <Mail size={18} />
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="group flex-center gap-2">
                                <Link
                                    href={"/home/products"}
                                    className="text-sm font-light hover:underline text-orange-100"
                                >
                                    Envío GRATIS sobre $90.000
                                </Link>
                                <Clock size={16} className="text-orange-100 mb-0.5 group-hover:translate-x-0.5 duration-300 transition-transform"/>
                            </div>
                            <div className="">
                                <ThemeToggle />
                            </div>
                        </div>
                    </div>

                    {/* Second nav bar */}
                    <DesktopNav
                        open={mobileMenuOpen}
                        onClose={() => setMobileMenuOpen(true)}
                        navigation={navigation}
                    />
                </nav>
            </header>
        </>
	);
}