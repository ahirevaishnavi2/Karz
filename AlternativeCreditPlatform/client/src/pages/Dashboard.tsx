import React, { useState } from 'react';
import FinancialSummary from '@/components/dashboard/FinancialSummary';
import FeatureCards from '@/components/dashboard/FeatureCards';
import RecentActivity from '@/components/dashboard/RecentActivity';
import CreditScoreModal from '@/components/modals/CreditScoreModal';
import BorrowerModal from '@/components/modals/BorrowerModal';
import LenderModal from '@/components/modals/LenderModal';
import CreditScoreReportModal from '@/components/modals/CreditScoreReportModal';

const Dashboard = () => {
  const [showCreditScoreModal, setShowCreditScoreModal] = useState(false);
  const [showBorrowerModal, setShowBorrowerModal] = useState(false);
  const [showLenderModal, setShowLenderModal] = useState(false);
  const [showCreditScoreReportModal, setShowCreditScoreReportModal] = useState(false);

  return (
    <>
      {/* Summary Section */}
      <FinancialSummary />
      
      {/* Main Features Section */}
      <FeatureCards 
        onCreditScoreClick={() => setShowCreditScoreModal(true)}
        onBorrowerClick={() => setShowBorrowerModal(true)}
        onLenderClick={() => setShowLenderModal(true)}
      />
      
      {/* Recent Activity */}
      <RecentActivity />

      {/* Modals */}
      <CreditScoreModal 
        isOpen={showCreditScoreModal} 
        onClose={() => setShowCreditScoreModal(false)} 
        onShowReport={() => {
          setShowCreditScoreModal(false);
          setShowCreditScoreReportModal(true);
        }}
      />
      
      <BorrowerModal 
        isOpen={showBorrowerModal} 
        onClose={() => setShowBorrowerModal(false)} 
      />
      
      <LenderModal 
        isOpen={showLenderModal} 
        onClose={() => setShowLenderModal(false)} 
      />
      
      <CreditScoreReportModal 
        isOpen={showCreditScoreReportModal} 
        onClose={() => setShowCreditScoreReportModal(false)} 
      />
    </>
  );
};

export default Dashboard;
