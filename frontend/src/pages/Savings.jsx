import React, { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import { FiPlus, FiChevronRight, FiTrendingUp, FiSettings, FiDollarSign, FiX, FiCheckCircle } from "react-icons/fi";

const cardStyle = { backgroundColor: "var(--card-bg)" };
const innerCardStyle = { backgroundColor: "var(--card-inner)" };

export default function Savings() {
  const { savingsGoals, balances, addSavingsGoal, manageGoalFunds } = useFinance();
  const [showAddModal, setShowAddModal] = useState(false);
  const [showManageModal, setShowManageModal] = useState(false);
  const [activeGoalId, setActiveGoalId] = useState("");
  
  // Create goal form state
  const [newGoalName, setNewGoalName] = useState("");
  const [newGoalTarget, setNewGoalTarget] = useState("");
  const [newGoalColor, setNewGoalColor] = useState("#FF7A1A");

  // Manage goal funds form state
  const [fundAmount, setFundAmount] = useState("");
  const [manageAction, setManageAction] = useState("FUND"); // "FUND" or "WITHDRAW"

  const activeGoal = savingsGoals.find(g => g.id === activeGoalId);

  const handleAddGoalSubmit = (e) => {
    e.preventDefault();
    if (!newGoalName || !newGoalTarget) {
      alert("Please fill in Goal Name and Target!");
      return;
    }
    addSavingsGoal(newGoalName, Number(newGoalTarget), newGoalColor);
    setNewGoalName("");
    setNewGoalTarget("");
    setShowAddModal(false);
  };

  const handleManageFundsSubmit = (e) => {
    e.preventDefault();
    const amt = Number(fundAmount);
    if (amt <= 0) {
      alert("Amount must be positive!");
      return;
    }
    manageGoalFunds(activeGoalId, amt, manageAction === "FUND");
    setFundAmount("");
    setShowManageModal(false);
  };

  const totalTarget = savingsGoals.reduce((sum, g) => sum + g.target, 0);
  const totalSaved = savingsGoals.reduce((sum, g) => sum + g.saved, 0);
  const overallProgress = totalTarget > 0 ? (totalSaved / totalTarget) * 100 : 0;

  return (
    <div className="p-6 min-h-screen" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Savings Goals</h1>
          <p className="text-gray-400 mt-1 text-sm">
            Track goals, allocate funds, and build up targets.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-transform hover:scale-105"
          style={{ backgroundColor: "#FF7A1A" }}
        >
          <FiPlus size={16} /> Add New Goal
        </button>
      </div>

      <div className="grid grid-cols-12 gap-5">
        {/* Left Column: Overall Progress & Goals Portfolio */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-5">
          {/* Summary Banner */}
          <div className="rounded-2xl p-6" style={cardStyle}>
            <h3 className="font-semibold text-lg mb-2">Overall Savings Progress</h3>
            <p className="text-gray-400 text-xs mb-4">Total cash accumulated across all targets.</p>
            
            <div className="flex justify-between text-xs font-semibold text-gray-300 mb-2">
              <span>Saved: ${totalSaved.toLocaleString()}</span>
              <span>Target: ${totalTarget.toLocaleString()}</span>
            </div>

            <div className="w-full h-3 rounded-full overflow-hidden bg-gray-800">
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{ width: `${Math.min(100, overallProgress)}%`, backgroundColor: "#FF7A1A" }}
              />
            </div>
            <p className="text-right text-[10px] text-gray-400 mt-1.5">{overallProgress.toFixed(1)}% of total target achieved</p>
          </div>

          {/* Goals List Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {savingsGoals.map((goal) => {
              const progress = goal.target > 0 ? (goal.saved / goal.target) * 100 : 0;
              return (
                <div key={goal.id} className="rounded-2xl p-5 flex flex-col justify-between" style={cardStyle}>
                  <div>
                    <div className="flex justify-between items-start mb-3">
                      <h4 className="font-bold text-white text-base">{goal.name}</h4>
                      <span
                        className="px-2 py-0.5 rounded text-[10px] font-bold text-white"
                        style={{ backgroundColor: goal.color }}
                      >
                        {progress.toFixed(0)}%
                      </span>
                    </div>

                    <div className="w-full h-2 rounded-full overflow-hidden bg-gray-800 mt-2 mb-4">
                      <div
                        className="h-full rounded-full transition-all duration-300"
                        style={{ width: `${Math.min(100, progress)}%`, backgroundColor: goal.color }}
                      />
                    </div>
                  </div>

                  <div className="flex justify-between items-end border-t border-gray-800/80 pt-4">
                    <div className="text-xs">
                      <div className="text-gray-400 text-[10px]">SAVED</div>
                      <div className="font-bold text-white mt-0.5">${goal.saved.toLocaleString()}</div>
                      <div className="text-gray-500 text-[9px] mt-0.5">Target: ${goal.target.toLocaleString()}</div>
                    </div>

                    <button
                      onClick={() => {
                        setActiveGoalId(goal.id);
                        setManageAction("FUND");
                        setShowManageModal(true);
                      }}
                      className="px-4 py-1.5 rounded-full text-xs font-semibold hover:opacity-90 active:scale-95 transition-all text-white"
                      style={{ backgroundColor: "#FF7A1A" }}
                    >
                      Manage Funds
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Right Column: Savings Tips & Account Wallet info */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-5">
          {/* General Balance Source */}
          <div className="rounded-2xl p-6" style={cardStyle}>
            <h3 className="font-semibold text-base mb-1">Cash Funding Source</h3>
            <p className="text-gray-400 text-xs mb-4">Money transferred to goals is deducted from your Cash Wallet.</p>
            <div className="p-4 rounded-xl flex items-center justify-between" style={innerCardStyle}>
              <div>
                <span className="text-[10px] text-gray-400 font-bold uppercase">Wallet Balance</span>
                <h4 className="text-xl font-black mt-1" style={{ color: "#FF7A1A" }}>
                  ${balances.balance.toLocaleString()}
                </h4>
              </div>
            </div>
          </div>

          {/* Quick tips list */}
          <div className="rounded-2xl p-6" style={cardStyle}>
            <h3 className="font-semibold text-base mb-3">Savings Strategy</h3>
            <ul className="space-y-3.5 text-xs text-gray-400">
              <li className="flex items-start gap-2">
                <span className="text-orange-500 font-bold">•</span>
                <span>Set a direct monthly transfer target to automate savings.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 font-bold">•</span>
                <span>Keep spending limits active on credit cards to secure residual funds.</span>
              </li>
              <li className="flex items-start gap-2">
                <span className="text-orange-500 font-bold">•</span>
                <span>Regularly monitor stock dividends in your investment holdings.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Add savings Goal Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl p-6 relative" style={cardStyle}>
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <FiX size={20} />
            </button>
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <FiPlus className="text-orange-500" /> Create Savings Goal
            </h3>
            <form onSubmit={handleAddGoalSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1 font-medium">Goal Name</label>
                <input
                  type="text"
                  placeholder="e.g. Dream House"
                  value={newGoalName}
                  onChange={(e) => setNewGoalName(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl text-xs bg-gray-900 border border-gray-700 outline-none text-white focus:border-orange-500/50"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1 font-medium">Target Amount ($)</label>
                <input
                  type="number"
                  value={newGoalTarget}
                  onChange={(e) => setNewGoalTarget(e.target.value)}
                  min="100"
                  required
                  className="w-full px-3 py-2 rounded-xl text-xs bg-gray-900 border border-gray-700 outline-none text-white focus:border-orange-500/50"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1 font-medium">Goal Badge Color</label>
                <div className="flex gap-2.5 mt-1.5 font-sans">
                  {["#FF7A1A", "#3B82F6", "#10B981", "#8B5CF6", "#EC4899"].map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setNewGoalColor(color)}
                      className={`w-6 h-6 rounded-full border-2 transition-all ${
                        newGoalColor === color ? "border-white scale-110" : "border-transparent"
                      }`}
                      style={{ backgroundColor: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl font-bold text-xs text-white hover:opacity-90 active:scale-95 transition-all"
                  style={{ backgroundColor: "#FF7A1A" }}
                >
                  Create Goal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Manage Goal Funds Modal */}
      {showManageModal && activeGoal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl p-6 relative" style={cardStyle}>
            <button
              onClick={() => setShowManageModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <FiX size={20} />
            </button>
            <h3 className="font-bold text-lg mb-1 flex items-center gap-2">
              Manage "{activeGoal.name}"
            </h3>
            <p className="text-gray-400 text-xs mb-4">Allocate or retrieve savings goal funds.</p>

            {/* Select Action Tab */}
            <div className="grid grid-cols-2 rounded-xl p-1 mb-4" style={{ backgroundColor: "#222222" }}>
              <button
                type="button"
                onClick={() => setManageAction("FUND")}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  manageAction === "FUND" ? "bg-orange-500 text-white" : "text-gray-400"
                }`}
              >
                Add Savings
              </button>
              <button
                type="button"
                onClick={() => setManageAction("WITHDRAW")}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  manageAction === "WITHDRAW" ? "bg-orange-500 text-white" : "text-gray-400"
                }`}
              >
                Withdraw Savings
              </button>
            </div>

            <form onSubmit={handleManageFundsSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1 font-medium">Transaction Amount ($)</label>
                <input
                  type="number"
                  value={fundAmount}
                  onChange={(e) => setFundAmount(e.target.value)}
                  min="1"
                  required
                  className="w-full px-3 py-2 rounded-xl text-xs bg-gray-900 border border-gray-700 outline-none text-white focus:border-orange-500/50"
                />
              </div>

              {/* Info panel */}
              <div className="p-3.5 rounded-xl text-xs space-y-2 font-sans" style={innerCardStyle}>
                <div className="flex justify-between">
                  <span className="text-gray-400">Current Saved Target</span>
                  <span className="font-semibold text-white">${activeGoal.saved.toLocaleString()} / ${activeGoal.target.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Source Cash Balance</span>
                  <span className="font-bold text-orange-500">${balances.balance.toLocaleString()}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl font-bold text-xs text-white hover:opacity-90 active:scale-95 transition-all"
                  style={{ backgroundColor: "#FF7A1A" }}
                >
                  Submit Allocation
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
