import React from "react";
import { useFinance } from "../context/FinanceContext";
import { FiDownload, FiDollarSign, FiBarChart2, FiPieChart, FiGrid } from "react-icons/fi";

const cardStyle = { backgroundColor: "var(--card-bg)" };
const innerCardStyle = { backgroundColor: "var(--card-inner)" };

export default function Reports() {
  const { balances, transactions } = useFinance();

  const handleExportCSV = () => {
    // Generate simple CSV content of transactions
    const headers = "Name,Category,Account,Transaction ID,Date,Time,Amount,Status\n";
    const rows = transactions.map((t) => 
      `"${t.name}","${t.category}","${t.account}","'${t.id}","${t.date}","${t.time}","${t.amount}","${t.status}"`
    ).join("\n");
    
    const csvContent = "data:text/csv;charset=utf-8," + encodeURIComponent(headers + rows);
    const link = document.createElement("a");
    link.setAttribute("href", csvContent);
    link.setAttribute("download", `Fynix_Financial_Report_${new Date().toISOString().slice(0, 10)}.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // Group expenditure by category for visualization
  const categoryTotals = transactions.reduce((acc, t) => {
    const isExpense = !t.isPositive;
    if (isExpense) {
      const amount = parseFloat(t.amount.replace(/[-\$+]/g, ""));
      const cat = t.category.toLowerCase();
      acc[cat] = (acc[cat] || 0) + amount;
    }
    return acc;
  }, {});

  const totalExpense = Object.values(categoryTotals).reduce((sum, v) => sum + v, 0) || balances.expenses;

  return (
    <div className="p-6 min-h-screen" style={{ backgroundColor: "var(--bg-color)", color: "var(--text-color)" }}>
      {/* Header */}
      <div className="flex flex-wrap justify-between items-center gap-4 mb-6">
        <div>
          <h1 className="text-3xl font-bold">Financial Reports</h1>
          <p className="text-gray-400 mt-1 text-sm">
            Analyze income statement charts, cash flow breakdowns, and export data.
          </p>
        </div>
        <button
          onClick={handleExportCSV}
          className="flex items-center gap-2 px-5 py-2.5 rounded-full font-medium text-sm transition-transform hover:scale-105"
          style={{ backgroundColor: "#FF7A1A" }}
        >
          <FiDownload size={16} /> Export CSV Report
        </button>
      </div>

      <div className="grid grid-cols-12 gap-5">
        {/* Left Side: Summary Cards & Chart */}
        <div className="col-span-12 lg:col-span-7 flex flex-col gap-5">
          {/* Detailed stats grids */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-xl p-4" style={cardStyle}>
              <span className="text-[10px] text-gray-400 font-bold uppercase">Income</span>
              <h4 className="text-base font-bold mt-1 text-emerald-400">${balances.income.toLocaleString()}</h4>
            </div>
            <div className="rounded-xl p-4" style={cardStyle}>
              <span className="text-[10px] text-gray-400 font-bold uppercase">Expenses</span>
              <h4 className="text-base font-bold mt-1 text-red-400">${balances.expenses.toLocaleString()}</h4>
            </div>
            <div className="rounded-xl p-4" style={cardStyle}>
              <span className="text-[10px] text-gray-400 font-bold uppercase">Savings</span>
              <h4 className="text-base font-bold mt-1 text-blue-400">${balances.savings.toLocaleString()}</h4>
            </div>
            <div className="rounded-xl p-4" style={cardStyle}>
              <span className="text-[10px] text-gray-400 font-bold uppercase">Cash Balance</span>
              <h4 className="text-base font-bold mt-1 style={{ color: '#FF7A1A' }}">${balances.balance.toLocaleString()}</h4>
            </div>
          </div>

          {/* Bar Chart representing last 6 months */}
          <div className="rounded-2xl p-6" style={cardStyle}>
            <h3 className="font-semibold text-base mb-6 flex items-center gap-2">
              <FiBarChart2 className="text-orange-500" /> Cash Flow History
            </h3>
            
            <div className="relative h-44 flex items-end justify-around border-b border-gray-700 pb-2">
              {[
                { month: "Sep", income: 18000, expense: 12000 },
                { month: "Oct", income: 25000, expense: 15000 },
                { month: "Nov", income: 22000, expense: 19000 },
                { month: "Dec", income: 29000, expense: 16000 },
                { month: "Jan", income: balances.income, expense: balances.expenses },
              ].map((data, idx) => {
                const maxVal = 35000;
                const incHeight = (data.income / maxVal) * 100;
                const expHeight = (data.expense / maxVal) * 100;

                return (
                  <div key={idx} className="flex flex-col items-center gap-2 w-14">
                    <div className="flex gap-1.5 items-end h-32 w-full justify-center">
                      {/* Income bar */}
                      <div
                        className="w-3 rounded-t-sm transition-all duration-500"
                        style={{ height: `${incHeight}%`, backgroundColor: "#FFE5B4" }}
                        title={`Income: $${data.income}`}
                      />
                      {/* Expense bar */}
                      <div
                        className="w-3 rounded-t-sm transition-all duration-500"
                        style={{ height: `${expHeight}%`, backgroundColor: "#FF7A1A" }}
                        title={`Expense: $${data.expense}`}
                      />
                    </div>
                    <span className="text-[10px] text-gray-400 font-bold">{data.month}</span>
                  </div>
                );
              })}
            </div>

            <div className="flex gap-4 justify-center mt-4 text-[10px]">
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "#FFE5B4" }} />
                <span className="text-gray-400">Monthly Income</span>
              </div>
              <div className="flex items-center gap-1">
                <span className="w-2.5 h-2.5 rounded-sm" style={{ backgroundColor: "#FF7A1A" }} />
                <span className="text-gray-400">Monthly Expenses</span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side: Categorical Breakdown */}
        <div className="col-span-12 lg:col-span-5 flex flex-col gap-5">
          <div className="rounded-2xl p-6" style={cardStyle}>
            <h3 className="font-semibold text-base mb-4 flex items-center gap-2">
              <FiPieChart className="text-orange-500" /> Expenses Categories
            </h3>

            <div className="space-y-4">
              {Object.entries(categoryTotals).map(([cat, val], idx) => {
                const percent = totalExpense > 0 ? (val / totalExpense) * 100 : 0;
                return (
                  <div key={idx} className="border-b border-gray-800/40 pb-3.5 last:border-b-0 last:pb-0">
                    <div className="flex justify-between text-xs font-semibold mb-1">
                      <span className="capitalize text-white">{cat}</span>
                      <span className="text-gray-300">${val.toFixed(2)} ({percent.toFixed(0)}%)</span>
                    </div>
                    <div className="w-full h-1.5 rounded-full overflow-hidden bg-gray-800">
                      <div
                        className="h-full rounded-full"
                        style={{ width: `${percent}%`, backgroundColor: "#FF7A1A" }}
                      />
                    </div>
                  </div>
                );
              })}

              {Object.keys(categoryTotals).length === 0 && (
                <div className="text-xs text-gray-500 text-center py-6">
                  No recorded expenses in recent transactions.
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
