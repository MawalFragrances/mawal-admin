import Orders from "./Orders";
import Reviews from "./Reviews";
import Products from "./Products";
import Overview from "./Overview";
import Analytics from "./Analytics";
import ManageStore from "./ManageStore";
import ManageAdmins from "./ManageAdmins";
import { useEffect, useState } from "react";
import useAuthStore from "../zustand/auth.store";
import useOrderStore from "../zustand/order.store";
import useReviewStore from "../zustand/review.store";
import useProductStore from "../zustand/product.store";
import { useOverviewStore } from "../zustand/overview.store";
import { simpleAdminTabs, superAdminTabs } from "../constants";
import { ShoppingCart, Menu, LogOut, Home } from "lucide-react";

export default function AdminPortal() {

    const { authenticatedAdmin } = useAuthStore();
    const [adminTabs, setAdminTabs] = useState([]);
    const { pendingOrdersCount } = useOrderStore();
    const { pendingReviewsCount } = useReviewStore();
    const { lowStockProductsCount } = useProductStore();
    const [sidebarOpen, setSidebarOpen] = useState(true);
    const [activeTab, setActiveTab] = useState("overview");
    const { getOverviewDataAndSidebarCounts } = useOverviewStore();

    // GET OVERVIEW DATA AND SIDEBAR COUNTS
    useEffect(() => {
        getOverviewDataAndSidebarCounts();
    }, [getOverviewDataAndSidebarCounts]);

    // SET ADMIN TABS ON ROLE CHANGE
    useEffect(() => {
        if (authenticatedAdmin?.role === "Super Admin") setAdminTabs(superAdminTabs);
        else if (authenticatedAdmin?.role === "Admin") setAdminTabs(simpleAdminTabs);
        else setAdminTabs([]);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div className="min-h-screen bg-gray-50">
            {/* HEADER */}
            <AdminHeader
                sidebarOpen={sidebarOpen}
                setSidebarOpen={setSidebarOpen}
            />
            <div className="flex">
                {/* SIDEBAR */}
                <aside className={`${sidebarOpen ? "w-60" : "w-[90px]"} transition-all duration-300 bg-white/70 backdrop-blur-xl border-r border-gray-200 min-h-screen`}>
                    <nav className="sticky top-20 p-4 space-y-2 max-h-[90vh] overflow-y-auto scrollbar pb-10">
                        {adminTabs.map((item) => (
                            <button key={item.id}
                                onClick={() => setActiveTab(item.id)}
                                className={`relative w-full flex items-center space-x-3 px-4 py-3 rounded-xl transition-all duration-200 
                                    ${activeTab === item.id
                                        ? "bg-gradient-to-r from-gray-700 to-gray-500 text-white shadow-lg shadow-gray-500/25"
                                        : "text-slate-600 hover:bg-gray-50 hover:text-gray-700"
                                    }`}>
                                <item.icon size={24} className="flex-shrink-0" />
                                {sidebarOpen && <span className="font-medium text-nowrap">{item.label}</span>}
                                {(item.id === "orders" || item.id === "products" || item.id === "reviews") && (
                                    <span className={`absolute ${sidebarOpen ? "right-4 text-sm" : "right-2 top-1 text-[11px]"} font-medium`}>
                                        {item.id === "orders" && pendingOrdersCount}
                                        {item.id === "reviews" && pendingReviewsCount}
                                        {item.id === "products" && lowStockProductsCount}
                                    </span>
                                )}
                            </button>
                        ))}
                    </nav>
                </aside>
                {activeTab === "orders" && <Orders />}
                {activeTab === "reviews" && <Reviews />}
                {activeTab === "products" && <Products />}
                {activeTab === "analytics" && <Analytics />}
                {activeTab === "manage-store" && <ManageStore />}
                {activeTab === "manage-admins" && <ManageAdmins />}
                {activeTab === "overview" && <Overview setActiveTab={setActiveTab} />}
            </div>
        </div >
    );
}
function AdminHeader({
    sidebarOpen,
    setSidebarOpen
}) {
    const { authenticatedAdmin, logoutAdmin } = useAuthStore();
    return (
        <header className="bg-white/80 backdrop-blur-xl border-b border-gray-200 sticky top-0 z-50">
            <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center space-x-4">
                    <button onClick={() => setSidebarOpen(!sidebarOpen)}
                        className="p-2 rounded-xl bg-black/5 text-black hover:bg-black/10 transition-all duration-200">
                        <Menu size={20} />
                    </button>
                    <div className="flex items-center space-x-3">
                        <div className="w-10 h-10 bg-gradient-to-r from-gray-700 to-gray-500 rounded-xl flex items-center justify-center">
                            <ShoppingCart className="text-white" size={20} />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent">
                                MawalAdmin
                            </h1>
                            <p className="text-sm text-black font-semibold">
                                {authenticatedAdmin?.name}
                                <span className="text-xs text-gray-500 ml-1">({authenticatedAdmin?.email})</span>
                            </p>
                        </div>
                    </div>
                </div>
                <div className="flex items-center space-x-3 ">

                    <a href={import.meta.env.VITE_MAWAL_URL} target="_blank"
                        className="group text-gray-500 hover:text-gray-700 transition-all duration-200 flex items-center gap-1.5 font-semibold text-sm mr-2">
                        <Home className="h-5 w-5 text-gray-500 group-hover:text-gray-700 transition-all duration-200 " /> HOME
                    </a>

                    <div className="w-10 h-10 bg-gradient-to-r from-gray-700 to-gray-500 rounded-full flex items-center justify-center text-white font-semibold">
                        {authenticatedAdmin?.role === "admin" ? "A" : "SA"}
                    </div>

                    <div className="ml-3 border-l-2 border-slate-200 pl-3" >

                        <button onClick={logoutAdmin} className="flex items-center space-x-2 bg-gradient-to-r from-gray-700 to-gray-500 text-white px-4 py-2 rounded-md hover:shadow-lg hover:shadow-gray-500/25 transition-all duration-200">
                            <LogOut size={20} />
                            <span className="font-medium ">Logout</span>
                        </button>

                    </div>

                </div>
            </div>
        </header>
    );
}