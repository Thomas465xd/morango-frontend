import { useForm } from "react-hook-form";
import ErrorMessage from "./ErrorMessage";
import { Search, LucideIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { SearchForm } from "@/src/types";

export type SelectOption = {
    value: string;
    label: string;
    icon?: LucideIcon;
    color?: string;
};

type SearchBarProps = {
    route: string;
    param: string;
    inputType: string;
    formText: string;
    searchText: string;
    mini?: boolean; 
    options?: SelectOption[];
    defaultValue?: string;
    hideSubmit?: boolean; 
}

export default function SearchBar({
    route, 
    param, 
    inputType, 
    formText, 
    searchText,
    mini,
    options,
    defaultValue = "", 
    hideSubmit = false, 
}: SearchBarProps) {
    const initialValues = {
        search: defaultValue
    };

    const router = useRouter();

    const { register, handleSubmit, watch, formState: { errors } } = useForm<SearchForm>({
        defaultValues: initialValues
    });

    const selectedValue = watch("search");
    const selectedOption = inputType === "select" 
        ? options?.find(opt => opt.value === selectedValue)
        : null;

    const handleSearchForm = (formData: SearchForm) => {
        const searchQuery = formData.search.trim();
        
        if (!searchQuery) {
            return;
        }
        
        // Actualizar la URL con el parámetro de búsqueda
        router.push(`/${route}?page=1&${param}=${encodeURIComponent(searchQuery)}`);
    };

    return (
        <div className="">
            <form 
                onSubmit={handleSubmit(handleSearchForm)} 
                className={`
                    flex items-center gap-2 
                    bg-white dark:bg-zinc-700/50 shadow-md rounded-lg 
                    w-full ${mini ? "" : "md:min-w-xl max-w-2xl mt-6"} mx-auto p-2`}
            >
                <div className="relative flex-grow">
                    {inputType === "select" ? (
                        <div className="relative">
                            {selectedOption?.icon && (
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <selectedOption.icon 
                                        size={18} 
                                        className={selectedOption.color || "text-zinc-400"}
                                    />
                                </div>
                            )}
                            <select
                                className={`p-3 w-full border border-zinc-300 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500 transition bg-white ${
                                    selectedOption?.icon ? "pl-10" : ""
                                } ${
                                    selectedOption?.color ? `${selectedOption.color}` : "text-zinc-900"
                                }`}
                                {...register("search", {
                                    required: "Debes seleccionar una opción."
                                })}
                            >
                                <option value="" disabled>
                                    {formText}
                                </option>
                                {options?.map((option) => (
                                    <option 
                                        key={option.value} 
                                        value={option.value}
                                        className="text-zinc-900"
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ) : (
                        mini ? (
                            <>
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search size={18} className="text-zinc-400" />
                                </div>
                                
                                <input 
                                    type={inputType}
                                    placeholder={formText}
                                    className={`block w-full pl-10 pr-3 py-2 border border-zinc-200 dark:border-zinc-600 rounded-md bg-zinc-50 dark:bg-zinc-700 text-sm text-zinc-800 dark:text-zinc-200 focus:outline-none focus:ring-2 focus:ring-blue-500`}
                                    {...register("search", {
                                        required: "El campo de búsqueda es obligatorio.", 
                                        minLength: {
                                            value: 3,
                                            message: "La búsqueda debe tener mas de 3 caracteres"
                                        }
                                    })}
                                />
                            </>
                        ) : (
                            <input 
                                type={inputType}
                                placeholder={formText}
                                className={`w-full border border-zinc-300 dark:border-zinc-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-zinc-500 focus:border-zinc-500 transition`}
                                {...register("search", {
                                    required: "El campo de búsqueda es obligatorio.", 
                                    minLength: {
                                        value: 3,
                                        message: "La búsqueda debe tener mas de 3 caracteres"
                                    }
                                })}
                            />
                        )
                    )}
                </div>

                {!hideSubmit && (
                    <button 
                        type="submit" 
                        className={`py-2 min-w-40 sm:min-w-44 text-white bg-zinc-600 hover:bg-zinc-700 dark:bg-zinc-800 transition-colors rounded-lg font-semibold shadow-md flex gap-2 items-center justify-center`}
                    >
                        <Search size={18} />
                        Buscar {searchText}
                    </button>
                )}
            </form>

            <div className={`w-full ${mini ? "" : "max-w-2xl mx-auto"} mt-2`}>
                {errors.search && (
                    <ErrorMessage variant="mini">{errors.search.message}</ErrorMessage>
                )}
            </div>
        </div>
    );
}