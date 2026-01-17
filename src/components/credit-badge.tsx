import { Link } from '@tanstack/react-router'
import { Coins, AlertTriangle } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { useCreditsStore } from '@/stores/credits-store'
import { cn } from '@/lib/utils'

export function CreditBadge() {
  const { balance, planName, expiryDate } = useCreditsStore()
  const isLowBalance = balance < 20

  const formatDate = (date: Date | null) => {
    if (!date) return 'N/A'
    return new Date(date).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    })
  }

  return (
    <Tooltip>
      <TooltipTrigger asChild>
        <Button
          variant='outline'
          size='sm'
          className={cn(
            'gap-2',
            isLowBalance && 'border-amber-500 text-amber-600 dark:text-amber-400'
          )}
          asChild
        >
          <Link to='/credits'>
            {isLowBalance ? (
              <AlertTriangle className='size-4' />
            ) : (
              <Coins className='size-4' />
            )}
            <span className='font-semibold'>{balance}</span>
            <span className='hidden sm:inline'>Credits</span>
          </Link>
        </Button>
      </TooltipTrigger>
      <TooltipContent side='bottom' className='max-w-xs'>
        <div className='space-y-1'>
          <p className='font-medium'>{planName} Plan</p>
          <p className='text-xs text-muted-foreground'>
            Expires: {formatDate(expiryDate)}
          </p>
          {isLowBalance && (
            <p className='text-xs text-amber-400'>
              Low balance! Consider upgrading your plan.
            </p>
          )}
        </div>
      </TooltipContent>
    </Tooltip>
  )
}
