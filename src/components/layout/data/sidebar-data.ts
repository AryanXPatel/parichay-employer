import {
  LayoutDashboard,
  Search,
  Heart,
  Unlock,
  MessagesSquare,
  Coins,
  Building2,
  Users,
  Bell,
  HelpCircle,
  Settings,
  UserCog,
} from 'lucide-react'
import { type SidebarData } from '../types'

export const sidebarData: SidebarData = {
  user: {
    name: 'Recruiter',
    email: 'recruiter@company.com',
    avatar: '/avatars/shadcn.jpg',
  },
  teams: [
    {
      name: 'TechCorp India',
      logo: Building2,
      plan: 'Professional',
    },
  ],
  navGroups: [
    {
      title: 'Recruitment',
      items: [
        {
          title: 'Dashboard',
          url: '/',
          icon: LayoutDashboard,
        },
        {
          title: 'Find Candidates',
          url: '/candidates',
          icon: Search,
        },
        {
          title: 'Shortlist',
          url: '/shortlist',
          icon: Heart,
        },
        {
          title: 'Unlocked Profiles',
          url: '/unlocked',
          icon: Unlock,
        },
        {
          title: 'Messages',
          url: '/messages',
          badge: 'Soon',
          icon: MessagesSquare,
        },
      ],
    },
    {
      title: 'Account',
      items: [
        {
          title: 'Credits & Plans',
          url: '/credits',
          icon: Coins,
        },
        {
          title: 'Settings',
          icon: Settings,
          items: [
            {
              title: 'Company Profile',
              url: '/settings',
              icon: UserCog,
            },
            {
              title: 'Team Members',
              url: '/settings/team',
              icon: Users,
            },
            {
              title: 'Notifications',
              url: '/settings/notifications',
              icon: Bell,
            },
          ],
        },
        {
          title: 'Help Center',
          url: '/help-center',
          icon: HelpCircle,
        },
      ],
    },
  ],
}
