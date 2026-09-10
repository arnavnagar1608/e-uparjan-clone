import React, { useState, useEffect } from 'react';
import { 
  ChevronRight, MapPin, Clock, Info, CheckCircle, Circle, 
  ArrowRight, Phone, MessageSquare, Bell, CreditCard, 
  AlertTriangle, Settings
} from 'lucide-react';
import { Link } from 'react-router-dom';

const TrackingDashboard = () => {
  // Demo Mock Data
  const farmerData = {
    name: 'Ramesh Kumar',
    farmerId: 'FR-MP-2026-004582',
    centre: 'Rau Uparjan Kendra',
    crop: 'Wheat',
    date: '18 November 2026',
    address: 'Rau, Indore, Madhya Pradesh'
  };

  // Real-time prototype state
  const [currentToken, setCurrentToken] = useState(0);
  const [farmerToken, setFarmerToken] = useState(0);
  const [procurementStatus, setProcurementStatus] = useState('waiting'); // waiting, accepted
  const [paymentStatus, setPaymentStatus] = useState('processing');
  const [bookingData, setBookingData] = useState(null);
  const [farmerName, setFarmerName] = useState('Ramesh Kumar');
  
  // Notification Preferences State
  const [prefs, setPrefs] = useState({
    sms: true,
    whatsapp: true,
    procurement: true,
    token: true,
    payment: true,
    govNotices: true
  });

  const avgProcessingTime = 5; // minutes
  const totalTokensToday = 250;

  // Fetch real-time data from Backend API!
  useEffect(() => {
    const fetchQueue = async () => {
      const activeFarmerId = localStorage.getItem('activeFarmerId');
      if (!activeFarmerId) return;

      try {
        const response = await fetch(`http://localhost:5000/api/tracking/${activeFarmerId}`);
        if (response.ok) {
          const data = await response.json();
          setBookingData(data.bookingDetails);
          setFarmerName(data.farmerDetails.name);
          setFarmerToken(data.bookingDetails.farmerToken);
          setCurrentToken(data.liveQueue.currentToken);
          setProcurementStatus(data.bookingDetails.status);
        }
      } catch (e) {
        console.error("API Connection Error", e);
      }
    };

    fetchQueue();
    // Poll the API every 3 seconds to get live token updates!
    const interval = setInterval(fetchQueue, 3000);
    return () => clearInterval(interval);
  }, []);

  // API Call for DEV SIMULATOR
  const simulateAdvanceToken = async () => {
    if (!bookingData) return;
    try {
      await fetch('http://localhost:5000/api/admin/advance-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ centre: bookingData.centre })
      });
    } catch(e) {}
  };

  const simulateSuccess = async () => {
    if (!bookingData) return;
    try {
      await fetch('http://localhost:5000/api/admin/simulate-success', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ farmerId: bookingData.farmerId })
      });
    } catch(e) {}
  };

  // Calculate dynamic variables
  const tokensRemaining = Math.max(0, farmerToken - currentToken);
  const estimatedWait = tokensRemaining * avgProcessingTime;
  
  let statusMessage = "You have sufficient time. Please plan your arrival accordingly.";
  let statusColor = "text-gray-600";
  let statusBg = "bg-gray-100";
  
  if (tokensRemaining <= 0) {
    statusMessage = "Your token is being served. Please proceed to the assigned counter.";
    statusColor = "text-green-700";
    statusBg = "bg-green-100";
  } else if (tokensRemaining <= 4) {
    statusMessage = "Your token will be called soon. Please report to the procurement centre.";
    statusColor = "text-red-700";
    statusBg = "bg-red-100";
  } else if (tokensRemaining <= 10) {
    statusMessage = "Your token is approaching. Please start making your way to the centre.";
    statusColor = "text-orange-700";
    statusBg = "bg-orange-100";
  }

  // Demo Notification History
  const [notifications, setNotifications] = useState([
    { id: 1, text: `Token #${farmerToken} is confirmed for today.`, time: '08:45 AM', type: 'token' },
    { id: 2, text: 'Your slot booking was successful.', time: '08:42 AM', type: 'registration' }
  ]);

  // Push notification when token gets close
  useEffect(() => {
    if (tokensRemaining === 4) {
      setNotifications(prev => [{
        id: Date.now(),
        text: `Your token #${farmerToken} is approaching. Currently serving #${currentToken}. Only ${tokensRemaining} remaining.`,
        time: 'Just now',
        type: 'token'
      }, ...prev]);
    }
  }, [currentToken, tokensRemaining, farmerToken]);

  const [activeTab, setActiveTab] = useState('tracking'); // tracking, notifications, preferences

  return (
    <div className="bg-[#f4f6f8] min-h-screen pb-12">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 py-3 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex items-center text-xs font-semibold text-gray-500">
          <Link to="/" className="hover:text-govGreen-700">Home</Link>
          <ChevronRight size={14} className="mx-1" />
          <span>Farmer Services</span>
          <ChevronRight size={14} className="mx-1" />
          <span className="text-govGreen-800 font-bold">Track My Procurement</span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
        <div className="mb-6 flex flex-col md:flex-row justify-between items-start md:items-end">
          <div>
            <h1 className="text-3xl font-extrabold text-govGreen-900 mb-2">Track My Procurement</h1>
            <p className="text-gray-600 font-medium">Track your procurement token, centre status, produce verification and payment status in real time.</p>
          </div>
          
          {/* DEMO MODE CONTROL PANEL - Invisible to real users, shown for prototype */}
          <div className="mt-4 md:mt-0 p-3 bg-yellow-50 border border-yellow-400 rounded shadow-sm text-xs">
            <div className="font-bold text-yellow-800 mb-2">DEV SIMULATOR</div>
            <div className="flex space-x-2 items-center">
              <button onClick={simulateAdvanceToken} className="px-2 py-1 bg-yellow-500 text-white font-bold rounded">Next Token (+1)</button>
              <button onClick={simulateSuccess} className="px-2 py-1 bg-green-600 text-white font-bold rounded">Simulate Success</button>
            </div>
          </div>
        </div>

        {/* Top Info Bar */}
        <div className="bg-white gov-border p-4 mb-6 shadow-sm flex flex-wrap gap-y-4 justify-between items-center text-sm">
          <div><span className="text-gray-500">Farmer:</span> <span className="font-bold text-gray-900">{farmerName}</span></div>
          <div><span className="text-gray-500">Farmer ID:</span> <span className="font-bold text-gray-900">{bookingData?.farmerId || 'Loading...'}</span></div>
          <div><span className="text-gray-500">Centre:</span> <span className="font-bold text-gray-900">{bookingData?.centre || 'Loading...'}</span></div>
          <div><span className="text-gray-500">Crop:</span> <span className="font-bold text-gray-900">{bookingData?.crop || 'Loading...'}</span></div>
          <div><span className="text-gray-500">Date:</span> <span className="font-bold text-gray-900">{bookingData?.date || 'Loading...'}</span></div>
        </div>

        {/* Tab Navigation */}
        <div className="flex space-x-1 mb-6 border-b border-gray-300">
          <button 
            onClick={() => setActiveTab('tracking')}
            className={`px-4 py-2 font-bold text-sm border-b-2 transition-colors ${activeTab === 'tracking' ? 'border-govGreen-700 text-govGreen-800' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
          >
            Live Tracking
          </button>
          <button 
            onClick={() => setActiveTab('notifications')}
            className={`px-4 py-2 font-bold text-sm border-b-2 transition-colors flex items-center ${activeTab === 'notifications' ? 'border-govGreen-700 text-govGreen-800' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
          >
            Notifications <span className="ml-1.5 bg-govSaffron-500 text-white text-[10px] px-1.5 py-0.5 rounded-full">{notifications.length}</span>
          </button>
          <button 
            onClick={() => setActiveTab('preferences')}
            className={`px-4 py-2 font-bold text-sm border-b-2 transition-colors ${activeTab === 'preferences' ? 'border-govGreen-700 text-govGreen-800' : 'border-transparent text-gray-500 hover:text-gray-800'}`}
          >
            Communication Preferences
          </button>
        </div>

        {/* MAIN TRACKING TAB */}
        {activeTab === 'tracking' && (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* Left Column: Live Status */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* LIVE TOKEN CARD */}
              {procurementStatus === 'waiting' && (
                <div className="bg-white gov-border shadow-sm overflow-hidden relative">
                  <div className="absolute top-4 right-4 flex items-center space-x-1.5">
                    <span className="relative flex h-3 w-3">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-3 w-3 bg-red-500"></span>
                    </span>
                    <span className="text-xs font-bold text-red-600 uppercase tracking-wider">Live</span>
                  </div>
                  
                  <div className="p-6 md:p-8 text-center border-b border-gray-100">
                    <h2 className="text-xl font-bold text-govGreen-900 mb-8 uppercase tracking-wide">Live Token Status</h2>
                    
                    <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-16">
                      <div className="text-center">
                        <p className="text-sm font-semibold text-gray-500 uppercase tracking-wider mb-2">Currently Serving</p>
                        <p className="text-5xl font-extrabold text-gray-800">#{currentToken}</p>
                      </div>
                      
                      <div className="hidden md:block flex-1 max-w-[200px]">
                        <div className="h-1 bg-gray-200 rounded-full w-full relative">
                          <div className="absolute h-3 w-3 bg-govGreen-600 rounded-full top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2 shadow-sm"></div>
                        </div>
                        <p className="text-xs font-bold text-gray-400 mt-3">{tokensRemaining} tokens remaining</p>
                      </div>
                      
                      <div className="text-center">
                        <p className="text-sm font-semibold text-govGreen-700 uppercase tracking-wider mb-2">Your Token</p>
                        <p className="text-6xl font-extrabold text-govGreen-800">#{farmerToken}</p>
                      </div>
                    </div>
                  </div>
                  
                  <div className="bg-gray-50 p-6 grid grid-cols-2 md:grid-cols-4 gap-4 text-center divide-x divide-gray-200">
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">Tokens Ahead</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">{tokensRemaining}</p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">Estimated Wait</p>
                      <p className="text-2xl font-bold text-gray-900 mt-1">~{estimatedWait} <span className="text-sm">min</span></p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">Avg Processing</p>
                      <p className="text-xl font-bold text-gray-700 mt-1">{avgProcessingTime} <span className="text-sm">min/farmer</span></p>
                    </div>
                    <div>
                      <p className="text-xs font-bold text-gray-500 uppercase">Last Updated</p>
                      <p className="text-lg font-bold text-gray-700 mt-1">{new Date().toLocaleTimeString('en-US', {hour: '2-digit', minute:'2-digit'})}</p>
                    </div>
                  </div>

                  {/* Dynamic Status Bar */}
                  <div className={`${statusBg} px-6 py-4 flex items-center justify-center border-t border-gray-200`}>
                    <Info size={18} className={`${statusColor} mr-2 flex-shrink-0`} />
                    <span className={`font-bold ${statusColor}`}>{statusMessage}</span>
                  </div>
                </div>
              )}

              {/* PROCUREMENT COMPLETED CARD */}
              {procurementStatus === 'accepted' && (
                <div className="bg-white gov-border shadow-sm overflow-hidden">
                  <div className="bg-green-600 text-white px-6 py-4 flex items-center justify-center">
                    <CheckCircle size={24} className="mr-2" />
                    <h2 className="text-xl font-bold">Procurement Completed Successfully</h2>
                  </div>
                  <div className="p-8">
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Crop</p>
                        <p className="text-lg font-bold text-gray-900">{farmerData.crop}</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Quantity</p>
                        <p className="text-lg font-bold text-gray-900">42.35 Quintal</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Quality Check</p>
                        <p className="text-lg font-bold text-green-600 bg-green-50 inline-block px-2 rounded">Accepted (FAQ)</p>
                      </div>
                      <div>
                        <p className="text-sm text-gray-500 font-medium">Receipt No.</p>
                        <p className="text-lg font-bold text-gray-900">PR-2026-004582</p>
                      </div>
                    </div>
                    
                    <div className="bg-gray-50 border border-gray-200 rounded p-6 flex flex-col md:flex-row justify-between items-center">
                      <div>
                        <p className="text-sm text-gray-500 font-medium uppercase tracking-wider mb-1">Total Procurement Amount</p>
                        <p className="text-4xl font-extrabold text-govGreen-800">₹42,350</p>
                      </div>
                      <button className="mt-4 md:mt-0 bg-white border-2 border-govGreen-700 text-govGreen-800 hover:bg-gray-50 font-bold py-2.5 px-6 rounded-sm transition-colors text-sm uppercase">
                        Download Receipt
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* PAYMENT STATUS (Appears after completion) */}
              {procurementStatus === 'accepted' && (
                <div className="bg-white gov-border shadow-sm p-6">
                  <h3 className="text-lg font-bold text-govGreen-900 border-b border-gray-200 pb-2 mb-6 flex items-center">
                    <CreditCard size={20} className="mr-2" /> Payment Status
                  </h3>
                  
                  <div className="flex justify-between items-center relative mb-8 px-4">
                    <div className="absolute left-4 right-4 top-1/2 h-0.5 bg-gray-200 -z-10"></div>
                    <div className="absolute left-4 w-1/2 top-1/2 h-0.5 bg-govGreen-600 -z-10"></div>
                    
                    <div className="flex flex-col items-center bg-white px-2">
                      <div className="w-6 h-6 rounded-full bg-govGreen-600 flex items-center justify-center text-white"><CheckCircle size={14} /></div>
                      <span className="text-[10px] md:text-xs font-bold text-gray-700 mt-2 text-center w-20">Calculated</span>
                    </div>
                    <div className="flex flex-col items-center bg-white px-2">
                      <div className="w-6 h-6 rounded-full bg-govSaffron-500 flex items-center justify-center text-white animate-pulse"><Clock size={14} /></div>
                      <span className="text-[10px] md:text-xs font-bold text-govGreen-800 mt-2 text-center w-20">Initiated</span>
                    </div>
                    <div className="flex flex-col items-center bg-white px-2">
                      <div className="w-6 h-6 rounded-full border-2 border-gray-300 bg-white flex items-center justify-center text-gray-300"><Circle size={10} /></div>
                      <span className="text-[10px] md:text-xs font-bold text-gray-400 mt-2 text-center w-20">Credited</span>
                    </div>
                  </div>

                  <div className="bg-orange-50 border border-orange-200 p-4 rounded-sm">
                    <p className="text-sm font-bold text-orange-800 mb-1">Payment Processing</p>
                    <p className="text-xs text-orange-700">Your payment of ₹42,350 has been successfully initiated by the state treasury. It typically takes 2-3 working days to reflect in your registered bank account ending in **4582.</p>
                  </div>
                </div>
              )}

              {/* CENTRE INFO CARD */}
              <div className="bg-white gov-border shadow-sm p-6">
                <h3 className="text-lg font-bold text-govGreen-900 border-b border-gray-200 pb-2 mb-4">Procurement Centre Information</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <p className="font-bold text-gray-900 text-lg mb-1">{farmerData.centre}</p>
                    <p className="text-sm text-gray-600 flex items-start mb-3">
                      <MapPin size={16} className="mr-1 mt-0.5 text-gray-400 flex-shrink-0" />
                      {farmerData.address}
                    </p>
                    <div className="flex space-x-3 mt-4">
                      <button className="text-xs font-bold text-govGreen-700 border border-govGreen-700 px-3 py-1.5 rounded-sm hover:bg-govGreen-50 transition-colors uppercase tracking-wide">
                        View Location
                      </button>
                      <button className="text-xs font-bold text-gray-600 border border-gray-300 px-3 py-1.5 rounded-sm hover:bg-gray-50 transition-colors uppercase tracking-wide flex items-center">
                        <Phone size={12} className="mr-1" /> Helpline
                      </button>
                    </div>
                  </div>
                  <div className="bg-gray-50 border border-gray-200 p-4 rounded-sm text-sm">
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-500 font-medium">Status:</span>
                      <span className="font-bold text-green-600">OPEN TODAY</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-500 font-medium">Working Hours:</span>
                      <span className="font-bold text-gray-900">08:00 AM - 05:00 PM</span>
                    </div>
                    <div className="flex justify-between mb-2">
                      <span className="text-gray-500 font-medium">Total Tokens Today:</span>
                      <span className="font-bold text-gray-900">{totalTokensToday}</span>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Right Column: Timeline */}
            <div className="space-y-6">
              <div className="bg-white gov-border shadow-sm p-6">
                <h3 className="text-lg font-bold text-govGreen-900 border-b border-gray-200 pb-2 mb-6">Procurement Journey</h3>
                
                <div className="relative pl-4 space-y-6">
                  {/* Vertical Line */}
                  <div className="absolute left-6 top-2 bottom-2 w-0.5 bg-gray-200 -z-10"></div>
                  
                  {/* Step 1 */}
                  <div className="relative flex items-start">
                    <div className="bg-white p-1 absolute -left-3">
                      <CheckCircle size={20} className="text-govGreen-600 bg-white" />
                    </div>
                    <div className="ml-8">
                      <p className="text-sm font-bold text-gray-900">Registration Completed</p>
                      <p className="text-xs text-gray-500 mt-0.5">18 Nov, 08:30 AM</p>
                    </div>
                  </div>

                  {/* Step 2 */}
                  <div className="relative flex items-start">
                    <div className="bg-white p-1 absolute -left-3">
                      <CheckCircle size={20} className="text-govGreen-600 bg-white" />
                    </div>
                    <div className="ml-8">
                      <p className="text-sm font-bold text-gray-900">Slot Booked</p>
                      <p className="text-xs text-gray-500 mt-0.5">18 Nov, 08:42 AM</p>
                    </div>
                  </div>

                  {/* Step 3 */}
                  <div className="relative flex items-start">
                    <div className="bg-white p-1 absolute -left-3">
                      <CheckCircle size={20} className="text-govGreen-600 bg-white" />
                    </div>
                    <div className="ml-8">
                      <p className="text-sm font-bold text-gray-900">Token Generated</p>
                      <p className="text-xs text-govGreen-700 font-bold mt-0.5">Token #{farmerToken}</p>
                    </div>
                  </div>

                  {/* Step 4 (Current) */}
                  <div className="relative flex items-start">
                    <div className="bg-white p-1 absolute -left-3">
                      {procurementStatus === 'accepted' ? (
                        <CheckCircle size={20} className="text-govGreen-600 bg-white" />
                      ) : (
                        <span className="relative flex h-5 w-5 items-center justify-center">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-govSaffron-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-govSaffron-500"></span>
                        </span>
                      )}
                    </div>
                    <div className="ml-8">
                      <p className={`text-sm font-bold ${procurementStatus === 'waiting' ? 'text-govSaffron-600' : 'text-gray-900'}`}>Waiting for Procurement</p>
                      <p className="text-xs text-gray-500 mt-0.5">{procurementStatus === 'waiting' ? 'Current Status' : 'Completed'}</p>
                    </div>
                  </div>

                  {/* Step 5 */}
                  <div className="relative flex items-start opacity-60">
                    <div className="bg-white p-1 absolute -left-3">
                      {procurementStatus === 'accepted' ? <CheckCircle size={20} className="text-govGreen-600 bg-white" /> : <Circle size={20} className="text-gray-300 bg-white" />}
                    </div>
                    <div className="ml-8">
                      <p className="text-sm font-bold text-gray-700">Produce Verification</p>
                      <p className="text-xs text-gray-500 mt-0.5">{procurementStatus === 'accepted' ? 'Accepted' : 'Pending'}</p>
                    </div>
                  </div>

                  {/* Step 6 */}
                  <div className="relative flex items-start opacity-60">
                    <div className="bg-white p-1 absolute -left-3">
                      {procurementStatus === 'accepted' ? <CheckCircle size={20} className="text-govGreen-600 bg-white" /> : <Circle size={20} className="text-gray-300 bg-white" />}
                    </div>
                    <div className="ml-8">
                      <p className="text-sm font-bold text-gray-700">Weighing</p>
                      <p className="text-xs text-gray-500 mt-0.5">{procurementStatus === 'accepted' ? '42.35 Qtl' : 'Pending'}</p>
                    </div>
                  </div>

                  {/* Step 7 */}
                  <div className="relative flex items-start opacity-60">
                    <div className="bg-white p-1 absolute -left-3">
                      {procurementStatus === 'accepted' ? <CheckCircle size={20} className="text-govGreen-600 bg-white" /> : <Circle size={20} className="text-gray-300 bg-white" />}
                    </div>
                    <div className="ml-8">
                      <p className="text-sm font-bold text-gray-700">Procurement Completed</p>
                      <p className="text-xs text-gray-500 mt-0.5">{procurementStatus === 'accepted' ? 'Done' : 'Pending'}</p>
                    </div>
                  </div>

                  {/* Step 8 */}
                  <div className="relative flex items-start opacity-60">
                    <div className="bg-white p-1 absolute -left-3">
                      {procurementStatus === 'accepted' ? (
                        <span className="relative flex h-5 w-5 items-center justify-center">
                          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-govSaffron-400 opacity-75"></span>
                          <span className="relative inline-flex rounded-full h-3 w-3 bg-govSaffron-500"></span>
                        </span>
                      ) : <Circle size={20} className="text-gray-300 bg-white" />}
                    </div>
                    <div className="ml-8">
                      <p className="text-sm font-bold text-gray-700">Payment Processing</p>
                      <p className="text-xs text-gray-500 mt-0.5">Pending</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* NOTIFICATIONS TAB */}
        {activeTab === 'notifications' && (
          <div className="bg-white gov-border shadow-sm p-6 max-w-4xl">
            <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-6">
              <h2 className="text-xl font-bold text-govGreen-900">Notification Centre</h2>
              <button className="text-xs font-bold text-govGreen-700 hover:underline">Mark all as read</button>
            </div>
            
            <div className="space-y-4">
              {notifications.map(n => (
                <div key={n.id} className="p-4 border-l-4 border-govGreen-600 bg-green-50/50 rounded-r-sm flex gap-4">
                  <div className="mt-0.5">
                    {n.type === 'token' ? <Bell size={18} className="text-govGreen-700" /> : <CheckCircle size={18} className="text-govGreen-700" />}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 mb-1">{n.text}</p>
                    <p className="text-xs text-gray-500">{n.time}</p>
                  </div>
                </div>
              ))}
              <div className="p-4 border-l-4 border-gray-300 bg-gray-50 rounded-r-sm flex gap-4 opacity-75">
                <div className="mt-0.5"><MessageSquare size={18} className="text-gray-500" /></div>
                <div>
                  <p className="text-sm font-medium text-gray-700 mb-1">Welcome to E-Uparjan! Ensure your mobile number is active for updates.</p>
                  <p className="text-xs text-gray-500">18 Nov, 08:00 AM</p>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* PREFERENCES TAB */}
        {activeTab === 'preferences' && (
          <div className="bg-white gov-border shadow-sm p-6 max-w-4xl">
            <h2 className="text-xl font-bold text-govGreen-900 border-b border-gray-200 pb-4 mb-6">Communication Preferences</h2>
            
            <div className="mb-8">
              <p className="text-sm font-bold text-gray-700 mb-1">Registered Mobile Number</p>
              <p className="text-lg font-mono font-bold text-gray-900">+91 XXXXXXX210</p>
              <p className="text-xs text-gray-500 mt-1">Notifications will be sent to this verified number.</p>
            </div>

            <div className="space-y-6">
              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider">Channels</h3>
              
              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="text-sm font-bold text-gray-900">SMS Notifications</p>
                  <p className="text-xs text-gray-500">Receive traditional text messages</p>
                </div>
                <button onClick={() => setPrefs(p=>({...p, sms: !p.sms}))} className={`w-12 h-6 rounded-full transition-colors relative ${prefs.sms ? 'bg-govGreen-600' : 'bg-gray-300'}`}>
                  <span className={`absolute top-1 bg-white w-4 h-4 rounded-full transition-all ${prefs.sms ? 'left-7' : 'left-1'}`}></span>
                </button>
              </div>

              <div className="flex items-center justify-between py-3 border-b border-gray-100">
                <div>
                  <p className="text-sm font-bold text-gray-900 flex items-center">WhatsApp Updates <span className="ml-2 bg-green-100 text-green-800 text-[10px] px-1.5 py-0.5 rounded font-bold uppercase">Recommended</span></p>
                  <p className="text-xs text-gray-500">Instant rich notifications via WhatsApp Business</p>
                </div>
                <button onClick={() => setPrefs(p=>({...p, whatsapp: !p.whatsapp}))} className={`w-12 h-6 rounded-full transition-colors relative ${prefs.whatsapp ? 'bg-govGreen-600' : 'bg-gray-300'}`}>
                  <span className={`absolute top-1 bg-white w-4 h-4 rounded-full transition-all ${prefs.whatsapp ? 'left-7' : 'left-1'}`}></span>
                </button>
              </div>

              <h3 className="text-sm font-bold text-gray-500 uppercase tracking-wider mt-8">Alert Types</h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {['Procurement Updates', 'Token Alerts', 'Payment Updates', 'Government Notices'].map(type => (
                  <label key={type} className="flex items-start p-4 border border-gray-200 rounded-sm hover:bg-gray-50 cursor-pointer transition-colors">
                    <div className="flex items-center h-5">
                      <input type="checkbox" defaultChecked className="h-4 w-4 text-govGreen-600 border-gray-300 rounded focus:ring-govGreen-600" />
                    </div>
                    <div className="ml-3 text-sm">
                      <p className="font-bold text-gray-900">{type}</p>
                    </div>
                  </label>
                ))}
              </div>
            </div>
            
            <div className="mt-8 pt-6 border-t border-gray-200 text-right">
              <button className="bg-govGreen-700 hover:bg-govGreen-800 text-white font-bold py-2.5 px-6 rounded-sm transition-colors uppercase tracking-wide text-sm">
                Save Preferences
              </button>
            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default TrackingDashboard;
