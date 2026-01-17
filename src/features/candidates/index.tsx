import * as React from 'react'
import { Download, Search } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { TooltipProvider } from '@/components/ui/tooltip'
import { EmployerHeader } from '@/components/employer-header'
import { Main } from '@/components/layout/main'
import {
  type AdvancedFilters,
  AdvancedFiltersPopover,
  defaultAdvancedFilters,
} from './components/advanced-filters-popover'
import { CandidatePreviewSheet } from './components/candidate-preview-sheet'
import { CandidateUnlockDialog } from './components/candidate-unlock-dialog'
import {
  CandidatesProvider,
  useCandidates,
} from './components/candidates-provider'
import { CandidatesTable } from './components/candidates-table'
import {
  type QuickFilterState,
  QuickFilters,
  defaultQuickFilters,
} from './components/quick-filters'
import { experienceRanges, profileScoreRanges, salaryRanges } from './data/data'
import { mockCandidates } from './data/mock-candidates'
import { type Candidate } from './data/schema'

function CandidatesContent() {
  const [searchQuery, setSearchQuery] = React.useState('')
  const [quickFilters, setQuickFilters] =
    React.useState<QuickFilterState>(defaultQuickFilters)
  const [advancedFilters, setAdvancedFilters] = React.useState<AdvancedFilters>(
    defaultAdvancedFilters
  )

  const {
    selectedCandidate,
    isSheetOpen,
    setSheetOpen,
    isUnlockOpen,
    setUnlockOpen,
  } = useCandidates()

  const filteredCandidates = React.useMemo(() => {
    return mockCandidates.filter((candidate: Candidate) => {
      // Apply text search
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

      // Apply quick filters - Skills
      if (quickFilters.skills.length > 0) {
        const hasMatchingSkill = quickFilters.skills.some((skill) =>
          candidate.skills.some((s) => s.toLowerCase() === skill.toLowerCase())
        )
        if (!hasMatchingSkill) return false
      }

      // Apply quick filters - Locations
      if (quickFilters.locations.length > 0) {
        if (
          !quickFilters.locations.some(
            (loc) =>
              loc.toLowerCase() === candidate.currentLocation.toLowerCase()
          )
        ) {
          return false
        }
      }

      // Apply quick filters - Experience
      if (quickFilters.experience.length > 0) {
        const matchesExperience = quickFilters.experience.some((expValue) => {
          const range = experienceRanges.find((r) => r.value === expValue)
          if (range) {
            return (
              candidate.experienceYears >= range.min &&
              candidate.experienceYears <= range.max
            )
          }
          return false
        })
        if (!matchesExperience) return false
      }

      // Apply quick filters - Verification
      if (quickFilters.verification.length > 0) {
        if (!quickFilters.verification.includes(candidate.verificationStatus)) {
          return false
        }
      }

      // Apply advanced filters
      if (advancedFilters.experienceMin || advancedFilters.experienceMax) {
        const minRange = experienceRanges.find(
          (r) => r.value === advancedFilters.experienceMin
        )
        const maxRange = experienceRanges.find(
          (r) => r.value === advancedFilters.experienceMax
        )
        if (minRange && candidate.experienceYears < minRange.min) return false
        if (maxRange && candidate.experienceYears > maxRange.max) return false
      }

      if (advancedFilters.salaryRange) {
        const range = salaryRanges.find(
          (r) => r.value === advancedFilters.salaryRange
        )
        if (range) {
          if (
            candidate.expectedSalary < range.min ||
            candidate.expectedSalary > range.max
          ) {
            return false
          }
        }
      }

      if (advancedFilters.verificationStatuses.length > 0) {
        if (
          !advancedFilters.verificationStatuses.includes(
            candidate.verificationStatus
          )
        ) {
          return false
        }
      }

      if (advancedFilters.profileScoreRange) {
        const range = profileScoreRanges.find(
          (r) => r.value === advancedFilters.profileScoreRange
        )
        if (range) {
          if (
            candidate.profileScore < range.min ||
            candidate.profileScore > range.max
          ) {
            return false
          }
        }
      }

      if (advancedFilters.noticePeriod) {
        const normalizedNoticePeriod = candidate.noticePeriod
          .toLowerCase()
          .replace(/\s/g, '-')
        if (normalizedNoticePeriod !== advancedFilters.noticePeriod) {
          return false
        }
      }

      if (
        advancedFilters.creditRange &&
        advancedFilters.creditRange !== 'all'
      ) {
        const creditRange = advancedFilters.creditRange
        if (creditRange === '0-20') {
          if (candidate.creditCost > 20) return false
        } else if (creditRange === '20-40') {
          if (candidate.creditCost < 20 || candidate.creditCost > 40) {
            return false
          }
        } else if (creditRange === '40+') {
          if (candidate.creditCost < 40) return false
        }
      }

      return true
    })
  }, [searchQuery, quickFilters, advancedFilters])

  const handleResetAdvancedFilters = () => {
    setAdvancedFilters(defaultAdvancedFilters)
  }

  return (
    <TooltipProvider>
      <EmployerHeader />

      <Main>
        <div className='mb-6 space-y-4'>
          {/* Header */}
          <div>
            <h1 className='text-2xl font-bold tracking-tight'>
              Find Candidates
            </h1>
            <p className='text-muted-foreground'>
              Search and unlock verified candidate profiles
            </p>
          </div>

          {/* Search Bar */}
          <div className='relative'>
            <Search className='absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground' />
            <Input
              type='text'
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder='Search by name, title, or skills...'
              className='pl-10'
            />
          </div>

          {/* Quick Filters */}
          <QuickFilters filters={quickFilters} onChange={setQuickFilters} />

          {/* Toolbar */}
          <div className='flex items-center justify-between'>
            <p className='text-sm text-muted-foreground'>
              Showing {filteredCandidates.length} of {mockCandidates.length}{' '}
              candidates
            </p>
            <div className='flex items-center gap-2'>
              <AdvancedFiltersPopover
                filters={advancedFilters}
                onChange={setAdvancedFilters}
                onReset={handleResetAdvancedFilters}
              />
              <Button variant='outline' size='sm' className='gap-2'>
                <Download className='size-4' />
                Export
              </Button>
            </div>
          </div>
        </div>

        {/* Candidates Table */}
        <CandidatesTable candidates={filteredCandidates} />
      </Main>

      {/* Preview Sheet */}
      <CandidatePreviewSheet
        candidate={selectedCandidate}
        open={isSheetOpen}
        onOpenChange={setSheetOpen}
      />

      {/* Unlock Dialog */}
      <CandidateUnlockDialog open={isUnlockOpen} onOpenChange={setUnlockOpen} />
    </TooltipProvider>
  )
}

export function Candidates() {
  return (
    <CandidatesProvider>
      <CandidatesContent />
    </CandidatesProvider>
  )
}
