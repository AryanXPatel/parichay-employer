import { Badge } from '@/components/ui/badge'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'

interface SkillsCellProps {
  skills: string[]
  maxVisible?: number
}

export function SkillsCell({ skills, maxVisible = 3 }: SkillsCellProps) {
  const visibleSkills = skills.slice(0, maxVisible)
  const remainingSkills = skills.slice(maxVisible)
  const hasMore = remainingSkills.length > 0

  return (
    <div className='flex flex-wrap items-center gap-1'>
      {visibleSkills.map((skill) => (
        <Badge key={skill} variant='secondary' className='text-xs'>
          {skill}
        </Badge>
      ))}
      {hasMore && (
        <Tooltip>
          <TooltipTrigger asChild>
            <Badge variant='outline' className='cursor-default text-xs'>
              +{remainingSkills.length} more
            </Badge>
          </TooltipTrigger>
          <TooltipContent side='top' className='max-w-[200px]'>
            <div className='flex flex-wrap gap-1'>
              {remainingSkills.map((skill) => (
                <span key={skill} className='text-xs'>
                  {skill}
                  {remainingSkills.indexOf(skill) < remainingSkills.length - 1
                    ? ', '
                    : ''}
                </span>
              ))}
            </div>
          </TooltipContent>
        </Tooltip>
      )}
    </div>
  )
}
