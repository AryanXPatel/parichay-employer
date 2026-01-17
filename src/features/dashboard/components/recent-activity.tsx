import { formatDistanceToNow } from 'date-fns'
import { Search, Eye, Unlock, Heart, UserPlus } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'

type ActivityType = 'search' | 'view' | 'unlock' | 'shortlist' | 'invite'

interface Activity {
  id: string
  type: ActivityType
  description: string
  candidateName?: string
  timestamp: Date
}

const activityIcons: Record<ActivityType, React.ElementType> = {
  search: Search,
  view: Eye,
  unlock: Unlock,
  shortlist: Heart,
  invite: UserPlus,
}

const activityColors: Record<ActivityType, string> = {
  search: 'bg-blue-100 text-blue-600 dark:bg-blue-900 dark:text-blue-400',
  view: 'bg-purple-100 text-purple-600 dark:bg-purple-900 dark:text-purple-400',
  unlock: 'bg-green-100 text-green-600 dark:bg-green-900 dark:text-green-400',
  shortlist: 'bg-pink-100 text-pink-600 dark:bg-pink-900 dark:text-pink-400',
  invite: 'bg-amber-100 text-amber-600 dark:bg-amber-900 dark:text-amber-400',
}

const mockActivities: Activity[] = [
  {
    id: '1',
    type: 'unlock',
    description: 'Unlocked profile',
    candidateName: 'Aarav S.',
    timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: '2',
    type: 'shortlist',
    description: 'Added to shortlist',
    candidateName: 'Priya M.',
    timestamp: new Date(Date.now() - 5 * 60 * 60 * 1000),
  },
  {
    id: '3',
    type: 'search',
    description: 'Searched for React developers in Bangalore',
    timestamp: new Date(Date.now() - 8 * 60 * 60 * 1000),
  },
  {
    id: '4',
    type: 'view',
    description: 'Viewed profile',
    candidateName: 'Vivaan K.',
    timestamp: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: '5',
    type: 'unlock',
    description: 'Unlocked profile',
    candidateName: 'Ananya P.',
    timestamp: new Date(Date.now() - 48 * 60 * 60 * 1000),
  },
]

export function RecentActivity() {
  return (
    <div className='space-y-4'>
      {mockActivities.map((activity) => {
        const Icon = activityIcons[activity.type]
        return (
          <div key={activity.id} className='flex items-start gap-3'>
            <Avatar className={`size-9 ${activityColors[activity.type]}`}>
              <AvatarFallback className='bg-transparent'>
                <Icon className='size-4' />
              </AvatarFallback>
            </Avatar>
            <div className='flex-1 space-y-1'>
              <p className='text-sm leading-none font-medium'>
                {activity.description}
                {activity.candidateName && (
                  <span className='text-muted-foreground'>
                    {' '}
                    - {activity.candidateName}
                  </span>
                )}
              </p>
              <p className='text-xs text-muted-foreground'>
                {formatDistanceToNow(activity.timestamp, { addSuffix: true })}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
