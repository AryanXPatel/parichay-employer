import { z } from 'zod'

export type VerificationStatus =
  | 'verified'
  | 'partially_verified'
  | 'unverified'

export const candidateSchema = z.object({
  id: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  title: z.string(),
  avatar: z.string().optional(),
  skills: z.array(z.string()),
  experienceYears: z.number(),
  currentLocation: z.string(),
  preferredLocations: z.array(z.string()),
  highestEducation: z.string(),
  educationInstitution: z.string(),
  currentSalary: z.number().optional(),
  expectedSalary: z.number(),
  noticePeriod: z.string(),
  verificationStatus: z.enum(['verified', 'partially_verified', 'unverified']),
  profileScore: z.number().min(0).max(100),
  documentsVerified: z.array(z.string()),
  creditCost: z.number(),
  isUnlocked: z.boolean(),
  email: z.string().email().optional(),
  phone: z.string().optional(),
  lastActive: z.date(),
})

export type Candidate = z.infer<typeof candidateSchema>

export function maskEmail(email: string): string {
  const [local, domain] = email.split('@')
  if (!local || !domain) return '****@****.com'
  const maskedLocal = local.charAt(0) + '****'
  const domainParts = domain.split('.')
  const maskedDomain = '****.' + (domainParts[domainParts.length - 1] || 'com')
  return `${maskedLocal}@${maskedDomain}`
}

export function maskPhone(phone: string): string {
  return '+91 *****' + phone.slice(-5)
}

export function maskLastName(lastName: string): string {
  return lastName.charAt(0) + '.'
}

export function calculateCreditCost(
  experienceYears: number,
  profileScore: number
): number {
  return Math.round(experienceYears * 2 + profileScore / 10)
}
