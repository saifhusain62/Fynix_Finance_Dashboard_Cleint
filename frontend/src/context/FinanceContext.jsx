import React, { createContext, useState, useContext, useEffect } from "react";

const FinanceContext = createContext(null);

export function useFinance() {
  return useContext(FinanceContext);
}

export function FinanceProvider({ children }) {
  // Theme state
  const [darkTheme, setDarkTheme] = useState(true);

  useEffect(() => {
    if (darkTheme) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkTheme]);

  // User details
  const [user, setUser] = useState({
    name: "Kabir",
    email: "kabir@fynix.com",
    avatar: "https://i.pravatar.cc/100?img=12",
  });

  // Balances
  const [balances, setBalances] = useState({
    balance: 75662.05,
    revenue: 25562.05,
    income: 25662.05,
    savings: 15662.05,
    expenses: 5662.05,
    limitUsed: 2350,
    limitMax: 3050,
  });

  // Transactions
  const [transactions, setTransactions] = useState([
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
  ]);

  // Credit Cards
  const [cards, setCards] = useState([
    {
      id: "1",
      name: "Platinum Visa Card",
      number: "1234 5678 9101 1121",
      mask: "1234xxxxxx1121",
      type: "VISA",
      expiry: "12/28",
      balance: 15200.00,
      limit: 20000,
      isLocked: false,
      color: "linear-gradient(135deg, #FF9B4D 0%, #FF7A1A 50%, #E05600 100%)",
    },
    {
      id: "2",
      name: "Unlimited Mastercard",
      number: "4561 7890 1234 6651",
      mask: "4561xxxxxx6651",
      type: "Mastercard",
      expiry: "05/29",
      balance: 8400.00,
      limit: 15000,
      isLocked: false,
      color: "linear-gradient(135deg, #8B5CF6 0%, #6D28D9 100%)",
    },
    {
      id: "3",
      name: "Visa Card",
      number: "6811 5678 9101 6865",
      mask: "6811xxxxxx6865",
      type: "VISA",
      expiry: "09/27",
      balance: 1962.05,
      limit: 5000,
      isLocked: true,
      color: "linear-gradient(135deg, #10B981 0%, #059669 100%)",
    },
  ]);

  // Investments State
  const [investments, setInvestments] = useState({
    portfolioValue: 84200.00,
    totalReturn: 14200.00,
    returnPercent: 20.28,
    holdings: [
      { name: "Tesla Inc", symbol: "TSLA", shares: 50, avgPrice: 180.00, currentPrice: 220.00, change: 4.25, isPositive: true, logo: "⚡" },
      { name: "Apple Inc", symbol: "AAPL", shares: 120, avgPrice: 150.00, currentPrice: 175.00, change: -1.15, isPositive: false, logo: "🍎" },
      { name: "Bitcoin", symbol: "BTC", shares: 0.5, avgPrice: 42000.00, currentPrice: 62000.00, change: 8.50, isPositive: true, logo: "🪙" },
    ],
    watchlist: [
      { name: "Microsoft Corp", symbol: "MSFT", price: 420.50, change: 1.25, isPositive: true },
      { name: "Amazon.com Inc", symbol: "AMZN", price: 185.30, change: -0.85, isPositive: false },
      { name: "NVIDIA Corp", symbol: "NVDA", price: 125.40, change: 3.40, isPositive: true },
    ],
  });

  // Savings Goals
  const [savingsGoals, setSavingsGoals] = useState([
    { id: "1", name: "New Car", target: 45000, saved: 20250, color: "#FF7A1A" },
    { id: "2", name: "New House Rent", target: 10000, saved: 2500, color: "#3B82F6" },
    { id: "3", name: "New Phone", target: 1000, saved: 600, color: "#10B981" },
    { id: "4", name: "New PC", target: 3000, saved: 300, color: "#8B5CF6" },
  ]);

  // Audit Logs (Activities)
  const [activities, setActivities] = useState([
    { id: "1", type: "System", message: "Account created successfully", timestamp: "01 Jan 2026 at 09:00 am" },
    { id: "2", type: "Transfer", message: "Initial balance synchronized", timestamp: "01 Jan 2026 at 10:00 am" },
    { id: "3", type: "Security", message: "Visa Card status set to Locked", timestamp: "02 Jan 2026 at 11:30 am" },
  ]);

  // Add Log helper
  const addLog = (type, message) => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase();
    const newLog = {
      id: Math.random().toString(),
      type,
      message,
      timestamp: `${dateStr} at ${timeStr}`,
    };
    setActivities((prev) => [newLog, ...prev]);
  };

  // Add transaction helper
  const addTransaction = (name, category, accountName, amountNum, isPositive) => {
    const now = new Date();
    const dateStr = now.toLocaleDateString('en-US', { day: '2-digit', month: 'short', year: 'numeric' });
    const timeStr = now.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true }).toLowerCase();

    const tx = {
      name,
      category,
      account: accountName,
      id: Math.floor(100000000000 + Math.random() * 900000000000).toString(),
      date: dateStr,
      time: `at ${timeStr}`,
      amount: `${isPositive ? "+" : "-"}$${amountNum.toFixed(2)}`,
      isPositive,
      status: "Success",
    };

    setTransactions((prev) => [tx, ...prev]);

    // Update balances
    setBalances((prev) => {
      const diff = isPositive ? amountNum : -amountNum;
      const newBal = prev.balance + diff;
      const newIncome = isPositive ? prev.income + amountNum : prev.income;
      const newExpenses = !isPositive ? prev.expenses + amountNum : prev.expenses;
      return {
        ...prev,
        balance: newBal,
        income: newIncome,
        expenses: newExpenses,
      };
    });

    addLog("Transfer", `Transaction: ${name} (${tx.amount}) via ${accountName}`);
  };

  // Helper actions
  const deposit = (amount, account) => {
    addTransaction("Deposit Cash", "income", account || "Cash Wallet", amount, true);
  };

  const withdraw = (amount, account) => {
    if (balances.balance < amount) {
      alert("Insufficient general balance!");
      return false;
    }
    addTransaction("Withdraw Cash", "Expense", account || "Cash Wallet", amount, false);
    return true;
  };

  const transferFunds = (recipientName, amount, account) => {
    if (balances.balance < amount) {
      alert("Insufficient general balance!");
      return false;
    }
    addTransaction(`Transfer to ${recipientName}`, "Expense", account || "Platinum Visa Card", amount, false);
    return true;
  };

  const addCard = (cardDetails) => {
    const newCard = {
      id: Math.random().toString(),
      name: cardDetails.name || "Default Card",
      number: cardDetails.number || "0000 0000 0000 0000",
      mask: (cardDetails.number || "0000 0000 0000 0000").replace(/\s/g, '').replace(/(\d{4})\d{8}(\d{4})/, '$1xxxxxx$2'),
      type: cardDetails.type || "VISA",
      expiry: cardDetails.expiry || "12/30",
      balance: cardDetails.balance || 0,
      limit: cardDetails.limit || 5000,
      isLocked: false,
      color: cardDetails.color || "linear-gradient(135deg, #FFB347 0%, #FF7A1A 100%)",
    };

    setCards((prev) => [...prev, newCard]);
    addLog("System", `Added new card: ${newCard.name} ending in ${newCard.number.slice(-4)}`);
  };

  const toggleCardLock = (cardId) => {
    setCards((prev) =>
      prev.map((c) => {
        if (c.id === cardId) {
          const locked = !c.isLocked;
          addLog("Security", `Card ${c.name} set to ${locked ? "Locked" : "Unlocked"}`);
          return { ...c, isLocked: locked };
        }
        return c;
      })
    );
  };

  const updateCardLimit = (cardId, newLimit) => {
    setCards((prev) =>
      prev.map((c) => {
        if (c.id === cardId) {
          addLog("System", `Card ${c.name} limit adjusted to $${newLimit}`);
          return { ...c, limit: newLimit };
        }
        return c;
      })
    );
  };

  const addSavingsGoal = (name, target, color) => {
    const newGoal = {
      id: Math.random().toString(),
      name,
      target,
      saved: 0,
      color: color || "#FF7A1A",
    };
    setSavingsGoals((prev) => [...prev, newGoal]);
    addLog("System", `Created savings goal: "${name}" with target $${target}`);
  };

  const manageGoalFunds = (goalId, amount, isFunding) => {
    let success = false;
    setSavingsGoals((prev) =>
      prev.map((g) => {
        if (g.id === goalId) {
          if (isFunding) {
            if (balances.balance < amount) {
              alert("Insufficient balance in Cash Wallet to fund goal!");
              return g;
            }
            success = true;
            return { ...g, saved: g.saved + amount };
          } else {
            if (g.saved < amount) {
              alert("Insufficient funds in savings goal!");
              return g;
            }
            success = true;
            return { ...g, saved: g.saved - amount };
          }
        }
        return g;
      })
    );

    if (success) {
      setBalances((prev) => {
        const diff = isFunding ? -amount : amount;
        return {
          ...prev,
          balance: prev.balance + diff,
          savings: prev.savings + (isFunding ? amount : -amount),
        };
      });
      const goal = savingsGoals.find(g => g.id === goalId);
      addLog("Transfer", `${isFunding ? "Funded" : "Withdrew"} $${amount} ${isFunding ? "to" : "from"} goal: "${goal?.name || ''}"`);
    }
  };

  const tradeSecurity = (symbol, action, shares, price) => {
    const cost = shares * price;
    if (action === "BUY") {
      if (balances.balance < cost) {
        alert("Insufficient balance to buy securities!");
        return false;
      }

      setBalances((prev) => ({
        ...prev,
        balance: prev.balance - cost,
      }));

      setInvestments((prev) => {
        let exists = false;
        const holdings = prev.holdings.map((h) => {
          if (h.symbol === symbol) {
            exists = true;
            const totalShares = h.shares + shares;
            const totalCost = (h.shares * h.avgPrice) + cost;
            return {
              ...h,
              shares: totalShares,
              avgPrice: totalCost / totalShares,
              currentPrice: price,
            };
          }
          return h;
        });

        if (!exists) {
          holdings.push({
            name: symbol === "TSLA" ? "Tesla Inc" : symbol === "AAPL" ? "Apple Inc" : symbol === "BTC" ? "Bitcoin" : `${symbol} Corp`,
            symbol,
            shares,
            avgPrice: price,
            currentPrice: price,
            change: 0.5,
            isPositive: true,
            logo: symbol === "BTC" ? "🪙" : "📈",
          });
        }

        const holdingValue = holdings.reduce((sum, h) => sum + (h.shares * h.currentPrice), 0);
        const costBasis = holdings.reduce((sum, h) => sum + (h.shares * h.avgPrice), 0);
        const totalReturn = holdingValue - costBasis;
        return {
          ...prev,
          portfolioValue: holdingValue,
          totalReturn,
          returnPercent: costBasis > 0 ? (totalReturn / costBasis) * 100 : 0,
          holdings,
        };
      });

      addTransaction(`Buy Stock: ${symbol}`, "Investments", "Investment Account", cost, false);
      addLog("Transfer", `Bought ${shares} shares of ${symbol} at $${price.toFixed(2)}`);
      return true;
    } else {
      // Sell
      let hasShares = false;
      setInvestments((prev) => {
        const targetHolding = prev.holdings.find(h => h.symbol === symbol);
        if (!targetHolding || targetHolding.shares < shares) {
          alert("Insufficient shares to sell!");
          return prev;
        }

        hasShares = true;

        const holdings = prev.holdings.map((h) => {
          if (h.symbol === symbol) {
            return {
              ...h,
              shares: h.shares - shares,
            };
          }
          return h;
        }).filter(h => h.shares > 0);

        const holdingValue = holdings.reduce((sum, h) => sum + (h.shares * h.currentPrice), 0);
        const costBasis = holdings.reduce((sum, h) => sum + (h.shares * h.avgPrice), 0);
        const totalReturn = holdingValue - costBasis;

        return {
          ...prev,
          portfolioValue: holdingValue,
          totalReturn,
          returnPercent: costBasis > 0 ? (totalReturn / costBasis) * 100 : 0,
          holdings,
        };
      });

      if (hasShares) {
        setBalances((prev) => ({
          ...prev,
          balance: prev.balance + cost,
        }));
        addTransaction(`Sell Stock: ${symbol}`, "income", "Investment Account", cost, true);
        addLog("Transfer", `Sold ${shares} shares of ${symbol} at $${price.toFixed(2)}`);
        return true;
      }
      return false;
    }
  };

  const updateUserProfile = (profileData) => {
    setUser((prev) => ({
      ...prev,
      ...profileData,
    }));
    addLog("System", "Updated user profile settings");
  };

  return (
    <FinanceContext.Provider
      value={{
        darkTheme,
        setDarkTheme,
        user,
        balances,
        transactions,
        cards,
        investments,
        savingsGoals,
        activities,
        deposit,
        withdraw,
        transferFunds,
        addCard,
        toggleCardLock,
        updateCardLimit,
        addSavingsGoal,
        manageGoalFunds,
        tradeSecurity,
        updateUserProfile,
      }}
    >
      {children}
    </FinanceContext.Provider>
  );
}
