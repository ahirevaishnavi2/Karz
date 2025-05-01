import React, { useState } from 'react';
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import { useMutation } from '@tanstack/react-query';
import { apiRequest } from '@/lib/queryClient';
import { useToast } from '@/hooks/use-toast';

interface ManualTransactionFormProps {
  onCalculateScore: () => void;
}

const transactionSchema = z.object({
  date: z.string().nonempty({ message: 'Transaction date is required' }),
  type: z.string().nonempty({ message: 'Transaction type is required' }),
  amount: z.string().nonempty({ message: 'Amount is required' }),
  description: z.string().nonempty({ message: 'Description is required' }),
});

type TransactionValues = z.infer<typeof transactionSchema>;

const ManualTransactionForm: React.FC<ManualTransactionFormProps> = ({ onCalculateScore }) => {
  const { toast } = useToast();
  const [transactions, setTransactions] = useState<TransactionValues[]>([]);

  const form = useForm<TransactionValues>({
    resolver: zodResolver(transactionSchema),
    defaultValues: {
      date: '',
      type: '',
      amount: '',
      description: '',
    },
  });

  const addTransactionMutation = useMutation({
    mutationFn: (data: TransactionValues) => 
      apiRequest('POST', '/api/transactions', data),
    onSuccess: () => {
      setTransactions([...transactions, form.getValues()]);
      form.reset();
      toast({
        title: 'Transaction Added',
        description: 'Your transaction has been added to the list.',
      });
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to add transaction: ${error.message}`,
        variant: 'destructive',
      });
    },
  });

  const calculateScoreMutation = useMutation({
    mutationFn: () => 
      apiRequest('POST', '/api/credit-score/calculate', { transactions }),
    onSuccess: () => {
      onCalculateScore();
    },
    onError: (error) => {
      toast({
        title: 'Error',
        description: `Failed to calculate score: ${error.message}`,
        variant: 'destructive',
      });
    },
  });

  const onAddTransaction = (data: TransactionValues) => {
    addTransactionMutation.mutate(data);
  };

  const handleCalculateScore = () => {
    if (transactions.length === 0) {
      toast({
        title: 'No Transactions',
        description: 'Please add at least one transaction before calculating your score.',
        variant: 'destructive',
      });
      return;
    }
    
    calculateScoreMutation.mutate();
  };

  return (
    <div className="space-y-6">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onAddTransaction)} className="space-y-4">
          <FormField
            control={form.control}
            name="date"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transaction Date</FormLabel>
                <FormControl>
                  <Input type="date" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="type"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Transaction Type</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="income">Income</SelectItem>
                    <SelectItem value="expense">Expense</SelectItem>
                    <SelectItem value="loan-payment">Loan Payment</SelectItem>
                    <SelectItem value="bill-payment">Bill Payment</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField
            control={form.control}
            name="amount"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Amount</FormLabel>
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
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Input {...field} placeholder="E.g., Salary, Rent payment, etc." />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <div className="flex justify-between">
            <Button 
              type="submit" 
              variant="outline" 
              disabled={addTransactionMutation.isPending}
            >
              Add Transaction
            </Button>
            
            <Button 
              type="button" 
              onClick={handleCalculateScore}
              disabled={calculateScoreMutation.isPending}
            >
              Calculate Score
            </Button>
          </div>
        </form>
      </Form>
      
      {transactions.length > 0 && (
        <div className="mt-6">
          <h4 className="text-sm font-medium mb-2">Added Transactions ({transactions.length})</h4>
          <div className="max-h-40 overflow-y-auto border border-gray-200 rounded-lg">
            <div className="p-2">
              {transactions.map((transaction, index) => (
                <div key={index} className="p-2 border-b border-gray-100 last:border-b-0">
                  <div className="flex justify-between items-center">
                    <div>
                      <span className="text-sm font-medium">{transaction.description}</span>
                      <span className="text-xs text-gray-500 block">{transaction.date}</span>
                    </div>
                    <div className="text-sm font-medium">
                      ${transaction.amount}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManualTransactionForm;
