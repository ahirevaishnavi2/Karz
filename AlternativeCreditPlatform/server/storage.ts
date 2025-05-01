import {
  User,
  InsertUser,
  Transaction,
  InsertTransaction,
  CreditScoreReport,
  InsertCreditScoreReport,
  LoanRequest,
  InsertLoanRequest,
  LoanOffer,
  InsertLoanOffer,
  LendingPreferences,
  InsertLendingPreferences,
  Activity,
  InsertActivity,
} from "@shared/schema";

export interface IStorage {
  // User methods
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  updateUser(id: number, userData: Partial<User>): Promise<User | undefined>;

  // Transaction methods
  createTransaction(transaction: InsertTransaction): Promise<Transaction>;
  getUserTransactions(userId: number): Promise<Transaction[]>;

  // Credit Score methods
  createCreditScoreReport(
    report: InsertCreditScoreReport
  ): Promise<CreditScoreReport>;
  getLatestCreditScoreReport(
    userId: number
  ): Promise<CreditScoreReport | undefined>;

  // Loan methods
  createLoanRequest(request: InsertLoanRequest): Promise<LoanRequest>;
  getUserLoanRequests(userId: number): Promise<LoanRequest[]>;
  updateLoanRequestStatus(
    id: number,
    status: string
  ): Promise<LoanRequest | undefined>;
  getActiveLoans(userId: number): Promise<LoanRequest[]>;

  // Lending methods
  createLendingPreferences(
    preferences: InsertLendingPreferences
  ): Promise<LendingPreferences>;
  getLendingPreferences(
    userId: number
  ): Promise<LendingPreferences | undefined>;
  updateLendingPreferences(
    userId: number,
    data: Partial<InsertLendingPreferences>
  ): Promise<LendingPreferences | undefined>;

  // Offer methods
  createLoanOffer(offer: InsertLoanOffer): Promise<LoanOffer>;
  getLoanOfferByLenderAndRequest(
    lenderId: number,
    requestId: number
  ): Promise<LoanOffer | undefined>;
  updateLoanOfferStatus(
    id: number,
    status: string
  ): Promise<LoanOffer | undefined>;

  // Investment methods
  getActiveInvestments(userId: number): Promise<LoanOffer[]>;

  // Activity methods
  createActivity(activity: InsertActivity): Promise<Activity>;
  getActivities(userId: number): Promise<Activity[]>;

  // Matching methods
  getPotentialLenders(
    userId: number,
    amount: number,
    duration: number
  ): Promise<any[]>;
  getPotentialBorrowers(
    userId: number,
    preferences: LendingPreferences
  ): Promise<any[]>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private transactions: Map<number, Transaction>;
  private creditScoreReports: Map<number, CreditScoreReport>;
  private loanRequests: Map<number, LoanRequest>;
  private lendingPreferences: Map<number, LendingPreferences>;
  private loanOffers: Map<number, LoanOffer>;
  private activities: Map<number, Activity>;

  private userIdCounter: number;
  private transactionIdCounter: number;
  private reportIdCounter: number;
  private requestIdCounter: number;
  private preferencesIdCounter: number;
  private offerIdCounter: number;
  private activityIdCounter: number;

  constructor() {
    this.users = new Map();
    this.transactions = new Map();
    this.creditScoreReports = new Map();
    this.loanRequests = new Map();
    this.lendingPreferences = new Map();
    this.loanOffers = new Map();
    this.activities = new Map();

    this.userIdCounter = 1;
    this.transactionIdCounter = 1;
    this.reportIdCounter = 1;
    this.requestIdCounter = 1;
    this.preferencesIdCounter = 1;
    this.offerIdCounter = 1;
    this.activityIdCounter = 1;

    // Initialize with a demo user
    this.createUser({
      username: "Vedant Ahire",
      password: "V123",
      firstName: "Vedant",
      lastName: "Ahire",
      email: "ahirevedant@gmail.com",
      phone: "8530017432",
      monthlyIncome: 50000,
      employmentStatus: "full-time",
    });

    // Create some sample data for the demo user
    this.createSampleData(1);
  }

