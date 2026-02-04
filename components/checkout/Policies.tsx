import React from 'react';

export const refundPolicyContent : React.ReactNode = (
    <div className="space-y-4">
        <section>
            <h3 className="font-semibold text-zinc-900 dark:text-orange-100 mb-2">Política de Reembolso y Cambios</h3>
            <p>
                Puedes solicitar un cambio dentro de los <strong>10 días hábiles</strong> posteriores a la compra.
            </p>
        </section>

        <section>
            <h3 className="font-semibold text-zinc-900 dark:text-orange-100 mb-2">Condiciones para Cambios</h3>
            <ul className="list-disc list-inside space-y-2">
                <li>La joya debe estar <strong>sin uso</strong></li>
                <li>Debe estar en <strong>perfectas condiciones</strong></li>
                <li>Debe incluir el <strong>empaque original</strong></li>
                <li>Se aplican estas medidas por razones de higiene y cuidado</li>
            </ul>
        </section>

        <section>
            <h3 className="font-semibold text-zinc-900 dark:text-orange-100 mb-2">Defectos y Daños en el Envío</h3>
            <p>
                Si tu joya llegó con un defecto de fábrica o se dañó durante el envío, escríbenos por Instagram a{" "}
                <strong>@morangojoyas.cl</strong> y gestionaremos un cambio <strong>completamente gratuito</strong>.
            </p>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-2">
                Por favor incluye fotos del producto y su empaque en tu mensaje.
            </p>
        </section>

        <section>
            <h3 className="font-semibold text-zinc-900 dark:text-orange-100 mb-2">Proceso de Cambio</h3>
            <ol className="list-decimal list-inside space-y-2">
                <li>Contacta a @morangojoyas.cl con detalles y fotos</li>
                <li>Nuestro equipo validará tu solicitud (respuesta en 24-48 horas)</li>
                <li>Se coordinará el envío del cambio sin costo adicional</li>
            </ol>
        </section>

        <div className="p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg mt-4">
            <p className="text-xs text-blue-800 dark:text-blue-300">
                <strong>Nota:</strong> Morango se compromete con la satisfacción total de nuestros clientes. Si no estás
                satisfecho con tu compra, contáctanos sin dudarlo.
            </p>
        </div>
    </div>
);

