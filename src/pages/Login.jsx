import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Eye, EyeOff, Lock, ShieldCheck, Fingerprint } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

const Login = () => {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const { t } = useLanguage();

  const handleLogin = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setLoading(false);
      // alert('Login successful (demo)');
    }, 1500);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 flex justify-center">
      <div className="w-full max-w-md">
        
        <div className="text-center mb-8">
          <h1 className="text-3xl font-extrabold text-govGreen-900 mb-2">{t('login_title')}</h1>
          <p className="text-gray-600 font-medium">{t('login_subtitle')}</p>
        </div>

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
                onClick={() => alert("Aadhaar login is currently disabled for security reasons.")}
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
