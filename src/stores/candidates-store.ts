import { create } from 'zustand'
import { persist } from 'zustand/middleware'

interface CandidatesState {
  shortlisted: string[]
  unlocked: string[]
  contacted: string[]
  addToShortlist: (id: string) => void
  removeFromShortlist: (id: string) => void
  markAsUnlocked: (id: string) => void
  markAsContacted: (id: string) => void
  isShortlisted: (id: string) => boolean
  isUnlocked: (id: string) => boolean
  isContacted: (id: string) => boolean
}

export const useCandidatesStore = create<CandidatesState>()(
  persist(
    (set, get) => ({
      shortlisted: [],
      unlocked: [],
      contacted: [],
      addToShortlist: (id: string) => {
        set((state) => ({
          shortlisted: state.shortlisted.includes(id)
            ? state.shortlisted
            : [...state.shortlisted, id],
        }))
      },
      removeFromShortlist: (id: string) => {
        set((state) => ({
          shortlisted: state.shortlisted.filter((item) => item !== id),
        }))
      },
      markAsUnlocked: (id: string) => {
        set((state) => ({
          unlocked: state.unlocked.includes(id)
            ? state.unlocked
            : [...state.unlocked, id],
        }))
      },
      markAsContacted: (id: string) => {
        set((state) => ({
          contacted: state.contacted.includes(id)
            ? state.contacted
            : [...state.contacted, id],
        }))
      },
      isShortlisted: (id: string) => {
        return get().shortlisted.includes(id)
      },
      isUnlocked: (id: string) => {
        return get().unlocked.includes(id)
      },
      isContacted: (id: string) => {
        return get().contacted.includes(id)
      },
    }),
    {
      name: 'parichay-candidates',
    }
  )
)
