import { format } from 'date-fns'
import { Check, Coins, CreditCard, Sparkles, Zap } from 'lucide-react'
import { useCreditsStore } from '@/stores/credits-store'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import { Separator } from '@/components/ui/separator'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { EmployerHeader } from '@/components/employer-header'
import { Main } from '@/components/layout/main'

const plans = [
  {
    name: 'Starter',
    price: 2999,
    credits: 50,
    features: [
      '50 credits/month',
      'Basic search filters',
      'Email support',
      'Profile previews',
    ],
    popular: false,
  },
  {
    name: 'Professional',
    price: 7999,
    credits: 150,
    features: [
      '150 credits/month',
      'Advanced search filters',
      'Priority support',
      'Unlimited previews',
      'Download profiles',
      'Team access (3 users)',
    ],
    popular: true,
  },
  {
    name: 'Enterprise',
    price: 19999,
    credits: 500,
    features: [
      '500 credits/month',
      'All Professional features',
      'Dedicated account manager',
      'Custom integrations',
      'API access',
      'Unlimited team members',
    ],
    popular: false,
  },
]

const usageHistory = [
  {
    date: new Date('2025-01-15'),
    action: 'Unlocked profile',
    candidate: 'Aarav S.',
    credits: 15,
  },
  {
    date: new Date('2025-01-14'),
    action: 'Unlocked profile',
    candidate: 'Priya M.',
    credits: 12,
  },
  {
    date: new Date('2025-01-13'),
    action: 'Unlocked profile',
    candidate: 'Vivaan K.',
    credits: 18,
  },
  {
    date: new Date('2025-01-12'),
    action: 'Unlocked profile',
    candidate: 'Ananya P.',
    credits: 14,
  },
  {
    date: new Date('2025-01-10'),
    action: 'Unlocked profile',
    candidate: 'Arjun R.',
    credits: 16,
  },
]

export function Credits() {
  const { balance, planName, planType, expiryDate, usageThisMonth } =
    useCreditsStore()

  const formatDate = (date: Date | null) => {
    if (!date) return 'N/A'
    return format(new Date(date), 'dd MMM yyyy')
  }

  return (
    <>
      <EmployerHeader />

      <Main>
        <div className='mb-6'>
          <h1 className='text-2xl font-bold tracking-tight'>Credits & Plans</h1>
          <p className='text-muted-foreground'>
            Manage your credits and subscription plan
          </p>
        </div>

        <div className='grid gap-6 lg:grid-cols-3'>
          <Card className='lg:col-span-1'>
            <CardHeader>
              <CardTitle className='flex items-center gap-2'>
                <Coins className='size-5' />
                Current Balance
              </CardTitle>
            </CardHeader>
            <CardContent className='space-y-4'>
              <div className='text-center'>
                <p className='text-5xl font-bold'>{balance}</p>
                <p className='text-muted-foreground'>credits remaining</p>
              </div>
              <Separator />
              <div className='space-y-2 text-sm'>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Current Plan</span>
                  <Badge variant='secondary'>{planName}</Badge>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Renews</span>
                  <span>{formatDate(expiryDate)}</span>
                </div>
              </div>
              <Separator />
              <div className='space-y-2 text-sm'>
                <p className='font-medium'>This Month</p>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Searches</span>
                  <span>{usageThisMonth.searches}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Profile Views</span>
                  <span>{usageThisMonth.views}</span>
                </div>
                <div className='flex justify-between'>
                  <span className='text-muted-foreground'>Unlocks</span>
                  <span>{usageThisMonth.unlocks}</span>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button className='w-full'>
                <CreditCard className='me-2 size-4' />
                Buy More Credits
              </Button>
            </CardFooter>
          </Card>

          <div className='space-y-6 lg:col-span-2'>
            <div>
              <h2 className='mb-4 text-lg font-semibold'>Available Plans</h2>
              <div className='grid gap-4 md:grid-cols-3'>
                {plans.map((plan) => (
                  <Card
                    key={plan.name}
                    className={cn(
                      'relative',
                      plan.popular && 'border-primary',
                      planType === plan.name.toLowerCase() && 'bg-muted/50'
                    )}
                  >
                    {plan.popular && (
                      <Badge className='absolute -top-2 left-1/2 -translate-x-1/2'>
                        <Sparkles className='me-1 size-3' />
                        Popular
                      </Badge>
                    )}
                    <CardHeader className='pb-2'>
                      <CardTitle className='text-lg'>{plan.name}</CardTitle>
                      <CardDescription>
                        <span className='text-2xl font-bold text-foreground'>
                          {plan.price.toLocaleString('en-IN', {
                            style: 'currency',
                            currency: 'INR',
                            maximumFractionDigits: 0,
                          })}
                        </span>
                        <span className='text-muted-foreground'>/month</span>
                      </CardDescription>
                    </CardHeader>
                    <CardContent className='space-y-2'>
                      {plan.features.map((feature) => (
                        <div
                          key={feature}
                          className='flex items-start gap-2 text-sm'
                        >
                          <Check className='mt-0.5 size-4 shrink-0 text-green-500' />
                          <span>{feature}</span>
                        </div>
                      ))}
                    </CardContent>
                    <CardFooter>
                      <Button
                        variant={
                          planType === plan.name.toLowerCase()
                            ? 'outline'
                            : 'default'
                        }
                        className='w-full'
                        disabled={planType === plan.name.toLowerCase()}
                      >
                        {planType === plan.name.toLowerCase() ? (
                          'Current Plan'
                        ) : (
                          <>
                            <Zap className='me-1 size-4' />
                            Upgrade
                          </>
                        )}
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className='mt-8'>
          <h2 className='mb-4 text-lg font-semibold'>Usage History</h2>
          <Card>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Action</TableHead>
                  <TableHead>Candidate</TableHead>
                  <TableHead className='text-right'>Credits</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usageHistory.map((item, index) => (
                  <TableRow key={index}>
                    <TableCell>{format(item.date, 'dd MMM yyyy')}</TableCell>
                    <TableCell>{item.action}</TableCell>
                    <TableCell>{item.candidate}</TableCell>
                    <TableCell className='text-right font-medium'>
                      -{item.credits}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </Card>
        </div>
      </Main>
    </>
  )
}
