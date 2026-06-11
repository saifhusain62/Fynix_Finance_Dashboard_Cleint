import React from "react";
import {
  FiSearch,
  FiTrendingUp,
  FiPlus,
  FiCalendar,
  FiSliders,
  FiChevronDown,
} from "react-icons/fi";
import { FaArrowDown } from "react-icons/fa";
import { MdAccountBalanceWallet, MdAttachMoney } from "react-icons/md";
import { BsCreditCard2Front } from "react-icons/bs";

const recentActivity = [
  { name: "Kabir", date: "02 Jan 2026", time: "at 08.25 am", id: "agfs55198", fee: "$0.00", balance: "+$650.00", status: "Success" },
  { name: "Ben", date: "05 Jan 2026", time: "at 10.25 am", id: "Tvtg55184", fee: "$0.00", balance: "+$850.00", status: "Success" },
  { name: "Mark", date: "25 Jan 2026", time: "at 11.25 am", id: "sfbh5515", fee: "$0.00", balance: "+$750.00", status: "Pending" },
  { name: "Khan", date: "30 Jan 2026", time: "at 12.25 pm", id: "sfbf55114", fee: "$0.00", balance: "+$350.00", status: "Success" },
];

const expenses = [
  { name: "New Car", percent: 45 },
  { name: "New House Rent", percent: 25 },
  { name: "New Phone", percent: 60 },
  { name: "New PC", percent: 10 },
];

const avatars = [12, 32, 45, 22, 33, 5, 8];

const cardStyle = { backgroundColor: "#2A2A2A" };
const innerCardStyle = { backgroundColor: "#1C1C1C" };

