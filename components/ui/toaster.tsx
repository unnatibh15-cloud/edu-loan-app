"use client"

import * as React from "react"
import {
  Toast,
  ToastClose,
  ToastDescription,
  ToastProvider,
  ToastTitle,
  ToastViewport,
} from "@/components/ui/toast"

// =========================================================================
// 🧠 EMBEDDED HOOK LOGIC (No external @/hooks/use-toast file needed anymore!)
// =========================================================================
const TOAST_LIMIT = 1
const TOAST_REMOVE_DELAY = 10000

interface ToasterToast {
  id: string
  title?: React.ReactNode
  description?: React.ReactNode
  action?: React.ReactNode
  open?: boolean
  onOpenChange?: (open: boolean) => void
}

let count = 0
function generateId() {
  count = (count + 1) % Number.MAX_SAFE_INTEGER
  return count.toString()
}

const listeners: Array<(state: { toasts: ToasterToast[] }) => void> = []
let memoryState: { toasts: ToasterToast[] } = { toasts: [] }

function dispatch(action: any) {
  if (action.type === "ADD_TOAST") {
    memoryState = { toasts: [action.toast, ...memoryState.toasts].slice(0, TOAST_LIMIT) }
  } else if (action.type === "DISMISS_TOAST") {
    memoryState = {
      toasts: memoryState.toasts.map((t) =>
        t.id === action.toastId || action.toastId === undefined ? { ...t, open: false } : t
      ),
    }
  } else if (action.type === "REMOVE_TOAST") {
    memoryState = { toasts: action.toastId === undefined ? [] : memoryState.toasts.filter((t) => t.id !== action.toastId) }
  }
  listeners.forEach((listener) => listener(memoryState))
}

export function useToast() {
  const [state, setState] = React.useState(memoryState)

  React.useEffect(() => {
    listeners.push(setState)
    return () => {
      const index = listeners.indexOf(setState)
      if (index > -1) listeners.splice(index, 1)
    }
  }, [state])

  return {
    ...state,
    toast(props: Omit<ToasterToast, "id">) {
      const id = generateId()
      const dismiss = () => dispatch({ type: "DISMISS_TOAST", toastId: id })
      dispatch({
        type: "ADD_TOAST",
        toast: { ...props, id, open: true, onOpenChange: (open: boolean) => { if (!open) dismiss() } },
      })
      return { id, dismiss }
    },
    dismiss: (toastId?: string) => dispatch({ type: "DISMISS_TOAST", toastId }),
  }
}

// =========================================================================
// 🎨 UI TOASTER COMPONENT
// =========================================================================
export function Toaster() {
  const { toasts } = useToast()

  return (
    <ToastProvider>
      {toasts.map(function (toast: ToasterToast) {
        const { id, title, description, action, ...props } = toast
        return (
          <Toast key={id} {...props}>
            <div className="grid gap-1">
              {title && <ToastTitle>{title}</ToastTitle>}
              {description && (
                <ToastDescription>{description}</ToastDescription>
              )}
            </div>
            {action}
            <ToastClose />
          </Toast>
        )
      })}
      <ToastViewport />
    </ToastProvider>
  )
}