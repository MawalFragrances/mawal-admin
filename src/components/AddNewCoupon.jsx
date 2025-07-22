import { useState } from "react";
import { Input, Select } from "./Inputs";
import { Tag, Percent, Calendar, Hash, DollarSign, Users } from "lucide-react";
import { z } from "zod";
import { ThemeButton } from "./Buttons";
import toast from "react-hot-toast";
import useStoreStore from "../zustand/store.store";

export default function AddNewCoupon() {

    const [code, setCode] = useState("");
    const [minPurchase, setMinPurchase] = useState("");
    const [expiresAt, setExpiresAt] = useState("");
    const [errors, setErrors] = useState({});
    const [usageLimit, setUsageLimit] = useState("");
    const [isActive, setIsActive] = useState(true);
    const [discountValue, setDiscountValue] = useState("");

    const { addNewCoupon, isAddingNewCoupon, setDisplayAddNewCoupon } = useStoreStore();

    const activeOptions = [
        { value: true, label: "Active" },
        { value: false, label: "Inactive" }
    ];

    const formSchema = z.object({
        code: z.string()
            .min(1, "Coupon code is required.")
            .min(3, "Coupon code must be at least 3 characters.")
            .max(20, "Coupon code must not exceed 20 characters."),

        discountValue: z.string()
            .min(1, "Discount value is required.")
            .refine((val) => !isNaN(parseFloat(val)) && parseFloat(val) > 0, "Discount value must be a positive number."),

        minPurchase: z.string()
            .refine((val) => val === "" || (!isNaN(parseFloat(val)) && parseFloat(val) >= 0), "Minimum purchase must be a non-negative number."),

        expiresAt: z.string()
            .min(1, "Expiry date is required.")
            .refine((val) => new Date(val) > new Date(), "Expiry date must be in the future."),

        usageLimit: z.string()
            .min(1, "Usage limit is required.")
            .refine((val) => val === "" || (!isNaN(parseInt(val)) && parseInt(val) > 0), "Usage limit must be a positive number."),

    });
    const validateForm = () => {
        const formData = {
            code,
            discountValue,
            minPurchase,
            expiresAt,
            usageLimit,
            isActive
        };
        const result = formSchema.safeParse(formData);

        if (!result.success) {
            const newErrors = {};
            const fieldErrors = result.error.flatten().fieldErrors;

            Object.keys(fieldErrors).forEach(key => {
                if (fieldErrors[key] && fieldErrors[key].length > 0) {
                    newErrors[key] = fieldErrors[key][0];
                }
            });
            setErrors(newErrors);
            return false;
        }
        else setErrors({});
        return true;
    };
    const validateField = (name, value) => {
        const fieldSchema = formSchema.pick({ [name]: true });
        const result = fieldSchema.safeParse({ [name]: value });

        setErrors(prevErrors => {
            const newErrors = { ...prevErrors };

            if (!result.success) {
                const fieldError = result.error.errors[0];
                if (fieldError) {
                    newErrors[name] = fieldError.message;
                }
            } else {
                delete newErrors[name];
            }

            return newErrors;
        });
    };

    const handleFormSubmission = async (e) => {
        e.preventDefault();
        if (!validateForm()) return toast.error("Please fill all the fields correctly.");

        const couponData = {
            code: code.trim().toUpperCase(),
            discountValue: parseInt(discountValue),
            minPurchase: minPurchase === "" ? 0 : parseInt(minPurchase),
            expiresAt: new Date(expiresAt),
            usageLimit: usageLimit === "" ? 1 : parseInt(usageLimit),
            isActive: isActive
        };

        await addNewCoupon(couponData);
        setDisplayAddNewCoupon(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[1000]">

            <form onSubmit={handleFormSubmission}
                className="animate-themeAnimationLg scrollbar max-h-[90vh] overflow-y-auto bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">

                <h2 className="text-2xl font-bold text-gray-700 mb-6">
                    Add New Coupon
                </h2>

                <div className="space-y-4">

                    {/* COUPON CODE */}
                    <Input required={true}
                        type="text"
                        name="code"
                        label="Coupon Code"
                        value={code}
                        errors={errors}
                        placeholder="SAVE20"
                        onChange={(e) => setCode(e.target.value.toUpperCase().trim())}
                        icon={<Tag className="h-5 w-5 text-gray-400" />}
                        onBlur={(e) => validateField(e.target.name, e.target.value)}
                    />

                    {/* DISCOUNT VALUE */}
                    <Input required={true}
                        type="number"
                        name="discountValue"
                        label="Discount Value"
                        value={discountValue}
                        errors={errors}
                        placeholder="10"
                        onChange={(e) => setDiscountValue(e.target.value)}
                        icon={<Percent className="h-5 w-5 text-gray-400" />}
                        onBlur={(e) => validateField(e.target.name, e.target.value)}
                    />

                    {/* MINIMUM PURCHASE */}
                    <Input required={true}
                        type="number"
                        name="minPurchase"
                        label="Minimum Purchase"
                        value={minPurchase}
                        errors={errors}
                        placeholder="0"
                        onChange={(e) => setMinPurchase(e.target.value)}
                        icon={<DollarSign className="h-5 w-5 text-gray-400" />}
                        onBlur={(e) => validateField(e.target.name, e.target.value)}
                    />

                    {/* EXPIRY DATE */}
                    <Input required={true}
                        type="date"
                        name="expiresAt"
                        label="Expiry Date"
                        value={expiresAt}
                        errors={errors}
                        onChange={(e) => setExpiresAt(e.target.value)}
                        icon={<Calendar className="h-5 w-5 text-gray-400" />}
                        onBlur={(e) => validateField(e.target.name, e.target.value)}
                    />

                    {/* USAGE LIMIT */}
                    <Input required={true}
                        type="number"
                        name="usageLimit"
                        label="Usage Limit"
                        value={usageLimit}
                        errors={errors}
                        placeholder="1"
                        onChange={(e) => setUsageLimit(e.target.value)}
                        icon={<Users className="h-5 w-5 text-gray-400" />}
                        onBlur={(e) => validateField(e.target.name, e.target.value)}
                    />

                    {/* STATUS */}
                    <Select required={true}
                        label="Status"
                        name="isActive"
                        value={isActive}
                        options={activeOptions}
                        errors={errors}
                        placeholder="Select status"
                        onChange={(e) => setIsActive(e.target.value)}
                        onBlur={(e) => validateField(e.target.name, e.target.value)}
                        icon={<Hash className="h-5 w-5 text-gray-400" />}
                    />

                </div>

                <div className="flex gap-3 mt-8">

                    <button type="button" onClick={() => setDisplayAddNewCoupon(false)}
                        className="flex-1 px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                        Cancel
                    </button>

                    <ThemeButton
                        btnLabel="Add Coupon"
                        extraClasses="max-w-1/2"
                        isButtonLoading={isAddingNewCoupon}
                        loadingLabel="Adding..."
                        icon={<Tag className="h-5 w-5 text-white" />}
                    />

                </div>

            </form>

        </div>
    );
}