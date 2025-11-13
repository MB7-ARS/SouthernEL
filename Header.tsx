
import React from 'react';
import { User } from '../types';

interface HeaderProps {
  currentUser: User | null;
  onLogout: () => void;
}

const UserIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
    </svg>
);

const Header: React.FC<HeaderProps> = ({ currentUser, onLogout }) => {
  return (
    <header className="bg-gray-900/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <h1 className="text-xl font-bold tracking-wider text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-teal-400">
              SOUTHERN ELITE FOOTBALL LEAGUE 2025
            </h1>
          </div>
          {currentUser && (
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-gray-300">
                <UserIcon/>
                <span className="hidden sm:inline">Welcome, </span>
                <span className="font-semibold ml-1">{currentUser.name}</span>
              </div>
              <button
                onClick={onLogout}
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-red-500 transition-colors"
              >
                Logout
              </button>
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;