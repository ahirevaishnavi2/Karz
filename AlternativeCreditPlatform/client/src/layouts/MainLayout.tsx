import React, { useState } from "react";
import { Link, useLocation } from "wouter";
import { Button } from "@/components/ui/button";
import {
  RiDashboardLine,
  RiShieldCheckLine,
  RiHandCoinLine,
  RiMoneyDollarCircleLine,
  RiHistoryLine,
  RiUserLine,
  RiSettingsLine,
  RiLogoutBoxLine,
  RiMenuLine,
  RiNotification3Line,
  RiBankLine,
} from "react-icons/ri";
import CreditScoreModal from "@/components/modals/CreditScoreModal";
import BorrowerModal from "@/components/modals/BorrowerModal";
import LenderModal from "@/components/modals/LenderModal";
import ProfileModal from "@/components/modals/ProfileModal";
import CreditScoreReportModal from "@/components/modals/CreditScoreReportModal";

type MainLayoutProps = {
  children: React.ReactNode;
};

const MainLayout: React.FC<MainLayoutProps> = ({ children }) => {
  const [location] = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showCreditScoreModal, setShowCreditScoreModal] = useState(false);
  const [showBorrowerModal, setShowBorrowerModal] = useState(false);
  const [showLenderModal, setShowLenderModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [showCreditScoreReportModal, setShowCreditScoreReportModal] =
    useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!mobileMenuOpen);
  };

  const getPageTitle = () => {
    switch (location) {
      case "/":
        return "Dashboard";
      case "/credit-score":
        return "Credit Score";
      case "/borrower":
        return "Borrower";
      case "/lender":
        return "Lender";
      case "/profile":
        return "Profile";
      default:
        return "Dashboard";
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Sidebar Navigation */}
      <aside className="w-full md:w-64 bg-gray-900 text-white flex-shrink-0 md:flex flex-col">
        <div className="p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <RiBankLine className="text-primary-500 text-2xl" />
            <span className="font-semibold text-lg">CreditAlternate</span>
          </div>
          <Button className="md:hidden text-white" onClick={toggleMobileMenu}>
            <RiMenuLine className="text-xl" />
          </Button>
        </div>

        <nav
          className={`flex-1 py-4 ${
            mobileMenuOpen ? "block" : "hidden"
          } md:block`}
        >
          <div className="px-4 mb-3 text-gray-400 uppercase text-xs font-semibold">
            Main Menu
          </div>
          <Link href="/">
            <a
              className={`flex items-center px-4 py-3 ${
                location === "/"
                  ? "text-white bg-gray-800"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <RiDashboardLine className="mr-3 text-lg" />
              <span>Dashboard</span>
            </a>
          </Link>
          <Link href="/credit-score">
            <a
              className={`flex items-center px-4 py-3 ${
                location === "/credit-score"
                  ? "text-white bg-gray-800"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <RiShieldCheckLine className="mr-3 text-lg" />
              <span>Credit Score</span>
            </a>
          </Link>
          <Link href="/borrower">
            <a
              className={`flex items-center px-4 py-3 ${
                location === "/borrower"
                  ? "text-white bg-gray-800"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <RiHandCoinLine className="mr-3 text-lg" />
              <span>Borrowing</span>
            </a>
          </Link>
          <Link href="/lender">
            <a
              className={`flex items-center px-4 py-3 ${
                location === "/lender"
                  ? "text-white bg-gray-800"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <RiMoneyDollarCircleLine className="mr-3 text-lg" />
              <span>Lending</span>
            </a>
          </Link>
          <a
            href="#"
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            <RiHistoryLine className="mr-3 text-lg" />
            <span>Transactions</span>
          </a>

          <div className="px-4 mt-6 mb-3 text-gray-400 uppercase text-xs font-semibold">
            Account
          </div>
          <Link href="/profile">
            <a
              className={`flex items-center px-4 py-3 ${
                location === "/profile"
                  ? "text-white bg-gray-800"
                  : "text-gray-300 hover:bg-gray-800 hover:text-white"
              }`}
            >
              <RiUserLine className="mr-3 text-lg" />
              <span>Profile</span>
            </a>
          </Link>
          <a
            href="#"
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            <RiSettingsLine className="mr-3 text-lg" />
            <span>Settings</span>
          </a>
          <a
            href="#"
            className="flex items-center px-4 py-3 text-gray-300 hover:bg-gray-800 hover:text-white"
          >
            <RiLogoutBoxLine className="mr-3 text-lg" />
            <span>Logout</span>
          </a>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-gray-50">
        {/* Header */}
        <header className="bg-white shadow-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
            <h1 className="text-xl font-semibold text-gray-900">
              {getPageTitle()}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <Button className="flex items-center text-gray-500 hover:text-gray-700 focus:outline-none">
                  <RiNotification3Line className="text-xl" />
                  <span className="absolute top-0 right-0 h-2 w-2 rounded-full bg-red-500"></span>
                </Button>
              </div>
              <div
                className="flex items-center"
                onClick={() => setShowProfileModal(true)}
              >
                <div className="h-9 w-9 rounded-full bg-primary-500 flex items-center justify-center text-white font-medium cursor-pointer">
                  JS
                </div>
                <div className="ml-2 hidden sm:block">
                  <div className="text-sm font-medium">John Smith</div>
                  <div className="text-xs text-gray-500">john@example.com</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="py-6 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {children}
        </div>
      </main>

      {/* Modals */}
      <CreditScoreModal
        isOpen={showCreditScoreModal}
        onClose={() => setShowCreditScoreModal(false)}
        onShowReport={() => {
          setShowCreditScoreModal(false);
          setShowCreditScoreReportModal(true);
        }}
      />

      <BorrowerModal
        isOpen={showBorrowerModal}
        onClose={() => setShowBorrowerModal(false)}
      />

      <LenderModal
        isOpen={showLenderModal}
        onClose={() => setShowLenderModal(false)}
      />

      <ProfileModal
        isOpen={showProfileModal}
        onClose={() => setShowProfileModal(false)}
      />

      <CreditScoreReportModal
        isOpen={showCreditScoreReportModal}
        onClose={() => setShowCreditScoreReportModal(false)}
      />
    </div>
  );
};

export default MainLayout;
