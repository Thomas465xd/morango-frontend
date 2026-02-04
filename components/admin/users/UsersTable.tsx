import Pagination from '@/components/ui/Pagination';
import { User } from '@/src/types';
import { SortOrder, UserSortBy } from '@/src/utils/params';
import { ArrowDown, ArrowUp, ArrowUpDown, CheckCircle2, IdCard, Mail, UserRound } from 'lucide-react';
import React from 'react'
import UserEntry from './UserEntry';
import SearchBar from '@/components/ui/SearchBar';
import Dialog from '@/components/ui/Dialog';

type UsersTableProps = {
    users: User[];
    totalUsers: number;
    totalPages: number; 
    page: number; 
    sortBy: UserSortBy;
    sortOrder: SortOrder;
    hasActiveSearch: boolean; 
    confirmed?: boolean; 
    search?: string; 
    onFilterChange: (key: string, value: string | null) => void;
    onClearFilters: () => void;
    onSortChange: (field: UserSortBy) => void;
}

export default function UsersTable({
    users,
    totalUsers,
    totalPages, 
    page, 
    sortBy,
    sortOrder,
    hasActiveSearch,
    confirmed = false, 
    search, 
    onFilterChange,
    onClearFilters,
    onSortChange,
}: UsersTableProps) {

    const getSortIcon = (field: UserSortBy) => {
        if (sortBy !== field) {
            return <ArrowUpDown size={14} className="text-zinc-400" />;
        }
        return sortOrder === "asc" 
            ? <ArrowUp size={14} className="text-white" />
            : <ArrowDown size={14} className="text-white" />;
    };

    const toggleConfirmed = () => {
        onFilterChange("confirmed", confirmed ? "false" : "true");
    };

    return (
        <div className="overflow-hidden rounded-xl shadow-lg border border-zinc-200 dark:border-zinc-700 mt-12">
            {/* Filter Controls */}
            <div className="bg-white dark:bg-zinc-800 p-4 border-b border-zinc-200 dark:border-zinc-700 space-y-4">
                {/* Search Bar */}
                <SearchBar
                    route="admin/users"
                    param="search"
                    inputType="text"
                    formText="Buscar usuarios por nombre, apellido o email"
                    searchText="Usuario"
                    defaultValue={search}
                    mini
                />

                {/* Filters Row */}
                <div className="flex flex-wrap gap-3 items-center">
                    {/* Confirmation Filter */}
                    <label className="flex items-center gap-2 cursor-pointer">
                        <input
                            type="checkbox"
                            checked={confirmed}
                            onChange={toggleConfirmed}
                            className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <span className="text-sm text-zinc-700 dark:text-zinc-300">
                            Solo confirmados
                        </span>
                    </label>

                    {/* Clear Filters Button */}
                    {hasActiveSearch && (
                        <button
                            onClick={onClearFilters}
                            className="px-3 py-1.5 text-sm bg-red-500 text-white rounded-md hover:bg-red-600 transition-colors"
                        >
                            Limpiar filtros
                        </button>
                    )}
                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead>
                        <tr className="bg-gradient-to-r from-zinc-800 to-zinc-700 text-left text-sm text-white">
                            {/* Expand Icon */}
                            <th className="w-8 px-2 py-4"></th>

                            {/* User ID */}
                            <th className="px-6 py-4 font-medium">
                                <div className="flex items-center gap-2">
                                    <IdCard size={16} />
                                    <span>ID</span>
                                </div>
                            </th>

                            {/* Client Name - Sortable */}
                            <th className="px-6 py-4 font-medium">
                                <button
                                    onClick={() => onSortChange("name")}
                                    className="flex items-center gap-2 hover:text-zinc-300 transition-colors cursor-pointer group relative"
                                >
                                    <UserRound size={16} />
                                    <span>Cliente</span>
                                    {getSortIcon("name")}
                                    <Dialog position="bottom">Filtrar ↑↓</Dialog>
                                </button>
                            </th>

                            {/* Email */}
                            <th className="px-6 py-4 font-medium">
                                <div className="flex items-center gap-2">
                                    <Mail size={16} />
                                    <span>Email</span>
                                </div>
                            </th>

                            {/* Confirmation Status */}
                            <th className="px-6 py-4 font-medium">
                                <div className="flex items-center gap-2">
                                    <CheckCircle2 size={16} />
                                    <span>Estado</span>
                                </div>
                            </th>

                            {/* Registration Date */}
                            <th className="px-6 py-4 font-medium">
                                <span>Fecha de Registro</span>
                            </th>

                            {/* Actions */}
                            <th className="px-6 py-4 font-medium">
                                <span>Acciones</span>
                            </th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-zinc-200 dark:divide-zinc-700 bg-white dark:bg-zinc-800">
                        {users.length > 0 ? (
                            users.map((user) => (
                                <UserEntry 
                                    key={user.id} 
                                    user={user} 
                                />
                            ))
                        ) : (
                            <tr>
                                <td
                                    colSpan={7}
                                    className="px-6 py-8 text-center text-zinc-500 dark:text-zinc-400"
                                >
                                    No se encontraron usuarios
                                </td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>

            {/* Footer with Pagination */}
            <div className="bg-zinc-50 dark:bg-zinc-800 px-6 py-3 border-t border-zinc-200 dark:border-zinc-700">
                <div className="flex items-center justify-between mb-4">
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                        Mostrando {users.length} de{" "}
                        {totalUsers || 0} usuarios
                    </p>
                </div>
                
                {totalPages > 1 && (
                    <Pagination
                        route="admin/users"
                        page={page}
                        totalPages={totalPages}
                    />
                )}
            </div>
        </div>
    )
}
