import { z } from "zod";
import { useState } from "react";
import toast from "react-hot-toast";
import { Lock, Loader2, LogIn, Mail, User } from "lucide-react";
import useAuthStore from "../zustand/auth.store";
import { Input, InputPassword, Select } from "../components/Inputs";
import { useNavigate } from "react-router-dom";
import { ThemeButton } from "../components/Buttons";
import { roleOptions } from "../constants";

export default function AdminLogin() {

    const [role, setRole] = useState("");
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const navigateTo = useNavigate();

    const { loginWithGoogle } = useAuthStore();

    const formSchema = z.object({
        role: z.enum(["Super Admin", "Admin"], {
            errorMap: () => ({ message: "Role is required." }),
        }),
    });
    const validateForm = () => {
        const formData = { role };
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

    const handleLoginWithGoogle = async () => {
        if (!validateForm()) return toast.error("Please fill in all the fields correctly.");
        setIsLoading(true);
        await loginWithGoogle(role, navigateTo);
        setIsLoading(false);
    };

    return (
        <div className="animate-themeAnimationLg min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4 py-10 relative overflow-hidden">

            {/* MAIN LOGIN CONTAINER */}
            <div className="relative z-10 w-full max-w-md">

                {/* GLASSMORPHISM CARD */}
                <div className="backdrop-blur-lg bg-white/80 border border-gray-200 rounded-3xl p-8 shadow-2xl ">

                    {/* HEADER */}
                    <div className="text-center mb-6">

                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl mb-2">
                            <Lock className="w-8 h-8 text-white" />
                        </div>

                        <h1 className="text-3xl font-bold text-gray-900 mb-1 bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                            Welcome Back
                        </h1>

                        <p className="text-gray-600 text-sm">
                            Sign in to continue your journey
                        </p>

                    </div>


                    {/* LOGIN FORM */}
                    <div
                        className="space-y-7">

                        <Select required={true}
                            label="Select a role"
                            name="role"
                            value={role}
                            errors={errors}
                            placeholder="Select a role"
                            onChange={(e) => setRole(e.target.value)}
                            icon={<User className="h-6 w-6 text-gray-400" />}
                            options={roleOptions}
                            onBlur={(e) => validateField(e.target.name, e.target.value)}
                        />

                        <button onClick={handleLoginWithGoogle}
                            className="w-full flex items-center justify-center gap-3 bg-white border-2 border-gray-300 rounded-xl px-6 py-3 text-gray-700 font-medium hover:bg-gray-50 hover:border-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed group mt-5"
                            disabled={isLoading}>

                            {isLoading ? (
                                <>
                                    <Loader2 className="w-5 h-5 animate-spin" />
                                    <span className="text-base">
                                        Logging in...
                                    </span>
                                </>
                            ) : (
                                <>
                                    <svg className="w-5 h-5" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" /><path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" /><path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" /><path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" /></svg>

                                    <span className="text-base">
                                        Login with Google
                                    </span>
                                </>
                            )}

                        </button>

                        <div className="inset-0 opacity-40">
                            {/* DIVIDER */}
                            <div className="mb-3 flex items-center">
                                <div className="flex-1 border-t border-gray-500"></div>
                                <span className="px-4 text-gray-700 text-sm">or</span>
                                <div className="flex-1 border-t border-gray-500"></div>
                            </div>

                            {/* EMAIL */}
                            <Input required={true}
                                type="email"
                                name="email"
                                label="Email"
                                errors={errors}
                                isDisabled={true}
                                placeholder="you@example.com"
                                icon={<Mail className="h-5 w-5 text-gray-400" />}
                                onBlur={(e) => validateField(e.target.name, e.target.value)}
                            />

                            <InputPassword required={true}
                                label="Password"
                                name="password"
                                errors={errors}
                                icon={<Lock className="h-5 w-5 text-gray-400" />}
                                placeholder="********"
                                isDisabled={true}
                                onBlur={(e) => validateField(e.target.name, e.target.value)}
                            />

                            {/* LOGIN BUTTON */}
                            <ThemeButton
                                btnLabel="Login"
                                extraClasses="w-full mt-6"
                                isButtonLoading={isLoading}
                                loadingLabel="Logging in..."
                                icon={<LogIn className="w-5 h-5" />}
                            />
                        </div>

                    </div>

                </div>

            </div>

            {/* ANIMATED BACKGROUND ELEMENTS */}
            <div className="absolute inset-0 overflow-hidden">
                <div className="absolute -top-4 -left-4 w-72 h-72 bg-gray-200 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse" />
                <div className="absolute -bottom-8 -right-4 w-72 h-72 bg-gray-300 rounded-full mix-blend-multiply filter blur-xl opacity-30 animate-pulse delay-1000" />
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-gray-100 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-pulse delay-500" />
            </div>

        </div>
    );
}