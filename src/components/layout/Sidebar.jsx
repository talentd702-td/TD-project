import React from 'react';
import { navigationItems } from '../../data/navigationItems';

export const Sidebar = ({ sidebarOpen, setSidebarOpen, activeTab, setActiveTab }) => {
  return (
    <>
      {/* Sidebar */}
      <nav 
        className={`${sidebarOpen ? 'w-64' : 'w-16'} lg:w-64 bg-white border-r border-gray-200 min-h-screen transition-all duration-300 fixed lg:static z-30 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'}`}
        style={{ top: '64px', height: 'calc(100vh - 64px)' }}
      >
        <div className="p-4 overflow-y-auto h-full">
          <ul className="space-y-2">
            {navigationItems.map((item) => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;

              return (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveTab(item.id);
                      setSidebarOpen(false);
                    }}
                    className={`w-full flex items-center px-3 py-3 rounded-lg text-left transition-colors ${
                      isActive
                        ? 'text-white border-r-4'
                        : 'text-gray-700 hover:bg-gray-50'
                    }`}
                    style={isActive ? {
                      backgroundColor: '#003566',
                      borderRightColor: '#FF4500'
                    } : {}}
                  >
                    <Icon className="flex-shrink-0 w-5 h-5" />
                    <span className={`ml-3 font-medium ${!sidebarOpen && 'lg:inline hidden'}`}>
                      {item.label}
                    </span>
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      </nav>

      {/* Mobile Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-20 lg:hidden"
          onClick={() => setSidebarOpen(false)}
        ></div>
      )}
    </>
  );
};

export default Sidebar;