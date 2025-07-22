import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";
import { consoleError } from "../utils/comman.utils";

const useReviewStore = create((set, get) => ({

    reviews: [],
    setReviews: (reviews) => set({ reviews }),

    reviewToView: null,
    setReviewToView: (review) => set({ reviewToView: review }),

    totalReviewsCount: 0,
    rejectedReviewsCount: 0,
    approvedReviewsCount: 0,
    pendingReviewsCount: 0,
    setPendingReviewsCount: (pendingReviewsCount) => set({ pendingReviewsCount }), // FOR SIDEBAR COUNTS

    isGettingReviewsData: false,
    getReviewsData: async () => {
        set({ isGettingReviewsData: true });
        try {
            const response = await axiosInstance.get("api/v1/admin/get-reviews-data");

            // SET THE COUNTS
            set({
                totalReviewsCount: response?.data?.data?.totalReviewsCount || 0,
                pendingReviewsCount: response?.data?.data?.pendingReviewsCount || 0,
                rejectedReviewsCount: response?.data?.data?.rejectedReviewsCount || 0,
                approvedReviewsCount: response?.data?.data?.approvedReviewsCount || 0,
            });
        }
        catch (error) {
            consoleError("getReviewsData (Review Store)", error);
            toast.error(error.response?.data?.message || "Internal Server Error.");
        }
        finally { set({ isGettingReviewsData: false }); }
    },

    isGettingReviewsByStatus: false,
    getReviewsByStatus: async (status) => {
        set({ isGettingReviewsByStatus: true });
        try {
            const response = await axiosInstance.get(`api/v1/admin/get-reviews-by-status?status=${status}`);
            set({ reviews: response?.data?.data || [], });
        }
        catch (error) {
            consoleError("getReviewsByStatus (Review Store)", error);
            toast.error(error.response?.data?.message || "Internal Server Error.");
        }
        finally { set({ isGettingReviewsByStatus: false }); }
    },

    isGettingMoreReviews: false,
    loadMoreReviews: async (status, page) => {
        set({ isGettingMoreReviews: true });
        try {
            const response = await axiosInstance.get(`api/v1/admin/load-more-reviews?status=${status}&page=${page}`);

            // ADD NEW REVIEWS TO THE LIST
            set({ reviews: [...get().reviews, ...response?.data?.data || []] });
        }
        catch (error) {
            consoleError("loadMoreReviews (Review Store)", error);
            toast.error(error.response?.data?.message || "Internal Server Error.");
        }
        finally { set({ isGettingMoreReviews: false }); }
    },

    updateReviewStatus: async (reviewId, currStatus, status) => {
        try {
            await axiosInstance.patch(`api/v1/admin/update-review-status/${reviewId}`, { status });

            // DECREASE RESPECTIVE REVIEW COUNT
            if (currStatus === "PENDING")
                set({ pendingReviewsCount: get().pendingReviewsCount - 1 });
            else if (currStatus === "APPROVED")
                set({ approvedReviewsCount: get().approvedReviewsCount - 1 });
            else
                set({ rejectedReviewsCount: get().rejectedReviewsCount - 1 });

            // INCREASE RESPECTIVE REVIEW COUNT
            if (status === "APPROVED")
                set({ approvedReviewsCount: get().approvedReviewsCount + 1 });
            else
                set({ rejectedReviewsCount: get().rejectedReviewsCount + 1 });

            // REMOVE REVIEW FROM LIST
            set({ reviews: get().reviews.filter((review) => review._id !== reviewId) });

            toast.success("Review status updated successfully.");
        }
        catch (error) {
            consoleError("updateReviewStatus (Review Store)", error);
            toast.error(error.response?.data?.message || "Internal Server Error.");
        }
    },

}));

export default useReviewStore;