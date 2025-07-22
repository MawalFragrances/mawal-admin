import { X, Sparkles, ChevronRight, } from "lucide-react";
import useProductStore from "../zustand/product.store";
import { updateProductOptions } from "../constants";

export default function UpdateProduct() {

    const { productToUpdate, setProductToUpdate, setProductOptionToUpdate } = useProductStore();

    const handleClose = () => {
        setProductToUpdate(null);
        setProductOptionToUpdate(null);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-[1000] backdrop-blur-sm ">

            <div className="animate-themeAnimationLg bg-white rounded-xl p-8 w-full max-w-2xl shadow-2xl border border-gray-100 relative overflow-hidden max-h-[90vh] overflow-y-auto scrollbar">

                {/* HEADER */}
                <div className="flex items-center justify-between mb-8 relative z-10">

                    <div className="flex items-center gap-3">

                        <div className="w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-500 rounded-2xl flex items-center justify-center shadow-lg">
                            <Sparkles className="w-6 h-6 text-white" />
                        </div>

                        <div>
                            <h2 className="text-3xl font-bold text-gray-700">
                                Update Product
                            </h2>
                            <p className="text-gray-500 text-sm">Choose what you"d like to modify</p>
                        </div>

                    </div>

                    <button onClick={handleClose}
                        className="w-10 h-10 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-700 transition-all duration-200 hover:scale-110 active:scale-95">
                        <X className="w-5 h-5" />
                    </button>

                </div>

                {/* PRODUCT TO UPDATE */}
                <div className="flex gap-4 mb-8 relative z-10">
                    <img src={productToUpdate?.images[0]}
                        alt=""
                        className="w-32 h-32 rounded-xl"
                    />
                    <h1 className="text-2xl font-bold text-gray-700">
                        {productToUpdate?.name}
                    </h1>
                </div>

                {/* UPDATE OPTIONS GRID */}
                <div className="grid grid-cols-1 gap-4 mb-8 relative z-10">

                    {updateProductOptions.map((option) => {

                        const IconComponent = option.icon;

                        return (
                            <button key={option.id}
                                onClick={() => setProductOptionToUpdate(option)}
                                className="group relative overflow-hidden p-4 bg-white hover:bg-gray-50 rounded-2xl border border-gray-200 hover:border-gray-300 transition-all duration-300 hover:shadow-md active:scale-[0.98] text-left">

                                <div className="relative z-10">

                                    <div className="flex items-center gap-4">

                                        <div className={`w-12 h-12 bg-gradient-to-br from-gray-700 to-gray-500 rounded-xl flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow duration-300`}>
                                            <IconComponent className="w-6 h-6 text-white" />
                                        </div>

                                        <div className="flex-1">
                                            <h3 className="text-gray-700 font-semibold text-lg mb-1 group-hover:text-gray-900 transition-colors duration-200">
                                                {option.label}
                                            </h3>
                                            <p className="text-gray-500 text-sm group-hover:text-gray-600 transition-colors duration-200">
                                                {option.description}
                                            </p>
                                        </div>

                                        {/* ARROW INDICATOR */}
                                        <div className="flex justify-end">
                                            <ChevronRight className="w-5 h-5 text-gray-600" />
                                        </div>

                                    </div>

                                </div>

                            </button>
                        );
                    })}
                </div>

                {/* FOOTER ACTIONS */}
                <div className="flex gap-4 pt-6 border-t border-gray-200 relative z-10">

                    <button
                        onClick={handleClose}
                        className="flex-1 px-6 py-4 bg-gradient-to-r from-gray-800 to-gray-600 text-white font-semibold rounded-xl transition-all duration-200 hover:shadow-lg active:scale-[0.98] flex items-center justify-center gap-2"
                    >
                        <X className="w-5 h-5" />
                        Cancel
                    </button>
                </div>

            </div>

        </div>
    );
}




