import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogClose } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { RiCloseLine, RiArrowUpLine, RiArrowDownLine } from 'react-icons/ri';
import { useQuery } from '@tanstack/react-query';

interface CreditScoreReportModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const CreditScoreReportModal: React.FC<CreditScoreReportModalProps> = ({ isOpen, onClose }) => {
  // This would fetch the actual credit score report
  const { data: report, isLoading } = useQuery({
    queryKey: ['/api/credit-score/report'],
    enabled: isOpen,
  });

  if (isLoading) {
    return (
      <Dialog open={isOpen} onOpenChange={onClose}>
        <DialogContent className="sm:max-w-3xl">
          <DialogHeader>
            <DialogTitle>Your Alternative Credit Score Report</DialogTitle>
            <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
              <RiCloseLine className="h-4 w-4" />
              <span className="sr-only">Close</span>
            </DialogClose>
          </DialogHeader>
          <div className="flex justify-center items-center py-12">
            <p>Generating your credit score report...</p>
          </div>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-3xl">
        <DialogHeader>
          <DialogTitle>Your Alternative Credit Score Report</DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
            <RiCloseLine className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>
        
        <div className="mb-8 flex flex-col items-center justify-center">
          <div className="relative w-40 h-40 mb-4">
            <div className="absolute inset-0 flex items-center justify-center">
              <svg className="w-40 h-40" viewBox="0 0 100 100">
                <circle cx="50" cy="50" r="45" fill="none" stroke="#e5e7eb" strokeWidth="8" />
                <circle 
                  cx="50" 
                  cy="50" 
                  r="45" 
                  fill="none" 
                  stroke="#3B82F6" 
                  strokeWidth="8" 
                  strokeDasharray="283" 
                  strokeDashoffset="70" 
                  transform="rotate(-90 50 50)" 
                />
              </svg>
              <div className="absolute inset-0 flex items-center justify-center flex-col">
                <span className="text-4xl font-bold text-gray-800">742</span>
                <span className="text-sm text-gray-500">GOOD</span>
              </div>
            </div>
          </div>
          
          <div className="w-full max-w-md flex justify-between px-2 text-xs text-gray-500">
            <div>Poor<br/>300</div>
            <div>Fair<br/>600</div>
            <div>Good<br/>700</div>
            <div>Excellent<br/>800</div>
            <div>Exceptional<br/>850</div>
          </div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h4 className="text-base font-medium mb-4">Score Factors</h4>
            <div className="space-y-3">
              <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                <div className="flex items-start">
                  <RiArrowUpLine className="text-green-600 mt-0.5" />
                  <div className="ml-2">
                    <div className="text-sm font-medium text-green-800">On-time Bill Payments</div>
                    <p className="text-xs text-green-700 mt-1">Your consistent bill payment history has positively impacted your score.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-green-50 p-3 rounded-lg border border-green-100">
                <div className="flex items-start">
                  <RiArrowUpLine className="text-green-600 mt-0.5" />
                  <div className="ml-2">
                    <div className="text-sm font-medium text-green-800">Low Debt-to-Income Ratio</div>
                    <p className="text-xs text-green-700 mt-1">Your current debt levels are well managed relative to your income.</p>
                  </div>
                </div>
              </div>
              
              <div className="bg-amber-50 p-3 rounded-lg border border-amber-100">
                <div className="flex items-start">
                  <RiArrowDownLine className="text-amber-600 mt-0.5" />
                  <div className="ml-2">
                    <div className="text-sm font-medium text-amber-800">Recent New Account</div>
                    <p className="text-xs text-amber-700 mt-1">Opening a new credit account within the last 3 months has slightly decreased your score.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <div>
            <h4 className="text-base font-medium mb-4">Score Breakdown</h4>
            <div className="space-y-4">
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Payment History</span>
                  <span className="text-sm">Excellent</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '95%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Credit Utilization</span>
                  <span className="text-sm">Good</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary-500 h-2 rounded-full" style={{ width: '75%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Account Age</span>
                  <span className="text-sm">Fair</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '60%' }}></div>
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-sm font-medium">Financial Behavior</span>
                  <span className="text-sm">Good</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div className="bg-primary-500 h-2 rounded-full" style={{ width: '80%' }}></div>
                </div>
              </div>
            </div>
            
            <div className="mt-6">
              <h4 className="text-sm font-medium mb-2">Improvement Tips</h4>
              <ul className="text-xs text-gray-600 space-y-1 list-disc list-inside">
                <li>Maintain your on-time payment history</li>
                <li>Wait 3-6 months before opening new credit accounts</li>
                <li>Keep balances below 30% of your credit limits</li>
                <li>Continue building your account history</li>
              </ul>
            </div>
          </div>
        </div>
        
        <div className="mt-8 border-t border-gray-200 pt-4 flex justify-end space-x-3">
          <Button variant="outline">
            Download Report
          </Button>
          <Button onClick={onClose}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default CreditScoreReportModal;
