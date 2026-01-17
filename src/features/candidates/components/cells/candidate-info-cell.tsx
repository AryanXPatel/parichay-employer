import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { type Candidate, maskLastName } from '../../data/schema'

interface CandidateInfoCellProps {
  candidate: Candidate
}

export function CandidateInfoCell({ candidate }: CandidateInfoCellProps) {
  const displayLastName = candidate.isUnlocked
    ? candidate.lastName
    : maskLastName(candidate.lastName)

  const initials = `${candidate.firstName.charAt(0)}${candidate.lastName.charAt(0)}`

  return (
    <div className='flex items-center gap-3'>
      <Avatar className='size-9'>
        <AvatarImage src={candidate.avatar} alt={candidate.firstName} />
        <AvatarFallback className='text-xs font-medium'>
          {initials}
        </AvatarFallback>
      </Avatar>
      <div className='flex flex-col'>
        <span className='font-medium'>
          {candidate.firstName} {displayLastName}
        </span>
        <span className='text-sm text-muted-foreground'>{candidate.title}</span>
      </div>
    </div>
  )
}
