import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../utils/api";
import Modal from "./Modal";

function AllExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null); // To keep track of the selected expense

  useEffect(() => {
    fetchExpenses();
  }, []);

  const fetchExpenses = async () => {
    try {
      const response = await api.get("/expenses");
      setExpenses(response.data);
    } catch (error) {
      toast.error("Failed to fetch expenses");
    }
  };

  const handleDelete = async (id) => {
    try {
      await api.delete(`/expenses/${id}`);
      toast.success("Expense deleted successfully");
      fetchExpenses(); // Refresh the expenses list
      closeModal(); // Close the modal after deletion
    } catch (error) {
      toast.error("Failed to delete expense");
    }
  };

  const openModal = (id) => {
    setSelectedExpenseId(id);
    setModalVisibility(true);
  };

  const closeModal = () => {
    setModalVisibility(false);
    setSelectedExpenseId(null); // Clear the selected expense ID
  };

  return (
    <div className="all-expenses">
      <h2>All Expenses</h2>
      {expenses.length === 0 ? (
        <div className="no-expense-text">
          <p>No expenses to show.</p>
          {/* <button>Add new expense</button> */}
        </div>
      ) : (
        <ul>
          {expenses.map((expense) => (
            <li key={expense._id}>
              <span>{expense.description}</span>
              <span>{expense.amount}</span>
              <span>{new Date(expense.date).toLocaleString()}</span>
              <button onClick={() => openModal(expense._id)}>Delete</button>
            </li>
          ))}
        </ul>
      )}

      {modalVisibility && (
        <Modal
          onConfirm={() => handleDelete(selectedExpenseId)}
          onCancel={closeModal}
        />
      )}
    </div>
  );
}

export default AllExpenses;
