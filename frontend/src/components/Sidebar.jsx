import React from "react";
import { NavLink } from "react-router-dom";
import {
  MdGridView,
  MdCreditCard,
  MdSettings,
  MdOutlineLogout,
} from "react-icons/md";
import { FaChartLine, FaMoneyBillWave, FaBolt } from "react-icons/fa";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { BiTransfer } from "react-icons/bi";
import { IoChevronBack } from "react-icons/io5";
import logo from "../assets/logo.png";

const menuItems = [
  { name: "Overview", icon: <MdGridView size={20} />, path: "/" },
  { name: "Card", icon: <MdCreditCard size={20} />, path: "/card" },
  { name: "Investment", icon: <FaChartLine size={18} />, path: "/investment" },
  { name: "Transactions", icon: <BiTransfer size={20} />, path: "/transactions" },
  { name: "Savings", icon: <FaMoneyBillWave size={18} />, path: "/savings" },
  { name: "Activity", icon: <FaBolt size={18} />, path: "/activity" },
  { name: "Reports", icon: <HiOutlineDocumentReport size={20} />, path: "/reports" },
  { name: "Settings", icon: <MdSettings size={20} />, path: "/settings" },
];

export default function Sidebar({ collapsed, setCollapsed }) {
  return (
    <aside
      className={`${
        collapsed ? "w-20" : "w-64"
      } transition-all duration-300 flex flex-col relative min-h-screen`}
      style={{ backgroundColor: "#1C1C1C", borderRight: "1px solid #F4720133" }}
    >
      {/* ✅ Logo Section */}
      <div className="relative flex items-center justify-center py-6 px-4">
        {collapsed ? (
          // ✅ Collapsed - Show Small Logo Only
          <div className="flex items-center justify-center">
            <img
              src={logo}
              alt="Logo"
              style={{
                width: "42px",
                height: "42px",
                objectFit: "contain",
              }}
            />
          </div>
        ) : (
          // ✅ Expanded - Show Big Logo Properly
          <div className="flex flex-col items-center gap-3 w-full">
            <img
              src={logo}
              alt="Logo"
              style={{
                width: "120px",        // ✅ Big enough to see clearly
                height: "120px",
                objectFit: "contain",  // ✅ No stretch or crop
                display: "block",
              }}
            />
            
          </div>
        )}

        {/* ✅ Collapse Toggle Button */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="w-8 h-8 rounded-full flex items-center justify-center absolute -right-4 top-8 z-10 shadow-lg"
          style={{
            backgroundColor: "#FF7A1A",
            border: "2px solid #1C1C1C",
          }}
        >
          <IoChevronBack
            size={16}
            className={`text-white transition-transform duration-300 ${
              collapsed ? "rotate-180" : ""
            }`}
          />
        </button>
      </div>

      {/* ✅ Divider Line */}
      {/* <div
        className="mx-4 mb-2"
        style={{ borderTop: "1px solid #2A2A2A" }}
      /> */}

      {/* ✅ Navigation Menu */}
      <nav className="flex-1 px-3 mt-2 space-y-1 overflow-y-auto">
        {menuItems.map((item) => (
          <NavLink
            key={item.name}
            to={item.path}
            title={collapsed ? item.name : ""}
            className={({ isActive }) =>
              `flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                isActive
                  ? "text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              } ${collapsed ? "justify-center" : ""}`
            }
            style={({ isActive }) => ({
              backgroundColor: isActive ? "#FF7A1A" : "transparent",
            })}
          >
            <span className="flex-shrink-0">{item.icon}</span>
            {!collapsed && (
              <span className="font-medium text-sm">{item.name}</span>
            )}
          </NavLink>
        ))}
      </nav>

      {/* ✅ Divider Line */}
      <div
        className="mx-4 mt-2"
        style={{ borderTop: "1px solid #F4720133" }}
      />

      {/* ✅ Logout Button */}
      <div className="p-3">
        <button
          title={collapsed ? "Log Out" : ""}
          className={`flex items-center gap-3 w-full px-4 py-3 rounded-lg text-white font-medium transition-opacity hover:opacity-90 ${
            collapsed ? "justify-center" : ""
          }`}
          style={{ backgroundColor: "#FF7A1A" }}
        >
          <MdOutlineLogout size={20} />
          {!collapsed && <span className="text-sm">Log Out</span>}
        </button>
      </div>
    </aside>
  );
}