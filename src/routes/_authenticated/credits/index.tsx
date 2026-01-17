import { createFileRoute } from '@tanstack/react-router'
import { Credits } from '@/features/credits'

export const Route = createFileRoute('/_authenticated/credits/')({
  component: Credits,
})
