import { ConfigDrawer } from '@/components/config-drawer'
import { CreditBadge } from '@/components/credit-badge'
import { Header } from '@/components/layout/header'
import { ProfileDropdown } from '@/components/profile-dropdown'
import { Search } from '@/components/search'
import { ThemeSwitch } from '@/components/theme-switch'

interface EmployerHeaderProps {
  children?: React.ReactNode
}

export function EmployerHeader({ children }: EmployerHeaderProps) {
  return (
    <Header>
      {children}
      <div className='ms-auto flex items-center gap-2 sm:gap-4'>
        <Search />
        <CreditBadge />
        <ThemeSwitch />
        <ConfigDrawer />
        <ProfileDropdown />
      </div>
    </Header>
  )
}
