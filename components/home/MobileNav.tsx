"use client";

import Link from "next/link";
import { navigation } from "./NavBar";
import { usePathname } from "next/navigation";
import { Boxes, LogIn, LucideSettings2, PencilLine, ShoppingCart, TableConfigIcon } from "lucide-react";
import { User } from "@/src/types";

type MobileMenuProps = {
	open: boolean;
	onToggle: () => void;
	navigation: typeof navigation;
    user?: User;
};


export default function MobileNav({
	open,
	onToggle,
	navigation,
    user
} : MobileMenuProps) {
    const currentPath = usePathname(); 

	return (
		<div
			className={`
				fixed
				top-[9.5rem]
				left-0
				z-40
				h-[calc(100vh-9.5rem)]
				w-80
				bg-neutral-900
				shadow-xl
				transform
				transition-transform
				duration-300
				ease-out
				lg:hidden
				${open ? "translate-x-0" : "-translate-x-full"}
			`}
		>
			<div className="flex flex-col h-full px-6 py-6">
				{/* Navigation */}
				<ul className="space-y-5">
					{navigation.pages.map((page) => (
						<li key={page.name}>
							<Link
								href={page.href}
								onClick={onToggle}
								className={`block text-lg ${currentPath === page.href ? "text-orange-300" : "text-white hover:text-orange-200"}  transition-colors`}
							>
								{page.name}
							</Link>
						</li>
					))}
				</ul>

				<hr className="my-6 border-white/10" />

				{/* Auth */}
                {!user ? (
                    <div className="space-y-4 mt-auto">
                        <Link
                            href="/auth/register"
                            onClick={onToggle}
                            className="flex items-center gap-2 text-white hover:text-orange-300 text-lg transition-colors"
                        >
                            <PencilLine size={20}/>
                            Crear cuenta
                        </Link>
                        <Link
                            href="/auth/login"
                            onClick={onToggle}
                            className="flex-align text-white hover:text-orange-300 text-lg transition-colors"
                        >
                            <LogIn size={20}/>
                            Iniciar sesión
                        </Link>
                    </div>
                ) : (
                    <div className="space-y-4 mt-auto">
                        <h1 className="text-xl px-4">
                            Hola, <span className="highlight">{user.name}</span>
                        </h1>
                        <div className="px-4 py-3">
                            <p className="text-sm text-gray-400">
                                Sesión iniciada como
                            </p>
                            <p className="truncate text-sm font-medium text-white">
                                {user.email}
                            </p>
                        </div>
                        <Link
                            href="/home/profile"
                            className="flex-align px-4 py-2 text-sm text-gray-300
                                hover:bg-white/5 hover:text-white
                                transition-colors duration-150"
                            role="menuitem"
                        >
                            <LucideSettings2 size={16} />
                            Mi Perfil
                        </Link>
                        <Link
                            href="/home/orders"
                            className="flex-align px-4 py-2 text-sm text-gray-300
                                hover:bg-white/5 hover:text-white
                                transition-colors duration-150"
                            role="menuitem"
                        >
                            <Boxes size={16} />
                            Mis Ordenes
                        </Link>
                        <Link
                            href="#"
                            className="flex-align px-4 py-2 text-sm text-gray-300
                                hover:bg-white/5 hover:text-white
                                transition-colors duration-150"
                            role="menuitem"
                        >
                            <ShoppingCart size={16} />
                            Carrito
                        </Link>
                        {user.role && (
                            <Link
                                href="/admin"
                                className="flex-align px-4 py-2 text-sm text-blue-500
                                    hover:bg-white/5 hover:text-blue-400
                                    transition-colors duration-150"
                                role="menuitem"
                            >
                                <TableConfigIcon size={16} />
                                Panel de Administración
                            </Link>
                        )}
                    </div>
                )}
			</div>
		</div>
	);
}
