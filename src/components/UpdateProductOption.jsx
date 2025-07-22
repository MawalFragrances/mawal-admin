import useProductStore from "../zustand/product.store";
import { Package, Percent, Repeat, Save, X, Minus, Plus, DollarSign, UploadCloud, } from "lucide-react";
import { Input, Select, TextArea } from "./Inputs";
import { useEffect, useState } from "react";
import { ThemeButton } from "./Buttons";
import toast from "react-hot-toast";
import { categories } from "../constants";

export default function UpdateProductOptions() {

    const { productOptionToUpdate, setProductOptionToUpdate } = useProductStore();

    const handleClose = () => {
        setProductOptionToUpdate(null);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-60 flex items-center justify-center p-4 z-[1500] backdrop-blur-sm">

            <div className="animate-themeAnimationLg bg-white rounded-xl w-full max-w-2xl overflow-hidden max-h-[90vh] overflow-y-auto scrollbar">

                <div className="flex items-center justify-between relative z-10 text-white bg-gradient-to-r from-gray-800 to-gray-700 px-8 py-5">

                    <div className="flex items-center gap-4">

                        <Repeat size={30} />

                        <div>
                            <h1 className="text-lg  font-black tracking-wide">
                                UPDATE PRODUCT
                            </h1>
                            <p className="text-sm text-gray-200 font-medium">
                                {productOptionToUpdate.description}
                            </p>
                        </div>

                    </div>

                    <button onClick={handleClose} className="bg-white/10 hover:bg-white/20 rounded-full p-1 transition-colors">
                        <X className="w-5 h-5" />
                    </button>

                </div>

                <div className="p-8">

                    {productOptionToUpdate.id === "name" && <UpdateProductName />}
                    {productOptionToUpdate.id === "tags" && <UpdateProductTags />}
                    {productOptionToUpdate.id === "stock" && <UpdateProductStock />}
                    {productOptionToUpdate.id === "images" && <UpdateProductImages />}
                    {productOptionToUpdate.id === "discount" && <UpdateProductDiscount />}
                    {productOptionToUpdate.id === "category" && <UpdateProductCategory />}
                    {productOptionToUpdate.id === "ingredients" && <UpdateProductIngredients />}
                    {productOptionToUpdate.id === "description" && <UpdateProductDescription />}
                    {productOptionToUpdate.id === "sizes-prices" && <UpdateProductSizeAndPrices />}

                </div>

            </div>

        </div>
    );
}


function UpdateProductName() {

    const { productToUpdate, isUpdatingProductName, updateProductName } = useProductStore();

    const [name, setName] = useState(productToUpdate?.name);

    const handleFormSubmission = (e) => {
        e.preventDefault();
        if (!name) return toast.error("Name is required");
        if (name === productToUpdate?.name) return toast.error("Name is the same as the current name");

        updateProductName(productToUpdate._id, name);
    };

    return (
        <form onSubmit={handleFormSubmission}>
            <Input required={true}
                type="name"
                label="Name"
                placeholder="Enter new name"
                value={name}
                icon={<Package className="w-5 h-5 text-gray-500" />}
                onChange={(e) => setName(e.target.value)}
            />

            <ThemeButton
                btnLabel="Update"
                extraClasses="mt-8 max-w-40 ml-auto"
                loadingLabel="Updating..."
                icon={<Save className="w-5 h-5" />}
                isButtonLoading={isUpdatingProductName}
            />
        </form>
    )
}

function UpdateProductDiscount() {

    const { productToUpdate, isUpdatingProductDiscount, updateProductDiscount } = useProductStore();

    const [discount, setDiscount] = useState(productToUpdate?.discount);

    const handleFormSubmission = (e) => {
        e.preventDefault();
        if (!discount) return toast.error("Discount is required");
        if (discount === productToUpdate?.discount) return toast.error("Discount is the same as the current discount");

        updateProductDiscount(productToUpdate._id, discount);
    };

    return (
        <form onSubmit={handleFormSubmission}>
            <Input required={true}
                type="discount"
                label="Discount"
                placeholder="Enter new discount"
                value={discount}
                icon={<Percent className="w-5 h-5 text-gray-500" />}
                onChange={(e) => setDiscount(e.target.value)}
            />

            <ThemeButton
                btnLabel="Update"
                extraClasses="mt-8 max-w-40 ml-auto"
                loadingLabel="Updating..."
                icon={<Save className="w-5 h-5" />}
                isButtonLoading={isUpdatingProductDiscount}
            />
        </form>
    )
}

function UpdateProductStock() {

    const { productToUpdate, isUpdatingProductStock, updateProductStock } = useProductStore();

    const [stock, setStock] = useState(productToUpdate?.stock);

    const handleFormSubmission = (e) => {
        e.preventDefault();
        if (!stock) return toast.error("Stock is required");
        if (stock === productToUpdate?.stock) return toast.error("Stock is the same as the current stock");

        updateProductStock(productToUpdate._id, stock);
    };

    return (
        <form onSubmit={handleFormSubmission}>
            <Input required={true}
                type="stock"
                label="Stock"
                placeholder="Enter new stock"
                value={stock}
                icon={<Package className="w-5 h-5 text-gray-500" />}
                onChange={(e) => setStock(e.target.value)}
            />

            <ThemeButton
                btnLabel="Update"
                extraClasses="mt-8 max-w-40 ml-auto"
                loadingLabel="Updating..."
                icon={<Save className="w-5 h-5" />}
                isButtonLoading={isUpdatingProductStock}
            />
        </form>
    )
}

