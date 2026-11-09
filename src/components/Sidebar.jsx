import {
    Menu, LayoutGrid, Briefcase, Users, BarChart2, Settings
} from 'lucide-react';

export default function Sidebar() {
    return (
        <aside className="w-14 bg-[#1a1c23] flex flex-col items-center py-4 space-y-6 z-20 shadow-lg">
            <button className="text-gray-400 hover:text-white mb-2"><Menu className="w-5 h-5" /></button>
            <button className="text-white bg-blue-600/20 p-2 rounded"><LayoutGrid className="w-5 h-5" /></button>
            <button className="text-gray-400 hover:text-white"><Briefcase className="w-5 h-5" /></button>
            <button className="text-gray-400 hover:text-white"><Users className="w-5 h-5" /></button>
            <button className="text-gray-400 hover:text-white"><BarChart2 className="w-5 h-5" /></button>
            <button className="text-gray-400 hover:text-white"><Settings className="w-5 h-5" /></button>
        </aside>
    );
}
