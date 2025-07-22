import { signInWithPopup } from "firebase/auth";
import { create } from "zustand";
import { auth, googleProvider } from "../lib/firebase";
import axiosInstance from "../lib/axios";
import toast from "react-hot-toast";
import { consoleError } from "../utils/comman.utils";

const useAuthStore = create((set) => ({

    authenticatedAdmin: null,

    // FOR CHECKING ADMIN AUTHENTICATION
    isCheckingAuth: false,
    checkAuth: async () => {
        set({ isCheckingAuth: true });
        try {
            const response = await axiosInstance.get("/api/v1/admin-auth/check-auth");
            set({ authenticatedAdmin: response?.data?.data });
        }
        catch (error) {
            set({ error });
            set({ authenticatedAdmin: null });
        }
        finally {
            set({ isCheckingAuth: false });
        }
    },

    // LOGIN WITH GOOGLE
    loginWithGoogle: async (role, navigateTo) => {
        try {
            const result = await signInWithPopup(auth, googleProvider);

            const response = await axiosInstance.get(`/api/v1/admin-auth/login-with-google?email=${result?.user?.email}&role=${role}`);
            set({ authenticatedAdmin: response?.data?.data });
            sessionStorage.setItem("email", result?.user?.email);

            toast.success(response?.data?.message);

            navigateTo("/verify-email");
        }
        catch (error) {
            consoleError("loginWithGoogle (auth.store)", error);
            toast.error(error.response?.data?.message || "Internal Server Error.");
        }
    },

    // VERIFY OTP
    verifyOtp: async (otp, navigateTo) => {
        try {
            const email = sessionStorage.getItem("email");
            if (!email) return toast.error("Email not found.");

            const response = await axiosInstance.get(`/api/v1/admin-auth/verify-otp?email=${email}&otp=${otp.toString()}`);

            sessionStorage.removeItem("email");
            set({ authenticatedAdmin: response?.data?.data });

            toast.success(response?.data?.message);

            navigateTo("/");
        }
        catch (error) {
            consoleError("verifyOtp (auth.store)", error);
            toast.error(error.response?.data?.message || "Internal Server Error.");
        }
    },

    // LOGOUT ADMIN
    logoutAdmin: async () => {
        try {
            const response = await axiosInstance.get("/api/v1/admin-auth/logout-admin");
            toast.success(response?.data?.message);
            set({ authenticatedAdmin: null });
        }
        catch (error) {
            consoleError("logoutAdmin function (zustand)", error);
            toast.error(error.response?.data?.message);
        }
    },

}));

export default useAuthStore;