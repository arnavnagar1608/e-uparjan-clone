import React, { useState } from 'react';
import { Calendar, MapPin, CheckCircle, Info, FileText, ChevronRight, Clock, AlertTriangle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';

const SlotBooking = () => {
  const { t } = useLanguage();
  
  // Form State
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    farmerId: '',
    district: '',
    centre: '',
    crop: '',
    date: '',
    slot: ''
  });

  // Mock Data
  const districts = ['Indore', 'Bhopal', 'Gwalior', 'Ujjain', 'Jabalpur'];
  const centres = {
    'Indore': ['Rau Uparjan Kendra', 'Sanwer Mandi', 'Mhow Krishi Kendra'],
    'Bhopal': ['Berasia Uparjan', 'Kolar Centre', 'Huzur Mandi'],
  };
  const crops = ['Wheat (गेहूँ)', 'Paddy (धान)', 'Gram (चना)', 'Mustard (सरसों)'];

  const availableSlots = [
    { id: 'morning', time: '08:00 AM - 12:00 PM', available: 45, total: 100 },
    { id: 'afternoon', time: '01:00 PM - 05:00 PM', available: 12, total: 100 },
  ];

  const handleNext = (e) => {
    e.preventDefault();
    setStep(step + 1);
  };

  return (
    <div className="bg-[#f4f6f8] min-h-screen pb-12">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center text-xs font-semibold text-gray-500">
          <Link to="/" className="hover:text-govGreen-700">Home</Link>
          <ChevronRight size={14} className="mx-1" />
          <span>Farmer Services</span>
          <ChevronRight size={14} className="mx-1" />
          <span className="text-govGreen-800 font-bold">Slot Booking</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-extrabold text-govGreen-900 mb-2">Procurement Slot Booking</h1>
          <p className="text-gray-600 font-medium">Book a date and time slot to bring your produce to the procurement centre.</p>
        </div>

        {/* Stepper */}
        <div className="mb-8">
          <div className="flex items-center justify-between relative">
            <div className="absolute left-0 top-1/2 w-full h-0.5 bg-gray-200 -z-10 -translate-y-1/2"></div>
            <div className="absolute left-0 top-1/2 h-0.5 bg-govGreen-600 -z-10 -translate-y-1/2 transition-all duration-300" style={{ width: `${((step - 1) / 2) * 100}%` }}></div>
            
            {[
              { num: 1, label: 'Verification' },
              { num: 2, label: 'Centre & Date' },
              { num: 3, label: 'Confirmation' }
            ].map((s) => (
              <div key={s.num} className="flex flex-col items-center bg-[#f4f6f8] px-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold border-2 ${
                  step > s.num ? 'bg-govGreen-600 border-govGreen-600 text-white' : 
                  step === s.num ? 'bg-white border-govGreen-600 text-govGreen-700' : 
                  'bg-white border-gray-300 text-gray-400'
                }`}>
                  {step > s.num ? <CheckCircle size={16} /> : s.num}
                </div>
                <span className={`text-xs font-bold mt-2 ${step >= s.num ? 'text-govGreen-800' : 'text-gray-400'}`}>{s.label}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white gov-border shadow-sm overflow-hidden">
          {/* STEP 1: Farmer Verification */}
          {step === 1 && (
            <form onSubmit={handleNext}>
              <div className="p-6 md:p-8 border-b border-gray-200">
                <h2 className="text-xl font-bold text-govGreen-900 mb-6 flex items-center">
                  <FileText className="mr-2" size={24} /> Step 1: Farmer Identity Verification
                </h2>
                
                <div className="bg-blue-50 border border-blue-200 p-4 flex items-start rounded-sm mb-6">
                  <Info size={20} className="text-blue-600 mt-0.5 mr-3 flex-shrink-0" />
                  <p className="text-sm text-blue-800">Please enter your 14-digit Farmer Registration ID (generated during registration) to fetch your approved crop details.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Farmer Registration ID <span className="text-red-500">*</span></label>
                    <input 
                      type="text" 
                      required
                      placeholder="e.g. FR-MP-2026-XXXX"
                      className="w-full border border-gray-300 px-4 py-2 rounded-sm focus:border-govGreen-600 focus:ring-1 focus:ring-govGreen-600 outline-none"
                      value={formData.farmerId}
                      onChange={e => setFormData({...formData, farmerId: e.target.value})}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Registered Mobile Number <span className="text-red-500">*</span></label>
                    <input 
                      type="tel" 
                      required
                      placeholder="10-digit mobile number"
                      className="w-full border border-gray-300 px-4 py-2 rounded-sm focus:border-govGreen-600 focus:ring-1 focus:ring-govGreen-600 outline-none"
                    />
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 p-6 flex justify-end">
                <button type="submit" className="bg-govGreen-700 hover:bg-govGreen-800 text-white px-8 py-2.5 rounded-sm font-bold transition-colors uppercase tracking-wide text-sm">
                  Verify & Continue
                </button>
              </div>
            </form>
          )}

          {/* STEP 2: Centre & Date Selection */}
          {step === 2 && (
            <form onSubmit={handleNext}>
              <div className="p-6 md:p-8 border-b border-gray-200">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-xl font-bold text-govGreen-900 flex items-center">
                    <Calendar className="mr-2" size={24} /> Step 2: Select Centre & Slot
                  </h2>
                  <div className="text-xs font-bold text-govGreen-700 bg-green-50 px-3 py-1 rounded border border-green-200">
                    Verified: {formData.farmerId || 'FR-MP-2026-1234'}
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Crop to Sell <span className="text-red-500">*</span></label>
                    <select 
                      required
                      className="w-full border border-gray-300 px-4 py-2 rounded-sm focus:border-govGreen-600 focus:ring-1 focus:ring-govGreen-600 outline-none"
                      value={formData.crop}
                      onChange={e => setFormData({...formData, crop: e.target.value})}
                    >
                      <option value="">Select registered crop</option>
                      {crops.map(c => <option key={c} value={c}>{c}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">District <span className="text-red-500">*</span></label>
                    <select 
                      required
                      className="w-full border border-gray-300 px-4 py-2 rounded-sm focus:border-govGreen-600 focus:ring-1 focus:ring-govGreen-600 outline-none"
                      value={formData.district}
                      onChange={e => setFormData({...formData, district: e.target.value})}
                    >
                      <option value="">Select district</option>
                      {districts.map(d => <option key={d} value={d}>{d}</option>)}
                    </select>
                  </div>
                </div>

                {formData.district && (
                  <div className="mb-8">
                    <label className="block text-sm font-bold text-gray-700 mb-3">Procurement Centre <span className="text-red-500">*</span></label>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {(centres[formData.district] || []).map(centre => (
                        <div 
                          key={centre}
                          onClick={() => setFormData({...formData, centre})}
                          className={`border-2 p-4 rounded-sm cursor-pointer transition-colors ${formData.centre === centre ? 'border-govGreen-600 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}
                        >
                          <div className="flex items-start">
                            <MapPin className={`mr-2 flex-shrink-0 ${formData.centre === centre ? 'text-govGreen-600' : 'text-gray-400'}`} size={20} />
                            <div>
                              <p className={`font-bold ${formData.centre === centre ? 'text-govGreen-900' : 'text-gray-700'}`}>{centre}</p>
                              <p className="text-xs text-gray-500 mt-1">Capacity: Available today</p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {formData.centre && (
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-3">Select Date & Time Slot <span className="text-red-500">*</span></label>
                    <input 
                      type="date" 
                      required
                      min={new Date().toISOString().split('T')[0]}
                      className="w-full md:w-1/2 border border-gray-300 px-4 py-2 rounded-sm focus:border-govGreen-600 focus:ring-1 focus:ring-govGreen-600 outline-none mb-4 block"
                      value={formData.date}
                      onChange={e => setFormData({...formData, date: e.target.value})}
                    />
                    
                    {formData.date && (
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                        {availableSlots.map(slot => (
                          <div 
                            key={slot.id}
                            onClick={() => setFormData({...formData, slot: slot.id})}
                            className={`border-2 p-4 rounded-sm cursor-pointer transition-colors ${formData.slot === slot.id ? 'border-govGreen-600 bg-green-50' : 'border-gray-200 hover:border-gray-300'}`}
                          >
                            <div className="flex justify-between items-center mb-2">
                              <p className={`font-bold flex items-center ${formData.slot === slot.id ? 'text-govGreen-900' : 'text-gray-700'}`}>
                                <Clock className="mr-2" size={16} /> {slot.time}
                              </p>
                              <span className={`text-xs font-bold px-2 py-1 rounded ${slot.available > 20 ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}`}>
                                {slot.available} Slots Left
                              </span>
                            </div>
                            <div className="w-full bg-gray-200 rounded-full h-1.5 mt-2">
                              <div className="bg-govGreen-600 h-1.5 rounded-full" style={{ width: `${(slot.available/slot.total)*100}%` }}></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                )}
              </div>
              <div className="bg-gray-50 p-6 flex justify-between">
                <button type="button" onClick={() => setStep(1)} className="text-govGreen-700 font-bold hover:underline px-4 py-2 text-sm uppercase tracking-wide">
                  Back
                </button>
                <button 
                  type="submit" 
                  disabled={!formData.slot}
                  className={`px-8 py-2.5 rounded-sm font-bold transition-colors uppercase tracking-wide text-sm ${formData.slot ? 'bg-govGreen-700 hover:bg-govGreen-800 text-white' : 'bg-gray-300 text-gray-500 cursor-not-allowed'}`}
                >
                  Confirm Slot
                </button>
              </div>
            </form>
          )}

          {/* STEP 3: Confirmation */}
          {step === 3 && (
            <div>
              <div className="bg-green-600 px-8 py-6 text-white text-center">
                <CheckCircle size={48} className="mx-auto mb-4" />
                <h2 className="text-2xl font-bold mb-1">Slot Booked Successfully!</h2>
                <p className="text-green-100">Your token will be generated automatically 1 hour before your slot.</p>
              </div>
              
              <div className="p-8">
                <div className="bg-gray-50 border border-gray-200 rounded p-6 mb-8 relative overflow-hidden">
                  {/* Decorative background watermark */}
                  <img src="https://upload.wikimedia.org/wikipedia/commons/5/55/Emblem_of_India.svg" alt="" className="absolute -right-4 -bottom-10 h-48 opacity-5" />
                  
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-y-6 gap-x-4 relative z-10">
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Booking ID</p>
                      <p className="text-lg font-extrabold text-govGreen-900">BK-98234-2026</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Farmer ID</p>
                      <p className="text-lg font-bold text-gray-900">{formData.farmerId || 'FR-MP-2026-1234'}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Crop</p>
                      <p className="text-lg font-bold text-gray-900">{formData.crop}</p>
                    </div>
                    <div className="col-span-2 md:col-span-1">
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Procurement Centre</p>
                      <p className="text-lg font-bold text-gray-900 leading-tight">{formData.centre}</p>
                      <p className="text-sm text-gray-600">{formData.district}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Date</p>
                      <p className="text-lg font-bold text-gray-900">{formData.date}</p>
                    </div>
                    <div>
                      <p className="text-xs text-gray-500 font-bold uppercase tracking-wider mb-1">Time Slot</p>
                      <p className="text-lg font-bold text-gray-900">{formData.slot === 'morning' ? '08:00 AM - 12:00 PM' : '01:00 PM - 05:00 PM'}</p>
                    </div>
                  </div>
                </div>

                <div className="bg-orange-50 border-l-4 border-govSaffron-500 p-4 mb-8">
                  <div className="flex items-start">
                    <AlertTriangle className="text-govSaffron-600 mt-0.5 mr-3 flex-shrink-0" size={20} />
                    <div>
                      <p className="text-sm font-bold text-orange-900 mb-1">Important Instructions</p>
                      <ul className="text-sm text-orange-800 space-y-1 list-disc list-inside">
                        <li>Please bring a printed copy of this slip or the SMS confirmation.</li>
                        <li>Carry your original Aadhaar Card and Bank Passbook.</li>
                        <li>Ensure your crop is cleaned and dried as per FAQ standards.</li>
                      </ul>
                    </div>
                  </div>
                </div>

                <div className="flex flex-col sm:flex-row justify-center space-y-3 sm:space-y-0 sm:space-x-4">
                  <button 
                    onClick={() => window.print()}
                    className="bg-govGreen-700 hover:bg-govGreen-800 text-white font-bold py-2.5 px-6 rounded-sm transition-colors uppercase tracking-wide text-sm flex items-center justify-center"
                  >
                    <FileText size={18} className="mr-2" /> Print Booking Slip
                  </button>
                  <Link 
                    to="/status"
                    className="bg-white border-2 border-govGreen-700 text-govGreen-800 hover:bg-gray-50 font-bold py-2.5 px-6 rounded-sm transition-colors uppercase tracking-wide text-sm flex items-center justify-center text-center"
                  >
                    Go to Tracking Dashboard
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SlotBooking;
