import { useState } from "react";
import { Eye, EyeOff, ChevronDown } from "lucide-react";

const inputClasses = "w-full py-3 border-2 rounded-xl transition-all duration-300 focus:outline-none placeholder:font-medium";
const noErrorClasses = "border-gray-300 hover:border-indigo-300 focus:border-indigo-500";
const errorClasses = "border-red-300 bg-red-50";


export function Input({
    label,
    name,
    icon,
    type,
    value,
    onBlur,
    onChange,
    placeholder,
    ariaLabel,
    errors = {},
    required = false,
    isDisabled = false,
}) {
    return (
        <div className="w-full space-y-2">

            <label htmlFor={name} className="block text-sm font-semibold text-gray-800">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            <div className="relative">

                {icon && <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">{icon}</div>}

                <input
                    id={name}
                    name={name}
                    type={type}
                    value={value}
                    onBlur={onBlur}
                    required={required}
                    onChange={onChange}
                    disabled={isDisabled}
                    aria-label={ariaLabel}
                    placeholder={placeholder}
                    className={`${icon ? "pl-11" : "pl-4"} ${inputClasses} 
                        ${errors[name] ? errorClasses : noErrorClasses}`}
                />

            </div>

            {errors[name] && <p className="text-sm font-semibold text-red-500">* {errors[name]}</p>}

        </div>
    )
}

export function InputPassword({
    label,
    name,
    value,
    onBlur,
    onChange,
    placeholder,
    icon,
    errors = {},
    required = false,
}) {
    const [showPassword, setShowPassword] = useState(false);

    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword);
    };

    return (
        <div className="w-full space-y-2">

            <label htmlFor={name} className="block text-sm font-semibold text-gray-800">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            <div className="relative">

                {icon && <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">{icon}</div>}

                <input
                    id={name}
                    name={name}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    required={required}
                    placeholder={placeholder}
                    type={showPassword ? "text" : "password"}
                    className={`${icon ? "pl-11" : "pl-4"} ${inputClasses} ${errors[name] ? errorClasses : noErrorClasses}`}
                />

                <button type="button"
                    onClick={togglePasswordVisibility}
                    className="absolute inset-y-0 right-0 pr-4 flex items-center hover:text-gray-600 transition-colors duration-200"
                    tabIndex={-1}>
                    {showPassword ? (
                        <EyeOff className="w-5 h-5 text-gray-400" />
                    ) : (
                        <Eye className="w-5 h-5 text-gray-400" />
                    )}
                </button>

            </div>

            {errors[name] && <p className="text-sm font-semibold text-red-500">* {errors[name]}</p>}

        </div>
    )
}

export function TextArea({
    label,
    name,
    icon,
    rows,
    value,
    onBlur,
    onChange,
    placeholder,
    errors = {},
    required = false,
}) {
    return (
        <div className="w-full space-y-2">

            <label htmlFor={name} className="block text-sm font-semibold text-gray-800">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            <div className="relative">

                {icon && <div className="absolute top-3.5 left-0 pl-4 flex items-center pointer-events-none">{icon}</div>}

                <textarea
                    id={name}
                    name={name}
                    value={value}
                    rows={rows}
                    onBlur={onBlur}
                    onChange={onChange}
                    required={required}
                    placeholder={placeholder}
                    className={`${icon ? "pl-11" : "pl-4"} ${inputClasses} resize-vertical
                         ${errors[name] ? errorClasses : noErrorClasses}`}
                />

            </div>

            {errors[name] && <p className="text-sm font-semibold text-red-500">* {errors[name]}</p>}

        </div>
    )
}

