import { createFileRoute } from '@tanstack/react-router'
import { ComingSoon } from '@/components/coming-soon'

export const Route = createFileRoute('/_authenticated/settings/team/')({
  component: TeamSettingsPage,
})

function TeamSettingsPage() {
  return <ComingSoon />
}
