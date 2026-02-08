import z from "zod";

export const searchSchema = z.object({
	search: z
		.string()
		.trim()
		.min(3, { message: "La búsqueda debe ser de almenos 3 caracteres" }),
});

export const cartItemSchema = z.object({
    productId: z.string(), 
    quantity: z.number().min(1)
})

export type SearchForm = z.infer<typeof searchSchema>
export type CartItem = z.infer<typeof cartItemSchema>
export type Cart = CartItem[]; 


//? ⛓️ UTILITY ARRAYS, OBJECTS & ENUMS ⛓️ ?//
export const regions = [
    "Arica y Parinacota",
    "Tarapacá",
    "Antofagasta",
    "Atacama",
    "Coquimbo",
    "Valparaíso",
    "Metropolitana de Santiago",
    "O'Higgins",
    "Maule",
    "Ñuble",
    "Biobío",
    "La Araucanía",
    "Los Ríos",
    "Los Lagos",
    "Aysén",
    "Magallanes"
]

export const navigation = {
    pages: [
        { name: "Joyas", href: "/home/products"},
        { name: "Nosotros", href: "/home/about" },
        { name: "Preguntas Frecuentes", href: "/home/questions" },
        { name: "Contacto", href: "/home/contact"}, 
    ],
};

export const productTypes = [
    { value: "Anillo", label: "Anillo" },
    { value: "Collar", label: "Collar" },
    { value: "Pulsera", label: "Pulsera" },
    { value: "Aros", label: "Aros" },
];

export const shippingOptions = [
    {
        id: "santiago",
        name: "Envío dentro de Santiago",
        price: 3990,
        estimatedDays: "2-3 días",
    },
    {
        id: "rm",
        name: "RM",
        price: 4990,
        estimatedDays: "3-5 días",
        zones: "Melipilla, María Pinto, Tiltil, San Pedro, Alhué, El Monte, Isla de Maipo, Pirque, San José de Maipo, Colina, Lampa, Curacaví, Buin, Talagante",
    },
    {
        id: "envio-s",
        name: "Envío S",
        price: 5990,
        estimatedDays: "3-5 días",
        zones: "Coquimbo, O'Higgins, Maule, Ñuble, Biobío, Valparaíso",
    },
    {
        id: "envio-m",
        name: "Envío M",
        price: 6990,
        estimatedDays: "4-6 días",
        zones: "Antofagasta, Atacama, Araucanía",
    },
    {
        id: "envio-l",
        name: "Envío L",
        price: 7990,
        estimatedDays: "5-7 días",
        zones: "Arica y Parinacota, Tarapacá, Los Ríos, Los Lagos, Magallanes",
    },
    {
        id: "aysen",
        name: "Aysén",
        price: 11990,
        estimatedDays: "7-10 días",
    },
];

// More will be added in the future... 
// backend accepts any category, this is to enforce that admins don't randomly create new categories like
// gold, golden, Golden, Gold, etc...
export const categories = [
    "Sale", 
    "Fiesta", 
    "Casual", 
    "Plata",
    "Oro",
    "Diamante",
    "Piedras Semipreciosas",
    "Piedras Preciosas"
];

