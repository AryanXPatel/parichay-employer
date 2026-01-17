import { ShieldAlert, ShieldCheck, ShieldX } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { type VerificationStatus } from '../../data/schema'

interface VerificationCellProps {
  status: VerificationStatus
}

const statusConfig: Record<
  VerificationStatus,
  { label: string; icon: React.ElementType; className: string }
> = {
  verified: {
    label: 'Verified',
    icon: ShieldCheck,
    className: 'bg-green-100 text-green-700 hover:bg-green-100',
  },
  partially_verified: {
    label: 'Partial',
    icon: ShieldAlert,
    className: 'bg-amber-100 text-amber-700 hover:bg-amber-100',
  },
  unverified: {
    label: 'Unverified',
    icon: ShieldX,
    className: 'bg-gray-100 text-gray-600 hover:bg-gray-100',
  },
}

export function VerificationCell({ status }: VerificationCellProps) {
  const config = statusConfig[status]
  const Icon = config.icon

  return (
    <Badge variant='secondary' className={cn('gap-1', config.className)}>
      <Icon className='size-3' />
      {config.label}
    </Badge>
  )
}
