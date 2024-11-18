import React from "react";
import "./Modal.css";

type ModalProps = {
  isVisible: boolean;
  message: string;
  onClose: () => void;
};

const Modal: React.FC<ModalProps> = ({ isVisible, message, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <p>{message}</p>
        <button onClick={onClose}>Close</button>
      </div>
    </div>
  );
};

export default Modal;
