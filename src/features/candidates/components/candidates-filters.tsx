import { Search, X, SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  verificationStatuses,
  experienceRanges,
  popularLocations,
  popularSkills,
} from '../data/data'

interface CandidatesFiltersProps {
  searchQuery: string
  onSearchChange: (query: string) => void
  selectedVerification: string[]
  onVerificationChange: (values: string[]) => void
  selectedExperience: string[]
  onExperienceChange: (values: string[]) => void
  selectedLocations: string[]
  onLocationsChange: (values: string[]) => void
  selectedSkills: string[]
  onSkillsChange: (values: string[]) => void
  onClearFilters: () => void
}

export function CandidatesFilters({
  searchQuery,
  onSearchChange,
  selectedVerification,
  onVerificationChange,
  selectedExperience,
  onExperienceChange,
  selectedLocations,
  onLocationsChange,
  selectedSkills,
  onSkillsChange,
  onClearFilters,
}: CandidatesFiltersProps) {
  const hasFilters =
    selectedVerification.length > 0 ||
    selectedExperience.length > 0 ||
    selectedLocations.length > 0 ||
    selectedSkills.length > 0

  const totalFilters =
    selectedVerification.length +
    selectedExperience.length +
    selectedLocations.length +
    selectedSkills.length

  const toggleItem = (
    value: string,
    selected: string[],
    onChange: (values: string[]) => void
  ) => {
    if (selected.includes(value)) {
      onChange(selected.filter((v) => v !== value))
    } else {
      onChange([...selected, value])
    }
  }

  return (
    <div className='space-y-4'>
      <div className='flex flex-wrap items-center gap-2'>
        <div className='relative flex-1 min-w-[200px] max-w-md'>
          <Search className='absolute left-3 top-1/2 -translate-y-1/2 size-4 text-muted-foreground' />
          <Input
            placeholder='Search by name, skills, or title...'
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            className='ps-9'
          />
        </div>

        <Select
          value={selectedExperience[0] || ''}
          onValueChange={(value) => onExperienceChange(value ? [value] : [])}
        >
          <SelectTrigger className='w-[180px]'>
            <SelectValue placeholder='Experience' />
          </SelectTrigger>
          <SelectContent>
            {experienceRanges.map((range) => (
              <SelectItem key={range.value} value={range.value}>
                {range.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedLocations[0] || ''}
          onValueChange={(value) => onLocationsChange(value ? [value] : [])}
        >
          <SelectTrigger className='w-[150px]'>
            <SelectValue placeholder='Location' />
          </SelectTrigger>
          <SelectContent>
            {popularLocations.map((location) => (
              <SelectItem key={location} value={location}>
                {location}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Select
          value={selectedVerification[0] || ''}
          onValueChange={(value) => onVerificationChange(value ? [value] : [])}
        >
          <SelectTrigger className='w-[150px]'>
            <SelectValue placeholder='Verification' />
          </SelectTrigger>
          <SelectContent>
            {verificationStatuses.map((status) => (
              <SelectItem key={status.value} value={status.value}>
                {status.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Popover>
          <PopoverTrigger asChild>
            <Button variant='outline' className='gap-2'>
              <SlidersHorizontal className='size-4' />
              Skills
              {selectedSkills.length > 0 && (
                <Badge variant='secondary' className='size-5 p-0 justify-center'>
                  {selectedSkills.length}
                </Badge>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent className='w-64' align='end'>
            <div className='space-y-3'>
              <h4 className='font-medium'>Filter by Skills</h4>
              <div className='grid grid-cols-2 gap-2'>
                {popularSkills.slice(0, 12).map((skill) => (
                  <div key={skill} className='flex items-center gap-2'>
                    <Checkbox
                      id={skill}
                      checked={selectedSkills.includes(skill)}
                      onCheckedChange={() =>
                        toggleItem(skill, selectedSkills, onSkillsChange)
                      }
                    />
                    <Label htmlFor={skill} className='text-xs cursor-pointer'>
                      {skill}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          </PopoverContent>
        </Popover>

        {hasFilters && (
          <Button variant='ghost' size='sm' onClick={onClearFilters}>
            <X className='size-4 me-1' />
            Clear ({totalFilters})
          </Button>
        )}
      </div>
    </div>
  )
}
