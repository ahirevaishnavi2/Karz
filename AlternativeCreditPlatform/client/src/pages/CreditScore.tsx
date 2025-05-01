import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import ManualTransactionForm from '@/components/credit/ManualTransactionForm';
import UploadBankStatement from '@/components/credit/UploadBankStatement';
import CreditScoreReportModal from '@/components/modals/CreditScoreReportModal';

const CreditScore = () => {
  const [showCreditScoreReport, setShowCreditScoreReport] = useState(false);

  const handleCalculateScore = () => {
    setShowCreditScoreReport(true);
  };

  return (
    <div className="max-w-4xl mx-auto">
      <Card>
        <CardHeader>
          <CardTitle className="text-2xl">Check Your Alternative Credit Score</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-gray-600 mb-6">
            Choose one of the following methods to calculate your alternative credit score.
            Our analysis uses your transaction history to establish your creditworthiness
            without relying on traditional credit bureaus.
          </p>
          
          <Tabs defaultValue="upload">
            <TabsList className="grid grid-cols-2 mb-6">
              <TabsTrigger value="upload">Upload Bank Statement</TabsTrigger>
              <TabsTrigger value="manual">Enter Transactions Manually</TabsTrigger>
            </TabsList>
            
            <TabsContent value="upload">
              <UploadBankStatement onCalculateScore={handleCalculateScore} />
            </TabsContent>
            
            <TabsContent value="manual">
              <ManualTransactionForm onCalculateScore={handleCalculateScore} />
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
      
      <CreditScoreReportModal
        isOpen={showCreditScoreReport}
        onClose={() => setShowCreditScoreReport(false)}
      />
    </div>
  );
};

export default CreditScore;
