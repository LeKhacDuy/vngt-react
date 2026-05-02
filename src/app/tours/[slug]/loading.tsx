export default function TourDetailLoading() {
    return (
        <div className="bg-gray-50 min-h-screen pb-20 animate-pulse">
            {/* Hero / Gallery + Info Section */}
            <section className="relative bg-white pb-12 pt-8 lg:pt-12">
                <div className="container mx-auto px-4">
                    {/* Breadcrumbs Skeleton */}
                    <div className="flex items-center gap-2 mb-6">
                        <div className="h-4 w-16 bg-gray-200 rounded" />
                        <div className="h-4 w-4 bg-gray-200 rounded" />
                        <div className="h-4 w-24 bg-gray-200 rounded" />
                        <div className="h-4 w-4 bg-gray-200 rounded" />
                        <div className="h-4 w-48 bg-gray-200 rounded" />
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12">
                        {/* Left: Gallery Skeleton */}
                        <div className="space-y-4">
                            {/* Main Image */}
                            <div className="relative h-[300px] lg:h-[400px] rounded-2xl overflow-hidden bg-gray-200">
                                <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-100 to-gray-200 skeleton-shimmer" />
                            </div>
                            {/* Thumbnail Strip */}
                            <div className="flex gap-4">
                                {[1, 2, 3, 4].map((i) => (
                                    <div key={i} className="w-24 h-16 lg:w-32 lg:h-20 flex-shrink-0 rounded-lg bg-gray-200" />
                                ))}
                            </div>
                        </div>

                        {/* Right: Info Skeleton */}
                        <div className="flex flex-col">
                            {/* Title */}
                            <div className="space-y-3 mb-4">
                                <div className="h-8 lg:h-10 w-full bg-gray-200 rounded-lg" />
                                <div className="h-8 lg:h-10 w-3/4 bg-gray-200 rounded-lg" />
                            </div>

                            {/* Rating & Destination badge */}
                            <div className="flex items-center gap-4 mb-6">
                                <div className="flex items-center gap-2">
                                    <div className="h-5 w-5 bg-yellow-200 rounded" />
                                    <div className="h-5 w-10 bg-gray-200 rounded" />
                                    <div className="h-4 w-20 bg-gray-200 rounded" />
                                </div>
                                <div className="h-7 w-24 bg-blue-100 rounded-full" />
                            </div>

                            {/* Price & Booking Box */}
                            <div className="mt-auto bg-white rounded-2xl p-6 shadow-xl border border-gray-100">
                                {/* Price */}
                                <div className="flex justify-between items-end mb-6">
                                    <div className="space-y-2">
                                        <div className="h-4 w-28 bg-gray-200 rounded" />
                                        <div className="h-9 w-44 bg-red-100 rounded-lg" />
                                    </div>
                                </div>

                                {/* Details: Duration, Departure, Transport */}
                                <div className="space-y-4 mb-6">
                                    {[1, 2, 3].map((i) => (
                                        <div key={i} className="flex items-center gap-3">
                                            <div className="w-5 h-5 bg-[#00dba1]/20 rounded" />
                                            <div className="h-4 w-20 bg-gray-200 rounded" />
                                            <div className="h-4 w-32 bg-gray-200 rounded" />
                                        </div>
                                    ))}
                                </div>

                                {/* Buttons */}
                                <div className="flex gap-3">
                                    <div className="flex-1 h-12 bg-gradient-to-r from-[#00dba1]/30 to-[#00b894]/30 rounded-xl" />
                                    <div className="w-12 h-12 bg-gray-100 rounded-xl" />
                                    <div className="w-12 h-12 bg-gray-100 rounded-xl" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Pricing Table Skeleton */}
            <section className="container mx-auto px-4 py-8">
                <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
                    <div className="flex items-center gap-2 mb-6">
                        <div className="w-8 h-8 rounded-full bg-[#00dba1]/10" />
                        <div className="h-7 w-36 bg-gray-200 rounded-lg" />
                    </div>
                    <div className="space-y-0">
                        {/* Table Header */}
                        <div className="grid grid-cols-3 gap-4 p-4 bg-gray-50 rounded-t-xl">
                            <div className="h-5 w-20 bg-gray-200 rounded" />
                            <div className="h-5 w-20 bg-gray-200 rounded" />
                            <div className="h-5 w-32 bg-gray-200 rounded" />
                        </div>
                        {/* Table Rows */}
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="grid grid-cols-3 gap-4 p-4 border-b border-gray-100">
                                <div className="h-4 w-20 bg-gray-200 rounded" />
                                <div className="h-4 w-28 bg-red-100 rounded" />
                                <div className="h-4 w-36 bg-gray-200 rounded" />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* Content Section Skeleton */}
            <section className="container mx-auto px-4 py-8 grid grid-cols-1 lg:grid-cols-3 gap-8">
                {/* Main Content (Left) */}
                <div className="lg:col-span-2 space-y-8">
                    {/* Inclusions Skeleton */}
                    <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-6 h-6 bg-yellow-200 rounded" />
                            <div className="h-7 w-40 bg-gray-200 rounded-lg" />
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                            {[1, 2, 3, 4, 5, 6].map((i) => (
                                <div key={i} className="flex gap-3 bg-gray-50 p-3 rounded-lg">
                                    <div className="w-5 h-5 bg-[#00dba1]/20 rounded flex-shrink-0" />
                                    <div className="h-4 w-full bg-gray-200 rounded" />
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Itinerary Skeleton */}
                    <div className="bg-white rounded-2xl p-6 lg:p-8 shadow-sm">
                        <div className="h-8 w-52 bg-gray-200 rounded-lg mb-8 border-l-4 border-[#00dba1]/30 pl-4" />

                        <div className="border-l-2 border-[#00dba1]/30 ml-3 space-y-10 pl-8">
                            {[1, 2, 3].map((i) => (
                                <div key={i} className="relative">
                                    <span className="absolute -left-[41px] top-0 w-6 h-6 rounded-full bg-[#00dba1]/30 ring-4 ring-white" />
                                    <div className="h-6 w-48 bg-gray-200 rounded-lg mb-3" />
                                    <div className="space-y-2 mb-4">
                                        <div className="h-4 w-full bg-gray-100 rounded" />
                                        <div className="h-4 w-5/6 bg-gray-100 rounded" />
                                        <div className="h-4 w-4/6 bg-gray-100 rounded" />
                                    </div>
                                    {i === 1 && (
                                        <div className="h-48 rounded-xl bg-gray-200 mt-4" />
                                    )}
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Sidebar Skeleton */}
                <div className="space-y-6">
                    <div className="bg-white rounded-2xl p-6 shadow-sm">
                        <div className="h-6 w-32 bg-gray-200 rounded-lg mb-4" />
                        <div className="space-y-4">
                            {/* Phone */}
                            <div className="flex items-center gap-3 p-4 bg-[#00dba1]/5 rounded-xl">
                                <div className="w-10 h-10 rounded-full bg-[#00dba1]/20" />
                                <div className="space-y-2">
                                    <div className="h-3 w-16 bg-gray-200 rounded" />
                                    <div className="h-5 w-28 bg-gray-200 rounded" />
                                </div>
                            </div>
                            {/* Email */}
                            <div className="flex items-center gap-3 p-4 bg-blue-50 rounded-xl">
                                <div className="w-10 h-10 rounded-full bg-blue-200/50" />
                                <div className="space-y-2">
                                    <div className="h-3 w-16 bg-gray-200 rounded" />
                                    <div className="h-5 w-36 bg-gray-200 rounded" />
                                </div>
                            </div>
                        </div>

                        {/* Policy mini section */}
                        <div className="mt-8 pt-6 border-t border-gray-100">
                            <div className="flex items-center gap-2 mb-2">
                                <div className="w-1 h-4 bg-orange-200 rounded-full" />
                                <div className="h-4 w-32 bg-gray-200 rounded" />
                            </div>
                            <div className="space-y-1.5">
                                <div className="h-3 w-full bg-gray-100 rounded" />
                                <div className="h-3 w-5/6 bg-gray-100 rounded" />
                                <div className="h-3 w-4/6 bg-gray-100 rounded" />
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Shimmer animation style */}
            <style>{`
                @keyframes shimmer {
                    0% { transform: translateX(-100%); }
                    100% { transform: translateX(100%); }
                }
                .skeleton-shimmer {
                    animation: shimmer 1.5s infinite;
                }
            `}</style>
        </div>
    );
}
