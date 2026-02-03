import { updateOrderCheckoutInfo } from "@/src/api/OrderAPI";
import { PublicOrder, regions, shippingOptions, UpdateOrderCheckoutForm } from "@/src/types";
import { formatToCLP } from "@/src/utils/price";
import { useMutation } from "@tanstack/react-query";
import { AlarmClock, AlertCircle, Check, CheckCircle2, Gift, Lock, Store, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import ErrorMessage from "../ui/ErrorMessage";
import { sanitize } from "@/src/utils/form";
import { createPreference } from "@/src/api/PaymentAPI";
import CheckoutSummary from "./CheckoutSummary";
import CheckoutPayment from "./CheckoutPayment";
import { useTimer } from "@/src/hooks/useTimer";
import PolicyModal from "./PolicyModal";
import { privacyPolicyContent, refundPolicyContent, shippingPolicyContent, termsOfServiceContent } from "./Policies";

type CheckoutFormProps = {
    order: PublicOrder;
};

type DeliveryType = 'delivery' | 'pickup';

export default function CheckoutForm({ order }: CheckoutFormProps) {
    const [detailsConfirmed, setDetailsConfirmed] = useState(false);
    const [preferenceId, setPreferenceId] = useState<string | null>(null);
    const [paymentId, setPaymentId] = useState<string | null>(null);
    const [initPoint, setInitPointId] = useState<string | null>(null);

    const [deliveryType, setDeliveryType] = useState<DeliveryType>('delivery'); 

    //^ Policy Modals State
    const [openPolicy, setOpenPolicy] = useState<'refund' | 'terms' | 'privacy' | 'shipping' | null>(null);

    //^ Order expiration UX logic
    const expiresAt = order?.stockReservationExpiresAt
        ? new Date(order.stockReservationExpiresAt).getTime()
        : undefined;
        
    const DANGER_MS  = 120_000   // 2 minutes
    const WARNING_MS = 600_000   // 10 minutes

    const { timeRemaining, isExpired, remainingMs } = useTimer(expiresAt);

    const initialValues : UpdateOrderCheckoutForm = {
        customer: {
            email: "", 
            name: "", 
            surname: "", 
            phone: undefined, 
            isGuest: true
        }, 
        shippingAddress: {
            country: "Chile", 
            region: "Metropolitana de Santiago", 
            city: "", 
            cityArea: "", 
            street: "", 
            reference: undefined, 
            zipCode: undefined
        }, 
        shipping: 0, 
        shippingMethod: shippingOptions[0].name, 
        saveData: false // TODO: Add save data button
    }

    const {
        register,
        handleSubmit,
        watch,
        setValue,
        formState: { errors },
    } = useForm<UpdateOrderCheckoutForm>({
        mode: "onChange",
        defaultValues: initialValues,
    });

    const selectedShipping = watch("shippingMethod");
    const selectedShippingOption = shippingOptions.find(opt => opt.id === selectedShipping);

    // Calculate totals
    const subtotal = order.totals.subtotal;
    const baseShippingCost = deliveryType === 'pickup' ? 0 : (selectedShippingOption?.price || 0);
    const isFreeShipping = subtotal >= 90000;
    const shippingCost = isFreeShipping && deliveryType === 'delivery' ? 0 : baseShippingCost;
    const total = subtotal + shippingCost;
    const savingsAmount = subtotal >= 90000 ? baseShippingCost : 0;
    const amountToFreeShipping = Math.max(0, 90000 - subtotal);

    useEffect(() => {
        setValue('shipping', shippingCost);
    }, [shippingCost, setValue]);

    useEffect(() => {
    if (deliveryType !== "delivery") {
        setValue("shippingMethod", "Retiro Domicilio", {
            shouldValidate: true,
            shouldDirty: true,
        });
    }
    }, [deliveryType, setValue]);

    //* Update order mutation
    const { mutate: setCheckoutInfo } = useMutation({
        mutationFn: updateOrderCheckoutInfo,
        onError: (error) => {
            toast.error(error.message || "Error al guardar información");
        },
        onSuccess: (data) => {
            setDetailsConfirmed(true);
            toast.success("Información guardada correctamente");

            //^ Call Create Payment Preference Mutation
            createPreferenceMutation(data.order.id)
        },
    });

    //^ Create Payment Preference Mutation
    const { mutate: createPreferenceMutation } = useMutation({
        mutationFn: createPreference,
        onError: (error) => {
            toast.error(error.message || "Error al Crear Preferencia de Pago.");
        },
        onSuccess: (data) => {
            // console.log(data.preferenceId, data.sandboxInitPoint, data.initPoint)

            setPreferenceId(data.preferenceId);
            setInitPointId(data.initPoint); 
            setPaymentId(data.paymentId); 
            toast.info(data.message || "Preferencia de pago registrada, pago habilitado.")
        },
    })

    // TODO: Add create guest user mutation if saveData is set as true

    const onSubmit = handleSubmit((formData) => {
        // console.log(formData)
        const sanitizedData = sanitize(formData); 

        //* Update Checkout Info Mutation 
        setCheckoutInfo({ orderId: order.id, formData: sanitizedData });
    });

    // console.log(DANGER_MS, WARNING_MS, remainingMs, isExpired)

    return (
        <main className="mx-auto max-w-7xl px-4 pt-16 pb-24 sm:px-6 lg:px-8">
            <h1 className="text-3xl font-bold tracking-widest text-zinc-900 dark:text-orange-100 mb-8">
                FINALIZAR COMPRA
            </h1>

            <div className="lg:grid lg:grid-cols-12 lg:gap-x-12 xl:gap-x-16">
                {/* Left Column - Form */}
                <div className="lg:col-span-7">
                    <form onSubmit={onSubmit} className="space-y-8">
                        {/* Contact Section */}
                        <section>
                            <div className="flex items-center justify-between mb-4">
                                <h2 className="text-lg font-semibold text-zinc-900 dark:text-orange-100">
                                    Contacto
                                </h2>
                                <a href="/auth/login" className="text-sm text-orange-400 dark:text-orange-300 hover:underline">
                                    Iniciar sesión
                                </a>
                            </div>

                            <div className="space-y-2">
                                <input
                                    {...register("customer.email", {
                                        required: "El correo electrónico es requerido",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Correo electrónico inválido"
                                        }
                                    })}
                                    type="email"
                                    placeholder="Correo electrónico"
                                    className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-200"
                                />
                                {errors.customer?.email && (
                                    <ErrorMessage variant="inline">
                                        {errors.customer.email.message}
                                    </ErrorMessage>
                                )}
                            </div>

                            <label className="flex items-center gap-2 mt-3 cursor-pointer">
                                <input
                                    {...register("saveData")}
                                    type="checkbox"
                                    className="w-4 h-4 text-orange-500 border-zinc-300 dark:border-zinc-600 rounded focus:ring-orange-300"
                                />
                                <span className="text-sm text-zinc-700 dark:text-zinc-300">
                                    Enviarme novedades y ofertas por correo electrónico
                                </span>
                            </label>
                        </section>

                        {/* Delivery Type Tabs */}
                        <section>
                            <h2 className="text-lg font-semibold text-zinc-900 dark:text-orange-100 mb-4">
                                Método de entrega
                            </h2>
                            
                            <div className="grid grid-cols-2 gap-3 mb-6">
                                <button
                                    type="button"
                                    onClick={() => setDeliveryType('delivery')}
                                    className={`flex items-center justify-center gap-3 p-4 border-2 rounded-lg transition-all ${
                                        deliveryType === 'delivery'
                                            ? 'border-orange-300 dark:border-orange-300 bg-orange-50 dark:bg-orange-900/10'
                                            : 'border-zinc-300 dark:border-zinc-600 hover:border-zinc-400 dark:hover:border-zinc-500'
                                    }`}
                                >
                                    <Truck size={20} className={deliveryType === 'delivery' ? 'text-orange-300 dark:text-orange-300' : 'text-zinc-500 dark:text-zinc-400'} />
                                    <span className={`font-medium ${deliveryType === 'delivery' ? 'text-zinc-900 dark:text-orange-100' : 'text-zinc-600 dark:text-zinc-400'}`}>
                                        Envío a domicilio
                                    </span>
                                </button>
                                
                                <button
                                    type="button"
                                    onClick={() => setDeliveryType('pickup')}
                                    className={`flex items-center justify-center gap-3 p-4 border-2 rounded-lg transition-all ${
                                        deliveryType === 'pickup'
                                            ? 'border-orange-300 dark:border-orange-300 bg-orange-50 dark:bg-orange-900/10'
                                            : 'border-zinc-300 dark:border-zinc-600 hover:border-zinc-400 dark:hover:border-zinc-500'
                                    }`}
                                >
                                    <Store size={20} className={deliveryType === 'pickup' ? 'text-orange-300 dark:text-orange-200' : 'text-zinc-500 dark:text-zinc-400'} />
                                    <span className={`font-medium ${deliveryType === 'pickup' ? 'text-zinc-900 dark:text-orange-100' : 'text-zinc-600 dark:text-zinc-400'}`}>
                                        Retiro en Domicilio
                                    </span>
                                </button>
                            </div>

                            {deliveryType === 'pickup' && (
                                <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg">
                                    <div className="flex items-start gap-3">
                                        <Gift size={20} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                        <div className="space-y-2">
                                            <p className="text-sm font-medium text-green-800 dark:text-green-300">
                                                ¡Envío gratis al retirar en domicilio Las Condes!
                                            </p>
                                            <p className="text-xs text-green-700 dark:text-green-400 mt-1">
                                                Dirección: La dirección de retiro se enviará a tu correo. 
                                            </p>
                                            <p className="text-xs text-green-700 dark:text-green-400">
                                                Horarios: Normalmente está listo en 3 a 5 días.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            )}
                        </section>

                        {/* Delivery or Pickup Information */}
                        <section>
                            <h2 className="text-lg font-semibold text-zinc-900 dark:text-orange-100 mb-4">
                                {deliveryType === "delivery" ? "Información de entrega" : "Dirección de facturación"}
                            </h2>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="space-y-2">
                                    <input
                                        {...register("customer.name", {
                                            required: "El nombre es requerido",
                                            minLength: { value: 2, message: "Mínimo 2 caracteres" }
                                        })}
                                        placeholder="Nombre"
                                        className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-200"
                                    />
                                    {errors.customer?.name && (
                                        <ErrorMessage variant="inline">
                                            {errors.customer.name.message}
                                        </ErrorMessage>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <input
                                        {...register("customer.surname", {
                                            required: "El apellido es requerido",
                                            minLength: { value: 2, message: "Mínimo 2 caracteres" }
                                        })}
                                        placeholder="Apellidos"
                                        className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-200"
                                    />
                                    {errors.customer?.surname && (
                                        <ErrorMessage variant="inline">
                                            {errors.customer.surname.message}
                                        </ErrorMessage>
                                    )}
                                </div>
                            </div>

                            <div className="grid grid-cols-2 gap-4 mb-4">
                                <div className="space-y-2">
                                    <input
                                        {...register("shippingAddress.city", {
                                            required: "La ciudad es requerida"
                                        })}
                                        placeholder="Ciudad"
                                        className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-200"
                                    />
                                    {errors.shippingAddress?.city && (
                                        <ErrorMessage variant="inline">
                                            {errors.shippingAddress.city.message}
                                        </ErrorMessage>
                                    )}
                                </div>
                                <div className="space-y-2">
                                    <input
                                        {...register("shippingAddress.cityArea", {
                                            required: "La comuna no puede ir vacía",
                                            minLength: { value: 2, message: "Mínimo 2 caracteres" }
                                        })}
                                        placeholder="Comuna"
                                        className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-200"
                                    />
                                    {errors.shippingAddress?.cityArea && (
                                        <ErrorMessage variant="inline">
                                            {errors.shippingAddress.cityArea.message}
                                        </ErrorMessage>
                                    )}
                                </div>
                            </div>

                            <div className="space-y-4">
                                <div className="space-y-2">
                                    <input
                                        {...register("shippingAddress.street", {
                                            required: "La dirección es requerida"
                                        })}
                                        placeholder="Dirección"
                                        className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-200"
                                    />
                                    {errors.shippingAddress?.street && (
                                        <ErrorMessage variant="inline">
                                            {errors.shippingAddress.street.message}
                                        </ErrorMessage>
                                    )}
                                </div>

                                <div className="space-y-2">
                                    <input
                                        {...register("shippingAddress.reference", {
                                            required: false,
                                        })}
                                        type="text"
                                        placeholder="Referencia, Ej. Casa, apartamento, etc. (opcional)"
                                        className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-200"
                                    />
                                    {errors.shippingAddress?.reference && (
                                        <ErrorMessage variant="inline">
                                            {errors.shippingAddress.reference.message}
                                        </ErrorMessage>
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <input
                                            {...register("shippingAddress.zipCode", {
                                                minLength: {
                                                    value: 7, 
                                                    message: "El código postal debe tener al menos 7 caractéres"
                                                }
                                            })}
                                            placeholder="Código postal (opcional)"
                                            className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-200"
                                        />
                                        {errors.shippingAddress?.zipCode && (
                                            <ErrorMessage variant="inline">
                                                {errors.shippingAddress.zipCode.message}
                                            </ErrorMessage>
                                        )}
                                    </div>
                                    <div className="space-y-2">
                                        <input
                                            {...register("customer.phone", {
                                                required: false,
                                                pattern: {
                                                    value: /^(\+56\s?9\d{8}|9\d{8})$/,
                                                    message: "Formato de teléfono inválido."
                                                }
                                            })}
                                            type="tel"
                                            placeholder="Teléfono (opcional)"
                                            className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-300 dark:focus:ring-orange-200"
                                        />
                                        {errors.customer?.phone && (
                                            <ErrorMessage variant="inline">
                                                {errors.customer.phone.message}
                                            </ErrorMessage>
                                        )}
                                    </div>
                                </div>

                                {/** Select Region input */}
                                <div className="relative space-y-2">
                                    <select
                                        {...register("shippingAddress.region", {
                                            required: "La región no puede ir vacía",
                                        })}
                                        className="
                                            peer w-full appearance-none
                                            px-4 pt-6 pb-2
                                            border border-zinc-300 dark:border-zinc-600
                                            rounded-lg
                                            bg-white dark:bg-zinc-800
                                            text-zinc-900 dark:text-zinc-100
                                            focus:outline-none focus:ring-2 focus:ring-orange-300
                                        "
                                    >
                                        {regions.map(region => {
                                            return (
                                                <option 
                                                    value={region}
                                                    key={region}
                                                >
                                                    {region}
                                                </option>
                                            )
                                        })}
                                    </select>

                                    <label
                                        className="
                                            pointer-events-none absolute left-4 top-2
                                            text-xs text-zinc-500
                                            transition-all
                                            peer-placeholder-shown:top-4
                                            peer-placeholder-shown:text-sm
                                            peer-placeholder-shown:text-zinc-400
                                            peer-focus:top-2
                                            peer-focus:text-xs
                                            peer-focus:text-orange-300
                                        "
                                    >
                                        Región
                                    </label>

                                    {errors.shippingAddress?.region && (
                                        <ErrorMessage variant="inline">
                                            {errors.shippingAddress.region.message}
                                        </ErrorMessage>
                                    )}
                                </div>
                            </div>
                        </section>

                        {/* Shipping Methods */}
                        <section>
                            {isFreeShipping && (
                                <div className="mb-4 p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-3">
                                    <Gift size={20} className="text-green-600 dark:text-green-400" />
                                    <p className="text-sm font-medium text-green-800 dark:text-green-300">
                                        ¡Felicitaciones! Tu pedido califica para envío gratis
                                    </p>
                                </div>
                            )}

                            {deliveryType === "delivery" && (
                                <div className="space-y-3">
                                    <h2 className="text-lg font-semibold text-zinc-900 dark:text-orange-100 mb-4">
                                        Métodos de envío
                                    </h2>
                                    {shippingOptions.map((option) => (
                                        <label
                                            key={option.id}
                                            className={`flex items-start gap-4 p-4 border rounded-lg cursor-pointer transition-all ${
                                                selectedShipping === option.id
                                                    ? "border-orange-400 dark:border-orange-300 bg-orange-50 dark:bg-orange-900/10"
                                                    : "border-zinc-300 dark:border-zinc-600 hover:border-zinc-400 dark:hover:border-zinc-500"
                                            }`}
                                        >
                                            <input
                                                {...register("shippingMethod", {
                                                    required: "Selecciona un método de envío"
                                                })}
                                                type="radio"
                                                value={option.id}
                                                className="mt-1 w-4 h-4 text-orange-500 focus:ring-orange-300"
                                            />
                                            <div className="flex-1">
                                                <div className="flex items-center justify-between">
                                                    <span className="font-medium text-zinc-900 dark:text-zinc-100">
                                                        {option.name}
                                                    </span>
                                                    <span className={`font-semibold ${isFreeShipping ? 'line-through text-zinc-400 dark:text-zinc-500' : 'text-zinc-900 dark:text-orange-200'}`}>
                                                        {formatToCLP(option.price)}
                                                    </span>
                                                </div>
                                                {option.zones && (
                                                    <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                                                        {option.zones}
                                                    </p>
                                                )}
                                                <p className="mt-1 text-xs text-zinc-500 dark:text-zinc-400">
                                                    Entrega estimada: {option.estimatedDays}
                                                </p>
                                            </div>
                                        </label>
                                    ))}
                                    {errors.shippingMethod && (
                                        <ErrorMessage variant="inline">
                                            {errors.shippingMethod.message}
                                        </ErrorMessage>
                                    )}
                                </div>
                            )}
                        </section>

                        {/* Confirm Details Button */}
                        {!detailsConfirmed && (
                            <button
                                type="submit"
                                disabled={isExpired}
                                className="button flex-center gap-2 w-full h-[56px] uppercase tracking-widest disabled:hover:border-zinc-200 disabled:hover:text-zinc-100"
                            >
                                <Check size={20} />
                                Confirmar Datos
                            </button>
                        )}

                        {detailsConfirmed && (
                            <div className="p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-center gap-3">
                                <Check size={20} className="text-green-600 dark:text-green-400" />
                                <span className="text-sm text-green-800 dark:text-green-300">
                                    Datos confirmados. Puedes proceder al pago.
                                </span>
                            </div>
                        )}

                        {/* Payment */}
                        {preferenceId && paymentId && initPoint && !isExpired && (
                            <CheckoutPayment 
                                orderId={order.id}
                                preferenceId={preferenceId}
                                paymentId={paymentId}
                                initPoint={initPoint}
                                amount={total}
                            />
                        )}
                    </form>
                </div>

                {/* Right Column - Order Summary | Extract to a separate component*/}
                <div className="lg:col-span-5 mt-10 lg:mt-0">
                    <div className="sticky top-24 space-y-6">
                        {/* Products summary & free shipping progress */}
                        <CheckoutSummary
                            isFreeShipping={isFreeShipping}
                            deliveryType={deliveryType}
                            amountToFreeShipping={amountToFreeShipping}
                            subtotal={subtotal}
                            total={total}
                            items={order.items}
                            shippingCost={shippingCost}
                            savingsAmount={savingsAmount}
                        />

                        {/* Payment Section */}
                        <div className="bg-zinc-50 dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-lg p-6">
                            <h2 className="text-lg font-semibold text-zinc-900 dark:text-orange-100 mb-4 flex items-center gap-2">
                                <Lock size={18} />
                                Pago
                            </h2>

                            <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                                Todas las transacciones son seguras y están encriptadas por Mercado Pago.
                            </p>

                            {!detailsConfirmed || !preferenceId ? (
                                <div className="my-3 p-3 bg-amber-50 dark:bg-amber-900/20 border border-amber-200 dark:border-amber-800 rounded-lg flex items-start gap-2">
                                    <AlertCircle size={16} className="text-amber-600 dark:text-amber-400 mt-0.5 flex-shrink-0" />
                                    <p className="text-xs text-amber-800 dark:text-amber-300">
                                        Confirma tus datos antes de proceder al pago
                                    </p>
                                </div>
                            ) : (
                                <div className="my-3 p-3 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg flex items-start gap-2">
                                    <CheckCircle2 size={16} className="text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                                    <p className="text-xs text-green-800 dark:text-green-300">
                                        Selecciona un medio de pago y completa los datos para finalizar tu compra.
                                    </p>
                                </div>
                            )}

                            <div className="space-y-4">
                                <h2 className="text-lg font-semibold text-zinc-900 dark:text-orange-100 mb-4 flex items-center gap-2">
                                    <AlarmClock size={16} />
                                    Expiración
                                </h2>

                                <p className="text-sm text-zinc-600 dark:text-zinc-400 mb-4">
                                    Tienes 20 minutos para pagar por tu orden antes de que expire.
                                </p>

                                <p className={`
                                        "text-sm font-medium",
                                        ${remainingMs !== null && DANGER_MS <= remainingMs && remainingMs <= WARNING_MS && "text-yellow-500"}
                                        ${remainingMs !== null && remainingMs <= DANGER_MS && "text-red-500"}
                                        ${isExpired && "text-red-600 dark:text-red-500 font-semibold"}
                                    `}
                                >
                                    <span className="text-white">Tiempo Restante: {" "}</span>
                                    {timeRemaining === "Expired" ? "Orden Expirada" : timeRemaining}
                                </p>

                                {isExpired && (
                                    <button
                                        onClick={() => window.location.reload()}
                                        className="button"
                                    >
                                        Recargar la Página
                                    </button>
                                )}
                            </div>

                            {/* Additional Trust Elements */}
                            <div className="mt-4 pt-4 border-t border-zinc-200 dark:border-zinc-700 space-y-2">
                                <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                                    <Check size={14} className="text-green-600 dark:text-green-400" />
                                    <span>Procesamiento seguro con Mercado Pago</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                                    <Check size={14} className="text-green-600 dark:text-green-400" />
                                    <span>Devoluciones fáciles dentro de 30 días</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-zinc-600 dark:text-zinc-400">
                                    <Check size={14} className="text-green-600 dark:text-green-400" />
                                    <span>Garantía de satisfacción del 100%</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Policies Section */}
            <div className="mt-16 border-t border-zinc-200 dark:border-zinc-700 pt-8">
                <div className="max-w-7xl mx-auto">
                    <h2 className="text-sm font-semibold text-zinc-900 dark:text-orange-100 mb-4">
                        POLÍTICAS Y CONDICIONES
                    </h2>
                    
                    <div className="flex flex-wrap gap-3 justify-center sm:justify-start">
                        <button
                            onClick={() => setOpenPolicy('refund')}
                            className="text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 underline transition-colors duration-200 hover:no-underline"
                        >
                            Política de Reembolso
                        </button>
                        
                        <span className="text-zinc-300 dark:text-zinc-600">•</span>
                        
                        <button
                            onClick={() => setOpenPolicy('shipping')}
                            className="text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 underline transition-colors duration-200 hover:no-underline"
                        >
                            Política de Envío
                        </button>
                        
                        <span className="text-zinc-300 dark:text-zinc-600">•</span>
                        
                        <button
                            onClick={() => setOpenPolicy('privacy')}
                            className="text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 underline transition-colors duration-200 hover:no-underline"
                        >
                            Política de Privacidad
                        </button>
                        
                        <span className="text-zinc-300 dark:text-zinc-600">•</span>
                        
                        <button
                            onClick={() => setOpenPolicy('terms')}
                            className="text-sm text-orange-600 dark:text-orange-400 hover:text-orange-700 dark:hover:text-orange-300 underline transition-colors duration-200 hover:no-underline"
                        >
                            Términos del Servicio
                        </button>
                    </div>
                </div>
            </div>

            {/* Policy Modals */}
            <PolicyModal
                isOpen={openPolicy === 'refund'}
                title="Política de Reembolso"
                content={refundPolicyContent}
                onClose={() => setOpenPolicy(null)}
            />

            <PolicyModal
                isOpen={openPolicy === 'terms'}
                title="Términos del Servicio"
                content={termsOfServiceContent}
                onClose={() => setOpenPolicy(null)}
            />

            <PolicyModal
                isOpen={openPolicy === 'privacy'}
                title="Política de Privacidad"
                content={privacyPolicyContent}
                onClose={() => setOpenPolicy(null)}
            />

            <PolicyModal
                isOpen={openPolicy === 'shipping'}
                title="Política de Envío"
                content={shippingPolicyContent}
                onClose={() => setOpenPolicy(null)}
            />
        </main>
    );
}