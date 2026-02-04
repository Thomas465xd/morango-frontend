type DividerProps = {
    text: string
}

export default function Divider({ text } : DividerProps) {
	return (
		<div className="flex items-center py-2">
			<div
				aria-hidden="true"
				className="w-full border-t border-gray-300 dark:border-white/15"
			/>
			<div className="relative flex justify-center text-xs">
				<span className="text-nowrap px-2 bg-white dark:bg-zinc-800 text-zinc-500 dark:text-zinc-400">
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
