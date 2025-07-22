import { useEffect, useState } from "react";
import { Select } from "../components/Inputs";
import MapOrders from "../components/MapOrders";
import { orderStatusFilters } from "../constants";
import useOrderStore from "../zustand/order.store";
import { ThemeButton } from "../components/Buttons";
import DashboardLoader from "../components/DashboardLoader";
import { Search, Package, Clock, CheckCircle } from "lucide-react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

export default function Orders() {

    const [page, setPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [selectedStatus, setSelectedStatus] = useState("ALL");

    const {
        // VARIABLES
        totalOrdersCount,
        pendingOrdersCount,
        completedOrdersCount,
        orders,
        // FUNCTIONS
        getOrdersData,
        loadMoreOrders,
        fetchOrdersByStatus,
        ordersByStatus,
        totalOrdersByStatus,
        fetchOrdersByNo,
        setOrderByNo,
        isGettingOrdersByNo,
        isLoadingMoreOrders,
        isGettingOrdersData
    } = useOrderStore();

    useEffect(() => { getOrdersData(); }, [getOrdersData]);

    async function handleLoadMoreOrders() {
        const nextPage = page + 1;
        setPage(nextPage);
        await loadMoreOrders(nextPage);
    }

    useEffect(() => {
        if (selectedStatus === "ALL") return;
        fetchOrdersByStatus(selectedStatus, 1);
    }, [selectedStatus, fetchOrdersByStatus]);

    useEffect(() => {
        if (searchTerm === "") setOrderByNo(null);
    }, [searchTerm, setOrderByNo]);

    useEffect(() => { window.scrollTo(0, 0); }, []);

    if (isGettingOrdersData) return <DashboardLoader />;

    return (
        <div className="animate-themeAnimationLg min-h-screen flex-1 p-6">

            <div className="max-w-7xl mx-auto">

                {/* Header */}
                <div className="mb-8">
                    <div className="pt-5 pb-10">
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent">
                            Order Management
                        </h1>
                        <p className="text-gray-600 mt-2">Manage and track all your orders in one place</p>
                    </div>

                    {/* Stats Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">

                        <OrderStatsCard
                            title="Total Orders"
                            value={totalOrdersCount?.toLocaleString() || 0}
                            icon={Package}
                        />

                        <OrderStatsCard
                            title="Pending Orders"
                            value={pendingOrdersCount?.toLocaleString() || 0}
                            icon={Clock}
                        />

                        <OrderStatsCard
                            title="Completed Orders"
                            value={completedOrdersCount?.toLocaleString() || 0}
                            icon={CheckCircle}
                        />

                    </div>

                </div>

                {/* Search and Filters */}
                <div className="bg-white/80 backdrop-blur-sm rounded-2xl p-6 border shadow-lg mb-8 flex flex-col md:flex-row gap-4 items-center justify-between">

                    <div className="flex items-center gap-4 max-w-md flex-1">
                        <div className="relative flex-1 ">
                            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                            <input
                                type="search"
                                placeholder="Search order by number"
                                className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 focus:border-transparent transition-all duration-200"
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                            />
                        </div>
                        {searchTerm && (
                            <button className="bg-gradient-to-r from-gray-700 to-gray-500 text-white font-bold px-4 py-2 rounded-md"
                                disabled={isGettingOrdersByNo}
                                onClick={() => fetchOrdersByNo(searchTerm)}
                            >
                                Search
                            </button>
                        )}
                    </div>

                    <div className="w-56">
                        <Select
                            label="OrderStatus"
                            options={orderStatusFilters}
                            value={selectedStatus}
                            onChange={(e) => setSelectedStatus(e.target.value)}
                        />
                    </div>

                </div>

            </div>

            {/* Orders Table */}
            <div className="bg-white/80 backdrop-blur-sm rounded-2xl border shadow-lg  ">

                <table className="w-full">

                    <thead className="bg-gradient-to-r from-gray-100 to-gray-100">
                        <tr>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Order No</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Customer</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Status</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Total</th>
                            <th className="px-6 py-4 text-left text-sm font-semibold text-gray-700">Date</th>
                            <th className="px-6 py-4 text-center text-sm font-semibold text-gray-700">Actions</th>
                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">

                        <MapOrders
                            searchQuery={searchTerm}
                            selectedStatus={selectedStatus}
                        />

                    </tbody>

                </table>

            </div>

            {searchTerm === "" && (
                <div className="mt-8 flex items-center justify-between">


                    <div className="text-sm text-gray-600">
                        {selectedStatus === "ALL" ?
                            `Showing ${orders?.length?.toLocaleString()} of ${totalOrdersCount?.toLocaleString()} orders`
                            :
                            `Showing ${ordersByStatus?.length?.toLocaleString()} of ${totalOrdersByStatus?.toLocaleString()} ${selectedStatus?.toLowerCase()} orders`}
                    </div>

                    <ThemeButton
                        btnLabel="Load More"
                        onClick={handleLoadMoreOrders}
                        isButtonLoading={isLoadingMoreOrders}
                        isButtonDisabled={orders?.length >= totalOrdersCount || isLoadingMoreOrders}
                        extraClasses="bg-gradient-to-r from-gray-700 to-gray-500 text-white font-bold max-w-40"
                    />

                </div>
            )}

        </div>

    );
};

function OrderStatsCard({
    title,
    value,
    // eslint-disable-next-line no-unused-vars
    icon: Icon,
}) {
    return (
        <div className="bg-white/80 backdrop-blur-sm rounded-xl p-6 border shadow-lg hover:shadow-xl transition-all duration-300 hover:transform hover:scale-105">

            <div className="flex items-center justify-between">

                <div>
                    <p className="text-gray-600 text-sm font-medium">{title}</p>
                    <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
                </div>

                <div className="p-3 rounded-xl bg-gradient-to-r from-gray-700 to-gray-500">
                    <Icon className="w-6 h-6 text-white" />
                </div>

            </div>

        </div>
    )
}


