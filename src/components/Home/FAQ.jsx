import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);
  const { t } = useLanguage();

  const faqs = [
    {
      question: t('faq_q1'),
      answer: t('faq_a1')
    },
    {
      question: t('faq_q2'),
      answer: t('faq_a2')
    },
    {
      question: t('faq_q3'),
      answer: t('faq_a3')
    }
  ];

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mb-12">
      <div className="flex items-center mb-6 border-b border-gray-300 pb-2">
        <h2 className="text-xl font-bold text-govGreen-900 border-l-4 border-govSaffron-500 pl-3">
          {t('faq_title')}
        </h2>
      </div>
      
      <div className="bg-white gov-border overflow-hidden">
        {faqs.map((faq, index) => (
          <div key={index} className="border-b border-gray-200 last:border-0">
            <button 
              className="w-full text-left px-5 py-4 flex justify-between items-center focus:outline-none hover:bg-gray-50 transition-colors"
              onClick={() => toggle(index)}
            >
              <span className="font-semibold text-gray-800 text-sm">{faq.question}</span>
              {openIndex === index ? (
                <ChevronUp size={20} className="text-gray-500 flex-shrink-0" />
              ) : (
                <ChevronDown size={20} className="text-gray-500 flex-shrink-0" />
              )}
            </button>
            
            {openIndex === index && (
              <div className="px-5 pb-4 text-sm text-gray-600 bg-gray-50 pt-2 border-t border-gray-100">
                {faq.answer}
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};

export default FAQ;
