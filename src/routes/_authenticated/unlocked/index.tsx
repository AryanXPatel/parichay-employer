import { createFileRoute } from '@tanstack/react-router'
import { UnlockedProfiles } from '@/features/unlocked'

export const Route = createFileRoute('/_authenticated/unlocked/')({
  component: UnlockedProfiles,
})