  // Helper method to create sample data for a user
  private async createSampleData(userId: number) {
    // Create credit score report
    await this.createCreditScoreReport({
      userId,
      score: 742,
      rating: "good",
      paymentHistory: 95,
      creditUtilization: 75,
      accountAge: 60,
      financialBehavior: 80,
    });

    await this.createCreditScoreReport({
      userId,
      score: 420,
      rating: "bad",
      paymentHistory: 45,
      creditUtilization: 75,
      accountAge: 60,
      financialBehavior: 80,
    });

    // Create some transactions
    await this.createTransaction({
      userId,
      date: new Date("2023-05-01"),
      type: "income",
      amount: 5000,
      description: "Monthly salary",
    });

    await this.createTransaction({
      userId,
      date: new Date("2023-05-05"),
      type: "expense",
      amount: 1200,
      description: "Rent payment",
    });

    // Create a loan request
    await this.createLoanRequest({
      userId,
      amount: 2500,
      duration: 12,
      purpose: "home-improvement",
      description: "Kitchen renovation project",
    });

    // Create lending preferences
    await this.createLendingPreferences({
      userId,
      amount: 10000,
      minInterestRate: 7.5,
      durationPreference: "medium",
      minCreditScore: "700",
    });

    // Create some activities
    await this.createActivity({
      userId,
      type: "loan-payment",
      description: "Monthly payment for loan #1234",
      amount: 250,
      date: new Date("2023-05-01"),
      status: "completed",
    });

    await this.createActivity({
      userId,
      type: "credit-check",
      description: "Alternative credit score analysis",
      amount: null,
      date: new Date("2023-04-28"),
      status: "completed",
    });

    await this.createActivity({
      userId,
      type: "investment",
      description: "New loan investment #5678",
      amount: 1000,
      date: new Date("2023-04-15"),
      status: "active",
    });

    // Create some loan offers
    const loanRequest = await this.createLoanRequest({
      userId: 2, // Another user
      amount: 3500,
      duration: 6,
      purpose: "education",
      description: "Tuition fees for online course",
    });

    await this.createLoanOffer({
      lenderId: userId,
      borrowerId: 2,
      loanRequestId: loanRequest.id,
      amount: 3500,
      duration: 6,
      interestRate: 8.2,
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.userIdCounter++;
    const now = new Date();
    const user: User = {
      ...insertUser,
      id,
      creditScore: 0,
      memberSince: now,
      createdAt: now,
      updatedAt: now,
    };
    this.users.set(id, user);
    return user;
  }

  async updateUser(
    id: number,
    userData: Partial<User>
  ): Promise<User | undefined> {
    const existingUser = this.users.get(id);

    if (!existingUser) {
      return undefined;
    }

    const updatedUser = {
      ...existingUser,
      ...userData,
      updatedAt: new Date(),
    };

    this.users.set(id, updatedUser);
    return updatedUser;
  }

  // Transaction methods
  async createTransaction(
    transaction: InsertTransaction
  ): Promise<Transaction> {
    const id = this.transactionIdCounter++;
    const now = new Date();
    const newTransaction: Transaction = {
      ...transaction,
      id,
      createdAt: now,
    };
    this.transactions.set(id, newTransaction);
    return newTransaction;
  }

  async getUserTransactions(userId: number): Promise<Transaction[]> {
    return Array.from(this.transactions.values()).filter(
      (transaction) => transaction.userId === userId
    );
  }

  // Credit Score methods
  async createCreditScoreReport(
    report: InsertCreditScoreReport
  ): Promise<CreditScoreReport> {
    const id = this.reportIdCounter++;
    const now = new Date();
    const newReport: CreditScoreReport = {
      ...report,
      id,
      createdAt: now,
    };
    this.creditScoreReports.set(id, newReport);
    return newReport;
  }

  async getLatestCreditScoreReport(
    userId: number
  ): Promise<CreditScoreReport | undefined> {
    const userReports = Array.from(this.creditScoreReports.values())
      .filter((report) => report.userId === userId)
      .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());

    return userReports.length > 0 ? userReports[0] : undefined;
  }

  // Loan methods
  async createLoanRequest(request: InsertLoanRequest): Promise<LoanRequest> {
    const id = this.requestIdCounter++;
    const now = new Date();
    const newRequest: LoanRequest = {
      ...request,
      id,
      status: "pending",
      createdAt: now,
      updatedAt: now,
    };
    this.loanRequests.set(id, newRequest);
    return newRequest;
  }

  async getUserLoanRequests(userId: number): Promise<LoanRequest[]> {
    return Array.from(this.loanRequests.values()).filter(
      (request) => request.userId === userId
    );
  }

  async updateLoanRequestStatus(
    id: number,
    status: string
  ): Promise<LoanRequest | undefined> {
    const request = this.loanRequests.get(id);

    if (!request) {
      return undefined;
    }

    const updatedRequest = {
      ...request,
      status,
      updatedAt: new Date(),
    };

    this.loanRequests.set(id, updatedRequest);
    return updatedRequest;
  }

  async getActiveLoans(userId: number): Promise<LoanRequest[]> {
    return Array.from(this.loanRequests.values()).filter(
      (request) => request.userId === userId && request.status === "active"
    );
  }

  // Lending methods
  async createLendingPreferences(
    preferences: InsertLendingPreferences
  ): Promise<LendingPreferences> {
    const id = this.preferencesIdCounter++;
    const now = new Date();
    const newPreferences: LendingPreferences = {
      ...preferences,
      id,
      createdAt: now,
      updatedAt: now,
    };
    this.lendingPreferences.set(id, newPreferences);
    return newPreferences;
  }

  async getLendingPreferences(
    userId: number
  ): Promise<LendingPreferences | undefined> {
    return Array.from(this.lendingPreferences.values()).find(
      (pref) => pref.userId === userId
    );
  }

  async updateLendingPreferences(
    userId: number,
    data: Partial<InsertLendingPreferences>
  ): Promise<LendingPreferences | undefined> {
    const existingPrefs = await this.getLendingPreferences(userId);

    if (!existingPrefs) {
      return undefined;
    }

    const updatedPrefs = {
      ...existingPrefs,
      ...data,
      updatedAt: new Date(),
    };

    this.lendingPreferences.set(existingPrefs.id, updatedPrefs);
    return updatedPrefs;
  }

  // Offer methods
  async createLoanOffer(offer: InsertLoanOffer): Promise<LoanOffer> {
    const id = this.offerIdCounter++;
    const now = new Date();
    const newOffer: LoanOffer = {
      ...offer,
      id,
      status: "pending",
      createdAt: now,
      updatedAt: now,
    };
    this.loanOffers.set(id, newOffer);
    return newOffer;
  }

  async getLoanOfferByLenderAndRequest(
    lenderId: number,
    requestId: number
  ): Promise<LoanOffer | undefined> {
    return Array.from(this.loanOffers.values()).find(
      (offer) =>
        offer.lenderId === lenderId && offer.loanRequestId === requestId
    );
  }

  async updateLoanOfferStatus(
    id: number,
    status: string
  ): Promise<LoanOffer | undefined> {
    const offer = this.loanOffers.get(id);

    if (!offer) {
      return undefined;
    }

    const updatedOffer = {
      ...offer,
      status,
      updatedAt: new Date(),
    };

    this.loanOffers.set(id, updatedOffer);
    return updatedOffer;
  }

  // Investment methods
  async getActiveInvestments(userId: number): Promise<LoanOffer[]> {
    return Array.from(this.loanOffers.values()).filter(
      (offer) =>
        offer.lenderId === userId &&
        (offer.status === "pending" || offer.status === "accepted")
    );
  }

  // Activity methods
  async createActivity(activity: InsertActivity): Promise<Activity> {
    const id = this.activityIdCounter++;
    const now = new Date();
    const newActivity: Activity = {
      ...activity,
      id,
      createdAt: now,
    };
    this.activities.set(id, newActivity);
    return newActivity;
  }

  async getActivities(userId: number): Promise<Activity[]> {
    return Array.from(this.activities.values())
      .filter((activity) => activity.userId === userId)
      .sort((a, b) => b.date.getTime() - a.date.getTime());
  }

  // Matching methods
  async getPotentialLenders(
    userId: number,
    amount: number,
    duration: number
  ): Promise<any[]> {
    return [
      {
        id: "2",
        name: "Maria S.",
        initials: "MS",
        rating: 4.5,
        completionRate: 98,
        amount: 2500,
        duration: 12,
        interestRate: 7.5,
      },
      {
        id: "3",
        name: "Robert J.",
        initials: "RJ",
        rating: 4.0,
        completionRate: 95,
        amount: 2500,
        duration: 12,
        interestRate: 8.2,
      },
    ];
  }

  async getPotentialBorrowers(
    userId: number,
    preferences: LendingPreferences
  ): Promise<any[]> {
    return [
      {
        id: "2",
        name: "Shravni Garde.",
        initials: "AK",
        creditScore: 720,
        purpose: "home-improvement",
        amount: 5000,
        duration: 6,
      },
      {
        id: "3",
        name: "Samruddhi.",
        initials: "SP",
        creditScore: 450,
        purpose: "education",
        amount: 3500,
        duration: 12,
      },
      {
        id: "4",
        name: "Manisha Rani.",
        initials: "JT",
        creditScore: 235,
        purpose: "business",
        amount: 10000,
        duration: 24,
      },
    ];
  }
}

export const storage = new MemStorage();
