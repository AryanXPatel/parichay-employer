import { Eye, MessageCircle, Search, Unlock } from 'lucide-react'
import { useCreditsStore } from '@/stores/credits-store'
import { cn } from '@/lib/utils'

interface FunnelStep {
  label: string
  value: number
  icon: React.ElementType
  color: string
}

export function ConversionFunnel() {
  const { usageThisMonth } = useCreditsStore()

  const steps: FunnelStep[] = [
    {
      label: 'Searches',
      value: usageThisMonth.searches,
      icon: Search,
      color: 'bg-blue-500',
    },
    {
      label: 'Views',
      value: usageThisMonth.views,
      icon: Eye,
      color: 'bg-purple-500',
    },
    {
      label: 'Unlocks',
      value: usageThisMonth.unlocks,
      icon: Unlock,
      color: 'bg-amber-500',
    },
    {
      label: 'Contacted',
      value: usageThisMonth.contacted,
      icon: MessageCircle,
      color: 'bg-green-500',
    },
  ]

  const getConversionRate = (current: number, previous: number) => {
    if (previous === 0) return 0
    return Math.round((current / previous) * 100)
  }

  return (
    <div className='space-y-4'>
      {steps.map((step, index) => {
        const previousStep = index > 0 ? steps[index - 1] : null
        const conversionRate = previousStep
          ? getConversionRate(step.value, previousStep.value)
          : 100
        const widthPercent =
          index === 0 ? 100 : (step.value / steps[0].value) * 100

        return (
          <div key={step.label} className='space-y-1'>
            <div className='flex items-center justify-between text-sm'>
              <div className='flex items-center gap-2'>
                <step.icon className='size-4 text-muted-foreground' />
                <span className='font-medium'>{step.label}</span>
              </div>
              <div className='flex items-center gap-2'>
                <span className='font-bold'>{step.value}</span>
                {previousStep && (
                  <span className='text-xs text-muted-foreground'>
                    ({conversionRate}%)
                  </span>
                )}
              </div>
            </div>
            <div className='h-6 w-full overflow-hidden rounded-md bg-muted'>
              <div
                className={cn(
                  'h-full transition-all duration-500',
                  step.color
                )}
                style={{ width: `${Math.max(widthPercent, 5)}%` }}
              />
            </div>
          </div>
        )
      })}

      <div className='mt-4 border-t pt-4'>
        <div className='flex items-center justify-between text-sm'>
          <span className='text-muted-foreground'>Overall Conversion</span>
          <span className='font-bold text-green-600'>
            {getConversionRate(
              usageThisMonth.contacted,
              usageThisMonth.searches
            )}
            %
          </span>
        </div>
        <p className='mt-1 text-xs text-muted-foreground'>
          From search to contact
        </p>
      </div>
    </div>
  )
}
