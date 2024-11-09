import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";
import api from "../../utils/api";
import Modal from "../modal/Modal";

const ExpenseDetailsModal = ({ expense, currency, onClose, onDelete }) => {
  if (!expense) return null;

  return (
    <div className="details-modal-overlay">
      <div className="modal-content">
        <div className="modal-body">
          <div>
            <label>Description</label>
            <p>{expense.description}</p>
          </div>

          <div>
            <label>Amount</label>
            <p>
              {currency} {expense.amount}
            </p>
          </div>

          <div>
            <label>Date</label>
            <p>{new Date(expense.date).toLocaleString()}</p>
          </div>
        </div>

        <div className="modal-footer">
          <button onClick={onClose} className="button button-close">
            Close
          </button>
          <button
            onClick={() => onDelete(expense._id)}
            className="button button-delete"
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

function AllExpenses() {
  const [expenses, setExpenses] = useState([]);
  const [modalVisibility, setModalVisibility] = useState(false);
  const [selectedExpenseId, setSelectedExpenseId] = useState(null);
  const [currency, setCurrency] = useState("");
  const [selectedExpense, setSelectedExpense] = useState(null);
  const [deleteConfirmModal, setDeleteConfirmModal] = useState(false);
  const [totalExpense, setTotalExpense] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [currencyResponse, expensesResponse] = await Promise.all([
          api.get("/profile"),
          api.get("/expenses"),
        ]);
        setCurrency(currencyResponse.data.currency);
        setExpenses(expensesResponse.data);
        calculateTotal(expensesResponse.data);
      } catch (error) {
        toast.error("Failed to fetch data");
      }
    };

    fetchData();
  }, []);

  const calculateTotal = (expenses) => {
    const total = expenses.reduce((acc, expense) => acc + expense.amount, 0);
    setTotalExpense(total);
  };

  const handleDelete = async (id) => {
    setDeleteConfirmModal(true);
    setSelectedExpenseId(id);
    setModalVisibility(false);
  };

  const confirmDelete = async () => {
    try {
      await api.delete(`/expenses/${selectedExpenseId}`);
      toast.success("Expense deleted successfully");
      setExpenses((prevExpenses) => {
        const updatedExpenses = prevExpenses.filter(
          (expense) => expense._id !== selectedExpenseId
        );
        calculateTotal(updatedExpenses);
        return updatedExpenses;
      });
      setDeleteConfirmModal(false);
      setSelectedExpenseId(null);
    } catch (error) {
      toast.error("Failed to delete expense");
    }
  };

  const openDetailsModal = (expense) => {
    setSelectedExpense(expense);
    setModalVisibility(true);
  };

  const closeModal = () => {
    setModalVisibility(false);
    setSelectedExpense(null);
  };

  return (
    <div className="all-expenses">
      <h2>All Expenses</h2>
      <div className="expense-list">
        {expenses.length === 0 ? (
          <div className="no-expenses">
            <i className="fa-solid fa-ghost" />
            <p>No expenses to show.</p>
          </div>
        ) : (
          <ul>
            <li className="ex-item ex-item-header">
              <span className="ex-description">description</span>
              <span className="ex-amount">amount ({currency})</span>
              <span className="ex-date">date</span>
              <span className="ex-delete-btn">remove</span>
            </li>
            {expenses.map((expense) => (
              <li
                className="ex-item"
                key={expense._id}
                onClick={() => openDetailsModal(expense)}
              >
                <span
                  className="ex-description"
                  style={{ fontWeight: "700", fontSize: "17px" }}
                >
                  {expense.description}
                </span>
                <span className="ex-amount">
                  {currency} {expense.amount}
                </span>
                <span className="ex-date">
                  {new Date(expense.date).toLocaleString()}
                </span>
                <button
                  className="ex-delete-btn"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleDelete(expense._id);
                  }}
                >
                  <i className="fa fa-trash" />
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      <div className="total-expense">
        <h3>
          Total: {currency} {totalExpense}
        </h3>
      </div>

      {modalVisibility && (
        <ExpenseDetailsModal
          expense={selectedExpense}
          currency={currency}
          onClose={closeModal}
          onDelete={handleDelete}
        />
      )}

      {deleteConfirmModal && (
        <Modal
          onConfirm={confirmDelete}
          onCancel={() => {
            setDeleteConfirmModal(false);
            setSelectedExpenseId(null);
          }}
        />
      )}
    </div>
  );
}

export default AllExpenses;
