import NavBar from "@/components/home/NavBar";
import Footer from "@/components/ui/Footer";
import { ReactNode } from "react";

export default function RootLayout({
	children,
}: Readonly<{
	children: ReactNode;
}>) {
	return (
		<>
            <NavBar />
			{children}
            <Footer />
		</>
	);
}