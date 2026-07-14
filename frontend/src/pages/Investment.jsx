import React, { useState, useEffect } from "react";
import { useFinance } from "../context/FinanceContext";
import { FiTrendingUp, FiTrendingDown, FiDollarSign, FiPlus, FiX, FiActivity } from "react-icons/fi";

const cardStyle = { backgroundColor: "var(--card-bg)" };
const innerCardStyle = { backgroundColor: "var(--card-inner)" };

export default function Investment() {
  const { investments, balances, tradeSecurity } = useFinance();
  const [showTradeModal, setShowTradeModal] = useState(false);
  const [tradeAction, setTradeAction] = useState("BUY");
  const [tradeSymbol, setTradeSymbol] = useState("TSLA");
  const [tradeShares, setTradeShares] = useState(1);

  // Live prices mock updating for watchlist
  const [watchlistPrices, setWatchlistPrices] = useState(investments.watchlist);

  useEffect(() => {
    const timer = setInterval(() => {
      setWatchlistPrices((prevList) =>
        prevList.map((item) => {
          const delta = (Math.random() - 0.5) * (item.price * 0.015);
          const newPrice = Math.max(1, item.price + delta);
          return {
            ...item,
            price: Number(newPrice.toFixed(2)),
            change: Number((delta >= 0 ? item.change + 0.1 : item.change - 0.1).toFixed(2)),
            isPositive: delta >= 0,
          };
        })
      );
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const getTickerPrice = (symbol) => {
    const holding = investments.holdings.find(h => h.symbol === symbol);
    if (holding) return holding.currentPrice;
    const watched = watchlistPrices.find(w => w.symbol === symbol);
    if (watched) return watched.price;
    return 100.00;
  };

  const handleTradeSubmit = (e) => {
    e.preventDefault();
    if (tradeShares <= 0) {
      alert("Shares must be positive!");
      return;
    }
    const currentPrice = getTickerPrice(tradeSymbol);
    const ok = tradeSecurity(tradeSymbol, tradeAction, Number(tradeShares), currentPrice);
    if (ok) {
      setShowTradeModal(false);
      setTradeShares(1);
    }
  };

  // Chart data calculations
  const cashValue = balances.balance;
  const holdingsValue = investments.holdings.reduce((sum, h) => sum + (h.shares * h.currentPrice), 0);
  const totalWealth = cashValue + holdingsValue;

  const cashPercent = totalWealth > 0 ? (cashValue / totalWealth) * 100 : 100;
  const holdingsPercent = totalWealth > 0 ? (holdingsValue / totalWealth) * 100 : 0;

  return (
    <div className="p-6 min-h-screen" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Investments</h1>
          <p className="text-gray-400 mt-1 text-sm">
            Track stocks, manage holdings, and invest cash balances.
          </p>
        </div>
        <button
          onClick={() => {
            setTradeAction("BUY");
            setShowTradeModal(true);
          }}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-transform hover:scale-105"
          style={{ backgroundColor: "#FF7A1A" }}
        >
          <FiActivity size={16} /> Trade Security
        </button>
      </div>

      <div className="grid grid-cols-12 gap-5">
        {/* Left Column: Holdings Value & Chart */}
        <div className="col-span-12 lg:col-span-8 flex flex-col gap-5">
          {/* Wealth Cards Row */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="rounded-2xl p-5" style={cardStyle}>
              <span className="text-xs text-gray-400 font-medium">Portfolio Holdings</span>
              <h2 className="text-2xl font-bold mt-2" style={{ color: "#FF7A1A" }}>
                ${holdingsValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h2>
            </div>
            <div className="rounded-2xl p-5" style={cardStyle}>
              <span className="text-xs text-gray-400 font-medium">Cash Balance</span>
              <h2 className="text-2xl font-bold mt-2 text-white">
                ${cashValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </h2>
            </div>
            <div className="rounded-2xl p-5" style={cardStyle}>
              <span className="text-xs text-gray-400 font-medium">Total Returns</span>
              <div className="flex items-baseline gap-2 mt-2">
                <h2 className="text-2xl font-bold text-emerald-400">
                  +${investments.totalReturn.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                </h2>
                <span className="text-xs text-emerald-400">({investments.returnPercent.toFixed(2)}%)</span>
              </div>
            </div>
          </div>

          {/* Holdings Table */}
          <div className="rounded-2xl p-6" style={cardStyle}>
            <h3 className="font-semibold text-lg mb-4">Current Holdings</h3>
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse">
                <thead>
                  <tr className="text-gray-400 text-xs border-b border-gray-800/80 pb-3">
                    <th className="py-2 px-1 font-normal">Asset</th>
                    <th className="py-2 px-1 font-normal">Shares</th>
                    <th className="py-2 px-1 font-normal">Avg Cost</th>
                    <th className="py-2 px-1 font-normal">Market Price</th>
                    <th className="py-2 px-1 font-normal">Total Value</th>
                    <th className="py-2 px-1 font-normal">Profit/Loss</th>
                  </tr>
                </thead>
                <tbody>
                  {investments.holdings.map((h, i) => {
                    const value = h.shares * h.currentPrice;
                    const costBasis = h.shares * h.avgPrice;
                    const pl = value - costBasis;
                    const isPlPositive = pl >= 0;

                    return (
                      <tr key={i} className="text-sm border-b border-gray-800/40 last:border-b-0">
                        <td className="py-4 px-1 flex items-center gap-2">
                          <span className="w-8 h-8 rounded-full bg-orange-500/10 flex items-center justify-center text-lg">{h.logo}</span>
                          <div>
                            <div className="font-semibold text-white">{h.symbol}</div>
                            <div className="text-gray-500 text-[10px]">{h.name}</div>
                          </div>
                        </td>
                        <td className="py-4 px-1 align-middle">{h.shares}</td>
                        <td className="py-4 px-1 align-middle">${h.avgPrice.toFixed(2)}</td>
                        <td className="py-4 px-1 align-middle">${h.currentPrice.toFixed(2)}</td>
                        <td className="py-4 px-1 align-middle font-semibold">${value.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}</td>
                        <td className={`py-4 px-1 align-middle font-medium ${isPlPositive ? "text-emerald-400" : "text-red-400"}`}>
                          {isPlPositive ? "+" : ""}${pl.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>

        {/* Right Column: Asset Allocation Donut Chart & Watchlist */}
        <div className="col-span-12 lg:col-span-4 flex flex-col gap-5">
          {/* Donut Chart Component */}
          <div className="rounded-2xl p-6" style={cardStyle}>
            <h3 className="font-semibold text-base mb-4">Asset Allocation</h3>
            <div className="flex items-center justify-center py-2 relative">
              <svg width="150" height="150" viewBox="0 0 42 42" className="transform -rotate-90">
                {/* Background Ring */}
                <circle cx="21" cy="21" r="15.915" fill="transparent" stroke="#333" strokeWidth="4.5" />
                {/* Cash Segment */}
                <circle
                  cx="21"
                  cy="21"
                  r="15.915"
                  fill="transparent"
                  stroke="#FF7A1A"
                  strokeWidth="4.5"
                  strokeDasharray={`${cashPercent} ${100 - cashPercent}`}
                  strokeDashoffset="0"
                />
                {/* Securities Segment */}
                <circle
                  cx="21"
                  cy="21"
                  r="15.915"
                  fill="transparent"
                  stroke="#8B5CF6"
                  strokeWidth="4.5"
                  strokeDasharray={`${holdingsPercent} ${100 - holdingsPercent}`}
                  strokeDashoffset={100 - cashPercent}
                />
              </svg>
              <div className="absolute flex flex-col items-center justify-center">
                <span className="text-[10px] text-gray-400 font-bold uppercase">Wealth</span>
                <span className="text-sm font-black text-white">${totalWealth.toLocaleString(undefined, { maximumFractionDigits: 0 })}</span>
              </div>
            </div>
            <div className="flex justify-around mt-4 text-xs">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#FF7A1A" }} />
                <span className="text-gray-400">Cash Wallet ({cashPercent.toFixed(0)}%)</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: "#8B5CF6" }} />
                <span className="text-gray-400">Holdings ({holdingsPercent.toFixed(0)}%)</span>
              </div>
            </div>
          </div>

          {/* Watchlist Card */}
          <div className="rounded-2xl p-6" style={cardStyle}>
            <h3 className="font-semibold text-base mb-4">Market Watchlist</h3>
            <div className="space-y-4">
              {watchlistPrices.map((item, idx) => (
                <div key={idx} className="flex justify-between items-center border-b border-gray-800/40 pb-3 last:border-b-0 last:pb-0">
                  <div>
                    <h4 className="text-xs font-bold text-white">{item.symbol}</h4>
                    <p className="text-[10px] text-gray-500">{item.name}</p>
                  </div>

                  {/* Sparkline canvas placeholder */}
                  <div className="w-16 h-6 flex items-center justify-center opacity-70">
                    <svg width="60" height="20" viewBox="0 0 60 20">
                      <path
                        d={item.isPositive ? "M0 15 Q 15 5, 30 12 T 60 5" : "M0 5 Q 15 15, 30 8 T 60 15"}
                        fill="none"
                        stroke={item.isPositive ? "#10B981" : "#EF4444"}
                        strokeWidth="1.5"
                      />
                    </svg>
                  </div>

                  <div className="text-right">
                    <div className="text-xs font-black text-white">${item.price.toFixed(2)}</div>
                    <span className={`inline-flex items-center gap-0.5 text-[9px] font-bold ${
                      item.isPositive ? "text-emerald-400" : "text-red-400"
                    }`}>
                      {item.isPositive ? "+" : ""}{item.change}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Trade overlay Modal */}
      {showTradeModal && (
        <div className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="w-full max-w-sm rounded-2xl p-6 relative" style={cardStyle}>
            <button
              onClick={() => setShowTradeModal(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white transition-colors"
            >
              <FiX size={20} />
            </button>
            <h3 className="font-bold text-xl mb-4 flex items-center gap-2">
              <FiActivity className="text-orange-500" /> Execute Trade
            </h3>

            {/* Selector Tabs: BUY or SELL */}
            <div className="grid grid-cols-2 rounded-xl p-1 mb-4" style={{ backgroundColor: "#222222" }}>
              <button
                type="button"
                onClick={() => setTradeAction("BUY")}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  tradeAction === "BUY" ? "bg-orange-500 text-white" : "text-gray-400"
                }`}
              >
                BUY
              </button>
              <button
                type="button"
                onClick={() => setTradeAction("SELL")}
                className={`py-2 text-xs font-bold rounded-lg transition-all ${
                  tradeAction === "SELL" ? "bg-orange-500 text-white" : "text-gray-400"
                }`}
              >
                SELL
              </button>
            </div>

            <form onSubmit={handleTradeSubmit} className="space-y-4">
              <div>
                <label className="block text-xs text-gray-400 mb-1 font-medium">Select Ticker Asset</label>
                <select
                  value={tradeSymbol}
                  onChange={(e) => setTradeSymbol(e.target.value)}
                  className="w-full px-3 py-2 rounded-xl text-xs bg-gray-900 border border-gray-700 outline-none text-white focus:border-orange-500/50"
                >
                  <option value="TSLA">TSLA (Tesla Inc) - ${getTickerPrice("TSLA")}</option>
                  <option value="AAPL">AAPL (Apple Inc) - ${getTickerPrice("AAPL")}</option>
                  <option value="BTC">BTC (Bitcoin) - ${getTickerPrice("BTC")}</option>
                  <option value="MSFT">MSFT (Microsoft Corp) - ${getTickerPrice("MSFT")}</option>
                  <option value="AMZN">AMZN (Amazon Inc) - ${getTickerPrice("AMZN")}</option>
                  <option value="NVDA">NVDA (NVIDIA Corp) - ${getTickerPrice("NVDA")}</option>
                </select>
              </div>

              <div>
                <label className="block text-xs text-gray-400 mb-1 font-medium">Number of Shares / Units</label>
                <input
                  type="number"
                  step="any"
                  min="0.0001"
                  value={tradeShares}
                  onChange={(e) => setTradeShares(e.target.value)}
                  required
                  className="w-full px-3 py-2 rounded-xl text-xs bg-gray-900 border border-gray-700 outline-none text-white focus:border-orange-500/50"
                />
              </div>

              {/* Estimate summary */}
              <div className="p-3.5 rounded-xl text-xs space-y-2" style={innerCardStyle}>
                <div className="flex justify-between">
                  <span className="text-gray-400">Total Price Estimate</span>
                  <span className="font-bold text-white">
                    ${(Number(tradeShares || 0) * getTickerPrice(tradeSymbol)).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-gray-400">Available Wallet Cash</span>
                  <span className="font-semibold text-gray-300">${cashValue.toLocaleString(undefined, { minimumFractionDigits: 2 })}</span>
                </div>
              </div>

              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-2.5 rounded-xl font-bold text-xs text-white hover:opacity-90 active:scale-95 transition-all"
                  style={{ backgroundColor: "#FF7A1A" }}
                >
                  Submit Order
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
