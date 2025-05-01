import React from "react";
import {
  RiShieldCheckLine,
  RiHandCoinLine,
  RiMoneyDollarCircleLine,
} from "react-icons/ri";
import { Button } from "@/components/ui/button";

interface FeatureCardsProps {
  onCreditScoreClick: () => void;
  onBorrowerClick: () => void;
  onLenderClick: () => void;
}

const FeatureCards: React.FC<FeatureCardsProps> = ({
  onCreditScoreClick,
  onBorrowerClick,
  onLenderClick,
}) => {
  return (
    <div className="mb-8">
      <h2 className="text-lg font-medium mb-4">What would you like to do?</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Credit Score Card */}
        <div className="card bg-white rounded-lg shadow overflow-hidden hover:shadow-md">
          <div className="p-5">
            <div className="h-14 w-14 rounded-lg bg-primary-100 flex items-center justify-center mb-4">
              <RiShieldCheckLine className="text-3xl text-primary-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">
              Check Alternative Credit Score
            </h3>
            <p className="text-gray-600 text-sm mb-4">
              Upload transaction history or enter manually to get your
              personalized credit score.
            </p>
            <Button
              className="w-full bg-primary-500 hover:bg-primary-600"
              onClick={onCreditScoreClick}
            >
              Check Now
            </Button>
          </div>
        </div>

        <div className="card bg-white rounded-lg shadow overflow-hidden hover:shadow-md">
          <div className="p-5">
            <div className="h-14 w-14 rounded-lg bg-amber-100 flex items-center justify-center mb-4">
              <RiHandCoinLine className="text-3xl text-amber-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">Be a Borrower</h3>
            <p className="text-gray-600 text-sm mb-4">
              Request a loan with flexible terms and connect with potential
              lenders.
            </p>
            <Button
              className="w-full bg-amber-500 hover:bg-amber-600 text-white"
              onClick={onBorrowerClick}
            >
              Request Loan
            </Button>
          </div>
        </div>

        {/* Be a Lender Card */}
        <div className="card bg-white rounded-lg shadow overflow-hidden hover:shadow-md">
          <div className="p-5">
            <div className="h-14 w-14 rounded-lg bg-green-100 flex items-center justify-center mb-4">
              <RiMoneyDollarCircleLine className="text-3xl text-green-600" />
            </div>
            <h3 className="text-lg font-medium mb-2">Be a Lender</h3>
            <p className="text-gray-600 text-sm mb-4">
              Invest in peer loans, set your terms, and earn competitive
              returns.
            </p>
            <Button
              className="w-full bg-green-500 hover:bg-green-600 text-white"
              onClick={onLenderClick}
            >
              Start Lending
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FeatureCards;
