import { createFileRoute } from '@tanstack/react-router'
import { Shortlist } from '@/features/shortlist'

export const Route = createFileRoute('/_authenticated/shortlist/')({
  component: Shortlist,
})
