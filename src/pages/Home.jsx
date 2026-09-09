import React from 'react';
import NoticeTicker from '../components/Home/NoticeTicker';
import Hero from '../components/Home/Hero';
import JourneyStepper from '../components/Home/JourneyStepper';
import Schemes from '../components/Home/Schemes';
import ApplicationStatus from '../components/Home/ApplicationStatus';
import Statistics from '../components/Home/Statistics';
import LatestNotifications from '../components/Home/LatestNotifications';
import FAQ from '../components/Home/FAQ';

const Home = () => {
  return (
    <div>
      <NoticeTicker />
      <Hero />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12">
        <JourneyStepper />
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="col-span-2">
            <Schemes />
          </div>
          <div>
            <ApplicationStatus />
          </div>
        </div>
        <LatestNotifications />
        <Statistics />
        <FAQ />
      </div>
    </div>
  );
};

export default Home;
