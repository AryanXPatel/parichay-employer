import {
  MapPin,
  Briefcase,
  GraduationCap,
  Clock,
  IndianRupee,
  Mail,
  Phone,
  ShieldCheck,
  ShieldAlert,
  ShieldX,
  Heart,
  Unlock,
} from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog'
import { Separator } from '@/components/ui/separator'
import { useCandidates } from './candidates-provider'
import { maskEmail, maskPhone, maskLastName } from '../data/schema'
import { cn } from '@/lib/utils'

interface CandidatePreviewDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

const verificationConfig = {
  verified: {
    icon: ShieldCheck,
    color: 'text-green-600',
    bgColor: 'bg-green-100 dark:bg-green-900/30',
    label: 'Verified',
  },
  partially_verified: {
    icon: ShieldAlert,
    color: 'text-amber-600',
    bgColor: 'bg-amber-100 dark:bg-amber-900/30',
    label: 'Partially Verified',
  },
  unverified: {
    icon: ShieldX,
    color: 'text-gray-400',
    bgColor: 'bg-gray-100 dark:bg-gray-900/30',
    label: 'Unverified',
  },
}

export function CandidatePreviewDialog({
  open,
  onOpenChange,
}: CandidatePreviewDialogProps) {
  const { selectedCandidate, setUnlockOpen } = useCandidates()

  if (!selectedCandidate) return null

  const candidate = selectedCandidate
  const verification = verificationConfig[candidate.verificationStatus]
  const VerificationIcon = verification.icon

  const displayName = candidate.isUnlocked
    ? `${candidate.firstName} ${candidate.lastName}`
    : `${candidate.firstName} ${maskLastName(candidate.lastName)}`

  const displayEmail = candidate.isUnlocked
    ? candidate.email
    : maskEmail(candidate.email || '')

  const displayPhone = candidate.isUnlocked
    ? candidate.phone
    : maskPhone(candidate.phone || '')

  const handleUnlock = () => {
    onOpenChange(false)
    setUnlockOpen(true)
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className='max-w-2xl max-h-[90vh] overflow-y-auto'>
        <DialogHeader>
          <div className='flex items-start gap-4'>
            <Avatar className='size-16'>
              <AvatarFallback className='text-lg'>
                {candidate.firstName.charAt(0)}
                {candidate.lastName.charAt(0)}
              </AvatarFallback>
            </Avatar>
            <div className='flex-1'>
              <div className='flex items-center gap-2'>
                <DialogTitle className='text-xl'>{displayName}</DialogTitle>
                <div className={cn('rounded-full p-1', verification.bgColor)}>
                  <VerificationIcon className={cn('size-4', verification.color)} />
                </div>
              </div>
              <DialogDescription className='text-base'>
                {candidate.title}
              </DialogDescription>
              <div className='mt-2 flex items-center gap-2 text-sm text-muted-foreground'>
                <MapPin className='size-4' />
                <span>{candidate.currentLocation}</span>
              </div>
            </div>
          </div>
        </DialogHeader>

        <div className='space-y-6'>
          <div>
            <h4 className='font-medium mb-2'>Skills</h4>
            <div className='flex flex-wrap gap-2'>
              {candidate.skills.map((skill) => (
                <Badge key={skill} variant='secondary'>
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <Separator />

          <div className='grid gap-4 sm:grid-cols-2'>
            <div className='space-y-3'>
              <h4 className='font-medium'>Experience & Education</h4>
              <div className='space-y-2 text-sm'>
                <div className='flex items-center gap-2'>
                  <Briefcase className='size-4 text-muted-foreground' />
                  <span>{candidate.experienceYears} years experience</span>
                </div>
                <div className='flex items-center gap-2'>
                  <GraduationCap className='size-4 text-muted-foreground' />
                  <span>
                    {candidate.highestEducation} - {candidate.educationInstitution}
                  </span>
                </div>
                <div className='flex items-center gap-2'>
                  <Clock className='size-4 text-muted-foreground' />
                  <span>Notice: {candidate.noticePeriod}</span>
                </div>
              </div>
            </div>

            <div className='space-y-3'>
              <h4 className='font-medium'>Salary</h4>
              <div className='space-y-2 text-sm'>
                {candidate.currentSalary && (
                  <div className='flex items-center gap-2'>
                    <IndianRupee className='size-4 text-muted-foreground' />
                    <span>Current: {candidate.currentSalary} LPA</span>
                  </div>
                )}
                <div className='flex items-center gap-2'>
                  <IndianRupee className='size-4 text-muted-foreground' />
                  <span>Expected: {candidate.expectedSalary} LPA</span>
                </div>
              </div>
            </div>
          </div>

          <Separator />

          <div>
            <h4 className='font-medium mb-2'>Contact Information</h4>
            <div className='space-y-2 text-sm'>
              <div className='flex items-center gap-2'>
                <Mail className='size-4 text-muted-foreground' />
                <span className={!candidate.isUnlocked ? 'blur-sm select-none' : ''}>
                  {displayEmail}
                </span>
                {!candidate.isUnlocked && (
                  <Badge variant='outline' className='text-xs'>
                    Unlock to view
                  </Badge>
                )}
              </div>
              <div className='flex items-center gap-2'>
                <Phone className='size-4 text-muted-foreground' />
                <span className={!candidate.isUnlocked ? 'blur-sm select-none' : ''}>
                  {displayPhone}
                </span>
                {!candidate.isUnlocked && (
                  <Badge variant='outline' className='text-xs'>
                    Unlock to view
                  </Badge>
                )}
              </div>
            </div>
          </div>

          {candidate.documentsVerified.length > 0 && (
            <>
              <Separator />
              <div>
                <h4 className='font-medium mb-2'>Verified Documents</h4>
                <div className='flex flex-wrap gap-2'>
                  {candidate.documentsVerified.map((doc) => (
                    <Badge key={doc} variant='outline' className='gap-1'>
                      <ShieldCheck className='size-3 text-green-500' />
                      {doc}
                    </Badge>
                  ))}
                </div>
              </div>
            </>
          )}
        </div>

        <DialogFooter className='gap-2 sm:gap-0'>
          <Button variant='outline' className='gap-2'>
            <Heart className='size-4' />
            Shortlist
          </Button>
          {!candidate.isUnlocked && (
            <Button onClick={handleUnlock} className='gap-2'>
              <Unlock className='size-4' />
              Unlock for {candidate.creditCost} Credits
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
