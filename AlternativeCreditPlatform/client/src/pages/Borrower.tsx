import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LoanRequestForm from '@/components/borrower/LoanRequestForm';
import LendersList from '@/components/borrower/LendersList';
import { useQuery } from '@tanstack/react-query';

interface LoanRequest {
  amount: number;
  duration: number;
  purpose: string;
  description: string;
}

const Borrower = () => {
  const [loanRequest, setLoanRequest] = useState<LoanRequest | null>(null);
  const [showLenders, setShowLenders] = useState(false);

  // This would fetch real lenders once a loan request is submitted
  const { data: lenders, isLoading } = useQuery({
    queryKey: ['/api/lenders', loanRequest],
    enabled: !!loanRequest,
  });

  const handleLoanRequestSubmit = (requestData: LoanRequest) => {
    setLoanRequest(requestData);
    setShowLenders(true);
  };

  return (
    <div className="max-w-5xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Borrow Money</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Left Side: Request Form */}
            <div className="md:col-span-2 space-y-6">
              <LoanRequestForm onSubmit={handleLoanRequestSubmit} />
            </div>
            
            {/* Right Side: Interested Lenders */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-base font-medium">Interested Lenders</h4>
              
              {!showLenders ? (
                <div className="text-center p-4 text-sm text-gray-500 bg-white rounded-lg border border-gray-200">
                  Submit your loan request to see potential lenders.
                </div>
              ) : isLoading ? (
                <div className="text-center p-4 text-sm text-gray-500 bg-white rounded-lg border border-gray-200">
                  Finding potential lenders...
                </div>
              ) : (
                <LendersList lenders={lenders || []} />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Borrower;
