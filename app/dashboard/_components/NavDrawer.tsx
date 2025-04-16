import React, { useEffect } from 'react';
import { HiXMark } from 'react-icons/hi2';
import { HiChartSquareBar } from "react-icons/hi";

interface NavDrawerProps {
  isOpen: boolean;
}

const NavDrawer: React.FC<NavDrawerProps> = ({ isOpen }) => {
  const drawerId = 'nav-drawer';

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const drawerElement = document.getElementById(drawerId);
      if (drawerElement) {
        if (isOpen) {
          drawerElement.classList.remove('-translate-x-full');
          drawerElement.classList.add('translate-x-0');
        } else {
          drawerElement.classList.add('-translate-x-full');
          drawerElement.classList.remove('translate-x-0');
        }
      }
    }
  }, [isOpen]);

  return (
    <div
      id={drawerId}
      className={`fixed top-0 left-0 z-40 h-screen p-4 overflow-y-auto transition-transform -translate-x-full bg-white w-64 dark:bg-gray-800 ${isOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      tabIndex={-1}
      aria-labelledby={`${drawerId}-label`}
    >
      <h5 id={`${drawerId}-label`} className="text-base font-semibold text-gray-500 uppercase dark:text-gray-400">
        Menu
      </h5>
      <div className="py-4 overflow-y-auto">
        <ul>
          <li className="flex items-center p-2 hover:bg-gray-700 rounded cursor-pointer">
            <HiChartSquareBar className="w-5 h-5 mr-2" />
            Dashboard
          </li>
        </ul>
      </div>
    </div>
  );
};

export default NavDrawer;