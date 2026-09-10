import React, { useState } from 'react';
import { Menu, X, ChevronDown } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const { t } = useLanguage();

  const navLinks = [
    { nameKey: 'home', path: '/' },
    { nameKey: 'about_us', path: '/about' },
    { nameKey: 'farmer_reg', path: '/register' },
    { nameKey: 'slot_booking', path: '/services/slot-booking' },
    { nameKey: 'track_status', path: '/status' },
    { nameKey: 'proc_centers', path: '/centers' },
    { nameKey: 'guidelines', path: '/guidelines' },
    { nameKey: 'contact_us', path: '/contact' },
  ];

  return (
    <nav className="bg-govGreen-800 text-white shadow-md relative z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-12">
          {/* Desktop Menu */}
          <div className="hidden md:flex space-x-1 w-full justify-start">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                className="px-4 py-3 text-sm font-medium hover:bg-govGreen-700 hover:text-govSaffron-500 transition-colors border-l border-govGreen-700 last:border-r"
              >
                {t(link.nameKey)}
              </Link>
            ))}
            
            {/* Dropdown Example */}
            <div 
              className="relative"
              onMouseEnter={() => setDropdownOpen(true)}
              onMouseLeave={() => setDropdownOpen(false)}
            >
              <button className="flex items-center px-4 py-3 text-sm font-medium hover:bg-govGreen-700 hover:text-govSaffron-500 transition-colors border-r border-govGreen-700">
                {t('services')} <ChevronDown size={14} className="ml-1" />
              </button>
              {dropdownOpen && (
                <div className="absolute top-full left-0 w-48 bg-white text-gray-800 border-t-2 border-govSaffron-500 shadow-lg">
                  <Link to="/services/receipt" className="block px-4 py-2 text-sm hover:bg-gray-100 border-b border-gray-100">{t('print_receipt')}</Link>
                  <Link to="/services/grievance" className="block px-4 py-2 text-sm hover:bg-gray-100">{t('grievance')}</Link>
                </div>
              )}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center w-full justify-end">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="p-2 rounded-md hover:bg-govGreen-700 focus:outline-none"
            >
              {isOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-govGreen-900">
          <div className="px-2 pt-2 pb-3 space-y-1">
            {navLinks.map((link, index) => (
              <Link
                key={index}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className="block px-3 py-2 text-base font-medium hover:bg-govGreen-700 hover:text-govSaffron-500"
              >
                {t(link.nameKey)}
              </Link>
            ))}
            {/* Mobile Dropdown items added inline for simplicity */}
            <Link to="/services/receipt" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium hover:bg-govGreen-700 hover:text-govSaffron-500 border-t border-govGreen-800 text-govSaffron-500">— {t('print_receipt')}</Link>
            <Link to="/services/grievance" onClick={() => setIsOpen(false)} className="block px-3 py-2 text-base font-medium hover:bg-govGreen-700 hover:text-govSaffron-500 text-govSaffron-500">— {t('grievance')}</Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
