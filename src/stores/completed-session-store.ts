'use client'

import { create } from 'zustand'

type CompletedSessionState = {
  /** Set of session keys that just completed a response */
  justCompletedKeys: Set<string>
  markCompleted: (sessionKey: string) => void
  clearCompleted: (sessionKey: string) => void
}

export const useCompletedSessionStore = create<CompletedSessionState>(
  (set, get) => ({
    justCompletedKeys: new Set<string>(),
    markCompleted: (sessionKey: string) => {
      set((state) => {
        const next = new Set(state.justCompletedKeys)
        next.add(sessionKey)
        return { justCompletedKeys: next }
      })
      // Auto-clear after 3s
      setTimeout(() => {
        get().clearCompleted(sessionKey)
      }, 3000)
    },
    clearCompleted: (sessionKey: string) => {
      set((state) => {
        const next = new Set(state.justCompletedKeys)
        next.delete(sessionKey)
        return { justCompletedKeys: next }
      })
    },
  }),
)