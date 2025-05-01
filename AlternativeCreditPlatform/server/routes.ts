import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import {
  insertUserSchema,
  insertTransactionSchema,
  insertLoanRequestSchema,
  insertLendingPreferencesSchema,
  insertLoanOfferSchema,
} from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(app: Express): Promise<Server> {
  // API routes
  const apiRouter = app.route("/api");

  // User Profile
  app.get("/api/profile", async (req, res) => {
    try {
      const userId = 1;
      const user = await storage.getUser(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Don't send the password
      const { password, ...userWithoutPassword } = user;

      res.json({
        ...userWithoutPassword,
        memberSince: "June 2023", // This would normally come from the user record
        activeLoans: 1,
        activeInvestments: 3,
        successRate: "100%",
      });
    } catch (error) {
      console.error("Error fetching profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.put("/api/profile", async (req, res) => {
    try {
      const userId = 1; // Mock user ID for demo

      const updateSchema = z.object({
        firstName: z.string().min(1),
        lastName: z.string().min(1),
        email: z.string().email(),
        phone: z.string().optional(),
        monthlyIncome: z.string().optional(),
        employmentStatus: z.string().optional(),
      });

      const validatedData = updateSchema.parse(req.body);

      const updatedUser = await storage.updateUser(userId, {
        ...validatedData,
        monthlyIncome: validatedData.monthlyIncome
          ? parseFloat(validatedData.monthlyIncome.replace(/,/g, ""))
          : undefined,
      });

      if (!updatedUser) {
        return res.status(404).json({ message: "User not found" });
      }

      // Don't send the password
      const { password, ...userWithoutPassword } = updatedUser;

      res.json(userWithoutPassword);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ message: "Invalid input data", errors: error.errors });
      }
      console.error("Error updating profile:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Financial Summary
  app.get("/api/financial-summary", async (req, res) => {
    try {
      const userId = 1; // Mock user ID for demo
      const user = await storage.getUser(userId);

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      // Get loan and investment data
      const activeLoans = await storage.getActiveLoans(userId);
      const activeInvestments = await storage.getActiveInvestments(userId);

      // Calculate total outstanding loans
      const outstandingLoans = activeLoans.reduce(
        (total, loan) => total + loan.amount,
        0
      );

      // Calculate average return on investments
      const totalReturn = activeInvestments.reduce(
        (total, inv) => total + inv.interestRate,
        0
      );
      const averageReturn =
        activeInvestments.length > 0
          ? `${(totalReturn / activeInvestments.length).toFixed(1)}%`
          : "0.0%";

      res.json({
        creditScore: user.creditScore || 742,
        activeLoans: activeLoans.length,
        outstandingLoans,
        activeInvestments: activeInvestments.length,
        averageReturn,
      });
    } catch (error) {
      console.error("Error fetching financial summary:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Activities
  app.get("/api/activities", async (req, res) => {
    try {
      const userId = 1; // Mock user ID for demo
      const activities = await storage.getActivities(userId);

      res.json(activities);
    } catch (error) {
      console.error("Error fetching activities:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Credit Score
  app.post("/api/transactions", async (req, res) => {
    try {
      const userId = 1; // Mock user ID for demo

      const validatedData = insertTransactionSchema.parse({
        ...req.body,
        userId,
        amount: parseFloat(req.body.amount),
        date: new Date(req.body.date),
      });

      const transaction = await storage.createTransaction(validatedData);

      // Create activity record for this transaction
      await storage.createActivity({
        userId,
        type: "credit-check",
        description: "Manual transaction entry",
        amount: transaction.amount,
        date: new Date(),
        status: "completed",
      });

      res.json(transaction);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ message: "Invalid input data", errors: error.errors });
      }
      console.error("Error creating transaction:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/credit-score/upload", async (req, res) => {
    try {
      const userId = 1; // Mock user ID for demo

      // Create activity record for file upload
      await storage.createActivity({
        userId,
        type: "credit-check",
        description: "Bank statement upload",
        amount: null,
        date: new Date(),
        status: "completed",
      });

      res.json({ success: true, message: "File uploaded successfully" });
    } catch (error) {
      console.error("Error uploading file:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/credit-score/calculate", async (req, res) => {
    try {
      const userId = 1; // Mock user ID for demo

      const creditScore = {
        userId,
        score: 742,
        rating: "good",
        paymentHistory: 95,
        creditUtilization: 75,
        accountAge: 60,
        financialBehavior: 80,
      };

      const report = await storage.createCreditScoreReport(creditScore);

      // Update the user's credit score
      await storage.updateUser(userId, { creditScore: report.score });

      // Create activity record for credit score calculation
      await storage.createActivity({
        userId,
        type: "credit-check",
        description: "Credit score calculated",
        amount: null,
        date: new Date(),
        status: "completed",
      });

      res.json(report);
    } catch (error) {
      console.error("Error calculating credit score:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/credit-score/report", async (req, res) => {
    try {
      // In a real app, we would get the user ID from the session
      const userId = 1; // Mock user ID for demo

      const report = await storage.getLatestCreditScoreReport(userId);

      if (!report) {
        return res
          .status(404)
          .json({ message: "Credit score report not found" });
      }

      // Format the report for the frontend
      const formattedReport = {
        score: report.score,
        rating: report.rating.toUpperCase(),
        factors: [
          {
            type: "positive",
            title: "On-time Bill Payments",
            description:
              "Your consistent bill payment history has positively impacted your score.",
          },
          {
            type: "positive",
            title: "Low Debt-to-Income Ratio",
            description:
              "Your current debt levels are well managed relative to your income.",
          },
          {
            type: "negative",
            title: "Recent New Account",
            description:
              "Opening a new credit account within the last 3 months has slightly decreased your score.",
          },
        ],
        breakdown: [
          {
            category: "Payment History",
            rating: "Excellent",
            percentage: report.paymentHistory,
          },
          {
            category: "Credit Utilization",
            rating: "Good",
            percentage: report.creditUtilization,
          },
          {
            category: "Account Age",
            rating: "Fair",
            percentage: report.accountAge,
          },
          {
            category: "Financial Behavior",
            rating: "Good",
            percentage: report.financialBehavior,
          },
        ],
        improvementTips: [
          "Maintain your on-time payment history",
          "Wait 3-6 months before opening new credit accounts",
          "Keep balances below 30% of your credit limits",
          "Continue building your account history",
        ],
      };

      res.json(formattedReport);
    } catch (error) {
      console.error("Error fetching credit score report:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Borrower
  app.post("/api/loan-requests", async (req, res) => {
    try {
      // In a real app, we would get the user ID from the session
      const userId = 1; // Mock user ID for demo

      const validatedData = insertLoanRequestSchema.parse({
        ...req.body,
        userId,
        amount: parseFloat(req.body.amount),
        duration: parseInt(req.body.duration),
      });

      const loanRequest = await storage.createLoanRequest(validatedData);

      // Create activity record for loan request
      await storage.createActivity({
        userId,
        type: "loan-payment",
        description: `Loan request for $${loanRequest.amount.toLocaleString()}`,
        amount: loanRequest.amount,
        date: new Date(),
        status: "pending",
      });

      res.json(loanRequest);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ message: "Invalid input data", errors: error.errors });
      }
      console.error("Error creating loan request:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/lenders", async (req, res) => {
    try {
      const userId = 1;

      // Get the loan amount from query params if available
      const loanAmount = req.query.amount
        ? parseFloat(req.query.amount as string)
        : 2500;
      const loanDuration = req.query.duration
        ? parseInt(req.query.duration as string)
        : 12;

      // Find potential lenders with matching preferences
      const lenders = await storage.getPotentialLenders(
        userId,
        loanAmount,
        loanDuration
      );

      res.json(lenders);
    } catch (error) {
      console.error("Error fetching lenders:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/loan-offers/:lenderId/accept", async (req, res) => {
    try {
      // In a real app, we would get the user ID from the session
      const userId = 1; // Mock user ID for demo
      const lenderId = parseInt(req.params.lenderId);

      // Get the user's active loan request
      const loanRequests = await storage.getUserLoanRequests(userId);
      const activeLoanRequest = loanRequests.find(
        (req) => req.status === "pending"
      );

      if (!activeLoanRequest) {
        return res
          .status(404)
          .json({ message: "No active loan request found" });
      }

      // Find the offer from this lender
      const offer = await storage.getLoanOfferByLenderAndRequest(
        lenderId,
        activeLoanRequest.id
      );

      if (!offer) {
        return res
          .status(404)
          .json({ message: "No loan offer found from this lender" });
      }

      // Accept the offer
      const updatedOffer = await storage.updateLoanOfferStatus(
        offer.id,
        "accepted"
      );

      // Update the loan request status to active
      await storage.updateLoanRequestStatus(activeLoanRequest.id, "active");

      // Create activity record for loan acceptance
      await storage.createActivity({
        userId,
        type: "loan-payment",
        description: `Accepted loan offer of $${offer.amount.toLocaleString()} from lender`,
        amount: offer.amount,
        date: new Date(),
        status: "active",
      });

      res.json(updatedOffer);
    } catch (error) {
      console.error("Error accepting loan offer:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/loan-offers/:lenderId/reject", async (req, res) => {
    try {
      // In a real app, we would get the user ID from the session
      const userId = 1; // Mock user ID for demo
      const lenderId = parseInt(req.params.lenderId);

      // Get the user's active loan request
      const loanRequests = await storage.getUserLoanRequests(userId);
      const activeLoanRequest = loanRequests.find(
        (req) => req.status === "pending"
      );

      if (!activeLoanRequest) {
        return res
          .status(404)
          .json({ message: "No active loan request found" });
      }

      // Find the offer from this lender
      const offer = await storage.getLoanOfferByLenderAndRequest(
        lenderId,
        activeLoanRequest.id
      );

      if (!offer) {
        return res
          .status(404)
          .json({ message: "No loan offer found from this lender" });
      }

      // Reject the offer
      const updatedOffer = await storage.updateLoanOfferStatus(
        offer.id,
        "rejected"
      );

      res.json(updatedOffer);
    } catch (error) {
      console.error("Error rejecting loan offer:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  // Lender
  app.post("/api/lending-preferences", async (req, res) => {
    try {
      // In a real app, we would get the user ID from the session
      const userId = 1; // Mock user ID for demo

      const validatedData = insertLendingPreferencesSchema.parse({
        ...req.body,
        userId,
        amount: parseFloat(req.body.amount),
        minInterestRate: parseFloat(req.body.minInterestRate),
      });

      // Check if preferences already exist for this user
      const existingPrefs = await storage.getLendingPreferences(userId);

      let preferences;
      if (existingPrefs) {
        preferences = await storage.updateLendingPreferences(
          userId,
          validatedData
        );
      } else {
        preferences = await storage.createLendingPreferences(validatedData);
      }

      res.json(preferences);
    } catch (error) {
      if (error instanceof z.ZodError) {
        return res
          .status(400)
          .json({ message: "Invalid input data", errors: error.errors });
      }
      console.error("Error updating lending preferences:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.get("/api/borrowers", async (req, res) => {
    try {
      const userId = 1; // Mock user ID for demo

      // Get user's lending preferences
      const preferences = await storage.getLendingPreferences(userId);

      if (!preferences) {
        return res.json([]);
      }

      // Find potential borrowers based on preferences
      const borrowers = await storage.getPotentialBorrowers(
        userId,
        preferences
      );

      res.json(borrowers);
    } catch (error) {
      console.error("Error fetching borrowers:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/loan-offers/make", async (req, res) => {
    try {
      // In a real app, we would get the user ID from the session
      const userId = 1; // Mock user ID for demo
      const { borrowerId } = req.body;

      if (!borrowerId) {
        return res.status(400).json({ message: "Borrower ID is required" });
      }

      // Get the borrower's loan request
      const loanRequests = await storage.getUserLoanRequests(
        parseInt(borrowerId)
      );
      const activeLoanRequest = loanRequests.find(
        (req) => req.status === "pending"
      );

      if (!activeLoanRequest) {
        return res
          .status(404)
          .json({ message: "No active loan request found for this borrower" });
      }

      // Get user's lending preferences
      const preferences = await storage.getLendingPreferences(userId);

      if (!preferences) {
        return res
          .status(404)
          .json({ message: "No lending preferences found" });
      }

      // Create a loan offer
      const loanOffer = await storage.createLoanOffer({
        lenderId: userId,
        borrowerId: parseInt(borrowerId),
        loanRequestId: activeLoanRequest.id,
        amount: activeLoanRequest.amount,
        duration: activeLoanRequest.duration,
        interestRate: preferences.minInterestRate,
      });

      // Create activity record for loan offer
      await storage.createActivity({
        userId,
        type: "investment",
        description: `Made loan offer of $${loanOffer.amount.toLocaleString()} to borrower`,
        amount: loanOffer.amount,
        date: new Date(),
        status: "pending",
      });

      res.json(loanOffer);
    } catch (error) {
      console.error("Error making loan offer:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  app.post("/api/borrowers/:borrowerId/skip", async (req, res) => {
    try {
      // In a real app, we would get the user ID from the session
      const userId = 1; // Mock user ID for demo
      const borrowerId = parseInt(req.params.borrowerId);

      // In a real app, we would mark this borrower as skipped for this lender
      // For demo purposes, we'll just respond with success

      res.json({ success: true, message: "Borrower skipped successfully" });
    } catch (error) {
      console.error("Error skipping borrower:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
