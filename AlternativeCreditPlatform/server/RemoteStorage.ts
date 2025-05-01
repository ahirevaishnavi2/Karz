// RemoteStorage.ts
import {
  User,
  InsertUser,
  Transaction,
  InsertTransaction,
  CreditScoreReport,
  InsertCreditScoreReport,
  LendingPreferences,
  InsertLendingPreferences,
} from "@shared/schema";

const API_BASE = "http://localhost:8080";

export class RemoteStorage {
  async createUser(data: InsertUser): Promise<User> {
    const res = await fetch(`${API_BASE}/users/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to register user");
    return res.json();
  }

  async loginUser(data: { username: string; password: string }): Promise<User> {
    const res = await fetch(`${API_BASE}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Login failed");
    return res.json();
  }

  async getAllUsers(): Promise<User[]> {
    const res = await fetch(`${API_BASE}/users/all`);
    if (!res.ok) throw new Error("Failed to fetch users");
    return res.json();
  }

  async createCreditScoreReport(
    data: InsertCreditScoreReport
  ): Promise<CreditScoreReport> {
    const res = await fetch(`${API_BASE}/scores/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to submit score");
    return res.json();
  }

  async getCreditScoreReport(userId: string): Promise<CreditScoreReport> {
    const res = await fetch(`${API_BASE}/scores/user/${userId}`);
    if (!res.ok) throw new Error("Failed to get score");
    return res.json();
  }

  async createLendingPreferences(
    data: InsertLendingPreferences
  ): Promise<LendingPreferences> {
    const res = await fetch(`${API_BASE}/roles/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to submit preferences");
    return res.json();
  }

  async getLendingPreferences(userId: string): Promise<LendingPreferences> {
    const res = await fetch(`${API_BASE}/roles/user/${userId}`);
    if (!res.ok) throw new Error("Failed to get preferences");
    return res.json();
  }

  async uploadLoanRequest(data: any): Promise<any> {
    const res = await fetch(`${API_BASE}/uploads/submit`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });
    if (!res.ok) throw new Error("Failed to upload request");
    return res.json();
  }

  async getLoanRequests(userId: string): Promise<any[]> {
    const res = await fetch(`${API_BASE}/uploads/user/${userId}`);
    if (!res.ok) throw new Error("Failed to get loan requests");
    return res.json();
  }
}
