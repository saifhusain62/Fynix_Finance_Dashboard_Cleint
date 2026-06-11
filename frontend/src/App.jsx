import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Sidebar from "./components/Sidebar";
import Navbar from "./components/Navbar";
import Overview from "./pages/Overview";

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
            <Route path="/card" element={<div className="p-8 text-2xl">Card Page</div>} />
            <Route path="/investment" element={<div className="p-8 text-2xl">Investment Page</div>} />
            <Route path="/transactions" element={<div className="p-8 text-2xl">Transactions Page</div>} />
            <Route path="/savings" element={<div className="p-8 text-2xl">Savings Page</div>} />
            <Route path="/activity" element={<div className="p-8 text-2xl">Activity Page</div>} />
            <Route path="/reports" element={<div className="p-8 text-2xl">Reports Page</div>} />
            <Route path="/settings" element={<div className="p-8 text-2xl">Settings Page</div>} />
          </Routes>
        </div>
      </div>
    </div>
  );
}