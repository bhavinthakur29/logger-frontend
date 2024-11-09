import React from "react";
import "./modal.css";

const Modal = ({ onConfirm, onCancel }) => {
  return (
    <div className="modal-overlay" onClick={onCancel}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <p>Are you sure you want to delete this expense entry?</p>
        <div className="modal-buttons">
          <button onClick={onConfirm}>
            <i className="fa-solid fa-check"></i>
          </button>
          <button onClick={onCancel}>
            <i className="fa-solid fa-xmark"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
