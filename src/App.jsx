import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import StubPage from './pages/StubPage';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import TrackingDashboard from './pages/TrackingDashboard';
import SlotBooking from './pages/SlotBooking';
import { LanguageProvider } from './context/LanguageContext';

function App() {
  return (
    <LanguageProvider>
      <Router>
        <div className="flex flex-col min-h-screen bg-[#f4f6f8]">
          <Header />
          <Navbar />
          <main className="flex-grow">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/forgot-password" element={<ForgotPassword />} />
              <Route path="/about" element={<StubPage titleKey="about_us" />} />
              <Route path="/status" element={<TrackingDashboard />} />
              <Route path="/centers" element={<StubPage titleKey="proc_centers" />} />
              <Route path="/guidelines" element={<StubPage titleKey="guidelines" />} />
              <Route path="/contact" element={<StubPage titleKey="contact_us" />} />
              
              {/* Services Dropdown */}
              <Route path="/services/slot-booking" element={<SlotBooking />} />
              <Route path="/services/receipt" element={<StubPage titleKey="print_receipt" />} />
              <Route path="/services/grievance" element={<StubPage titleKey="grievance" />} />
            </Routes>
          </main>
          <Footer />
        </div>
      </Router>
    </LanguageProvider>
  );
}

export default App;
