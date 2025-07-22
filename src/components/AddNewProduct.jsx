import { z } from "zod";
import { useState } from "react";
import { categories } from "../constants";
import { Input, Select, TextArea } from "../components/Inputs";
import { X, UploadCloud, Package, DollarSign, Percent, Text, Plus, Minus, Tags, CirclePlus } from "lucide-react";
import { ThemeButton } from "./Buttons";
import toast from "react-hot-toast";
import useProductStore from "../zustand/product.store";

export default function AddNewProduct() {

    const [name, setName] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDescription] = useState("");
    const [images, setImages] = useState([]);
    const [discount, setDiscount] = useState("");
    const [category, setCategory] = useState("");
    const [ingredients, setIngredients] = useState("");
    const [tags, setTags] = useState("");
    const [errors, setErrors] = useState({});
    const [imagePreview, setImagePreview] = useState([]);
    const [sizeAndPrices, setSizeAndPrices] = useState([{ size: "", price: 0 }]);

    const { addNewProduct, isAddingNewProduct, setDisplayAddNewProduct } = useProductStore();

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        if (files.length > 0) {

            const newImagePreview = files.map(file => URL.createObjectURL(file));

            setImagePreview([...imagePreview, ...newImagePreview]);
            setImages([...images, ...files]);

            if (errors.image) {
                setErrors({
                    ...errors,
                    image: null,
                });
            }
        }
    };

    const removeImage = (index) => {
        const updatedPreviews = [...imagePreview];
        updatedPreviews.splice(index, 1);
        setImagePreview(updatedPreviews);
    };

    const handleSizeChange = (index, field, value) => {
        const updatedSizes = [...sizeAndPrices];
        updatedSizes[index][field] = value;
        setSizeAndPrices(updatedSizes);
    };

    const addSize = () => {
        setSizeAndPrices([...sizeAndPrices, { size: "", price: 0 }]);
    };

    const removeSize = (index) => {
        const updatedSizes = sizeAndPrices.filter((_, i) => i !== index);
        setSizeAndPrices(updatedSizes);
    };

    const formSchema = z.object({
        name: z.string()
            .min(1, "Name is required."),

        images: z.array(z.instanceof(File))
            .min(1, "At least one image is required")
            .max(5, "Maximum 5 images allowed"),

        stock: z.string()
            .min(1, "Stock is required.")
            .min(0, "Stock must be at least 0"),

        description: z.string()
            .min(1, "Description is required."),

        ingredients: z.string()
            .min(1, "Ingredients is required."),

        discount: z.string()
            .min(0, "Discount must be at least 0")
            .max(75, "Discount must be less than 75"),

        category: z.enum(["MEN", "WOMEN", "UNISEX", "SIGNATURE"], {
            errorMap: () => ({
                message: "Category must be one of: MEN, WOMEN, UNISEX, SIGNATURE",
            }),
        }),

        tags: z.string()
            .min(1, "Tags is required."),

    });

    const validateForm = () => {
        const formData = { name, stock, description, images, discount, category, ingredients, sizeAndPrices, tags };
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

        const fieldErrors = { ...errors };

        if (!result.success) {
            const fieldError = result.error.errors[0];
            if (fieldError) fieldErrors[name] = fieldError.message;
        }
        else delete fieldErrors[name];

        setErrors(fieldErrors);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return toast.error("Please fill all the fields correctly.");

        const productData = { name, stock, description, discount, category, ingredients, tags };
        addNewProduct(productData, images, sizeAndPrices);
    };

    return (
        <div className="fixed inset-0 bg-black/50 min-h-screen p-4 z-[900]">

            <div className="animate-themeAnimationLg relative max-w-4xl mx-auto bg-white rounded-xl shadow-md overflow-y-auto h-full scrollbar z-[901]">

                <button onClick={() => setDisplayAddNewProduct(false)} className="absolute top-4 right-4 text-white hover:bg-white/20 rounded-full p-1 transition-colors">
                    <X className="w-6 h-6" />
                </button>

                {/* Header */}
                <div className="bg-gradient-to-r from-gray-900 to-gray-600 px-6 py-4">
                    <h1 className="text-white text-2xl font-bold">Add New Product</h1>
                    <p className="text-gray-100 mt-1">Create a new product for your store</p>
                </div>

                {/* Form */}
                <form onSubmit={handleSubmit} className="p-6 space-y-6">

                    {/* Product Name */}
                    <Input required={true}
                        label="Product Name"
                        name="name"
                        value={name}
                        errors={errors}
                        placeholder="Enter product name"
                        onChange={(e) => setName(e.target.value)}
                        icon={<Package className="w-5 h-5 text-gray-400" />}
                        onBlur={(e) => validateField(e.target.name, e.target.value)}
                    />

                    {/* Images Upload */}
                    <div>

                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Product Images <span className="text-red-500">*</span>
                        </label>

                        <div className="mt-1 flex justify-center px-6 py-10 border-2 border-dashed rounded-md border-gray-300 hover:border-indigo-400 transition-colors">

                            <div className="space-y-1 text-center">

                                <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />

                                <div className="flex text-sm text-gray-600">
                                    <label htmlFor="image-upload" className="relative cursor-pointer rounded-md font-medium text-indigo-600 hover:text-indigo-500 focus-within:outline-none">

                                        <span>Upload images</span>

                                        <input
                                            id="image-upload"
                                            name="image-upload"
                                            type="file"
                                            className="sr-only"
                                            multiple
                                            accept="image/*"
                                            onChange={handleImageUpload}
                                        />
                                    </label>

                                    <p className="pl-1">or drag and drop</p>
                                </div>

                                <p className="text-xs text-gray-500">PNG, JPG, GIF up to 10MB</p>
                            </div>

                        </div>

                        {/* Image Previews */}
                        {imagePreview.length > 0 && (
                            <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                                {imagePreview.map((src, index) => (
                                    <div key={index} className="relative rounded-md overflow-hidden h-30 bg-gray-100">

                                        <img src={src} alt={`Preview ${index + 1}`} className="h-full w-full object-cover" />

                                        <button type="button"
                                            className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1 text-white"
                                            onClick={() => removeImage(index)}
                                        >
                                            <X className="h-4 w-4" />
                                        </button>

                                    </div>
                                ))}
                            </div>
                        )}

                        {errors.image && <p className="mt-1 text-sm text-red-500">{errors.image}</p>}
                    </div>

                    {/* Sizes and Prices */}
                    <div>
                        <label className="block text-sm font-semibold text-gray-800 mb-3">
                            Product Sizes & Prices <span className="text-red-500">*</span>
                        </label>

                        <div className="space-y-4">
                            {sizeAndPrices.map((size, index) => (
                                <div key={index} className="flex items-end gap-4 p-4 bg-gray-50 rounded-lg">
                                    <div className="flex-1">
                                        <Input
                                            label={`Size ${index + 1}`}
                                            name={`size-${index}`}
                                            value={size.size}
                                            placeholder="e.g., 30ml, 50ml, 100ml"
                                            onChange={(e) => handleSizeChange(index, 'size', e.target.value)}
                                            errors={{}}
                                            icon={<Package className="w-5 h-5 text-gray-400" />}
                                        />
                                    </div>
                                    <div className="flex-1">
                                        <Input
                                            type="number"
                                            label={`Price ${index + 1}`}
                                            name={`price-${index}`}
                                            value={size.price}
                                            placeholder="Enter price"
                                            onChange={(e) => handleSizeChange(index, 'price', e.target.value)}
                                            errors={{}}
                                            icon={<DollarSign className="w-5 h-5 text-gray-400" />}
                                        />
                                    </div>
                                    <div className="flex gap-2">
                                        {sizeAndPrices.length > 1 && (
                                            <button
                                                type="button"
                                                onClick={() => removeSize(index)}
                                                className="p-2 text-red-500 hover:bg-red-50 rounded-lg transition-colors"
                                            >
                                                <Minus className="w-5 h-5" />
                                            </button>
                                        )}
                                        {index === sizeAndPrices.length - 1 && (
                                            <button
                                                type="button"
                                                onClick={addSize}
                                                className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-colors"
                                            >
                                                <Plus className="w-5 h-5" />
                                            </button>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>

                        {errors.sizeAndPrices && <p className="mt-1 text-sm text-red-500">{errors.sizeAndPrices}</p>}
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        {/* Discount */}
                        <Input required={true}
                            type="number"
                            label="Discount"
                            name="discount"
                            value={discount}
                            errors={errors}
                            placeholder="Enter product discount"
                            icon={<Percent className="w-5 h-5 text-gray-400" />}
                            onChange={(e) => setDiscount(e.target.value)}
                            onBlur={(e) => validateField(e.target.name, e.target.value)}
                        />
                        <Input required={true}
                            type="text"
                            label="Tags"
                            name="tags"
                            value={tags}
                            errors={errors}
                            placeholder="Enter product tags seperated by commas"
                            icon={<Tags className="w-5 h-5 text-gray-400" />}
                            onChange={(e) => setTags(e.target.value)}
                            onBlur={(e) => validateField(e.target.name, e.target.value)}
                        />

                    </div>

                    {/* Ingredients & Usage */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <TextArea required={true}
                            label="Ingredients"
                            name="ingredients"
                            value={ingredients}
                            errors={errors}
                            placeholder="Enter product ingredients"
                            rows={5}
                            icon={<Text className="w-5 h-5 text-gray-400" />}
                            onChange={(e) => setIngredients(e.target.value)}
                            onBlur={(e) => validateField(e.target.name, e.target.value)}
                        />

                        <TextArea required={true}
                            label="Description"
                            name="description"
                            value={description}
                            errors={errors}
                            placeholder="Enter product description"
                            rows={5}
                            icon={<Text className="w-5 h-5 text-gray-400" />}
                            onChange={(e) => setDescription(e.target.value)}
                            onBlur={(e) => validateField(e.target.name, e.target.value)}
                        />
                    </div>

                    {/* Category & Stock */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

                        <Select required={true}
                            label="Category"
                            name="category"
                            value={category}
                            errors={errors}
                            placeholder="Select product category"
                            options={categories}
                            onChange={(e) => setCategory(e.target.value)}
                            onBlur={(e) => validateField(e.target.name, e.target.value)}
                        />

                        <Input required={true}
                            type="number"
                            label="Stock"
                            name="stock"
                            value={stock}
                            errors={errors}
                            placeholder="Enter product stock"
                            icon={<Package className="w-5 h-5 text-gray-400" />}
                            onChange={(e) => setStock(e.target.value)}
                            onBlur={(e) => validateField(e.target.name, e.target.value)}
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="flex justify-center gap-5">
                        <button type="button"
                            onClick={() => setDisplayAddNewProduct(false)}
                            className=" px-4 py-3 rounded-md w-44 bg-gray-200 text-gray-800 border border-gray-400 hover:bg-gray-300 transition-colors">
                            Cancel
                        </button>
                        <ThemeButton
                            btnLabel="Add Product"
                            icon={<CirclePlus className="w-5 h-5" />}
                            isButtonLoading={isAddingNewProduct}
                            loadingLabel="Adding Product..."
                        />
                    </div>

                </form>

            </div>

        </div>
    );
}