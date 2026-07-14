import React, { useState } from "react";
import {
  FiSearch,
  FiTrendingUp,
  FiPlus,
  FiCalendar,
  FiSliders,
  FiChevronDown,
  FiX,
} from "react-icons/fi";
import { FaArrowDown } from "react-icons/fa";
import { MdAccountBalanceWallet, MdAttachMoney } from "react-icons/md";
import { BsCreditCard2Front } from "react-icons/bs";
import { useFinance } from "../context/FinanceContext";
import { Link } from "react-router-dom";

// Pre-defined avatars list for Quick Transfer
const avatars = [
  { id: 12, name: "Kabir" },
  { id: 32, name: "Ben" },
  { id: 45, name: "Mark" },
  { id: 22, name: "Sarah" },
  { id: 33, name: "Jessica" },
  { id: 5, name: "David" },
  { id: 8, name: "Emma" },
];

const cardStyle = { backgroundColor: "var(--card-bg)" };
const innerCardStyle = { backgroundColor: "var(--card-inner)" };

export default function Overview() {
  const {
    user,
    balances,
    transactions,
    cards,
    savingsGoals,
    deposit,
    withdraw,
    transferFunds,
  } = useFinance();

  // Modals state
  const [showDepositModal, setShowDepositModal] = useState(false);
  const [showWithdrawModal, setShowWithdrawModal] = useState(false);
  const [transactionAmount, setTransactionAmount] = useState("");
  const [selectedCardAccount, setSelectedCardAccount] = useState(cards[0]?.name || "Cash Wallet");

  // Quick Transfer state
  const [selectedAvatarIndex, setSelectedAvatarIndex] = useState(2); // Default to Mark
  const [quickTransferAmount, setQuickTransferAmount] = useState("2662.05");

  // Search filter
  const [searchQuery, setSearchQuery] = useState("");

  const handleDepositSubmit = (e) => {
    e.preventDefault();
    const amt = Number(transactionAmount);
    if (amt <= 0) {
      alert("Amount must be positive!");
      return;
    }
    deposit(amt, selectedCardAccount);
    setTransactionAmount("");
    setShowDepositModal(false);
  };

  const handleWithdrawSubmit = (e) => {
    e.preventDefault();
    const amt = Number(transactionAmount);
    if (amt <= 0) {
      alert("Amount must be positive!");
      return;
    }
    const ok = withdraw(amt, selectedCardAccount);
    if (ok) {
      setTransactionAmount("");
      setShowWithdrawModal(false);
    }
  };

  const handleQuickTransferSubmit = () => {
    const amt = Number(quickTransferAmount);
    if (amt <= 0) {
      alert("Amount must be positive!");
      return;
    }
    const recipient = avatars[selectedAvatarIndex]?.name || "Recipient";
    const ok = transferFunds(recipient, amt, cards[0]?.name);
    if (ok) {
      alert(`Successfully sent $${amt.toLocaleString()} to ${recipient}!`);
    }
  };

  // Filter transactions for overview list search
  const filteredTransactions = transactions.filter((t) =>
    t.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="p-6 min-h-screen" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Good Morning {user.name}!</h1>
          <p className="text-gray-400 mt-1 text-sm">
            Smart Task Tracking To Keep Your Workflow Moving Smoothly
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          <div
            className="flex items-center rounded-full px-2 py-2 w-72"
            style={cardStyle}
          >
            <div
              className="w-10 h-8 rounded-full flex items-center justify-center mr-2 text-orange-500"
              style={{ backgroundColor: "#2A2A2A" }}
            >
              <FiSearch />
            </div>
            <input
              type="text"
              placeholder="Search Here.."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-transparent outline-none w-full text-sm placeholder-gray-500 text-white"
            />
          </div>
          <button
            onClick={() => {
              setTransactionAmount("");
              setShowWithdrawModal(true);
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all hover:scale-105 active:scale-95 cursor-pointer"
            style={{ backgroundColor: "#FF7A1A" }}
          >
            <FaArrowDown /> Withdraw
          </button>
          <button
            onClick={() => {
              setTransactionAmount("");
              setShowDepositModal(true);
            }}
            className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-all border border-orange-500 hover:scale-105 active:scale-95 cursor-pointer text-orange-500 bg-transparent"
          >
            <FiPlus /> Deposit
          </button>
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-12 gap-5">
        {/* LEFT COLUMN */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-5">
          {/* Total Revenue */}
          <div className="rounded-2xl p-6" style={cardStyle}>
            <div className="flex items-center gap-2 mb-4">
              <div
                className="p-2 rounded-lg"
                style={{ backgroundColor: "rgba(255,122,26,0.15)" }}
              >
                <MdAttachMoney style={{ color: "#FF7A1A" }} />
              </div>
              <span className="text-gray-200 font-medium">Total Revenue</span>
            </div>
            <h2 className="text-4xl font-bold" style={{ color: "#FF7A1A" }}>
              ${balances.revenue.toLocaleString(undefined, { minimumFractionDigits: 2 })}
            </h2>
            <div className="flex justify-between items-center mt-8 text-xs text-gray-400">
              <span>Compare to last month</span>
              <span className="flex items-center gap-1" style={{ color: "#4ADE80" }}>
                <FiTrendingUp /> +16.85%
              </span>
            </div>
          </div>

          {/* Daily Transactions */}
          <div className="rounded-2xl p-4" style={cardStyle}>
            <h3 className="font-semibold mb-6">Daily Transactions limit</h3>
            <div className="flex justify-end text-xs mb-1">
              {((balances.limitUsed / balances.limitMax) * 100).toFixed(0)}%
            </div>
            <div
              className="w-full h-2 rounded-full overflow-hidden"
              style={innerCardStyle}
            >
              <div
                className="h-full rounded-full transition-all duration-500"
                style={{
                  width: `${(balances.limitUsed / balances.limitMax) * 100}%`,
                  backgroundColor: "#FF7A1A",
                }}
              />
            </div>
            <p className="text-gray-400 text-xs mt-3">
              ${balances.limitUsed} Used From ${balances.limitMax} Limit
            </p>
          </div>
        </div>

        {/* MIDDLE COLUMN */}
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-5">
          {/* All Track In One */}
          <div className="rounded-2xl p-6" style={cardStyle}>
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-lg font-semibold">All Track In One</h3>
              <Link to="/reports" className="text-sm" style={{ color: "#FF7A1A" }}>
                View All
              </Link>
            </div>
            <p className="text-gray-400 text-xs mb-4">
              View your income in a certain period of time
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Current Balance", value: `$${balances.balance.toLocaleString()}`, percent: "+56.85%" },
                { label: "Income", value: `$${balances.income.toLocaleString()}`, percent: "+56.85%" },
                { label: "Savings", value: `$${balances.savings.toLocaleString()}`, percent: "+16.85%" },
                { label: "Expenses", value: `$${balances.expenses.toLocaleString()}`, percent: "+16.85%" },
              ].map((item, i) => (
                <div key={i} className="rounded-xl p-4" style={innerCardStyle}>
                  <div className="flex items-center gap-2 text-xs text-gray-300">
                    <MdAccountBalanceWallet style={{ color: "#FF7A1A" }} />
                    {item.label}
                  </div>
                  <h4
                    className="text-xl font-bold mt-2"
                    style={{ color: "#FF7A1A" }}
                  >
                    {item.value}
                  </h4>
                  <div className="flex justify-between text-xs mt-2">
                    <span className="text-gray-400">last month</span>
                    <span className="flex items-center gap-1" style={{ color: "#4ADE80" }}>
                      <FiTrendingUp /> {item.percent}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN */}
        <div className="col-span-12 lg:col-span-3 flex flex-col gap-5 lg:row-span-2">
          {/* Quick Transfer */}
          <div className="rounded-2xl p-6" style={cardStyle}>
            <h3 className="font-semibold mb-1">Quick Transfer</h3>
            <p className="text-gray-400 text-xs mb-3">
              Instantly move funds to active contacts
            </p>
            {/* Avatar row with active ring based on index */}
            <div className="flex items-center gap-2 mb-4 flex-wrap">
              {avatars.map((av, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedAvatarIndex(i)}
                  className="relative focus:outline-none transition-transform hover:scale-105 active:scale-95 cursor-pointer"
                  title={av.name}
                >
                  <img
                    src={`https://i.pravatar.cc/40?img=${av.id}`}
                    className="w-9 h-9 rounded-full object-cover"
                    style={{
                      border: selectedAvatarIndex === i ? "2px solid #FF7A1A" : "2px solid transparent",
                      padding: selectedAvatarIndex === i ? "1px" : "0",
                      boxSizing: "border-box",
                    }}
                    alt={av.name}
                  />
                </button>
              ))}
            </div>
            <p className="text-xs text-gray-400">
              Balance :{" "}
              <span className="text-white font-semibold">${balances.balance.toLocaleString()}</span>
            </p>
            <div className="flex justify-between items-center mt-3">
              <input
                type="text"
                value={quickTransferAmount}
                onChange={(e) => setQuickTransferAmount(e.target.value)}
                className="text-2xl font-bold bg-transparent outline-none w-28 text-orange-500"
              />
              <button
                onClick={handleQuickTransferSubmit}
                className="px-5 py-2 rounded-lg font-medium text-sm text-white hover:opacity-90 active:scale-95 transition-all cursor-pointer"
                style={{ backgroundColor: "#FF7A1A" }}
              >
                Send
              </button>
            </div>
          </div>

          {/* Your Cards */}
          <div className="rounded-2xl p-6" style={cardStyle}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Your Cards</h3>
              <Link to="/card" className="text-sm" style={{ color: "#FF7A1A" }}>
                View All
              </Link>
            </div>
            {cards.length > 0 ? (
              <div
                className="rounded-2xl p-5 text-white relative overflow-hidden"
                style={{
                  background: cards[0].color,
                  minHeight: "150px",
                }}
              >
                {cards[0].isLocked && (
                  <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex flex-col items-center justify-center gap-1 z-10">
                    <span className="text-[10px] uppercase font-bold text-red-300">Frozen</span>
                  </div>
                )}
                <div className="flex justify-between items-center">
                  <div className="flex items-center gap-2 text-sm">
                    <BsCreditCard2Front size={18} />
                    <span>{cards[0].name}</span>
                  </div>
                  <span className="font-bold italic text-xl">{cards[0].type}</span>
                </div>
                <div className="flex gap-3 mt-12 text-base tracking-widest font-medium">
                  {cards[0].number.slice(0, 4)} **** **** {cards[0].number.slice(-4)}
                </div>
              </div>
            ) : (
              <div className="text-xs text-gray-500 text-center py-6">No credit cards available.</div>
            )}
          </div>

          {/* Your Expenses Progress */}
          <div className="rounded-2xl p-6" style={cardStyle}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Your Savings Goals</h3>
              <Link to="/savings" className="text-sm" style={{ color: "#FF7A1A" }}>
                View All
              </Link>
            </div>
            <div className="space-y-3">
              {savingsGoals.slice(0, 4).map((goal, i) => {
                const percent = goal.target > 0 ? (goal.saved / goal.target) * 100 : 0;
                return (
                  <div key={i}>
                    <div className="flex justify-between text-xs">
                      <span>{goal.name}</span>
                      <span>{percent.toFixed(0)}%</span>
                    </div>
                    <div
                      className="w-full h-2 rounded-full overflow-hidden mt-2"
                      style={innerCardStyle}
                    >
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${Math.min(100, percent)}%`,
                          backgroundColor: goal.color,
                        }}
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RECENT ACTIVITY */}
        <div className="col-span-12 lg:col-span-9">
          <div className="rounded-2xl p-6" style={cardStyle}>
            <div className="flex flex-wrap justify-between items-center mb-5 gap-3">
              <div>
                <h3 className="font-semibold text-lg">Recent Activity</h3>
                <p className="text-gray-400 text-xs">
                  View recent account actions and transaction history
                </p>
              </div>
              <div className="flex items-center gap-3">
                <Link
                  to="/transactions"
                  className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold text-white bg-orange-500"
                >
                  Manage Transactions
                </Link>
              </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr
                    className="text-gray-400 text-xs"
                    style={{ borderBottom: "1px solid #3a3a3a" }}
                  >
                    <th className="py-3 px-2 font-normal w-[20%]">Name</th>
                    <th className="py-3 px-2 font-normal w-[25%]">Date & Time</th>
                    <th className="py-3 px-2 font-normal w-[20%]">Invoice ID</th>
                    <th className="py-3 px-2 font-normal w-[15%]">Fee</th>
                    <th className="py-3 px-2 font-normal w-[20%]">Balance Change</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredTransactions.slice(0, 4).map((r, i) => (
                    <tr
                      key={i}
                      className="text-sm"
                      style={{ borderBottom: "1px solid #333" }}
                    >
                      <td className="py-4 px-2 align-middle">{r.name}</td>
                      <td className="py-4 px-2 align-middle">
                        <div>{r.date}</div>
                        <div className="text-gray-500 text-xs mt-1">
                          {r.time}
                        </div>
                      </td>
                      <td className="py-4 px-2 align-middle font-mono">{r.id}</td>
                      <td className="py-4 px-2 align-middle">$0.00</td>
                      <td
                        className="py-4 px-2 align-middle font-semibold"
                        style={{ color: r.isPositive ? "#FFFFFF" : "#EF4444" }}
                      >
                        {r.amount}
                      </td>
                    </tr>
                  ))}
                  {filteredTransactions.length === 0 && (
                    <tr>
                      <td colSpan={5} className="py-8 text-center text-gray-500">
                        No transactions found.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>

      {/* Deposit Overlay Modal */}
      {showDepositModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl p-6 relative bg-[#2A2A2A]">
            <button
              onClick={() => setShowDepositModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <FiX size={20} />
            </button>
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <FiPlus className="text-orange-500" /> Deposit Funds
            </h3>
            <form onSubmit={handleDepositSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1 font-medium font-sans">Deposit Amount ($)</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={transactionAmount}
                  onChange={(e) => setTransactionAmount(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-gray-900 border border-gray-700 outline-none text-white focus:border-orange-500/50"
                  placeholder="e.g. 500"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1 font-medium font-sans">Select Destination Account</label>
                <select
                  value={selectedCardAccount}
                  onChange={(e) => setSelectedCardAccount(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-gray-900 border border-gray-700 outline-none text-white focus:border-orange-500/50"
                >
                  <option value="Cash Wallet">Cash Wallet</option>
                  {cards.map(c => (
                    <option key={c.id} value={c.name}>{c.name}</option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl font-bold text-xs text-white hover:opacity-90 active:scale-95 transition-all"
                  style={{ backgroundColor: "#FF7A1A" }}
                >
                  Confirm Deposit
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Withdraw Overlay Modal */}
      {showWithdrawModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl p-6 relative bg-[#2A2A2A]">
            <button
              onClick={() => setShowWithdrawModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <FiX size={20} />
            </button>
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <FaArrowDown className="text-orange-500" /> Withdraw Funds
            </h3>
            <form onSubmit={handleWithdrawSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1 font-medium font-sans">Withdrawal Amount ($)</label>
                <input
                  type="number"
                  min="1"
                  required
                  value={transactionAmount}
                  onChange={(e) => setTransactionAmount(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-gray-900 border border-gray-700 outline-none text-white focus:border-orange-500/50"
                  placeholder="e.g. 200"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1 font-medium font-sans">Select Source Account</label>
                <select
                  value={selectedCardAccount}
                  onChange={(e) => setSelectedCardAccount(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-gray-900 border border-gray-700 outline-none text-white focus:border-orange-500/50"
                >
                  <option value="Cash Wallet">Cash Wallet</option>
                  {cards.map(c => (
                    <option key={c.id} value={c.name} disabled={c.isLocked}>{c.name} {c.isLocked ? "(Locked)" : ""}</option>
                  ))}
                </select>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl font-bold text-xs text-white hover:opacity-90 active:scale-95 transition-all"
                  style={{ backgroundColor: "#FF7A1A" }}
                >
                  Confirm Withdrawal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}