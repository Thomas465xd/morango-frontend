import { MetadataRoute } from "next";
import { config } from "@/lib/config";

export default function robots(): MetadataRoute.Robots {
    return {
        rules: [
            {
                userAgent: "*",
                allow: "/",
                disallow: [
                    "/admin",
                    "/admin/*",
                    "/auth/pending",
                    "/auth/confirm",
                    "/auth/reset-password",
                    "/checkout",
                    "/checkout/*",
                    "/home/profile",
                ],
            },
        ],
        sitemap: `${config.frontendURL}/sitemap.xml`,
    };
}