export function Select({
    label,
    name,
    icon,
    value,
    onBlur,
    onChange,
    placeholder,
    options = [],
    errors = {},
    required = false,
}) {
    return (
        <div className="w-full space-y-2">

            <label htmlFor={name} className="block text-sm font-semibold text-gray-800">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            <div className="relative">

                {icon && <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">{icon}</div>}

                <select
                    id={name}
                    name={name}
                    value={value}
                    onBlur={onBlur}
                    onChange={onChange}
                    required={required}
                    className={`${icon ? "pl-11" : "pl-4"} ${inputClasses} appearance-none
                       ${errors[name] ? errorClasses : noErrorClasses}`}>

                    {placeholder && <option value="" disabled className="text-gray-400">{placeholder}</option>}

                    {options.map((option, index) => (
                        <option key={index} value={option.value}>
                            {option.label}
                        </option>
                    ))}

                </select>

                <div className="absolute inset-y-0 right-0 pr-4 flex items-center pointer-events-none">
                    <ChevronDown className="h-5 w-5 text-gray-400" />
                </div>

            </div>

            {errors[name] && <p className="text-sm font-semibold text-red-500">* {errors[name]}</p>}

        </div>
    )
}

export function Radio({
    label,
    name,
    value,
    onBlur,
    onChange,
    options = [],
    errors = {},
    required = false,
    flexDirection = "col",
}) {
    const containerClasses = flexDirection === "row" ? "flex flex-wrap gap-3" : "space-y-3";

    return (
        <div className="w-full space-y-2">

            <label className="block text-sm font-semibold text-gray-800">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            <div className={containerClasses}>

                {options.map((option, index) => (
                    <div key={index} className="relative flex-shrink-0">

                        <input id={`${name}-${index}`}
                            name={name}
                            type="radio"
                            onBlur={onBlur}
                            className="sr-only"
                            onChange={onChange}
                            value={option.value}
                            checked={value === option.value}
                        />

                        <label htmlFor={`${name}-${index}`}
                            className={`flex items-center cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md
                                ${flexDirection === "row" ? "min-w-fit" : "w-full"}
                                ${value === option.value
                                    ? errors[name]
                                        ? "border-red-500 bg-red-50 shadow-sm"
                                        : "border-indigo-500 bg-indigo-50 shadow-sm"
                                    : errors[name]
                                        ? "border-red-300 bg-white hover:border-red-400"
                                        : "border-gray-200 bg-white hover:border-gray-300"
                                }`}
                        >
                            <div className="flex items-center">

                                <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 bg-white
                                    ${value === option.value
                                        ? errors[name]
                                            ? "border-red-500 bg-red-500"
                                            : "border-indigo-500 bg-indigo-500"
                                        : errors[name]
                                            ? "border-red-300"
                                            : "border-gray-300"
                                    }`}
                                >
                                    {value === option.value &&
                                        <div className={`w-2.5 h-2.5 rounded-full 
                                            ${errors[name] ? "bg-red-500" : "bg-indigo-500"}`} />
                                    }
                                </div>

                                <div className="ml-4">
                                    <div className={`text-sm font-semibold transition-colors duration-200
                                        ${value === option.value
                                            ? errors[name]
                                                ? "text-red-900"
                                                : "text-indigo-900"
                                            : errors[name]
                                                ? "text-red-700"
                                                : "text-gray-900"
                                        }`}
                                    >
                                        {option.label}
                                    </div>
                                </div>

                            </div>

                        </label>

                    </div>
                ))}
            </div>

            {errors[name] && <p className="text-sm font-semibold text-red-500">* {errors[name]}</p>}

        </div>
    )
}

export function Checkbox({
    name,
    label,
    value,
    onBlur,
    onChange,
    options = [],
    errors = {},
    required = false,
    flexDirection = "column",
}) {

    const handleCheckboxChange = (optionValue) => {

        const currentValues = Array.isArray(value) ? value : [];

        const newValues = currentValues.includes(optionValue)
            ? currentValues.filter(v => v !== optionValue)
            : [...currentValues, optionValue];

        onChange({ target: { name, value: newValues } });
    };

    const handleBlur = () => onBlur && onBlur({ target: { name, value: Array.isArray(value) ? value : [] } });

    const isChecked = (optionValue) => {
        return Array.isArray(value) ? value.includes(optionValue) : false;
    };

    const containerClasses = flexDirection === "row" ? "flex flex-wrap gap-3" : "space-y-3";

    return (
        <div className="w-full space-y-2">

            <label className="block text-sm font-semibold text-gray-800">
                {label} {required && <span className="text-red-500">*</span>}
            </label>

            <div className={containerClasses}>
                {options.map((option, index) => (
                    <div key={index} className="relative flex-shrink-0">

                        <input id={`${name}-${index}`}
                            name={name}
                            type="checkbox"
                            className="sr-only"
                            onBlur={handleBlur}
                            value={option.value}
                            checked={isChecked(option.value)}
                            onChange={() => handleCheckboxChange(option.value)}
                        />

                        <label htmlFor={`${name}-${index}`}
                            className={`flex items-center cursor-pointer p-4 rounded-xl border-2 transition-all duration-200 hover:shadow-md
                                ${flexDirection === "row" ? "flex-1 min-w-0" : ""}
                                ${isChecked(option.value)
                                    ? errors[name]
                                        ? "border-red-500 bg-red-50 shadow-sm"
                                        : "border-indigo-500 bg-indigo-50 shadow-sm"
                                    : errors[name]
                                        ? "border-red-300 bg-white hover:border-red-400"
                                        : "border-gray-200 bg-white hover:border-gray-300"
                                }`}
                        >
                            <div className="flex items-center">

                                <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all duration-200
                                    ${isChecked(option.value)
                                        ? errors[name]
                                            ? "border-red-500 bg-red-500"
                                            : "border-indigo-500 bg-indigo-500"
                                        : errors[name]
                                            ? "border-red-300"
                                            : "border-gray-300"
                                    }`}
                                >
                                    {isChecked(option.value) && (
                                        <svg className="w-3 h-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                                            <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                                        </svg>
                                    )}

                                </div>

                                <div className="ml-4">

                                    <div className={`text-sm font-medium transition-colors duration-200
                                        ${isChecked(option.value)
                                            ? errors[name]
                                                ? "text-red-900"
                                                : "text-indigo-900"
                                            : errors[name]
                                                ? "text-red-700"
                                                : "text-gray-900"
                                        }`}>
                                        {option.label}
                                    </div>

                                </div>

                            </div>

                        </label>

                    </div>
                ))}

            </div>

            {errors[name] && <p className="text-sm font-semibold text-red-500">* {errors[name]}</p>}

        </div>
    );
}