function UpdateProductIngredients() {

    const { productToUpdate, isUpdatingProductIngredients, updateProductIngredients } = useProductStore();

    const [ingredients, setIngredients] = useState(productToUpdate?.ingredients);

    const handleFormSubmission = (e) => {
        e.preventDefault();
        if (!ingredients) return toast.error("Ingredients are required");
        if (ingredients === productToUpdate?.ingredients) return toast.error("Ingredients are the same as the current ingredients");

        updateProductIngredients(productToUpdate._id, ingredients);
    };

    return (
        <form onSubmit={handleFormSubmission}>
            <TextArea required={true}
                rows={8}
                label="Ingredients"
                placeholder="Enter new ingredients"
                value={ingredients}
                onChange={(e) => setIngredients(e.target.value)}
            />

            <ThemeButton
                btnLabel="Update"
                extraClasses="mt-8 max-w-40 ml-auto"
                loadingLabel="Updating..."
                icon={<Save className="w-5 h-5" />}
                isButtonLoading={isUpdatingProductIngredients}
            />
        </form>
    )
}

function UpdateProductDescription() {

    const { productToUpdate, isUpdatingProductDescription, updateProductDescription } = useProductStore();

    const [description, setDescription] = useState(productToUpdate?.description);

    const handleFormSubmission = (e) => {
        e.preventDefault();
        if (!description) return toast.error("Description is required");
        if (description === productToUpdate?.description) return toast.error("Description is the same as the current description");

        updateProductDescription(productToUpdate._id, description);
    };

    return (
        <form onSubmit={handleFormSubmission}>
            <TextArea required={true}
                rows={8}
                label="Description"
                placeholder="Enter new description"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
            />

            <ThemeButton
                btnLabel="Update"
                extraClasses="mt-8 max-w-40 ml-auto"
                loadingLabel="Updating..."
                icon={<Save className="w-5 h-5" />}
                isButtonLoading={isUpdatingProductDescription}
            />
        </form>
    )
}

function UpdateProductCategory() {

    const { productToUpdate, isUpdatingProductCategory, updateProductCategory } = useProductStore();

    const [category, setCategory] = useState(productToUpdate?.category);

    const handleFormSubmission = (e) => {
        e.preventDefault();
        if (!category) return toast.error("Category is required");
        if (category === productToUpdate?.category) return toast.error("Category is the same as the current category");

        updateProductCategory(productToUpdate._id, category);
    };

    return (
        <form onSubmit={handleFormSubmission} className="pb-10">
            <Select required={true}
                label="Category"
                options={categories}
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                icon={<Package className="w-5 h-5 text-gray-500" />}
            />

            <ThemeButton
                btnLabel="Update"
                extraClasses="mt-8 max-w-40 ml-auto"
                loadingLabel="Updating..."
                icon={<Save className="w-5 h-5" />}
                isButtonLoading={isUpdatingProductCategory}
            />
        </form>
    )
}

function UpdateProductTags() {

    const { productToUpdate, isUpdatingProductTags, updateProductTags } = useProductStore();

    const [currentTags, setCurrentTags] = useState(productToUpdate?.tags || []);
    const [newTags, setNewTags] = useState(productToUpdate?.tags?.join(", ") || "");

    useEffect(() => {
        setCurrentTags(newTags.split(", "));
    }, [newTags]);


    const handleFormSubmission = (e) => {
        e.preventDefault();
        if (!newTags) return toast.error("Tags are required");

        updateProductTags(productToUpdate._id, newTags.split(", "));
    };

    return (
        <form onSubmit={handleFormSubmission}>

            <TextArea required={true}
                label="Tags"
                placeholder="Enter new tags separated by commas"
                value={newTags}
                rows={3}
                onChange={(e) => setNewTags(e.target.value)}
                icon={<Package className="w-5 h-5 text-gray-500" />}
            />

            <p className="text-sm font-medium text-gray-800 ">
                <span className="text-red-500 mr-1">*</span>
                Enter tags separated by commas ( , )
            </p>

            <div className="flex flex-col gap-1 mt-6">
                <p className="text-sm font-medium">
                    Current tags:
                </p>
                <ol className="grid grid-cols-4 gap-2 text-sm font-medium text-gray-800 ml-10">
                    {currentTags?.length > 0 ?
                        currentTags?.map((tag, index) => (
                            <li key={index} className="text-sm text-gray-600">
                                {index + 1}. {tag}
                            </li>))
                        :
                        <li className="text-sm text-gray-600">
                            No tags
                        </li>
                    }
                </ol>
            </div>

            <ThemeButton
                btnLabel="Update"
                extraClasses="mt-8 max-w-40 ml-auto"
                loadingLabel="Updating..."
                icon={<Save className="w-5 h-5" />}
                isButtonLoading={isUpdatingProductTags}
            />
        </form>
    )
}

