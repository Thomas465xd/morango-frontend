export const runtime = "nodejs";

import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

cloudinary.config({
	cloud_name: process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
	api_key: process.env.CLOUDINARY_API_KEY,
	api_secret: process.env.CLOUDINARY_API_SECRET,
});

// console.log("Cloudinary env check:", {
// 	cloudName: !!process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
// 	apiKey: !!process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
// 	apiSecret: !!process.env.CLOUDINARY_API_SECRET,
// });

export async function POST(request: Request) {
	const body = await request.json();
	const { paramsToSign } = body;

	try {
		const signature = cloudinary.utils.api_sign_request(
			paramsToSign,
			process.env.CLOUDINARY_API_SECRET as string
		);

		return NextResponse.json({ signature }, { status: 200 });
	} catch (error) {
		console.error(error);
		return NextResponse.json(
			{ error: "Failed to generate signature" },
			{ status: 500 }
		);
	}
}
