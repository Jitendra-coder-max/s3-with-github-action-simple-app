import Sidebar from './components/Sidebar.jsx';
import ProfileHeader from './components/ProfileHeader.jsx';
import ClientSelector from './components/ClientSelector.jsx';
import DashboardTables from './components/DashboardTables.jsx';

export default function KornFerryDashBoard() {
    return (
        <div className="flex h-screen bg-[#f3f4f6] font-sans text-gray-800 overflow-hidden">
            <Sidebar />
            <main className="flex-1 flex flex-col w-full">
                <ProfileHeader />
                <ClientSelector />
                <DashboardTables />
            </main>
        </div>
    );
}
