import { X } from "lucide-react";
import { useEffect } from "react";

type PolicyModalProps = {
    isOpen: boolean;
    title: string;
    content: React.ReactNode;
    onClose: () => void;
};

export default function PolicyModal({ isOpen, title, content, onClose }: PolicyModalProps) {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => {
            document.body.style.overflow = "unset";
        };
    }, [isOpen]);

    return (
        <>
            {/* Backdrop - closes modal when clicked */}
            <div
                className={`
                    ${isOpen ? 
                        "fixed inset-0 bg-black/40 dark:bg-black/60 z-40 transition-opacity duration-300 p-8" :
                        "fixed opacity-0"
                    }
                `}
                onClick={onClose}
                role="button"
                tabIndex={0}
                aria-label="Cerrar modal"
            >
                {/* Modal */}
                <div className="flex-center">
                    <div
                        className="
                            bg-white dark:bg-zinc-800 
                            rounded-xl shadow-xl max-w-2xl w-full max-h-[90vh] 
                            overflow-y-auto 
                            animate-in fade-in zoom-in-95 duration-300
                            border border-zinc-700
                        "
                        onClick={(e) => e.stopPropagation()}
                    >
                        {/* Header */}
                        <div className="
                                sticky top-0 
                                bg-gradient-to-r from-zinc-900 to-zinc-800 dark:from-zinc-900 dark:to-zinc-950 
                                p-6 flex items-center justify-between border-b border-zinc-700 dark:border-zinc-700
                            "
                        >
                            <h2 className="text-xl font-bold text-white">{title}</h2>
                            <button
                                onClick={onClose}
                                className="p-2 hover:bg-zinc-700 dark:hover:bg-zinc-700 rounded-lg transition-colors duration-200"
                                aria-label="Cerrar modal"
                            >
                                <X size={20} className="text-white" />
                            </button>
                        </div>

                        {/* Content */}
                        <div className="p-6 text-zinc-700 dark:text-zinc-300 space-y-4 text-sm leading-relaxed">
                            {content}
                        </div>

                        {/* Footer */}
                        <div className="sticky bottom-0 bg-zinc-50 dark:bg-zinc-700/50 p-4 border-t border-zinc-200 dark:border-zinc-700 flex justify-end gap-3">
                            <button
                                onClick={onClose}
                                className="button duration-100"
                            >
                                Entendido
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
