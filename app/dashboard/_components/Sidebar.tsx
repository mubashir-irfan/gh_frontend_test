
'use client'
import Link from 'next/link';
import React, { useState } from 'react';
import { AiOutlineHome } from "react-icons/ai";
import NavDrawer from './NavDrawer'; // Import the new NavDrawer component
interface SidebarProps {
  isDrawerOpen: boolean;
}

const Sidebar: React.FC<SidebarProps> = ({ isDrawerOpen }) => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const toggleCollapse = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <>
      {/* Desktop Sidebar */}
      <aside
        className={`hidden md:flex flex-col h-screen text-white transition-width duration-300 ${isCollapsed ? 'w-20' : 'w-64'
          }`}
      >
        <nav className="flex-1 p-4">
          <ul>
            <li className="flex items-center p-2 hover:bg-gray-100 rounded">
              <Link href="/dashboard" className="flex items-center w-full cursor-pointer text-gray-800">
                <AiOutlineHome className="w-5 h-5 me-2" />
                <span className="text-gray-800">Dashboard</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Mobile Drawer */}
      <NavDrawer isOpen={isDrawerOpen} />
    </>
  );
};

export default Sidebar;