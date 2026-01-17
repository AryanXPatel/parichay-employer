import { cn } from '@/lib/utils'
import { Progress } from '@/components/ui/progress'

interface ScoreCellProps {
  score: number
}

function getScoreColor(score: number): string {
  if (score >= 90) return 'text-green-600'
  if (score >= 75) return 'text-blue-600'
  if (score >= 60) return 'text-amber-600'
  return 'text-gray-500'
}

function getProgressColor(score: number): string {
  if (score >= 90) return '[&>div]:bg-green-500'
  if (score >= 75) return '[&>div]:bg-blue-500'
  if (score >= 60) return '[&>div]:bg-amber-500'
  return '[&>div]:bg-gray-400'
}

export function ScoreCell({ score }: ScoreCellProps) {
  return (
    <div className='flex items-center gap-2'>
      <Progress
        value={score}
        className={cn('h-2 w-16', getProgressColor(score))}
      />
      <span className={cn('text-sm font-medium', getScoreColor(score))}>
        {score}
      </span>
    </div>
  )
}
