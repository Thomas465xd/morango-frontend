"use client";

import { useRouter } from "next/navigation";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import {
	Calendar,
	Percent,
	Power,
	Save,
	AlertCircle,
	TrendingDown,
	X,
} from "lucide-react";
import { updateDiscount } from "@/src/api/ProductAPI";
import { DiscountForm } from "@/src/types/product";
import { formatToCLP } from "@/src/utils/price";
import { toDateTimeLocal } from "@/src/utils/date";

type SetDiscountFormProps = {
	productId: string;
    basePrice: number; 
    discountPercentage?: number; 
    status?: boolean; 
    initialDate?: string; 
    finalDate?: string;
};

export default function SetDiscountForm({ productId, basePrice, discountPercentage, status, initialDate, finalDate }: SetDiscountFormProps) {
	const router = useRouter();
	const queryClient = useQueryClient();

    const initialValues : DiscountForm = {
        percentage: discountPercentage ?? 0,
        isActive: status ?? false,
        startDate: toDateTimeLocal(initialDate),
        endDate: toDateTimeLocal(finalDate),
    }

	const {
		register,
		handleSubmit,
		watch,
		setValue,
		formState: { errors },
	} = useForm<DiscountForm>({
		defaultValues: initialValues,
	});

	const percentage = watch("percentage");
	const startDate = watch("startDate");
	const endDate = watch("endDate");

	const { mutate, isPending } = useMutation({
		mutationFn: (data: DiscountForm) =>
			updateDiscount({ productId, formData: data }),
		onError: (error) => {
			toast.error(error.message || "Error al actualizar el descuento");
		},
		onSuccess: (data) => {
			toast.success(data.message || "Descuento actualizado exitosamente");
			queryClient.invalidateQueries({ queryKey: ["products"] });
			queryClient.invalidateQueries({ queryKey: ["product", productId] });
			router.back();
		},
	});

	const onSubmit = (data: DiscountForm) => {
        const formattedData = {
            ...data,
            startDate: data.startDate
                ? new Date(data.startDate).toISOString()
                : undefined,
            endDate: data.endDate
                ? new Date(data.endDate).toISOString()
                : undefined,
        };

        mutate(formattedData);
	};

	const handlePercentageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const value = parseInt(e.target.value) || 0;
		setValue("percentage", Math.min(Math.max(value, 0), 100));
	};

	const clearDates = () => {
		setValue("startDate", undefined);
		setValue("endDate", undefined);
	};

	return (
		<div className="mt-8">
			<form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
				{/* Main Card */}
				<div className="bg-white dark:bg-zinc-800 rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 overflow-hidden">
					{/* Header */}
					<div className="bg-gradient-to-l from-zinc-950 via-zinc-900 to-zinc-950 px-6 py-4">
						<div className="flex items-center gap-3">
							<div className="p-2 bg-white/20 rounded-lg">
								<TrendingDown
									size={24}
									className="text-white"
								/>
							</div>
							<div>
								<h2 className="text-xl font-semibold text-white">
									Configuración de Descuento 
								</h2>
								<p className="text-orange-100 text-sm">
									Define el porcentaje y período de tu campaña
								</p>
							</div>
						</div>
					</div>

					{/* Content */}
					<div className="p-6 space-y-6">
						{/* Percentage Input */}
						<div>
							<label
								htmlFor="percentage"
								className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300 mb-2"
							>
								<Percent size={16} />
								Porcentaje de Descuento para <span className="highlight">{productId}</span>
							</label>
							<div className="relative">
								<input
									type="number"
									id="percentage"
									min="0"
									max="100"
									{...register("percentage", {
										valueAsNumber: true,
									})}
									onChange={handlePercentageChange}
									className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
									placeholder="Ej: 25"
								/>
								<div className="absolute right-4 top-1/2 -translate-y-1/2 text-zinc-500 dark:text-zinc-400 font-medium">
									%
								</div>
							</div>
							{errors.percentage && (
								<p className="mt-1 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
									<AlertCircle size={14} />
									{errors.percentage.message}
								</p>
							)}

							{/* Percentage Preview */}
							{percentage > 0 && (
								<div className="mt-3 p-3 bg-orange-50 dark:bg-orange-900/20 rounded-lg border border-orange-200 dark:border-orange-800">
									<p className="text-sm text-orange-800 dark:text-orange-300">
										{" "}
										<span className="font-semibold">
											De {formatToCLP(basePrice)}
										</span>{" "}
										pasaría a {" "}
										<span className="font-semibold text-orange-600 dark:text-orange-400">
											{formatToCLP(basePrice * (1 - percentage / 100))}
										</span>{" "}
										(ahorro de {" "}
										    {formatToCLP(basePrice * (percentage / 100))}
										)
									</p>
								</div>
							)}
						</div>

						{/* Active Toggle */}
						<div className="p-4 bg-zinc-50 dark:bg-zinc-700/50 rounded-lg border border-zinc-200 dark:border-zinc-600">
							<label
								htmlFor="isActive"
								className="flex items-center justify-between cursor-pointer"
							>
								<div className="flex items-center gap-3">
									<Power
										size={20}
										className={
											status
												? "text-orange-600 dark:text-orange-400"
												: "text-zinc-400"
										}
									/>
									<div>
										<span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
											Activar Descuento
										</span>
										<p className="text-xs text-zinc-500 dark:text-zinc-400">
											El descuento se aplicará
											inmediatamente
										</p>
									</div>
								</div>
								<div className="relative">
									<input
                                        type="checkbox"
                                        id="isActive"
                                        {...register("isActive")}
                                        className="sr-only peer"
									/>
									<div className="w-14 h-7 bg-zinc-300 dark:bg-zinc-600 rounded-full peer peer-checked:bg-orange-500 transition-colors"></div>
									<div className="absolute left-1 top-1 w-5 h-5 bg-white rounded-full transition-transform peer-checked:translate-x-7 shadow-md"></div>
								</div>
							</label>
							{errors.isActive && (
								<p className="mt-2 text-sm text-red-600 dark:text-red-400 flex items-center gap-1">
									<AlertCircle size={14} />
									{errors.isActive.message}
								</p>
							)}
						</div>

						{/* Date Range Section */}
						<div className="space-y-4">
							<div className="flex items-center justify-between">
								<label className="flex items-center gap-2 text-sm font-semibold text-zinc-700 dark:text-zinc-300">
									<Calendar size={16} />
									Período del Descuento (Opcional)
								</label>
								{(startDate || endDate) && (
									<button
										type="button"
										onClick={clearDates}
										className="text-xs text-red-600 dark:text-red-400 hover:text-red-700 dark:hover:text-red-300 flex items-center gap-1 transition-colors"
									>
										<X size={14} />
										Limpiar fechas
									</button>
								)}
							</div>

							<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
								{/* Start Date */}
								<div>
									<label
										htmlFor="startDate"
										className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1"
									>
										Fecha de Inicio
									</label>
									<input
										type="datetime-local"
										id="startDate"
										{...register("startDate")}
										className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
									/>
									{errors.startDate && (
										<p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
											<AlertCircle size={12} />
											{errors.startDate.message}
										</p>
									)}
								</div>

								{/* End Date */}
								<div>
									<label
										htmlFor="endDate"
										className="block text-xs font-medium text-zinc-600 dark:text-zinc-400 mb-1"
									>
										Fecha de Fin
									</label>
									<input
										type="datetime-local"
										id="endDate"
										{...register("endDate")}
										className="w-full px-4 py-3 border border-zinc-300 dark:border-zinc-600 rounded-lg bg-white dark:bg-zinc-700 text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
									/>
									{errors.endDate && (
										<p className="mt-1 text-xs text-red-600 dark:text-red-400 flex items-center gap-1">
											<AlertCircle size={12} />
											{errors.endDate.message}
										</p>
									)}
								</div>
							</div>

							<div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
								<p className="text-xs text-blue-800 dark:text-blue-300 flex items-start gap-2">
									<AlertCircle
										size={14}
										className="mt-0.5 flex-shrink-0"
									/>
									<span>
										Si no especificas fechas, el descuento
										permanecerá activo hasta que lo
										desactives manualmente.
									</span>
								</p>
							</div>
						</div>
					</div>

					{/* Footer Actions */}
					<div className="px-6 py-4 bg-zinc-50 dark:bg-zinc-700/50 border-t border-zinc-200 dark:border-zinc-700 flex items-center justify-end gap-3">
						<button
							type="button"
							onClick={() => router.push("/admin/products")}
							disabled={isPending}
							className="px-6 py-2.5 border border-zinc-300 dark:border-zinc-600 text-zinc-700 dark:text-zinc-300 rounded-lg hover:bg-zinc-100 dark:hover:bg-zinc-600 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
						>
							Cancelar
						</button>
						<button
							type="submit"
							disabled={isPending}
							className="button flex-align px-6 py-2.5 shadow-lg"
						>
							{isPending ? (
								<>
									<div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
									Guardando...
								</>
							) : (
								<>
									<Save size={18} />
									Guardar Descuento
								</>
							)}
						</button>
					</div>
				</div>

				{/* Info Cards */}
				<div className="grid grid-cols-1 md:grid-cols-2 gap-4">
					{/* Tips Card */}
					<div className="purple-toast-card">
						<h3 className="text-sm font-semibold text-purple-900 dark:text-purple-300 mb-2">
							💡 Consejos para Descuentos Efectivos
						</h3>
						<ul className="text-xs text-purple-800 dark:text-purple-400 space-y-1">
							<li>
								• Descuentos del 15-25% suelen generar más
								conversiones
							</li>
							<li>• Crea urgencia con fechas de fin cercanas</li>
							<li>• Combina con ofertas por tiempo limitado</li>
						</ul>
					</div>

					{/* Warning Card */}
					<div className="orange-toast-card">
						<h3 className="text-sm font-semibold text-amber-900 dark:text-amber-300 mb-2">
							⚠️ Importante
						</h3>
						<ul className="text-xs text-amber-800 dark:text-amber-400 space-y-1">
							<li>
								• El descuento se aplica sobre el precio base
							</li>
							<li>• Los cambios son inmediatos al activar</li>
							<li>
								• Puedes modificar el descuento en cualquier
								momento
							</li>
						</ul>
					</div>
				</div>
			</form>
		</div>
	);
}
