import React from 'react';
import { Link } from 'react-router-dom';
import {
    MapPin,
    DollarSign,
    Ruler,
    Landmark,
    CalendarClock,
    Home,
    FilePen,
    Award,
    Crown,
    Bookmark
} from 'lucide-react';
import { PropertySchedule } from './PropertyScheduleDialog';
import { DeletePropertyDialog } from './DeletePropertyDialog';

export const Card = ({
    item,
    postTier,
    canUpdate = false,
    canViewSchedule = false,
    canDelete = false
}) => {
    const {
        propertyId,
        title,
        price,
        squareMeters,
        category,
        typeTransaction,
        projectName,
        fullAddress,
        startTime,
        expireTime,
        images,
        address
    } = item;

    return (
        <div className="group relative flex flex-col gap-6 rounded-xl border border-gray-200 bg-white p-5 shadow-sm transition-all duration-300 hover:shadow-md sm:flex-row">
            {postTier && (
                <div
                    className={`absolute -top-3 -right-3 z-30 flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ring-2 transition-transform hover:scale-105 ${
                        postTier === 'VIP_GOLD'
                            ? 'animate-glow-gold bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 text-white shadow-lg ring-yellow-300'
                            : postTier === 'VIP_SILVER'
                              ? 'bg-gradient-to-r from-gray-300 via-gray-400 to-gray-500 text-white shadow-md ring-gray-300'
                              : 'bg-blue-500 text-white shadow-sm ring-blue-300'
                    }`}
                    title={
                        postTier === 'VIP_GOLD'
                            ? 'Top-tier premium post'
                            : postTier === 'VIP_SILVER'
                              ? 'Mid-tier premium post'
                              : 'Standard post'
                    }
                >
                    {postTier === 'VIP_GOLD' ? (
                        <>
                            <Crown className="h-4 w-4 fill-yellow-100 stroke-yellow-800 drop-shadow" />
                            <span className="tracking-wide">VIP GOLD</span>
                        </>
                    ) : postTier === 'VIP_SILVER' ? (
                        <>
                            <Award className="h-4 w-4 fill-gray-100 stroke-gray-700" />
                            <span className="tracking-wide">VIP SILVER</span>
                        </>
                    ) : (
                        <>
                            <Bookmark className="h-4 w-4 fill-blue-200 stroke-blue-800" />
                            <span>REGULAR</span>
                        </>
                    )}
                </div>
            )}

            {/* Image Container with badge */}
            <div className="relative h-[200px] w-full flex-shrink-0 overflow-hidden rounded-lg sm:w-[300px]">
                <Link to={`/list/${propertyId}`} className="block h-full">
                    <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/50 to-transparent"></div>
                    <img
                        src={
                            images?.[0]?.imageUrl || '/placeholder-property.jpg'
                        }
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-110"
                        alt={title}
                    />
                </Link>

                {/* Status Badge */}
                <div
                    className={`absolute top-3 left-3 z-20 rounded-full ${typeTransaction === 'sale' ? 'bg-green-500' : 'bg-blue-500'} px-3 py-1 text-xs font-semibold text-white`}
                >
                    {typeTransaction}
                </div>

                {/* Price Badge */}
                <div className="absolute bottom-3 left-3 z-20 flex items-center gap-1 rounded-lg bg-white/90 px-3 py-1.5 text-sm font-bold text-gray-900">
                    <DollarSign className="h-4 w-4 text-amber-500" />
                    {price.toLocaleString()} VND
                </div>
            </div>

            {/* Info */}
            <div className="flex w-full max-w-full flex-col justify-between pt-4 sm:pt-0">
                {/* Title and main info */}
                <div className="space-y-4">
                    <h3 className="w-full max-w-full text-xl font-bold break-words whitespace-normal text-gray-800 transition-colors group-hover:text-amber-500">
                        <Link to={`/list/${item.propertyId}`}>{title}</Link>
                    </h3>

                    {/* Key details in a row */}
                    <div className="flex flex-wrap gap-6">
                        <div className="flex items-center gap-2 text-gray-700">
                            <Ruler className="h-4 w-4 text-blue-500" />
                            <span className="font-medium">
                                {squareMeters} m²
                            </span>
                        </div>

                        <div className="flex items-center gap-2 text-gray-700">
                            <Home className="h-4 w-4 text-emerald-500" />
                            <span className="font-medium capitalize">
                                {category}
                            </span>
                        </div>
                    </div>

                    {/* Location and details */}
                    <div className="space-y-2 text-sm text-gray-600">
                        {/* Project Name */}
                        <div className="flex items-center gap-2">
                            <Landmark className="h-4 w-4 text-gray-500" />
                            <span className="truncate">{projectName}</span>
                        </div>

                        {/* Address */}
                        <div className="flex items-center gap-2">
                            <MapPin className="h-4 w-4 text-gray-500" />
                            <span className="w-full max-w-full break-words whitespace-normal">
                                {fullAddress}
                            </span>
                        </div>

                        {/* Start and Expiry Date */}
                        <div className="flex items-center gap-2">
                            <CalendarClock className="h-4 w-4 text-gray-500" />
                            <span>
                                {new Date(startTime).toLocaleDateString()} →{' '}
                                {new Date(expireTime).toLocaleDateString()}
                            </span>
                        </div>
                    </div>
                </div>

                {/* Tags + Edit Button */}
                <div className="mt-4 flex flex-wrap items-center justify-between gap-2">
                    {/* Location Tags */}
                    <div className="flex flex-wrap items-center gap-2">
                        {[address?.ward, address?.town, address?.province]
                            .filter(Boolean)
                            .map((tag, index) => (
                                <span
                                    key={index}
                                    className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 transition hover:bg-gray-200"
                                >
                                    {tag}
                                </span>
                            ))}
                    </div>

                    <div>
                        {/* Edit Button */}
                        {canUpdate && (
                            <Link
                                to={`/edit/${propertyId}`}
                                className="inline-flex items-center justify-center rounded-full p-2 text-blue-500 transition hover:bg-blue-100 hover:text-blue-600"
                            >
                                <FilePen className="h-5 w-5" />
                            </Link>
                        )}

                        {/* View Schedule Button */}
                        {canViewSchedule && (
                            <PropertySchedule propertyId={propertyId} />
                        )}
                        {/* Delete Property Button */}
                        {canDelete && (
                            <DeletePropertyDialog
                                propertyId={propertyId}
                                title={title}
                            />
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
