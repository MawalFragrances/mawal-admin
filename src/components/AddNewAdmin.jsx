import { useState } from "react";
import { Input, Select } from "./Inputs";
import { Mail, User, UserRoundPlus } from "lucide-react";
import { z } from "zod";
import useComponentStore from "../zustand/component.store";
import { ThemeButton } from "./Buttons";
import { roleOptions } from "../constants";
import toast from "react-hot-toast";
import useAdminsStore from "../zustand/admins.store";

export default function AddNewAdmin() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [role, setRole] = useState("Admin");
    const [errors, setErrors] = useState({});

    const { setDisplayAddNewAdmin } = useComponentStore();
    const { addNewAdmin, isAddingNewAdmin } = useAdminsStore();

    const formSchema = z.object({
        name: z.string()
            .min(1, "Name is required."),

        email: z.string()
            .min(1, "Email is required.")
            .email("Invalid email address"),

        role: z.enum(["Super Admin", "Admin"], {
            errorMap: () => ({ message: "Role is required." }),
        }),

    });
    const validateForm = () => {
        const formData = { name, email, role };
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

        await addNewAdmin({ name, email, role });
        setDisplayAddNewAdmin(false);
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-[1000]">

            <form onSubmit={handleFormSubmission}
                className="animate-themeAnimationLg bg-white rounded-xl p-6 w-full max-w-md shadow-2xl">

                <h2 className="text-2xl font-bold text-gray-700 mb-6">
                    Add New Admin
                </h2>

                <div className="space-y-4">

                    {/* NAME */}
                    <Input required={true}
                        type="name"
                        name="name"
                        label="Name"
                        value={name}
                        errors={errors}
                        placeholder="John Doe"
                        onChange={(e) => setName(e.target.value)}
                        icon={<User className="h-5 w-5 text-gray-400" />}
                        onBlur={(e) => validateField(e.target.name, e.target.value)}
                    />

                    {/* EMAIL */}
                    <Input required={true}
                        type="email"
                        name="email"
                        label="Email"
                        value={email}
                        errors={errors}
                        placeholder="you@example.com"
                        onChange={(e) => setEmail(e.target.value)}
                        icon={<Mail className="h-5 w-5 text-gray-400" />}
                        onBlur={(e) => validateField(e.target.name, e.target.value)}
                    />

                    <Select required={true}
                        label="Role"
                        name="role"
                        value={role}
                        options={roleOptions}
                        errors={errors}
                        placeholder="Select an option"
                        onChange={(e) => setRole(e.target.value)}
                        onBlur={(e) => validateField(e.target.name, e.target.value)}
                        icon={<Mail className="h-5 w-5 text-gray-400" />}
                    />

                </div>

                <div className="flex gap-3 mt-8">

                    <button onClick={() => setDisplayAddNewAdmin(false)}
                        className="flex-1 px-8 py-3 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors font-medium">
                        Cancel
                    </button>

                    <ThemeButton
                        btnLabel="Add Admin"
                        extraClasses="max-w-1/2"
                        isButtonLoading={isAddingNewAdmin}
                        loadingLabel="Adding..."
                        icon={<UserRoundPlus className="h-5 w-5 text-white" />}

                    />
                </div>

            </form>

        </div>
    );
}