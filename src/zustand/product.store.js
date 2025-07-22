import { create } from "zustand";
import { consoleError } from "../utils/comman.utils";
import toast from "react-hot-toast";
import axiosInstance from "../lib/axios";

const useProductStore = create((set, get) => ({
    allProducts: [],
    deletedProducts: [],

    totalProductsCount: 0,
    deletedProductsCount: 0,
    lowStockProductsCount: 0,
    setLowStockProductsCount: (lowStockProductsCount) => set({ lowStockProductsCount }), // FOR SIDEBAR COUNTS

    productToUpdate: null,
    setProductToUpdate: (productToUpdate) => set({ productToUpdate }),
    productOptionToUpdate: null,
    setProductOptionToUpdate: (productOptionToUpdate) => set({ productOptionToUpdate }),
    displayAddNewProduct: false,
    setDisplayAddNewProduct: (displayAddNewProduct) => (set({ displayAddNewProduct })),


    isGettingProductsData: false,
    getProductsData: async () => {
        set({ isGettingProductsData: true });
        try {
            const response = await axiosInstance.get("api/v1/admin/get-products-data");
            set({
                allProducts: response?.data?.data?.allProducts || [],
                deletedProducts: response?.data?.data?.deletedProducts || [],
                totalProductsCount: response?.data?.data?.totalProductsCount || 0,
                deletedProductsCount: response?.data?.data?.deletedProductsCount || 0,
                lowStockProductsCount: response?.data?.data?.lowStockProductsCount || 0,
            });
        } catch (error) {
            consoleError("getProductsData (Product Store)", error);
            toast.error(error.response?.data?.message || "Internal Server Error.");
        } finally {
            set({ isGettingProductsData: false });
        }
    },

    // Add a new product
    isAddingNewProduct: false,
    addNewProduct: async (productData, images, sizeAndPrices) => {
        set({ isAddingNewProduct: true });
        try {
            const product = new FormData();
            // APPEND PRODUCT DATA
            for (const [key, value] of Object.entries(productData)) {
                product.append(key, value);
            }
            // APPEND SIZE AND PRICES
            product.append("sizeAndPrices", JSON.stringify(sizeAndPrices));
            // APPEND IMAGES
            images.forEach(image => {
                product.append("image", image);
            });

            // SEND REQUEST
            const response = await axiosInstance.post("api/v1/admin/add-new-product", product,
                { headers: { "Content-Type": "multipart/form-data" }, }
            );

            // UPDATE PRODUCTS DATA
            toast.success(response?.data?.message);
            set({
                allProducts: [...get().allProducts, response?.data?.data],
                totalProductsCount: get().totalProductsCount + 1,
            });
            if (productData.stock <= 10) {
                set({ lowStockProductsCount: get().lowStockProductsCount + 1 });
            }
            set({ displayAddNewProduct: false });
        }
        catch (error) {
            consoleError("addNewProduct function (zustand)", error);
            toast.error(error.response?.data?.message || "Internal Server Error.");
        }
        finally { set({ isAddingNewProduct: false }); }
    },

    // DELETE PRODUCT
    isDeletingProduct: false,
    deleteProduct: async (productId) => {
        set({ isDeletingProduct: true });
        try {
            const response = await axiosInstance.delete(`api/v1/admin/delete-product/${productId}`);
            toast.success(response?.data?.message);
            set({
                allProducts: get().allProducts.filter((product) => product._id !== productId),
                deletedProductsCount: get().deletedProductsCount + 1,
            });
        } catch (error) {
            consoleError("deleteProduct (Dashboard Store)", error);
            toast.error(error.response?.data?.message || "Internal Server Error.");
        }
        finally { set({ isDeletingProduct: false }); }
    },

    // RESTORE PRODUCT
    isRestoringProduct: false,
    restoreProduct: async (productId) => {
        set({ isRestoringProduct: true });
        try {
            const response = await axiosInstance.patch(`api/v1/admin/restore-product/${productId}`);
            toast.success(response?.data?.message);
            set({
                deletedProducts: get().deletedProducts.filter((product) => product._id !== productId),
                allProducts: [...get().allProducts, response?.data?.data],
                deletedProductsCount: get().deletedProductsCount - 1,
                totalProductsCount: get().totalProductsCount + 1,
            });
        } catch (error) {
            consoleError("restoreProduct (Dashboard Store)", error);
            toast.error(error.response?.data?.message || "Internal Server Error.");
        }
        finally { set({ isRestoringProduct: false }); }
    },

    // UPDATE PRODUCT
    isUpdatingProductName: false,
    updateProductName: async (productId, name) => {
        set({ isUpdatingProductName: true });
        try {
            const response = await axiosInstance.patch(`api/v1/products/update-product-name/${productId}`, { name });
            toast.success(response?.data?.message);
            set({
                productToUpdate: null,
                productOptionToUpdate: null,
                allProducts: get().allProducts.map((product) => product._id === productId ?
                    { ...product, name } : product),
            });
        }
        catch (error) {
            consoleError("updateProductName (Dashboard Store)", error);
            toast.error(error.response?.data?.message || "Internal Server Error.");
        }
        finally { set({ isUpdatingProductName: false }); }
    },
    isUpdatingProductDiscount: false,
    updateProductDiscount: async (productId, discount) => {
        set({ isUpdatingProductDiscount: true });
        try {
            const response = await axiosInstance.patch(`api/v1/products/update-product-discount/${productId}`, { discount });
            toast.success(response?.data?.message);
            set({
                productToUpdate: null,
                productOptionToUpdate: null,
                allProducts: get().allProducts.map((product) => product._id === productId ?
                    { ...product, discount } : product),
            });
        } catch (error) {
            consoleError("updateProductDiscount (Dashboard Store)", error);
            toast.error(error.response?.data?.message || "Internal Server Error.");
        }
        finally { set({ isUpdatingProductDiscount: false }); }
    },
    isUpdatingProductStock: false,
    updateProductStock: async (productId, stock) => {
        set({ isUpdatingProductStock: true });
        try {
            const response = await axiosInstance.patch(`api/v1/products/update-product-stock/${productId}`, { stock });
            toast.success(response?.data?.message);
            set({
                productToUpdate: null,
                productOptionToUpdate: null,
                allProducts: get().allProducts.map((product) => product._id === productId ?
                    { ...product, stock } : product),
            });
            if (stock <= 10) {
                set({ lowStockProductsCount: get().lowStockProductsCount + 1 });
            }
        } catch (error) {
            consoleError("updateProductStock (Dashboard Store)", error);
            toast.error(error.response?.data?.message || "Internal Server Error.");
        }
        finally { set({ isUpdatingProductStock: false }); }
    },
    isUpdatingProductImages: false,
    updateProductImages: async (productId, images) => {
        set({ isUpdatingProductImages: true });
        try {
            const response = await axiosInstance.patch(`api/v1/products/update-product-images/${productId}`, images,
                { headers: { "Content-Type": "multipart/form-data" }, }
            );
            toast.success(response?.data?.message);
            set({
                productToUpdate: null,
                productOptionToUpdate: null,
                allProducts: get().allProducts.map((product) => product._id === productId ?
                    { ...product, images } : product),
            });
        } catch (error) {
            consoleError("updateProductImages (Dashboard Store)", error);
            toast.error(error.response?.data?.message || "Internal Server Error.");
        }
        finally { set({ isUpdatingProductImages: false }); }
    },
    isUpdatingProductSizeAndPrices: false,
    updateProductSizeAndPrices: async (productId, sizeAndPrices) => {
        set({ isUpdatingProductSizeAndPrices: true });
        try {
            const response = await axiosInstance.patch(`api/v1/products/update-product-size-and-prices/${productId}`, { sizeAndPrices });
            toast.success(response?.data?.message);
            set({
                productToUpdate: null,
                productOptionToUpdate: null,
                allProducts: get().allProducts.map((product) => product._id === productId ?
                    { ...product, sizeAndPrices } : product),
            });
        } catch (error) {
            consoleError("updateProductSizeAndPrices (Dashboard Store)", error);
            toast.error(error.response?.data?.message || "Internal Server Error.");
        }
        finally { set({ isUpdatingProductSizeAndPrices: false }); }
    },
    isUpdatingProductCategory: false,
    updateProductCategory: async (productId, category) => {
        set({ isUpdatingProductCategory: true });
        try {
            const response = await axiosInstance.patch(`api/v1/products/update-product-category/${productId}`, { category });
            toast.success(response?.data?.message);
            set({
                productToUpdate: null,
                productOptionToUpdate: null,
                allProducts: get().allProducts.map((product) => product._id === productId ?
                    { ...product, category } : product),
            });
        } catch (error) {
            consoleError("updateProductCategory (Dashboard Store)", error);
            toast.error(error.response?.data?.message || "Internal Server Error.");
        }
        finally { set({ isUpdatingProductCategory: false }); }
    },
    isUpdatingProductIngredients: false,
    updateProductIngredients: async (productId, ingredients) => {
        set({ isUpdatingProductIngredients: true });
        try {
            const response = await axiosInstance.patch(`api/v1/products/update-product-ingredients/${productId}`, { ingredients });
            toast.success(response?.data?.message);
            set({
                productToUpdate: null,
                productOptionToUpdate: null,
                allProducts: get().allProducts.map((product) => product._id === productId ?
                    { ...product, ingredients } : product),
            });
        } catch (error) {
            consoleError("updateProductIngredients (Dashboard Store)", error);
            toast.error(error.response?.data?.message || "Internal Server Error.");
        }
        finally { set({ isUpdatingProductIngredients: false }); }
    },
    isUpdatingProductDescription: false,
    updateProductDescription: async (productId, description) => {
        set({ isUpdatingProductDescription: true });
        try {
            const response = await axiosInstance.patch(`api/v1/products/update-product-description/${productId}`, { description });
            toast.success(response?.data?.message);
            set({
                productToUpdate: null,
                productOptionToUpdate: null,
                allProducts: get().allProducts.map((product) => product._id === productId ?
                    { ...product, description } : product),
            });
        } catch (error) {
            consoleError("updateProductDescription (Dashboard Store)", error);
            toast.error(error.response?.data?.message || "Internal Server Error.");
        }
        finally { set({ isUpdatingProductDescription: false }); }
    },
    isUpdatingProductTags: false,
    updateProductTags: async (productId, tags) => {
        set({ isUpdatingProductTags: true });
        try {
            const response = await axiosInstance.patch(`api/v1/products/update-product-tags/${productId}`, { tags });
            toast.success(response?.data?.message);
            set({
                productToUpdate: null,
                productOptionToUpdate: null,
                allProducts: get().allProducts.map((product) => product._id === productId ?
                    { ...product, tags } : product),
            });
        } catch (error) {
            consoleError("updateProductTags (Dashboard Store)", error);
            toast.error(error.response?.data?.message || "Internal Server Error.");
        }
        finally { set({ isUpdatingProductTags: false }); }
    },

}));

export default useProductStore;