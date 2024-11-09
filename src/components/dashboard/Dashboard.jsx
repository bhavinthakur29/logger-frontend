import React, { useState } from "react";
import AllExpenses from "./AllExpenses";
import AddExpense from "./AddExpense";
import "./dashboard.css";

function Dashboard() {
  const [activeTab, setActiveTab] = useState("all");

  return (
    <div className="dashboard">
      <div className="content">
        <nav className="tab-navigation">
          <button 
            className={`tab-button ${activeTab === "all" ? "active" : ""}`}
            onClick={() => setActiveTab("all")}
          >
            All Expenses
          </button>
          <button
            className={`tab-button ${activeTab === "add" ? "active" : ""}`}
            onClick={() => setActiveTab("add")}
          >
            Add Expense
          </button>
        </nav>
        <div className="tab-content">
          {activeTab === "all" ? <AllExpenses /> : <AddExpense />}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
