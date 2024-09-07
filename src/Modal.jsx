import React from "react";

function Modal({ isOpen, onClose, children }) {
  return (
    <>
      {isOpen && (
        <div
          className={`fixed z-50 inset-0 flex items-center justify-center overflow-y-auto bg-black bg-opacity-50`}
          onClick={onClose}
        >
          <div
            className={`relative bg-white rounded-lg shadow-lg w-full max-w-lg p-6`}
            onClick={(e) => e.stopPropagation()}
          >
            {children}
            <button
              className="absolute top-0 right-0 px-2 py-1 m-2 rounded border text-gray-500 hover:text-gray-700"
              onClick={onClose}
            >
             X
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Modal;
