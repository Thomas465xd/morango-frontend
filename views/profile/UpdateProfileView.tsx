"use client"; 
import UpdateProfileForm from '@/components/home/profile/UpdateProfileForm'
import UpdateProfileFormSkeleton from '@/components/skeletons/UpdateProfileFormSkeleton';
import ErrorCard from '@/components/ui/ErrorCard';
import { useAuth } from '@/src/hooks/useAuth'
import { UserRoundXIcon } from 'lucide-react';
import React from 'react'

export default function UpdateProfileView() {
    const { user, isLoading, isError } = useAuth(); 

    if (isLoading) return (
        <UpdateProfileFormSkeleton />
    )

    if (isError) return (
        <ErrorCard
            icon={UserRoundXIcon}
            title="Usuario no encontrado."
            description="Ha ocurrido un error al cargar los datos de tu usuario, por favor comprueba tu conexión a internet y recarga la página."
            errorText='getUser API Request Error'
            showReload
            showPrevious
        />
    )

    if (user) return (
        <UpdateProfileForm
            user={user}
        />
    )
}
