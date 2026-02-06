import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next"
import "./globals.css";
import { Nunito } from "next/font/google";
import ReactQueryProvider from "@/components/providers/QueryClientProvider";
import { Theme } from "@/components/providers/ThemeProvider";
import ToastProvider from "@/components/providers/ToastProvider";
import BackToTopButton from "@/components/ui/BackToTop";
import MercadoPagoProvider from "@/components/providers/MercadoPagoProvider";

// Font optimization
const nunito = Nunito({
	weight: ["400", "500", "600", "700"],
	subsets: ["latin"],
	variable: "--font-nunito",
	display: "swap", // Ensures text remains visible during font loading
});

// Viewport configuration for responsive design and mobile optimization
export const viewport: Viewport = {
	themeColor: [
		{ media: "(prefers-color-scheme: light)", color: "#ffffff" },
		{ media: "(prefers-color-scheme: dark)", color: "#0f172a" },
	],
	width: "device-width",
	initialScale: 1,
	maximumScale: 5,
	userScalable: true,
};

// SEO Configuration
const siteConfig = {
	name: "Morango",
	title: "Morango Joyas",
	description: "Encuentra las mejores joyas y accesorios.",
	url: "https://www.morangojoyas.cl",
	siteName: "Morango Joyas",
	locale: "es_CL",
	type: "website",
};

//* This actually sets ups Next metadata
export const metadata: Metadata = {
	title: {
        template: `%s | ${siteConfig.name}`,
        default: siteConfig.title
    },
	description: siteConfig.description
};

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang="en" suppressHydrationWarning className={nunito.variable}>
            <head>
                {/* DNS Prefetch & Preconnect */}
                <link rel="preconnect" href="https://res.cloudinary.com" crossOrigin="" />
                <link rel="dns-prefetch" href="https://res.cloudinary.com" />
				<link rel="preconnect" href="https://fonts.googleapis.com" crossOrigin="" />
				<link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />

				{/* Favicons */}
                <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
                <link rel="icon" type="image/ico" href="/favicon.ico" />
                <link rel="manifest" href="/manifest.json" />
                <link rel="mask-icon" href="/safari-pinned-tab.svg" color="#000000" />
                <meta name="msapplication-TileColor" content="#ffffff" />

                {/* Preload Critical Resources */}
                {/* <link rel="preload" as="image" href="/logo.svg" type="image/svg+xml"/> */}

                {/* Security Headers */}
                <meta name="referrer" content="origin-when-cross-origin" />

                {/* Additional SEO Meta Tags */}
                <meta name="geo.region" content="CL-RM" />
                <meta name="geo.placename" content="Santiago, Chile" />
                <meta name="geo.position" content="-33.4489;-70.6693" />
                <meta name="ICBM" content="-33.4489, -70.6693" />
            </head>
			<body
				suppressHydrationWarning
				className="font-sans antialiased tracking-wide flex min-h-screen flex-col"
			>
                <ReactQueryProvider>
                    <MercadoPagoProvider>
                        <Theme>
                            <ToastProvider />
                                <Analytics />
                                {children}
                            <BackToTopButton />
                        </Theme>
                    </MercadoPagoProvider>
                </ReactQueryProvider>
			</body>
		</html>
	);
}
