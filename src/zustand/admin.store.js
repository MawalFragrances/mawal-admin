import { create } from "zustand";
import { consoleError } from "../utils/comman.utils";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import useStoreStore from "./store.store";

const useAdminStore = create((set) => ({

    // ADMIN DASHBOARD STATSs
    adminDashboardStats: {

        totalProductsCount: 0,
        deletedProductsCount: 0,
        lowStockProductsCount: 0,

        totalOrdersCount: 0,
        pendingOrdersCount: 0,
        completedOrdersCount: 0,

        totalRevenue: 0,
        totalCustomersCount: 0,

    },


    orders: [],
    allProducts: [],
    topProducts: [],
    lastYearSales: [],
    getAdminDashboardStats: async () => {

        const { setPromoMessages } = useStoreStore.getState();
        try {
            const response = await axiosInstance.get("api/v1/admin/get-admin-dashboard-stats");
            console.log(response?.data?.data);

            const { topProducts, allProducts, orders, lastYearSales, storeData, ...rest } = response?.data?.data || {};
            set({ adminDashboardStats: rest });

            set({ orders });
            set({ topProducts });
            set({ allProducts });
            set({ lastYearSales });

            setPromoMessages(storeData?.promoMessages);

            console.log(storeData);
            console.log(storeData?.promoMessages);
        } catch (error) {
            consoleError("getAdminDashboardStats (Dashboard Store)", error);
            toast.error(error.response?.data?.message || "Internal Server Error.");
        }
    },



}));

export default useAdminStore;