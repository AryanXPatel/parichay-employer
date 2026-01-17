import { createFileRoute } from '@tanstack/react-router'
import { ComingSoon } from '@/components/coming-soon'

export const Route = createFileRoute('/_authenticated/messages/')({
  component: MessagesPage,
})

function MessagesPage() {
  return <ComingSoon />
}
