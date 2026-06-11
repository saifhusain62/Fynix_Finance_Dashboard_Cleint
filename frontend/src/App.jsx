import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Overview from "./pages/Overview";
import Transactions from "./pages/Transactions";

export default function App() {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <div className="flex min-h-screen" style={{ backgroundColor: "#1C1C1C", color: "white" }}>
      <Sidebar collapsed={collapsed} setCollapsed={setCollapsed} />
      <div className="flex-1 flex flex-col">
        <Navbar />
        <div className="flex-1 overflow-auto">
          <Routes>
            <Route path="/" element={<Overview />} />
            <Route path="/card" element={<div className="p-8 text-2xl">Coming Soon</div>} />
            <Route path="/investment" element={<div className="p-8 text-2xl">Coming Soon</div>} />
            <Route path="/transactions" element={<Transactions />} />
            <Route path="/savings" element={<div className="p-8 text-2xl">Coming Soon</div>} />
            <Route path="/activity" element={<div className="p-8 text-2xl">Coming Soon</div>} />
            <Route path="/reports" element={<div className="p-8 text-2xl">Coming Soon</div>} />
            <Route path="/settings" element={<div className="p-8 text-2xl">Coming Soon</div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}