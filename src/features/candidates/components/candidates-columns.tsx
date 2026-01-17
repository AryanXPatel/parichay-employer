import { type ColumnDef } from '@tanstack/react-table'
import { DataTableColumnHeader } from '@/components/data-table/column-header'
import { type Candidate } from '../data/schema'
import { ActionsCell } from './cells/actions-cell'
import { CandidateInfoCell } from './cells/candidate-info-cell'
import { LocationCell } from './cells/location-cell'
import { ScoreCell } from './cells/score-cell'
import { SkillsCell } from './cells/skills-cell'
import { VerificationCell } from './cells/verification-cell'

export const candidatesColumns: ColumnDef<Candidate>[] = [
  {
    id: 'candidate',
    accessorFn: (row) => `${row.firstName} ${row.lastName}`,
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Candidate' />
    ),
    cell: ({ row }) => <CandidateInfoCell candidate={row.original} />,
    enableSorting: true,
    enableHiding: false,
  },
  {
    id: 'skills',
    accessorFn: (row) => row.skills.join(', '),
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Skills' />
    ),
    cell: ({ row }) => <SkillsCell skills={row.original.skills} />,
    enableSorting: false,
    enableHiding: true,
  },
  {
    id: 'experience',
    accessorKey: 'experienceYears',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Experience' />
    ),
    cell: ({ row }) => (
      <span className='text-sm'>
        {row.original.experienceYears} year
        {row.original.experienceYears !== 1 ? 's' : ''}
      </span>
    ),
    enableSorting: true,
  },
  {
    id: 'location',
    accessorKey: 'currentLocation',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Location' />
    ),
    cell: ({ row }) => <LocationCell location={row.original.currentLocation} />,
    enableSorting: true,
  },
  {
    id: 'verification',
    accessorKey: 'verificationStatus',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Verification' />
    ),
    cell: ({ row }) => (
      <VerificationCell status={row.original.verificationStatus} />
    ),
    enableSorting: true,
  },
  {
    id: 'score',
    accessorKey: 'profileScore',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Score' />
    ),
    cell: ({ row }) => <ScoreCell score={row.original.profileScore} />,
    enableSorting: true,
  },
  {
    id: 'credits',
    accessorKey: 'creditCost',
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title='Credits' />
    ),
    cell: ({ row }) => (
      <span className='text-sm font-medium'>{row.original.creditCost}</span>
    ),
    enableSorting: true,
  },
  {
    id: 'actions',
    cell: ({ row }) => <ActionsCell candidate={row.original} />,
    enableSorting: false,
    enableHiding: false,
  },
]
