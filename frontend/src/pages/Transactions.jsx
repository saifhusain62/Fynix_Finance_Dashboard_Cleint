import React, { useState } from "react";
import {
  FiSearch,
  FiTrendingUp,
  FiPlus,
  FiCalendar,
  FiChevronDown,
  FiDownload,
  FiCreditCard,
  FiArrowUpRight,
  FiArrowDownLeft,
} from "react-icons/fi";
import { FaArrowDown } from "react-icons/fa";
import { MdAccountBalanceWallet, MdMoreVert } from "react-icons/md";
import { BsCreditCard2Front } from "react-icons/bs";

const cardStyle = { backgroundColor: "#2A2A2A" };
const innerCardStyle = { backgroundColor: "#454545" };

const initialTransactions = [
  {
    name: "Bonus Payment",
    category: "income",
    account: "Platinum Visa Card",
    id: "456113216865",
    date: "02 Jan 2026",
    time: "at 08.25 am",
    amount: "+$650.00",
    isPositive: true,
    status: "Success",
  },
  {
    name: "Stock Dividends",
    category: "Investments",
    account: "Unlimited Mastercard",
    id: "456113216651",
    date: "05 Jan 2026",
    time: "at 10.35 am",
    amount: "+$350.00",
    isPositive: true,
    status: "Success",
  },
  {
    name: "Freelance Projects",
    category: "income",
    account: "Platinum Visa Card",
    id: "45611321613",
    date: "10 Jan 2026",
    time: "at 08.25 pm",
    amount: "+$1250.00",
    isPositive: true,
    status: "Success",
  },
  {
    name: "Amazon Purchase",
    category: "Expense",
    account: "Visa Card",
    id: "681113216865",
    date: "12 Jan 2026",
    time: "at 10.25 pm",
    amount: "-$65.00",
    isPositive: false,
    status: "Success",
  },
];

// Months list for chart
const months = [
  "JAN", "FEB", "MAR", "APR", "MAY", "JUN", 
  "JUL", "AUG", "SEP", "OCT", "NOV", "DEC"
];

// Graph values matching visual coordinates in image
// Ticks: 100k (Y=20), 80k (Y=70), 50k (Y=120), 40k (Y=170), 20k (Y=220), 0 (Y=270)
const incomePoints = [
  { val: 0, y: 270 },
  { val: 40000, y: 170 },
  { val: 82000, y: 65 },
  { val: 48000, y: 130 },
  { val: 44000, y: 155 },
  { val: 40000, y: 170 },
  { val: 12000, y: 240 },
  { val: 28000, y: 200 },
  { val: 52000, y: 115 },
  { val: 85000, y: 55 },
  { val: 22000, y: 215 },
  { val: 10000, y: 245 },
];

const expensePoints = [
  { val: 0, y: 270 },
  { val: 30000, y: 195 },
  { val: 62000, y: 95 },
  { val: 48000, y: 130 },
  { val: 24000, y: 210 },
  { val: 28000, y: 200 },
  { val: 10000, y: 245 },
  { val: 18000, y: 225 },
  { val: 45000, y: 145 },
  { val: 76000, y: 70 }, // Peak close to Oct
  { val: 25000, y: 205 },
  { val: 8000, y: 250 },
];

const tooltipData = [
  { val: "$0.00", trend: "+0.0%" },
  { val: "$2,200.00", trend: "+4.1%" },
  { val: "$4,600.00", trend: "+5.3%" },
  { val: "$3,500.00", trend: "+3.8%" },
  { val: "$1,800.00", trend: "+2.1%" },
  { val: "$2,000.00", trend: "+2.8%" },
  { val: "$700.00", trend: "-1.5%" },
  { val: "$1,300.00", trend: "+1.9%" },
  { val: "$3,200.00", trend: "+4.5%" },
  { val: "$5,662.00", trend: "+6.5%" }, // Matches OCT peak in image
  { val: "$1,850.00", trend: "-2.3%" },
  { val: "$600.00", trend: "-0.8%" },
];