function UpdateProductSizeAndPrices() {

    const { productToUpdate, isUpdatingProductSizeAndPrices, updateProductSizeAndPrices } = useProductStore();

    const [sizeAndPrices, setSizeAndPrices] = useState(productToUpdate?.sizeAndPrices);

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

    const handleFormSubmission = (e) => {
        e.preventDefault();
        if (!sizeAndPrices) return toast.error("Sizes and prices are required");
        if (sizeAndPrices === productToUpdate?.sizeAndPrices) return toast.error("Sizes and prices are the same as the current sizes and prices");

        updateProductSizeAndPrices(productToUpdate._id, sizeAndPrices);
    };

    return (
        <form onSubmit={handleFormSubmission}
            className="max-h-[80vh] overflow-y-auto scrollbar"
        >
            <div>
                <label className="block text-sm font-semibold text-gray-800 mb-3">
                    Product Sizes & Prices <span className="text-red-500">*</span>
                </label>

                <div className="space-y-4">
                    {sizeAndPrices.map((size, index) => (
                        <div key={index} className="flex items-end gap-4 rounded-lg">
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

            </div>

            <ThemeButton
                btnLabel="Update"
                extraClasses="mt-8 max-w-40 ml-auto"
                loadingLabel="Updating..."
                icon={<Save className="w-5 h-5" />}
                isButtonLoading={isUpdatingProductSizeAndPrices}
            />
        </form>
    )
}

function UpdateProductImages() {
    const { productToUpdate, isUpdatingProductImages, updateProductImages } = useProductStore();

    const [existingImages, setExistingImages] = useState(productToUpdate?.images || []);
    const [newImages, setNewImages] = useState([]);
    const [imagePreview, setImagePreview] = useState(productToUpdate?.images || []);

    const handleImageUpload = (e) => {
        const files = Array.from(e.target.files);
        const previews = files.map(file => URL.createObjectURL(file));

        setNewImages(prev => [...prev, ...files]);
        setImagePreview(prev => [...prev, ...previews]);
    };

    const removeImage = (index) => {
        const isExisting = index < existingImages.length;

        if (isExisting) {
            const updated = [...existingImages];
            updated.splice(index, 1);
            setExistingImages(updated);
        } else {
            const newIndex = index - existingImages.length;
            const updated = [...newImages];
            updated.splice(newIndex, 1);
            setNewImages(updated);
        }

        const updatedPreviews = [...imagePreview];
        updatedPreviews.splice(index, 1);
        setImagePreview(updatedPreviews);
    };

    const handleFormSubmission = async (e) => {
        e.preventDefault();

        const imagesLength = existingImages.length + newImages.length;
        if (imagesLength === 0) return toast.error("Please provide at least one image.");
        if (imagesLength > 5) return toast.error("You can only upload up to 5 images.");

        const formData = new FormData();

        existingImages.forEach((url) => {
            formData.append("existingImages", url);
        });

        newImages.forEach((file) => {
            formData.append("image", file);
        });

        updateProductImages(productToUpdate._id, formData);
    };

    return (
        <form onSubmit={handleFormSubmission}>
            <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                    Product Images <span className="text-red-500">*</span>
                </label>

                <div className="mt-1 flex justify-center p-6 border-2 border-dashed rounded-md border-gray-300 hover:border-indigo-400 transition-colors">
                    <div className="space-y-1 text-center">
                        <UploadCloud className="mx-auto h-12 w-12 text-gray-400" />

                        <div className="flex text-sm text-gray-600">
                            <label htmlFor="image-upload" className="cursor-pointer text-indigo-600 hover:text-indigo-500 font-medium">
                                <span>Upload images</span>
                                <input
                                    id="image-upload"
                                    type="file"
                                    className="sr-only"
                                    multiple
                                    accept="image/*"
                                    onChange={handleImageUpload}
                                />
                            </label>
                            <p className="pl-1">or drag and drop</p>
                        </div>

                        <p className="text-xs text-gray-500">PNG, JPG up to 10MB</p>
                    </div>
                </div>

                {imagePreview.length > 0 && (
                    <div className="mt-4 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
                        {imagePreview.map((src, index) => (
                            <div key={index} className="relative rounded-md overflow-hidden w-24 h-24 bg-gray-100">
                                <img src={src} alt={`Preview ${index + 1}`} className="h-full w-full object-cover" />
                                <button
                                    type="button"
                                    className="absolute top-1 right-1 bg-black bg-opacity-50 rounded-full p-1 text-white"
                                    onClick={() => removeImage(index)}
                                >
                                    <X className="h-4 w-4" />
                                </button>
                            </div>
                        ))}
                    </div>
                )}
            </div>

            <ThemeButton
                btnLabel="Update"
                extraClasses="mt-8 max-w-40 ml-auto"
                loadingLabel="Updating..."
                icon={<Save className="w-5 h-5" />}
                isButtonLoading={isUpdatingProductImages}
            />
        </form>
    );
}
