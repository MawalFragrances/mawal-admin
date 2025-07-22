import { CirclePercent, Gem, MessageCircle, Save, Trash2, CirclePlus, AlertCircle, Truck } from "lucide-react";
import { useEffect, useState } from "react";
import useStoreStore from "../zustand/store.store";
import DashboardLoader from "../components/DashboardLoader";
import { ThemeButton } from "../components/Buttons";
import { TextArea } from "../components/Inputs";
import { Input } from "../components/Inputs";

export default function ManageStore() {

    const [tab, setTab] = useState("COUPONS");
    const { getStoreData, isGettingStoreData } = useStoreStore();

    useEffect(() => {
        window.scrollTo(0, 0);
        getStoreData();
    }, [getStoreData]);

    if (isGettingStoreData) return <DashboardLoader />;

    return (
        <div className="animate-themeAnimationLg min-h-screen flex-1 p-6">

            <div className="flex flex-col justify-center py-5">
                <div className="flex items-center gap-2">
                    <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent">
                        Manage Store
                    </h1>
                </div>
                <p className="text-gray-600 mt-2">Manage your store settings, promotions, coupons, and more.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                <button onClick={() => setTab("COUPONS")}
                    className={`flex items-center gap-2 p-6 border border-gray-200 h-32 px-6 rounded-lg transition-all font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${tab === "COUPONS" ? "bg-gray-700 text-white" : "bg-white text-gray-700"}`}
                >
                    <CirclePercent size={30} />
                    Manage Coupons
                </button>

                <button onClick={() => setTab("PROMOTIONS")}
                    className={`flex items-center gap-2 p-6 border border-gray-200 h-32 px-6 rounded-lg transition-all font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${tab === "PROMOTIONS" ? "bg-gray-700 text-white" : "bg-white text-gray-700"}`}
                >
                    <Gem size={30} />
                    Manage Promotions
                </button>

                <button onClick={() => setTab("SHIPPING_CHARGES")}
                    className={`flex items-center gap-2 p-6 border border-gray-200 h-32 px-6 rounded-lg transition-all font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 ${tab === "SHIPPING_CHARGES" ? "bg-gray-700 text-white" : "bg-white text-gray-700"}`}
                >
                    <Truck className="w-5 h-5" />
                    Manage Shipping Charges
                </button>

            </div>

            {tab === "COUPONS" && <Coupons />}
            {tab === "PROMOTIONS" && <PromotionMessages />}
            {tab === "SHIPPING_CHARGES" && <ShippingCharges />}

        </div>
    );
}

