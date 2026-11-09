export default function ClientSelector() {
    return (
        <div className="bg-white border-b border-gray-200 px-6 py-3 flex items-center space-x-6">
            <div className="flex flex-col">
                <span className="text-[10px] text-gray-500 uppercase font-semibold">Select Client</span>
                <select className="border-none bg-transparent font-medium text-sm focus:outline-none cursor-pointer w-40 border-b border-gray-300 pb-1">
                    <option>Ajax</option>
                    <option>Acme Corp</option>
                    <option>Globex</option>
                </select>
            </div>
            <div className="h-8 w-px bg-gray-300"></div>
            <div className="text-sm font-medium text-blue-800 flex items-center">
                Ajax <span className="mx-2 text-gray-400">|</span> ESCI Test Engagement
            </div>
        </div>
    );
}
