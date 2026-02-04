import React from 'react'

export default function UpdateProfileFormSkeleton() {
    return (
        <div className="max-w-4xl mx-auto mt-8 space-y-8 animate-pulse">
            {/* Information Alert Skeleton */}
            <div className="h-16 bg-zinc-200 dark:bg-zinc-700 rounded-lg" />

            {/* Personal Information Section */}
            <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 space-y-6">
                {/* Section Title */}
                <div className="h-6 w-48 bg-zinc-200 dark:bg-zinc-700 rounded" />

                {/* Form Fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Name Field */}
                    <div className="space-y-2">
                        <div className="h-4 w-20 bg-zinc-200 dark:bg-zinc-700 rounded" />
                        <div className="h-10 bg-zinc-100 dark:bg-zinc-700 rounded" />
                    </div>

                    {/* Surname Field */}
                    <div className="space-y-2">
                        <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-700 rounded" />
                        <div className="h-10 bg-zinc-100 dark:bg-zinc-700 rounded" />
                    </div>

                    {/* Email Field - Full Width */}
                    <div className="space-y-2 md:col-span-2">
                        <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-700 rounded" />
                        <div className="h-10 bg-zinc-100 dark:bg-zinc-700 rounded" />
                    </div>

                    {/* Phone Field - Full Width */}
                    <div className="space-y-2 md:col-span-2">
                        <div className="h-4 w-28 bg-zinc-200 dark:bg-zinc-700 rounded" />
                        <div className="h-10 bg-zinc-100 dark:bg-zinc-700 rounded" />
                        <div className="h-3 w-56 bg-zinc-100 dark:bg-zinc-700 rounded" />
                    </div>
                </div>
            </div>

            {/* Shipping Address Section */}
            <div className="bg-white dark:bg-zinc-800 rounded-lg border border-zinc-200 dark:border-zinc-700 p-6 space-y-6">
                {/* Section Title */}
                <div className="h-6 w-56 bg-zinc-200 dark:bg-zinc-700 rounded" />

                {/* Form Fields Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {/* Country Field */}
                    <div className="space-y-2">
                        <div className="h-4 w-16 bg-zinc-200 dark:bg-zinc-700 rounded" />
                        <div className="h-10 bg-zinc-100 dark:bg-zinc-700 rounded" />
                    </div>

                    {/* Region Field */}
                    <div className="space-y-2">
                        <div className="h-4 w-20 bg-zinc-200 dark:bg-zinc-700 rounded" />
                        <div className="h-10 bg-zinc-100 dark:bg-zinc-700 rounded" />
                    </div>

                    {/* City Field */}
                    <div className="space-y-2">
                        <div className="h-4 w-16 bg-zinc-200 dark:bg-zinc-700 rounded" />
                        <div className="h-10 bg-zinc-100 dark:bg-zinc-700 rounded" />
                    </div>

                    {/* City Area Field */}
                    <div className="space-y-2">
                        <div className="h-4 w-20 bg-zinc-200 dark:bg-zinc-700 rounded" />
                        <div className="h-10 bg-zinc-100 dark:bg-zinc-700 rounded" />
                    </div>

                    {/* Street Address - Full Width */}
                    <div className="space-y-2 md:col-span-2">
                        <div className="h-4 w-24 bg-zinc-200 dark:bg-zinc-700 rounded" />
                        <div className="h-10 bg-zinc-100 dark:bg-zinc-700 rounded" />
                    </div>

                    {/* Zip Code Field */}
                    <div className="space-y-2">
                        <div className="h-4 w-32 bg-zinc-200 dark:bg-zinc-700 rounded" />
                        <div className="h-10 bg-zinc-100 dark:bg-zinc-700 rounded" />
                    </div>
                </div>
            </div>

            {/* Submit Section */}
            <div className="flex flex-col sm:flex-row gap-4">
                <div className="flex-1 h-12 bg-zinc-200 dark:bg-zinc-700 rounded-lg" />
                <div className="flex-1 h-12 bg-zinc-100 dark:bg-zinc-700 rounded-lg" />
            </div>

            {/* Required Fields Note */}
            <div className="h-3 w-32 bg-zinc-100 dark:bg-zinc-700 rounded" />
        </div>
    )
}
