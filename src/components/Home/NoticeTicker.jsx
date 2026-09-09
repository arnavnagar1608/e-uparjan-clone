import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

const NoticeTicker = () => {
  const { t } = useLanguage();

  return (
    <div className="bg-red-50 border-y border-red-200 overflow-hidden whitespace-nowrap relative h-10 flex items-center group">
      {/* Absolute positioning makes it sit on top of the scrolling text and stretch top/bottom */}
      <div className="absolute left-0 top-0 bottom-0 bg-red-600 text-white text-xs font-bold px-4 sm:px-6 flex items-center justify-center z-20 shadow-[4px_0_8px_rgba(0,0,0,0.1)]">
        {t('latest_updates')}
      </div>
      <div className="animate-marquee inline-block z-10 group-hover:[animation-play-state:paused]">
        <span className="text-sm font-medium text-red-800 mx-4">
          {t('notice_1')}
        </span>
        <span className="text-sm font-medium text-govGreen-900 mx-4">
          {t('notice_2')}
        </span>
        <span className="text-sm font-medium text-red-800 mx-4">
          {t('notice_3')}
        </span>
      </div>
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes marquee {
          0% { transform: translateX(100vw); }
          100% { transform: translateX(-100%); }
        }
        .animate-marquee {
          /* Slowed down from 25s for readability, sped up from 45s */
          animation: marquee 35s linear infinite;
        }
      `}} />
    </div>
  );
};

export default NoticeTicker;
