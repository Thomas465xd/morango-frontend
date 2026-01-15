import { EnrichedProduct } from "../types";

type DiscountState =
	| "active"
	| "future"
	| "inactive"
	| "expired"
	| "none";

export const getDiscountState = (product: EnrichedProduct): DiscountState => {
	const discount = product.discount;

	if (!discount || discount.percentage <= 0) return "none";

	const now = new Date();
	const start = discount.startDate ? new Date(discount.startDate) : null;
	const end = discount.endDate ? new Date(discount.endDate) : null;

	if (!discount.isActive) return "inactive";
	if (start && start > now) return "future";
	if (end && end < now) return "expired";

	return "active";
};

export const finalPriceColorMap: Record<DiscountState, string> = {
	active: "text-green-600",
	future: "text-yellow-600",
	inactive: "text-orange-500",
	expired: "text-red-600",
	none: "text-zinc-800 dark:text-zinc-200",
};
