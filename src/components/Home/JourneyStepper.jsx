import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Check, UserPlus, Map, MapPin, Calendar, Truck, ClipboardCheck, Scale, IndianRupee } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';

const JourneyStepper = () => {
  const [currentStep, setCurrentStep] = useState(4);
  const { t } = useLanguage();

  const steps = [
    { id: 1, title: t('step_1_title'), subtitle: t('step_1_sub'), icon: UserPlus },
    { id: 2, title: t('step_2_title'), subtitle: t('step_2_sub'), icon: Map },
    { id: 3, title: t('step_3_title'), subtitle: t('step_3_sub'), icon: MapPin },
    { id: 4, title: t('step_4_title'), subtitle: t('step_4_sub'), icon: Calendar },
    { id: 5, title: t('step_5_title'), subtitle: t('step_5_sub'), icon: Truck },
    { id: 6, title: t('step_6_title'), subtitle: t('step_6_sub'), icon: ClipboardCheck },
    { id: 7, title: t('step_7_title'), subtitle: t('step_7_sub'), icon: Scale },
    { id: 8, title: t('step_8_title'), subtitle: t('step_8_sub'), icon: IndianRupee },
  ];

  return (
    <section className="bg-white gov-border p-6 md:p-10 mb-8 mt-2 relative overflow-hidden">
      {/* Background watermark icon to make it look official */}
      <div className="absolute right-[-5%] top-[-10%] opacity-5 text-govGreen-900 pointer-events-none">
        <Scale size={300} />
      </div>

      <div className="text-center mb-10 relative z-10">
        <h2 className="text-2xl md:text-3xl font-extrabold text-govGreen-900 mb-2">
          {t('stepper_title')}
        </h2>
        <p className="text-base text-gray-600 font-medium">
          {t('stepper_desc')}
        </p>
        <div className="w-16 h-1 bg-govSaffron-500 mx-auto mt-4"></div>
      </div>

      {/* Stepper Container */}
      <div className="relative z-10">
        <div className="flex flex-col md:flex-row justify-between items-start relative">
          
          {/* Connecting Line - Desktop (Horizontal) */}
          <div className="hidden md:block absolute top-[28px] left-[6%] right-[6%] h-1 bg-gray-200 -z-10">
            <div 
              className="h-full bg-govGreen-600 transition-all duration-1000 ease-in-out relative"
              style={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            >
              {currentStep > 1 && (
                <img 
                  src="/truck.svg" 
                  alt="Moving Truck" 
                  className="absolute -top-[14px] -right-[16px] w-8 h-8 drop-shadow-md z-20"
                />
              )}
            </div>
          </div>
          
          {/* Connecting Line - Mobile (Vertical) */}
          <div className="md:hidden absolute left-[28px] top-[28px] bottom-[28px] w-1 bg-gray-200 -z-10">
            <div 
              className="w-full bg-govGreen-600 transition-all duration-1000 ease-in-out relative"
              style={{ height: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
            >
              {currentStep > 1 && (
                <img 
                  src="/truck.svg" 
                  alt="Moving Truck" 
                  className="absolute -bottom-[16px] -left-[14px] w-8 h-8 drop-shadow-md z-20 rotate-90"
                />
              )}
            </div>
          </div>

          {steps.map((step, index) => {
            const isCompleted = step.id < currentStep;
            const isCurrent = step.id === currentStep;
            const isUpcoming = step.id > currentStep;
            
            const Icon = step.icon;

            return (
              <div 
                key={step.id} 
                className="flex md:flex-col items-start md:items-center mb-8 md:mb-0 w-full md:w-[12.5%] relative cursor-pointer group"
                onClick={() => setCurrentStep(step.id)}
              >
                {/* Circle Indicator */}
                <div 
                  className={`
                    w-14 h-14 md:w-14 md:h-14 rounded-full flex items-center justify-center border-4 shadow-sm z-10 transition-colors duration-300 flex-shrink-0
                    ${isCompleted ? 'bg-govGreen-600 border-white text-white' : ''}
                    ${isCurrent ? 'bg-white border-govGreen-600 text-govGreen-700 shadow-md' : ''}
                    ${isUpcoming ? 'bg-gray-100 border-white text-gray-400' : ''}
                  `}
                >
                  {isCompleted ? <Check size={24} className="font-bold" /> : <Icon size={24} />}
                </div>
                
                {/* Text Content */}
                <div className="ml-4 md:ml-0 md:mt-4 md:text-center">
                  <div className={`
                    text-xs font-bold uppercase tracking-wide mb-1
                    ${isCurrent ? 'text-govGreen-800' : 'text-gray-500'}
                  `}>
                    {t('step')} {step.id}
                  </div>
                  <h3 className={`
                    text-sm font-bold leading-tight mb-1
                    ${isCompleted || isCurrent ? 'text-gray-900' : 'text-gray-400'}
                  `}>
                    {step.title}
                  </h3>
                  <p className={`
                    text-[10px] hidden md:block px-1 leading-snug
                    ${isCompleted || isCurrent ? 'text-gray-600' : 'text-gray-400'}
                  `}>
                    {step.subtitle}
                  </p>
                  {/* Show subtitle on mobile always if it's the current step, or show normally */}
                  <p className={`
                    text-[11px] md:hidden
                    ${isCompleted || isCurrent ? 'text-gray-600' : 'text-gray-400'}
                  `}>
                    {step.subtitle}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Action Buttons */}
      <div className="mt-12 flex flex-col sm:flex-row justify-center items-center space-y-4 sm:space-y-0 sm:space-x-6 relative z-10">
        <Link to="/register" className="w-full sm:w-auto bg-govSaffron-500 hover:bg-orange-600 text-white font-bold py-3 px-8 rounded-sm shadow-md transition-colors text-sm uppercase tracking-wide text-center">
          {t('start_reg_btn')}
        </Link>
        <Link to="/status" className="w-full sm:w-auto bg-white border-2 border-govGreen-800 text-govGreen-800 hover:bg-gray-50 font-bold py-3 px-8 rounded-sm shadow-sm transition-colors text-sm uppercase tracking-wide text-center">
          {t('track_proc_btn')}
        </Link>
      </div>
    </section>
  );
};

export default JourneyStepper;
