import {
  Briefcase,
  Calendar,
  Clock,
  FileCheck,
  GraduationCap,
  Lock,
  Mail,
  MapPin,
  Phone,
  Star,
  TrendingUp,
  Wallet,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { ScrollArea } from '@/components/ui/scroll-area'
import { Separator } from '@/components/ui/separator'
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetFooter,
  SheetHeader,
  SheetTitle,
} from '@/components/ui/sheet'
import { verificationStatuses } from '../data/data'
import {
  type Candidate,
  maskEmail,
  maskLastName,
  maskPhone,
} from '../data/schema'
import { useCandidates } from './candidates-provider'

interface CandidatePreviewSheetProps {
  candidate: Candidate | null
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function CandidatePreviewSheet({
  candidate,
  open,
  onOpenChange,
}: CandidatePreviewSheetProps) {
  const { setUnlockOpen } = useCandidates()

  if (!candidate) {
    return null
  }

  const displayLastName = candidate.isUnlocked
    ? candidate.lastName
    : maskLastName(candidate.lastName)

  const displayEmail = candidate.isUnlocked
    ? candidate.email
    : candidate.email
      ? maskEmail(candidate.email)
      : '****@****.com'

  const displayPhone = candidate.isUnlocked
    ? candidate.phone
    : candidate.phone
      ? maskPhone(candidate.phone)
      : '+91 *****XXXXX'

  const initials = `${candidate.firstName.charAt(0)}${candidate.lastName.charAt(0)}`

  const verificationConfig = verificationStatuses.find(
    (s) => s.value === candidate.verificationStatus
  )

  const handleUnlock = () => {
    setUnlockOpen(true)
  }

  return (
    <Sheet open={open} onOpenChange={onOpenChange}>
      <SheetContent className='w-full sm:max-w-lg'>
        <SheetHeader className='pb-0'>
          <div className='flex items-start gap-4'>
            <Avatar className='size-16'>
              <AvatarImage src={candidate.avatar} alt={candidate.firstName} />
              <AvatarFallback className='text-lg font-medium'>
                {initials}
              </AvatarFallback>
            </Avatar>
            <div className='flex-1'>
              <SheetTitle className='text-xl'>
                {candidate.firstName} {displayLastName}
              </SheetTitle>
              <SheetDescription className='text-base'>
                {candidate.title}
              </SheetDescription>
              <div className='mt-2 flex items-center gap-2'>
                {verificationConfig && (
                  <Badge
                    variant='secondary'
                    className={cn('gap-1', verificationConfig.color)}
                  >
                    <verificationConfig.icon className='size-3' />
                    {verificationConfig.label}
                  </Badge>
                )}
              </div>
            </div>
          </div>
        </SheetHeader>

        <ScrollArea className='flex-1 px-4'>
          <div className='space-y-6 py-4'>
            {/* Skills Section */}
            <div>
              <h4 className='mb-2 text-sm font-medium'>Skills</h4>
              <div className='flex flex-wrap gap-1.5'>
                {candidate.skills.map((skill) => (
                  <Badge key={skill} variant='secondary'>
                    {skill}
                  </Badge>
                ))}
              </div>
            </div>

            <Separator />

            {/* Details Section */}
            <div>
              <h4 className='mb-3 text-sm font-medium'>Details</h4>
              <div className='space-y-3'>
                <DetailRow
                  icon={Briefcase}
                  label='Experience'
                  value={`${candidate.experienceYears} years`}
                />
                <DetailRow
                  icon={MapPin}
                  label='Current Location'
                  value={candidate.currentLocation}
                />
                <DetailRow
                  icon={MapPin}
                  label='Preferred Locations'
                  value={candidate.preferredLocations.join(', ')}
                />
                <DetailRow
                  icon={GraduationCap}
                  label='Education'
                  value={`${candidate.highestEducation} - ${candidate.educationInstitution}`}
                />
                <DetailRow
                  icon={Clock}
                  label='Notice Period'
                  value={candidate.noticePeriod}
                />
                <DetailRow
                  icon={TrendingUp}
                  label='Profile Score'
                  value={`${candidate.profileScore}/100`}
                />
                <DetailRow
                  icon={Calendar}
                  label='Last Active'
                  value={candidate.lastActive.toLocaleDateString()}
                />
              </div>
            </div>

            <Separator />

            {/* Salary Section */}
            <div>
              <h4 className='mb-3 text-sm font-medium'>Compensation</h4>
              <div className='space-y-3'>
                {candidate.currentSalary && (
                  <DetailRow
                    icon={Wallet}
                    label='Current Salary'
                    value={`${candidate.currentSalary} LPA`}
                  />
                )}
                <DetailRow
                  icon={Wallet}
                  label='Expected Salary'
                  value={`${candidate.expectedSalary} LPA`}
                />
              </div>
            </div>

            <Separator />

            {/* Contact Section */}
            <div>
              <h4 className='mb-3 flex items-center gap-2 text-sm font-medium'>
                Contact Information
                {!candidate.isUnlocked && (
                  <Lock className='size-3 text-muted-foreground' />
                )}
              </h4>
              <div className='space-y-3'>
                <DetailRow
                  icon={Mail}
                  label='Email'
                  value={displayEmail || 'Not available'}
                  locked={!candidate.isUnlocked}
                />
                <DetailRow
                  icon={Phone}
                  label='Phone'
                  value={displayPhone || 'Not available'}
                  locked={!candidate.isUnlocked}
                />
              </div>
            </div>

            {/* Documents Section */}
            {candidate.documentsVerified.length > 0 && (
              <>
                <Separator />
                <div>
                  <h4 className='mb-3 text-sm font-medium'>
                    Verified Documents
                  </h4>
                  <div className='flex flex-wrap gap-2'>
                    {candidate.documentsVerified.map((doc) => (
                      <Badge key={doc} variant='outline' className='gap-1'>
                        <FileCheck className='size-3' />
                        {doc}
                      </Badge>
                    ))}
                  </div>
                </div>
              </>
            )}
          </div>
        </ScrollArea>

        <SheetFooter className='flex-row gap-2 border-t pt-4'>
          <Button variant='outline' className='flex-1 gap-2'>
            <Star className='size-4' />
            Shortlist
          </Button>
          {!candidate.isUnlocked ? (
            <Button className='flex-1 gap-2' onClick={handleUnlock}>
              <Lock className='size-4' />
              Unlock ({candidate.creditCost} credits)
            </Button>
          ) : (
            <Button className='flex-1 gap-2'>
              <Mail className='size-4' />
              Contact
            </Button>
          )}
        </SheetFooter>
      </SheetContent>
    </Sheet>
  )
}

interface DetailRowProps {
  icon: React.ElementType
  label: string
  value: string
  locked?: boolean
}

function DetailRow({ icon: Icon, label, value, locked }: DetailRowProps) {
  return (
    <div className='flex items-start gap-3'>
      <Icon className='mt-0.5 size-4 shrink-0 text-muted-foreground' />
      <div className='flex-1'>
        <p className='text-xs text-muted-foreground'>{label}</p>
        <p
          className={cn(
            'text-sm',
            locked && 'blur-[2px] transition-all select-none hover:blur-none'
          )}
        >
          {value}
        </p>
      </div>
    </div>
  )
}
