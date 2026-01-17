import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export type PlanType = 'free' | 'starter' | 'professional' | 'enterprise'

interface UsageStats {
  searches: number
  views: number
  unlocks: number
}

interface CreditState {
  balance: number
  expiryDate: Date | null
  planName: string
  planType: PlanType
  usageThisMonth: UsageStats
  deductCredits: (amount: number) => boolean
  addCredits: (amount: number) => void
  incrementUsage: (type: keyof UsageStats) => void
  reset: () => void
}

const initialState = {
  balance: 150,
  expiryDate: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000), // 30 days from now
  planName: 'Professional',
  planType: 'professional' as PlanType,
  usageThisMonth: {
    searches: 45,
    views: 23,
    unlocks: 8,
  },
}

export const useCreditsStore = create<CreditState>()(
  persist(
    (set, get) => ({
      ...initialState,
      deductCredits: (amount: number) => {
        const { balance } = get()
        if (balance >= amount) {
          set({ balance: balance - amount })
          return true
        }
        return false
      },
      addCredits: (amount: number) => {
        set((state) => ({ balance: state.balance + amount }))
      },
      incrementUsage: (type: keyof UsageStats) => {
        set((state) => ({
          usageThisMonth: {
            ...state.usageThisMonth,
            [type]: state.usageThisMonth[type] + 1,
          },
        }))
      },
      reset: () => set(initialState),
    }),
    {
      name: 'parichay-credits',
    }
  )
)
