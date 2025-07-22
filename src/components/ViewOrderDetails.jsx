import {
    X,
    Package,
    User,
    MapPin,
    Phone,
    Mail,
    Building,
    CreditCard,
    Clock,
    CheckCircle,
    AlertCircle,
    Truck,
    Calendar,
    DollarSign,
    Hash
} from "lucide-react";
import useOrderStore from "../zustand/order.store";

export default function ViewOrderDetails() {

    const { viewOrderDetails: order, setViewOrderDetails } = useOrderStore();

    const getStatusColor = (status) => {
        const colors = {
            PENDING: "bg-yellow-100 text-yellow-800",
            CONFIRMED: "bg-blue-100 text-blue-800",
            PACKED: "bg-purple-100 text-purple-800",
            SHIPPED: "bg-indigo-100 text-indigo-800",
            DELIVERED: "bg-green-100 text-green-800",
            CANCELLED: "bg-red-100 text-red-800"
        };
        return colors[status] || "bg-gray-100 text-gray-800";
    };

    const getStatusIcon = (status) => {
        const icons = {
            PENDING: <Clock className="w-4 h-4" />,
            CONFIRMED: <CheckCircle className="w-4 h-4" />,
            PACKED: <Package className="w-4 h-4" />,
            SHIPPED: <Truck className="w-4 h-4" />,
            DELIVERED: <CheckCircle className="w-4 h-4" />,
            CANCELLED: <AlertCircle className="w-4 h-4" />
        };
        return icons[status] || <Clock className="w-4 h-4" />;
    };

    const handleClose = () => {
        setViewOrderDetails(null);
    };

    const formatDate = (dateString) => {
        return new Date(dateString).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    return (
        <div className="fixed inset-0 bg-black/50 min-h-screen p-4 z-[900]">
            <div className="animate-themeAnimationLg relative max-w-6xl mx-auto bg-white rounded-xl shadow-md overflow-y-auto h-full searchscrollbar z-[901]">

                <button
                    onClick={handleClose}
                    className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-1 transition-colors z-10"
                >
                    <X className="w-6 h-6" />
                </button>

                {/* Header */}
                <div className="bg-gradient-to-r from-emerald-600 to-teal-500 px-6 py-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <h1 className="text-white text-2xl font-bold flex items-center gap-2">
                                <Hash className="w-6 h-6" />
                                Order #{order?.orderNumber}
                            </h1>
                            <p className="text-emerald-100 mt-1">Order details and tracking information</p>
                        </div>
                        <div className={`px-4 py-2 rounded-full flex items-center gap-2 ${getStatusColor(order?.status)}`}>
                            {getStatusIcon(order?.status)}
                            <span className="font-semibold">{order?.status}</span>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-gray-50 space-y-6">

                    {/* Order Summary Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-emerald-100 rounded-lg">
                                    <Calendar className="w-5 h-5 text-emerald-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Order Date</p>
                                    <p className="font-semibold text-gray-900">{formatDate(order?.createdAt)}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <CreditCard className="w-5 h-5 text-blue-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Payment Method</p>
                                    <p className="font-semibold text-gray-900">{order?.paymentMethod}</p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-200">
                            <div className="flex items-center gap-3">
                                <div className="p-2 bg-green-100 rounded-lg">
                                    <DollarSign className="w-5 h-5 text-green-600" />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-600">Order Total</p>
                                    <p className="font-semibold text-gray-900">${order?.orderTotal?.toFixed(2)}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Main Content Grid */}
                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                        {/* Customer Information */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="bg-gradient-to-r from-emerald-600 to-teal-500 px-6 py-4 rounded-t-lg">
                                <h2 className="text-white text-lg font-semibold flex items-center gap-2">
                                    <User className="w-5 h-5" />
                                    Customer Information
                                </h2>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                                        <p className="text-gray-900 font-medium">{order?.user?.firstName}</p>
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                                        <p className="text-gray-900 font-medium">{order?.user?.lastName}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-2 text-gray-700">
                                    <Mail className="w-4 h-4 text-gray-400" />
                                    <span>{order?.user?.email}</span>
                                </div>

                                <div className="flex items-center gap-2 text-gray-700">
                                    <Phone className="w-4 h-4 text-gray-400" />
                                    <span>{order?.user?.phone}</span>
                                </div>

                                {order?.user?.whatsappNumber && (
                                    <div className="flex items-center gap-2 text-gray-700">
                                        <Phone className="w-4 h-4 text-green-500" />
                                        <span>WhatsApp: {order?.user?.whatsappNumber}</span>
                                    </div>
                                )}
                            </div>
                        </div>

                        {/* Shipping Address */}
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="bg-gradient-to-r from-emerald-600 to-teal-500 px-6 py-4 rounded-t-lg">
                                <h2 className="text-white text-lg font-semibold flex items-center gap-2">
                                    <MapPin className="w-5 h-5" />
                                    Shipping Address
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="space-y-2 text-gray-700">
                                    <p className="font-medium">{order?.user?.firstName} {order?.user?.lastName}</p>
                                    <p>{order?.user?.shippingAddress?.address}</p>
                                    <p>{order?.user?.shippingAddress?.city}</p>
                                    {order?.user?.shippingAddress?.state && (
                                        <p>{order?.user?.shippingAddress?.state}</p>
                                    )}
                                    {order?.user?.shippingAddress?.zipCode && (
                                        <p>{order?.user?.shippingAddress?.zipCode}</p>
                                    )}
                                    <p>{order?.user?.shippingAddress?.country}</p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Billing Address - Only show if different from shipping */}
                    {!order?.user?.sameAsShipping && (
                        <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                            <div className="bg-gradient-to-r from-emerald-600 to-teal-500 px-6 py-4 rounded-t-lg">
                                <h2 className="text-white text-lg font-semibold flex items-center gap-2">
                                    <Building className="w-5 h-5" />
                                    Billing Address
                                </h2>
                            </div>
                            <div className="p-6">
                                <div className="space-y-2 text-gray-700">
                                    <p className="font-medium">{order?.user?.firstName} {order?.user?.lastName}</p>
                                    <p>{order?.user?.billingAddress?.address}</p>
                                    <p>{order?.user?.billingAddress?.city}</p>
                                    {order?.user?.billingAddress?.state && (
                                        <p>{order?.user?.billingAddress?.state}</p>
                                    )}
                                    {order?.user?.billingAddress?.zipCode && (
                                        <p>{order?.user?.billingAddress?.zipCode}</p>
                                    )}
                                    <p>{order?.user?.billingAddress?.country}</p>
                                </div>
                            </div>
                        </div>
                    )}

                    {/* Order Items */}
                    <div className="bg-white rounded-lg shadow-sm border border-gray-200">
                        <div className="bg-gradient-to-r from-emerald-600 to-teal-500 px-6 py-4 rounded-t-lg">
                            <h2 className="text-white text-lg font-semibold flex items-center gap-2">
                                <Package className="w-5 h-5" />
                                Order Items ({order?.products?.length})
                            </h2>
                        </div>
                        <div className="p-6">
                            <div className="space-y-4">
                                {order?.products?.map((item, index) => (
                                    <div key={index} className="flex items-center gap-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                                        <div className="w-20 h-20 bg-white rounded-lg border border-gray-200 overflow-hidden flex-shrink-0">
                                            <img
                                                src={item?.productId?.images?.[0]}
                                                alt={item?.productId?.name}
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <h3 className="font-semibold text-gray-900">{item?.productId?.name}</h3>
                                            <p className="text-gray-600">Quantity: {item?.quantity}</p>
                                            <p className="text-emerald-600 font-semibold">${item?.price?.toFixed(2)} each</p>
                                        </div>
                                        <div className="text-right">
                                            <p className="text-lg font-bold text-gray-900">
                                                ${(item?.price * item?.quantity).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {/* Order Total */}
                            <div className="mt-6 pt-4 border-t border-gray-200">
                                <div className="flex justify-between items-center">
                                    <span className="text-lg font-semibold text-gray-900">Order Total:</span>
                                    <span className="text-2xl font-bold text-emerald-600">${order?.orderTotal?.toFixed(2)}</span>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}