import { Link } from '@tanstack/react-router'
import { formatDistanceToNow } from 'date-fns'
import { Copy, Mail, Phone, Search, Unlock } from 'lucide-react'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { EmployerHeader } from '@/components/employer-header'
import { Main } from '@/components/layout/main'
import { useCandidatesStore } from '@/stores/candidates-store'
import { mockCandidates } from '@/features/candidates/data/mock-candidates'

export function UnlockedProfiles() {
  const { unlocked } = useCandidatesStore()

  const unlockedCandidates = mockCandidates.filter((c) =>
    unlocked.includes(c.id)
  )

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
  }

  return (
    <>
      <EmployerHeader />

      <Main>
        <div className='mb-6'>
          <h1 className='text-2xl font-bold tracking-tight'>Unlocked Profiles</h1>
          <p className='text-muted-foreground'>
            Candidates whose contact details you've unlocked
          </p>
        </div>

        {unlockedCandidates.length === 0 ? (
          <Card>
            <CardContent className='flex flex-col items-center justify-center py-16'>
              <div className='flex size-16 items-center justify-center rounded-full bg-muted mb-4'>
                <Unlock className='size-8 text-muted-foreground' />
              </div>
              <CardTitle className='mb-2'>No profiles unlocked yet</CardTitle>
              <CardDescription className='text-center mb-6'>
                Unlock candidate profiles to view their full contact information
              </CardDescription>
              <Button asChild>
                <Link to='/candidates'>
                  <Search className='size-4 me-2' />
                  Find Candidates
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>Unlocked Profiles ({unlockedCandidates.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Email</TableHead>
                    <TableHead>Phone</TableHead>
                    <TableHead>Unlocked</TableHead>
                    <TableHead className='text-right'>Quick Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {unlockedCandidates.map((candidate) => (
                    <TableRow key={candidate.id}>
                      <TableCell>
                        <div className='flex items-center gap-3'>
                          <Avatar className='size-8'>
                            <AvatarFallback className='text-xs'>
                              {candidate.firstName.charAt(0)}
                              {candidate.lastName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <div>
                            <span className='font-medium'>
                              {candidate.firstName} {candidate.lastName}
                            </span>
                            <Badge variant='outline' className='ms-2 text-xs'>
                              {candidate.verificationStatus === 'verified'
                                ? 'Verified'
                                : 'Partial'}
                            </Badge>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell>{candidate.title}</TableCell>
                      <TableCell>{candidate.email}</TableCell>
                      <TableCell>{candidate.phone}</TableCell>
                      <TableCell className='text-muted-foreground text-sm'>
                        {formatDistanceToNow(candidate.lastActive, { addSuffix: true })}
                      </TableCell>
                      <TableCell className='text-right'>
                        <div className='flex items-center justify-end gap-1'>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant='ghost'
                                size='icon'
                                onClick={() => copyToClipboard(candidate.email || '')}
                              >
                                <Mail className='size-4' />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Copy Email</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant='ghost'
                                size='icon'
                                onClick={() => copyToClipboard(candidate.phone || '')}
                              >
                                <Phone className='size-4' />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Copy Phone</TooltipContent>
                          </Tooltip>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <Button
                                variant='ghost'
                                size='icon'
                                onClick={() =>
                                  copyToClipboard(
                                    `${candidate.firstName} ${candidate.lastName}\n${candidate.email}\n${candidate.phone}`
                                  )
                                }
                              >
                                <Copy className='size-4' />
                              </Button>
                            </TooltipTrigger>
                            <TooltipContent>Copy All</TooltipContent>
                          </Tooltip>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </CardContent>
          </Card>
        )}
      </Main>
    </>
  )
}
