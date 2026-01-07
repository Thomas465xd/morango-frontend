"use client";

import { useAuth } from "@/src/hooks/useAuth";
import {
	Disclosure,
	DisclosureButton,
	DisclosurePanel,
	Menu,
	MenuButton,
	MenuItem,
	MenuItems,
} from "@headlessui/react";
import { MenuIcon, User, XIcon } from "lucide-react";
import Logo from "../ui/Logo";
import Link from "next/link";
import ThemeToggle from "../ui/DarkMode";
import { usePathname } from "next/navigation";


function classNames(...classes: (string | undefined | false | null)[]): string {
    return classes.filter(Boolean).join(" ");
}

export default function NavBar() {
    const { data } = useAuth(); 

    const pathname = usePathname(); 

    const navigation = [
        { name: "Home", href: "/"}
    ];

    const handleLogout = () => {
        console.log("logout")
    }

	return (
		<Disclosure
			as="nav"
			className="relative shadow-lg dark:bg-stone-800 after:pointer-events-none after:absolute after:inset-x-0 after:bottom-0 after:h-px after:bg-white/10"
		>
			<div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8 py-2">
				<div className="relative flex h-16 items-center justify-between">
                    {/* Left: mobile menu button */}
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <DisclosureButton className="group relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/5 hover:text-white focus:outline-2 focus:-outline-offset-1 focus:outline-amber-500">
                            <span className="sr-only">Open main menu</span>
                            <MenuIcon className="block size-6 group-data-open:hidden" />
                            <XIcon className="hidden size-6 group-data-open:block" />
                        </DisclosureButton>
                    </div>

                    {/* Center: Logo + navigation */}
                    <div className="flex flex-1 items-center justify-center sm:justify-start">
                        <div className="flex shrink-0 items-center">
                            <Logo mini />
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {navigation.map(item => (
                                    <Link
                                        key={item.name}
                                        href={item.href}
                                        className={classNames(
                                            pathname === item.href
                                                ? "bg-gray-100/50 dark:bg-stone-950/50 text-amber-500 dark:text-white"
                                                : "text-gray-500 dark:text-gray-300 hover:bg-white/5 hover:text-amber-500 dark:hover:text-white",
                                            "rounded-md px-3 py-2 text-sm font-medium transition-colors duration-200"
                                        )}
                                    >
                                        {item.name}
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Theme toggle + Auth (Desktop) */}
					<div className="absolute inset-y-0 right-0 flex items-center gap-2 pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        {/* Theme toggle - visible on all screens */}
                        <ThemeToggle />

                        {/* Desktop Auth Section */}
                        {data ? (
                            <div className="hidden sm:flex items-center gap-3">
                                <div>
                                    Welcome back
                                    <span className="highlight ml-1">{data.name}</span>
                                </div>

                                {/* Profile dropdown */}
                                <Menu as="div" className="relative">
                                    <MenuButton className="relative flex rounded-full gap-1 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-amber-500 hover:cursor-pointer hover:underline">
                                        <span className="absolute -inset-1.5" />
                                        <span className="sr-only">Open user menu</span>
                                        <User className="size-6" color="gray"/>
                                    </MenuButton>

                                    <MenuItems
                                        transition
                                        className="absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-stone-800 py-1 outline -outline-offset-1 outline-white/10 transition data-closed:scale-95 data-closed:transform data-closed:opacity-0 data-enter:duration-100 data-enter:ease-out data-leave:duration-75 data-leave:ease-in"
                                    >
                                        <MenuItem>
                                            <Link
                                                href="#"
                                                className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden"
                                            >
                                                Your profile
                                            </Link>
                                        </MenuItem>
                                        <MenuItem>
                                            <Link
                                                href="#"
                                                className="block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden"
                                            >
                                                Settings
                                            </Link>
                                        </MenuItem>
                                        <MenuItem>
                                            <button
                                                onClick={handleLogout}
                                                className="w-full text-left block px-4 py-2 text-sm text-gray-300 data-focus:bg-white/5 data-focus:outline-hidden"
                                                disabled={false}
                                            >
                                                Sign out
                                            </button>
                                        </MenuItem>
                                    </MenuItems>
                                </Menu>
                            </div>
                        ) : (
                            <div className="hidden sm:flex items-center gap-1">
                                <Link
                                    href="/auth/sign-in"
                                    className="dark:text-gray-300 hover:bg-white/5 hover:text-amber-500 dark:hover:text-white transition-colors duration-200 rounded-md px-3 py-2 text-sm font-medium"
                                >
                                    Sign In
                                </Link>

                                <Link
                                    href="/auth/sign-up"
                                    className="dark:text-gray-300 hover:bg-white/5 hover:text-amber-500 dark:hover:text-white transition-colors duration-200 rounded-md px-3 py-2 text-sm font-medium"
                                >
                                    Sign Up
                                </Link>
                            </div>
                        )}
					</div>
				</div>
			</div>

            {/* Mobile menu panel */}
			<DisclosurePanel className="sm:hidden">
				<div className="space-y-1 px-2 pt-2 pb-3">
                    {/* Navigation links */}
					{navigation.map((item) => (
						<DisclosureButton
							key={item.name}
							as="a"
							href={item.href}
							aria-current={pathname === item.href ? "page" : undefined}
							className={classNames(
								pathname === item.href
									? "bg-stone-950/50 text-white"
									: "text-gray-300 hover:bg-white/5 hover:text-white",
								"block rounded-md px-3 py-2 text-base font-medium"
							)}
						>
							{item.name}
						</DisclosureButton>
					))}

                    {/* Mobile Auth Section */}
                    {data ? (
                        <>
                            <div className="border-t border-white/10 pt-3 mt-3">
                                <div className="px-3 py-2 text-base font-medium text-gray-400">
                                    Welcome back, <span className="text-white">{data.name}</span>
                                </div>
                            </div>
                            
                            <DisclosureButton
                                as="a"
                                href="#"
                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                            >
                                Your profile
                            </DisclosureButton>
                            
                            <DisclosureButton
                                as="a"
                                href="#"
                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                            >
                                Settings
                            </DisclosureButton>
                            
                            <button
                                onClick={handleLogout}
                                disabled={false}
                                className="w-full text-left block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white disabled:opacity-50"
                            >
                                Sign out
                            </button>
                        </>
                    ) : (
                        <div className="border-t border-white/10 pt-3 mt-3 space-y-1">
                            <DisclosureButton
                                as="a"
                                href="/auth/sign-in"
                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                            >
                                Sign In
                            </DisclosureButton>
                            
                            <DisclosureButton
                                as="a"
                                href="/auth/sign-up"
                                className="block rounded-md px-3 py-2 text-base font-medium text-gray-300 hover:bg-white/5 hover:text-white"
                            >
                                Sign Up
                            </DisclosureButton>
                        </div>
                    )}
				</div>
			</DisclosurePanel>
		</Disclosure>
	);
}