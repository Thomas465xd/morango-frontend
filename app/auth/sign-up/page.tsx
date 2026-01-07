import RegisterForm from "@/components/auth/RegisterForm";
import Logo from "@/components/ui/Logo";
import { House } from "lucide-react";
import Link from "next/link";

export default function page() {
    return (
        <section>
            <Logo />

            <div className="flex justify-center mb-8">
                <Link 
                    className="link flex items-center gap-2" 
                    href="/"
                >
                    <House size={16} />
                    Return to {' '}
                    <span className='font-semibold'>Home Page</span>
                </Link>
            </div>

            <RegisterForm />

            <div className="flex flex-col items-center gap-5 mt-5 mb-5">
                <Link 
                    className="link" 
                    href="/auth/sign-in"
                >
                    Already have an account? {' '}
                    <span className='font-semibold'>Sign in here</span>
                </Link>

                <Link 
                    className="link" 
                    href="/auth/forgot"
                >
                    Forgot your password? {' '}
                    <span className='font-semibold'>Reset </span>
                </Link>
            </div>
        </section>
    )
}
