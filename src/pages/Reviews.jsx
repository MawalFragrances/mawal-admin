import { useEffect, useState } from "react";
import { Select } from "../components/Inputs";
import { reviewStatusOptions } from "../constants";
import { ThemeButton } from "../components/Buttons";
import TableLoader from "../components/TableLoader";
import useReviewStore from "../zustand/review.store";
import DashboardLoader from "../components/DashboardLoader";
import { Package, Star, Eye, CircleCheckBig, CircleX, RotateCw, Clock } from "lucide-react";

export default function Reviews() {

    const [page, setPage] = useState(1);
    const [selectedStatus, setSelectedStatus] = useState("PENDING");

    const {
        totalReviewsCount,
        pendingReviewsCount,
        rejectedReviewsCount,
        approvedReviewsCount,
        getReviewsData,
        isGettingReviewsData,
        getReviewsByStatus,
        loadMoreReviews,
        isGettingMoreReviews,
        reviews,
        setReviews
    } = useReviewStore();

    // SCROLL TO TOP AND FETCH REVIEWS STATS
    useEffect(() => {
        window.scrollTo(0, 0);
        getReviewsData();
    }, [getReviewsData]);

    // FETCH REVIEWS BY STATUS
    useEffect(() => {
        setPage(1);
        setReviews([]);
        getReviewsByStatus(selectedStatus);
    }, [selectedStatus, getReviewsByStatus, setReviews]);

    const handleLoadMore = () => {
        const nextPage = page + 1;
        loadMoreReviews(selectedStatus, nextPage, 20);
    };

    const hasMoreReviews = () => {
        if (selectedStatus === "PENDING") return pendingReviewsCount > reviews.length;
        else if (selectedStatus === "REJECTED") return rejectedReviewsCount > reviews.length;
        else return approvedReviewsCount > reviews.length;
    }

    if (isGettingReviewsData) return <DashboardLoader />

    return (
        <div className="animate-themeAnimationLg min-h-screen flex-1 p-6">
            <div className="max-w-7xl mx-auto">

                {/* HEADER */}
                <div className="mb-6 mt-3">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent">
                        Reviews Management
                    </h1>
                    <p className="text-gray-600 mt-2">Manage your reviews with ease</p>
                </div>

                {/* STATS */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-8">
                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Pending Reviews</p>
                                <p className="text-3xl font-bold text-gray-700">{pendingReviewsCount.toLocaleString()}</p>
                            </div>
                            <div className="bg-gray-100 p-3 rounded-full">
                                <Clock className="w-6 h-6 text-gray-700" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Rejected Reviews</p>
                                <p className="text-3xl font-bold text-orange-500">{rejectedReviewsCount.toLocaleString()}</p>
                            </div>
                            <div className="bg-orange-100 p-3 rounded-full">
                                <CircleX className="w-6 h-6 text-orange-500" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Approved Reviews</p>
                                <p className="text-3xl font-bold text-gray-500">{approvedReviewsCount.toLocaleString()}</p>
                            </div>
                            <div className="bg-gray-100 p-3 rounded-full">
                                <CircleCheckBig className="w-6 h-6 text-gray-500" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Total Reviews</p>
                                <p className="text-3xl font-bold text-gray-700">{totalReviewsCount.toLocaleString()}</p>
                            </div>
                            <div className="bg-gray-100 p-3 rounded-full">
                                <Star className="w-6 h-6 text-gray-700" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* FILTER SECTION */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border shadow-lg mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">
                    <div className="w-56">
                        <Select
                            label="Review Status"
                            options={reviewStatusOptions}
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                        />
                    </div>
                    <div className="text-sm text-gray-600">
                        Showing {reviews.length} of {
                            selectedStatus === "PENDING" ? pendingReviewsCount :
                                selectedStatus === "REJECTED" ? rejectedReviewsCount :
                                    selectedStatus === "APPROVED" ? approvedReviewsCount :
                                        totalReviewsCount
                        } reviews
                    </div>
                </div>

                {/* REVIEWS TABLE */}
                <div className="bg-white rounded-2xl shadow-xl py-8 px-4 border border-gray-200 w-full">

                    <table className="w-full">
                        <thead>
                            <tr className="text-left bg-gray-50 border-b border-gray-200">
                                <th className="pl-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">User Name</th>
                                <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Rating</th>
                                <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                <th className="pr-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>
                        <MapReviews />
                    </table>

                    <div className="flex justify-between mt-6 items-center gap-5">
                        <p className="text-gray-500 text-sm text-nowrap">
                            Showing {reviews.length} of {
                                selectedStatus === "PENDING" ? pendingReviewsCount :
                                    selectedStatus === "REJECTED" ? rejectedReviewsCount :
                                        approvedReviewsCount
                            } reviews
                        </p>
                        <ThemeButton
                            btnLabel={`LOAD MORE ${selectedStatus} REVIEWS`}
                            icon={<RotateCw size={20} />}
                            onClick={handleLoadMore}
                            isButtonLoading={isGettingMoreReviews}
                            loadingLabel="LOADING..."
                            extraClasses="px-8 py-3 max-w-80 text-nowrap"
                            isButtonDisabled={!hasMoreReviews()}
                            disabledLabel="NO MORE REVIEWS"
                        />
                    </div>

                </div>

            </div>
        </div>
    );
}

function MapReviews() {

    const {
        reviews,
        setReviewToView,
        updateReviewStatus,
        isGettingReviewsByStatus,
    } = useReviewStore();

    if (isGettingReviewsByStatus) return <TableLoader />

    return (
        <tbody className="divide-y divide-gray-300">
            {reviews.length === 0 ? (
                <tr>
                    <td colSpan={100} className="text-center py-10">
                        <p className="text-gray-500 text-sm">No reviews found</p>
                    </td>
                </tr>
            ) : (
                reviews?.map((review, index) => (
                    <tr
                        key={`${review.id}-${index}`}
                        className="hover:bg-gray-50 transition-colors duration-200"
                    >
                        <td className="pl-4 py-3">
                            {review?.productId?.images?.[0] ? (
                                <img
                                    src={review?.productId?.images?.[0]}
                                    alt={review?.productId?.name}
                                    className="w-16 h-16 rounded-lg object-cover"
                                />
                            ) : (
                                <div className="w-12 h-12 rounded-lg bg-gray-200 flex items-center justify-center">
                                    <Package className="w-6 h-6 text-gray-400" />
                                </div>
                            )}
                        </td>
                        <td className="px-2 py-3">
                            <div className="font-medium text-gray-900">{review?.productId?.name}</div>
                        </td>
                        <td className="px-2 py-3">
                            <div className="text-gray-600">{review?.firstName} {review?.lastName}</div>
                        </td>
                        <td className="px-2 py-3">
                            <div className="flex items-center">
                                <Star className="w-4 h-4 text-yellow-400 fill-current mr-1" />
                                <span className="text-gray-900 font-medium">{review?.rating}</span>
                            </div>
                        </td>
                        <td className="px-2 py-3">
                            <span className={`px-2 py-1 text-xs font-medium rounded-full ${review?.status === 'APPROVED' ? 'bg-green-100 text-green-800' :
                                review?.status === 'REJECTED' ? 'bg-red-100 text-red-800' :
                                    'bg-yellow-100 text-yellow-800'
                                }`}>
                                {review?.status}
                            </span>
                        </td>
                        <td className="px-2 py-3 text-right">

                            <div className="transition-all duration-200">

                                <button onClick={() => { setReviewToView(review) }}
                                    className="p-2 text-blue-600 hover:bg-emerald-100 rounded-lg transition-all duration-200">
                                    <Eye className="w-4 h-4" />
                                </button>

                                {review?.status !== "APPROVED" && (
                                    <button onClick={() => updateReviewStatus(review._id, review?.status, "APPROVED")}
                                        className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-all duration-200">
                                        <CircleCheckBig className="w-4 h-4" />
                                    </button>
                                )}

                                {review?.status !== "REJECTED" && (
                                    <button onClick={() => updateReviewStatus(review._id, review?.status, "REJECTED")}
                                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200">
                                        <CircleX className="w-4 h-4" />
                                    </button>
                                )}

                            </div>

                        </td>
                    </tr>
                ))
            )}
        </tbody>
    );
}