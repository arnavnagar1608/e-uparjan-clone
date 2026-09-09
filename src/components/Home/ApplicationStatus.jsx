import React, { useState } from 'react';
import { Search, CheckCircle, Clock } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const ApplicationStatus = () => {
  const [appId, setAppId] = useState('');
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const handleTrack = (e) => {
    e.preventDefault();
    if(!appId.trim()) return;
    
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setStatus('verified'); // "submitted", "verified", "approved", "paid"
      setLoading(false);
    }, 800);
  };

  return (
    <section className="bg-white gov-border h-full flex flex-col">
      <div className="bg-govGreen-800 text-white p-3 border-b border-govGreen-900">
        <h2 className="text-lg font-bold flex items-center">
          <Search size={18} className="mr-2" />
          {t('track_status_title')}
        </h2>
      </div>
      
      <div className="p-5 flex-grow">
        <p className="text-sm text-gray-600 mb-4">
          {t('track_status_desc')}
        </p>
        
        <form onSubmit={handleTrack} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">{t('app_id_label')}</label>
            <input 
              type="text" 
              value={appId}
              onChange={(e) => setAppId(e.target.value)}
              placeholder={t('app_id_placeholder')}
              className="w-full border border-gray-300 px-3 py-2 text-sm focus:outline-none focus:border-govGreen-600 focus:ring-1 focus:ring-govGreen-600 rounded-sm"
              required
            />
          </div>
          <button 
            type="submit" 
            disabled={loading}
            className="w-full bg-govSaffron-500 hover:bg-orange-600 text-white font-bold py-2 px-4 rounded-sm transition-colors flex justify-center items-center"
          >
            {loading ? t('tracking_btn') : t('track_status_title')}
          </button>
        </form>

        {status && (
          <div className="mt-6 pt-6 border-t border-gray-200">
            <h3 className="text-sm font-bold text-gray-800 mb-4">{t('current_status')}</h3>
            
            <div className="relative">
              {/* Vertical line */}
              <div className="absolute left-3 top-2 bottom-2 w-0.5 bg-gray-200"></div>
              
              <ul className="space-y-4 relative z-10">
                <li className="flex items-start">
                  <div className="bg-govGreen-500 text-white rounded-full p-1 mr-3 mt-0.5">
                    <CheckCircle size={14} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">{t('status_submitted')}</p>
                    <p className="text-[10px] text-gray-500">12 Oct 2026, 10:30 AM</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-govGreen-500 text-white rounded-full p-1 mr-3 mt-0.5">
                    <CheckCircle size={14} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">{t('status_verified')}</p>
                    <p className="text-[10px] text-gray-500">14 Oct 2026, 02:15 PM</p>
                  </div>
                </li>
                
                <li className="flex items-start">
                  <div className="bg-amber-500 text-white rounded-full p-1 mr-3 mt-0.5 shadow-[0_0_0_4px_white]">
                    <Clock size={14} />
                  </div>
                  <div>
                    <p className="text-xs font-bold text-gray-800">{t('status_pending')}</p>
                    <p className="text-[10px] text-amber-600 mt-0.5 font-medium border border-amber-200 bg-amber-50 px-1.5 py-0.5 rounded inline-block">{t('action_required')}</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </section>
  );
};

export default ApplicationStatus;
