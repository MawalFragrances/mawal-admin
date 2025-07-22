import { Link, useNavigate } from "react-router-dom";
import React, { useState, useRef } from "react";
import useAuthStore from "../zustand/auth.store";
import { ThemeButton } from "../components/Buttons";
import { Mail, ArrowLeft, Info } from "lucide-react";

export default function VerifyEmail() {

    const [error, setError] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [code, setCode] = useState(["", "", "", "", "", ""]);

    const inputRefs = useRef([]);
    const email = sessionStorage.getItem("email");
    const navigateTo = useNavigate();

    const { verifyOtp } = useAuthStore();

    const handleCodeChange = (index, value) => {
        if (value.length > 1) return;

        const newCode = [...code];
        newCode[index] = value;
        setCode(newCode);
        setError("");

        // Auto-focus next input
        if (value && index < 5) inputRefs.current[index + 1]?.focus();

        // Auto-verify when all fields are filled
        if (newCode.every(digit => digit !== "") && newCode.join("").length === 6)
            handleVerifyEmail(newCode.join(""));
    };

    const handleKeyDown = (index, e) => {
        // Handle backspace
        if (e.key === "Backspace" && !code[index] && index > 0) {
            inputRefs.current[index - 1]?.focus();
        }

        // Handle paste
        if (e.key === "Enter") {
            handleVerifyEmail(code.join(""));
        }
    };

    const handlePaste = (e) => {
        e.preventDefault();
        const pastedData = e.clipboardData.getData("text").replace(/\D/g, "").slice(0, 6);

        if (pastedData.length === 6) {
            const newCode = pastedData.split("");
            setCode(newCode);
            handleVerifyEmail(pastedData);
        }
    };

    const handleVerifyEmail = async (verificationCode = code.join("")) => {
        if (verificationCode.length !== 6) {
            setError("Please enter a 6-digit verification code");
            return;
        }

        setIsLoading(true);
        setError("");
        await verifyOtp(verificationCode, navigateTo);
        setIsLoading(false);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100 flex items-center justify-center p-4 py-10 relative overflow-hidden">

            {/* MAIN VERIFICATION CONTAINER */}
            <div className="relative z-10 w-full max-w-md">

                <form className="animate-themeAnimationLg backdrop-blur-lg bg-white/80 border border-gray-200 rounded-3xl p-8 shadow-2xl">

                    {/* BACK BUTTON */}
                    <Link to="/"
                        className="inline-flex items-center gap-2 text-gray-600 hover:text-gray-800 transition-colors duration-200 mb-3 text-sm">
                        <ArrowLeft className="w-4 h-4" />
                        Back
                    </Link>

                    {/* HEADER */}
                    <div className="text-center mb-4">

                        <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-gray-800 to-gray-900 rounded-2xl mb-3">
                            <Mail className="w-8 h-8 text-white" />
                        </div>

                        <h1 className="text-3xl font-bold text-gray-900 mb-1 bg-gradient-to-r from-gray-700 to-gray-900 bg-clip-text text-transparent">
                            Verify Your Email
                        </h1>

                        <p className="text-gray-600 text-sm leading-relaxed">
                            We"ve sent a 6-digit verification code to<br />
                            <span className="font-medium text-gray-800">{email}</span>
                        </p>

                    </div>

                    {/* VERIFICATION CODE INPUTS */}
                    <div className="mb-6">

                        <label className="block text-sm font-medium text-gray-700 mb-3">
                            Verification Code <span className="text-red-600">*</span>
                        </label>

                        <div className="flex gap-3 justify-center mb-4">
                            {code.map((digit, index) => (
                                <input
                                    key={index}
                                    ref={el => inputRefs.current[index] = el}
                                    type="text"
                                    inputMode="numeric"
                                    maxLength="1"
                                    value={digit}
                                    onChange={(e) => handleCodeChange(index, e.target.value.replace(/\D/g, ""))}
                                    onKeyDown={(e) => handleKeyDown(index, e)}
                                    onPaste={index === 0 ? handlePaste : undefined}
                                    className={`w-12 h-14 text-center text-xl font-bold border-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all duration-200 ${error
                                        ? "border-red-300 bg-red-50"
                                        : digit
                                            ? "border-gray-400 bg-gray-50"
                                            : "border-gray-300 bg-white hover:border-gray-400"
                                        }`}
                                />
                            ))}
                        </div>

                        {error && (
                            <p className="text-red-500 text-sm text-center">{error}</p>
                        )}
                    </div>

                    <div className="text-gray-600 text-sm mb-6 bg-gray-100 pl-3 pr-5 py-3 rounded-lg flex gap-2.5 mx-4 border-l-4 border-gray-500">
                        <Info /> Don’t forget to check your spam or junk folder in case our email ended up there!
                    </div>

                    {/* VERIFY BUTTON */}
                    <div>
                        <ThemeButton
                            btnLabel="Verify Email"
                            isButtonLoading={isLoading}
                            onClick={handleVerifyEmail}
                            loadingLabel="Verifying..."
                            icon={<Mail className="w-6 h-6 text-white/90" />}
                            extraClasses="mt-7"
                        />
                    </div>

                    {/* CHANGE EMAIL */}
                    <div className="mt-6 pt-6 border-t border-gray-200 text-center">
                        <p className="text-gray-600 text-sm">
                            Wrong email?{" "}
                            <Link to="/" className="text-blue-600 hover:text-blue-700 transition-colors duration-200 hover:underline font-medium">
                                Change email address
                            </Link>
                        </p>
                    </div>

                </form>

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