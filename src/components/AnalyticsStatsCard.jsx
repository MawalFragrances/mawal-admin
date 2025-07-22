
import { useEffect, useState } from "react";
import { Input, Select } from "./Inputs";

export default function AnalyticsStatsCard({
    label,
    total,
    getTotal,
    allTimeTotal,
}) {

    const [isLoading, setIsLoading] = useState(false);
    const [timeFrame, setTimeFrame] = useState("ALL_TIME");
    const [customEndDate, setCustomEndDate] = useState(null);
    const [customStartDate, setCustomStartDate] = useState(null);
    const [displaySelectDate, setDisplaySelectDate] = useState(false);

    useEffect(() => {
        if (timeFrame == "CUSTOM") return setDisplaySelectDate(true);
        if (timeFrame == "ALL_TIME") return setDisplaySelectDate(false);

        setCustomStartDate(null);
        setCustomEndDate(null);

        ; (async () => {
            setIsLoading(true);
            await getTotal(timeFrame, customStartDate, customEndDate);
            setIsLoading(false);
        })();

    }, [timeFrame, setTimeFrame, customStartDate, customEndDate, getTotal])

    const handelCustomDates = async (e) => {

        e.preventDefault();
        if (timeFrame == "ALL_TIME") return;

        setDisplaySelectDate(false);

        setIsLoading(true);
        await getTotal(timeFrame, customStartDate, customEndDate);
        setIsLoading(false);
    }

    const closeSelectDate = () => {
        setTimeFrame("ALL_TIME");
        setDisplaySelectDate(false);
    }

    const handleChangeDates = () => {
        setCustomEndDate(null);
        setCustomStartDate(null);
        setDisplaySelectDate(true);
    }

    const timeFrameOptions = [
        { label: "All Time", value: "ALL_TIME" },
        { label: "Today", value: "TODAY" },
        { label: "Last 7 Days", value: "LAST_7_DAYS" },
        { label: "Last 30 Days", value: "LAST_30_DAYS" },
        { label: "Custom", value: "CUSTOM" },
    ]

    return (
        <div className="bg-white border-[1px] px-5 py-8 rounded-lg shadow-lg">

            <div className="flex items-center justify-between gap-5 mb-2">

                <div>

                    <p className="text-gray-700 text-sm font-semibold mb-1">{label}</p>

                    {isLoading ? (
                        <div className="animate-pulse bg-gray-300 rounded-lg h-12" />
                    ) : (
                        <p className="text-2xl font-bold h-12 pt-2">{timeFrame == "ALL_TIME" ? allTimeTotal?.toLocaleString() : total?.toLocaleString()}</p>
                    )}

                </div>

                <div className="flex items-center justify-between w-32">
                    <Select required={true}
                        label="Time Frame"
                        name="timeFrame"
                        value={timeFrame}
                        options={timeFrameOptions}
                        placeholder="Select an option"
                        onChange={(e) => setTimeFrame(e.target.value)}
                    />
                </div>

            </div>

            {(timeFrame === "CUSTOM" && customStartDate && customEndDate) && (
                <div className="text-sm">
                    <p>
                        Between <span className="text-indigo-600 font-medium">{customStartDate}</span> and <span className="text-indigo-600 font-medium">{customEndDate}</span>
                    </p>
                    <button onClick={handleChangeDates}
                        className="mt-1 text-themeColor font-medium text-indigo-600">
                        Change Dates?
                    </button>
                </div>
            )}

            {displaySelectDate && (
                <SelectDate label={label}
                    closeSelectDate={closeSelectDate}
                    setCustomEndDate={setCustomEndDate}
                    setCustomStartDate={setCustomStartDate}
                    handelFormSubmission={handelCustomDates}
                />
            )}

        </div>
    );
}

function SelectDate({
    closeSelectDate,
    setCustomEndDate,
    setCustomStartDate,
    handelFormSubmission,
}) {
    return (
        <>
            {/* BACKDROP WITH BLUR EFFECT */}
            <div
                className="fixed top-0 left-0 w-full h-full overflow-hidden bg-black/20 backdrop-blur-sm z-[100]" >

                <form onSubmit={handelFormSubmission}
                    className="animate-themeAnimationLg flex flex-col mx-auto mt-20 bg-white w-96 rounded-xl shadow-2xl border border-gray-100 z-[110] overflow-hidden">

                    {/* HEADER WITH GRADIENT BACKGROUND */}
                    <div className="bg-gradient-to-r from-gray-900 to-gray-500 px-6 py-4">
                        <p className="text-center text-xl font-bold text-white">
                            Select Date Range
                        </p>
                    </div>

                    {/* FORM CONTENT */}
                    <div className="p-6 space-y-4">
                        {/* FROM DATE INPUT */}
                        <Input required={true}
                            label="From Date"
                            type="date"
                            onChange={(e) => setCustomStartDate(e.target.value)}
                        />

                        {/* TO DATE INPUT */}
                        <Input required={true}
                            label="To Date"
                            type="date"
                            onChange={(e) => setCustomEndDate(e.target.value)}
                        />

                        {/* ACTION BUTTONS */}
                        <div className="flex space-x-3 pt-2">

                            <button type="button"
                                onClick={closeSelectDate}
                                className="flex-1 px-4 py-3 text-gray-600 bg-gray-100 rounded-lg font-medium hover:bg-gray-200 transition-colors duration-200">
                                Cancel
                            </button>

                            <button type="submit"
                                className="flex-1 bg-gradient-to-r from-gray-900 to-gray-500 hover:from-gray-700 hover:to-gray-600 text-white font-semibold py-3 px-4 rounded-lg transition-all duration-200 transform hover:scale-105 shadow-lg">
                                Apply
                            </button>

                        </div>

                    </div>

                </form>
            </div>

        </>
    )
}