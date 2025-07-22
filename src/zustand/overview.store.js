import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { consoleError } from "../utils/comman.utils";
import toast from "react-hot-toast";
import useOrderStore from "./order.store";
import useReviewStore from "./review.store";
import useProductStore from "./product.store";

export const useOverviewStore = create((set) => ({

    totalOrders: 0,
    totalRevenue: 0,
    totalCustomers: 0,

    recentOrders: [],
    topProducts: [],

    isGettingOverviewDataAndSidebarCounts: false,
    getOverviewDataAndSidebarCounts: async () => {

        const { setPendingOrdersCount } = useOrderStore.getState();
        const { setPendingReviewsCount } = useReviewStore.getState();
        const { setLowStockProductsCount } = useProductStore.getState();

        set({ isGettingOverviewDataAndSidebarCounts: true });
        try {
            const response = await axiosInstance.get("api/v1/admin/get-overview-data-and-sidebar-counts");
            set({
                totalOrders: response?.data?.data?.totalOrders || 0,
                totalRevenue: response?.data?.data?.totalRevenue || 0,
                totalCustomers: response?.data?.data?.totalCustomers || 0,

                recentOrders: response?.data?.data?.recentOrders || [],
                topProducts: response?.data?.data?.topProducts || [],
            });
            setPendingOrdersCount(response?.data?.data?.pendingOrdersCount || 0);
            setLowStockProductsCount(response?.data?.data?.lowStockProductsCount || 0);
            setPendingReviewsCount(response?.data?.data?.pendingReviewsCount || 0);
        } catch (error) {
            consoleError("getOverviewData (Overview Store)", error);
            toast.error(error.response?.data?.message || "Internal Server Error.");
        } finally {
            set({ isGettingOverviewDataAndSidebarCounts: false });
        }
    },

}));