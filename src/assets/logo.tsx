import { cn } from '@/lib/utils'

interface LogoProps {
  className?: string
  showText?: boolean
}

export function Logo({ className, showText = true }: LogoProps) {
  return (
    <div className={cn('flex items-center gap-2', className)}>
      <div className='flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground'>
        P
      </div>
      {showText && (
        <span className='text-lg font-semibold tracking-tight'>Parichay</span>
      )}
    </div>
  )
}

export function LogoIcon({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        'flex size-8 items-center justify-center rounded-lg bg-primary text-sm font-bold text-primary-foreground',
        className
      )}
    >
      P
    </div>
  )
}
