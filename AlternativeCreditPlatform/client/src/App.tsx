import { Switch, Route } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import NotFound from "@/pages/not-found";
import Dashboard from "@/pages/Dashboard";
import CreditScore from "@/pages/CreditScore";
import Borrower from "@/pages/Borrower";
import Lender from "@/pages/Lender";
import Profile from "@/pages/Profile";
import MainLayout from "@/layouts/MainLayout";
import { useState } from "react";

function Router() {
  return (
    <Switch>
      <Route path="/" component={Dashboard} />
      <Route path="/credit-score" component={CreditScore} />
      <Route path="/borrower" component={Borrower} />
      <Route path="/lender" component={Lender} />
      <Route path="/profile" component={Profile} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MainLayout>
        <Router />
      </MainLayout>
      <Toaster />
    </QueryClientProvider>
  );
}

export default App;
