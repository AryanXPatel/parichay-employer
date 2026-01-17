import { createFileRoute } from '@tanstack/react-router'
import { z } from 'zod'
import { Chats } from '@/features/chats'

const searchSchema = z.object({
  candidateId: z.string().optional(),
})

export const Route = createFileRoute('/_authenticated/chats/')({
  validateSearch: searchSchema,
  component: Chats,
})
