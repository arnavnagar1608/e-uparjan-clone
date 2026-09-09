import React from 'react';
import { UserPlus, CalendarCheck, FileText, CheckCircle, AlertCircle, HelpCircle } from 'lucide-react';

const services = [
  { title: "Farmer Registration", icon: UserPlus, desc: "Register online for MSP crop procurement", color: "text-govGreen-700" },
  { title: "Slot Booking", icon: CalendarCheck, desc: "Book your convenient date for crop drop-off", color: "text-govGreen-700" },
  { title: "Download Receipt", icon: FileText, desc: "Print official procurement receipt (Paavti)", color: "text-orange-600" },
  { title: "Payment Status", icon: CheckCircle, desc: "Check DBT payment status in bank account", color: "text-govGreen-700" },
  { title: "Lodge Grievance", icon: AlertCircle, desc: "File a complaint regarding procurement", color: "text-red-600" },
  { title: "Help Center", icon: HelpCircle, desc: "View guidelines, FAQs, and contact info", color: "text-govGreen-700" }
];

const CitizenServices = () => {
  return (
    <section>
      <div className="flex items-center mb-6">
        <h2 className="text-2xl font-bold text-govGreen-900 border-l-4 border-govSaffron-500 pl-3">
          Citizen Services
        </h2>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {services.map((service, index) => {
          const Icon = service.icon;
          return (
            <a href="#" key={index} className="bg-white gov-border p-4 flex flex-col items-center text-center hover:shadow-md transition-shadow group border-t-4 hover:border-t-govGreen-600 border-t-transparent">
              <div className={`p-3 rounded-full bg-gray-50 group-hover:bg-green-50 mb-3 transition-colors ${service.color}`}>
                <Icon size={28} />
              </div>
              <h3 className="text-sm font-bold text-gray-800 mb-1 leading-tight">{service.title}</h3>
              <p className="text-xs text-gray-500 hidden md:block">{service.desc}</p>
            </a>
          );
        })}
      </div>
    </section>
  );
};

export default CitizenServices;