export const termsOfServiceContent = (
    <div className="space-y-4">
        <section>
            <h3 className="font-semibold text-zinc-900 dark:text-orange-100 mb-2">Información General</h3>
            <p>
                Este sitio web está a cargo de <strong>Morango E-commerce</strong>. Al visitar nuestro sitio o comprar
                nuestras joyas, usted acepta estar sujeto a todos los términos y condiciones aquí establecidos.
            </p>
        </section>

        <section>
            <h3 className="font-semibold text-zinc-900 dark:text-orange-100 mb-2">Aceptación de Términos</h3>
            <p>
                Por el hecho de acceder a nuestro sitio web, usted acepta de manera incondicional estar vinculado por
                estos Términos de Servicio. Si no está de acuerdo con alguno de estos términos, le pedimos que no
                continúe utilizando nuestro sitio.
            </p>
        </section>

        <section>
            <h3 className="font-semibold text-zinc-900 dark:text-orange-100 mb-2">Requisitos de Uso</h3>
            <ul className="list-disc list-inside space-y-2">
                <li>Debes ser mayor de edad en tu jurisdicción</li>
                <li>No puedes utilizar nuestro sitio para fines ilícitos</li>
                <li>Está prohibido transmitir virus o código malicioso</li>
                <li>No se permite reproducir, copiar o vender contenido sin autorización</li>
            </ul>
        </section>

        <section>
            <h3 className="font-semibold text-zinc-900 dark:text-orange-100 mb-2">Limitación de Responsabilidad</h3>
            <p>
                Morango no será responsable por daños directos, indirectos, incidentales o consecuentes derivados del
                uso de nuestro sitio o productos. Los productos se proporcionan tal como &quot;están`&quot; según disponibilidad.
            </p>
        </section>

        <section>
            <h3 className="font-semibold text-zinc-900 dark:text-orange-100 mb-2">Modificaciones</h3>
            <p>
                Nos reservamos el derecho a modificar estos términos en cualquier momento. El uso continuado del sitio
                implica aceptación de los cambios.
            </p>
        </section>

        <section>
            <h3 className="font-semibold text-zinc-900 dark:text-orange-100 mb-2">Ley Aplicable</h3>
            <p>
                Estos Términos de Servicio se rigen por las leyes de la República de Chile. Para consultas, contáctanos
                a <strong>contacto@morangojoyas.cl</strong>
            </p>
        </section>
    </div>
);

export const privacyPolicyContent = (
    <div className="space-y-4">
        <section>
            <h3 className="font-semibold text-zinc-900 dark:text-orange-100 mb-2">Protección de Datos Personales</h3>
            <p>
                Morango adopta medidas necesarias para resguardar la seguridad de tus datos personales mediante sistemas
                de encriptación y certificados de seguridad de última generación.
            </p>
        </section>

        <section>
            <h3 className="font-semibold text-zinc-900 dark:text-orange-100 mb-2">Recopilación de Información</h3>
            <p>
                Los datos personales que proporcionas serán utilizados <strong>únicamente</strong> para:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Procesar y confirmar tu compra</li>
                <li>Coordinar el envío de tu pedido</li>
                <li>Comunicarnos contigo sobre tu orden</li>
                <li>Responder tus consultas y consultas de servicio</li>
                <li>Informarte sobre ofertas y promociones (con tu consentimiento)</li>
            </ul>
        </section>

        <section>
            <h3 className="font-semibold text-zinc-900 dark:text-orange-100 mb-2">No Compartimos Tus Datos</h3>
            <p>
                Tus datos personales <strong>no serán compartidos</strong> con terceros sin tu consentimiento expreso,
                excepto cuando sea necesario para procesar tu pedido (courier de envío).
            </p>
        </section>

        <section>
            <h3 className="font-semibold text-zinc-900 dark:text-orange-100 mb-2">Seguridad en Transacciones</h3>
            <p>
                Todas las transacciones se realizan a través de <strong>Mercado Pago</strong>, que encripta tu
                información de pago. Morango nunca tiene acceso a tus datos de tarjeta.
            </p>
        </section>

        <section>
            <h3 className="font-semibold text-zinc-900 dark:text-orange-100 mb-2">Verificación de Identidad</h3>
            <p>
                En caso de detectar cambios en tus datos registrados o irregularidades, nuestro equipo puede contactarte
                por teléfono o correo para corroborar tu identidad y evitar fraudes.
            </p>
        </section>

        <section>
            <h3 className="font-semibold text-zinc-900 dark:text-orange-100 mb-2">Tus Derechos</h3>
            <p>
                De conformidad con la Ley 19.628, tienes derecho a:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Acceder a tus datos personales</li>
                <li>Rectificar información incorrecta</li>
                <li>Solicitar la cancelación de tus datos</li>
                <li>Bloquear el tratamiento de tus datos</li>
            </ul>
            <p className="mt-2">
                Responderemos cualquier solicitud en un plazo máximo de <strong>5 días corridos</strong>.
            </p>
        </section>

        <section>
            <h3 className="font-semibold text-zinc-900 dark:text-orange-100 mb-2">Contacto</h3>
            <p>
                Para consultas sobre privacidad, contáctanos a{" "}
                <strong className="text-orange-500 dark:text-orange-400">contacto@morangojoyas.cl</strong>
            </p>
        </section>
    </div>
);

export const shippingPolicyContent = (
    <div className="space-y-4">
        <section>
            <h3 className="font-semibold text-zinc-900 dark:text-orange-100 mb-2">Cobertura de Envío</h3>
            <p>
                <strong>¡Despachamos a todo Chile!</strong> Realizamos envíos a todas las regiones del país a través de
                nuestros couriers asociados.
            </p>
        </section>

        <section>
            <h3 className="font-semibold text-zinc-900 dark:text-orange-100 mb-2">Couriers de Envío</h3>
            <p>Utilizamos los siguientes servicios de logística:</p>
            <ul className="list-disc list-inside space-y-2 mt-2">
                <li>
                    <strong>Moova:</strong> Disponible en zonas de la Región Metropolitana (RM)
                </li>
                <li>
                    <strong>Alasxpress:</strong> Cobertura nacional incluyendo zonas remotas
                </li>
            </ul>
        </section>

        <section>
            <h3 className="font-semibold text-zinc-900 dark:text-orange-100 mb-2">Cobertura Moova (RM)</h3>
            <p className="text-sm">
                Disponible en las siguientes comunas: Pudahuel, Puente Alto, Maipú, Quilicura, Huechuraba, Vitacura,
                Lo Barnechea, Las Condes, La Reina, Peñalolén, La Florida, Conchalí, Independencia, La Granja, Macul,
                Ñuñoa, Providencia, Recoleta, San Joaquín, San Miguel, San Ramón, Santiago, Cerrillos, Cerro Navia,
                Estación Central, La Cisterna, Lo Espejo, Lo Prado, Pedro Aguirre Cerda, Quinta Normal y Renca.
            </p>
        </section>

        <section>
            <h3 className="font-semibold text-zinc-900 dark:text-orange-100 mb-2">Tiempo de Despacho</h3>
            <p>
                Una vez confirmado tu pago, tu pedido será procesado en <strong>3 a 10 días hábiles</strong>.
            </p>
            <p className="text-sm text-orange-600 dark:text-orange-400 mt-2">
                <strong>Nota especial:</strong> Las regiones de Aysén y Magallanes, debido a su distancia geográfica,
                pueden superar este tiempo de despacho.
            </p>
        </section>

        <section>
            <h3 className="font-semibold text-zinc-900 dark:text-orange-100 mb-2">Seguimiento de Pedido</h3>
            <p>
                Una vez que tu pedido es recepcionado por el courier, recibirás un correo con:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Número de orden de transporte del courier</li>
                <li>Información completa de seguimiento</li>
                <li>Datos de contacto del courier</li>
            </ul>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 mt-2">
                El número de transporte del courier es diferente al número de tu pedido en Morango.
            </p>
        </section>

        <section>
            <h3 className="font-semibold text-zinc-900 dark:text-orange-100 mb-2">Responsabilidad de Envío</h3>
            <p>
                El courier seleccionado es <strong>responsable</strong> de la distribución, cuidado y control adecuado
                del despacho. Morango coordina el envío, pero la responsabilidad de entrega recae en el courier.
            </p>
        </section>

        <section>
            <h3 className="font-semibold text-zinc-900 dark:text-orange-100 mb-2">Envío Gratis</h3>
            <p>
                Aplicamos envío <strong>gratis</strong> en los siguientes casos:
            </p>
            <ul className="list-disc list-inside space-y-2 mt-2">
                <li>Compras superiores a $90.000 (aplica a envíos a domicilio)</li>
                <li>Retiro en domicilio (Las Condes)</li>
            </ul>
        </section>

        <section>
            <h3 className="font-semibold text-zinc-900 dark:text-orange-100 mb-2">Problemas con tu Envío</h3>
            <p>
                Si tu paquete llega dañado, es extraviado o tiene algún problema, contáctanos inmediatamente a
                <strong className="text-orange-500 dark:text-orange-400 ml-1">contacto@morangojoyas.cl</strong> o a través
                de nuestro Instagram <strong>@morangojoyas.cl</strong>. Nos encargaremos de resolver el problema.
            </p>
        </section>

        <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg mt-4">
            <p className="text-xs text-green-800 dark:text-green-300">
                <strong>Garantía de Envío:</strong> Tu pedido llegará en perfecto estado. Si no es así, nos encargaremos
                de solucionarlo sin costo adicional.
            </p>
        </div>
    </div>
);
