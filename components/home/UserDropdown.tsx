"use client";

import { logout } from "@/src/api/AuthAPI";
import { User } from "@/src/types";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Boxes, ChevronDownIcon, LogOut, Settings2, ShoppingCart, TableConfigIcon, UserCircle2 } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { toast } from "react-toastify";
import Swal, { SweetAlertTheme } from "sweetalert2";

type UserDropdownProps = {
    user: User
}

export default function UserDropdown({ user } : UserDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);
    const timeoutRef = useRef<NodeJS.Timeout | null>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);

    const router = useRouter(); 

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setIsOpen(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setIsOpen(false);
        }, 150); // Small delay before closing
    };

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (timeoutRef.current) {
                clearTimeout(timeoutRef.current);
            }
        };
    }, []);

    const queryClient = useQueryClient(); 

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
                theme: `${localStorage.getItem("theme") as SweetAlertTheme}`,
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
            className="relative inline-block"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            ref={dropdownRef}
        >
            <button
                className="
                    flex-align w-full justify-center gap-x-1.5 rounded-md
                    bg-zinc-800 px-3 py-2 text-sm font-semibold text-white
                    shadow-none ring-1 ring-inset ring-white/5
                    hover:bg-white/20 transition-colors duration-200"
                aria-expanded={isOpen}
                aria-haspopup="true"
            >
                <UserCircle2 />
                Hola, <span className="highlight">{user.name}</span>
                <ChevronDownIcon
                    aria-hidden="true"
                    className={`-mr-1 size-5 text-gray-400 transition-transform duration-200 ${
                        isOpen ? 'rotate-180' : ''
                    }`}
                />
            </button>

            <div
                className={`
                    absolute right-0 z-10 mt-2 w-56 origin-top-right
                    divide-y divide-white/10 rounded-md
                    bg-zinc-800 shadow-lg ring-1 ring-white/10
                    
                    transition-all duration-200 ease-out
                    ${isOpen 
                        ? 'opacity-100 scale-100 pointer-events-auto' 
                        : 'opacity-0 scale-95 pointer-events-none'
                    }
                `}
                role="menu"
                aria-orientation="vertical"
            >
                <div className="px-4 py-3">
                    <p className="text-sm text-gray-400">
                        Sesión iniciada como
                    </p>
                    <p className="truncate text-sm font-medium text-white">
                        {user.email}
                    </p>
                </div>
                
                <div className="py-1" role="none">
                    <Link
                        href="/home/profile"
                        className="flex-align px-4 py-2 text-sm text-gray-300
                            hover:bg-white/5 hover:text-white
                            transition-colors duration-150"
                        role="menuitem"
                    >
                        <Settings2 size={16} />
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
                        href="/home/cart"
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
                </div>
                
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
        </div>
    );
}