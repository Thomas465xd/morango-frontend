"use client";

import { XIcon } from "lucide-react";
import Link from "next/link";
import {
	Dialog,
	DialogBackdrop,
	DialogPanel,
} from "@headlessui/react";
import { navigation } from "./NavBar";

type MobileMenuProps = {
    open: boolean;
    onClose: () => void;
    navigation: typeof navigation;
};

export default function MobileNav({ open, onClose, navigation } : MobileMenuProps) {
    return (
        <Dialog
            open={open}
            onClose={onClose}
            className="relative z-40 lg:hidden"
        >
            <DialogBackdrop
                transition
                className="fixed inset-0 bg-black/25 transition-opacity duration-300 ease-linear data-closed:opacity-0"
            />
            <div className="fixed inset-0 z-40 flex">
                <DialogPanel
                    transition
                    className="relative flex w-full max-w-xs transform flex-col overflow-y-auto bg-white pb-12 shadow-xl transition duration-300 ease-in-out data-closed:-translate-x-full"
                >
                    <div className="flex px-4 pt-5 pb-2">
                        <button
                            type="button"
                            onClick={onClose}
                            className="relative -m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400"
                        >
                            <span className="absolute -inset-0.5" />
                            <span className="sr-only">Close menu</span>
                            <XIcon
                                aria-hidden="true"
                                className="size-6"
                            />
                        </button>
                    </div>

                    <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                        {navigation.pages.map((page) => (
                            <div key={page.name} className="flow-root">
                                <Link
                                    href={page.href}
                                    className="-m-2 block p-2 font-medium text-gray-900"
                                >
                                    {page.name}
                                </Link>
                            </div>
                        ))}
                    </div>

                    <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                        <div className="flow-root">
                            <Link
                                href="/auth/register"
                                className="-m-2 block p-2 font-medium text-gray-900"
                            >
                                Registrarse
                            </Link>
                        </div>
                        <div className="flow-root">
                            <Link
                                href="#"
                                className="-m-2 block p-2 font-medium text-gray-900"
                            >
                                Iniciar Sesión
                            </Link>
                        </div>
                    </div>
                </DialogPanel>
            </div>
        </Dialog>
    )
}
