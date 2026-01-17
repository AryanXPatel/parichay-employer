import { Copy, Mail, MessageCircle, Phone } from 'lucide-react'
import { useCandidatesStore } from '@/stores/candidates-store'
import { useCreditsStore } from '@/stores/credits-store'
import { Button } from '@/components/ui/button'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from '@/components/ui/tooltip'
import { type Candidate } from '@/features/candidates/data/schema'

interface ContactActionsProps {
  candidate: Candidate
  recruiterName?: string
  companyName?: string
  variant?: 'default' | 'compact'
}

const mockRecruiter = {
  name: 'John Doe',
  company: 'TechCorp Solutions',
}

export function ContactActions({
  candidate,
  recruiterName = mockRecruiter.name,
  companyName = mockRecruiter.company,
  variant = 'default',
}: ContactActionsProps) {
  const { markAsContacted } = useCandidatesStore()
  const { incrementUsage } = useCreditsStore()

  const handleContact = () => {
    markAsContacted(candidate.id)
    incrementUsage('contacted')
  }

  const generateWhatsAppMessage = () => {
    const message = `Hello ${candidate.firstName}, I am ${recruiterName} from ${companyName}. I reviewed your profile for an open position with us and wanted to connect with you for the same, can we talk now?`
    return encodeURIComponent(message)
  }

  const handleWhatsApp = () => {
    if (!candidate.phone) return
    const phoneNumber = candidate.phone.replace(/\D/g, '')
    const url = `https://wa.me/${phoneNumber}?text=${generateWhatsAppMessage()}`
    window.open(url, '_blank')
    handleContact()
  }

  const handleEmail = () => {
    if (!candidate.email) return
    const subject = encodeURIComponent('Job Opportunity')
    const body = encodeURIComponent(
      `Hello ${candidate.firstName},\n\nI am ${recruiterName} from ${companyName}. I reviewed your profile for an open position with us and wanted to connect with you.\n\nBest regards,\n${recruiterName}`
    )
    window.location.href = `mailto:${candidate.email}?subject=${subject}&body=${body}`
    handleContact()
  }

  const handlePhone = () => {
    if (!candidate.phone) return
    window.location.href = `tel:${candidate.phone}`
    handleContact()
  }

  const handleCopy = () => {
    const info = `${candidate.firstName} ${candidate.lastName}\nEmail: ${candidate.email || 'N/A'}\nPhone: ${candidate.phone || 'N/A'}`
    navigator.clipboard.writeText(info)
  }

  if (variant === 'compact') {
    return (
      <div className='flex items-center gap-1'>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              onClick={handleWhatsApp}
              disabled={!candidate.phone}
              className='size-8'
            >
              <MessageCircle className='size-4' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>WhatsApp</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              onClick={handleEmail}
              disabled={!candidate.email}
              className='size-8'
            >
              <Mail className='size-4' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Email</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              onClick={handlePhone}
              disabled={!candidate.phone}
              className='size-8'
            >
              <Phone className='size-4' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Call</TooltipContent>
        </Tooltip>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant='ghost'
              size='icon'
              onClick={handleCopy}
              className='size-8'
            >
              <Copy className='size-4' />
            </Button>
          </TooltipTrigger>
          <TooltipContent>Copy All</TooltipContent>
        </Tooltip>
      </div>
    )
  }

  return (
    <div className='flex flex-wrap gap-2'>
      <Button
        variant='default'
        size='sm'
        onClick={handleWhatsApp}
        disabled={!candidate.phone}
        className='gap-2'
      >
        <MessageCircle className='size-4' />
        WhatsApp
      </Button>
      <Button
        variant='outline'
        size='sm'
        onClick={handleEmail}
        disabled={!candidate.email}
        className='gap-2'
      >
        <Mail className='size-4' />
        Email
      </Button>
      <Button
        variant='outline'
        size='sm'
        onClick={handlePhone}
        disabled={!candidate.phone}
        className='gap-2'
      >
        <Phone className='size-4' />
        Call
      </Button>
      <Button variant='ghost' size='sm' onClick={handleCopy} className='gap-2'>
        <Copy className='size-4' />
        Copy
      </Button>
    </div>
  )
}
