"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Boxes, LogIn, LogOut, LucideSettings2, PencilLine, ShoppingCart, TableConfigIcon } from "lucide-react";
import { navigation, User } from "@/src/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "@/src/api/AuthAPI";
import { toast } from "react-toastify";
import Swal from "sweetalert2";
import { useThemeForModal } from "@/src/hooks/useTheme";

type MobileMenuProps = {
	open: boolean;
	onToggle: () => void;
	navigation: typeof navigation;
    isSecondarySticky: boolean; 
    user?: User;
};


export default function MobileNav({
	open,
	onToggle,
	navigation,
    isSecondarySticky,
    user
} : MobileMenuProps) {
    const currentPath = usePathname(); 
    const router = useRouter(); 
    const queryClient = useQueryClient();
    const theme = useThemeForModal(); 

    const { mutate, isPending } = useMutation({
        mutationFn: logout, 
        onError: (error) => {
            toast.error(error.message)
        }, 
        onSuccess: (data) => {
            queryClient.removeQueries({ queryKey: ["user"], exact: true });
            
            Swal.fire({
                title: "🎉 Sesión cerrada exitosamente 🎉",
                text: data.message, 
                timer: 800,
                showConfirmButton: false,
                icon: "success",
                theme: theme,
            }).then(() => {
                router.replace("/home"); // replace avoids history issues
            })
        }
    })

    const handleLogout = () => {
        mutate(); 
    }
	return (
		<div
			className={`
				fixed
				${isSecondarySticky ? 
                    "top-[96px] h-[calc(100vh-96px)]" : 
                    "top-[152px] h-[calc(100vh-152px)]"
                }
				left-0
				z-40
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

                        <li>
							<Link
								href={"/home"}
								onClick={onToggle}
								className={`block text-lg ${currentPath === "/home" ? "text-orange-300" : "text-white hover:text-orange-200"}  transition-colors`}
							>
								Inicio
							</Link>
						</li>

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
                        {user.role === "admin" && (
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
                        <div className="py-1" role="none">
                            <form>
                                <button
                                    onClick={handleLogout}
                                    disabled={isPending}
                                    className="flex-align w-full px-4 py-2 text-left text-sm text-gray-300
                                        hover:bg-white/5 hover:text-white
                                        transition-colors duration-150"
                                    role="menuitem"
                                >
                                    <LogOut size={16} />
                                    Cerrar sesión
                                </button>
                            </form>
                        </div>
                    </div>
                )}
			</div>
		</div>
	);
}
