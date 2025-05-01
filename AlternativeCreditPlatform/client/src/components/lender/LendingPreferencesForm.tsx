// components/LendingPreferencesForm.tsx
import React from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";
import { useToast } from "@/hooks/use-toast";

interface LendingPreferencesFormProps {
  onSubmit: (data: any) => void;
}

const lendingPreferencesSchema = z.object({
  amount: z.string().nonempty({ message: "Amount is required" }),
  minInterestRate: z
    .string()
    .nonempty({ message: "Minimum interest rate is required" }),
  durationPreference: z
    .string()
    .nonempty({ message: "Duration preference is required" }),
  minCreditScore: z
    .string()
    .nonempty({ message: "Minimum credit score is required" }),
});

type LendingPreferencesValues = z.infer<typeof lendingPreferencesSchema>;

const LendingPreferencesForm: React.FC<LendingPreferencesFormProps> = ({
  onSubmit,
}) => {
  const { toast } = useToast();

  const form = useForm<LendingPreferencesValues>({
    resolver: zodResolver(lendingPreferencesSchema),
    defaultValues: {
      amount: "",
      minInterestRate: "",
      durationPreference: "",
      minCreditScore: "",
    },
  });

  const lendingPreferencesMutation = useMutation({
    mutationFn: (data: LendingPreferencesValues) =>
      apiRequest("POST", "/api/lending-preferences", data),
    onSuccess: (_, variables) => {
      toast({
        title: "Preferences Submitted",
        description: "Matching borrowers will now be displayed.",
      });
      onSubmit({
        amount: parseFloat(variables.amount),
        minInterestRate: parseFloat(variables.minInterestRate),
        durationPreference: variables.durationPreference,
        minCreditScore: variables.minCreditScore,
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to submit preferences: ${error.message}`,
        variant: "destructive",
      });
    },
  });

  const handleSubmit = (data: LendingPreferencesValues) => {
    lendingPreferencesMutation.mutate(data);
  };

  return (
    <div>
      <h4 className="text-base font-medium mb-4">Your Lending Preferences</h4>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Total Amount Available to Lend</FormLabel>
                <FormControl>
                  <div className="relative">
                    <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                      $
                    </span>
                    <Input className="pl-7" {...field} placeholder="0.00" />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="minInterestRate"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum Interest Rate (%)</FormLabel>
                <FormControl>
                  <Input type="number" min="0" max="30" step="0.1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="durationPreference"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Preferred Duration</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select preferred duration" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="any">Any Duration</SelectItem>
                    <SelectItem value="short">1–3 Months</SelectItem>
                    <SelectItem value="medium">4–12 Months</SelectItem>
                    <SelectItem value="long">12+ Months</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="minCreditScore"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Minimum Borrower Credit Score</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select credit score" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="any">Any Score</SelectItem>
                    <SelectItem value="650">650+</SelectItem>
                    <SelectItem value="700">700+</SelectItem>
                    <SelectItem value="750">750+</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="pt-2">
            <Button
              type="submit"
              className="w-full bg-green-600 hover:bg-green-700"
              disabled={lendingPreferencesMutation.isPending}
            >
              {lendingPreferencesMutation.isPending
                ? "Submitting..."
                : "Submit Preferences"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LendingPreferencesForm;
