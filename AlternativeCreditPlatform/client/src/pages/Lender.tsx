import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import LendingPreferencesForm from '@/components/lender/LendingPreferencesForm';
import BorrowersList from '@/components/lender/BorrowersList';
import { useQuery } from '@tanstack/react-query';

interface LendingPreferences {
  amount: number;
  minInterestRate: number;
  durationPreference: string;
  minCreditScore: string;
}

const Lender = () => {
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

  return (
    <div className="max-w-5xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Lend Money</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
            {/* Left Side: Lending Preferences */}
            <div className="md:col-span-2 space-y-6">
              <LendingPreferencesForm onSubmit={handlePreferencesSubmit} />
            </div>
            
            {/* Right Side: Potential Borrowers */}
            <div className="md:col-span-3 space-y-4">
              <h4 className="text-base font-medium">Potential Borrowers</h4>
              
              {!showBorrowers ? (
                <div className="text-center p-4 text-sm text-gray-500 bg-white rounded-lg border border-gray-200">
                  Update your lending preferences to see potential borrowers.
                </div>
              ) : isLoading ? (
                <div className="text-center p-4 text-sm text-gray-500 bg-white rounded-lg border border-gray-200">
                  Finding potential borrowers...
                </div>
              ) : (
                <BorrowersList borrowers={borrowers || []} />
              )}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default Lender;
