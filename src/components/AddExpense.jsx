// src/components/AddExpense.jsx
import React, { useState } from "react";
import { toast } from "react-toastify";
import api from "../utils/api";

function AddExpense() {
  const [amount, setAmount] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/expenses", { amount: parseFloat(amount), description });
      toast.success("Expense added successfully");
      setAmount("");
      setDescription("");
    } catch (error) {
      toast.error("Failed to add expense");
    }
  };

  return (
    <div className="add-expense">
      <h2>Add Expense</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          required
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
        <button type="submit">Add Expense</button>
      </form>
    </div>
  );
}

export default AddExpense;
