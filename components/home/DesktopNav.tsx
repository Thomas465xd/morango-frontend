"use client";

import Image from "next/image";
import { CircleQuestionMark, Clock, Facebook, Instagram, Linkedin, LogIn, Mail, Menu, PencilLine, Search, ShoppingBagIcon, UserCircle2, XIcon } from "lucide-react";
import Link from "next/link";
import {
	PopoverGroup,
} from "@headlessui/react";
import { usePathname } from "next/navigation";
import LogoImage from "@/public/logo-no-bg.png"; // static import
import { navigation } from "./NavBar";
import { useEffect, useState } from "react";
import ThemeToggle from "../ui/DarkMode";
import { User } from "@/src/types";
import UserDropdown from "./UserDropdown";

type DesktopNavProps = {
	open: boolean;
	onToggleMobileMenu: () => void;
	navigation: typeof navigation;
    user?: User;
};


export default function DesktopNav({ open, onToggleMobileMenu, navigation, user } : DesktopNavProps) {
    const currentPathname = usePathname(); 
    const [isNavVisible, setIsNavVisible] = useState(true);
    const [lastScrollY, setLastScrollY] = useState(0);

    useEffect(() => {
        const handleScroll = () => {
            const currentScrollY = window.scrollY;
            
            // Show navbar at the very top
            if (currentScrollY < 10) {
                setIsNavVisible(true);
            }
            // Hide navbar when scrolling down, show when scrolling up
            else if (currentScrollY > lastScrollY && currentScrollY > 100) {
                // Scrolling down & past threshold
                setIsNavVisible(false);
            } else if (currentScrollY < lastScrollY) {
                // Scrolling up
                setIsNavVisible(true);
            }
            
            setLastScrollY(currentScrollY);
        };

        // Throttle scroll events for better performance
        let ticking = false;
        const throttledHandleScroll = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    handleScroll();
                    ticking = false;
                });
                ticking = true;
            }
        };

        window.addEventListener('scroll', throttledHandleScroll, { passive: true });

        return () => {
            window.removeEventListener('scroll', throttledHandleScroll);
        };
    }, [lastScrollY]);

    return (
        <div
            className={`fixed top-0 left-0 right-0 z-50 ${lastScrollY < 110 ? "bg-black/70 dark:bg-black/20" : "bg-black/40 dark:bg-black/60"} backdrop-blur-lg backdrop-filter transition-transform duration-300 ${
                isNavVisible ? 'translate-y-0' : '-translate-y-full'
            }`}
        >
            {/* Top navigation */}
            <div className="bg-zinc-800 dark:bg-zinc-800/90 border-b-zinc-700 border-b-2">
                <div className="mx-auto flex-between h-14 max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="hidden lg:block relative z-20">
                        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                            <div className="flex-between py-2 text-sm">
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
                    <div className="group flex-center gap-2 ">
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
        
            <div 
                className={` dark:bg-black/10 backdrop-blur-lg backdrop-filter transition-transform duration-300 border-b border-zinc-500`}
            >
                <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div>
                        <div className="flex h-24 items-center justify-between">
                            {/* Logo (lg+) */}
                            <div className="hidden lg:flex lg:flex-1 lg:items-center">
                                <Link
                                    href="/home"
                                >
                                    <span className="sr-only">
                                        Morango Joyas
                                    </span>
                                    <Image
                                        src={LogoImage}
                                        alt="Company Logo"
                                        width={30}
                                        height={30}
                                        priority
                                        fetchPriority="high"
                                        loading="eager"
                                        className="object-contain h-auto w-auto"
                                        placeholder="empty"
                                        sizes="(max-width: 640px) 100px, (max-width: 1024px) 120px, 160px"
                                    />
                                </Link>
                            </div>

                            <div className="hidden h-full lg:flex">
                                {/* Routes */}
                                <PopoverGroup className="inset-x-0 bottom-0 px-4">
                                    <div className="flex h-full justify-center space-x-8">
                                        {navigation.pages.map(
                                            (page) => (
                                                <div 
                                                    className="flex-center gap-2" 
                                                    key={page.href}
                                                >
                                                    <Link
                                                        key={page.name}
                                                        href={page.href}
                                                        className={`text-sm font-medium ${currentPathname === page.href ? "text-orange-200 hover:text-orange-200" : "text-white hover:text-orange-100"}`}
                                                    >
                                                        {page.name}
                                                    </Link>
                                                </div>
                                            )
                                        )}
                                    </div>
                                </PopoverGroup>
                            </div>

                            {/* Mobile menu and search (lg-) */}
                            <div className="flex flex-1 items-center lg:hidden">
                                <button
                                    type="button"
                                    onClick={onToggleMobileMenu}
                                    className="-ml-2 p-2 text-white transition-transform duration-200"
                                >
                                    <span className="sr-only">Toggle menu</span>

                                    {open ? (
                                        <XIcon className="size-6" />
                                    ) : (
                                        <Menu className="size-6" />
                                    )}
                                </button>

                                {/* Search */}
                                <Link
                                    href="#"
                                    className="ml-2 p-2 text-white"
                                >
                                    <span className="sr-only">
                                        Search
                                    </span>
                                    <Search
                                        aria-hidden="true"
                                        className="size-6"
                                    />
                                </Link>
                            </div>

                            {/* Logo (lg-) */}
                            <Link 
                                href="/home"
                                className="lg:hidden"
                            >
                                <span className="sr-only">
                                    Morango Joyas
                                </span>
                                <Image
                                    src={LogoImage}
                                    alt="Company Logo"
                                    width={30}
                                    height={30}
                                    priority
                                    fetchPriority="high"
                                    loading="eager"
                                    className="object-contain h-auto w-auto"
                                    placeholder="empty"
                                    sizes="(max-width: 640px) 100px, (max-width: 1024px) 120px, 160px"
                                />
                            </Link>

                            <div className="flex flex-1 items-center justify-end">
                                <div className="flex items-center lg:ml-8">
                                    {!user ? (
                                        <div className="flex-align">
                                            <Link
                                                href="/auth/login"
                                                className="hidden text-sm font-medium text-white lg:flex-align hover:text-orange-300 transition-colors duration-200"
                                            >
                                                <LogIn size={20}/>
                                                Iniciar Sesión
                                            </Link>
                                            <Link
                                                href="/auth/register"
                                                className="p-2 text-white lg:hidden hover:text-orange-300 transition-colors duration-200"
                                            >
                                                <span className="sr-only">
                                                    Registrarse
                                                </span>
                                                <CircleQuestionMark
                                                    aria-hidden="true"
                                                    className="size-6"
                                                />
                                            </Link>
                                            <Link
                                                href="/auth/register"
                                                className="hidden text-sm font-medium text-white lg:flex-align hover:text-orange-300 transition-colors duration-200"
                                            >   
                                                <PencilLine size={20}/> 
                                                Registrarse
                                            </Link>
                                        </div>
                                    ) : (
                                        <div className="hidden lg:flex">
                                            <UserDropdown 
                                                user={user}
                                            />
                                        </div>
                                    )}

                                    {/* Cart */}
                                    <div className="ml-4 flow-root lg:ml-8">
                                        <Link
                                            href="#"
                                            className="group -m-2 flex items-center p-2"
                                        >
                                            <ShoppingBagIcon
                                                aria-hidden="true"
                                                className="size-6 shrink-0 text-white"
                                            />
                                            <span className="ml-2 text-sm font-medium text-white">
                                                0
                                            </span>
                                            <span className="sr-only">
                                                items in cart, view bag
                                            </span>
                                        </Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}