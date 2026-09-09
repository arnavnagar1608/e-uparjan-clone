import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Check, ChevronRight, Download, User, ArrowRight, ShieldCheck, Home, Fingerprint, Printer } from 'lucide-react';

const Register = () => {
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [regId, setRegId] = useState('');
  const [aadhaarStep, setAadhaarStep] = useState(null); // null | 1 (enter Aadhaar) | 2 (enter OTP)
  const [aadhaarData, setAadhaarData] = useState({ aadhaarNo: '', otp: '' });

  const startAadhaarFlow = () => {
    setAadhaarStep(1);
    setAadhaarData({ aadhaarNo: '', otp: '' });
  };

  const handleAadhaarSubmit = (e) => {
    e.preventDefault();
    if (aadhaarStep === 1) {
      if (aadhaarData.aadhaarNo.length !== 12) {
        alert("Please enter a valid 12-digit Aadhaar Number.");
        return;
      }
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setAadhaarStep(2);
      }, 1000);
    } else if (aadhaarStep === 2) {
      if (aadhaarData.otp.length !== 6) {
        alert("Please enter a valid 6-digit OTP.");
        return;
      }
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setAadhaarStep(null);
        // Pre-fill form with dummy Aadhaar data
        setFormData(prev => ({
          ...prev,
          aadhaarNo: aadhaarData.aadhaarNo,
          fullName: 'Ram Kumar',
          guardianName: 'Shyam Kumar',
          dob: '1985-05-12',
          gender: 'Male',
          mobile: '9876543210',
          pinCode: '462001'
        }));
        alert("Aadhaar Verified Successfully! Your details have been auto-filled.");
      }, 1500);
    }
  };

  // Form State with LocalStorage Persistence
  const [formData, setFormData] = useState(() => {
    const saved = localStorage.getItem('farmerRegistrationDraft');
    if (saved) {
      try {
        return JSON.parse(saved);
      } catch (e) {
        console.error("Failed to parse saved registration draft.");
      }
    }
    return {
      aadhaarNo: '', fullName: '', guardianName: '', dob: '', gender: '', mobile: '', altMobile: '', email: '',
      state: 'Madhya Pradesh', district: '', tehsil: '', village: '', panchayat: '', pinCode: '',
      landOwnership: 'Owned', khasraNo: '', landRecordId: '', totalArea: '', cultivatedArea: '', areaUnit: 'Acre', landVillage: '', landDistrict: '',
      crop: '', cropVariety: '', season: 'Kharif', quantity: '', quantityUnit: 'Quintal', harvestDate: '', procYear: '2026-27',
      password: '', confirmPassword: '', declaration: false, terms: false, consent: false
    };
  });

  useEffect(() => {
    localStorage.setItem('farmerRegistrationDraft', JSON.stringify(formData));
  }, [formData]);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({ ...prev, [name]: type === 'checkbox' ? checked : value }));
    // Clear error for field when user types
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const validateStep = (currentStep) => {
    const newErrors = {};
    if (currentStep === 1) {
      if (!formData.aadhaarNo || formData.aadhaarNo.length !== 12) newErrors.aadhaarNo = 'Valid 12-digit Aadhaar number is required';
      if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
      if (!formData.guardianName.trim()) newErrors.guardianName = "Guardian's name is required";
      if (!formData.dob) newErrors.dob = 'Date of birth is required';
      if (!formData.gender) newErrors.gender = 'Gender is required';
      if (!formData.mobile || formData.mobile.length !== 10) newErrors.mobile = 'Valid 10-digit mobile number is required';
    } else if (currentStep === 2) {
      if (!formData.state) newErrors.state = 'State is required';
      if (!formData.district) newErrors.district = 'District is required';
      if (!formData.tehsil) newErrors.tehsil = 'Tehsil is required';
      if (!formData.village) newErrors.village = 'Village is required';
      if (!formData.pinCode || formData.pinCode.length !== 6) newErrors.pinCode = 'Valid 6-digit PIN code is required';
    } else if (currentStep === 3) {
      if (!formData.crop) newErrors.crop = 'Crop selection is required';
    } else if (currentStep === 4) {
      if (!formData.password || formData.password.length < 8) newErrors.password = 'Password must be at least 8 characters';
      if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = 'Passwords do not match';
      if (!formData.declaration) newErrors.declaration = 'You must accept the declaration';
      if (!formData.terms) newErrors.terms = 'You must accept the terms and conditions';
      if (!formData.consent) newErrors.consent = 'You must accept the consent declaration';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(step)) {
      setStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    setStep(prev => prev - 1);
    window.scrollTo(0, 0);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateStep(4)) {
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        setRegId(`FR-MP-2026-${Math.floor(10000 + Math.random() * 90000)}`);
        setSuccess(true);
        localStorage.removeItem('farmerRegistrationDraft');
        window.scrollTo(0, 0);
      }, 1500);
    }
  };

  const saveProgress = () => {
    alert("Progress has been saved securely to your browser.");
  };

  const renderStepper = () => {
    const stepsList = [
      { num: 1, label: 'Identity & Details' },
      { num: 2, label: 'Address' },
      { num: 3, label: 'Land & Crop' },
      { num: 4, label: 'Account Setup' }
    ];

    return (
      <div className="mb-8">
        <div className="flex justify-between items-center relative">
          <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-gray-200 -z-10 -translate-y-1/2 hidden md:block"></div>
          {stepsList.map((s) => {
            const isCompleted = step > s.num;
            const isCurrent = step === s.num;
            return (
              <div key={s.num} className="flex flex-col items-center bg-white md:bg-transparent px-2">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center font-bold text-sm border-2 ${
                  isCompleted ? 'bg-govGreen-600 border-govGreen-600 text-white' :
                  isCurrent ? 'bg-white border-govGreen-700 text-govGreen-700' :
                  'bg-white border-gray-300 text-gray-400'
                }`}>
                  {isCompleted ? <Check size={16} /> : `0${s.num}`}
                </div>
                <span className={`text-xs mt-2 font-bold uppercase tracking-wider hidden md:block ${
                  isCurrent ? 'text-govGreen-800' : isCompleted ? 'text-gray-800' : 'text-gray-400'
                }`}>
                  {s.label}
                </span>
              </div>
            );
          })}
        </div>
        <div className="text-center mt-4 md:hidden font-bold text-govGreen-800 uppercase tracking-wide text-sm">
          Step {step} of 4: {stepsList[step-1].label}
        </div>
      </div>
    );
  };

  if (success) {
    return (
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        <div className="bg-white gov-border p-8 text-center shadow-sm">
          <div className="flex justify-center mb-6">
            <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center">
              <Check size={40} className="text-govGreen-600 font-bold" />
            </div>
          </div>
          <h2 className="text-2xl font-extrabold text-govGreen-900 mb-2">Registration Successful</h2>
          <p className="text-gray-600 mb-8">Your farmer registration has been successfully submitted.</p>
          
          <div className="bg-gray-50 border border-gray-200 rounded-sm p-6 max-w-lg mx-auto text-left mb-8">
            <div className="flex justify-between items-center border-b border-gray-200 pb-3 mb-3">
              <span className="text-sm font-semibold text-gray-500 uppercase">Registration ID</span>
              <span className="text-lg font-bold text-govGreen-800">{regId}</span>
            </div>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-500 font-medium">Farmer Name</p>
                <p className="font-bold text-gray-900">{formData.fullName}</p>
              </div>
              <div>
                <p className="text-gray-500 font-medium">Mobile Number</p>
                <p className="font-bold text-gray-900">+91 {formData.mobile}</p>
              </div>
              <div>
                <p className="text-gray-500 font-medium">District</p>
                <p className="font-bold text-gray-900">{formData.district}</p>
              </div>
              <div>
                <p className="text-gray-500 font-medium">Registered Crop</p>
                <p className="font-bold text-gray-900">{formData.crop || 'N/A'}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-500 font-medium">Registration Date</p>
                <p className="font-bold text-gray-900">{new Date().toLocaleDateString('en-IN')}</p>
              </div>
              <div className="col-span-2">
                <p className="text-gray-500 font-medium">Status</p>
                <p className="font-bold text-govGreen-700 bg-green-100 inline-block px-2 py-0.5 rounded-sm mt-1">Registration Submitted</p>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
            <Link to="/login" className="bg-govGreen-700 hover:bg-govGreen-800 text-white font-bold py-3 px-6 rounded-sm transition-colors uppercase text-sm tracking-wide flex items-center justify-center">
              <User size={18} className="mr-2" /> Go to Farmer Dashboard
            </Link>
            <button className="bg-white border-2 border-govGreen-700 text-govGreen-800 hover:bg-gray-50 font-bold py-3 px-6 rounded-sm transition-colors uppercase text-sm tracking-wide flex items-center justify-center">
              <Download size={18} className="mr-2" /> Download Receipt
            </button>
            <button onClick={() => window.print()} className="bg-white border-2 border-gray-300 text-gray-700 hover:bg-gray-50 font-bold py-3 px-6 rounded-sm transition-colors uppercase text-sm tracking-wide flex items-center justify-center">
              <Printer size={18} className="mr-2" /> Print Receipt
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-[#f4f6f8] min-h-screen pb-12">
      <div className="bg-white border-b border-gray-200 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-4xl mx-auto flex items-center text-xs font-semibold text-gray-500">
          <Link to="/" className="hover:text-govGreen-700 flex items-center">
            <Home size={14} className="mr-1" /> Home
          </Link>
          <ChevronRight size={14} className="mx-1" />
          <span>Farmer Services</span>
          <ChevronRight size={14} className="mx-1" />
          <span className="text-govGreen-800 font-bold">Farmer Registration</span>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-4">
            <div>
              <h1 className="text-3xl font-extrabold text-govGreen-900 mb-2">Farmer Registration</h1>
              <p className="text-gray-600 font-medium">Register to access government procurement services and manage your crop procurement activities.</p>
            </div>
            {step === 1 && !aadhaarStep && (
              <button
                type="button"
                className="flex items-center justify-center py-2.5 px-4 border-2 border-gray-200 rounded-sm shadow-sm text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-colors whitespace-nowrap"
                onClick={startAadhaarFlow}
              >
                <Fingerprint size={18} className="mr-2 text-govSaffron-500" />
                Register using Aadhaar
              </button>
            )}
          </div>
        </div>

        {aadhaarStep ? (
          <div className="bg-white gov-border shadow-sm p-8 max-w-lg mx-auto mt-8">
            <h2 className="text-xl font-bold text-govGreen-900 mb-4 border-b border-gray-200 pb-2">Aadhaar Verification</h2>
            <form onSubmit={handleAadhaarSubmit} className="space-y-6">
              {aadhaarStep === 1 && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Enter 12-digit Aadhaar Number <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    maxLength="12"
                    value={aadhaarData.aadhaarNo}
                    onChange={(e) => setAadhaarData(p => ({...p, aadhaarNo: e.target.value.replace(/\D/g, '')}))}
                    placeholder="xxxx xxxx xxxx"
                    className="w-full border border-gray-300 focus:ring-govGreen-600 px-4 py-3 text-lg rounded-sm focus:outline-none focus:ring-1 tracking-widest text-center" 
                  />
                  <p className="text-xs text-gray-500 mt-2 flex items-center"><ShieldCheck size={14} className="mr-1 text-green-600" /> Your Aadhaar data is encrypted and secure.</p>
                </div>
              )}

              {aadhaarStep === 2 && (
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-1">Enter OTP Sent to Linked Mobile <span className="text-red-500">*</span></label>
                  <input 
                    type="text" 
                    maxLength="6"
                    value={aadhaarData.otp}
                    onChange={(e) => setAadhaarData(p => ({...p, otp: e.target.value.replace(/\D/g, '')}))}
                    placeholder="------"
                    className="w-full border border-gray-300 focus:ring-govGreen-600 px-4 py-3 text-2xl rounded-sm focus:outline-none focus:ring-1 tracking-[1em] text-center font-mono" 
                  />
                  <p className="text-xs text-gray-500 mt-2 text-right cursor-pointer hover:text-govGreen-700">Resend OTP</p>
                </div>
              )}

              <div className="flex space-x-4">
                <button 
                  type="button" 
                  onClick={() => setAadhaarStep(null)}
                  className="w-1/3 bg-white border border-gray-300 text-gray-700 font-bold py-3 rounded-sm transition-colors text-sm uppercase"
                >
                  Cancel
                </button>
                <button 
                  type="submit"
                  disabled={loading}
                  className="w-2/3 bg-govGreen-700 hover:bg-govGreen-800 text-white font-bold py-3 rounded-sm transition-colors text-sm uppercase flex items-center justify-center"
                >
                  {loading ? 'Processing...' : aadhaarStep === 1 ? 'Send OTP' : 'Verify OTP'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <>
            {renderStepper()}

            <div className="bg-white gov-border shadow-sm overflow-hidden">
              <div className="bg-govGreen-800 text-white px-6 py-4 border-b border-govSaffron-500 flex justify-between items-center">
                <h2 className="text-lg font-bold">
                  {step === 1 && "Step 1: Identity & Basic Details"}
                  {step === 2 && "Step 2: Address Details"}
                  {step === 3 && "Step 3: Land & Crop Details"}
                  {step === 4 && "Step 4: Account Setup"}
                </h2>
                <button onClick={saveProgress} className="text-xs font-semibold bg-govGreen-700 hover:bg-govGreen-600 px-3 py-1.5 rounded transition-colors border border-govGreen-600">
                  Save Progress
                </button>
              </div>

              <div className="p-6 md:p-8">
                <form>
                  {step === 1 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="md:col-span-2">
                          <label className="block text-sm font-bold text-gray-700 mb-1">Aadhaar Number <span className="text-red-500">*</span></label>
                          <input type="text" maxLength="12" name="aadhaarNo" value={formData.aadhaarNo} onChange={(e) => setFormData(p => ({...p, aadhaarNo: e.target.value.replace(/\D/g, '')}))} placeholder="12-digit Aadhaar" className={`w-full border ${errors.aadhaarNo ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-govGreen-600'} px-3 py-2 text-sm rounded-sm focus:outline-none focus:ring-1`} />
                          {errors.aadhaarNo && <p className="text-red-500 text-xs mt-1">{errors.aadhaarNo}</p>}
                          <p className="text-xs text-gray-500 mt-1 flex items-center"><ShieldCheck size={12} className="mr-1 text-govGreen-600"/> Identity verification will be completed through the authorized government verification system.</p>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Farmer's Full Name <span className="text-red-500">*</span></label>
                          <input type="text" name="fullName" value={formData.fullName} onChange={handleChange} placeholder="As per Aadhaar/Bank" className={`w-full border ${errors.fullName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-govGreen-600'} px-3 py-2 text-sm rounded-sm focus:outline-none focus:ring-1`} />
                          {errors.fullName && <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Father's/Mother's/Guardian's Name <span className="text-red-500">*</span></label>
                          <input type="text" name="guardianName" value={formData.guardianName} onChange={handleChange} className={`w-full border ${errors.guardianName ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-govGreen-600'} px-3 py-2 text-sm rounded-sm focus:outline-none focus:ring-1`} />
                          {errors.guardianName && <p className="text-red-500 text-xs mt-1">{errors.guardianName}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Date of Birth <span className="text-red-500">*</span></label>
                          <input type="date" name="dob" value={formData.dob} onChange={handleChange} className={`w-full border ${errors.dob ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-govGreen-600'} px-3 py-2 text-sm rounded-sm focus:outline-none focus:ring-1`} />
                          {errors.dob && <p className="text-red-500 text-xs mt-1">{errors.dob}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Gender <span className="text-red-500">*</span></label>
                          <select name="gender" value={formData.gender} onChange={handleChange} className={`w-full border ${errors.gender ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-govGreen-600'} px-3 py-2 text-sm rounded-sm focus:outline-none focus:ring-1 bg-white`}>
                            <option value="">Select Gender</option>
                            <option value="Male">Male</option>
                            <option value="Female">Female</option>
                            <option value="Other">Other</option>
                          </select>
                          {errors.gender && <p className="text-red-500 text-xs mt-1">{errors.gender}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Mobile Number <span className="text-red-500">*</span></label>
                          <div className="flex">
                            <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-sm font-medium">+91</span>
                            <input type="text" maxLength="10" name="mobile" value={formData.mobile} onChange={(e) => setFormData(p => ({...p, mobile: e.target.value.replace(/\D/g, '')}))} className={`w-full border ${errors.mobile ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-govGreen-600'} px-3 py-2 text-sm rounded-r-sm focus:outline-none focus:ring-1`} placeholder="10-digit number" />
                          </div>
                          {errors.mobile && <p className="text-red-500 text-xs mt-1">{errors.mobile}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Alternate Mobile Number</label>
                          <div className="flex">
                            <span className="inline-flex items-center px-3 border border-r-0 border-gray-300 bg-gray-50 text-gray-500 text-sm rounded-l-sm font-medium">+91</span>
                            <input type="text" maxLength="10" name="altMobile" value={formData.altMobile} onChange={(e) => setFormData(p => ({...p, altMobile: e.target.value.replace(/\D/g, '')}))} className="w-full border border-gray-300 focus:ring-govGreen-600 px-3 py-2 text-sm rounded-r-sm focus:outline-none focus:ring-1" placeholder="Optional" />
                          </div>
                        </div>
                        <div className="md:col-span-2">
                          <label className="block text-sm font-bold text-gray-700 mb-1">Email Address</label>
                          <input type="email" name="email" value={formData.email} onChange={handleChange} className="w-full border border-gray-300 focus:ring-govGreen-600 px-3 py-2 text-sm rounded-sm focus:outline-none focus:ring-1" placeholder="Optional" />
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">State <span className="text-red-500">*</span></label>
                          <select name="state" value={formData.state} onChange={handleChange} className={`w-full border ${errors.state ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-govGreen-600'} px-3 py-2 text-sm rounded-sm focus:outline-none focus:ring-1 bg-white`}>
                            <option value="">Select State</option>
                            <option value="Madhya Pradesh">Madhya Pradesh</option>
                            <option value="Uttar Pradesh">Uttar Pradesh</option>
                            <option value="Maharashtra">Maharashtra</option>
                          </select>
                          {errors.state && <p className="text-red-500 text-xs mt-1">{errors.state}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">District <span className="text-red-500">*</span></label>
                          <select name="district" value={formData.district} onChange={handleChange} className={`w-full border ${errors.district ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-govGreen-600'} px-3 py-2 text-sm rounded-sm focus:outline-none focus:ring-1 bg-white`}>
                            <option value="">Select District</option>
                            <option value="Bhopal">Bhopal</option>
                            <option value="Indore">Indore</option>
                            <option value="Ujjain">Ujjain</option>
                            <option value="Jabalpur">Jabalpur</option>
                          </select>
                          {errors.district && <p className="text-red-500 text-xs mt-1">{errors.district}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Tehsil / Taluka <span className="text-red-500">*</span></label>
                          <select name="tehsil" value={formData.tehsil} onChange={handleChange} className={`w-full border ${errors.tehsil ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-govGreen-600'} px-3 py-2 text-sm rounded-sm focus:outline-none focus:ring-1 bg-white`}>
                            <option value="">Select Tehsil</option>
                            <option value="Huzur">Huzur</option>
                            <option value="Berasia">Berasia</option>
                            <option value="Kolar">Kolar</option>
                          </select>
                          {errors.tehsil && <p className="text-red-500 text-xs mt-1">{errors.tehsil}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Village <span className="text-red-500">*</span></label>
                          <input type="text" name="village" value={formData.village} onChange={handleChange} className={`w-full border ${errors.village ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-govGreen-600'} px-3 py-2 text-sm rounded-sm focus:outline-none focus:ring-1`} />
                          {errors.village && <p className="text-red-500 text-xs mt-1">{errors.village}</p>}
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">Gram Panchayat</label>
                          <input type="text" name="panchayat" value={formData.panchayat} onChange={handleChange} className="w-full border border-gray-300 focus:ring-govGreen-600 px-3 py-2 text-sm rounded-sm focus:outline-none focus:ring-1" />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-gray-700 mb-1">PIN Code <span className="text-red-500">*</span></label>
                          <input type="text" maxLength="6" name="pinCode" value={formData.pinCode} onChange={(e) => setFormData(p => ({...p, pinCode: e.target.value.replace(/\D/g, '')}))} className={`w-full border ${errors.pinCode ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-govGreen-600'} px-3 py-2 text-sm rounded-sm focus:outline-none focus:ring-1`} />
                          {errors.pinCode && <p className="text-red-500 text-xs mt-1">{errors.pinCode}</p>}
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-lg font-bold text-govGreen-800 border-b border-gray-200 pb-2 mb-2">Land Details</h3>
                        <p className="text-xs text-gray-500 mb-4 flex items-center"><ShieldCheck size={12} className="mr-1 text-govGreen-600"/> Land details may be verified against the applicable government land-record system.</p>
                        
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Land Ownership</label>
                            <select name="landOwnership" value={formData.landOwnership} onChange={handleChange} className="w-full border border-gray-300 focus:ring-govGreen-600 px-3 py-2 text-sm rounded-sm focus:outline-none focus:ring-1 bg-white">
                              <option value="Owned">Owned</option>
                              <option value="Leased">Leased</option>
                              <option value="Other">Other</option>
                            </select>
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Survey / Khasra Number</label>
                            <input type="text" name="khasraNo" value={formData.khasraNo} onChange={handleChange} className="w-full border border-gray-300 focus:ring-govGreen-600 px-3 py-2 text-sm rounded-sm focus:outline-none focus:ring-1" />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Land Record ID</label>
                            <input type="text" name="landRecordId" value={formData.landRecordId} onChange={handleChange} className="w-full border border-gray-300 focus:ring-govGreen-600 px-3 py-2 text-sm rounded-sm focus:outline-none focus:ring-1" />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Total Land Area</label>
                            <div className="flex">
                              <input type="number" name="totalArea" value={formData.totalArea} onChange={handleChange} className="w-2/3 border border-r-0 border-gray-300 focus:ring-govGreen-600 px-3 py-2 text-sm rounded-l-sm focus:outline-none focus:ring-1" />
                              <select name="areaUnit" value={formData.areaUnit} onChange={handleChange} className="w-1/3 border border-gray-300 focus:ring-govGreen-600 px-2 py-2 text-sm rounded-r-sm bg-gray-50 focus:outline-none focus:ring-1">
                                <option value="Acre">Acre</option>
                                <option value="Hectare">Hectare</option>
                              </select>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Cultivated Area</label>
                            <div className="flex">
                              <input type="number" name="cultivatedArea" value={formData.cultivatedArea} onChange={handleChange} className="w-2/3 border border-r-0 border-gray-300 focus:ring-govGreen-600 px-3 py-2 text-sm rounded-l-sm focus:outline-none focus:ring-1" />
                              <div className="w-1/3 border border-gray-300 px-3 py-2 text-sm rounded-r-sm bg-gray-100 text-gray-600 flex items-center justify-center font-medium">
                                {formData.areaUnit}
                              </div>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Village</label>
                            <input type="text" name="landVillage" value={formData.landVillage} onChange={handleChange} className="w-full border border-gray-300 focus:ring-govGreen-600 px-3 py-2 text-sm rounded-sm focus:outline-none focus:ring-1" />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">District</label>
                            <input type="text" name="landDistrict" value={formData.landDistrict} onChange={handleChange} className="w-full border border-gray-300 focus:ring-govGreen-600 px-3 py-2 text-sm rounded-sm focus:outline-none focus:ring-1" />
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-govGreen-800 border-b border-gray-200 pb-2 mb-4">Crop Details</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Crop <span className="text-red-500">*</span></label>
                            <select name="crop" value={formData.crop} onChange={handleChange} className={`w-full border ${errors.crop ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-govGreen-600'} px-3 py-2 text-sm rounded-sm focus:outline-none focus:ring-1 bg-white`}>
                              <option value="">Select Crop</option>
                              <option value="Wheat">Wheat</option>
                              <option value="Paddy">Paddy</option>
                              <option value="Soybean">Soybean</option>
                              <option value="Maize">Maize</option>
                              <option value="Gram">Gram</option>
                              <option value="Mustard">Mustard</option>
                              <option value="Cotton">Cotton</option>
                              <option value="Other">Other</option>
                            </select>
                            {errors.crop && <p className="text-red-500 text-xs mt-1">{errors.crop}</p>}
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Crop Variety</label>
                            <input type="text" name="cropVariety" value={formData.cropVariety} onChange={handleChange} className="w-full border border-gray-300 focus:ring-govGreen-600 px-3 py-2 text-sm rounded-sm focus:outline-none focus:ring-1" />
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Expected Quantity</label>
                            <div className="flex">
                              <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} className="w-2/3 border border-r-0 border-gray-300 focus:ring-govGreen-600 px-3 py-2 text-sm rounded-l-sm focus:outline-none focus:ring-1" />
                              <select name="quantityUnit" value={formData.quantityUnit} onChange={handleChange} className="w-1/3 border border-gray-300 focus:ring-govGreen-600 px-2 py-2 text-sm rounded-r-sm bg-gray-50 focus:outline-none focus:ring-1">
                                <option value="Quintal">Quintal</option>
                                <option value="Ton">Ton</option>
                              </select>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Procurement Year</label>
                            <input type="text" disabled value={formData.procYear} className="w-full border border-gray-300 bg-gray-100 px-3 py-2 text-sm rounded-sm font-medium text-gray-600 cursor-not-allowed" />
                          </div>
                        </div>
                      </div>
                    </div>
                  )}

                  {step === 4 && (
                    <div className="space-y-8">
                      <div>
                        <h3 className="text-lg font-bold text-govGreen-800 border-b border-gray-200 pb-2 mb-4">Security</h3>
                        <p className="text-xs text-gray-500 mb-4 flex items-center"><ShieldCheck size={12} className="mr-1 text-govGreen-600"/> Use a strong password and do not share your login credentials with anyone.</p>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Create Password <span className="text-red-500">*</span></label>
                            <input type="password" name="password" value={formData.password} onChange={handleChange} className={`w-full border ${errors.password ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-govGreen-600'} px-3 py-2 text-sm rounded-sm focus:outline-none focus:ring-1`} />
                            {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                            
                            <div className="mt-3 bg-gray-50 p-3 rounded border border-gray-200">
                              <p className="text-xs font-bold text-gray-700 mb-2">Password must contain:</p>
                              <ul className="text-xs text-gray-600 space-y-1">
                                <li className={`flex items-center ${formData.password.length >= 8 ? 'text-green-600 font-medium' : ''}`}>
                                  {formData.password.length >= 8 ? <Check size={12} className="mr-1" /> : <span className="w-3 mr-1">-</span>} At least 8 characters
                                </li>
                                <li className={`flex items-center ${/[A-Z]/.test(formData.password) ? 'text-green-600 font-medium' : ''}`}>
                                  {/[A-Z]/.test(formData.password) ? <Check size={12} className="mr-1" /> : <span className="w-3 mr-1">-</span>} One uppercase letter
                                </li>
                                <li className={`flex items-center ${/[0-9]/.test(formData.password) ? 'text-green-600 font-medium' : ''}`}>
                                  {/[0-9]/.test(formData.password) ? <Check size={12} className="mr-1" /> : <span className="w-3 mr-1">-</span>} One number
                                </li>
                                <li className={`flex items-center ${/[^A-Za-z0-9]/.test(formData.password) ? 'text-green-600 font-medium' : ''}`}>
                                  {/[^A-Za-z0-9]/.test(formData.password) ? <Check size={12} className="mr-1" /> : <span className="w-3 mr-1">-</span>} One special character
                                </li>
                              </ul>
                            </div>
                          </div>
                          <div>
                            <label className="block text-sm font-bold text-gray-700 mb-1">Confirm Password <span className="text-red-500">*</span></label>
                            <input type="password" name="confirmPassword" value={formData.confirmPassword} onChange={handleChange} className={`w-full border ${errors.confirmPassword ? 'border-red-500 focus:ring-red-500' : 'border-gray-300 focus:ring-govGreen-600'} px-3 py-2 text-sm rounded-sm focus:outline-none focus:ring-1`} />
                            {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
                          </div>
                        </div>
                      </div>

                      <div>
                        <h3 className="text-lg font-bold text-govGreen-800 border-b border-gray-200 pb-2 mb-4">Declaration</h3>
                        <div className="space-y-4">
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input type="checkbox" name="declaration" checked={formData.declaration} onChange={handleChange} className="h-4 w-4 text-govGreen-600 border-gray-300 rounded focus:ring-govGreen-600" />
                            </div>
                            <div className="ml-3 text-sm">
                              <label className="font-medium text-gray-700">I confirm that the information provided by me is true and correct to the best of my knowledge. <span className="text-red-500">*</span></label>
                              {errors.declaration && <p className="text-red-500 text-xs mt-0.5">{errors.declaration}</p>}
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input type="checkbox" name="terms" checked={formData.terms} onChange={handleChange} className="h-4 w-4 text-govGreen-600 border-gray-300 rounded focus:ring-govGreen-600" />
                            </div>
                            <div className="ml-3 text-sm">
                              <label className="font-medium text-gray-700">I agree to the Terms and Conditions and Privacy Policy of this portal. <span className="text-red-500">*</span></label>
                              {errors.terms && <p className="text-red-500 text-xs mt-0.5">{errors.terms}</p>}
                            </div>
                          </div>
                          <div className="flex items-start">
                            <div className="flex items-center h-5">
                              <input type="checkbox" name="consent" checked={formData.consent} onChange={handleChange} className="h-4 w-4 text-govGreen-600 border-gray-300 rounded focus:ring-govGreen-600" />
                            </div>
                            <div className="ml-3 text-sm">
                              <label className="font-medium text-gray-700">I understand that the information provided may be used for farmer registration, procurement services, application tracking and related government services, as applicable. <span className="text-red-500">*</span></label>
                              {errors.consent && <p className="text-red-500 text-xs mt-0.5">{errors.consent}</p>}
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </form>
              </div>

              <div className="bg-gray-50 px-6 py-4 border-t border-gray-200 flex flex-col-reverse sm:flex-row justify-between items-center">
                {step > 1 ? (
                  <button type="button" onClick={handleBack} className="w-full sm:w-auto mt-3 sm:mt-0 px-6 py-2 border border-gray-300 shadow-sm text-sm font-bold rounded-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-colors">
                    Back
                  </button>
                ) : (
                  <div></div>
                )}
                
                {step < 4 ? (
                  <button type="button" onClick={handleNext} className="w-full sm:w-auto flex items-center justify-center px-6 py-2 border border-transparent shadow-sm text-sm font-bold rounded-sm text-white bg-govGreen-700 hover:bg-govGreen-800 focus:outline-none transition-colors uppercase tracking-wide">
                    Save & Continue <ArrowRight size={16} className="ml-2" />
                  </button>
                ) : (
                  <button type="button" onClick={handleSubmit} disabled={loading} className="w-full sm:w-auto flex items-center justify-center px-8 py-2.5 border border-transparent shadow-sm text-sm font-bold rounded-sm text-white bg-govSaffron-500 hover:bg-orange-600 focus:outline-none disabled:bg-gray-400 transition-colors uppercase tracking-wide">
                    {loading ? 'Processing...' : 'Complete Registration'}
                  </button>
                )}
              </div>
            </div>
          </>
        )}

        <div className="mt-8 text-center text-sm text-gray-600 pb-8">
          Already registered?{' '}
          <Link to="/login" className="font-bold text-govGreen-700 hover:underline">
            Login here
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
