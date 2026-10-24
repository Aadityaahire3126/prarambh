// src/components/notifications/ToastProvider.jsx
import React, { createContext, useContext, useState } from "react";
import { nanoid } from "nanoid";

const ToastContext = createContext(null);

export const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = useState([]);

  const addToast = (message, type = "info", duration = 3000) => {
    const id = nanoid();
    setToasts((prev) => [...prev, { id, message, type }]);
    // Auto‑remove after duration
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, duration);
  };

  return (
    <ToastContext.Provider value={{ addToast }}>
      {children}
      {/* Toast container */}
      <div className="fixed bottom-4 right-4 flex flex-col space-y-2 z-50">
        {toasts.map((t) => (
          <div
            key={t.id}
            className={`px-4 py-2 rounded shadow-md text-white max-w-xs
                ${t.type === "error" ? "bg-danger" : "bg-primary"}`}
          >
            {t.message}
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
};

export default ToastProvider;

export const useToast = () => useContext(ToastContext);
