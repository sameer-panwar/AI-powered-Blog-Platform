import {Search, Bell, Sun} from 'lucide-react'
import { useState } from 'react';
import { useUser } from '../../../Context/UserContext';
import { getInitials } from '../../../Components/BlogList';
import { useLogout } from '../../../Context/LogOutContext';

export const Header = () => {

    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const {setShowLogoutPopup} = useLogout();
    const { user } = useUser();

    return (
        <header className="flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
            {/* { Website Logo } */}
            <div className=" p-2 rounded-full">
            </div>
            <h1 className="font-bold text-lg text-gray-900">BlogSphere</h1>
        </div>

        {/* Center: Search */}
        <div className="flex-1 px-6">
            <div className="relative max-w-xl mx-auto">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
            <input
                type="text"
                placeholder="Search posts, authors..."
                className="w-full pl-10 pr-4 py-2 rounded-xl bg-gray-100 focus:outline-none focus:ring-2 focus:ring-purple-500 text-sm"
            />
            </div>
        </div>

        {/* Right: Icons */}
        <div className="relative flex items-center gap-5">
            {/* Notification */}
            <div className="relative">
            <Bell className="w-5 h-5 text-gray-700 cursor-pointer" />
            <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                3
            </span>
            </div>

            {/* Theme toggle */}
            <Sun className="w-5 h-5 text-gray-700 cursor-pointer" />

            {/* Profile Dropdown */}
            <div 
                className="relative" 
                onMouseEnter={() => setIsDropdownOpen(true)} 
                onMouseLeave={() => setIsDropdownOpen(false)}
                >
                {/* Profile Circle */}
                <div className="w-8 h-8 bg-gray-100 flex items-center justify-center rounded-full text-sm font-medium text-gray-700 cursor-pointer">
                    {user?.name && getInitials(user.name)}
                </div>

                {isDropdownOpen && (
                    <div className='absolute top-7 right-4 w-fit h-fit space-y-4 border-2 rounded-xl bg-gray-300'>
                        <div className='bg-purple-700 rounded-t-xl p-4'>
                            <div className='flex items-center space-x-4 '>
                                <div className='w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-sm font-medium text-gray-700'>{user?.name && getInitials(user.name)}</div>
                                <span className='text-sm text-white font-bold text-nowrap'>{user.name}</span>
                            </div>
                        </div>
                    
                        <div className='w-full'>
                            <div className='flex flex-col justify-start items-start pl-4 pb-4 space-y-2'>
                                <button
                                    className='font-bold text-gray-700 text-lg hover:-translate-y-1 hover:scale-110 transition-transform duration-300'
                                    >Setting
                                </button>
                                <button 
                                    className='font-bold text-lg text-red-500 hover:-translate-y-1 hover:scale-110 transition-transform duration-300'
                                    onClick={() => setShowLogoutPopup(true)}
                                >
                                        Logout
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>

        </div>
        </header>
    )
}