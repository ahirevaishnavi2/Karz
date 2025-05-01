import React from 'react';
import { Card } from '@/components/ui/card';
import { 
  RiBarChartBoxLine, 
  RiHandCoinLine, 
  RiMoneyDollarCircleLine, 
  RiArrowUpLine
} from 'react-icons/ri';
import { useQuery } from '@tanstack/react-query';

const FinancialSummary = () => {
  // This would fetch the actual financial summary from the API
  const { data: summary, isLoading } = useQuery({
    queryKey: ['/api/financial-summary'],
  });

  if (isLoading) {
    return (
      <div className="mb-8">
        <h2 className="text-lg font-medium mb-4">Financial Overview</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[1, 2, 3].map((i) => (
            <Card key={i} className="p-5 bg-white animate-pulse">
              <div className="h-24"></div>
            </Card>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mb-8">
      <h2 className="text-lg font-medium mb-4">Financial Overview</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="p-5 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-500">Current Credit Score</div>
              <div className="text-2xl font-semibold mt-1">{summary?.creditScore || '742'}</div>
            </div>
            <div className="h-12 w-12 rounded-lg bg-primary-100 flex items-center justify-center">
              <RiBarChartBoxLine className="text-2xl text-primary-600" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-center">
              <span className="text-green-500 text-sm flex items-center">
                <RiArrowUpLine className="mr-1" /> 15 points
              </span>
              <span className="text-gray-500 text-sm ml-2">since last month</span>
            </div>
          </div>
        </Card>
        
        <Card className="p-5 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-500">Active Loans</div>
              <div className="text-2xl font-semibold mt-1">{summary?.activeLoans || '1'}</div>
            </div>
            <div className="h-12 w-12 rounded-lg bg-amber-100 flex items-center justify-center">
              <RiHandCoinLine className="text-2xl text-amber-600" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-center">
              <span className="text-gray-500 text-sm">${summary?.outstandingLoans || '2,500'} outstanding</span>
            </div>
          </div>
        </Card>
        
        <Card className="p-5 bg-white">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-medium text-gray-500">Active Investments</div>
              <div className="text-2xl font-semibold mt-1">{summary?.activeInvestments || '3'}</div>
            </div>
            <div className="h-12 w-12 rounded-lg bg-green-100 flex items-center justify-center">
              <RiMoneyDollarCircleLine className="text-2xl text-green-600" />
            </div>
          </div>
          <div className="mt-3">
            <div className="flex items-center">
              <span className="text-green-500 text-sm flex items-center">
                <RiArrowUpLine className="mr-1" /> {summary?.averageReturn || '5.2%'}
              </span>
              <span className="text-gray-500 text-sm ml-2">average return</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default FinancialSummary;
