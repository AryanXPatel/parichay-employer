import { Eye, Lock, MoreHorizontal, Star } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { type Candidate } from '../../data/schema'
import { useCandidates } from '../candidates-provider'

interface ActionsCellProps {
  candidate: Candidate
}

export function ActionsCell({ candidate }: ActionsCellProps) {
  const { setSelectedCandidate, setUnlockOpen, setSheetOpen } = useCandidates()

  const handlePreview = () => {
    setSelectedCandidate(candidate)
    setSheetOpen(true)
  }

  const handleUnlock = () => {
    setSelectedCandidate(candidate)
    setUnlockOpen(true)
  }

  const handleShortlist = () => {
    setSelectedCandidate(candidate)
    // Shortlist action - could update state or call API
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant='ghost' size='icon' className='size-8'>
          <MoreHorizontal className='size-4' />
          <span className='sr-only'>Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align='end'>
        <DropdownMenuItem onClick={handlePreview}>
          <Eye className='size-4' />
          View Profile
        </DropdownMenuItem>
        <DropdownMenuItem onClick={handleShortlist}>
          <Star className='size-4' />
          Shortlist
        </DropdownMenuItem>
        {!candidate.isUnlocked && (
          <>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleUnlock}>
              <Lock className='size-4' />
              Unlock ({candidate.creditCost} credits)
            </DropdownMenuItem>
          </>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
