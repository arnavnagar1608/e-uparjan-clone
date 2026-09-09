import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from './components/Layout/Header';
import Navbar from './components/Layout/Navbar';
import Footer from './components/Layout/Footer';
import Home from './pages/Home';
import StubPage from './pages/StubPage';

function App() {
  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-[#f4f6f8]">
        <Header />
        <Navbar />
        <main className="flex-grow">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/about" element={<StubPage title="About Us" />} />
            <Route path="/register" element={<StubPage title="Farmer Registration" />} />
            <Route path="/status" element={<StubPage title="Track Status" />} />
            <Route path="/centers" element={<StubPage title="Procurement Centers" />} />
            <Route path="/guidelines" element={<StubPage title="Guidelines" />} />
            <Route path="/contact" element={<StubPage title="Contact Us" />} />
            
            {/* Services Dropdown */}
            <Route path="/services/slot-booking" element={<StubPage title="Slot Booking" />} />
            <Route path="/services/receipt" element={<StubPage title="Print Receipt" />} />
            <Route path="/services/grievance" element={<StubPage title="Lodge Grievance" />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;
