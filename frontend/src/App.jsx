import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Overview from "./pages/Overview";
import Transactions from "./pages/Transactions";
import Card from "./pages/Card";
import Investment from "./pages/Investment";
import Savings from "./pages/Savings";
import Activity from "./pages/Activity";
import Reports from "./pages/Reports";
import Settings from "./pages/Settings";
import { FinanceProvider } from "./context/FinanceContext";

export default function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <FinanceProvider>
      <div className="flex min-h-screen" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
        <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
        <div className="flex-1 flex flex-col">
          <Navbar />
          <div className="flex-1 overflow-auto">
            <Routes>
              <Route path="/" element={<Overview />} />
              <Route path="/card" element={<Card />} />
              <Route path="/investment" element={<Investment />} />
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/savings" element={<Savings />} />
              <Route path="/activity" element={<Activity />} />
              <Route path="/reports" element={<Reports />} />
              <Route path="/settings" element={<Settings />} />
            </Routes>
          </div>
        </div>
      </div>
    </FinanceProvider>
  );
}