import type { NextConfig } from "next";

const nextConfig : NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: "https",
				hostname: "res.cloudinary.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "images.unsplash.com",
				port: "",
				pathname: "/**",
			},
			{
				protocol: "https",
				hostname: "tailwindcss.com",
				port: "",
				pathname: "/**",
			},
		],
	},
    // Prevent dynamic routes from catching static asset files
    redirects: async () => {
        return [
            {
                source: "/home/products/:path*.css.map",
                destination: "/:path*.css.map",
                permanent: true,
            },
            {
                source: "/home/products/:path*.svg",
                destination: "/:path*.svg",
                permanent: true,
            },
            {
                source: "/home/products/:path*.json",
                destination: "/:path*.json",
                permanent: true,
            },
        ];
    },
};

export default nextConfig;
