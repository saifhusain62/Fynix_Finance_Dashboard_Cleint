import React, { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import { FiSearch, FiSliders, FiActivity, FiClock, FiShield, FiTrendingUp } from "react-icons/fi";

const cardStyle = { backgroundColor: "var(--card-bg)" };
const innerCardStyle = { backgroundColor: "var(--card-inner)" };

export default function Activity() {
  const { activities } = useFinance();
  const [searchQuery, setSearchQuery] = useState("");
  const [typeFilter, setTypeFilter] = useState("All");

  const filteredLogs = activities.filter((log) => {
    const matchesSearch = log.message.toLowerCase().includes(searchQuery.toLowerCase()) ||
                          log.type.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesType = typeFilter === "All" || log.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const getLogIcon = (type) => {
    switch (type) {
      case "Security":
        return <FiShield className="text-red-400" />;
      case "Transfer":
        return <FiTrendingUp className="text-emerald-400" />;
      default:
        return <FiClock className="text-orange-500" />;
    }
  };

  return (
    <div className="p-6 min-h-screen" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Activity Audit Logs</h1>
        <p className="text-gray-400 mt-1 text-sm">
          Detailed security updates, fund transfers, and transactional audit trails.
        </p>
      </div>

      <div className="rounded-2xl p-6" style={cardStyle}>
        {/* Toolbar */}
        <div className="flex flex-wrap items-center justify-between gap-3 mb-6">
          <div className="flex items-center gap-3 flex-wrap">
            {/* Search Input bar */}
            <div className="flex items-center rounded-full px-3 py-2 w-64 border border-gray-700 bg-[#222222]">
              <FiSearch className="text-gray-500 mr-2" />
              <input
                type="text"
                placeholder="Search audit trail..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent outline-none w-full text-xs placeholder-gray-500 text-white"
              />
            </div>

            {/* Type Filters */}
            <div className="flex gap-2 bg-[#222222] p-1 rounded-full border border-gray-800">
              {["All", "Transfer", "System", "Security"].map((type) => (
                <button
                  key={type}
                  onClick={() => setTypeFilter(type)}
                  className={`px-3 py-1 rounded-full text-xs font-bold transition-all ${
                    typeFilter === type ? "bg-orange-500 text-white" : "text-gray-400 hover:text-gray-200"
                  }`}
                >
                  {type}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Audit Logs List */}
        <div className="space-y-3.5 pr-2">
          {filteredLogs.length > 0 ? (
            filteredLogs.map((log) => (
              <div
                key={log.id}
                className="flex items-center justify-between p-4 rounded-xl border border-gray-800 bg-[#222222]/50 hover:bg-[#222222] transition-colors"
              >
                <div className="flex items-center gap-3">
                  <div className="w-9 h-9 rounded-full bg-orange-500/10 flex items-center justify-center text-sm">
                    {getLogIcon(log.type)}
                  </div>
                  <div>
                    <h4 className="text-xs font-semibold text-white">{log.message}</h4>
                    <span className="text-[9px] text-gray-500 uppercase font-black tracking-wider mt-0.5 inline-block">
                      {log.type} Event
                    </span>
                  </div>
                </div>
                <div className="text-[10px] text-gray-500 font-mono text-right">
                  {log.timestamp}
                </div>
              </div>
            ))
          ) : (
            <div className="text-xs text-gray-500 text-center py-8">
              No audit logs found matching the filter criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
