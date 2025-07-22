import { create } from "zustand";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";
import { consoleError } from "../utils/comman.utils";

const useStoreStore = create((set, get) => ({

    coupons: [],
    promoMessages: [],
    shippingCharges: 0,
    freeShippingAbove: 0,
    adminsActivities: [],

    displayAddNewCoupon: false,
    setDisplayAddNewCoupon: (displayAddNewCoupon) => (set({ displayAddNewCoupon })),

    isGettingStoreData: false,
    getStoreData: async () => {
        set({ isGettingStoreData: true });
        try {
            const response = await axiosInstance.get(`api/v1/admin/get-store-data`);
            set({
                coupons: response?.data?.data?.coupons || [],
                promoMessages: response?.data?.data?.promoMessages || [],
                shippingCharges: response?.data?.data?.shippingCharges || 0,
                freeShippingAbove: response?.data?.data?.freeShippingAbove || 0,
            });
        }
        catch (error) {
            consoleError("getStoreData (Store Store)", error);
            toast.error(error.response?.data?.message || "Internal Server Error.");
        }
        finally { set({ isGettingStoreData: false }); }
    },

    isUpdatingPromoMessages: false,
    updatePromoMessages: async (promoMessages) => {
        set({ isUpdatingPromoMessages: true });
        try {
            const response = await axiosInstance.patch(`api/v1/admin/update-promo-messages`, { promoMessages });
            set({ promoMessages: response?.data?.data?.promoMessages });
            toast.success("Promotion messages updated successfully.");
        }
        catch (error) {
            consoleError("updatePromoMessages (Store Store)", error);
            toast.error(error.response?.data?.message || "Internal Server Error.");
        }
        finally { set({ isUpdatingPromoMessages: false }); }
    },

    isAddingNewCoupon: false,
    addNewCoupon: async (coupon) => {
        set({ isAddingNewCoupon: true });
        try {
            const response = await axiosInstance.post(`api/v1/admin/add-new-coupon`, { coupon });
            set({ coupons: [...get().coupons, response?.data?.data] });
            set({ displayAddNewCoupon: false });
            toast.success("Coupon added successfully.");
        }
        catch (error) {
            consoleError("addNewCoupon (Store Store)", error);
            toast.error(error.response?.data?.message || "Internal Server Error.");
        }
        finally { set({ isAddingNewCoupon: false }); }
    },

    deleteCoupon: async (code) => {
        try {
            await axiosInstance.delete(`api/v1/admin/delete-coupon`, { data: { code } });
            set({ coupons: get().coupons.filter((coupon) => coupon?.code !== code) });
            toast.success("Coupon deleted successfully.");
        }
        catch (error) {
            consoleError("deleteCoupon (Store Store)", error);
            toast.error(error.response?.data?.message || "Internal Server Error.");
        }
    },

    isUpdatingShippingSettings: false,
    updateShippingSettings: async (shippingCharges, freeShippingAbove) => {
        set({ isUpdatingShippingSettings: true });
        try {
            await axiosInstance.patch(`api/v1/admin/change-shipping-settings`, { shippingCharges, freeShippingAbove });
            toast.success("Shipping charges updated successfully.");
            set({ shippingCharges, freeShippingAbove });
        }
        catch (error) {
            consoleError("updateShippingSettings (Store Store)", error);
            toast.error(error.response?.data?.message || "Internal Server Error.");
        }
        finally { set({ isUpdatingShippingSettings: false }); }
    },


}));

export default useStoreStore;