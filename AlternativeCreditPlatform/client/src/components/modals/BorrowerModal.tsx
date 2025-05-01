import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogClose,
} from "@/components/ui/dialog";
import { RiCloseLine } from "react-icons/ri";
import LoanRequestForm from "@/components/borrower/LoanRequestForm";
import LendersList from "@/components/borrower/LendersList";
import { useQuery } from "@tanstack/react-query";

interface BorrowerModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface LoanRequest {
  amount: number;
  duration: number;
  purpose: string;
  description: string;
}

const BorrowerModal: React.FC<BorrowerModalProps> = ({ isOpen, onClose }) => {
  const [loanRequest, setLoanRequest] = useState<LoanRequest | null>(null);
  const [showLenders, setShowLenders] = useState(false);

  // This would fetch real lenders once a loan request is submitted
  const { data: lenders, isLoading } = useQuery({
    queryKey: ["/api/lenders", loanRequest],
    enabled: !!loanRequest,
  });

  const handleLoanRequestSubmit = (requestData: LoanRequest) => {
    setLoanRequest(requestData);
    setShowLenders(true);
  };

  const resetModal = () => {
    setLoanRequest(null);
    setShowLenders(false);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={resetModal}>
      <DialogContent className="sm:max-w-4xl">
        <DialogHeader>
          <DialogTitle>Borrow Money</DialogTitle>
          <DialogClose className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
            <RiCloseLine className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </DialogClose>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-5 gap-6">
          {/* Left Side: Request Form */}
          <div className="md:col-span-2 space-y-6">
            <LoanRequestForm onSubmit={handleLoanRequestSubmit} />
          </div>

          {/* Right Side: Interested Lenders */}
          <div className="md:col-span-3 space-y-4">
            <h4 className="text-base font-medium">Interested Lenders</h4>

            {!showLenders ? (
              <div className="text-center p-4 text-sm text-gray-500">
                Submit your loan request to see potential lenders.
              </div>
            ) : isLoading ? (
              <div className="text-center p-4 text-sm text-gray-500">
                Finding potential lenders...
              </div>
            ) : (
              <LendersList lenders={lenders || []} />
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default BorrowerModal;
