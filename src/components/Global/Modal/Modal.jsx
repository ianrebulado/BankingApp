import React from "react";
import { XCircle } from "lucide-react";

export default function Modal({ title, setShowModal, children }) {
  const handleClose = () => {
    setShowModal(false);
  };

  return (
    <div className="modal">
      <div className="modal-container">
        <div className="modal-header">
          <div className="modal-title">
            <h1>{title}</h1>
          </div>
          <div className="modal-close">
            <XCircle onClick={handleClose} />
          </div>
        </div>
        <div className="modal-children">{children}</div>
      </div>
    </div>
  );
}
