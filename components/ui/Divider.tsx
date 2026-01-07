type DividerProps = {
    text: string
}

export default function Divider({ text } : DividerProps) {
	return (
		<div className="flex items-center px-8">
			<div
				aria-hidden="true"
				className="w-full border-t border-gray-300 dark:border-white/15"
			/>
			<div className="relative flex justify-center">
				<span className="bg-white px-2 text-sm text-stone-500 dark:bg-stone-900 dark:text-stone-400">
					{ text }
				</span>
			</div>
			<div
				aria-hidden="true"
				className="w-full border-t border-gray-300 dark:border-white/15"
			/>
		</div>
	);
}
