import { create } from "zustand";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { consoleError } from "../utils/comman.utils";

const useAdminsStore = create((set, get) => ({

    admins: [],
    isGettingAdmins: false,
    getAdminsData: async () => {
        set({ isGettingAdmins: true });
        try {
            const response = await axiosInstance.get("/api/v1/admin/get-admins-data");
            set({ admins: response?.data?.data || [] });
        } catch (error) {
            consoleError("getAdminsData (Admins Store)", error);
            toast.error(error.response?.data?.message || "Internal Server Error.");
        } finally {
            set({ isGettingAdmins: false });
        }
    },

    isAddingNewAdmin: false,
    addNewAdmin: async (adminData) => {
        set({ isAddingNewAdmin: true });
        try {
            const response = await axiosInstance.post("/api/v1/admin/add-new-admin", adminData);
            set({ admins: [...get().admins, response?.data?.data] });
            toast.success("Admin added successfully.");

        } catch (error) {
            consoleError("addNewAdmin (Admins Store)", error);
            toast.error(error.response?.data?.message || "Internal Server Error.");
        } finally {
            set({ isAddingNewAdmin: false });
        }
    },

    isDeletingAdmin: false,
    deleteAdmin: async (adminId) => {
        set({ isDeletingAdmin: true });
        try {
            await axiosInstance.delete(`/api/v1/admin/delete-admin/${adminId}`);
            set({ admins: get().admins.filter(admin => admin._id !== adminId) });
            toast.success("Admin deleted successfully.");
        } catch (error) {
            consoleError("deleteAdmin (Admins Store)", error);
            toast.error(error.response?.data?.message || "Internal Server Error.");
        } finally {
            set({ isDeletingAdmin: false });
        }
    }
}));

export default useAdminsStore;