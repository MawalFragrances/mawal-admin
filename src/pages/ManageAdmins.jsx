import { useEffect } from "react";
import { Trash2, User, Mail, Calendar, UserRoundPlus, UserRound } from "lucide-react";
import useComponentStore from "../zustand/component.store";
import useAdminsStore from "../zustand/admins.store";
import DashboardLoader from "../components/DashboardLoader";

export default function ManageAdmins() {


    const { setDisplayAddNewAdmin, confirmAction } = useComponentStore();
    const { admins, isGettingAdmins, getAdminsData, deleteAdmin } = useAdminsStore();


    useEffect(() => { window.scrollTo(0, 0) }, []);
    useEffect(() => { getAdminsData(); }, [getAdminsData]);

    const handleDeleteAdmin = (adminId) => {
        confirmAction("Are you sure you want to delete this admin?", "Delete", () => deleteAdmin(adminId));
    };

    if (isGettingAdmins) return <DashboardLoader />

    return (
        <div className="animate-themeAnimationLg min-h-screen flex-1 p-6 bg-white">

            <div className="max-w-7xl mx-auto">

                {/* HEADER */}
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-700 mb-2">Manage Admins</h1>
                    <p className="text-gray-500">Add, delete, and manage your admins efficiently</p>
                </div>

                {/* STATS CARDS */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

                    <div className="flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 p-6 rounded-lg shadow-sm border border-gray-200">
                        <div>
                            <p className="text-sm font-medium text-gray-500 mb-1">Total Admins</p>
                            <p className="text-3xl font-bold text-gray-700">{admins.length}</p>
                        </div>
                        <User className="w-8 h-8 text-gray-500" />
                    </div>

                    <div />

                    {/* ADD NEW ADMIN BUTTON */}
                    <button onClick={() => setDisplayAddNewAdmin(true)}
                        className="flex items-center gap-2 bg-gray-700 text-white px-6 py-3 rounded-lg hover:bg-gray-800 transition-colors font-medium shadow-lg hover:shadow-xl transform hover:-translate-y-0.5">
                        <UserRoundPlus className="w-5 h-5" />
                        Add New Admin
                    </button>

                </div>

                {/* ADMINS GRID */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">

                    {admins.map((admin) => (
                        <div key={admin._id} className="bg-white border border-gray-200 rounded-xl p-6 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1">

                            <div className="flex items-start justify-between mb-4">

                                <div className="flex items-center gap-3">
                                    <div className="w-12 h-12 bg-gray-700 text-white rounded-full flex items-center justify-center font-bold text-lg">
                                        {admin.name.charAt(0)}
                                    </div>
                                    <div>
                                        <h3 className="font-semibold text-gray-700 text-lg">{admin.name}</h3>
                                    </div>
                                </div>

                                <button onClick={() => handleDeleteAdmin(admin._id)}
                                    className="p-2 text-red-500 hover:text-red-700 hover:bg-red-50 rounded-full transition-colors">
                                    <Trash2 className="w-4 h-4" />
                                </button>

                            </div>

                            <div className="space-y-3">

                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Mail className="w-4 h-4" />
                                    <span>{admin.email}</span>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <UserRound className="w-4 h-4" />
                                    <span>{admin.role}</span>
                                </div>

                                <div className="flex items-center gap-2 text-sm text-gray-500">
                                    <Calendar className="w-4 h-4" />
                                    <span>Joined {new Date(admin.createdAt).toLocaleDateString()}</span>
                                </div>

                            </div>

                        </div>
                    ))}
                </div>

                {/* NO ADMINS FOUND */}
                {admins.length === 0 && (
                    <div className="text-center py-12">
                        <User className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                        <h3 className="text-lg font-medium text-gray-500 mb-2">No admins found</h3>
                        <p className="text-gray-400">Try adjusting your search terms or add a new admin.</p>
                    </div>
                )}

            </div>

        </div>
    );
}