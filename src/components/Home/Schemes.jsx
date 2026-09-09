import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

const Schemes = () => {
  const { t } = useLanguage();

  const schemes = [
    {
      name: t('scheme_1_name'),
      desc: t('scheme_1_desc'),
      eligibility: t('scheme_1_elig'),
      status: t('active')
    },
    {
      name: t('scheme_2_name'),
      desc: t('scheme_2_desc'),
      eligibility: t('scheme_2_elig'),
      status: t('closed')
    },
    {
      name: t('scheme_3_name'),
      desc: t('scheme_3_desc'),
      eligibility: t('scheme_3_elig'),
      status: t('active')
    }
  ];

  return (
    <section>
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold text-govGreen-900 border-l-4 border-govSaffron-500 pl-3">
          {t('schemes_title')}
        </h2>
      </div>
      
      <div className="space-y-4">
        {schemes.map((scheme, index) => (
          <div key={index} className="bg-white gov-border p-5 relative overflow-hidden flex flex-col sm:flex-row sm:items-center justify-between">
            <div className={`absolute left-0 top-0 bottom-0 w-1 ${scheme.status === t('active') ? 'bg-govGreen-600' : 'bg-gray-400'}`}></div>
            
            <div className="mb-4 sm:mb-0 sm:mr-4">
              <div className="flex items-center space-x-3 mb-1">
                <h3 className="text-lg font-bold text-govGreen-800">{scheme.name}</h3>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-sm uppercase tracking-wider ${
                  scheme.status === t('active') ? 'bg-green-100 text-govGreen-800' : 'bg-gray-100 text-gray-800'
                }`}>
                  {scheme.status}
                </span>
              </div>
              <p className="text-sm text-gray-600 mb-2">{scheme.desc}</p>
              <div className="text-xs text-gray-500 bg-gray-50 inline-block px-2 py-1 rounded border border-gray-100">
                <span className="font-semibold text-gray-700">{t('eligibility')}:</span> {scheme.eligibility}
              </div>
            </div>
            
            <Link to="/guidelines" className="text-sm border border-govGreen-600 text-govGreen-600 font-medium px-4 py-2 hover:bg-green-50 rounded-sm whitespace-nowrap transition-colors">
              {t('view_details')}
            </Link>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Schemes;
