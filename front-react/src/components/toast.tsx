import { CheckCircle, X, AlertCircle } from "lucide-react"
import { useEffect, useState } from "react"

interface ToastProps {
  message: string
  type?: 'success' | 'error'
  duration?: number
  onClose: () => void
}

export function Toast({ message, type = 'success', duration = 3000, onClose }: ToastProps) {
  const [isVisible, setIsVisible] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsVisible(false)
      setTimeout(onClose, 300) // Espera a animação terminar antes de remover
    }, duration)

    return () => clearTimeout(timer)
  }, [duration, onClose])

  return (
    <div 
      className={`fixed bottom-4 right-4 z-50 flex items-center gap-3 px-4 py-3 rounded-lg shadow-lg transition-all duration-300 ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2'
      } ${
        type === 'success' ? 'bg-zinc-800 border border-blue-400' : 'bg-zinc-800 border border-red-500'
      }`}
    >
      {type === 'success' ? (
        <CheckCircle className="size-5 text-blue-400" />
      ) : (
        <AlertCircle className="size-5 text-red-500" />
      )}
      <p className="text-zinc-100">{message}</p>
      <button 
        onClick={() => {
          setIsVisible(false)
          setTimeout(onClose, 300)
        }}
        className="ml-2 text-zinc-400 hover:text-zinc-100"
      >
        <X className="size-4" />
      </button>
    </div>
  )
}

// Componente para gerenciar múltiplos toasts
interface ToastManagerProps {
  toasts: Array<{
    id: string
    message: string
    type: 'success' | 'error'
  }>
  removeToast: (id: string) => void
}

export function ToastManager({ toasts, removeToast }: ToastManagerProps) {
  return (
    <>
      {toasts.map((toast) => (
        <Toast
          key={toast.id}
          message={toast.message}
          type={toast.type}
          onClose={() => removeToast(toast.id)}
        />
      ))}
    </>
  )
} 