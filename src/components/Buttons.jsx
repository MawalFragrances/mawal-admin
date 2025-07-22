
export function ThemeButton({
    onClick,
    icon,
    btnLabel,
    isButtonLoading,
    isButtonDisabled,
    extraClasses,
    loadingLabel,
}) {
    return (
        <button type={`${!onClick ? "submit" : "button"}`} onClick={onClick}
            className={`flex items-center justify-center bg-gradient-to-r from-gray-800 to-gray-500 hover:shadow-[0_10px_5px_gray] rounded-xl font-semibold h-[55px] text-white px-6 w-full disabled:opacity-70 disabled:ring-0 transition-all duration-300 ease-in-out disabled:cursor-not-allowed active:scale-[0.8] active:ring-0
             ${extraClasses}`}
            disabled={isButtonDisabled || isButtonLoading}
        >
            {isButtonLoading ? (
                <div className="flex items-center justify-center gap-2">
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                    <span>{loadingLabel}</span>
                </div>
            ) : (
                <div className="flex justify-center items-center gap-2">
                    {icon && icon}
                    <span>{btnLabel}</span>
                </div>
            )}
        </button>
    )
}