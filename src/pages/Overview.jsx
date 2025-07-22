import { useEffect } from "react";
import useAuthStore from "../zustand/auth.store";
import useComponentStore from "../zustand/component.store";
import DashboardLoader from "../components/DashboardLoader";
import { useOverviewStore } from "../zustand/overview.store";
import { ShoppingCart, Users, Package, Eye, Activity, DollarSign } from "lucide-react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function Overview({
    setActiveTab,
}) {

    const { authenticatedAdmin } = useAuthStore();
    const { setDisplayAddNewProduct } = useComponentStore();
    const {
        totalOrders, totalRevenue, totalCustomers, recentOrders, topProducts, isGettingOverviewDataAndSidebarCounts
    } = useOverviewStore();

    useEffect(() => { window.scrollTo(0, 0) }, []);

    if (isGettingOverviewDataAndSidebarCounts) return <DashboardLoader />;

    return (
        <main className="animate-themeAnimationLg flex-1 p-6 space-y-6">

            {/* WELCOME SECTION */}
            <div className="flex flex-col justify-center py-5">
                <div className="flex items-center gap-2">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent">
                        Welcome back, {authenticatedAdmin?.name}!
                    </h1>
                    <span className="text-4xl">👋</span>
                </div>
                <p className="text-gray-600 mt-2">Here&apos;s what&apos;s happening with your store today.</p>
            </div>

            {/* TOTAL ORDERS REVENUE & CUSTOMERS */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                <OverviewStatsCard stat={{
                    value: totalOrders?.toLocaleString(),
                    title: "Total Orders",
                    icon: ShoppingCart
                }} />

                <OverviewStatsCard stat={{
                    value: `PKR ${totalRevenue?.toLocaleString()}`,
                    title: "Total Revenue",
                    icon: DollarSign
                }} />

                <OverviewStatsCard stat={{
                    value: totalCustomers?.toLocaleString(),
                    title: "Total Customers",
                    icon: Users
                }} />

            </div>


            {/* RECENT ORDERS & TOP PRODUCTS */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

                {/* RECENT ORDERS */}
                <div className="shadow-lg col-span-2 bg-white/70 backdrop-blur-sm rounded-2xl py-6 border border-white/50">

                    <div className="flex items-center justify-between mb-2 border-b pb-3 px-6">

                        <h3 className="text-xl font-bold text-slate-800">Recent Orders</h3>

                        <button onClick={() => setActiveTab("orders")}
                            className="px-4 py-2 bg-gradient-to-r from-gray-700 to-gray-500 text-white rounded-md font-medium hover:shadow-lg hover:shadow-gray-500/25 transition-all duration-200">
                            View All
                        </button>

                    </div>

                    <div className="space-y-4 px-2">
                        {recentOrders?.length > 0 ? (
                            recentOrders?.slice(0, 5).map((order, index) => (
                                <RecentOrdersCard
                                    key={index}
                                    order={order}
                                />
                            ))
                        ) : (
                            <>
                                <div className="bg-gradient-to-r from-gray-200 to-gray-100 w-24 h-24 mt-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <ShoppingCart className="w-12 h-12 text-gray-600" />
                                </div>
                                <div className="text-center text-slate-500">No recent orders found</div>
                            </>
                        )}
                    </div>

                </div>

                {/* TOP PRODUCTS */}
                <div className="shadow-lg bg-white/70 backdrop-blur-sm rounded-2xl py-6 border border-white/50">

                    <h3 className="text-xl font-bold text-slate-800 mb-1 px-4 border-b pb-3">Top Products</h3>

                    <div className="space-y-4">
                        {topProducts?.length > 0 ? (
                            topProducts?.map((product, index) => (
                                <TopProductsCard
                                    key={index}
                                    product={product}
                                />
                            ))
                        ) : (
                            <>
                                <div className="bg-gradient-to-r from-gray-200 to-gray-100 w-24 h-24 mt-20 rounded-full flex items-center justify-center mx-auto mb-4">
                                    <Package className="w-12 h-12 text-gray-600" />
                                </div>
                                <div className="text-center text-slate-500">No top products found</div>
                            </>
                        )}
                    </div>

                </div>

            </div>

            {/* QUICK ACTIONS */}
            <div className="shadow-lg bg-white/70 backdrop-blur-sm rounded-2xl p-6 border border-white/50">

                <h3 className="text-xl font-bold text-slate-800 mb-6">Quick Actions</h3>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {[
                        { icon: Package, label: "Add Product", onClick: () => setDisplayAddNewProduct(true) },
                        { icon: Activity, label: "View Analytics", onClick: () => setActiveTab("analytics") },
                        { icon: Eye, label: "Site Preview", onClick: () => window.open(import.meta.env.VITE_MAWAL_URL, "_blank") },
                    ].map((action, index) => (

                        <button key={index} onClick={action.onClick} className="group p-6 bg-slate-50/50 rounded-xl hover:bg-white hover:shadow-lg transition-all duration-200 text-center">

                            <div className={`w-12 h-12 bg-gradient-to-r from-gray-700 to-gray-500 rounded-xl flex items-center justify-center mx-auto mb-3 group-hover:scale-110 transition-transform duration-200`}>
                                <action.icon className="text-white" size={24} />
                            </div>

                            <p className="font-medium text-slate-700">{action.label}</p>
                        </button>

                    ))}
                </div>

            </div>

        </main>
    )
}

function OverviewStatsCard({
    stat
}) {
    return (
        <div className="bg-white rounded-xl p-6 shadow-lg border border-emerald-100 hover:shadow-xl transition-shadow duration-300">
            <div className="flex items-center justify-between">
                <div className="space-y-2">
                    <p className="text-gray-600 text-sm font-medium">{stat?.title}</p>
                    <p className="text-3xl font-bold text-gray-700">{stat?.value}</p>
                </div>
                <div className="bg-gray-100 p-3 rounded-full">
                    <stat.icon className="w-6 h-6 text-gray-700" />
                </div>
            </div>
        </div>
    )
}
function RecentOrdersCard({
    order
}) {

    return (
        <div className="flex items-center justify-between p-4 bg-slate-50/50 rounded-xl hover:bg-teal-50/50 transition-colors duration-200">

            <div className="flex items-center space-x-4">

                <div className="w-10 h-10 bg-gradient-to-r from-gray-700 to-gray-500 rounded-lg flex items-center justify-center text-white font-semibold text-sm">
                    {order?.user?.firstName?.charAt(0) + order?.user?.lastName?.charAt(0)}
                </div>

                <div>
                    <p className="font-semibold text-slate-800">{order?.user?.firstName} {order?.user?.lastName}</p>

                    <p className="text-sm text-slate-500"> M - {order?.orderNumber} • {dayjs(order?.createdAt).fromNow()}</p>
                </div>

            </div>

            <div className="text-right">

                <p className="font-bold text-slate-800">PKR {order?.orderTotal?.toLocaleString()}</p>

                <span className={`inline-block px-3 py-1 rounded-full text-xs font-medium ${order?.status === "Completed" ? "bg-gray-100 text-gray-700" :
                    order?.status === "Processing" ? "bg-yellow-100 text-yellow-700" :
                        order?.status === "Shipped" ? "bg-blue-100 text-blue-700" :
                            "bg-slate-100 text-slate-700"
                    }`}>
                    {order?.status}
                </span>

            </div>

        </div>

    )
}
function TopProductsCard({
    product
}) {
    return (

        <div className="flex items-center justify-between p-3 bg-slate-50/50 rounded-xl hover:bg-teal-50/50 transition-colors duration-200">

            <div className="flex gap-3">

                <img src={product?.images[0]}
                    alt={product?.name}
                    className="w-14 h-16 rounded-lg"
                />

                <div className="flex flex-col space-y-1 mt-1">

                    <p className="font-semibold text-slate-800 text-sm">{product.name}</p>

                    <span className="text-sm text-slate-500">{product.totalSold} sold</span>

                </div>

            </div>

            <div className="text-right">
                <p className="font-bold text-teal-600 text-sm">{product.revenue}</p>
            </div>

        </div>
    )
}