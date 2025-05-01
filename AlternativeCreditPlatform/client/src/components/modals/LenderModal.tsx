import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { RiCloseLine } from 'react-icons/ri';
import LendingPreferencesForm from '@/components/lender/LendingPreferencesForm';
import BorrowersList from '@/components/lender/BorrowersList';
import { useQuery } from '@tanstack/react-query';

interface LenderModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LendingPreferences {
  amount: number;
  minInterestRate: number;
  durationPreference: string;
  minCreditScore: string;
}

const LenderModal: React.FC<LenderModalProps> = ({ isOpen, onClose }) => {
  const [preferences, setPreferences] = useState<LendingPreferences | null>(null);
  const [showBorrowers, setShowBorrowers] = useState(false);

  // This would fetch real borrowers based on lending preferences
  const { data: borrowers, isLoading } = useQuery({
    queryKey: ['/api/borrowers', preferences],
    enabled: !!preferences,
  });

  const handlePreferencesSubmit = (preferencesData: LendingPreferences) => {
    setPreferences(preferencesData);
    setShowBorrowers(true);
  };

  const resetModal = () => {
    setPreferences(null);
    setShowBorrowers(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetModal}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Lend Money</DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
            <RiCloseLine className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        
        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Left Side: Lending Preferences */}
          <div className="md:col-span-2 space-y-6">
            <LendingPreferencesForm onSubmit={handlePreferencesSubmit} />
          </div>
          
          {/* Right Side: Potential Borrowers */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-base font-medium">Potential Borrowers</h4>
            
            {!showBorrowers ? (
              <div className="text-center p-4 text-sm text-gray-500">
                Update your lending preferences to see potential borrowers.
              </div>
            ) : isLoading ? (
              <div className="text-center p-4 text-sm text-gray-500">
                Finding potential borrowers...
              </div>
            ) : (
              <BorrowersList borrowers={borrowers || []} />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default LenderModal;
