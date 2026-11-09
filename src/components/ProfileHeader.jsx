import { useEffect, useRef, useState } from 'react';
import { ChevronDown, User, LogOut } from 'lucide-react';
import { useAuth } from '../auth/useAuth.js';

export default function ProfileHeader() {
    const [isProfileMenuOpen, setIsProfileMenuOpen] = useState(false);
    const dropdownRef = useRef(null);
    const { user, signOut } = useAuth();

    useEffect(() => {
        function handleClickOutside(event) {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setIsProfileMenuOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, []);

    return (
        <header className="h-14 bg-[#1a1c23] text-white flex items-center justify-between px-4 z-10 shadow-md">
            <div className="flex items-center space-x-2">
                <span className="font-bold tracking-widest text-sm text-gray-100">KORN FERRY</span>
                <span className="text-xs text-gray-400 tracking-widest font-light">| Advance</span>
            </div>

            <div className="flex items-center space-x-4 relative" ref={dropdownRef}>
                <div
                    className="flex items-center space-x-3 cursor-pointer hover:bg-gray-800 p-1.5 rounded transition-colors"
                    onClick={() => setIsProfileMenuOpen(!isProfileMenuOpen)}
                >
                    <div className="text-right hidden md:block">
                        <div className="text-xs font-medium">{user.name}</div>
                        <div className="text-[10px] text-gray-400">{user.role === 'admin' ? 'Administrator' : 'Normal user'}</div>
                    </div>
                    <div className="w-8 h-8 rounded-full bg-pink-200 text-pink-700 flex items-center justify-center text-xs font-bold border border-pink-300">
                        Ad
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400" />
                </div>

                {isProfileMenuOpen && (
                    <div className="absolute top-full right-0 mt-1 w-64 bg-white rounded shadow-xl py-2 border border-gray-200 z-50 max-h-[80vh] overflow-y-auto">
                        <div className="px-4 py-2 text-xs text-slate-500">{user.email}</div>
                        <div className="border-t border-gray-100 mt-2 pt-2">
                            <button className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center">
                                <User className="w-4 h-4 mr-2 text-gray-400" /> My Profile
                            </button>
                            <button
                                className="w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 flex items-center"
                                onClick={() => {
                                    signOut();
                                    setIsProfileMenuOpen(false);
                                }}
                            >
                                <LogOut className="w-4 h-4 mr-2 text-gray-400" /> Logout
                            </button>
                        </div>
                    </div>
                )}
            </div>
        </header>
    );
}
