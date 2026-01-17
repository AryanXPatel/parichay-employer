import * as React from 'react'
import { SlidersHorizontal } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Label } from '@/components/ui/label'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Separator } from '@/components/ui/separator'
import {
  experienceRanges,
  noticePeriods,
  profileScoreRanges,
  salaryRanges,
} from '../data/data'

export interface AdvancedFilters {
  experienceMin: string
  experienceMax: string
  salaryRange: string
  verificationStatuses: string[]
  profileScoreRange: string
  noticePeriod: string
  creditRange: string
}

interface AdvancedFiltersPopoverProps {
  filters: AdvancedFilters
  onChange: (filters: AdvancedFilters) => void
  onReset: () => void
}

const creditRanges = [
  { value: 'all', label: 'All' },
  { value: '0-20', label: '0-20 credits' },
  { value: '20-40', label: '20-40 credits' },
  { value: '40+', label: '40+ credits' },
]

export const defaultAdvancedFilters: AdvancedFilters = {
  experienceMin: '',
  experienceMax: '',
  salaryRange: '',
  verificationStatuses: [],
  profileScoreRange: '',
  noticePeriod: '',
  creditRange: '',
}

export function AdvancedFiltersPopover({
  filters,
  onChange,
  onReset,
}: AdvancedFiltersPopoverProps) {
  const [open, setOpen] = React.useState(false)
  const [localFilters, setLocalFilters] =
    React.useState<AdvancedFilters>(filters)

  React.useEffect(() => {
    setLocalFilters(filters)
  }, [filters])

  const handleVerificationChange = (status: string, checked: boolean) => {
    const newStatuses = checked
      ? [...localFilters.verificationStatuses, status]
      : localFilters.verificationStatuses.filter((s) => s !== status)
    setLocalFilters({ ...localFilters, verificationStatuses: newStatuses })
  }

  const handleApply = () => {
    onChange(localFilters)
    setOpen(false)
  }

  const handleReset = () => {
    setLocalFilters(defaultAdvancedFilters)
    onReset()
  }

  const hasActiveFilters =
    filters.experienceMin ||
    filters.experienceMax ||
    filters.salaryRange ||
    filters.verificationStatuses.length > 0 ||
    filters.profileScoreRange ||
    filters.noticePeriod ||
    filters.creditRange

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant='outline' size='sm' className='gap-2'>
          <SlidersHorizontal className='size-4' />
          Filters
          {hasActiveFilters && (
            <span className='flex size-5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground'>
              {
                [
                  filters.experienceMin || filters.experienceMax,
                  filters.salaryRange,
                  filters.verificationStatuses.length > 0,
                  filters.profileScoreRange,
                  filters.noticePeriod,
                  filters.creditRange,
                ].filter(Boolean).length
              }
            </span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-80' align='end'>
        <div className='space-y-4'>
          <div className='flex items-center justify-between'>
            <h4 className='font-medium'>Advanced Filters</h4>
            <Button
              variant='ghost'
              size='sm'
              onClick={handleReset}
              className='h-auto p-0 text-sm text-muted-foreground'
            >
              Reset
            </Button>
          </div>

          <Separator />

          {/* Experience Range */}
          <div className='space-y-2'>
            <Label className='text-sm font-medium'>Experience</Label>
            <div className='flex items-center gap-2'>
              <Select
                value={localFilters.experienceMin}
                onValueChange={(value) =>
                  setLocalFilters({ ...localFilters, experienceMin: value })
                }
              >
                <SelectTrigger className='flex-1'>
                  <SelectValue placeholder='Min' />
                </SelectTrigger>
                <SelectContent>
                  {experienceRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <span className='text-muted-foreground'>to</span>
              <Select
                value={localFilters.experienceMax}
                onValueChange={(value) =>
                  setLocalFilters({ ...localFilters, experienceMax: value })
                }
              >
                <SelectTrigger className='flex-1'>
                  <SelectValue placeholder='Max' />
                </SelectTrigger>
                <SelectContent>
                  {experienceRanges.map((range) => (
                    <SelectItem key={range.value} value={range.value}>
                      {range.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Salary Range */}
          <div className='space-y-2'>
            <Label className='text-sm font-medium'>Expected Salary</Label>
            <Select
              value={localFilters.salaryRange}
              onValueChange={(value) =>
                setLocalFilters({ ...localFilters, salaryRange: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder='Select range' />
              </SelectTrigger>
              <SelectContent>
                {salaryRanges.map((range) => (
                  <SelectItem key={range.value} value={range.value}>
                    {range.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Verification Status */}
          <div className='space-y-2'>
            <Label className='text-sm font-medium'>Verification Status</Label>
            <div className='space-y-2'>
              {['verified', 'partially_verified', 'unverified'].map(
                (status) => (
                  <div key={status} className='flex items-center gap-2'>
                    <Checkbox
                      id={status}
                      checked={localFilters.verificationStatuses.includes(
                        status
                      )}
                      onCheckedChange={(checked) =>
                        handleVerificationChange(status, checked as boolean)
                      }
                    />
                    <label htmlFor={status} className='text-sm capitalize'>
                      {status.replace('_', ' ')}
                    </label>
                  </div>
                )
              )}
            </div>
          </div>

          {/* Profile Score */}
          <div className='space-y-2'>
            <Label className='text-sm font-medium'>Profile Score</Label>
            <RadioGroup
              value={localFilters.profileScoreRange}
              onValueChange={(value) =>
                setLocalFilters({ ...localFilters, profileScoreRange: value })
              }
            >
              {profileScoreRanges.map((range) => (
                <div key={range.value} className='flex items-center gap-2'>
                  <RadioGroupItem value={range.value} id={range.value} />
                  <Label htmlFor={range.value} className='text-sm font-normal'>
                    {range.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          {/* Notice Period */}
          <div className='space-y-2'>
            <Label className='text-sm font-medium'>Notice Period</Label>
            <Select
              value={localFilters.noticePeriod}
              onValueChange={(value) =>
                setLocalFilters({ ...localFilters, noticePeriod: value })
              }
            >
              <SelectTrigger>
                <SelectValue placeholder='Select notice period' />
              </SelectTrigger>
              <SelectContent>
                {noticePeriods.map((period) => (
                  <SelectItem key={period.value} value={period.value}>
                    {period.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Credit Cost */}
          <div className='space-y-2'>
            <Label className='text-sm font-medium'>Credit Cost</Label>
            <RadioGroup
              value={localFilters.creditRange}
              onValueChange={(value) =>
                setLocalFilters({ ...localFilters, creditRange: value })
              }
            >
              {creditRanges.map((range) => (
                <div key={range.value} className='flex items-center gap-2'>
                  <RadioGroupItem
                    value={range.value}
                    id={`credit-${range.value}`}
                  />
                  <Label
                    htmlFor={`credit-${range.value}`}
                    className='text-sm font-normal'
                  >
                    {range.label}
                  </Label>
                </div>
              ))}
            </RadioGroup>
          </div>

          <Separator />

          <div className='flex gap-2'>
            <Button
              variant='outline'
              className='flex-1'
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button className='flex-1' onClick={handleApply}>
              Apply
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}
