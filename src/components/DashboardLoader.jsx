export default function DashboardLoader() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 flex-1 p-5">

            <div className="bg-gray-300 h-48 rounded-xl animate-pulse col-span-3" />

            <div className="bg-gray-300 h-48 rounded-xl animate-pulse" />
            <div className="bg-gray-300 h-48 rounded-xl animate-pulse" />
            <div className="bg-gray-300 h-48 rounded-xl animate-pulse" />

            <div className="bg-gray-300 h-[500px] rounded-xl animate-pulse col-span-2" />
            <div className="bg-gray-300 h-[500px] rounded-xl animate-pulse col-span-1" />

            <div className="bg-gray-300 h-48 rounded-xl animate-pulse col-span-3" />

        </div>
    )
}