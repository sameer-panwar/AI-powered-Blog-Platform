import {Search, Bell, Sun} from 'lucide-react'

export const Header = () => {
    return (
        <header className="fixed top-0 left-0 right-0 h-16 z-50 flex items-center justify-between px-6 py-4 bg-white shadow-sm">
        {/* Left: Logo */}
        <div className="flex items-center gap-2">
            <div className=" p-2 rounded-full">
            {/* Replace with your logo */}
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
        <div className="flex items-center gap-5">
            {/* Notification */}
            <div className="relative">
            <Bell className="w-5 h-5 text-gray-700 cursor-pointer" />
            <span className="absolute -top-2 -right-2 bg-purple-500 text-white text-xs w-4 h-4 flex items-center justify-center rounded-full">
                3
            </span>
            </div>

            {/* Theme toggle */}
            <Sun className="w-5 h-5 text-gray-700 cursor-pointer" />

            {/* Profile Circle */}
            <div className="w-8 h-8 bg-gray-100 flex items-center justify-center rounded-full text-sm font-medium text-gray-700">
            JD
            </div>
        </div>
        </header>
    )
}