import { differenceInDays, format } from 'date-fns'
import { Link } from '@tanstack/react-router'
import {
  Coins,
  Search,
  Eye,
  Unlock,
  Users,
  Heart,
  TrendingUp,
  AlertTriangle,
  ArrowRight,
} from 'lucide-react'
import { useCreditsStore } from '@/stores/credits-store'
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { EmployerHeader } from '@/components/employer-header'
import { Main } from '@/components/layout/main'
import { RecentActivity } from './components/recent-activity'
import { UsageChart } from './components/usage-chart'

export function Dashboard() {
  const { balance, planName, expiryDate, usageThisMonth } = useCreditsStore()
  const isLowBalance = balance < 20
  const isExpiringPlan = expiryDate
    ? differenceInDays(new Date(expiryDate), new Date()) < 7
    : false

  const formatDate = (date: Date | null) => {
    if (!date) return 'N/A'
    return format(new Date(date), 'dd MMM yyyy')
  }

  return (
    <>
      <EmployerHeader />

      <Main>
        <div className='mb-6 space-y-4'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-2xl font-bold tracking-tight'>Dashboard</h1>
              <p className='text-muted-foreground'>
                Welcome back! Here's your recruitment overview.
              </p>
            </div>
          </div>

          {(isLowBalance || isExpiringPlan) && (
            <div className='space-y-2'>
              {isLowBalance && (
                <Alert variant='destructive'>
                  <AlertTriangle className='size-4' />
                  <AlertTitle>Low Credit Balance</AlertTitle>
                  <AlertDescription>
                    You have only {balance} credits remaining.{' '}
                    <Link to='/credits' className='font-medium underline'>
                      Upgrade your plan
                    </Link>{' '}
                    to continue unlocking profiles.
                  </AlertDescription>
                </Alert>
              )}
              {isExpiringPlan && (
                <Alert>
                  <AlertTriangle className='size-4' />
                  <AlertTitle>Plan Expiring Soon</AlertTitle>
                  <AlertDescription>
                    Your {planName} plan expires on {formatDate(expiryDate)}.{' '}
                    <Link to='/credits' className='font-medium underline'>
                      Renew now
                    </Link>{' '}
                    to avoid interruption.
                  </AlertDescription>
                </Alert>
              )}
            </div>
          )}
        </div>

        <div className='grid gap-4 sm:grid-cols-2 lg:grid-cols-4'>
          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Credit Balance
              </CardTitle>
              <Coins className='size-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{balance}</div>
              <div className='mt-2 flex items-center justify-between text-xs text-muted-foreground'>
                <span>{planName} Plan</span>
                <span>Expires: {formatDate(expiryDate)}</span>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Searches This Month
              </CardTitle>
              <Search className='size-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>
                {usageThisMonth.searches}
              </div>
              <p className='flex items-center gap-1 text-xs text-muted-foreground'>
                <TrendingUp className='size-3 text-green-500' />
                +12% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Profiles Viewed
              </CardTitle>
              <Eye className='size-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{usageThisMonth.views}</div>
              <p className='flex items-center gap-1 text-xs text-muted-foreground'>
                <TrendingUp className='size-3 text-green-500' />
                +8% from last month
              </p>
            </CardContent>
          </Card>

          <Card>
            <CardHeader className='flex flex-row items-center justify-between space-y-0 pb-2'>
              <CardTitle className='text-sm font-medium'>
                Profiles Unlocked
              </CardTitle>
              <Unlock className='size-4 text-muted-foreground' />
            </CardHeader>
            <CardContent>
              <div className='text-2xl font-bold'>{usageThisMonth.unlocks}</div>
              <p className='text-xs text-muted-foreground'>
                Avg.{' '}
                {usageThisMonth.unlocks > 0
                  ? Math.round((balance / usageThisMonth.unlocks) * 0.7)
                  : 0}{' '}
                credits/unlock
              </p>
            </CardContent>
          </Card>
        </div>

        <div className='mt-6 grid grid-cols-1 gap-4 lg:grid-cols-7'>
          <Card className='col-span-1 lg:col-span-4'>
            <CardHeader>
              <CardTitle>Usage Overview</CardTitle>
              <CardDescription>
                Your recruitment activity over the past 4 weeks
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UsageChart />
            </CardContent>
          </Card>

          <Card className='col-span-1 lg:col-span-3'>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
              <CardDescription>Your latest recruitment actions</CardDescription>
            </CardHeader>
            <CardContent>
              <RecentActivity />
            </CardContent>
          </Card>
        </div>

        <div className='mt-6 grid gap-4 sm:grid-cols-3'>
          <Card className='group transition-colors hover:border-primary/50'>
            <CardHeader className='pb-3'>
              <div className='flex items-center gap-3'>
                <div className='flex size-10 items-center justify-center rounded-lg bg-primary/10 text-primary'>
                  <Search className='size-5' />
                </div>
                <div>
                  <CardTitle className='text-base'>Search Candidates</CardTitle>
                  <CardDescription>Find verified profiles</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button asChild className='w-full'>
                <Link to='/candidates'>
                  Start Searching
                  <ArrowRight className='ms-2 size-4' />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className='group transition-colors hover:border-primary/50'>
            <CardHeader className='pb-3'>
              <div className='flex items-center gap-3'>
                <div className='flex size-10 items-center justify-center rounded-lg bg-pink-500/10 text-pink-500'>
                  <Heart className='size-5' />
                </div>
                <div>
                  <CardTitle className='text-base'>View Shortlist</CardTitle>
                  <CardDescription>Manage saved candidates</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant='outline' asChild className='w-full'>
                <Link to='/shortlist'>
                  View Shortlist
                  <ArrowRight className='ms-2 size-4' />
                </Link>
              </Button>
            </CardContent>
          </Card>

          <Card className='group transition-colors hover:border-primary/50'>
            <CardHeader className='pb-3'>
              <div className='flex items-center gap-3'>
                <div className='flex size-10 items-center justify-center rounded-lg bg-amber-500/10 text-amber-500'>
                  <Users className='size-5' />
                </div>
                <div>
                  <CardTitle className='text-base'>Invite Team</CardTitle>
                  <CardDescription>Add team members</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <Button variant='outline' asChild className='w-full'>
                <Link to='/settings/team'>
                  Manage Team
                  <ArrowRight className='ms-2 size-4' />
                </Link>
              </Button>
            </CardContent>
          </Card>
        </div>
      </Main>
    </>
  )
}
