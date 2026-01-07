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
}

export default function SearchBar({
    route, 
    param, 
    inputType, 
    formText, 
    searchText,
    mini,
    options,
    defaultValue = ""
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
                className="flex items-center gap-2 mt-6 md:min-w-xl bg-white dark:bg-stone-700/50 shadow-md rounded-lg p-2 w-full max-w-2xl mx-auto"
            >
                <div className="relative flex-grow">
                    {inputType === "select" ? (
                        <div className="relative">
                            {selectedOption?.icon && (
                                <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none">
                                    <selectedOption.icon 
                                        size={18} 
                                        className={selectedOption.color || "text-stone-400"}
                                    />
                                </div>
                            )}
                            <select
                                className={`p-3 w-full border border-stone-300 dark:border-stone-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-stone-500 transition bg-white ${
                                    selectedOption?.icon ? "pl-10" : ""
                                } ${
                                    selectedOption?.color ? `${selectedOption.color}` : "text-stone-900"
                                }`}
                                {...register("search", { required: "Debes seleccionar una opción." })}
                            >
                                <option value="" disabled>
                                    {formText}
                                </option>
                                {options?.map((option) => (
                                    <option 
                                        key={option.value} 
                                        value={option.value}
                                        className="text-stone-900"
                                    >
                                        {option.label}
                                    </option>
                                ))}
                            </select>
                        </div>
                    ) : (
                        <input 
                            type={inputType}
                            placeholder={formText}
                            className={`${mini ? "p-0.5 px-2" : "p-3"} w-full border border-stone-300 dark:border-stone-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-stone-500 focus:border-stone-500 transition`}
                            {...register("search", { required: "El campo de búsqueda es obligatorio." })}
                        />
                    )}
                </div>

                <button 
                    type="submit" 
                    className={`min-w-40 sm:min-w-44 ${mini ? "p-0.5" : "p-3"} text-white bg-stone-600 hover:bg-stone-700 dark:bg-stone-800 transition-colors rounded-lg font-semibold shadow-md flex gap-2 items-center justify-center`}
                >
                    <Search size={18} />
                    Search {searchText}
                </button>
            </form>

            <div className="w-full max-w-2xl mx-auto mt-2">
                {errors.search && (
                    <ErrorMessage variant="mini">{errors.search.message}</ErrorMessage>
                )}
            </div>
        </div>
    );
}