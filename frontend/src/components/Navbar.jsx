import React, { useState } from "react";
import { FiMoon, FiSun, FiSettings, FiMail, FiBell, FiX } from "react-icons/fi";
import { useFinance } from "../context/FinanceContext";
import { Link } from "react-router-dom";

export default function Navbar() {
  const { user, darkTheme, setDarkTheme, activities } = useFinance();
  const [showNotifDropdown, setShowNotifDropdown] = useState(false);

  const toggleTheme = (val) => {
    setDarkTheme(val);
  };

  return (
    <div
      className="flex items-center justify-end gap-3 p-4 relative"
      style={{ borderBottom: "1px solid var(--border-color)" }}
    >
      {/* Dark / Light toggle */}
      <div
        className="flex items-center rounded-full p-1"
        style={{ backgroundColor: "var(--card-inner)" }}
      >
        <button
          onClick={() => toggleTheme(true)}
          className="p-2 rounded-full transition-all duration-200"
          style={{
            backgroundColor: darkTheme ? "#F47201" : "transparent",
          }}
        >
          <FiMoon
            style={{ color: darkTheme ? "#ffffff" : "#888888" }}
          />
        </button>

        <button
          onClick={() => toggleTheme(false)}
          className="p-2 rounded-full transition-all duration-200"
          style={{
            backgroundColor: !darkTheme ? "#ffffff" : "transparent",
          }}
        >
          <FiSun
            style={{ color: !darkTheme ? "#F47201" : "#888888" }}
          />
        </button>
      </div>

      <Link
        to="/settings"
        className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-all active:scale-95"
        style={{ backgroundColor: "var(--card-inner)" }}
      >
        <FiSettings className="text-orange-500" />
      </Link>

      <Link
        to="/activity"
        className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-all active:scale-95"
        style={{ backgroundColor: "var(--card-inner)" }}
      >
        <FiMail className="text-orange-500" />
      </Link>

      <button
        onClick={() => setShowNotifDropdown(!showNotifDropdown)}
        className="relative w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80 transition-all active:scale-95"
        style={{ backgroundColor: "var(--card-inner)" }}
      >
        <FiBell className="text-orange-500" />
        {activities.length > 0 && (
          <span
            className="absolute -top-1 -right-1 text-white text-[10px] w-5 h-5 rounded-full flex items-center justify-center font-bold"
            style={{ backgroundColor: "#EF4444" }}
          >
            {Math.min(9, activities.length)}
          </span>
        )}
      </button>

      {/* Notifications Dropdown Panel */}
      {showNotifDropdown && (
        <div
          className="absolute right-16 top-16 w-80 rounded-2xl p-4 shadow-xl border border-gray-800 z-50 flex flex-col gap-3"
          style={{ backgroundColor: "var(--card-bg)" }}
        >
          <div className="flex justify-between items-center border-b border-gray-800 pb-2">
            <h4 className="font-bold text-xs text-white">Notifications</h4>
            <button
              onClick={() => setShowNotifDropdown(false)}
              className="text-gray-400 hover:text-white"
            >
              <FiX size={14} />
            </button>
          </div>
          <div className="space-y-3 max-h-60 overflow-y-auto pr-1">
            {activities.slice(0, 4).map((log) => (
              <div key={log.id} className="text-left text-xs border-b border-gray-800/40 pb-2 last:border-0 last:pb-0">
                <p className="text-gray-200 font-semibold">{log.message}</p>
                <div className="flex justify-between items-center mt-1 text-[9px] text-gray-500">
                  <span>{log.type}</span>
                  <span>{log.timestamp}</span>
                </div>
              </div>
            ))}
            {activities.length === 0 && (
              <p className="text-xs text-gray-500 text-center py-4">No new notifications.</p>
            )}
          </div>
        </div>
      )}

      <Link to="/settings" className="transition-all active:scale-95">
        <img
          src={user.avatar}
          alt="profile"
          className="w-11 h-11 rounded-full object-cover"
          style={{ border: "2px solid #FF7A1A" }}
        />
      </Link>
    </div>
  );
}