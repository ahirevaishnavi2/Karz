import React from "react";
import { Button } from "@/components/ui/button";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface Lender {
  id: string;
  name: string;
  initials: string;
  rating: number;
  completionRate: number;
  amount: number;
  duration: number;
  interestRate: number;
}

interface LendersListProps {
  lenders: Lender[];
}

const LendersList: React.FC<LendersListProps> = ({ lenders }) => {
  const { toast } = useToast();

  const acceptOfferMutation = useMutation({
    mutationFn: (lenderId: string) =>
      apiRequest("POST", `/api/loan-offers/${lenderId}/accept`, {}),
    onSuccess: () => {
      toast({
        title: "Offer Accepted",
        description: "You have successfully accepted the loan offer.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to accept offer: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const rejectOfferMutation = useMutation({
    mutationFn: (lenderId: string) =>
      apiRequest("POST", `/api/loan-offers/${lenderId}/reject`, {}),
    onSuccess: () => {
      toast({
        title: "Offer Rejected",
        description: "You have rejected the loan offer.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to reject offer: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const handleAccept = (lenderId: string) => {
    acceptOfferMutation.mutate(lenderId);
  };

  const handleReject = (lenderId: string) => {
    rejectOfferMutation.mutate(lenderId);
  };

  if (!lenders || lenders.length === 0) {
    return (
      <div className="text-center p-4 text-sm text-gray-500 bg-white rounded-lg border border-gray-200">
        No lenders found matching your loan request.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {lenders.map((lender) => (
        <div
          key={lender.id}
          className="border border-gray-200 rounded-lg p-4 bg-white"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <div className="h-10 w-10 rounded-full bg-indigo-100 flex items-center justify-center">
                <span className="text-indigo-800 font-medium">
                  {lender.initials}
                </span>
              </div>
              <div className="ml-3">
                <h5 className="text-sm font-medium">{lender.name}</h5>
                <div className="flex items-center mt-1">
                  <div className="flex items-center">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <svg
                        key={i}
                        className={`w-3.5 h-3.5 ${
                          i < Math.floor(lender.rating)
                            ? "text-yellow-400"
                            : i === Math.floor(lender.rating) &&
                              lender.rating % 1 > 0
                            ? "text-yellow-400"
                            : "text-gray-300"
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">
                    ({lender.rating})
                  </span>
                </div>
                <div className="mt-1 text-sm text-gray-500">
                  <span className="inline-flex items-center text-xs bg-green-100 text-green-800 rounded px-2 py-0.5">
                    {lender.completionRate}% Completion Rate
                  </span>
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">
                ${lender.amount.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">
                {lender.duration} months @ {lender.interestRate}%
              </div>
            </div>
          </div>
          <div className="mt-3 flex justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleReject(lender.id)}
              disabled={rejectOfferMutation.isPending}
            >
              Skip
            </Button>
            <Button
              size="sm"
              className="bg-amber-600 hover:bg-amber-700"
              onClick={() => handleAccept(lender.id)}
              disabled={acceptOfferMutation.isPending}
            >
              Offer
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default LendersList;
