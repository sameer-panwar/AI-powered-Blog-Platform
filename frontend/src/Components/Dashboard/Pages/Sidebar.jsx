import {
  Home,
  PenLine,
  BookOpen,
  MessageSquare,
  Settings,
  User
} from 'lucide-react';

import { useState } from 'react';

export function Sidebar() {
  const [active, setActive] = useState('Home');

  const menu = [
    { label: 'Home', icon: <Home size={18} />, key: 'Home' },
    { label: 'New Post', icon: <PenLine size={18} />, key: 'New Post' },
    { label: 'My Blogs', icon: <BookOpen size={18} />, key: 'My Blogs' },
    { label: 'Comments', icon: <MessageSquare size={18} />, key: 'Comments' },
    { label: 'Settings', icon: <Settings size={18} />, key: 'Settings' },
    { label: 'Profile', icon: <User size={18} />, key: 'Profile' }
  ];

  return (
    <aside className="fixed left-0 top-14 h-screen w-64 bg-white p-6 flex flex-col justify-between mt-2">
      <ul className="space-y-2">
        {menu.map((item) => (
          <li
            key={item.key}
            onClick={() => setActive(item.key)}
            className={`flex items-center gap-3 px-4 py-2 rounded-lg cursor-pointer transition ${
              active === item.key
                ? 'bg-purple-500 text-white'
                : 'text-gray-700 hover:bg-gray-100'
            }`}
          >
            {item.icon}
            <span className="text-sm font-medium">{item.label}</span>
          </li>
        ))}
        <hr className="my-4 border-gray-200" />
        {/* Bottom Button */}
        <button className="flex items-center justify-center gap-3 bg-purple-600 text-white w-full py-2 rounded-lg hover:bg-purple-700 text-sm font-medium">
            <PenLine size={16} />
            Write a Story
        </button>
      </ul>
      

      
    </aside>
  );
}
