import Image from "next/image";
import Link from "next/link";
import LogoImage from "@/public/logo-no-bg.png"; // static import

type LogoProps = {
    mini?: boolean;
    center?: boolean; 
}

export default function Logo({ mini, center } : LogoProps) {
    return (
        <div className={`flex-shrink-0 flex ${center && "justify-center"} items-center`}>
            <Link
                href="/home"
                className="flex items-center space-x-2"
            >
                <Image
                    src={LogoImage}
                    alt="Company Logo"
                    width={mini ? 80 : 160}       // base size for large screens
                    height={mini ? 80 : 160}      // keep aspect ratio
                    priority
                    fetchPriority="high"
                    loading="eager"
                    className="object-contain h-auto w-auto"
                    placeholder="empty"
                    sizes={`${mini ? "" : "(max-width: 640px) 100px, (max-width: 1024px) 120px, 160px"}`}
                />
            </Link>
        </div>
    );
}