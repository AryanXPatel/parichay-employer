import * as React from 'react'
import { CheckIcon } from '@radix-ui/react-icons'
import {
  Briefcase,
  Code2,
  MapPin,
  ShieldAlert,
  ShieldCheck,
  ShieldX,
  X,
} from 'lucide-react'
import { cn } from '@/lib/utils'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Separator } from '@/components/ui/separator'
import {
  experienceRanges,
  popularLocations,
  popularSkills,
} from '../data/data'
import { type VerificationStatus } from '../data/schema'

export interface QuickFilterState {
  skills: string[]
  locations: string[]
  experience: string[]
  verification: VerificationStatus[]
}

interface QuickFiltersProps {
  filters: QuickFilterState
  onChange: (filters: QuickFilterState) => void
  className?: string
}

export const defaultQuickFilters: QuickFilterState = {
  skills: [],
  locations: [],
  experience: [],
  verification: [],
}

const verificationOptions: {
  value: VerificationStatus
  label: string
  icon: React.ComponentType<{ className?: string }>
}[] = [
  { value: 'verified', label: 'Verified', icon: ShieldCheck },
  { value: 'partially_verified', label: 'Partially Verified', icon: ShieldAlert },
  { value: 'unverified', label: 'Unverified', icon: ShieldX },
]

interface FacetedFilterProps {
  title: string
  icon: React.ComponentType<{ className?: string }>
  options: { value: string; label: string; icon?: React.ComponentType<{ className?: string }> }[]
  selectedValues: string[]
  onSelectionChange: (values: string[]) => void
}

function FacetedFilter({
  title,
  icon: Icon,
  options,
  selectedValues,
  onSelectionChange,
}: FacetedFilterProps) {
  const selectedSet = new Set(selectedValues)

  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='h-8 border-dashed'>
          <Icon className='size-4' />
          {title}
          {selectedSet.size > 0 && (
            <>
              <Separator orientation='vertical' className='mx-2 h-4' />
              <Badge
                variant='secondary'
                className='rounded-sm px-1 font-normal lg:hidden'
              >
                {selectedSet.size}
              </Badge>
              <div className='hidden space-x-1 lg:flex'>
                {selectedSet.size > 2 ? (
                  <Badge
                    variant='secondary'
                    className='rounded-sm px-1 font-normal'
                  >
                    {selectedSet.size} selected
                  </Badge>
                ) : (
                  options
                    .filter((option) => selectedSet.has(option.value))
                    .map((option) => (
                      <Badge
                        variant='secondary'
                        key={option.value}
                        className='rounded-sm px-1 font-normal'
                      >
                        {option.label}
                      </Badge>
                    ))
                )}
              </div>
            </>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[220px] p-0' align='start'>
        <Command>
          <CommandInput placeholder={`Search ${title.toLowerCase()}...`} />
          <CommandList>
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup>
              {options.map((option) => {
                const isSelected = selectedSet.has(option.value)
                return (
                  <CommandItem
                    key={option.value}
                    onSelect={() => {
                      const newSet = new Set(selectedSet)
                      if (isSelected) {
                        newSet.delete(option.value)
                      } else {
                        newSet.add(option.value)
                      }
                      onSelectionChange(Array.from(newSet))
                    }}
                  >
                    <div
                      className={cn(
                        'flex size-4 items-center justify-center rounded-sm border border-primary',
                        isSelected
                          ? 'bg-primary text-primary-foreground'
                          : 'opacity-50 [&_svg]:invisible'
                      )}
                    >
                      <CheckIcon className='size-4 text-background' />
                    </div>
                    {option.icon && (
                      <option.icon className='size-4 text-muted-foreground' />
                    )}
                    <span>{option.label}</span>
                  </CommandItem>
                )
              })}
            </CommandGroup>
            {selectedSet.size > 0 && (
              <>
                <CommandSeparator />
                <CommandGroup>
                  <CommandItem
                    onSelect={() => onSelectionChange([])}
                    className='justify-center text-center'
                  >
                    Clear filters
                  </CommandItem>
                </CommandGroup>
              </>
            )}
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export function QuickFilters({
  filters,
  onChange,
  className,
}: QuickFiltersProps) {
  const skillOptions = popularSkills.map((skill) => ({
    value: skill,
    label: skill,
  }))

  const locationOptions = popularLocations.map((location) => ({
    value: location,
    label: location,
  }))

  const experienceOptions = experienceRanges.map((range) => ({
    value: range.value,
    label: range.label,
  }))

  const hasActiveFilters =
    filters.skills.length > 0 ||
    filters.locations.length > 0 ||
    filters.experience.length > 0 ||
    filters.verification.length > 0

  const handleClearAll = () => {
    onChange(defaultQuickFilters)
  }

  return (
    <div className={cn('flex flex-wrap items-center gap-2', className)}>
      <FacetedFilter
        title='Skills'
        icon={Code2}
        options={skillOptions}
        selectedValues={filters.skills}
        onSelectionChange={(values) =>
          onChange({ ...filters, skills: values })
        }
      />

      <FacetedFilter
        title='Location'
        icon={MapPin}
        options={locationOptions}
        selectedValues={filters.locations}
        onSelectionChange={(values) =>
          onChange({ ...filters, locations: values })
        }
      />

      <FacetedFilter
        title='Experience'
        icon={Briefcase}
        options={experienceOptions}
        selectedValues={filters.experience}
        onSelectionChange={(values) =>
          onChange({ ...filters, experience: values })
        }
      />

      <FacetedFilter
        title='Verification'
        icon={ShieldCheck}
        options={verificationOptions}
        selectedValues={filters.verification}
        onSelectionChange={(values) =>
          onChange({ ...filters, verification: values as VerificationStatus[] })
        }
      />

      {hasActiveFilters && (
        <Button
          variant='ghost'
          size='sm'
          onClick={handleClearAll}
          className='h-8 px-2'
        >
          Clear all
          <X className='size-4' />
        </Button>
      )}
    </div>
  )
}
