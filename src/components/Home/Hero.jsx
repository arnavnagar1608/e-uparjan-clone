import React from 'react';
import { ArrowRight, Calendar, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const Hero = () => {
  const { t } = useLanguage();

  return (
    <div className="relative bg-govGreen-800 text-white border-b-4 border-govSaffron-500">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-10 bg-[radial-gradient(#fff_1px,transparent_1px)] [background-size:16px_16px]"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 md:py-20 relative z-10 flex flex-col md:flex-row items-center justify-between">
        <div className="w-full md:w-2/3 pr-0 md:pr-8">
          <h2 className="text-3xl md:text-4xl font-extrabold mb-4 leading-tight">
            {t('hero_title_1')} <br/><span className="text-govSaffron-500">{t('hero_title_2')}</span>
          </h2>
          <p className="text-lg md:text-xl text-green-100 mb-8 max-w-2xl font-light leading-relaxed">
            {t('hero_desc')}
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/register" className="bg-govSaffron-500 hover:bg-orange-500 text-white font-bold py-3 px-6 rounded-sm shadow-md transition-colors w-full sm:w-auto text-center flex items-center justify-center">
              {t('hero_btn_reg')} <ArrowRight className="ml-2" size={18} />
            </Link>
            <Link to="/status" className="bg-transparent border-2 border-white hover:bg-white hover:text-govGreen-900 text-white font-bold py-3 px-6 rounded-sm shadow-md transition-colors w-full sm:w-auto text-center">
              {t('hero_btn_track')}
            </Link>
          </div>
        </div>
        
        <div className="w-full md:w-1/3 mt-10 md:mt-0 hidden md:block">
          <div className="bg-white/10 p-6 rounded-sm backdrop-blur-sm border border-white/20">
            <h3 className="font-bold text-lg mb-4 text-govSaffron-500 border-b border-white/20 pb-2 flex items-center">
              <Calendar className="mr-2" size={18} /> {t('cal_title')}
            </h3>
            <ul className="space-y-4">
              <li className="flex justify-between items-center text-sm">
                <span>{t('cal_kharif')}</span>
                <span className="bg-green-500 text-white px-2 py-0.5 rounded text-xs">{t('active')}</span>
              </li>
              <li className="flex justify-between items-center text-sm">
                <span>{t('cal_slot')}</span>
                <span className="bg-green-500 text-white px-2 py-0.5 rounded text-xs">{t('active')}</span>
              </li>
              <li className="flex justify-between items-center text-sm">
                <span>{t('cal_rabi')}</span>
                <span className="bg-gray-400 text-white px-2 py-0.5 rounded text-xs">{t('closed')}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
