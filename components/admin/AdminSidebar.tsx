"use client";

import { useState } from "react";
import Image from "next/image";
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
	TransitionChild,
} from "@headlessui/react";
import { ChartPieIcon, HomeIcon, Menu, UsersIcon, XIcon, Truck, Gem, CreditCard } from "lucide-react";
import Link from "next/link";
import Logo from "../ui/Logo";
import { usePathname } from "next/navigation";
import ThemeToggle from "../ui/DarkMode";

const navigation = [
	{ name: "Dashboard", href: "/admin", icon: HomeIcon },
	{ name: "Productos", href: "/admin/products", icon: Gem },
	{ name: "Ordenes", href: "/admin/orders", icon: Truck },
	{ name: "Usuarios", href: "/admin/users", icon: UsersIcon },
	{ name: "Pagos", href: "/admin/payments", icon: CreditCard },
	{ name: "Estadísticas", href: "/admin/analytics", icon: ChartPieIcon },
];
const utilities = [
	{ id: 1, name: "Ir a la Página", href: "/home", initial: "M" },
];

function classNames(...classes: (string | undefined | false)[]): string {
    return classes.filter(Boolean).join(" ");
}

export default function AdminSidebar() {
    const currentPathname = usePathname(); 
	const [sidebarOpen, setSidebarOpen] = useState(false);

	return (
        <div>
            <Dialog
                open={sidebarOpen}
                onClose={setSidebarOpen}
                className="relative z-50 lg:hidden"
            >
                <DialogBackdrop
                    transition
                    className="fixed inset-0 bg-zinc-900/80 transition-opacity duration-300 ease-linear data-closed:opacity-0"
                />

                <div className="fixed inset-0 flex">
                    <DialogPanel
                        transition
                        className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-closed:-translate-x-full"
                    >
                        <TransitionChild>
                            <div className="absolute top-0 left-full flex w-16 justify-center pt-5 duration-300 ease-in-out data-closed:opacity-0">
                                <button
                                    type="button"
                                    onClick={() => setSidebarOpen(false)}
                                    className="-m-2.5 p-2.5"
                                >
                                    <span className="sr-only">
                                        Close sidebar
                                    </span>
                                    <XIcon
                                        aria-hidden="true"
                                        className="size-6 text-white"
                                    />
                                </button>
                            </div>
                        </TransitionChild>

                        {/* Sidebar component */}
                        <div className="relative flex grow flex-col gap-y-5 overflow-y-auto bg-zinc-900 px-6 pb-2 ring-1 ring-white/10 dark:before:pointer-events-none dark:before:absolute dark:before:inset-0 dark:before:bg-black/10">
                            <div className="relative flex-center h-20 shrink-0">
                                <Logo />
                            </div>
                            <nav className="flex flex-1 flex-col">
                                <ul
                                    role="list"
                                    className="flex flex-1 flex-col gap-y-7"
                                >
                                    <li>
                                        <ul
                                            role="list"
                                            className="-mx-2 space-y-1"
                                        >
                                            {navigation.map((item) => (
                                                <li key={item.name}>
                                                    <Link
                                                        href={item.href}
                                                        className={classNames(
                                                            currentPathname === item.href
                                                                ? "bg-white/5 text-white"
                                                                : "text-gray-400 hover:bg-white/5 hover:text-white",
                                                            "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                                                        )}
                                                    >
                                                        <item.icon
                                                            aria-hidden="true"
                                                            className="size-6 shrink-0"
                                                        />
                                                        {item.name}
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                    <li>
                                        <div className="text-xs/6 font-semibold text-gray-400">
                                            Utilidades
                                        </div>
                                        <ul
                                            role="list"
                                            className="-mx-2 mt-2 space-y-1"
                                        >
                                            {utilities.map((utility) => (
                                                <li key={utility.name}>
                                                    <Link
                                                        href={utility.href}
                                                        className={classNames(
                                                            currentPathname === utility.href
                                                                ? "bg-gray-800 text-white"
                                                                : "text-gray-400 hover:bg-white/5 hover:text-white",
                                                            "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                                                        )}
                                                    >
                                                        <span className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-white/10 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:border-white/20 group-hover:text-white">
                                                            {utility.initial}
                                                        </span>
                                                        <span className="truncate">
                                                            {utility.name}
                                                        </span>
                                                    </Link>
                                                </li>
                                            ))}
                                        </ul>
                                    </li>
                                </ul>
                            </nav>
                        </div>
                    </DialogPanel>
                </div>
            </Dialog>

            {/* Static sidebar for desktop */}
            <div className="hidden bg-zinc-900 lg:fixed lg:inset-y-0 lg:z-50 lg:flex lg:w-72 lg:flex-col">
                {/* Sidebar component, swap this element with another sidebar if you like */}
                <div className="flex grow flex-col gap-y-5 overflow-y-auto border-r-2 dark:border-r border-zinc-800 px-6 dark:border-white/10 dark:bg-black/10">
                    <div className="relative flex-center max-h-20 shrink-0">
                        <Logo mini />
                    </div>
                    <nav className="flex flex-1 flex-col">
                        <ul
                            role="list"
                            className="flex flex-1 flex-col gap-y-7"
                        >
                            <li>
                                <ul role="list" className="-mx-2 space-y-1">
                                    {navigation.map((item) => (
                                        <li key={item.name}>
                                            <Link
                                                href={item.href}
                                                className={classNames(
                                                    currentPathname === item.href
                                                        ? "bg-white/5 text-white"
                                                        : "text-gray-400 hover:bg-white/5 hover:text-white",
                                                    "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                                                )}
                                            >
                                                <item.icon
                                                    aria-hidden="true"
                                                    className="size-6 shrink-0"
                                                />
                                                {item.name}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li>
                                <div className="text-xs/6 font-semibold text-gray-400">
                                    Utilidades
                                </div>
                                <ul
                                    role="list"
                                    className="-mx-2 mt-2 space-y-1"
                                >
                                    {utilities.map((utility) => (
                                        <li key={utility.name}>
                                            <Link
                                                href={utility.href}
                                                className={classNames(
                                                    currentPathname === utility.href
                                                        ? "bg-gray-800 text-white"
                                                        : "text-gray-400 hover:bg-white/5 hover:text-white",
                                                    "group flex gap-x-3 rounded-md p-2 text-sm/6 font-semibold"
                                                )}
                                            >
                                                <span className="flex size-6 shrink-0 items-center justify-center rounded-lg border border-gray-700 bg-gray-800 text-[0.625rem] font-medium text-gray-400 group-hover:text-white">
                                                    {utility.initial}
                                                </span>
                                                <span className="truncate">
                                                    {utility.name}
                                                </span>
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                            <li className="-mx-6 mt-auto flex">
                                <Link
                                    href="#"
                                    className="flex items-center gap-x-4 px-6 py-3 text-sm/6 font-semibold text-white hover:bg-white/5"
                                >
                                    <Image
                                        alt=""
                                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                                        width={32}
                                        height={32}
                                        className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                                    />
                                    <span className="sr-only">
                                        Your profile
                                    </span>
                                    <span aria-hidden="true">Javiera Urbina</span>
                                </Link>
                                <ThemeToggle/>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>

            <div className="sticky top-0 z-40 flex items-center gap-x-6 bg-gray-900 px-4 py-4 shadow-sm sm:px-6 lg:hidden dark:shadow-none dark:after:pointer-events-none dark:after:absolute dark:after:inset-0 dark:after:border-b dark:after:border-white/10 dark:after:bg-black/10">
                <button
                    type="button"
                    onClick={() => setSidebarOpen(true)}
                    className="-m-2.5 p-2.5 text-gray-400 hover:text-white lg:hidden"
                >
                    <span className="sr-only">Open sidebar</span>
                    <Menu aria-hidden="true" className="size-6" />
                </button>
                <div className="flex-1 text-sm/6 font-semibold text-white">
                    Dashboard
                </div>
                <Link href="#">
                    <span className="sr-only">Your profile</span>
                    <Image
                        alt=""
                        src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        width={32}
                        height={32}
                        className="size-8 rounded-full bg-gray-800 outline -outline-offset-1 outline-white/10"
                    />
                </Link>
            </div>
        </div>
	);
}
