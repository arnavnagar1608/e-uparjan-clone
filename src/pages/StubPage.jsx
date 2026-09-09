import React from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, ArrowLeft } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const StubPage = ({ titleKey }) => {
  const { t } = useLanguage();
  const title = t(titleKey);

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="bg-white gov-border p-8 text-center max-w-2xl mx-auto mt-10">
        <div className="flex justify-center mb-6">
          <div className="p-4 bg-green-50 rounded-full text-govGreen-700">
            <AlertCircle size={48} />
          </div>
        </div>
        <h1 className="text-2xl font-bold text-govGreen-900 mb-4">{title}</h1>
        <p className="text-gray-600 mb-8">
          {t('under_construction')}
        </p>
        <Link 
          to="/" 
          className="inline-flex items-center space-x-2 bg-govGreen-700 hover:bg-govGreen-800 text-white px-6 py-2 rounded-sm font-medium transition-colors"
        >
          <ArrowLeft size={18} />
          <span>{t('back_home')}</span>
        </Link>
      </div>
    </div>
  );
};

export default StubPage;
