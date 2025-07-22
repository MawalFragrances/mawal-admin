import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { consoleError } from "../utils/comman.utils";
import toast from "react-hot-toast";

const useOrderStore = create((set, get) => ({

    orders: [],

    totalOrdersCount: 0,
    pendingOrdersCount: 0,
    setPendingOrdersCount: (pendingOrdersCount) => set({ pendingOrdersCount }), // FOR SIDEBAR COUNTS
    completedOrdersCount: 0,

    orderToView: null,
    setOrderToView: (orderToView) => set({ orderToView }),


    isGettingOrdersData: false,
    getOrdersData: async () => {
        set({ isGettingOrdersData: true });
        try {
            const response = await axiosInstance.get("api/v1/admin/get-orders-data");
            set({
                totalOrdersCount: response?.data?.data?.totalOrdersCount || 0,
                pendingOrdersCount: response?.data?.data?.pendingOrdersCount || 0,
                completedOrdersCount: response?.data?.data?.completedOrdersCount || 0,

                orders: response?.data?.data?.recentOrders || [],
            });
        }
        catch (error) {
            consoleError("getOrdersData (Order Store)", error);
            toast.error(error.response?.data?.message || "Internal Server Error.");
        }
        finally {
            set({ isGettingOrdersData: false });
        }
    },

    isLoadingMoreOrders: false,
    loadMoreOrders: async (page) => {
        set({ isLoadingMoreOrders: true });
        try {
            const response = await axiosInstance.get(`api/v1/admin/load-more-orders?page=${page}`);
            set({ orders: [...get().orders, ...response?.data?.data || []] });
        }
        catch (error) {
            consoleError("loadMoreOrders (Order Store)", error);
            toast.error(error.response?.data?.message || "Internal Server Error.");
        }
        finally {
            set({ isLoadingMoreOrders: false });
        }
    },

    ordersByStatus: [],
    totalOrdersByStatus: 0,
    isGettingOrdersByStatus: false,
    fetchOrdersByStatus: async (status, page) => {
        set({ isGettingOrdersByStatus: true });
        try {
            const response = await axiosInstance.get(`api/v1/admin/get-orders-by-status?status=${status}&page=${page}`);
            set({
                ordersByStatus: response?.data?.data?.filteredOrders || [],
                totalOrdersByStatus: response?.data?.data?.filteredOrdersCount || 0
            });
        } catch (error) {
            consoleError("fetchOrdersByStatus (Dashboard Store)", error);
            toast.error(error.response?.data?.message || "Internal Server Error.");
        } finally {
            set({ isGettingOrdersByStatus: false });
        }
    },

    orderByNo: null,
    setOrderByNo: (orderByNo) => set({ orderByNo }),
    isGettingOrdersByNo: false,
    fetchOrdersByNo: async (orderNumber) => {
        set({ isGettingOrdersByNo: true });
        try {
            const response = await axiosInstance.get(`api/v1/admin/get-order-by-no?orderNumber=${orderNumber}`);
            set({ orderByNo: response?.data?.data || null });
        } catch (error) {
            consoleError("fetchOrderByNo (Dashboard Store)", error);
            toast.error(error.response?.data?.message || "Internal Server Error.");
        } finally {
            set({ isGettingOrdersByNo: false });
        }
    },

    changeOrderStatus: async (orderId, status) => {
        try {
            const response = await axiosInstance.post(`api/v1/admin/change-order-status`, { orderId, status });
            toast.success(response?.data?.message);
        } catch (error) {
            consoleError("changeOrderStatus (Dashboard Store)", error);
            toast.error(error.response?.data?.message || "Internal Server Error.");
        }
    },

    deleteOrder: async (orderId) => {
        try {
            const response = await axiosInstance.delete(`api/v1/admin/delete-order/${orderId}`);
            toast.success(response?.data?.message);
            set((state) => ({ orders: state.orders.filter((order) => order._id !== orderId) }));
        }
        catch (error) {
            consoleError("deleteOrder (Dashboard Store)", error);
            toast.error(error.response?.data?.message || "Internal Server Error.");
        }
    },

}));

export default useOrderStore;
