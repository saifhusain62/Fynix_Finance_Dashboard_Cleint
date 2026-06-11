import React, { useState } from "react";
import { FiMoon, FiSun, FiSettings, FiMail, FiBell } from "react-icons/fi";

export default function Navbar() {
  const [dark, setDark] = useState(true);

  return (
    <div
      className="flex items-center justify-end gap-3 p-4"
      style={{ borderBottom: "1px solid #F4720133" }}
    >
      {/* Dark / Light toggle */}
      <div
        className="flex items-center rounded-full p-1"
        style={{ backgroundColor: "#2A2A2A" }}
      >
        <button
          onClick={() => setDark(true)}
          className="p-2 rounded-full"
          style={{ backgroundColor: dark ? "#444" : "transparent" }}
        >
          <FiMoon className="text-white" />
        </button>
        <button
          onClick={() => setDark(false)}
          className="p-2 rounded-full"
          style={{ backgroundColor: !dark ? "#444" : "transparent" }}
        >
          <FiSun className="text-white" />
        </button>
      </div>

      <button
        className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80"
        style={{ backgroundColor: "#2A2A2A" }}
      >
        <FiSettings className="text-white" />
      </button>

      <button
        className="w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80"
        style={{ backgroundColor: "#2A2A2A" }}
      >
        <FiMail className="text-white" />
      </button>

      <button
        className="relative w-10 h-10 rounded-full flex items-center justify-center hover:opacity-80"
        style={{ backgroundColor: "#2A2A2A" }}
      >
        <FiBell className="text-white" />
        <span
          className="absolute -top-1 -right-1 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center"
          style={{ backgroundColor: "#EF4444" }}
        >
          2
        </span>
      </button>

      <img
        src="https://i.pravatar.cc/100?img=12"
        alt="profile"
        className="w-11 h-11 rounded-full object-cover"
        style={{ border: "2px solid #FF7A1A" }}
      />
    </div>
  );
}