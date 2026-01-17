import { Link } from '@tanstack/react-router'
import { Heart, Search, Trash2 } from 'lucide-react'
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
import { EmployerHeader } from '@/components/employer-header'
import { Main } from '@/components/layout/main'
import { useCandidatesStore } from '@/stores/candidates-store'
import { mockCandidates } from '@/features/candidates/data/mock-candidates'
import { maskLastName } from '@/features/candidates/data/schema'

export function Shortlist() {
  const { shortlisted, removeFromShortlist } = useCandidatesStore()

  const shortlistedCandidates = mockCandidates.filter((c) =>
    shortlisted.includes(c.id)
  )

  return (
    <>
      <EmployerHeader />

      <Main>
        <div className='mb-6'>
          <h1 className='text-2xl font-bold tracking-tight'>Shortlist</h1>
          <p className='text-muted-foreground'>
            Candidates you've saved for later
          </p>
        </div>

        {shortlistedCandidates.length === 0 ? (
          <Card>
            <CardContent className='flex flex-col items-center justify-center py-16'>
              <div className='flex size-16 items-center justify-center rounded-full bg-muted mb-4'>
                <Heart className='size-8 text-muted-foreground' />
              </div>
              <CardTitle className='mb-2'>No candidates shortlisted</CardTitle>
              <CardDescription className='text-center mb-6'>
                Start exploring candidates and add them to your shortlist
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
              <CardTitle>Shortlisted Candidates ({shortlistedCandidates.length})</CardTitle>
            </CardHeader>
            <CardContent>
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead>Candidate</TableHead>
                    <TableHead>Title</TableHead>
                    <TableHead>Experience</TableHead>
                    <TableHead>Location</TableHead>
                    <TableHead>Status</TableHead>
                    <TableHead className='text-right'>Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {shortlistedCandidates.map((candidate) => (
                    <TableRow key={candidate.id}>
                      <TableCell>
                        <div className='flex items-center gap-3'>
                          <Avatar className='size-8'>
                            <AvatarFallback className='text-xs'>
                              {candidate.firstName.charAt(0)}
                              {candidate.lastName.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                          <span className='font-medium'>
                            {candidate.firstName} {maskLastName(candidate.lastName)}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell>{candidate.title}</TableCell>
                      <TableCell>{candidate.experienceYears} years</TableCell>
                      <TableCell>{candidate.currentLocation}</TableCell>
                      <TableCell>
                        {candidate.isUnlocked ? (
                          <Badge variant='default'>Unlocked</Badge>
                        ) : (
                          <Badge variant='secondary'>Locked</Badge>
                        )}
                      </TableCell>
                      <TableCell className='text-right'>
                        <Button
                          variant='ghost'
                          size='icon'
                          onClick={() => removeFromShortlist(candidate.id)}
                        >
                          <Trash2 className='size-4 text-destructive' />
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