// Questions.tsx
export const faqs = [
    // 1. Sobre los productos
    {
        category: "Sobre los productos",
        question: "¿De qué material están hechas las joyas?",
        answer: "Algunas de nuestras joyas Morango están enchapadas en oro o son de plata. Utilizamos piedras semipreciosas, además de perlas de río cuidadosamente elegidas.",
    },
    {
        category: "Sobre los productos",
        question: "¿Qué cuidados debo tener para que mis joyas duren más tiempo?",
        answer: "Evita el contacto con agua, perfumes y cremas. No las dejes en zonas húmedas. Guárdalas en joyeros para evitar dañar las piedras o que se quiebren, y ponlas en un lugar seco.",
    },
    {
        category: "Sobre los productos",
        question: "¿Hacen joyas personalizadas?",
        answer: "¡Absolutamente sí! Escríbenos por Instagram a @morangojoyas.cl o usa nuestro formulario de contacto y estaremos encantadas de conversar para crear lo que buscas.",
    },

    // 2. Sobre compras y envíos
    {
        category: "Sobre compras y envíos",
        question: "¿Cuáles son los métodos de pago disponibles?",
        answer: "En nuestra plataforma online puedes pagar con tarjetas de débito, crédito o con tu billetera Mercado Pago. Contamos con la seguridad de Mercado Pago para garantizar tus transacciones. Si prefieres comprar en persona, puedes agendar una visita con nosotros por Instagram @morangojoyas.cl.",
    },
    {
        category: "Sobre compras y envíos",
        question: "¿Realizan envíos a todo Chile? ¿Cuánto demoran?",
        answer: "Sí, realizamos envíos a todo Chile con diferentes opciones según tu ubicación:\n• Envío dentro de Santiago: 2-3 días hábiles\n• RM y alrededores: 3-5 días hábiles\n• Región de Valparaíso, O'Higgins, Maule y Biobío: 3-5 días hábiles\n• Regiones del norte y sur: 5-7 días hábiles\n\nAdemás, ofrecemos retiro gratuito en nuestro domicilio de Las Condes.",
    },
    {
        category: "Sobre compras y envíos",
        question: "¿Hacen envíos internacionales?",
        answer: "¡Sí! Nos encanta que nuestras joyas viajen por el mundo y lleguen a ese momento especial en tu vida. Si estás en otro país, escríbenos por Instagram @morangojoyas.cl o envía un email a javiera@morangojoyas.cl para coordinar el envío y ayudarte con los detalles.",
    },

    // 3. Cambios y devoluciones
    {
        category: "Cambios y devoluciones",
        question: "¿Puedo cambiar una joya si no me quedó bien?",
        answer: "Sí. Puedes solicitar el cambio dentro de los 10 días hábiles posteriores a la compra. La joya debe estar en perfectas condiciones y con su empaque original.",
    },
    {
        category: "Cambios y devoluciones",
        question: "¿Qué hago si mi joya llegó con un defecto o se dañó en el envío?",
        answer: "Escríbenos inmediatamente por Instagram @morangojoyas.cl o envía un email a contacto@morangojoyas.cl con fotos del daño. Gestionaremos un cambio gratuito si se trata de una falla de fábrica o daño en el envío.",
    },
    {
        category: "Cambios y devoluciones",
        question: "¿Cuál es la política de devoluciones?",
        answer: "Aceptamos devoluciones hasta 10 días hábiles desde la recepción del producto. La pieza debe estar sin olores ni residuos, y en su empaque original. Escríbenos a contacto@morangojoyas.cl o vía Instagram indicando número de pedido, motivo y enviando fotografías del producto. Si la devolución es por defecto de fábrica o daño en transporte, Morango asume los costos. Si es por decisión del cliente, el cliente cubre el costo de devolución. Los reembolsos se efectúan dentro de 10 días hábiles desde la aprobación.",
    },

    // 4. Sobre Morango Joyas y contacto
    {
        category: "Sobre Morango Joyas y contacto",
        question: "¿Cómo puedo contactarlas si tengo dudas?",
        answer: "¡Estamos siempre disponibles para ayudarte! Puedes contactarnos de varias formas:\n• Instagram: @morangojoyas.cl\n• Email: javiera@morangojoyas.cl o contacto@morangojoyas.cl\n• Formulario de contacto en nuestra página",
    },
    {
        category: "Sobre Morango Joyas y contacto",
        question: "¿Cómo puedo colaborar con Morango Joyas como influencer o embajadora?",
        answer: "¡Nos encantaría conocerte y trabajar juntas! Si eres influencer o te interesa ser embajadora de Morango Joyas, escríbenos por Instagram @morangojoyas.cl o envía un email a javiera@morangojoyas.cl contándonos un poco sobre ti y tus redes. Te responderemos a la brevedad.",
    },
];

// Profile route tabs 
export type Tab = {
    name: string, 
    href: string, 
    icon: string
}

export const profileTabs : Tab[] = [
    { name: "Perfil", href: "/home/profile", icon: "user" }, 
    { name: "Actualizar Contraseña", href: "/home/profile/password", icon: "settings" }, 
    { name: "Mis Ordenes", href: "/home/profile/orders", icon: "package" }, 
    { name: "Historial de Pagos", href: "/home/profile/payments", icon: "payments" }, 
]

// Header.tsx
export const headerCategories = [
    {
        name: "Anillos",
        href: "/home/products?productType=Anillo",
        imageSrc: "https://images.unsplash.com/photo-1677466890478-8fc0576e6d24?w=500&h=500&fit=crop",
    },
    {
        name: "Collares",
        href: "/home/products?productType=Collar",
        imageSrc: "https://images.unsplash.com/photo-1599643477877-530eb83abc8e?w=500&h=500&fit=crop",
    },
    {
        name: "Pulseras",
        href: "/home/products?productType=Pulsera",
        imageSrc: "https://images.unsplash.com/photo-1611591437281-460bfbe1220a?w=500&h=500&fit=crop",
    },
    {
        name: "Aros",
        href: "/home/products?productType=Aros",
        imageSrc: "https://images.unsplash.com/photo-1535632066927-ab7c9ab60908?w=500&h=500&fit=crop",
    },
    {
        name: "Colecciones",
        href: "/home/products",
        imageSrc: "https://images.unsplash.com/photo-1668365172213-39d94d40b138?w=500&h=500&fit=crop",
    },
];

export const collections = [
    {
        name: "Colección de Diamantes",
        href: "/home/products?category=Diamente",
        imageSrc: "https://images.unsplash.com/photo-1693213085235-ea6deadf8cee?w=800&h=600&fit=crop",
        imageAlt: "Hermosa colección de anillos con diamantes brillantes",
        description: "Diseños exclusivos con diamantes de la más alta calidad. Cada pieza es una obra maestra de elegancia y sofisticación.",
    },
    {
        name: "Colección de Oro",
        href: "/home/products?category=Oro",
        imageSrc: "https://images.unsplash.com/photo-1599475211349-f4c81b3216bc?w=800&h=600&fit=crop",
        imageAlt: "Joyería de oro elegante y sofisticada",
        description: "Piezas de oro puro confeccionadas a mano. Timeless elegance que trasciende las tendencias.",
    },
    {
        name: "Colección de Plata",
        href: "/home/products?category=Plata",
        imageSrc: "https://images.unsplash.com/photo-1603719461453-0ef44fa837aa?w=800&h=600&fit=crop",
        imageAlt: "Joyería de plata moderna y minimalista",
        description: "Diseños contemporáneos en plata esterlina. Perfecta para cualquier ocasión, desde casual hasta formal.",
    },
];