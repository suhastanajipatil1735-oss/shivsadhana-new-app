import React from 'react';
import { ArrowLeft, School } from 'lucide-react';
import { AppScreen } from '../types';

interface HeaderProps {
  title: string;
  showBack?: boolean;
  onBack?: () => void;
}

const Header: React.FC<HeaderProps> = ({ title, showBack, onBack }) => {
  return (
    <header className="sticky top-0 z-50 bg-blue-700 text-white shadow-md p-4 flex items-center gap-3">
      {showBack && onBack && (
        <button 
          onClick={onBack}
          className="p-1 hover:bg-blue-600 rounded-full transition-colors"
        >
          <ArrowLeft size={24} />
        </button>
      )}
      {!showBack && <School size={28} className="text-blue-200" />}
      <h1 className="text-xl font-semibold tracking-wide flex-1 truncate">
        {title}
      </h1>
    </header>
  );
};

export default Header;