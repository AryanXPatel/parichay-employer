import * as React from 'react'
import { LayoutGrid, List } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { EmployerHeader } from '@/components/employer-header'
import { Main } from '@/components/layout/main'
import { CandidatesProvider, useCandidates } from './components/candidates-provider'
import { CandidatesFilters } from './components/candidates-filters'
import { CandidatesGrid } from './components/candidates-grid'
import { CandidatePreviewDialog } from './components/candidate-preview-dialog'
import { CandidateUnlockDialog } from './components/candidate-unlock-dialog'
import { mockCandidates } from './data/mock-candidates'
import { type Candidate } from './data/schema'
import { experienceRanges } from './data/data'

function CandidatesContent() {
  const [viewMode, setViewMode] = React.useState<'grid' | 'table'>('grid')
  const [searchQuery, setSearchQuery] = React.useState('')
  const [selectedVerification, setSelectedVerification] = React.useState<string[]>([])
  const [selectedExperience, setSelectedExperience] = React.useState<string[]>([])
  const [selectedLocations, setSelectedLocations] = React.useState<string[]>([])
  const [selectedSkills, setSelectedSkills] = React.useState<string[]>([])

  const { isPreviewOpen, setPreviewOpen, isUnlockOpen, setUnlockOpen } = useCandidates()

  const filteredCandidates = React.useMemo(() => {
    return mockCandidates.filter((candidate: Candidate) => {
      if (searchQuery) {
        const query = searchQuery.toLowerCase()
        const matchesName =
          candidate.firstName.toLowerCase().includes(query) ||
          candidate.lastName.toLowerCase().includes(query)
        const matchesTitle = candidate.title.toLowerCase().includes(query)
        const matchesSkills = candidate.skills.some((skill) =>
          skill.toLowerCase().includes(query)
        )
        if (!matchesName && !matchesTitle && !matchesSkills) {
          return false
        }
      }

      if (selectedVerification.length > 0) {
        if (!selectedVerification.includes(candidate.verificationStatus)) {
          return false
        }
      }

      if (selectedExperience.length > 0) {
        const range = experienceRanges.find((r) => r.value === selectedExperience[0])
        if (range) {
          if (
            candidate.experienceYears < range.min ||
            candidate.experienceYears > range.max
          ) {
            return false
          }
        }
      }

      if (selectedLocations.length > 0) {
        if (!selectedLocations.includes(candidate.currentLocation)) {
          return false
        }
      }

      if (selectedSkills.length > 0) {
        const hasMatchingSkill = selectedSkills.some((skill) =>
          candidate.skills.includes(skill)
        )
        if (!hasMatchingSkill) {
          return false
        }
      }

      return true
    })
  }, [
    searchQuery,
    selectedVerification,
    selectedExperience,
    selectedLocations,
    selectedSkills,
  ])

  const clearFilters = () => {
    setSearchQuery('')
    setSelectedVerification([])
    setSelectedExperience([])
    setSelectedLocations([])
    setSelectedSkills([])
  }

  return (
    <>
      <EmployerHeader />

      <Main>
        <div className='mb-6 space-y-4'>
          <div className='flex items-center justify-between'>
            <div>
              <h1 className='text-2xl font-bold tracking-tight'>Find Candidates</h1>
              <p className='text-muted-foreground'>
                Search and unlock verified candidate profiles
              </p>
            </div>
            <div className='flex items-center gap-2'>
              <Button
                variant={viewMode === 'grid' ? 'default' : 'outline'}
                size='icon'
                onClick={() => setViewMode('grid')}
              >
                <LayoutGrid className='size-4' />
              </Button>
              <Button
                variant={viewMode === 'table' ? 'default' : 'outline'}
                size='icon'
                onClick={() => setViewMode('table')}
              >
                <List className='size-4' />
              </Button>
            </div>
          </div>

          <CandidatesFilters
            searchQuery={searchQuery}
            onSearchChange={setSearchQuery}
            selectedVerification={selectedVerification}
            onVerificationChange={setSelectedVerification}
            selectedExperience={selectedExperience}
            onExperienceChange={setSelectedExperience}
            selectedLocations={selectedLocations}
            onLocationsChange={setSelectedLocations}
            selectedSkills={selectedSkills}
            onSkillsChange={setSelectedSkills}
            onClearFilters={clearFilters}
          />

          <p className='text-sm text-muted-foreground'>
            Showing {filteredCandidates.length} of {mockCandidates.length} candidates
          </p>
        </div>

        <CandidatesGrid candidates={filteredCandidates} />
      </Main>

      <CandidatePreviewDialog
        open={isPreviewOpen}
        onOpenChange={setPreviewOpen}
      />
      <CandidateUnlockDialog
        open={isUnlockOpen}
        onOpenChange={setUnlockOpen}
      />
    </>
  )
}

export function Candidates() {
  return (
    <CandidatesProvider>
      <CandidatesContent />
    </CandidatesProvider>
  )
}