export default function Overview() {
  return (
    <div className="p-6 min-h-screen" style={{ backgroundColor: "#1C1C1C", color: "white" }}>
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Good Morning Kabir!</h1>
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
              className="w-8 h-8 rounded-full flex items-center justify-center mr-2"
              style={{ backgroundColor: "#FF7A1A" }}
            >
              <FiSearch />
            </div>
            <input
              type="text"
              placeholder="Search Here.."
              className="bg-transparent outline-none w-full text-sm"
            />
          </div>
          <button
            className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm"
            style={{ backgroundColor: "#FF7A1A" }}
          >
            <FaArrowDown /> Withdraw
          </button>
          <button
            className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm"
            style={{ backgroundColor: "#2A2A2A", border: "1px solid #FF7A1A" }}
          >
            <FiPlus style={{ color: "#FF7A1A" }} /> Deposit
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
              $25,562.05
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
            <h3 className="font-semibold mb-6">Daily Transections limit</h3>
            <div className="flex justify-end text-xs mb-1">75%</div>
            <div
              className="w-full h-2 rounded-full overflow-hidden"
              style={innerCardStyle}
            >
              <div
                className="h-full rounded-full"
                style={{ width: "75%", backgroundColor: "#FF7A1A" }}
              />
            </div>
            <p className="text-gray-400 text-xs mt-3">
              $2350 Used From $3,050 Limit
            </p>
          </div>
        </div>

        {/* MIDDLE COLUMN */}
        <div className="col-span-12 lg:col-span-6 flex flex-col gap-5">
          {/* All Track In One */}
          <div className="rounded-2xl p-6" style={cardStyle}>
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-lg font-semibold">All Track In One</h3>
              <button className="text-sm" style={{ color: "#FF7A1A" }}>
                View All
              </button>
            </div>
            <p className="text-gray-400 text-xs mb-4">
              View your income in a certain period of time
            </p>
            <div className="grid grid-cols-2 gap-3">
              {[
                { label: "Current Balance", value: "$75,662.05", percent: "+56.85%" },
                { label: "Income", value: "$25,662.05", percent: "+56.85%" },
                { label: "Savings", value: "$15,662.05", percent: "+16.85%" },
                { label: "Expenses", value: "$5,662.05", percent: "+16.85%" },
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
              View your income in a certain period of time
            </p>
            <div className="flex -space-x-2 mb-4">
              {avatars.map((id, i) => (
                <img
                  key={i}
                  src={`https://i.pravatar.cc/40?img=${id}`}
                  className="w-9 h-9 rounded-full"
                  style={{ border: "2px solid #2A2A2A" }}
                  alt=""
                />
              ))}
            </div>
            <p className="text-xs text-gray-400">
              Balance :{" "}
              <span className="text-white font-semibold">$75,662.05</span>
            </p>
            <div className="flex justify-between items-center mt-3">
              <h2 className="text-2xl font-bold" style={{ color: "#FF7A1A" }}>
                $2,662.05
              </h2>
              <button
                className="px-5 py-2 rounded-lg font-medium text-sm"
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
              <button className="text-sm" style={{ color: "#FF7A1A" }}>
                View All
              </button>
            </div>
            <div
              className="rounded-2xl p-5 text-white relative overflow-hidden"
              style={{
                background: "linear-gradient(135deg, #FF9A4D, #EA580C)",
                minHeight: "150px",
              }}
            >
              <div className="flex justify-between items-center">
                <div className="flex items-center gap-2 text-sm">
                  <BsCreditCard2Front size={18} />
                  <span>Credit Card</span>
                </div>
                <span className="font-bold italic text-xl">VISA</span>
              </div>
              <div className="flex gap-3 mt-12 text-base tracking-widest font-medium">
                <span>1234</span>
                <span>5678</span>
                <span>9101</span>
                <span>1121</span>
              </div>
            </div>
          </div>

          {/* Your Expenses */}
          <div className="rounded-2xl p-6" style={cardStyle}>
            <div className="flex justify-between items-center mb-4">
              <h3 className="font-semibold">Your Expenses</h3>
              <button className="text-sm" style={{ color: "#FF7A1A" }}>
                View All
              </button>
            </div>
            <div className="space-y-3">
              {expenses.map((e, i) => (
                <div key={i}>
                  <div className="flex justify-between text-xs">
                    <span>{e.name}</span>
                    <span>{e.percent}%</span>
                  </div>
                  <div
                    className="w-full h-2 rounded-full overflow-hidden mt-2"
                    style={innerCardStyle}
                  >
                    <div
                      className="h-full rounded-full"
                      style={{
                        width: `${e.percent}%`,
                        backgroundColor: "#FF7A1A",
                      }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* RECENT ACTIVITY - spans left + middle = 9 columns */}
        <div className="col-span-12 lg:col-span-9">
          <div className="rounded-2xl p-6" style={cardStyle}>
            <div className="flex flex-wrap justify-between items-center mb-5 gap-3">
              <div>
                <h3 className="font-semibold text-lg">Recent Activity</h3>
                <p className="text-gray-400 text-xs">
                  View your income in a certain period of time
                </p>
              </div>
              <div className="flex items-center gap-3">
                <button
                  className="flex items-center gap-2 px-3 py-2 rounded-full text-xs"
                  style={innerCardStyle}
                >
                  <div
                    className="w-6 h-6 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#FF7A1A" }}
                  >
                    <FiCalendar size={12} />
                  </div>
                  Jan 2026 - Feb 2026
                  <FiChevronDown />
                </button>
                <button
                  className="w-9 h-9 rounded-lg flex items-center justify-center"
                  style={innerCardStyle}
                >
                  <FiSliders />
                </button>
                <button
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#FF7A1A" }}
                >
                  <FiPlus />
                </button>
              </div>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead className="text-gray-400 text-xs">
                  <tr style={{ borderBottom: "1px solid #3a3a3a" }}>
                    <th className="py-3 font-normal">Name</th>
                    <th className="py-3 font-normal">Date & Time</th>
                    <th className="py-3 font-normal">Invoice ID</th>
                    <th className="py-3 font-normal">fee</th>
                    <th className="py-3 font-normal">Balance</th>
                    <th className="py-3 font-normal">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {recentActivity.map((r, i) => (
                    <tr key={i} style={{ borderBottom: "1px solid #333" }} className="text-sm">
                      <td className="py-4">{r.name}</td>
                      <td className="py-4">
                        {r.date} <br />
                        <span className="text-gray-500 text-xs">{r.time}</span>
                      </td>
                      <td className="py-4">{r.id}</td>
                      <td className="py-4">{r.fee}</td>
                      <td className="py-4">{r.balance}</td>
                      <td className="py-4">
                        <span
                          className="px-3 py-1 rounded-md text-xs font-medium"
                          style={{
                            backgroundColor:
                              r.status === "Success" ? "#22C55E" : "#EF4444",
                            color: "white",
                          }}
                        >
                          • {r.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}