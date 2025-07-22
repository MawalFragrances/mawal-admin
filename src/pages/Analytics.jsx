// REACT
import { useEffect } from "react";
// ICONS
import { PieChart } from "lucide-react";
// COMPONENTS
import AnalyticsStatsCard from "../components/AnalyticsStatsCard.jsx";
// ZUSTAND STORES
import useAnalyticsStore from "../zustand/analytics.store";
// CHARTJS
import { Line } from "react-chartjs-2";
import {
    Chart as ChartJS, CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend
} from "chart.js";
import DashboardLoader from "../components/DashboardLoader.jsx";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

export default function Analytics() {

    const { totalSalesByRange, totalOrdersByRange, totalCustomersByRange, getTotalOrders, getTotalCustomers, getTotalSales, lastYearSales, totalOrdersCount, totalRevenue, totalCustomersCount, getAnalyticsData, isGettingAnalyticsData } = useAnalyticsStore();

    const salesChartData = {
        labels: lastYearSales?.map(item => item.month),
        datasets: [{
            label: "Sales",
            data: lastYearSales?.map(item => item.totalSales),
            borderColor: "gray",
            backgroundColor: "black",
            tension: 0.4,
        },],
    };


    useEffect(() => { window.scrollTo(0, 0) }, []);

    useEffect(() => getAnalyticsData(), [getAnalyticsData]);

    if (isGettingAnalyticsData) return <DashboardLoader />

    return (
        <div className="animate-themeAnimationLg flex-1 p-6 space-y-10">

            <div >
                <div className="flex items-center space-x-2">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent">
                        Analytics
                    </h1>
                    <PieChart size={28} className="text-gray-700" />
                </div>
                <p className="text-gray-600 mt-2">Get real-time insights into your store&apos;s performance, sales trends, and customer behavior.</p>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">

                <AnalyticsStatsCard
                    label="Total Orders"
                    total={totalOrdersByRange}
                    getTotal={getTotalOrders}
                    allTimeTotal={totalOrdersCount}
                />
                <AnalyticsStatsCard
                    label="Total Revenue"
                    total={totalSalesByRange}
                    getTotal={getTotalSales}
                    allTimeTotal={totalRevenue}
                />
                <AnalyticsStatsCard
                    label="Total Customers"
                    total={totalCustomersByRange}
                    getTotal={getTotalCustomers}
                    allTimeTotal={totalCustomersCount}
                />
            </div>

            <div className="bg-white border-2 px-5 py-8 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold mb-2 text-center">
                    Last Year Sales
                </h1>
                {lastYearSales ? (
                    <div className="bg-white border-[1px] rounded-md p-5 max-w-[60vw] mx-auto">
                        <Line data={salesChartData} />
                    </div>
                ) : (
                    <p className="bg-white border-[1px] rounded-md p-5 max-w-[60vw] mx-auto text-center">
                        Unable to Load Sales Chart
                    </p>
                )}
            </div>

        </div>
    )
}
