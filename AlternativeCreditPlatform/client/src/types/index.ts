// User and Authentication Types
export interface User {
  id: number;
  username: string;
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  monthlyIncome: number;
  employmentStatus: string;
  creditScore: number;
  memberSince: string;
  activeLoans: number;
  activeInvestments: number;
  successRate: string;
}

// Credit Score Types
export interface Transaction {
  id: number;
  userId: number;
  date: string;
  type: string;
  amount: number;
  description: string;
}

export interface CreditScoreReport {
  userId: number;
  score: number;
  rating: string;
  factors: CreditFactor[];
  breakdown: CreditBreakdown[];
  improvementTips: string[];
}

export interface CreditFactor {
  type: 'positive' | 'negative';
  title: string;
  description: string;
}

export interface CreditBreakdown {
  category: string;
  rating: string;
  percentage: number;
}

// Loan Types
export interface LoanRequest {
  id: number;
  userId: number;
  amount: number;
  duration: number;
  purpose: string;
  description: string;
  status: 'pending' | 'active' | 'completed' | 'rejected';
  createdAt: string;
}

export interface LoanOffer {
  id: number;
  lenderId: number;
  borrowerId: number;
  loanRequestId: number;
  amount: number;
  duration: number;
  interestRate: number;
  status: 'pending' | 'accepted' | 'rejected';
  createdAt: string;
}

export interface Lender {
  id: number;
  userId: number;
  name: string;
  initials: string;
  rating: number;
  completionRate: number;
  amount: number;
  duration: number;
  interestRate: number;
}

export interface Borrower {
  id: number;
  userId: number;
  name: string;
  initials: string;
  creditScore: number;
  purpose: string;
  amount: number;
  duration: number;
}

export interface LendingPreferences {
  id: number;
  userId: number;
  amount: number;
  minInterestRate: number;
  durationPreference: string;
  minCreditScore: string;
}

// Dashboard Types
export interface FinancialSummary {
  creditScore: number;
  activeLoans: number;
  outstandingLoans: number;
  activeInvestments: number;
  averageReturn: string;
}

export interface Activity {
  id: number;
  userId: number;
  type: 'loan-payment' | 'credit-check' | 'investment';
  description: string;
  amount: number | null;
  date: string;
  status: 'completed' | 'pending' | 'active' | 'failed';
}
