import { BarChart3, ShoppingCart, Package, PieChart, Users, Store, Star, ImageIcon, FileText, Utensils, FolderOpen, Tag, DollarSign, Edit3, Percent } from "lucide-react";

export const categories = [
    { id: "men", label: "Men", value: "MEN" },
    { id: "women", label: "Women", value: "WOMEN" },
    { id: "unisex", label: "Unisex", value: "UNISEX" },
    { id: "signature", label: "Signature", value: "SIGNATURE" },
];

export const categoriesFilters = [
    { id: "all", label: "All", value: "ALL" },
    { id: "men", label: "Men", value: "MEN" },
    { id: "women", label: "Women", value: "WOMEN" },
    { id: "unisex", label: "Unisex", value: "UNISEX" },
    { id: "signature", label: "Signature", value: "SIGNATURE" },
];

export const orderStatusFilters = [
    { label: "All Status", value: "ALL" },
    { label: "Pending", value: "PENDING" },
    { label: "Confirmed", value: "CONFIRMED" },
    { label: "Packed", value: "PACKED" },
    { label: "Shipped", value: "SHIPPED" },
    { label: "Delivered", value: "DELIVERED" },
    { label: "Cancelled", value: "CANCELLED" },
];

export const orderStatusOptions = [
    { label: "Pending", value: "PENDING" },
    { label: "Confirmed", value: "CONFIRMED" },
    { label: "Packed", value: "PACKED" },
    { label: "Shipped", value: "SHIPPED" },
    { label: "Delivered", value: "DELIVERED" },
    { label: "Cancelled", value: "CANCELLED" },
];

export const roleOptions = [
    { label: "Super Admin", value: "Super Admin" },
    { label: "Admin", value: "Admin" },
];

export const reviewStatusOptions = [
    { label: "Pending", value: "PENDING" },
    { label: "Approved", value: "APPROVED" },
    { label: "Rejected", value: "REJECTED" },
];

export const superAdminTabs = [
    { icon: BarChart3, label: "Overview", id: "overview" },
    { icon: ShoppingCart, label: "Orders", id: "orders" },
    { icon: Package, label: "Products", id: "products" },
    { icon: PieChart, label: "Analytics", id: "analytics" },
    { icon: Users, label: "Manage Admins", id: "manage-admins" },
    { icon: Store, label: "Manage Store", id: "manage-store" },
    { icon: Star, label: "Reviews", id: "reviews" },
]

export const simpleAdminTabs = [
    { icon: ShoppingCart, label: "Orders", id: "orders" },
    { icon: Store, label: "Manage Store", id: "manage-store" },
]

export const updateProductOptions = [
    {
        id: "sizes-prices",
        label: "Update Sizes & Prices",
        icon: DollarSign,
        description: "Modify pricing and size options",
    },
    {
        id: "discount",
        label: "Update Discount",
        icon: Percent,
        description: "Set or modify discount percentage",
    },
    {
        id: "stock",
        label: "Update Stock",
        icon: Package,
        description: "Manage inventory levels",
    },
    {
        id: "name",
        label: "Update Name",
        icon: Edit3,
        description: "Change product title",
    },
    {
        id: "images",
        label: "Update Images",
        icon: ImageIcon,
        description: "Add or modify product photos",
    },
    {
        id: "description",
        label: "Update Description",
        icon: FileText,
        description: "Edit product details and features",
    },
    {
        id: "ingredients",
        label: "Update Ingredients",
        icon: Utensils,
        description: "Modify ingredient list",
    },
    {
        id: "category",
        label: "Update Category",
        icon: FolderOpen,
        description: "Change product category",
    },
    {
        id: "tags",
        label: "Update Tags",
        icon: Tag,
        description: "Add or remove product tags",
    },

];