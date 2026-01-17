import { type Candidate } from '../data/schema'
import { CandidateCard } from './candidate-card'
import { useCandidates } from './candidates-provider'

interface CandidatesGridProps {
  candidates: Candidate[]
}

export function CandidatesGrid({ candidates }: CandidatesGridProps) {
  const { setSelectedCandidate, setPreviewOpen } = useCandidates()

  const handleView = (candidate: Candidate) => {
    setSelectedCandidate(candidate)
    setPreviewOpen(true)
  }

  if (candidates.length === 0) {
    return (
      <div className='flex flex-col items-center justify-center py-16 text-center'>
        <p className='text-lg font-medium text-muted-foreground'>
          No candidates found
        </p>
        <p className='text-sm text-muted-foreground'>
          Try adjusting your filters to see more results
        </p>
      </div>
    )
  }

  return (
    <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4'>
      {candidates.map((candidate) => (
        <CandidateCard
          key={candidate.id}
          candidate={candidate}
          onView={handleView}
        />
      ))}
    </div>
  )
}
