
import { AlertCircle, CheckCircle, Clock, Edit, Eye, Package, Search, Trash2 } from "lucide-react";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import { orderStatusOptions } from "../constants";
import { useState } from "react";
import useComponentStore from "../zustand/component.store";
import useOrderStore from "../zustand/order.store";
import TableLoader from "./TableLoader";
dayjs.extend(relativeTime);

export default function MapOrders({
    searchQuery,
    selectedStatus
}) {

    const { orders, ordersByStatus, isGettingOrdersByStatus, isGettingOrdersByNo, orderByNo } = useOrderStore();

    if (isGettingOrdersByStatus || isGettingOrdersByNo) return <TableLoader />

    if (searchQuery !== "") return (
        <>
            <tr>
                <td colSpan={100}
                    className="text-lg font-bold px-5 py-4 border-b border-gray-300  text-gray-500 ">
                    <div className="flex items-center gap-2">
                        <Search />
                        Search Result
                    </div>
                </td>
            </tr>
            {orderByNo ? (
                <OrderRow order={orderByNo} />
            ) : (
                <tr>
                    <td colSpan={100}>
                        <div className="flex items-center justify-center py-20 gap-2">
                            <AlertCircle className="w-10 h-10 text-gray-400" />
                            <p className="text-gray-500">No order found</p>
                        </div>
                    </td>
                </tr>

            )}
        </>
    )

    if (selectedStatus !== "ALL") return (
        <>
            {ordersByStatus?.length > 0 ? (
                <>
                    {ordersByStatus?.map((order) => (
                        <OrderRow key={order._id} order={order} />
                    ))}
                </>
            ) : (
                <tr>
                    <td colSpan={100}>
                        <div className="flex items-center justify-center py-20 gap-2">
                            <AlertCircle className="w-10 h-10 text-gray-400" />
                            <p className="text-gray-500">No {selectedStatus?.toLowerCase()} orders found</p>
                        </div>
                    </td>
                </tr>
            )}
        </>
    )

    return (
        <>
            {orders?.length > 0 ? (
                <>
                    {orders?.map((order) => (
                        <OrderRow key={order._id} order={order} />
                    ))}
                </>
            ) : (
                <tr>
                    <td colSpan={100}>
                        <div className="flex items-center justify-center py-20 gap-2">
                            <AlertCircle className="w-10 h-10 text-gray-400" />
                            <p className="text-gray-500">No orders found</p>
                        </div>
                    </td>
                </tr>
            )}
        </>
    )
}

function OrderRow({
    order
}) {

    const { confirmAction } = useComponentStore();
    const { setOrderToView, deleteOrder } = useOrderStore();

    const getStatusColor = (status) => {
        const colors = {
            delivered: "bg-emerald-100 text-emerald-800 border-emerald-200",
            processing: "bg-teal-100 text-teal-800 border-teal-200",
            shipped: "bg-blue-100 text-blue-800 border-blue-200",
            pending: "bg-yellow-100 text-yellow-800 border-yellow-200",
            cancelled: "bg-red-100 text-red-800 border-red-200",
            confirmed: "bg-green-100 text-green-800 border-green-200"
        };
        return colors[status.toLowerCase()] || "bg-gray-100 text-gray-800 border-gray-200";
    };

    const getStatusIcon = (status) => {
        const icons = {
            delivered: CheckCircle,
            processing: Clock,
            shipped: Package,
            pending: AlertCircle,
            cancelled: AlertCircle,
            confirmed: CheckCircle
        };
        const Icon = icons[status.toLowerCase()] || AlertCircle;
        return <Icon className="w-4 h-4" />;
    };

    return (
        <tr key={order._id} className="hover:bg-gradient-to-r hover:from-emerald-25 hover:to-teal-25 transition-all duration-200 group">

            <td className="px-6 py-4">
                <span className="font-semibold text-gray-900">M-{order.orderNumber}</span>
            </td>

            <td className="px-6 py-4">
                <div>
                    <div className="font-medium text-gray-900">{order.user.firstName} {order.user.lastName}</div>
                    <div className="text-xs text-gray-500">{order.user.email}</div>
                </div>
            </td>

            <td className="px-6 py-4">
                <span className={`inline-flex items-center gap-1 px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(order.status)}`}>
                    {getStatusIcon(order.status)}
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1).toLowerCase()}
                </span>
            </td>

            <td className="px-6 py-4">
                <span className="font-semibold text-gray-900">PKR {order?.orderTotal?.toLocaleString()}</span>
            </td>

            <td className="px-6 py-4 text-gray-600">
                {dayjs(order?.createdAt).fromNow()}
            </td>

            <td className="px-6 py-4">

                <div className="flex items-center justify-center gap-2 transition-all duration-200">

                    <button onClick={() => setOrderToView(order)}
                        className="p-2 text-emerald-600 hover:bg-emerald-100 rounded-lg transition-all duration-200">
                        <Eye className="w-4 h-4" />
                    </button>

                    <EditButton order={order} />

                    <button onClick={() => {
                        const message = `Are you sure you want to delete this order?`;
                        confirmAction(message, "DELETE", () => deleteOrder(order._id));
                    }}
                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200">
                        <Trash2 className="w-4 h-4" />
                    </button>

                </div>

            </td>

        </tr>
    )
}

function EditButton({ order }) {


    const [isEditing, setIsEditing] = useState(false);
    const { changeOrderStatus } = useOrderStore();
    const { confirmAction } = useComponentStore();

    const handleStatusChange = async (status) => {
        await changeOrderStatus(order._id, status);
        setIsEditing(false);
    }

    return (
        <div className="relative">
            <button
                onClick={() => setIsEditing(true)}
                className="p-2 text-teal-600 hover:bg-teal-100 rounded-lg transition-all duration-200">
                <Edit className="w-4 h-4" />
            </button>
            {isEditing && (
                <>
                    <div className="fixed inset-0 bg-transparent z-40" onClick={() => setIsEditing(false)} />
                    <div className="absolute top-0 right-0 bg-white rounded-md divide-y-2 border border-gray-200 shadow-md z-[49]">
                        {orderStatusOptions.map((status) => (
                            <button key={status.value}
                                onClick={() => {
                                    const message = `Are you sure you want to change the status to ${status.label}?`;
                                    confirmAction(message, "Change Status", () => handleStatusChange(status.value));
                                }}
                                className={`w-full h-full flex items-center justify-center text-sm py-2 px-8 z-50 ${status.value === order.status ? "bg-teal-100" : "hover:bg-gray-100"}`}
                            >
                                {status.label}
                            </button>
                        ))}
                    </div>
                </>
            )}
        </div>
    )
}