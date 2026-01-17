import { AlertTriangle, Check, Coins, Mail, Phone, User } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { useCandidates } from './candidates-provider'
import { useCreditsStore } from '@/stores/credits-store'
import { useCandidatesStore } from '@/stores/candidates-store'

interface CandidateUnlockDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CandidateUnlockDialog({
  open,
  onOpenChange,
}: CandidateUnlockDialogProps) {
  const { selectedCandidate, setPreviewOpen } = useCandidates()
  const { balance, deductCredits } = useCreditsStore()
  const { markAsUnlocked } = useCandidatesStore()

  if (!selectedCandidate) return null

  const candidate = selectedCandidate
  const hasEnoughCredits = balance >= candidate.creditCost

  const handleUnlock = () => {
    if (deductCredits(candidate.creditCost)) {
      markAsUnlocked(candidate.id)
      onOpenChange(false)
      setPreviewOpen(true)
    }
  }

  const handleCancel = () => {
    onOpenChange(false)
    setPreviewOpen(true)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-md'>
        <DialogHeader>
          <DialogTitle>Unlock Candidate Profile</DialogTitle>
          <DialogDescription>
            Unlock full contact details for {candidate.firstName}
          </DialogDescription>
        </DialogHeader>

        <div className='space-y-4'>
          <div className='flex items-center justify-between rounded-lg border p-4'>
            <div className='flex items-center gap-3'>
              <div className='flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary'>
                <Coins className='size-5' />
              </div>
              <div>
                <p className='font-medium'>Credit Cost</p>
                <p className='text-sm text-muted-foreground'>One-time unlock</p>
              </div>
            </div>
            <p className='text-2xl font-bold'>{candidate.creditCost}</p>
          </div>

          <div className='flex items-center justify-between rounded-lg border p-4'>
            <div>
              <p className='text-sm text-muted-foreground'>Your Balance</p>
              <p className='text-lg font-semibold'>{balance} credits</p>
            </div>
            <div>
              <p className='text-sm text-muted-foreground'>After Unlock</p>
              <p className='text-lg font-semibold'>
                {Math.max(0, balance - candidate.creditCost)} credits
              </p>
            </div>
          </div>

          {!hasEnoughCredits && (
            <Alert variant='destructive'>
              <AlertTriangle className='size-4' />
              <AlertDescription>
                Insufficient credits. You need {candidate.creditCost - balance} more
                credits to unlock this profile.
              </AlertDescription>
            </Alert>
          )}

          <div className='space-y-2'>
            <p className='text-sm font-medium'>What you'll get:</p>
            <div className='space-y-2 text-sm'>
              <div className='flex items-center gap-2 text-muted-foreground'>
                <Check className='size-4 text-green-500' />
                <Mail className='size-4' />
                <span>Full email address</span>
              </div>
              <div className='flex items-center gap-2 text-muted-foreground'>
                <Check className='size-4 text-green-500' />
                <Phone className='size-4' />
                <span>Phone number</span>
              </div>
              <div className='flex items-center gap-2 text-muted-foreground'>
                <Check className='size-4 text-green-500' />
                <User className='size-4' />
                <span>Complete profile access</span>
              </div>
            </div>
          </div>
        </div>

        <DialogFooter className='gap-2 sm:gap-0'>
          <Button variant='outline' onClick={handleCancel}>
            Cancel
          </Button>
          <Button onClick={handleUnlock} disabled={!hasEnoughCredits}>
            {hasEnoughCredits ? 'Confirm Unlock' : 'Insufficient Credits'}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
