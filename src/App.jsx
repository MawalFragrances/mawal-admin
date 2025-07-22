import { Toaster } from "react-hot-toast";
import AdminLogin from "./pages/AdminLogin";
import useAuthStore from "./zustand/auth.store";
import AdminPortal from "./pages/AdminPortal";
import { useEffect, useState } from "react";
import useComponentStore from "./zustand/component.store";
import AddNewProduct from "./components/AddNewProduct";
import useProductStore from "./zustand/product.store";
import ViewOrderDetails from "./components/ViewOrderDetails";
import Confirmation from "./components/Confirmation";
import UpdateProduct from "./components/UpdateProduct";
import VerifyEmail from "./pages/VerifyEmail";
import { Routes, Route } from "react-router-dom";
import AddNewAdmin from "./components/AddNewAdmin";
import { requestFCMToken } from "./lib/firebase";
import axiosInstance from "./lib/axios";
import ViewReview from "./components/ViewReview";
import useReviewStore from "./zustand/review.store";
import AddNewCoupon from "./components/AddNewCoupon";
import useStoreStore from "./zustand/store.store";
import UpdateProductOption from "./components/UpdateProductOption";

export default function App() {

  // eslint-disable-next-line no-unused-vars
  const [fcmToken, setFcmToken] = useState(null);

  const { reviewToView } = useReviewStore();
  const { displayAddNewCoupon } = useStoreStore();
  const { orderToView, productToUpdate, productOptionToUpdate, displayAddNewProduct } = useProductStore();
  const { authenticatedAdmin, checkAuth, isCheckingAuth } = useAuthStore();
  const { displayConfirmation, displayAddNewAdmin } = useComponentStore();

  useEffect(() => { checkAuth(); }, [checkAuth]);

  useEffect(() => {
    (async () => {
      if (authenticatedAdmin) {
        const token = await requestFCMToken();
        setFcmToken(token);

        if (token) {
          await axiosInstance.post(`/api/v1/admin/manage-fcm-token`, { token });
        }
      }
    })();
  }, [authenticatedAdmin]);

  // Run once when page loads
  useEffect(() => {
    sessionStorage.setItem("isRefreshing", "false");

    const markAsRefreshing = () => {
      sessionStorage.setItem("isRefreshing", "true");
    };

    window.addEventListener("beforeunload", markAsRefreshing);

    return () => window.removeEventListener("beforeunload", markAsRefreshing);
  }, []);


  if (isCheckingAuth) return <LoadWebsite />

  return (
    <>

      <Toaster position="top-right"
        toastOptions={{
          style: { background: "#333", color: "#fff" },
          duration: 3000,
        }}
      />

      {displayAddNewAdmin && <AddNewAdmin />}
      {orderToView && <ViewOrderDetails />}
      {productToUpdate && <UpdateProduct />}
      {productOptionToUpdate && <UpdateProductOption />}
      {displayConfirmation && <Confirmation />}
      {displayAddNewProduct && <AddNewProduct />}
      {reviewToView && <ViewReview />}
      {displayAddNewCoupon && <AddNewCoupon />}



      <Routes>
        <Route path="/"
          element={authenticatedAdmin ? <AdminPortal /> : <AdminLogin />}
        />
        <Route path="/verify-email"
          element={<VerifyEmail />}
        />
      </Routes>

    </>
  )
}

function LoadWebsite() {
  return (
    <div className="flex-1 min-h-screen">
      <div className="w-full h-20 bg-gray-200 animate-pulse border-b border-gray-500" />

      <div className="flex">

        <div className="w-60 h-[calc(100vh-80px)] space-y-4 p-5 bg-gray-100" >
          <div className="w-full h-14 bg-gray-200 animate-pulse rounded-full" />
          <div className="w-full h-14 bg-gray-200 animate-pulse rounded-full" />
          <div className="w-full h-14 bg-gray-200 animate-pulse rounded-full" />
          <div className="w-full h-14 bg-gray-200 animate-pulse rounded-full" />
        </div>

        <div className="flex-1 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 p-5">
          <div className="bg-gray-200 h-44 rounded-xl animate-pulse" />
          <div className="bg-gray-200 h-44 rounded-xl animate-pulse" />
          <div className="bg-gray-200 h-44 rounded-xl animate-pulse" />

          <div className="bg-gray-200 h-80 rounded-xl animate-pulse col-span-3" />
        </div>


      </div>

    </div>
  )
}