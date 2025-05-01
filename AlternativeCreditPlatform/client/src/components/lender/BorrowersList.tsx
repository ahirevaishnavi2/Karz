import React from "react";
import { Button } from "@/components/ui/button";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface Borrower {
  id: string;
  name: string;
  initials: string;
  creditScore: number;
  purpose: string;
  amount: number;
  duration: number;
}

interface BorrowersListProps {
  borrowers: Borrower[];
}

const BorrowersList: React.FC<BorrowersListProps> = ({ borrowers }) => {
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const makeOfferMutation = useMutation({
    mutationFn: (borrowerId: string) =>
      apiRequest("POST", `/api/loan-offers/make`, { borrowerId }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/borrowers"] });
      toast({
        title: "Offer Made",
        description: "You have successfully made a loan offer.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to make offer: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const skipBorrowerMutation = useMutation({
    mutationFn: (borrowerId: string) =>
      apiRequest("POST", `/api/borrowers/${borrowerId}/skip`, {}),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["/api/borrowers"] });
      toast({
        title: "Borrower Skipped",
        description: "This borrower will not be shown in your results anymore.",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to skip borrower: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const handleMakeOffer = (borrowerId: string) => {
    makeOfferMutation.mutate(borrowerId);
  };

  const handleSkip = (borrowerId: string) => {
    skipBorrowerMutation.mutate(borrowerId);
  };

  if (!borrowers || borrowers.length === 0) {
    return (
      <div className="text-center p-4 text-sm text-gray-500 bg-white rounded-lg border border-gray-200">
        No borrowers found matching your lending preferences.
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {borrowers.map((borrower) => (
        <div
          key={borrower.id}
          className="border border-gray-200 rounded-lg p-4 bg-white"
        >
          <div className="flex items-start justify-between">
            <div className="flex items-start">
              <div className="h-10 w-10 rounded-full bg-purple-100 flex items-center justify-center">
                <span className="text-purple-800 font-medium">
                  {borrower.initials}
                </span>
              </div>
              <div className="ml-3">
                <h5 className="text-sm font-medium">{borrower.name}</h5>
                <div className="flex items-center mt-1">
                  <span className="text-xs font-medium bg-primary-100 text-primary-800 rounded px-2 py-0.5">
                    Credit Score: {borrower.creditScore}
                  </span>
                </div>
                <div className="mt-1 text-xs text-gray-500">
                  Purpose:{" "}
                  {borrower.purpose.charAt(0).toUpperCase() +
                    borrower.purpose.slice(1).replace(/-/g, " ")}
                </div>
              </div>
            </div>
            <div className="text-right">
              <div className="text-sm font-medium">
                ${borrower.amount.toLocaleString()}
              </div>
              <div className="text-xs text-gray-500">
                Requesting {borrower.duration}{" "}
                {borrower.duration === 1 ? "month" : "months"}
              </div>
            </div>
          </div>
          <div className="mt-3 flex justify-end space-x-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handleSkip(borrower.id)}
              disabled={skipBorrowerMutation.isPending}
            >
              Reject
            </Button>
            <Button
              size="sm"
              className="bg-green-600 hover:bg-green-700"
              onClick={() => handleMakeOffer(borrower.id)}
              disabled={makeOfferMutation.isPending}
            >
              Accept
            </Button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default BorrowersList;