export default function Transactions() {
  const [searchQuery, setSearchQuery] = useState("");
  const [globalSearch, setGlobalSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("All");
  const [accountFilter, setAccountFilter] = useState("All");
  const [showCategoryDropdown, setShowCategoryDropdown] = useState(false);
  const [showAccountDropdown, setShowAccountDropdown] = useState(false);

  // Active month hover state for graph (default to index 9 = OCT to match static image)
  const [hoveredIndex, setHoveredIndex] = useState(9);

  // Custom Spline Curve Path Generator
  const getBezierPath = (pts) => {
    if (pts.length === 0) return "";
    const paddingLeft = 50;
    const chartWidth = 530;
    const stepX = chartWidth / (pts.length - 1);

    let d = `M ${paddingLeft} ${pts[0].y}`;
    for (let i = 0; i < pts.length - 1; i++) {
      const x0 = paddingLeft + i * stepX;
      const y0 = pts[i].y;
      const x1 = paddingLeft + (i + 1) * stepX;
      const y1 = pts[i + 1].y;

      const cp1x = x0 + (x1 - x0) / 3;
      const cp1y = y0;
      const cp2x = x0 + (2 * (x1 - x0)) / 3;
      const cp2y = y1;

      d += ` C ${cp1x} ${cp1y}, ${cp2x} ${cp2y}, ${x1} ${y1}`;
    }
    return d;
  };

  const chartWidth = 530;
  const paddingLeft = 50;
  const stepX = chartWidth / 11;

  // Filter transaction lists
  const filteredTransactions = initialTransactions.filter((t) => {
    const matchesSearch =
      t.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.account.toLowerCase().includes(searchQuery.toLowerCase()) ||
      t.id.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCategory =
      categoryFilter === "All" ||
      t.category.toLowerCase() === categoryFilter.toLowerCase();

    const matchesAccount =
      accountFilter === "All" ||
      t.account.toLowerCase() === accountFilter.toLowerCase();

    return matchesSearch && matchesCategory && matchesAccount;
  });

  return (
    <div className="p-6 min-h-screen" style={{ backgroundColor: "#1C1C1C", color: "white" }}>
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Transactions</h1>
          <p className="text-gray-400 mt-1 text-sm">
            View, Track. And Manage All Expenses With Ease.
          </p>
        </div>
        <div className="flex items-center gap-3 flex-wrap">
          {/* Top Search bar */}
          <div
            className="flex items-center rounded-full px-3 py-2 w-72"
            style={cardStyle}
          >
            <div
              className="w-8 h-8 rounded-full flex items-center justify-center mr-2 text-orange-500"
              style={{ backgroundColor: "#2A2A2A" }}
            >
              <FiSearch />
            </div>
            <input
              type="text"
              placeholder="Search Here.."
              value={globalSearch}
              onChange={(e) => setGlobalSearch(e.target.value)}
              className="bg-transparent outline-none w-full text-sm placeholder-gray-500"
            />
          </div>
          {/* Withdraw */}
          <button
            className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-transform hover:scale-105"
            style={{ backgroundColor: "#FF7A1A" }}
          >
            <div className="w-5 h-5 rounded-full border border-white flex items-center justify-center text-xs">
              $
            </div>
            Withdraw
          </button>
          {/* Deposit */}
          <button
            className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-transform hover:scale-105"
            style={{ backgroundColor: "#2A2A2A", border: "1px solid #FF7A1A", color: "#FF7A1A" }}
          >
            <FiPlus size={16} /> Deposit
          </button>
        </div>
      </div>

      {/* Main Grid Section */}
      <div className="grid grid-cols-12 gap-5 mb-5">
        {/* Left Stats & Card: Col-span 7 */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-5">
          {/* Total Balance & Credit Card Container */}
          <div className="rounded-2xl p-6 flex flex-col md:flex-row justify-between items-start md:items-center gap-6" style={cardStyle}>
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-3">
                <div
                  className="p-2 rounded-lg"
                  style={{ backgroundColor: "rgba(255,122,26,0.15)" }}
                >
                  <MdAccountBalanceWallet size={20} style={{ color: "#FF7A1A" }} />
                </div>
                <span className="text-gray-300 font-medium text-sm">Total Balance</span>
              </div>
              <div className="flex items-baseline gap-3">
                <h2 className="text-4xl font-bold" style={{ color: "#FF7A1A" }}>
                  $75,662.05
                </h2>
                <span className="flex items-center gap-1 text-xs font-semibold" style={{ color: "#4ADE80" }}>
                  <FiTrendingUp /> +56.85%
                </span>
              </div>
              <div className="flex flex-wrap gap-3 mt-6">
                <button
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full font-medium text-xs text-white transition-opacity hover:opacity-90"
                  style={{ backgroundColor: "#FF7A1A" }}
                >
                  <FiArrowUpRight size={14} /> Transfer Founds
                </button>
                <button
                  className="flex items-center gap-2 px-4 py-2.5 rounded-full font-medium text-xs transition-colors hover:bg-gray-800"
                  style={{ border: "1px solid #FF7A1A", color: "#FF7A1A" }}
                >
                  <FiPlus size={14} /> Found Request
                </button>
              </div>
            </div>

            {/* Stylized Visa Credit Card */}
            <div
              className="rounded-2xl p-5 text-white flex flex-col justify-between relative overflow-hidden shadow-xl"
              style={{
                background: "linear-gradient(135deg, #FF9B4D 0%, #FF7A1A 50%, #E05600 100%)",
                width: "250px",
                height: "145px",
                flexShrink: 0,
              }}
            >
              {/* Card Header */}
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-1.5 text-[11px] font-medium opacity-90">
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className="rotate-90">
                    <path d="M12 2a10 10 0 0 1 10 10" />
                    <path d="M12 6a6 6 0 0 1 6 6" />
                    <path d="M12 10a2 2 0 0 1 2 2" />
                  </svg>
                  <span>Credit Card</span>
                </div>
                <span className="font-extrabold italic text-lg tracking-wider">VISA</span>
              </div>
              {/* Card Number */}
              <div className="text-sm tracking-widest font-semibold mt-4">
                1234xxxxxx565
              </div>
              {/* Card Footer with Chip */}
              <div className="flex justify-between items-end mt-2">
                <div className="text-[10px] opacity-80 font-mono">
                  VALID THRU 12/28
                </div>
                {/* Gold Card Chip */}
                <div
                  className="w-8 h-6 rounded-md relative overflow-hidden border border-amber-600/30"
                  style={{
                    background: "linear-gradient(135deg, #F5D061 0%, #E6B02E 100%)",
                  }}
                >
                  <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 opacity-30">
                    <div className="border-r border-b border-black"></div>
                    <div className="border-r border-b border-black"></div>
                    <div className="border-b border-black"></div>
                    <div className="border-r border-b border-black"></div>
                    <div className="border-r border-b border-black"></div>
                    <div className="border-b border-black"></div>
                    <div className="border-r border-black"></div>
                    <div className="border-r border-black"></div>
                    <div></div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Three Sub-stats Horizontal Row */}
          <div className="grid grid-cols-3 gap-4">
            {/* Expenses */}
            <div className="rounded-2xl p-4" style={cardStyle}>
              <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
                <FiCreditCard size={14} className="text-orange-500" />
                Expenses
              </div>
              <h3 className="text-xl font-bold" style={{ color: "#FF7A1A" }}>
                $5,662.05
              </h3>
              <div className="flex justify-between items-center mt-3 text-[10px] text-gray-500">
                <span>last month</span>
                <span className="flex items-center gap-0.5 text-green-400 font-medium">
                  <FiTrendingUp size={10} /> +16.85%
                </span>
              </div>
            </div>

            {/* Savings */}
            <div className="rounded-2xl p-4" style={cardStyle}>
              <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
                <FiArrowDownLeft size={14} className="text-orange-500" />
                Savings
              </div>
              <h3 className="text-xl font-bold" style={{ color: "#FF7A1A" }}>
                $15,662.05
              </h3>
              <div className="flex justify-between items-center mt-3 text-[10px] text-gray-500">
                <span>last month</span>
                <span className="flex items-center gap-0.5 text-green-400 font-medium">
                  <FiTrendingUp size={10} /> +16.85%
                </span>
              </div>
            </div>

            {/* Income */}
            <div className="rounded-2xl p-4" style={cardStyle}>
              <div className="flex items-center gap-1.5 text-xs text-gray-400 mb-2">
                <FiArrowUpRight size={14} className="text-orange-500" />
                Income
              </div>
              <h3 className="text-xl font-bold" style={{ color: "#FF7A1A" }}>
                $25,662.05
              </h3>
              <div className="flex justify-between items-center mt-3 text-[10px] text-gray-500">
                <span>last month</span>
                <span className="flex items-center gap-0.5 text-green-400 font-medium">
                  <FiTrendingUp size={10} /> +56.85%
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Cash Flow Graph: Col-span 5 */}
        <div className="col-span-12 lg:col-span-5">
          <div className="rounded-2xl p-5 h-full flex flex-col justify-between" style={cardStyle}>
            {/* Cash Flow Title & Legends */}
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold text-lg">Cash Flow</h3>
              <div className="flex items-center gap-3">
                {/* Income Indicator */}
                <div className="flex items-center gap-1.5 border border-gray-700 rounded-full px-2.5 py-1 text-xs">
                  <span className="w-1.5 h-1.5 rounded-full bg-orange-100"></span>
                  <span className="text-gray-300">Income</span>
                </div>
                {/* Expenses Indicator */}
                <div className="flex items-center gap-1.5 border border-orange-500/30 rounded-full px-2.5 py-1 text-xs bg-orange-500/5">
                  <span className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: "#FF7A1A" }}></span>
                  <span style={{ color: "#FF7A1A" }}>Expenses</span>
                </div>
                <button className="text-gray-400 hover:text-white">
                  <MdMoreVert size={20} />
                </button>
              </div>
            </div>

            {/* Spline Chart SVG Area */}
            <div className="relative w-full h-[220px] select-none mt-2">
              <svg width="100%" height="100%" viewBox="0 0 600 290" className="overflow-visible">
                {/* Grid Lines */}
                {[20, 70, 120, 170, 220, 270].map((yVal, index) => (
                  <line
                    key={index}
                    x1="50"
                    y1={yVal}
                    x2="580"
                    y2={yVal}
                    stroke="#333333"
                    strokeWidth="1"
                    strokeDasharray={yVal === 270 ? "none" : "4,4"}
                  />
                ))}

                {/* Y-Axis Labels */}
                <text x="15" y="25" fill="#888888" className="text-xs" textAnchor="start">100k</text>
                <text x="15" y="75" fill="#888888" className="text-xs" textAnchor="start">80k</text>
                <text x="15" y="125" fill="#888888" className="text-xs" textAnchor="start">50k</text>
                <text x="15" y="175" fill="#888888" className="text-xs" textAnchor="start">40k</text>
                <text x="15" y="225" fill="#888888" className="text-xs" textAnchor="start">20k</text>
                <text x="25" y="275" fill="#888888" className="text-xs" textAnchor="start">0</text>

                {/* Spline Line Paths */}
                {/* 1. Income Line (Beige/Light-yellow) */}
                <path
                  d={getBezierPath(incomePoints)}
                  fill="none"
                  stroke="#FFE5B4"
                  strokeWidth="2.5"
                  className="transition-all duration-300"
                />

                {/* 2. Expenses Line (Orange) */}
                <path
                  d={getBezierPath(expensePoints)}
                  fill="none"
                  stroke="#FF7A1A"
                  strokeWidth="2.5"
                  className="transition-all duration-300"
                />

                {/* Dynamic/Static Hover Highlight Dot */}
                {hoveredIndex !== null && (
                  <>
                    {/* Vertical Highlight Bar */}
                    <line
                      x1={paddingLeft + hoveredIndex * stepX}
                      y1="20"
                      x2={paddingLeft + hoveredIndex * stepX}
                      y2="270"
                      stroke="rgba(255, 122, 26, 0.15)"
                      strokeWidth="2"
                    />
                    {/* Income Point Dot */}
                    <circle
                      cx={paddingLeft + hoveredIndex * stepX}
                      cy={incomePoints[hoveredIndex].y}
                      r="5"
                      fill="#1C1C1C"
                      stroke="#FFE5B4"
                      strokeWidth="3"
                    />
                    {/* Expenses Point Dot */}
                    <circle
                      cx={paddingLeft + hoveredIndex * stepX}
                      cy={expensePoints[hoveredIndex].y}
                      r="5"
                      fill="#1C1C1C"
                      stroke="#FF7A1A"
                      strokeWidth="3"
                    />
                  </>
                )}

                {/* Invisible hover regions for interactive tooltip */}
                {months.map((m, idx) => {
                  const xPos = paddingLeft + idx * stepX;
                  return (
                    <rect
                      key={idx}
                      x={xPos - stepX / 2}
                      y="10"
                      width={stepX}
                      height="270"
                      fill="transparent"
                      className="cursor-pointer"
                      onMouseEnter={() => setHoveredIndex(idx)}
                    />
                  );
                })}

                {/* X-Axis labels */}
                {months.map((m, idx) => {
                  const xPos = paddingLeft + idx * stepX;
                  return (
                    <text
                      key={idx}
                      x={xPos}
                      y="290"
                      fill="#888888"
                      className="text-[10px]"
                      textAnchor="middle"
                    >
                      {m}
                    </text>
                  );
                })}
              </svg>

              {/* Spline Chart Custom Hover Tooltip (Positioned above the selected point) */}
              {hoveredIndex !== null && (
                <div
                  className="absolute pointer-events-none rounded-xl p-2.5 shadow-lg border border-orange-500/20 text-xs flex flex-col justify-center transition-all duration-200"
                  style={{
                    backgroundColor: "#FF7A1A",
                    left: `${((paddingLeft + hoveredIndex * stepX) / 600) * 100 - 10}%`,
                    top: `${(expensePoints[hoveredIndex].y / 290) * 100 - 32}%`,
                    transform: "translateX(-40%)",
                    minWidth: "110px",
                  }}
                >
                  <div className="text-[10px] text-orange-100/90 font-medium">Monthly</div>
                  <div className="flex justify-between items-center gap-2 mt-0.5">
                    <span className="font-bold text-white text-sm">{tooltipData[hoveredIndex].val}</span>
                    <span className="text-[9px] bg-white/20 text-white font-bold px-1.5 py-0.5 rounded">
                      {tooltipData[hoveredIndex].trend}
                    </span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Panel: Recent Transactions */}
      <div className="rounded-2xl p-6" style={cardStyle}>
        <div className="flex justify-between items-center mb-5">
          <h3 className="font-bold text-xl">Recent Transactions</h3>
          <button className="text-gray-400 hover:text-white">
            <MdMoreVert size={20} />
          </button>
        </div>

        {/* Filter Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Search Input bar */}
            <div
              className="flex items-center rounded-full px-3 py-2 w-64 border border-gray-700 bg-[#222222]"
            >
              <FiSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search Transactions.."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none w-full text-xs placeholder-gray-500"
              />
            </div>

            {/* Category Dropdown Filter */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowCategoryDropdown(!showCategoryDropdown);
                  setShowAccountDropdown(false);
                }}
                className="flex items-center justify-between gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white transition-opacity hover:opacity-90"
                style={{ backgroundColor: "#FF7A1A" }}
              >
                {categoryFilter === "All" ? "All Category" : categoryFilter}
                <FiChevronDown />
              </button>
              {showCategoryDropdown && (
                <div
                  className="absolute left-0 mt-2 w-40 rounded-xl shadow-lg border border-gray-700 z-10"
                  style={{ backgroundColor: "#2A2A2A" }}
                >
                  {["All", "Income", "Expense", "Investments"].map((cat) => (
                    <button
                      key={cat}
                      onClick={() => {
                        setCategoryFilter(cat);
                        setShowCategoryDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-xs hover:bg-orange-500/20 hover:text-orange-500 text-gray-300 first:rounded-t-xl last:rounded-b-xl"
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Account Dropdown Filter */}
            <div className="relative">
              <button
                onClick={() => {
                  setShowAccountDropdown(!showAccountDropdown);
                  setShowCategoryDropdown(false);
                }}
                className="flex items-center justify-between gap-2 px-4 py-2 rounded-full text-xs text-gray-300 border border-gray-700 bg-[#222222] hover:bg-gray-800"
              >
                {accountFilter === "All" ? "All Account" : accountFilter}
                <FiChevronDown />
              </button>
              {showAccountDropdown && (
                <div
                  className="absolute left-0 mt-2 w-48 rounded-xl shadow-lg border border-gray-700 z-10"
                  style={{ backgroundColor: "#2A2A2A" }}
                >
                  {["All", "Platinum Visa Card", "Unlimited Mastercard", "Visa Card"].map((acc) => (
                    <button
                      key={acc}
                      onClick={() => {
                        setAccountFilter(acc);
                        setShowAccountDropdown(false);
                      }}
                      className="block w-full text-left px-4 py-2 text-xs hover:bg-orange-500/20 hover:text-orange-500 text-gray-300 first:rounded-t-xl last:rounded-b-xl"
                    >
                      {acc}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>

          <div className="flex items-center gap-3">
            {/* Date range filter display */}
            <div
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white border border-gray-700 bg-[#222222]"
            >
              <div
                className="w-5 h-5 rounded-full flex items-center justify-center bg-orange-500/10 text-orange-500"
              >
                <FiCalendar size={11} />
              </div>
              Jan 2026 - Feb 2026
              <FiChevronDown className="text-orange-500" />
            </div>

            {/* Download Button */}
            <button
              onClick={() => alert("Downloading CSV of transactions...")}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-xs font-semibold text-white transition-opacity hover:opacity-90"
              style={{ backgroundColor: "#FF7A1A" }}
            >
              Download
              <FiDownload size={13} />
            </button>
          </div>
        </div>

        {/* Transactions Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr
                className="text-gray-400 text-xs font-semibold"
                style={{ borderBottom: "1px solid #3a3a3a" }}
              >
                <th className="py-3.5 px-3 font-normal w-[22%]">Transaction Name</th>
                <th className="py-3.5 px-3 font-normal w-[20%]">Account</th>
                <th className="py-3.5 px-3 font-normal w-[15%]">Transaction ID</th>
                <th className="py-3.5 px-3 font-normal w-[18%]">Date & Time</th>
                <th className="py-3.5 px-3 font-normal w-[13%]">Amount</th>
                <th className="py-3.5 px-3 font-normal w-[12%]">Status</th>
              </tr>
            </thead>
            <tbody>
              {filteredTransactions.length > 0 ? (
                filteredTransactions.map((tx, i) => (
                  <tr
                    key={i}
                    className="text-sm border-b border-gray-800/60 hover:bg-white/5 transition-colors"
                  >
                    {/* Name & Sub-category */}
                    <td className="py-4 px-3 flex items-center gap-3">
                      <div
                        className="w-9 h-9 rounded-full flex items-center justify-center text-white flex-shrink-0"
                        style={{ backgroundColor: "#FF7A1A" }}
                      >
                        <MdAccountBalanceWallet size={16} />
                      </div>
                      <div>
                        <div className="font-semibold text-white">{tx.name}</div>
                        <div className="text-gray-500 text-xs mt-0.5 capitalize">{tx.category}</div>
                      </div>
                    </td>
                    {/* Account */}
                    <td className="py-4 px-3 text-gray-300 align-middle">
                      {tx.account}
                    </td>
                    {/* Transaction ID */}
                    <td className="py-4 px-3 text-gray-300 font-mono align-middle">
                      {tx.id}
                    </td>
                    {/* Date & Time */}
                    <td className="py-4 px-3 align-middle text-gray-300">
                      <div>{tx.date}</div>
                      <div className="text-gray-500 text-xs mt-0.5">
                        {tx.time}
                      </div>
                    </td>
                    {/* Amount */}
                    <td
                      className="py-4 px-3 font-semibold align-middle"
                      style={{ color: tx.isPositive ? "#FFFFFF" : "#EF4444" }}
                    >
                      {tx.amount}
                    </td>
                    {/* Status Badge */}
                    <td className="py-4 px-3 align-middle">
                      <span
                        className="inline-flex items-center gap-1.5 px-3 py-1 rounded-md text-xs font-semibold"
                        style={{
                          backgroundColor: "#22C55E",
                          color: "white",
                        }}
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-white inline-block"></span>
                        {tx.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="py-8 text-center text-gray-500 text-sm">
                    No transactions found matching the filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
