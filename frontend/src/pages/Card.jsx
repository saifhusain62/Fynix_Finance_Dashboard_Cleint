import React, { useState } from "react";
import { useFinance } from "../context/FinanceContext";
import { FiPlus, FiLock, FiUnlock, FiCreditCard, FiSliders, FiDollarSign, FiX } from "react-icons/fi";

const cardStyle = { backgroundColor: "var(--card-bg)" };
const innerCardStyle = { backgroundColor: "var(--card-inner)" };

export default function Card() {
  const { cards, addCard, toggleCardLock, updateCardLimit } = useFinance();
  const [selectedCardId, setSelectedCardId] = useState(cards[0]?.id || "");
  const [showAddModal, setShowAddModal] = useState(false);

  // New card form state
  const [newCardName, setNewCardName] = useState("");
  const [newCardNumber, setNewCardNumber] = useState("");
  const [newCardType, setNewCardType] = useState("VISA");
  const [newCardExpiry, setNewCardExpiry] = useState("12/28");
  const [newCardLimit, setNewCardLimit] = useState(5000);
  const [newCardBalance, setNewCardBalance] = useState(0);
  const [newCardColor, setNewCardColor] = useState("linear-gradient(135deg, #FF9B4D 0%, #FF7A1A 100%)");

  const selectedCard = cards.find((c) => c.id === selectedCardId) || cards[0];

  const handleAddCardSubmit = (e) => {
    e.preventDefault();
    if (!newCardNumber || !newCardName) {
      alert("Please fill in Card Name and Number!");
      return;
    }
    addCard({
      name: newCardName,
      number: newCardNumber,
      type: newCardType,
      expiry: newCardExpiry,
      limit: Number(newCardLimit),
      balance: Number(newCardBalance),
      color: newCardColor,
    });
    // Reset state & close
    setNewCardName("");
    setNewCardNumber("");
    setNewCardExpiry("12/28");
    setNewCardLimit(5000);
    setNewCardBalance(0);
    setShowAddModal(false);
  };

  return (
    <div className="p-6 min-h-screen" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Your Cards</h1>
          <p className="text-gray-400 mt-1 text-sm">
            Manage transaction limits, card locking, and add payment cards.
          </p>
        </div>
        <button
          onClick={() => setShowAddModal(true)}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-transform hover:scale-105"
          style={{ backgroundColor: "#FF7A1A" }}
        >
          <FiPlus size={16} /> Add New Card
        </button>
      </div>

      <div className="grid grid-cols-12 gap-5">
        {/* Left Side: Cards Grid List */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-4">
          <div className="rounded-2xl p-6" style={cardStyle}>
            <h3 className="font-semibold text-lg mb-4">Card Portfolio</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {cards.map((card) => (
                <div
                  key={card.id}
                  onClick={() => setSelectedCardId(card.id)}
                  className={`rounded-2xl p-5 text-white flex flex-col justify-between relative overflow-hidden shadow-lg cursor-pointer hover:-translate-y-1 transition-all ${
                    selectedCardId === card.id ? "ring-2 ring-orange-500 ring-offset-2 ring-offset-[#2A2A2A]" : "opacity-75 hover:opacity-100"
                  }`}
                  style={{
                    background: card.color,
                    minHeight: "150px",
                  }}
                >
                  {/* Lock Indicator */}
                  {card.isLocked && (
                    <div className="absolute inset-0 bg-black/40 backdrop-blur-[1px] flex flex-col items-center justify-center gap-1.5 z-10">
                      <FiLock size={22} className="text-red-400" />
                      <span className="text-[10px] uppercase font-bold tracking-wider text-red-300">Locked</span>
                    </div>
                  )}

                  <div className="flex justify-between items-center">
                    <div className="flex items-center gap-1.5 text-[11px] font-medium opacity-90">
                      <FiCreditCard size={14} />
                      <span>{card.name}</span>
                    </div>
                    <span className="font-extrabold italic text-sm tracking-wider">{card.type}</span>
                  </div>

                  <div className="text-sm tracking-widest font-semibold mt-4">
                    {card.number.replace(/(\d{4})\s*(\d{4})\s*(\d{4})\s*(\d{4})/, '$1 **** **** $4')}
                  </div>

                  <div className="flex justify-between items-end mt-2">
                    <div className="text-[10px] opacity-80 font-mono">
                      VALID THRU {card.expiry}
                    </div>
                    <div className="text-right">
                      <div className="text-[8px] opacity-75">BALANCE</div>
                      <div className="text-xs font-bold">${card.balance.toLocaleString()}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right Side: Selected Card Actions & Settings */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-4">
          {selectedCard && (
            <div className="rounded-2xl p-6" style={cardStyle}>
              <h3 className="font-semibold text-lg mb-1">{selectedCard.name} Settings</h3>
              <p className="text-gray-400 text-xs mb-6">Manage status & transactional properties.</p>

              {/* Status Row */}
              <div className="flex items-center justify-between p-4 rounded-xl mb-4" style={innerCardStyle}>
                <div>
                  <h4 className="text-sm font-semibold">Card Security Lock</h4>
                  <p className="text-gray-400 text-[10px] mt-0.5">Freeze transactions instantly.</p>
                </div>
                <button
                  onClick={() => toggleCardLock(selectedCard.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-full font-bold text-xs transition-colors ${
                    selectedCard.isLocked
                      ? "bg-emerald-500/10 text-emerald-500 border border-emerald-500/30 hover:bg-emerald-500/20"
                      : "bg-red-500/10 text-red-500 border border-red-500/30 hover:bg-red-500/20"
                  }`}
                >
                  {selectedCard.isLocked ? (
                    <>
                      <FiUnlock size={14} /> Unlock Card
                    </>
                  ) : (
                    <>
                      <FiLock size={14} /> Lock Card
                    </>
                  )}
                </button>
              </div>

              {/* Limits Adjuster */}
              <div className="p-4 rounded-xl" style={innerCardStyle}>
                <div className="flex items-center justify-between mb-3">
                  <div>
                    <h4 className="text-sm font-semibold">Spending Limit</h4>
                    <p className="text-gray-400 text-[10px] mt-0.5">Maximum monthly card limit.</p>
                  </div>
                  <span className="text-sm font-bold text-orange-500">${selectedCard.limit.toLocaleString()}</span>
                </div>

                <div className="flex items-center gap-3">
                  <FiSliders size={16} className="text-gray-400" />
                  <input
                    type="range"
                    min="1000"
                    max="50000"
                    step="1000"
                    value={selectedCard.limit}
                    onChange={(e) => updateCardLimit(selectedCard.id, Number(e.target.value))}
                    disabled={selectedCard.isLocked}
                    className="w-full h-1 bg-gray-800 rounded-lg appearance-none cursor-pointer accent-orange-500 disabled:opacity-50"
                  />
                </div>
              </div>

              {/* Card info rows */}
              <div className="mt-6 space-y-3.5 border-t border-gray-800/80 pt-6">
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Card Provider</span>
                  <span className="font-semibold text-white">{selectedCard.type}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Expiry Date</span>
                  <span className="font-semibold text-white">{selectedCard.expiry}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Current Balance</span>
                  <span className="font-semibold text-white">${selectedCard.balance.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-xs">
                  <span className="text-gray-400">Lock Status</span>
                  <span className={`font-semibold ${selectedCard.isLocked ? "text-red-400" : "text-emerald-400"}`}>
                    {selectedCard.isLocked ? "Frozen" : "Active"}
                  </span>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Add New Card Overlay Modal */}
      {showAddModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-md rounded-2xl p-6 relative" style={cardStyle}>
            <button
              onClick={() => setShowAddModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <FiX size={20} />
            </button>
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <FiCreditCard className="text-orange-500" /> Create Card
            </h3>
            <form onSubmit={handleAddCardSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1 font-medium">Card Label / Name</label>
                <input
                  type="text"
                  placeholder="e.g. Shopping Visa"
                  value={newCardName}
                  onChange={(e) => setNewCardName(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl text-xs bg-gray-900 border border-gray-700 outline-none text-white focus:border-orange-500/50"
                />
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1 font-medium">Card Number</label>
                <input
                  type="text"
                  placeholder="4532 1290 8911 2234"
                  value={newCardNumber}
                  onChange={(e) => setNewCardNumber(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl text-xs bg-gray-900 border border-gray-700 outline-none text-white focus:border-orange-500/50"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1 font-medium">Card Type</label>
                  <select
                    value={newCardType}
                    onChange={(e) => setNewCardType(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl text-xs bg-gray-900 border border-gray-700 outline-none text-white focus:border-orange-500/50"
                  >
                    <option value="VISA">VISA</option>
                    <option value="Mastercard">MasterCard</option>
                    <option value="AMEX">Amex</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1 font-medium">Expiry</label>
                  <input
                    type="text"
                    placeholder="12/30"
                    value={newCardExpiry}
                    onChange={(e) => setNewCardExpiry(e.target.value)}
                    required
                    className="w-full px-3 py-2 rounded-xl text-xs bg-gray-900 border border-gray-700 outline-none text-white focus:border-orange-500/50"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs text-gray-400 mb-1 font-medium">Limit ($)</label>
                  <input
                    type="number"
                    value={newCardLimit}
                    onChange={(e) => setNewCardLimit(e.target.value)}
                    min="1000"
                    required
                    className="w-full px-3 py-2 rounded-xl text-xs bg-gray-900 border border-gray-700 outline-none text-white focus:border-orange-500/50"
                  />
                </div>
                <div>
                  <label className="block text-xs text-gray-400 mb-1 font-medium">Initial Balance ($)</label>
                  <input
                    type="number"
                    value={newCardBalance}
                    onChange={(e) => setNewCardBalance(e.target.value)}
                    min="0"
                    required
                    className="w-full px-3 py-2 rounded-xl text-xs bg-gray-900 border border-gray-700 outline-none text-white focus:border-orange-500/50"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1 font-medium">Theme Gradient</label>
                <div className="flex gap-2.5 mt-1.5">
                  {[
                    "linear-gradient(135deg, #FF9B4D 0%, #FF7A1A 100%)",
                    "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)",
                    "linear-gradient(135deg, #10B981 0%, #059669 100%)",
                    "linear-gradient(135deg, #3B82F6 0%, #1D4ED8 100%)",
                    "linear-gradient(135deg, #EC4899 0%, #BE185D 100%)",
                  ].map((color) => (
                    <button
                      key={color}
                      type="button"
                      onClick={() => setNewCardColor(color)}
                      className={`w-6 h-6 rounded-full border-2 transition-all ${
                        newCardColor === color ? "border-white scale-110" : "border-transparent"
                      }`}
                      style={{ background: color }}
                    />
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl font-semibold text-xs text-white hover:opacity-90 active:scale-95 transition-all"
                  style={{ backgroundColor: "#FF7A1A" }}
                >
                  Create Card
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
