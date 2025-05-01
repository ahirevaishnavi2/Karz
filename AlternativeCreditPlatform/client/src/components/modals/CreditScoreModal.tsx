import React, { useState } from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RiCloseLine, RiBankLine, RiEditLine } from 'react-icons/ri';
import UploadBankStatement from '@/components/credit/UploadBankStatement';
import ManualTransactionForm from '@/components/credit/ManualTransactionForm';

interface CreditScoreModalProps {
  isOpen: boolean;
  onClose: () => void;
  onShowReport: () => void;
}

const CreditScoreModal: React.FC<CreditScoreModalProps> = ({ isOpen, onClose, onShowReport }) => {
  const [activeOption, setActiveOption] = useState<'upload' | 'manual' | null>(null);

  const handleOptionClick = (option: 'upload' | 'manual') => {
    setActiveOption(option);
  };

  const resetModal = () => {
    setActiveOption(null);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetModal}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Check Your Alternative Credit Score</DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
            <RiCloseLine className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        
        {!activeOption ? (
          <>
            <p className="text-sm text-gray-600 mb-5">Choose one of the following methods to calculate your alternative credit score:</p>
            
            <div className="space-y-4">
              <div 
                className="border border-gray-200 rounded-lg p-4 hover:border-primary-500 cursor-pointer transition-colors"
                onClick={() => handleOptionClick('upload')}
              >
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <RiBankLine className="text-xl text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-medium">Upload Bank Statement</h4>
                    <p className="text-sm text-gray-500 mt-1">Upload a PDF or CSV file of your bank statement for automatic analysis.</p>
                  </div>
                </div>
              </div>
              
              <div 
                className="border border-gray-200 rounded-lg p-4 hover:border-primary-500 cursor-pointer transition-colors"
                onClick={() => handleOptionClick('manual')}
              >
                <div className="flex items-start">
                  <div className="h-10 w-10 rounded-lg bg-primary-100 flex items-center justify-center flex-shrink-0">
                    <RiEditLine className="text-xl text-primary-600" />
                  </div>
                  <div className="ml-4">
                    <h4 className="text-base font-medium">Enter Transactions Manually</h4>
                    <p className="text-sm text-gray-500 mt-1">Manually input your recent transaction history for analysis.</p>
                  </div>
                </div>
              </div>
            </div>
          </>
        ) : activeOption === 'upload' ? (
          <UploadBankStatement onCalculateScore={onShowReport} />
        ) : (
          <ManualTransactionForm onCalculateScore={onShowReport} />
        )}
      </DialogContent>
    </Dialog>
  );
};

export default CreditScoreModal;
