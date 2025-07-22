import { create } from "zustand";
import axiosInstance from "../lib/axios";
import { consoleError } from "../utils/comman.utils";
import toast from "react-hot-toast";


const useLogStore = create(() => ({

    logAdminLogin: async (name, email) => {
        if (sessionStorage.getItem("admin-logged-in")) return;
        sessionStorage.setItem("admin-logged-in", "true");
        try {
            const response = await axiosInstance.post("/api/v1/admin-logs/log-admin-login", { name, email });
            toast.success(response.data.message);
        } catch (error) {
            consoleError(error, "logAdminLogin");
            toast.error("Failed to log admin login");
        }
    },

    logAdminLogout: async (name, email) => {
        if (!sessionStorage.getItem("admin-logged-in")) return;
        sessionStorage.removeItem("admin-logged-in");
        try {
            const response = await axiosInstance.post("/api/v1/admin-logs/log-admin-logout", { name, email });
            toast.success(response.data.message);
        } catch (error) {
            consoleError(error, "logAdminLogout");
            toast.error("Failed to log admin logout");
        }
    },

}));

export default useLogStore;