import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { consoleError } from "../utils/comman.utils";

const useAnalyticsStore = create((set) => ({

    totalOrdersCount: 0,
    totalRevenue: 0,
    totalCustomersCount: 0,

    lastYearSales: [],

    totalSalesByRange: 0,
    getTotalSales: async (timeFrame, customStartDate, customEndDate) => {
        try {
            const response = await axiosInstance.post("api/v1/admin/get-total-sales", { timeFrame, customStartDate, customEndDate });
            set({ totalSalesByRange: response.data.data });
        } catch (error) {
            consoleError("getTotalSales (Analytics Store)", error);
            toast.error(error.response?.data?.message || "Internal Server Error.");
        }
    },
    totalOrdersByRange: 0,
    getTotalOrders: async (timeFrame, customStartDate, customEndDate) => {
        try {
            const response = await axiosInstance.post("api/v1/admin/get-total-orders", { timeFrame, customStartDate, customEndDate });
            set({ totalOrdersByRange: response.data.data });
        } catch (error) {
            consoleError("getTotalOrders (Analytics Store)", error);
            toast.error(error.response?.data?.message || "Internal Server Error.");
        }
    },
    totalCustomersByRange: 0,
    getTotalCustomers: async (timeFrame, customStartDate, customEndDate) => {
        try {
            const response = await axiosInstance.post("api/v1/admin/get-total-customers", { timeFrame, customStartDate, customEndDate });
            set({ totalCustomersByRange: response.data.data });
        } catch (error) {
            consoleError("getTotalCustomers (Analytics Store)", error);
            toast.error(error.response?.data?.message || "Internal Server Error.");
        }
    },

    isGettingAnalyticsData: false,
    getAnalyticsData: async () => {
        set({ isGettingAnalyticsData: true });
        try {
            const response = await axiosInstance.get("api/v1/admin/get-analytics-data");

            set({ totalOrdersCount: response.data.data.totalOrdersCount });
            set({ totalRevenue: response.data.data.totalRevenue });
            set({ totalCustomersCount: response.data.data.totalCustomersCount });
            set({ lastYearSales: response.data.data.lastYearSales });

        } catch (error) {
            consoleError("getAnalyticsData (Analytics Store)", error);
            toast.error(error.response?.data?.message || "Internal Server Error.");
        } finally {
            set({ isGettingAnalyticsData: false });
        }
    },



}));

export default useAnalyticsStore;