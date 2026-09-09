import React from 'react';
import { Search, Globe, LogIn, UserPlus } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const Header = () => {
  const { language, toggleLanguage, t } = useLanguage();

  return (
    <header className="w-full bg-white border-b border-gray-300">
      {/* Top Utility Bar */}
      <div className="bg-govGreen-900 text-white text-xs py-1 px-4 md:px-8 flex justify-between items-center">
        <div className="flex space-x-4">
          <a href="#" className="hover:underline">{t('gov_india')}</a>
          <span className="hidden sm:inline">|</span>
          <a href="#" className="hidden sm:inline hover:underline">{t('dept_agri')}</a>
        </div>
        <div className="flex space-x-4 items-center">
          <a href="#main-content" className="hover:underline">{t('skip_main')}</a>
          <span className="hidden sm:inline">|</span>
          <div className="flex space-x-1 items-center">
            <button className="px-1 border border-transparent hover:border-white">A-</button>
            <button className="px-1 border border-transparent hover:border-white">A</button>
            <button className="px-1 border border-transparent hover:border-white">A+</button>
          </div>
          <span className="hidden sm:inline">|</span>
          <button 
            className="flex items-center space-x-1 hover:underline"
            onClick={toggleLanguage}
          >
            <Globe size={12} />
            <span>{language === 'en' ? 'English' : 'हिन्दी'}</span>
          </button>
        </div>
      </div>

      {/* Main Header */}
      <div className="flex justify-between items-center py-4 px-4 md:px-8">
        <div className="flex items-center space-x-4">
          <img 
            src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" 
            alt="Satyameva Jayate" 
            className="h-16 w-auto"
          />
          <div className="flex flex-col">
            <h1 className="text-xl md:text-2xl font-bold text-govGreen-900 leading-tight">
              ई-उपार्जन (E-Uparjan)
            </h1>
            <p className="text-sm md:text-base font-semibold text-gray-700">
              {t('kisan_samriddhi')}
            </p>
          </div>
        </div>

        <div className="hidden md:flex items-center space-x-6">
          <div className="relative">
            <input 
              type="text" 
              placeholder={t('search')} 
              className="pl-3 pr-10 py-1.5 border border-gray-300 rounded-sm text-sm focus:outline-none focus:border-govGreen-700"
            />
            <Search className="absolute right-2 top-2 text-gray-500" size={16} />
          </div>
          
          <div className="flex space-x-2">
            <Link to="/login" className="flex items-center space-x-1 bg-white text-govGreen-800 border border-govGreen-800 px-4 py-1.5 rounded-sm text-sm font-medium hover:bg-gray-50 transition-colors">
              <LogIn size={16} />
              <span>{t('login')}</span>
            </Link>
            <Link to="/register" className="flex items-center space-x-1 bg-govGreen-700 text-white px-4 py-1.5 rounded-sm text-sm font-medium hover:bg-govGreen-800 transition-colors">
              <UserPlus size={16} />
              <span>{t('register')}</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
