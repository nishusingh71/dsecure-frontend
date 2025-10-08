import React, { createContext, useContext, useState, useCallback, useEffect } from 'react'

type Toast = {
  id: string
  message: string
  type?: 'success' | 'error' | 'info'
  duration?: number
}

type ToastContextType = {
  showToast: (message: string, type?: Toast['type'], duration?: number) => void
}

const ToastContext = createContext<ToastContextType | null>(null)

export const useToast = () => {
  const ctx = useContext(ToastContext)
  if (!ctx) throw new Error('useToast must be used within ToastProvider')
  return ctx
}

export const ToastProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [toasts, setToasts] = useState<Toast[]>([])

  const showToast = useCallback((message: string, type: Toast['type'] = 'info', duration = 4000) => {
    const id = Math.random().toString(36).slice(2, 9)
    setToasts((t) => [...t, { id, message, type, duration }])
  }, [])

  const removeToast = useCallback((id: string) => {
    setToasts((t) => t.filter((x) => x.id !== id))
  }, [])

  useEffect(() => {
    if (toasts.length === 0) return
    const timers = toasts.map((toast) =>
      setTimeout(() => removeToast(toast.id), toast.duration)
    )
    return () => timers.forEach(clearTimeout)
  }, [toasts, removeToast])

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}

      {/* Toast Container */}
      <div className="fixed z-50 top-6 right-6 flex flex-col gap-3 w-full max-w-xs pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className={`pointer-events-auto px-4 py-3 rounded-lg shadow-lg text-sm flex items-start gap-3 transition transform duration-200 ease-out ${
              toast.type === 'success' ? 'bg-emerald-600 text-white' : toast.type === 'error' ? 'bg-red-600 text-white' : 'bg-slate-800 text-white'
            }`}
            role="status"
            aria-live="polite"
          >
            <div className="flex-1">
              {toast.message}
            </div>
            <button onClick={() => removeToast(toast.id)} className="opacity-80 hover:opacity-100">
              ✕
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
