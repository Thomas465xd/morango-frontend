import { Facebook, Instagram, Linkedin, Mail, Home, UserCircle, Phone, MapPin, Gem } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import LogoImage from "@/public/logo-no-bg.png";

export default function Footer() {
	return (
		<footer className="bg-gradient-to-tr from-zinc-800 to-zinc-900 dark:from-zinc-900 dark:to-zinc-800 text-white py-12 transition-colors duration-200">
			<div className="max-w-screen-2xl mx-auto px-4 md:px-8">
				{/* Main Footer Content */}
				<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
					{/* Logo & About */}
					<div className="flex flex-col items-center lg:items-start">
						<div className="mb-4">
							<Image
								src={LogoImage}
								alt="Morango Joyas Logo"
								width={160}
								priority
								className="object-contain"
								placeholder="empty"
							/>
						</div>
						<p className="text-sm text-gray-300 dark:text-gray-400 mt-2 text-center lg:text-left">
							
						</p>
					</div>

					{/* Navigation Links */}
					<div className="text-center lg:text-left">
						<h3 className="text-lg font-bold mb-4 flex items-center justify-center lg:justify-start">
							<Home className="w-5 h-5 mr-2" />
							Navegación
						</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/home"
									className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition duration-200 text-sm"
								>
									Inicio
								</Link>
							</li>
							<li>
								<Link
									href="/home/about"
									className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition duration-200 text-sm"
								>
									Nosotros
								</Link>
							</li>
							<li>
								<Link
									href="/home/contact"
									className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition duration-200 text-sm"
								>
									Contacto
								</Link>
							</li>
                            <li>
								<Link
									href="/home/questions"
									className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition duration-200 text-sm"
								>
									Preguntas Frecuentes
								</Link>
							</li>
						</ul>
					</div>

					{/* Jewe Links */}
					<div className="text-center lg:text-left">
						<h3 className="text-lg font-bold mb-4 flex items-center justify-center lg:justify-start">
							<Gem className="w-5 h-5 mr-2" />
							Joyas y Accessorios
						</h3>
						<ul className="space-y-2">
							<li>
								<Link
									href="/home/products"
									className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition duration-200 text-sm"
								>
									Todas las Joyas
								</Link>
							</li>
                            <li>
								<Link
									href="/home/services"
									className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition duration-200 text-sm"
								>
									Nuestros Servicios
								</Link>
							</li>
                            <li>
								<Link
									href="/home/questions"
									className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition duration-200 text-sm"
								>
									Preguntas Frecuentes
								</Link>
							</li>
						</ul>
					</div>

					{/* Contact & Account */}
					<div className="text-center lg:text-left">
						<h3 className="text-lg font-bold mb-4 flex items-center justify-center lg:justify-start">
							<UserCircle className="w-5 h-5 mr-2" />
							Mi Cuenta
						</h3>
						<ul className="space-y-2 mb-6">
							<li>
								<Link
									href="/auth/register"
									className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition duration-200 text-sm"
								>
									Mi Perfil
								</Link>
							</li>
							<li>
								<Link
									href="/auth/register"
									className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition duration-200 text-sm"
								>
									Mis Ordenes
								</Link>
							</li>
						</ul>

						{/* Contact Info */}
						<div className="space-y-2">
							<p className="flex items-center justify-center lg:justify-start text-sm">
								<Mail className="w-4 h-4 mr-2" />
								<a
									href="mailto:contact@jup.cl"
									className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition duration-200"
								>
									javiera@morangojoyas.cl
								</a>
							</p>
							<p className="flex items-center justify-center lg:justify-start text-sm">
								<Phone className="w-4 h-4 mr-2" />
								<a
									href="tel:+56982192688"
									className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition duration-200"
								>
									+56 9 8219 2688
								</a>
							</p>
						</div>

						{/* Social Media */}
						<div className="mt-6">
							<h4 className="text-sm font-semibold mb-3 flex items-center justify-center lg:justify-start">
								Síguenos
							</h4>
							<div className="flex justify-center lg:justify-start space-x-4">
								<a
									href="https://www.facebook.com/morangojoyas.cl"
									className="text-gray-300 dark:text-gray-400 hover:text-blue-400 transition duration-200 p-2 rounded-full hover:bg-white/10"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Facebook de JUP Propiedades"
								>
									<Facebook size={18} />
								</a>
								<a
									href="https://www.instagram.com/morangojoyas.cl"
									className="text-gray-300 dark:text-gray-400 hover:text-pink-400 transition duration-200 p-2 rounded-full hover:bg-white/10"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="Instagram de JUP Propiedades"
								>
									<Instagram size={18} />
								</a>
								<a
									href="#"
									className="text-gray-300 dark:text-gray-400 hover:text-blue-500 transition duration-200 p-2 rounded-full hover:bg-white/10"
									target="_blank"
									rel="noopener noreferrer"
									aria-label="LinkedIn de Morango Joyas"
								>
									<Linkedin size={18} />
								</a>
								<a
									href="mailto:javiera@morangojoyas.cl"
									className="text-gray-300 dark:text-gray-400 hover:text-green-400 transition duration-200 p-2 rounded-full hover:bg-white/10"
									aria-label="Enviar correo a soporte"
								>
									<Mail size={18} />
								</a>
							</div>
						</div>
					</div>
				</div>

				{/* Bottom Footer */}
				<div className="border-t border-slate-600 dark:border-slate-700 pt-6">
					<div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
						<p className="text-sm text-gray-300 dark:text-gray-400 text-center md:text-left">
							Todos los derechos reservados Morango Joyas &copy;{" "}
							<span className="font-bold">
								{new Date().getFullYear()}
							</span>
						</p>
						<div className="text-center md:text-right">
							<p className="text-sm text-gray-400 dark:text-gray-500 flex items-center justify-center md:justify-end">
								<MapPin className="w-4 h-4 mr-1" />
								San Carlos de Apoquindo #2991 Las Condes, Región Metropolitana
							</p>
							<p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
								Developed by:{" "}
								<a
									href="https://thomas-dev-portfolio.vercel.app/?lang=es"
									target="_blank"
									rel="noopener noreferrer"
									className="text-gray-300 dark:text-gray-400 hover:text-white dark:hover:text-white transition duration-200 font-medium"
								>
									Iñigo Del Campo
								</a>
							</p>
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}