import { formatDistanceToNow } from 'date-fns'
import { Link } from '@tanstack/react-router'
import { MessageSquare, Search, Unlock } from 'lucide-react'
import { useCandidatesStore } from '@/stores/candidates-store'
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
import { ContactActions } from '@/components/contact-actions'
import { EmployerHeader } from '@/components/employer-header'
import { Main } from '@/components/layout/main'
import { mockCandidates } from '@/features/candidates/data/mock-candidates'

export function UnlockedProfiles() {
  const { unlocked } = useCandidatesStore()

  const unlockedCandidates = mockCandidates.filter((c) =>
    unlocked.includes(c.id)
  )

  return (
    <>
      <EmployerHeader />

      <Main>
        <div className='mb-6'>
          <h1 className='text-2xl font-bold tracking-tight'>
            Unlocked Profiles
          </h1>
          <p className='text-muted-foreground'>
            Candidates whose contact details you've unlocked
          </p>
        </div>

        {unlockedCandidates.length === 0 ? (
          <Card>
            <CardContent className='flex flex-col items-center justify-center py-16'>
              <div className='mb-4 flex size-16 items-center justify-center rounded-full bg-muted'>
                <Unlock className='size-8 text-muted-foreground' />
              </div>
              <CardTitle className='mb-2'>No profiles unlocked yet</CardTitle>
              <CardDescription className='mb-6 text-center'>
                Unlock candidate profiles to view their full contact information
              </CardDescription>
              <Button asChild>
                <Link to='/candidates'>
                  <Search className='me-2 size-4' />
                  Find Candidates
                </Link>
              </Button>
            </CardContent>
          </Card>
        ) : (
          <Card>
            <CardHeader>
              <CardTitle>
                Unlocked Profiles ({unlockedCandidates.length})
              </CardTitle>
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
                    <TableHead>Contact</TableHead>
                    <TableHead className='text-right'>Message</TableHead>
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
                      <TableCell className='text-sm text-muted-foreground'>
                        {formatDistanceToNow(candidate.lastActive, {
                          addSuffix: true,
                        })}
                      </TableCell>
                      <TableCell>
                        <ContactActions
                          candidate={candidate}
                          variant='compact'
                        />
                      </TableCell>
                      <TableCell className='text-right'>
                        <Button variant='outline' size='sm' asChild>
                          <Link
                            to='/chats'
                            search={{ candidateId: candidate.id }}
                          >
                            <MessageSquare className='me-2 size-4' />
                            Message
                          </Link>
                        </Button>
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
