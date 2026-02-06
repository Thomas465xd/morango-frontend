//! Validate necessary env variables are present on app start
const getConfig = () => {
    const frontendURL = process.env.NEXT_PUBLIC_FRONTEND_URL;
    const backendURL = process.env.NEXT_PUBLIC_BACKEND_API_URL; 
    const cloudinaryName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME; 
    const cloudinaryKey = process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY; 
    const mpPublicKey = process.env.NEXT_PUBLIC_MP_PUBLIC_KEY; 
    
    if (!frontendURL) {
        throw new Error(
            "❌ NEXT_PUBLIC_FRONTEND_URL environment variable is not set. " +
            "Please add it to your .env or .env.local file"
        );
    }

    if (!backendURL) {
        throw new Error(
            "❌ NEXT_PUBLIC_BACKEND_API_URL environment variable is not set. " +
            "Please add it to your .env or .env.local file"
        );
    }

    if (!cloudinaryName) {
        throw new Error(
            "❌ NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME environment variable is not set. " +
            "Please add it to your .env or .env.local file"
        );
    }

    if (!cloudinaryKey) {
        throw new Error(
            "❌ NEXT_PUBLIC_CLOUDINARY_API_KEY environment variable is not set. " +
            "Please add it to your .env or .env.local file"
        );
    }

    if (!mpPublicKey) {
        throw new Error(
            "❌ NEXT_PUBLIC_MP_PUBLIC_KEY environment variable is not set. " +
            "Please add it to your .env or .env.local file"
        );
    }

    //* env format validations

    // validate it's a valid URL
    try {
        new URL(frontendURL);
    } catch {
        throw new Error(
            `❌ NEXT_PUBLIC_FRONTEND_URL is not a valid URL: "${frontendURL}"`
        );
    }

    // validate it's a valid URL
    try {
        new URL(backendURL);
    } catch {
        throw new Error(
            `❌ NEXT_PUBLIC_BACKEND_API_URL is not a valid URL: "${backendURL}"`
        );
    }

    return {
        frontendURL,
        backendURL,
        cloudinaryName, 
        cloudinaryKey,
        mpPublicKey 
    };
};

export const config = getConfig();