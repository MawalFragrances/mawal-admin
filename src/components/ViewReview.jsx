import { Shield, CheckCircle, Star, X } from "lucide-react";
import useReviewStore from "../zustand/review.store";

export default function ViewReview() {

    const { reviewToView, setReviewToView } = useReviewStore();

    const renderStars = (rating) => {
        return [...Array(5)].map((_, index) => (
            <Star
                key={index}
                className={`w-5 h-5 ${index < rating
                    ? 'text-yellow-400 fill-yellow-400'
                    : 'text-gray-300'
                    }`}
            />
        ));
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString('en-US', {
            month: 'short',
            day: 'numeric',
            year: 'numeric'
        });
    };

    const getInitials = (firstName, lastName) => {
        return `${firstName[0]}${lastName[0]}`.toUpperCase();
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[1000]">

            <div className="max-w-2xl mx-auto p-6">

                <div className="animate-themeAnimationLg bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">

                    <div className="flex items-center justify-between px-4 py-2 border-b-2 border-gray-400">
                        <div className="flex items-center gap-2">
                            <img
                                src={reviewToView?.productId?.images?.[0]}
                                alt={reviewToView?.productId?.name}
                                className="w-14 h-14 rounded-full"
                            />

                            <p className="text-sm text-gray-600 font-medium">{reviewToView?.productId?.name}</p>
                        </div>

                        <button
                            onClick={() => setReviewToView(null)}
                            className="text-gray-500 hover:text-gray-700">
                            <X className="w-6 h-6" />
                        </button>
                    </div>

                    {/* Header */}
                    <div className="p-6 pb-2 border-b border-gray-200">

                        <div className="flex items-start justify-between mb-4">
                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center text-white font-medium">
                                    {getInitials(reviewToView?.firstName, reviewToView?.lastName)}
                                </div>
                                <div>
                                    <h3 className="font-semibold text-gray-800">
                                        {reviewToView?.firstName} {reviewToView?.lastName}
                                    </h3>
                                    <div className="flex items-center gap-2 text-sm text-gray-500">
                                        <span>{reviewToView?.ageGroup}</span>
                                        <span>•</span>
                                        <span>{reviewToView?.gender}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-3">
                                <div className="flex items-center gap-1">
                                    {renderStars(reviewToView?.rating)}
                                </div>
                                <span className="font-medium text-gray-700">{reviewToView?.rating}/5</span>
                            </div>

                        </div>



                        <h2 className="text-xl font-semibold text-gray-800">
                            {reviewToView?.reviewTitle}
                        </h2>
                    </div>

                    {/* Content */}
                    <div className="p-6">

                        <p className="text-gray-700 leading-relaxed mb-6">
                            {reviewToView?.review}
                        </p>

                        {/* Images */}
                        {reviewToView?.reviewImages?.length > 0 && (
                            <div className="mb-6">
                                <div className={`grid grid-cols-${reviewToView?.reviewImages?.length} gap-3`}>
                                    {reviewToView?.reviewImages?.map((image, index) => (
                                        <div key={index} className="relative group">
                                            <img
                                                src={image}
                                                alt={`Review photo ${index + 1}`}
                                                className="w-full h-24 object-cover rounded-lg cursor-pointer transition-transform hover:scale-105"
                                            />
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Actions */}
                        <div className="flex items-center justify-between pt-4 border-t border-gray-100">
                            <span className="text-xs text-gray-400">
                                {formatDate(reviewToView?.createdAt)}
                            </span>

                            <div className="flex gap-2">
                                {reviewToView?.isPurchaseVerified && (
                                    <div className="flex items-center gap-1 bg-green-50 text-green-700 px-3 py-1 rounded-full text-sm">
                                        <Shield className="w-4 h-4" />
                                        Verified
                                    </div>
                                )}
                                {reviewToView?.isProductRecomended && (
                                    <div className="flex items-center gap-1 bg-blue-50 text-blue-700 px-3 py-1 rounded-full text-sm">
                                        <CheckCircle className="w-4 h-4" />
                                        Recommends
                                    </div>
                                )}
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}