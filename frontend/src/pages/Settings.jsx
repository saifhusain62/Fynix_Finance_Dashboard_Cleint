import React, { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import { FiUser, FiMail, FiBell, FiLock, FiCheckCircle } from "react-icons/fi";

const cardStyle = { backgroundColor: "var(--card-bg)" };
const inputStyle = { backgroundColor: "var(--input-bg)", border: "1px solid var(--input-border)", color: "var(--text-color)" };

export default function Settings() {
  const { user, updateUserProfile, activities } = useFinance();
  const [name, setName] = useState(user.name);
  const [email, setEmail] = useState(user.email);
  const [avatar, setAvatar] = useState(user.avatar);
  const [showSavedAlert, setShowSavedAlert] = useState(false);

  const [notifications, setNotifications] = useState({
    transfers: true,
    security: true,
    system: false,
  });

  const handleSaveProfile = (e) => {
    e.preventDefault();
    updateUserProfile({ name, email, avatar });
    setShowSavedAlert(true);
    setTimeout(() => setShowSavedAlert(false), 3000);
  };

  const handleToggleNotif = (key) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-6 min-h-screen" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold">Settings</h1>
        <p className="text-gray-400 mt-1 text-sm">
          Customize your profile, preferences, and security settings.
        </p>
      </div>

      {showSavedAlert && (
        <div className="mb-4 p-4 rounded-xl bg-green-500/10 border border-green-500/30 text-green-400 flex items-center gap-2 text-sm max-w-2xl">
          <FiCheckCircle size={18} />
          <span>Profile updated successfully! Changes applied immediately.</span>
        </div>
      )}

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl">
        {/* Left Card - User Preview */}
        <div className="md:col-span-1 rounded-2xl p-6 flex flex-col items-center justify-center text-center" style={cardStyle}>
          <img
            src={avatar || "https://i.pravatar.cc/100?img=12"}
            alt="avatar"
            className="w-24 h-24 rounded-full object-cover mb-4"
            style={{ border: "3px solid #FF7A1A" }}
          />
          <h2 className="text-xl font-bold text-white">{user.name}</h2>
          <p className="text-gray-400 text-xs mt-1">{user.email}</p>
          <div className="mt-6 w-full pt-6 border-t border-gray-800/80 text-left text-xs text-gray-500">
            <span className="font-semibold text-gray-400">Account status</span>: Active
            <br />
            <span className="font-semibold text-gray-400">Registered</span>: Jan 2026
          </div>
        </div>

        {/* Middle Card - Edit Profile Form */}
        <div className="md:col-span-2 rounded-2xl p-6" style={cardStyle}>
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <FiUser className="text-orange-500" /> Personal Profile
          </h3>
          <form onSubmit={handleSaveProfile} className="space-y-4">
            <div>
              <label className="block text-xs text-gray-400 mb-1.5 font-medium">Display Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl outline-none text-sm text-white placeholder-gray-600 transition-colors focus:border-orange-500/50"
                style={inputStyle}
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1.5 font-medium">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="w-full px-4 py-2.5 rounded-xl outline-none text-sm text-white placeholder-gray-600 transition-colors focus:border-orange-500/50"
                style={inputStyle}
              />
            </div>

            <div>
              <label className="block text-xs text-gray-400 mb-1.5 font-medium">Avatar URL</label>
              <input
                type="url"
                value={avatar}
                onChange={(e) => setAvatar(e.target.value)}
                placeholder="https://images.unsplash.com/..."
                className="w-full px-4 py-2.5 rounded-xl outline-none text-sm text-white placeholder-gray-600 transition-colors focus:border-orange-500/50"
                style={inputStyle}
              />
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="px-6 py-2.5 rounded-full font-semibold text-sm text-white hover:opacity-90 active:scale-95 transition-all"
                style={{ backgroundColor: "#FF7A1A" }}
              >
                Save Changes
              </button>
            </div>
          </form>
        </div>

        {/* Lower Left Card - Notification Preferences */}
        <div className="md:col-span-1 rounded-2xl p-6" style={cardStyle}>
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <FiBell className="text-orange-500" /> Notifications
          </h3>
          <p className="text-xs text-gray-400 mb-4">Select which alerts you want to receive.</p>
          <div className="space-y-4">
            {[
              { key: "transfers", label: "Transfer & Deposits", desc: "Instantly notify on fund movement" },
              { key: "security", label: "Security Updates", desc: "Notify when locking/unlocking cards" },
              { key: "system", label: "System Reports", desc: "Notify on goal creation & settings updates" },
            ].map((item) => (
              <label key={item.key} className="flex items-start gap-3 cursor-pointer select-none">
                <input
                  type="checkbox"
                  checked={notifications[item.key]}
                  onChange={() => handleToggleNotif(item.key)}
                  className="mt-1 w-4 h-4 rounded text-orange-500 bg-gray-900 border-gray-700 focus:ring-orange-500 focus:ring-offset-gray-900 accent-orange-500"
                />
                <div>
                  <div className="text-xs font-semibold text-white">{item.label}</div>
                  <div className="text-[10px] text-gray-400 mt-0.5">{item.desc}</div>
                </div>
              </label>
            ))}
          </div>
        </div>

        {/* Lower Right Card - Security Activity Summary */}
        <div className="md:col-span-2 rounded-2xl p-6" style={cardStyle}>
          <h3 className="font-bold text-lg mb-4 flex items-center gap-2">
            <FiLock className="text-orange-500" /> Account Security Logs
          </h3>
          <p className="text-xs text-gray-400 mb-4">Recent security related modifications in your session.</p>
          <div className="space-y-3.5 max-h-48 overflow-y-auto pr-2">
            {activities
              .filter((log) => log.type === "Security" || log.type === "System")
              .slice(0, 5)
              .map((log) => (
                <div key={log.id} className="flex justify-between items-center text-xs border-b border-gray-800/60 pb-2 last:border-b-0 last:pb-0">
                  <div className="flex flex-col">
                    <span className="font-medium text-gray-200">{log.message}</span>
                    <span className="text-[10px] text-gray-500 mt-0.5">{log.type} Activity</span>
                  </div>
                  <span className="text-[10px] text-gray-500">{log.timestamp}</span>
                </div>
              ))}
            {activities.filter((log) => log.type === "Security" || log.type === "System").length === 0 && (
              <div className="text-xs text-gray-500 text-center py-4">No recent security events.</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
