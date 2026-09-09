import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-govGreen-900 text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-bold border-b-2 border-govSaffron-500 inline-block pb-1 mb-4">About Portal</h3>
            <p className="text-sm text-gray-300">
              E-Uparjan is a comprehensive portal for the computerization of the foodgrain procurement system, ensuring transparent operations and direct benefit transfers to farmers.
            </p>
          </div>
          <div>
            <h3 className="text-lg font-bold border-b-2 border-govSaffron-500 inline-block pb-1 mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><Link to="/register" className="hover:text-govSaffron-500 hover:underline">Farmer Registration</Link></li>
              <li><Link to="/status" className="hover:text-govSaffron-500 hover:underline">Track Payment Status</Link></li>
              <li><Link to="/guidelines" className="hover:text-govSaffron-500 hover:underline">Download Guidelines</Link></li>
              <li><Link to="/services/grievance" className="hover:text-govSaffron-500 hover:underline">Lodge Grievance</Link></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold border-b-2 border-govSaffron-500 inline-block pb-1 mb-4">Policies</h3>
            <ul className="space-y-2 text-sm text-gray-300">
              <li><a href="#" className="hover:text-govSaffron-500 hover:underline">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-govSaffron-500 hover:underline">Terms & Conditions</a></li>
              <li><a href="#" className="hover:text-govSaffron-500 hover:underline">Copyright Policy</a></li>
              <li><a href="#" className="hover:text-govSaffron-500 hover:underline">Hyperlinking Policy</a></li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-bold border-b-2 border-govSaffron-500 inline-block pb-1 mb-4">Contact Us</h3>
            <div className="text-sm text-gray-300 space-y-2">
              <p>Helpline: 1800-111-2222 (Toll Free)</p>
              <p>Email: support@euparjan.gov.in</p>
              <p>Working Hours: Mon-Sat (9:00 AM to 6:00 PM)</p>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-[#0b2b18] border-t border-[#114023] py-4">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center text-xs text-gray-400">
          <div className="mb-2 md:mb-0">
            <p>Website Content Managed by Department of Agriculture & Farmers Welfare</p>
            <p>Designed, Developed and Hosted by National Informatics Centre (NIC)</p>
          </div>
          <div className="text-right">
            <p>Last Updated: {new Date().toLocaleDateString('en-IN')}</p>
            <p>Visitors Count: <span className="bg-[#114023] px-2 py-0.5 rounded text-white ml-1">1,452,089</span></p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
