import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Eye, EyeOff, Lock, ShieldCheck, Fingerprint } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Login = () => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [aadhaarStep, setAadhaarStep] = useState(null); // null | 1 (enter Aadhaar) | 2 (enter OTP)
  const [aadhaarData, setAadhaarData] = useState({ aadhaarNo: '', otp: '' });
  
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ identifier: mobile, password })
      });
      
      const data = await response.json();
      
      if (response.ok) {
        setLoading(false);
        // Save the farmer ID from the real database into localStorage
        localStorage.setItem('activeFarmerId', data.user.farmerId);
        navigate('/');
      } else {
        setLoading(false);
        alert(data.message);
      }
    } catch (error) {
      console.error("API Error:", error);
      setLoading(false);
      alert('Could not connect to backend. Is node server.js running?');
    }
  };

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
        navigate('/');
      }, 1500);
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex justify-center">
      <div className="w-full max-w-md">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-govGreen-900 mb-2">{t('login_title')}</h1>
          <p className="text-gray-600 font-medium">{t('login_subtitle')}</p>
        </div>

        {aadhaarStep ? (
          <div className="bg-white gov-border shadow-sm p-8 max-w-md mx-auto">
            <h2 className="text-xl font-bold text-govGreen-900 mb-4 border-b border-gray-200 pb-2">Aadhaar Login</h2>
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
                  {loading ? t('authenticating') : aadhaarStep === 1 ? 'Send OTP' : 'Verify & Login'}
                </button>
              </div>
            </form>
          </div>
        ) : (
          <div className="bg-white gov-border p-8 shadow-sm">
            <form onSubmit={handleLogin} className="space-y-6">
              
              {/* Mobile Number */}
              <div>
                <label className="block text-sm font-bold text-gray-700 mb-1">{t('mobile_no')} <span className="text-red-500">*</span></label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <span className="text-gray-500 sm:text-sm font-medium">+91</span>
                    <div className="h-5 w-px bg-gray-300 mx-2"></div>
                  </div>
                  <input
                    type="text"
                    maxLength="10"
                    pattern="[0-9]{10}"
                    required
                    value={mobile}
                    onChange={(e) => setMobile(e.target.value.replace(/\D/g, ''))}
                    className="block w-full pl-16 pr-3 py-2.5 border border-gray-300 focus:ring-1 focus:ring-govGreen-600 focus:border-govGreen-600 sm:text-sm rounded-sm"
                    placeholder={t('enter_mobile')}
                  />
                </div>
              </div>

              {/* Password */}
              <div>
                <div className="flex justify-between items-center mb-1">
                  <label className="block text-sm font-bold text-gray-700">{t('password')} <span className="text-red-500">*</span></label>
                  <Link to="/forgot-password" className="text-xs font-semibold text-govGreen-700 hover:underline">{t('forgot_password')}</Link>
                </div>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <Lock size={16} className="text-gray-400" />
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full pl-10 pr-10 py-2.5 border border-gray-300 focus:ring-1 focus:ring-govGreen-600 focus:border-govGreen-600 sm:text-sm rounded-sm"
                    placeholder={t('enter_password')}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 focus:outline-none"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  disabled={loading || mobile.length < 10 || !password}
                  className="w-full flex justify-center py-3 px-4 border border-transparent rounded-sm shadow-sm text-sm font-bold text-white bg-govGreen-700 hover:bg-govGreen-800 focus:outline-none disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors uppercase tracking-wide"
                >
                  {loading ? t('authenticating') : t('login_title')}
                </button>
              </div>
            </form>

            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-300" />
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-2 bg-white text-gray-500 font-medium">{t('or')}</span>
                </div>
              </div>

              <div className="mt-6">
                <button
                  type="button"
                  className="w-full flex justify-center items-center py-2.5 px-4 border-2 border-gray-200 rounded-sm shadow-sm text-sm font-bold text-gray-700 bg-white hover:bg-gray-50 focus:outline-none transition-colors"
                  onClick={startAadhaarFlow}
                >
                  <Fingerprint size={18} className="mr-2 text-govSaffron-500" />
                  {t('login_aadhaar')}
                </button>
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200 text-center">
              <p className="text-sm text-gray-600">
                {t('new_farmer')}{' '}
                <Link to="/register" className="font-bold text-govGreen-700 hover:underline">
                  {t('register_now')}
                </Link>
              </p>
            </div>
          </div>
        )}

        {/* Security Message */}
        <div className="mt-6 flex items-center justify-center text-xs text-gray-500 font-medium">
          <ShieldCheck size={16} className="text-green-600 mr-1.5" />
          <span>{t('security_msg')}</span>
        </div>
      </div>
    </div>
  );
};

export default Login;
