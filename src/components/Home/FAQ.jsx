import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

const faqs = [
  {
    question: "How can I register for Kharif procurement?",
    answer: "Farmers can register online via the e-Uparjan portal by clicking on 'Farmer Registration' under Citizen Services. You will need your Aadhaar number, Samagra ID, and mobile number."
  },
  {
    question: "When will the payment be credited to my account?",
    answer: "The payment for the procured crop is typically credited directly to your Aadhaar-linked bank account via Direct Benefit Transfer (DBT) within 7 working days after successful procurement."
  },
  {
    question: "Can I change my slot booking date?",
    answer: "No, once a slot is booked, it cannot be changed online. If you miss your slot due to emergencies, please contact your district procurement officer."
  }
];

const FAQ = () => {
  const [openIndex, setOpenIndex] = useState(null);

  const toggle = (index) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section className="mb-12">
      <div className="flex items-center mb-6 border-b border-gray-300 pb-2">
        <h2 className="text-xl font-bold text-govGreen-900 border-l-4 border-govSaffron-500 pl-3">
          Frequently Asked Questions (FAQ)
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
