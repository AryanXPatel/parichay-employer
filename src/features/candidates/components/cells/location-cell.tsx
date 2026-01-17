import { MapPin } from 'lucide-react'

interface LocationCellProps {
  location: string
}

export function LocationCell({ location }: LocationCellProps) {
  return (
    <div className='flex items-center gap-1.5'>
      <MapPin className='size-3.5 text-muted-foreground' />
      <span className='text-sm'>{location}</span>
    </div>
  )
}
