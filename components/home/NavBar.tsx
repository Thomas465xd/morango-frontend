"use client";

import { useEffect, useState } from "react";
import MobileNav from "./MobileNav";
import DesktopNav from "./DesktopNav";
import { useAuth } from "@/src/hooks/useAuth";
import NavBarSkeleton from "../skeletons/NavBarSkeleton";
import { navigation } from "@/src/types";

export default function NavBar() {
	const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { user, isLoading } = useAuth(); 

	const toggleMobileMenu = () => {
		setMobileMenuOpen((prev) => !prev);
	};

    useEffect(() => {
        if (mobileMenuOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "";
        }

        return () => {
            document.body.style.overflow = "";
        };
    }, [mobileMenuOpen]);

    if(isLoading) return (
        <NavBarSkeleton />
    )
    
    if(user) return (
        <>

            <header className="relative z-50">
                <nav aria-label="Top">
                    <DesktopNav
                        open={mobileMenuOpen}
                        onToggleMobileMenu={toggleMobileMenu}
                        navigation={navigation}
                        user={user}
                    />
                </nav>

                {/* Backdrop (click closes menu) */}
                {mobileMenuOpen && (
                    <div
                        className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                        onClick={toggleMobileMenu}
                    />
                )}

                {/* Mobile menu */}
                <MobileNav
                    open={mobileMenuOpen}
                    onToggle={toggleMobileMenu}
                    navigation={navigation}
                    user={user}
                />
            </header>
        </>
	);

    return (
            <>
                <header className="relative z-50">
                    <nav aria-label="Top">
                        <DesktopNav
                            open={mobileMenuOpen}
                            onToggleMobileMenu={toggleMobileMenu}
                            navigation={navigation}
                            user={user}
                        />
                    </nav>

                    {/* Backdrop (click closes menu) */}
                    {mobileMenuOpen && (
                        <div
                            className="fixed inset-0 z-30 bg-black/50 lg:hidden"
                            onClick={toggleMobileMenu}
                        />
                    )}

                    {/* Mobile menu */}
                    <MobileNav
                        open={mobileMenuOpen}
                        onToggle={toggleMobileMenu}
                        navigation={navigation}
                        user={user}
                    />
                </header>
            </>
        );
}