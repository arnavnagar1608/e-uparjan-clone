import React from 'react';

const NoticeTicker = () => {
  return (
    <div className="bg-red-50 border-y border-red-200 overflow-hidden whitespace-nowrap relative h-10 flex items-center group">
      {/* Absolute positioning makes it sit on top of the scrolling text and stretch top/bottom */}
      <div className="absolute left-0 top-0 bottom-0 bg-red-600 text-white text-xs font-bold px-4 sm:px-6 flex items-center justify-center z-20 shadow-[4px_0_8px_rgba(0,0,0,0.1)]">
        LATEST UPDATES
      </div>
      <div className="animate-marquee inline-block z-10 group-hover:[animation-play-state:paused]">
        <span className="text-sm font-medium text-red-800 mx-4">
          Important Notice: Online registration for Kharif 2026-27 procurement season is now OPEN. Last date to apply is 30th November 2026.
        </span>
        <span className="text-sm font-medium text-govGreen-900 mx-4">
          | Farmers are requested to update their Aadhaar linked bank accounts immediately to ensure smooth Direct Benefit Transfer (DBT).
        </span>
        <span className="text-sm font-medium text-red-800 mx-4">
          | Helpline number 1800-111-2222 is active 24x7 for any slot booking grievances.
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
