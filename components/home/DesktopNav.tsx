"use client";

import Image from "next/image";
import { CircleQuestionMark, Menu, Search, ShoppingBagIcon } from "lucide-react";
import Link from "next/link";
import {
	PopoverGroup,
} from "@headlessui/react";
import { usePathname } from "next/navigation";
import LogoImage from "@/public/logo-no-bg.png"; // static import
import { navigation } from "./NavBar";

type DesktopNavProps = {
    open: boolean;
    onClose: () => void;
    navigation: typeof navigation;
}

export default function DesktopNav({ onClose, navigation } : DesktopNavProps) {
    const currentPathname = usePathname(); 

    return (
        <div className="bg-black/90 dark:bg-black/10 backdrop-blur-md backdrop-filter">
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
                                    width={30}       // base size for large screens
                                    height={30}      // keep aspect ratio
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
                                                    className={`text-sm font-medium$ ${currentPathname === page.href ? "text-orange-200 hover:text-orange-200" : "text-white hover:text-orange-100"}  `}
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
                                onClick={onClose}
                                className="-ml-2 p-2 text-white"
                            >
                                <span className="sr-only">
                                    Open menu
                                </span>
                                <Menu
                                    aria-hidden="true"
                                    className="size-6"
                                />
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
                                    width={30}       // base size for large screens
                                    height={30}      // keep aspect ratio
                                    priority
                                    fetchPriority="high"
                                    loading="eager"
                                    className="object-contain h-auto w-auto"
                                    placeholder="empty"
                                    sizes="(max-width: 640px) 100px, (max-width: 1024px) 120px, 160px"
                                />
                            </Link>

                        <div className="flex flex-1 items-center justify-end">
                            <Link
                                href="/auth/login"
                                className="hidden text-sm font-medium text-white lg:block hover:text-orange-200 transition-colors duration-200"
                            >
                                Iniciar Sesión
                            </Link>

                            <div className="flex items-center lg:ml-8">
                                <Link
                                    href="/auth/register"
                                    className="p-2 text-white lg:hidden hover:text-orange-200 transition-colors duration-200"
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
                                    className="hidden text-sm font-medium text-white lg:block hover:text-orange-200 transition-colors duration-200"
                                >
                                    Registrarse
                                </Link>

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
                                            items in cart, view
                                            bag
                                        </span>
                                    </Link>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