function Coupons() {
    const { coupons, deleteCoupon, setDisplayAddNewCoupon } = useStoreStore();

    return (
        <div className="bg-white rounded-2xl shadow-xl py-8 px-4 border border-gray-200 w-full">

            <table className="w-full">
                <thead>
                    <tr className="text-left bg-gray-50 border-b border-gray-200">
                        <th className="pl-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Coupon Code</th>
                        <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                        <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Expiry Date</th>
                        <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Min Purchase</th>
                        <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Usage Limit</th>
                        <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Used</th>
                        <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                        <th className="pr-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Actions</th>
                    </tr>
                </thead>

                <tbody className="divide-y divide-gray-300">
                    {coupons?.length === 0 ? (
                        <tr>
                            <td colSpan={100}>
                                <div className="flex items-center justify-center py-20 gap-2">
                                    <AlertCircle className="w-10 h-10 text-gray-400" />
                                    <p className="text-gray-500">No coupons found</p>
                                </div>
                            </td>
                        </tr>
                    ) : (
                        coupons?.map((coupon, index) => (
                            <tr
                                key={`${coupon?.code}-${index}`}
                                className="hover:bg-gray-50 transition-colors duration-200"
                            >
                                <td className="pl-4 py-3">
                                    <div className="font-black text-gray-600">{coupon?.code}</div>
                                </td>
                                <td className="px-2 py-3">
                                    <div className="text-gray-600">
                                        {coupon?.discountValue} %
                                    </div>
                                </td>
                                <td className="px-2 py-3">
                                    <div className="text-gray-600">
                                        {new Date(coupon?.expiresAt).toLocaleDateString()}
                                    </div>
                                </td>
                                <td className="px-2 py-3">
                                    <div className="text-gray-600">
                                        PKR {coupon?.minPurchase?.toLocaleString() || 0}
                                    </div>
                                </td>
                                <td className="px-2 py-3">
                                    <div className="text-gray-600">
                                        {coupon?.usageLimit || "Unlimited"}
                                    </div>
                                </td>
                                <td className="px-2 py-3">
                                    <div className="text-gray-600">
                                        {coupon?.usedCount || 0}
                                    </div>
                                </td>
                                <td className="px-2 py-3">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${coupon?.isActive ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"}`}>
                                        {coupon?.isActive ? "Active" : "Inactive"}
                                    </span>
                                </td>
                                <td className="pr-4 py-3 text-right">
                                    <button onClick={() => deleteCoupon(coupon?.code)}
                                        className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200">
                                        <Trash2 className="w-4 h-4" />
                                    </button>
                                </td>
                            </tr>
                        ))
                    )}
                </tbody>

            </table>

            <div className="flex justify-end">
                <ThemeButton
                    btnLabel="Add New Coupon"
                    extraClasses="max-w-60 mt-5"
                    icon={<CirclePlus />}
                    onClick={() => setDisplayAddNewCoupon(true)}
                />
            </div>

        </div>
    );
}

function PromotionMessages() {

    const [messages, setMessages] = useState("");
    const [isEditing, setIsEditing] = useState(false);
    const [messagesArray, setMessagesArray] = useState([]);

    const { isUpdatingPromoMessages, updatePromoMessages, promoMessages } = useStoreStore();

    const handleFormSubmission = (e) => {
        e.preventDefault();
        updatePromoMessages(messagesArray);
    };

    // SET MESSAGE FIELD BY JOINING THE ARRAY
    useEffect(() => {
        setMessages(promoMessages?.join(", ") || "");
    }, [promoMessages]);

    // SET MESSAGE ARRAY BY SPLITTING THE MESSAGE FIELD
    useEffect(() => {
        setMessagesArray(messages.split(",").map(msg => msg.trim()));
    }, [messages]);

    const handleCancel = () => {
        setIsEditing(false);
        setMessages(promoMessages?.join(", ") || "");
    };

    return (
        <div className="animate-themeAnimationLg bg-white rounded-2xl shadow-xl py-8 px-4 border border-gray-200 w-full">

            <form onSubmit={handleFormSubmission}
                className="animate-themeAnimationLg bg-white rounded-xl px-6 w-full ">

                <h2 className="text-2xl font-bold text-gray-700">
                    Manage Promotion Messages
                </h2>

                <div className="my-6">
                    <p className="font-medium mb-2">
                        Current Promotions:
                    </p>

                    <ol className="grid grid-cols-1 md:grid-cols-3 gap-2">
                        {messagesArray?.map((msg, index) => (
                            <li key={index} className="text-gray-600 text-sm flex items-center gap-2">
                                <span className="text-black font-medium">
                                    {index + 1}.
                                </span>
                                {msg}
                            </li>
                        ))}
                    </ol>
                    {!isEditing && (
                        <button onClick={() => setIsEditing(true)}
                            className="text-indigo-500 text-sm text-right font-medium w-full"
                        >
                            Edit Promotions?
                        </button>
                    )}
                </div>

                {isEditing && (
                    <div className="animate-themeAnimationLg">
                        <TextArea required={true}
                            label="Promotion Messages"
                            name="promotionMessages"
                            icon={<MessageCircle className="text-gray-400" />}
                            placeholder="Enter your messages seprated by comma ( , )"
                            value={messages}
                            rows={7}
                            onChange={(e) => setMessages(e.target.value)}
                        />

                        <div className="flex justify-between gap-3">

                            <p className="text-red-500 text-sm mb-5 font-medium">
                                * Enter your messages seprated by comma ( , )
                            </p>

                            <div className="flex gap-3 mt-5">

                                <button onClick={handleCancel}
                                    className="border px-8 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                                    Cancel
                                </button>

                                <ThemeButton
                                    btnLabel="SAVE"
                                    extraClasses="max-w-32"
                                    isButtonLoading={isUpdatingPromoMessages}
                                    loadingLabel="Saving..."
                                    icon={<Save className="h-5 w-5 text-white" />}
                                />
                            </div>
                        </div>
                    </div>
                )}

            </form>

        </div>
    );
}

function ShippingCharges() {
    const { updateShippingSettings, isUpdatingShippingSettings, shippingCharges, freeShippingAbove } = useStoreStore();

    const [isEditing, setIsEditing] = useState(false);
    const [newShippingCharges, setNewShippingCharges] = useState(shippingCharges || 0);
    const [newFreeShippingAbove, setNewFreeShippingAbove] = useState(freeShippingAbove || 0);

    const handleUpdateShippingSettings = (e) => {
        e.preventDefault();
        updateShippingSettings(newShippingCharges, newFreeShippingAbove);
    };

    return (
        <div className="animate-themeAnimationLg bg-white rounded-2xl shadow-xl py-8 px-4 border border-gray-200 w-full">
            <h2 className="text-2xl font-bold text-gray-700">
                Manage Shipping Charges
            </h2>

            <div className="mt-6 flex items-end justify-between gap-2 text-nowrap">
                <div >
                    <p className="font-medium mb-2">
                        Current Settings:
                    </p>
                    <p className="mb- ml-5">
                        <span className="text-gray-600 font-medium text-sm mr-2">Shipping Charge:</span>
                        <span className="text-black font-medium text-sm">PKR {shippingCharges}</span>
                    </p>
                    <p className="mb-2 ml-5">
                        <span className="text-gray-600 font-medium text-sm mr-2">Free Shipping Threshold:</span>
                        <span className="text-black font-medium text-sm">PKR {freeShippingAbove}</span>
                    </p>
                </div>

                {!isEditing && (
                    <button onClick={() => setIsEditing(true)}
                        className="text-indigo-500 text-sm text-right font-medium w-full mr-5"
                    >
                        Change Settings?
                    </button>
                )}

            </div>

            {isEditing && (
                <form onSubmit={handleUpdateShippingSettings}
                    className="animate-themeAnimationLg mt-10 space-y-5 max-w-md border border-gray-200 rounded-lg p-5 mx-auto">

                    <Input required={true}
                        type="number"
                        label="Shipping Charges"
                        name="shippingCharges"
                        value={newShippingCharges}
                        onChange={(e) => setNewShippingCharges(e.target.value)}
                    />

                    <Input required={true}
                        type="number"
                        label="Free Shipping Threshold"
                        name="freeShippingAbove"
                        value={newFreeShippingAbove}
                        onChange={(e) => setNewFreeShippingAbove(e.target.value)}
                    />

                    <div className="flex gap-3 justify-end">

                        <button type="button"
                            onClick={() => setIsEditing(false)}
                            className="border px-8 border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                            Cancel
                        </button>

                        <ThemeButton
                            btnLabel="SAVE"
                            extraClasses="max-w-32"
                            isButtonLoading={isUpdatingShippingSettings}
                            loadingLabel="Saving..."
                            icon={<Save className="h-5 w-5 text-white" />}
                        />
                    </div>
                </form>
            )}

        </div>
    );
}
