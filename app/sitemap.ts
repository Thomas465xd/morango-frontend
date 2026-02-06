import { MetadataRoute } from "next";
import { config } from "@/lib/config";

// TODO: make request to get different document ID's (products, orders, etc...)
// This will allow to dynamically map out the available dynamic routes in the site
// However that requires some complex react-query with SSR code... so for now only 
// static pages will be set in sitemap.

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
    return [
        {
            url: `${config.frontendURL}/home`,
            changeFrequency: "weekly",
            priority: 1.0,
        },
        {
            url: `${config.frontendURL}/home/products`,
            changeFrequency: "daily",
            priority: 0.9,
        },
        {
            url: `${config.frontendURL}/home/cart`,
            changeFrequency: "hourly",
            priority: 0.7,
        },
        {
            url: `${config.frontendURL}/home/about`,
            changeFrequency: "yearly",
            priority: 0.6,
        },
        {
            url: `${config.frontendURL}/home/questions`,
            changeFrequency: "yearly",
            priority: 0.6,
        },
        {
            url: `${config.frontendURL}/home/contact`,
            changeFrequency: "yearly",
            priority: 0.6,
        },
        {
            url: `${config.frontendURL}/auth/login`,
            changeFrequency: "never",
            priority: 0.5,
        },
        {
            url: `${config.frontendURL}/auth/register`,
            changeFrequency: "never",
            priority: 0.5,
        },
        {
            url: `${config.frontendURL}/auth/forgot`,
            changeFrequency: "never",
            priority: 0.5,
        },
    ];
}