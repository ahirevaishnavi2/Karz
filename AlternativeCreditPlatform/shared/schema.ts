import { pgTable, text, serial, integer, boolean, doublePrecision, timestamp, unique, foreignKey } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// Users table
export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
  firstName: text("first_name").notNull(),
  lastName: text("last_name").notNull(),
  email: text("email").notNull().unique(),
  phone: text("phone"),
  monthlyIncome: doublePrecision("monthly_income"),
  employmentStatus: text("employment_status"),
  creditScore: integer("credit_score"),
  memberSince: timestamp("member_since").defaultNow().notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Transactions table for credit scoring
export const transactions = pgTable("transactions", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  date: timestamp("date").notNull(),
  type: text("type").notNull(), // income, expense, loan-payment, bill-payment
  amount: doublePrecision("amount").notNull(),
  description: text("description").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Credit score reports
export const creditScoreReports = pgTable("credit_score_reports", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  score: integer("score").notNull(),
  rating: text("rating").notNull(), // poor, fair, good, excellent, exceptional
  paymentHistory: integer("payment_history").notNull(), // percentage scores for each category
  creditUtilization: integer("credit_utilization").notNull(),
  accountAge: integer("account_age").notNull(),
  financialBehavior: integer("financial_behavior").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Loan requests
export const loanRequests = pgTable("loan_requests", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  amount: doublePrecision("amount").notNull(),
  duration: integer("duration").notNull(), // in months
  purpose: text("purpose").notNull(), // education, medical, debt-consolidation, etc.
  description: text("description").notNull(),
  status: text("status").notNull().default("pending"), // pending, active, completed, rejected
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Lending preferences
export const lendingPreferences = pgTable("lending_preferences", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id).unique(),
  amount: doublePrecision("amount").notNull(),
  minInterestRate: doublePrecision("min_interest_rate").notNull(),
  durationPreference: text("duration_preference").notNull(), // any, short, medium, long
  minCreditScore: text("min_credit_score").notNull(), // any, 650, 700, 750
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Loan offers
export const loanOffers = pgTable("loan_offers", {
  id: serial("id").primaryKey(),
  lenderId: integer("lender_id").notNull().references(() => users.id),
  borrowerId: integer("borrower_id").notNull().references(() => users.id),
  loanRequestId: integer("loan_request_id").notNull().references(() => loanRequests.id),
  amount: doublePrecision("amount").notNull(),
  duration: integer("duration").notNull(), // in months
  interestRate: doublePrecision("interest_rate").notNull(),
  status: text("status").notNull().default("pending"), // pending, accepted, rejected
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

// Activities for dashboard
export const activities = pgTable("activities", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  type: text("type").notNull(), // loan-payment, credit-check, investment
  description: text("description").notNull(),
  amount: doublePrecision("amount"),
  date: timestamp("date").notNull(),
  status: text("status").notNull(), // completed, pending, active, failed
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

// Zod schemas for validation
export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  creditScore: true,
  memberSince: true,
  createdAt: true,
  updatedAt: true,
});

export const insertTransactionSchema = createInsertSchema(transactions).omit({
  id: true,
  createdAt: true,
});

export const insertCreditScoreReportSchema = createInsertSchema(creditScoreReports).omit({
  id: true,
  createdAt: true,
});

export const insertLoanRequestSchema = createInsertSchema(loanRequests).omit({
  id: true,
  status: true,
  createdAt: true,
  updatedAt: true,
});

export const insertLendingPreferencesSchema = createInsertSchema(lendingPreferences).omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});

export const insertLoanOfferSchema = createInsertSchema(loanOffers).omit({
  id: true,
  status: true,
  createdAt: true,
  updatedAt: true,
});

export const insertActivitySchema = createInsertSchema(activities).omit({
  id: true,
  createdAt: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type Transaction = typeof transactions.$inferSelect;
export type InsertTransaction = z.infer<typeof insertTransactionSchema>;

export type CreditScoreReport = typeof creditScoreReports.$inferSelect;
export type InsertCreditScoreReport = z.infer<typeof insertCreditScoreReportSchema>;

export type LoanRequest = typeof loanRequests.$inferSelect;
export type InsertLoanRequest = z.infer<typeof insertLoanRequestSchema>;

export type LendingPreferences = typeof lendingPreferences.$inferSelect;
export type InsertLendingPreferences = z.infer<typeof insertLendingPreferencesSchema>;

export type LoanOffer = typeof loanOffers.$inferSelect;
export type InsertLoanOffer = z.infer<typeof insertLoanOfferSchema>;

export type Activity = typeof activities.$inferSelect;
export type InsertActivity = z.infer<typeof insertActivitySchema>;
