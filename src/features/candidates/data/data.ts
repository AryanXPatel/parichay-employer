import {
  ShieldCheck,
  ShieldAlert,
  ShieldX,
} from 'lucide-react'
import { type VerificationStatus } from './schema'

export const verificationStatuses: {
  value: VerificationStatus
  label: string
  icon: React.ElementType
  color: string
}[] = [
  {
    value: 'verified',
    label: 'Verified',
    icon: ShieldCheck,
    color: 'text-green-600',
  },
  {
    value: 'partially_verified',
    label: 'Partially Verified',
    icon: ShieldAlert,
    color: 'text-amber-600',
  },
  {
    value: 'unverified',
    label: 'Unverified',
    icon: ShieldX,
    color: 'text-gray-400',
  },
]

export const experienceRanges = [
  { value: 'fresher', label: 'Fresher (0-1 years)', min: 0, max: 1 },
  { value: 'junior', label: 'Junior (1-3 years)', min: 1, max: 3 },
  { value: 'mid', label: 'Mid-Level (3-6 years)', min: 3, max: 6 },
  { value: 'senior', label: 'Senior (6-10 years)', min: 6, max: 10 },
  { value: 'lead', label: 'Lead/Principal (10+ years)', min: 10, max: 99 },
]

export const salaryRanges = [
  { value: '0-5', label: '0-5 LPA', min: 0, max: 5 },
  { value: '5-10', label: '5-10 LPA', min: 5, max: 10 },
  { value: '10-20', label: '10-20 LPA', min: 10, max: 20 },
  { value: '20-35', label: '20-35 LPA', min: 20, max: 35 },
  { value: '35+', label: '35+ LPA', min: 35, max: 999 },
]

export const profileScoreRanges = [
  { value: 'excellent', label: 'Excellent (90-100)', min: 90, max: 100 },
  { value: 'good', label: 'Good (75-89)', min: 75, max: 89 },
  { value: 'average', label: 'Average (60-74)', min: 60, max: 74 },
  { value: 'below-average', label: 'Below Average (<60)', min: 0, max: 59 },
]

export const noticePeriods = [
  { value: 'immediate', label: 'Immediate' },
  { value: '15-days', label: '15 days' },
  { value: '30-days', label: '30 days' },
  { value: '45-days', label: '45 days' },
  { value: '60-days', label: '60 days' },
  { value: '90-days', label: '90 days' },
]

export const popularSkills = [
  'React', 'TypeScript', 'JavaScript', 'Node.js', 'Python', 'Java', 'Go',
  'AWS', 'Docker', 'Kubernetes', 'PostgreSQL', 'MongoDB', 'GraphQL',
  'Machine Learning', 'System Design', 'Microservices',
]

export const popularLocations = [
  'Mumbai', 'Bangalore', 'Delhi', 'Hyderabad', 'Chennai', 'Pune', 'Kolkata',
  'Ahmedabad', 'Gurgaon', 'Noida',
]
