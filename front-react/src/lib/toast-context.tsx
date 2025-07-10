import { createContext, useContext, useState, ReactNode } from "react";
import { ToastManager } from "../components/toast";

interface Toast {
  id: string;
  message: string;
  type: 'success' | 'error';
}

interface ToastContextData {
  showToast: (message: string, type: 'success' | 'error') => void;
}

const ToastContext = createContext<ToastContextData>({} as ToastContextData);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  function showToast(message: string, type: 'success' | 'error') {
    const id = String(Date.now());
    
    setToasts((prevToasts) => [...prevToasts, { id, message, type }]);
  }

  function removeToast(id: string) {
    setToasts((prevToasts) => prevToasts.filter((toast) => toast.id !== id));
  }

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <ToastManager toasts={toasts} removeToast={removeToast} />
    </ToastContext.Provider>
  );
}

export function useToast() {
  const context = useContext(ToastContext);

  if (!context) {
    throw new Error("useToast must be used within a ToastProvider");
  }

  return context;
} 