import * as React from 'react'
import { type Candidate } from '../data/schema'

interface CandidatesContextType {
  selectedCandidate: Candidate | null
  setSelectedCandidate: (candidate: Candidate | null) => void
  isPreviewOpen: boolean
  setPreviewOpen: (open: boolean) => void
  isUnlockOpen: boolean
  setUnlockOpen: (open: boolean) => void
}

const CandidatesContext = React.createContext<CandidatesContextType | undefined>(
  undefined
)

export function CandidatesProvider({ children }: { children: React.ReactNode }) {
  const [selectedCandidate, setSelectedCandidate] = React.useState<Candidate | null>(null)
  const [isPreviewOpen, setPreviewOpen] = React.useState(false)
  const [isUnlockOpen, setUnlockOpen] = React.useState(false)

  return (
    <CandidatesContext.Provider
      value={{
        selectedCandidate,
        setSelectedCandidate,
        isPreviewOpen,
        setPreviewOpen,
        isUnlockOpen,
        setUnlockOpen,
      }}
    >
      {children}
    </CandidatesContext.Provider>
  )
}

export function useCandidates() {
  const context = React.useContext(CandidatesContext)
  if (!context) {
    throw new Error('useCandidates must be used within a CandidatesProvider')
  }
  return context
}
