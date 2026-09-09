import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-govGreen-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold border-b-2 border-govSaffron-500 inline-block pb-1 mb-4">{t('about_portal')}</h3>
            <p className="text-sm text-gray-300">
              {t('about_portal_desc')}
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold border-b-2 border-govSaffron-500 inline-block pb-1 mb-4">{t('quick_links')}</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/register" className="hover:text-govSaffron-500 hover:underline">{t('farmer_reg')}</Link></li>
              <li><Link to="/status" className="hover:text-govSaffron-500 hover:underline">{t('track_status')}</Link></li>
              <li><Link to="/guidelines" className="hover:text-govSaffron-500 hover:underline">{t('guidelines')}</Link></li>
              <li><Link to="/services/grievance" className="hover:text-govSaffron-500 hover:underline">{t('grievance')}</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold border-b-2 border-govSaffron-500 inline-block pb-1 mb-4">{t('policies')}</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-govSaffron-500 hover:underline">{t('privacy_policy')}</a></li>
              <li><a href="#" className="hover:text-govSaffron-500 hover:underline">{t('terms_cond')}</a></li>
              <li><a href="#" className="hover:text-govSaffron-500 hover:underline">{t('copyright')}</a></li>
              <li><a href="#" className="hover:text-govSaffron-500 hover:underline">{t('hyperlinking')}</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold border-b-2 border-govSaffron-500 inline-block pb-1 mb-4">{t('contact_us')}</h3>
            <div className="text-sm text-gray-300 space-y-2">
              <p>{t('helpline')}</p>
              <p>{t('email')}</p>
              <p>{t('working_hours')}</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-[#0b2b18] border-t border-[#114023] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <div className="mb-2 md:mb-0">
            <p>{t('managed_by')}</p>
            <p>{t('developed_by')}</p>
          </div>
          <div className="text-right">
            <p>{t('last_updated')} {new Date().toLocaleDateString('en-IN')}</p>
            <p>{t('visitors')} <span className="bg-[#114023] px-2 py-0.5 rounded text-white ml-1">1,452,089</span></p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
