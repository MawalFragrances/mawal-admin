import { useEffect, useState } from "react";
import useComponentStore from "../zustand/component.store";
import { Package, Trash2, AlertTriangle, Search, CirclePlus, X, Pencil, Edit, RotateCcw } from "lucide-react";
import useProductStore from "../zustand/product.store";
import DashboardLoader from "../components/DashboardLoader";

export default function Products() {

    const [searchTerm, setSearchTerm] = useState("");
    const { allProducts, totalProductsCount, lowStockProductsCount, deletedProductsCount, deletedProducts, isGettingProductsData, getProductsData, setDisplayAddNewProduct } = useProductStore();

    const [lowStockProducts, setLowStockProducts] = useState([]);
    const [activeView, setActiveView] = useState("all");

    useEffect(() => { getProductsData(); }, [getProductsData]);

    useEffect(() => {
        setLowStockProducts(allProducts.filter(product => product.stock <= 10));
    }, [allProducts]);

    const handleViewChange = (view) => {
        setActiveView(view);
    };

    const getButtonStyle = (view) => {
        return activeView === view
            ? "bg-gradient-to-r from-gray-700 to-gray-500 text-white shadow-xl"
            : "bg-white text-gray-700 border border-gray-700 hover:bg-gray-50 hover:scale-105";
    };

    useEffect(() => { window.scrollTo(0, 0) }, []);

    if (isGettingProductsData) return <DashboardLoader />;

    return (
        <div className="animate-themeAnimationLg min-h-screen flex-1 p-6">

            <div className="max-w-7xl mx-auto">

                {/* HEADER */}
                <div className="flex items-center justify-between mb-6 mt-3">
                    <div>
                        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-700 to-gray-500 bg-clip-text text-transparent">
                            Products Management
                        </h1>
                        <p className="text-gray-600 mt-2">Manage your inventory with ease</p>
                    </div>

                    <button onClick={() => setDisplayAddNewProduct(true)}
                        className="bg-gradient-to-r from-gray-700 to-gray-500 text-white px-6 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300 flex items-center gap-3 group"
                    >
                        <CirclePlus className="w-5 h-5 group-hover:rotate-90 transition-transform duration-300" />
                        Add New Product
                    </button>

                </div>

                {/* STATS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Total Products</p>
                                <p className="text-3xl font-bold text-gray-700">{totalProductsCount.toLocaleString()}</p>
                            </div>
                            <div className="bg-gray-100 p-3 rounded-full">
                                <Package className="w-6 h-6 text-gray-700" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Low Stock</p>
                                <p className="text-3xl font-bold text-orange-500">{lowStockProductsCount.toLocaleString()}</p>
                            </div>
                            <div className="bg-orange-100 p-3 rounded-full">
                                <AlertTriangle className="w-6 h-6 text-orange-500" />
                            </div>
                        </div>
                    </div>

                    <div className="bg-white rounded-xl p-6 shadow-lg border border-gray-200 hover:shadow-xl transition-shadow duration-300">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-gray-600 text-sm font-medium">Deleted Products</p>
                                <p className="text-3xl font-bold text-gray-500">{deletedProductsCount.toLocaleString()}</p>
                            </div>
                            <div className="bg-gray-100 p-3 rounded-full">
                                <Trash2 className="w-6 h-6 text-gray-500" />
                            </div>
                        </div>
                    </div>
                </div>

                {/* CONTROLS */}
                <div className="bg-white rounded-2xl shadow-lg p-6 mb-8 border border-gray-200">

                    {/* SEARCH AND FILTER ROW */}
                    <div className="w-[50%] min-w-96 relative mx-auto mb-5">
                        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                        <input
                            type="text"
                            placeholder="Search products..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                            className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-1 focus:ring-gray-500 focus:border-transparent outline-none transition-all"
                        />
                        {searchTerm && (
                            <button
                                onClick={() => setSearchTerm("")}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                            >
                                <X className="w-4 h-4" />
                            </button>
                        )}
                    </div>

                    {/* Navigation Buttons */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">

                        <button
                            onClick={() => handleViewChange("all")}
                            className={`${getButtonStyle("all")} px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 group`}
                        >
                            <Package className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                            All Products
                            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-bold">
                                {totalProductsCount.toLocaleString()}
                            </span>
                        </button>

                        <button
                            onClick={() => handleViewChange("low-stock")}
                            className={`${getButtonStyle("low-stock")} px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 group`}
                        >
                            <AlertTriangle className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                            Low Stock
                            {lowStockProductsCount > 0 && (
                                <span className="bg-orange-100 text-orange-800 px-2 py-1 rounded-full text-xs font-bold animate-pulse">
                                    {lowStockProductsCount.toLocaleString()}
                                </span>
                            )}
                        </button>

                        <button
                            onClick={() => handleViewChange("deleted")}
                            className={`${getButtonStyle("deleted")} px-6 py-4 rounded-xl font-semibold transition-all duration-300 flex items-center justify-center gap-3 group`}
                        >
                            <Trash2 className="w-5 h-5 group-hover:scale-110 transition-transform duration-300" />
                            Deleted
                            <span className="bg-gray-100 text-gray-800 px-2 py-1 rounded-full text-xs font-bold">
                                {deletedProductsCount.toLocaleString()}
                            </span>
                        </button>

                    </div>

                </div>

                {/* CONTENT */}
                <div className="bg-white rounded-2xl shadow-xl py-8 px-4 border border-gray-200 w-full">

                    <table className="w-full">

                        <thead>
                            <tr className="text-left bg-gray-50 border-b border-gray-200">
                                <th className="pl-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Image</th>
                                <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
                                <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Sizes & Prices</th>
                                <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Discount</th>
                                <th className="px-2 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">Stock</th>
                                <th className="pr-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-right">Actions</th>
                            </tr>
                        </thead>

                        {searchTerm ? (
                            <>
                                <tr>
                                    <td colSpan={100} className="text-2xl font-bold text-gray-700 pt-3 pl-4">
                                        Search Results
                                    </td>
                                </tr>
                                <MapProducts
                                    products={
                                        allProducts.filter(product => product.name.toLowerCase().includes(searchTerm.toLowerCase()))
                                    }
                                />
                            </>
                        ) : (
                            <>
                                {activeView === "all" && (
                                    <MapProducts products={allProducts} />
                                )}

                                {activeView === "low-stock" && (
                                    <MapProducts products={lowStockProducts} />
                                )}

                                {activeView === "deleted" && (
                                    <MapProducts products={deletedProducts} />
                                )}
                            </>
                        )}

                    </table>
                </div>

            </div>

        </div>
    );
}

function MapProducts({
    products,
}) {
    return (
        <tbody className="animate-themeAnimationLg divide-y divide-gray-200">
            {products.length > 0 ? (
                products.map((product) => (
                    <ProductRow key={product._id} product={product} />
                ))
            ) : (
                <tr>
                    <td colSpan={100} className="pt-20 pb-16">
                        <div className="bg-gradient-to-r from-gray-100 to-gray-100 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-4">
                            <Package className="w-12 h-12 text-gray-700" />
                        </div>
                        <div className="text-center text-gray-500">No products found</div>
                    </td>
                </tr>

            )}
        </tbody>
    );
}

function ProductRow({
    product
}) {

    const { confirmAction } = useComponentStore();
    const { deleteProduct, setProductToUpdate, restoreProduct } = useProductStore();

    return (
        <tr className="border-b border-gray-100 hover:bg-gray-50 transition-colors">

            {/* IMAGE */}
            <td className="py-4 pl-4">
                <div className="flex items-center">
                    <div className="h-14 w-14 rounded-lg bg-gray-100 overflow-hidden flex items-center justify-center">
                        <img
                            src={product?.images[0]}
                            alt={product?.name}
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>
            </td>

            {/* NAME */}
            <td className="py-4 px-2">
                <div className="max-w-xs overflow-hidden text-ellipsis font-medium">
                    {product?.name}
                </div>
            </td>

            {/* SIZES & PRICES */}
            <td className="py-4 px-2">
                <div className="flex flex-col gap-2">
                    {product?.sizeAndPrices?.map((size) => (
                        <div key={size?.size} className="text-xs text-gray-500 font-mono">{size?.size} ml - {size?.price} PKR</div>
                    ))}
                </div>
            </td>

            {/* DISCOUNT */}
            <td className="py-4 px-2">
                <div className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
                    {product?.discount}% off
                </div>
            </td>

            <td className="py-4 px-2">
                <div className="max-w-xs overflow-hidden text-ellipsis font-medium">
                    {product?.stock}
                </div>
            </td>

            {/* ACTIONS */}
            <td className="py-4 pr-4">
                <div className="flex justify-end space-x-2">
                    {product?.isProductDeleted === true ? (
                        <button onClick={() => {
                            const message = `Are you sure you want to restore this product?`;
                            confirmAction(message, "RESTORE", () => restoreProduct(product._id));
                        }}
                            className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200">
                            <RotateCcw className="w-4 h-4 text-red-600" />
                        </button>
                    ) : (
                        <>
                            <button onClick={() => setProductToUpdate(product)}
                                className="p-2 text-teal-600 hover:bg-teal-100 rounded-lg transition-all duration-200">
                                <Edit className="w-4 h-4 text-teal-600" />
                            </button>

                            <button onClick={() => {
                                const message = `Are you sure you want to delete this product?`;
                                confirmAction(message, "DELETE", () => deleteProduct(product._id));
                            }}
                                className="p-2 text-red-600 hover:bg-red-100 rounded-lg transition-all duration-200">
                                <Trash2 className="w-4 h-4 text-red-600" />
                            </button>
                        </>
                    )}

                </div>

            </td>

        </tr>
    );
};
