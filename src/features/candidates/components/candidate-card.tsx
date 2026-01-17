import { MapPin, Briefcase, Coins, ShieldCheck, ShieldAlert, ShieldX } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from '@/components/ui/card'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { type Candidate, maskLastName } from '../data/schema'
import { cn } from '@/lib/utils'

interface CandidateCardProps {
  candidate: Candidate
  onView: (candidate: Candidate) => void
  onShortlist?: (candidate: Candidate) => void
  isShortlisted?: boolean
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

export function CandidateCard({
  candidate,
  onView,
}: CandidateCardProps) {
  const verification = verificationConfig[candidate.verificationStatus]
  const VerificationIcon = verification.icon
  const displayName = candidate.isUnlocked
    ? `${candidate.firstName} ${candidate.lastName}`
    : `${candidate.firstName} ${maskLastName(candidate.lastName)}`

  const maxVisibleSkills = 4
  const visibleSkills = candidate.skills.slice(0, maxVisibleSkills)
  const remainingSkills = candidate.skills.length - maxVisibleSkills

  return (
    <Card className='flex flex-col hover:border-primary/50 transition-colors'>
      <CardHeader className='pb-3'>
        <div className='flex items-start gap-3'>
          <Avatar className='size-12'>
            <AvatarFallback className='text-sm'>
              {candidate.firstName.charAt(0)}
              {candidate.lastName.charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div className='flex-1 min-w-0'>
            <div className='flex items-center gap-2'>
              <h3 className='font-semibold truncate'>{displayName}</h3>
              <Tooltip>
                <TooltipTrigger>
                  <div className={cn('rounded-full p-1', verification.bgColor)}>
                    <VerificationIcon className={cn('size-3.5', verification.color)} />
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{verification.label}</p>
                  {candidate.documentsVerified.length > 0 && (
                    <p className='text-xs text-muted-foreground'>
                      Documents: {candidate.documentsVerified.join(', ')}
                    </p>
                  )}
                </TooltipContent>
              </Tooltip>
            </div>
            <p className='text-sm text-muted-foreground truncate'>
              {candidate.title}
            </p>
          </div>
        </div>
      </CardHeader>

      <CardContent className='flex-1 space-y-3'>
        <div className='flex flex-wrap gap-1.5'>
          {visibleSkills.map((skill) => (
            <Badge key={skill} variant='secondary' className='text-xs'>
              {skill}
            </Badge>
          ))}
          {remainingSkills > 0 && (
            <Badge variant='outline' className='text-xs'>
              +{remainingSkills}
            </Badge>
          )}
        </div>

        <div className='space-y-1.5 text-sm text-muted-foreground'>
          <div className='flex items-center gap-2'>
            <Briefcase className='size-4 shrink-0' />
            <span>{candidate.experienceYears} years experience</span>
          </div>
          <div className='flex items-center gap-2'>
            <MapPin className='size-4 shrink-0' />
            <span className='truncate'>{candidate.currentLocation}</span>
          </div>
        </div>

        <div className='space-y-1'>
          <div className='flex items-center justify-between text-xs'>
            <span className='text-muted-foreground'>Profile Score</span>
            <span className='font-medium'>{candidate.profileScore}%</span>
          </div>
          <div className='h-1.5 bg-secondary rounded-full overflow-hidden'>
            <div
              className={cn(
                'h-full rounded-full transition-all',
                candidate.profileScore >= 80
                  ? 'bg-green-500'
                  : candidate.profileScore >= 60
                    ? 'bg-amber-500'
                    : 'bg-red-500'
              )}
              style={{ width: `${candidate.profileScore}%` }}
            />
          </div>
        </div>
      </CardContent>

      <CardFooter className='pt-3 border-t'>
        <div className='flex items-center justify-between w-full'>
          <div className='flex items-center gap-1.5 text-sm'>
            <Coins className='size-4 text-amber-500' />
            <span className='font-semibold'>{candidate.creditCost}</span>
            <span className='text-muted-foreground'>credits</span>
          </div>
          <Button size='sm' onClick={() => onView(candidate)}>
            View Profile
          </Button>
        </div>
      </CardFooter>
    </Card>
  )
}
