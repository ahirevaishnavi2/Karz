import React from 'react';
import { 
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface LoanRequestFormProps {
  onSubmit: (data: any) => void;
}

const loanRequestSchema = z.object({
  amount: z.string().nonempty({ message: 'Loan amount is required' }),
  duration: z.string().nonempty({ message: 'Loan duration is required' }),
  purpose: z.string().nonempty({ message: 'Loan purpose is required' }),
  description: z.string().min(10, { message: 'Description must be at least 10 characters' }),
});

type LoanRequestValues = z.infer<typeof loanRequestSchema>;

const LoanRequestForm: React.FC<LoanRequestFormProps> = ({ onSubmit }) => {
  const { toast } = useToast();
  
  const form = useForm<LoanRequestValues>({
    resolver: zodResolver(loanRequestSchema),
    defaultValues: {
      amount: '',
      duration: '',
      purpose: '',
      description: '',
    },
  });

  const loanRequestMutation = useMutation({
    mutationFn: (data: LoanRequestValues) => 
      apiRequest('POST', '/api/loan-requests', data),
    onSuccess: (_, variables) => {
      toast({
        title: 'Loan Request Submitted',
        description: 'Your loan request has been submitted successfully.',
      });
      onSubmit({
        amount: parseFloat(variables.amount),
        duration: parseInt(variables.duration),
        purpose: variables.purpose,
        description: variables.description,
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to submit loan request: ${error.message}`,
        variant: 'destructive',
      });
    },
  });

  const handleSubmit = (data: LoanRequestValues) => {
    loanRequestMutation.mutate(data);
  };

  return (
    <div>
      <h4 className="text-base font-medium mb-4">Request a Loan</h4>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount Required</FormLabel>
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
            name="duration"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Loan Duration</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select duration" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">1 Month</SelectItem>
                    <SelectItem value="3">3 Months</SelectItem>
                    <SelectItem value="6">6 Months</SelectItem>
                    <SelectItem value="12">12 Months</SelectItem>
                    <SelectItem value="24">24 Months</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="purpose"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Purpose</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select purpose" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="education">Education</SelectItem>
                    <SelectItem value="medical">Medical Expenses</SelectItem>
                    <SelectItem value="debt-consolidation">Debt Consolidation</SelectItem>
                    <SelectItem value="home-improvement">Home Improvement</SelectItem>
                    <SelectItem value="business">Business</SelectItem>
                    <SelectItem value="other">Other</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea 
                    {...field} 
                    placeholder="Explain why you need this loan..." 
                    rows={3} 
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="pt-2">
            <Button 
              type="submit" 
              className="w-full bg-amber-600 hover:bg-amber-700"
              disabled={loanRequestMutation.isPending}
            >
              {loanRequestMutation.isPending ? 'Submitting...' : 'Submit Loan Request'}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default LoanRequestForm;
