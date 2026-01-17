import {
  type Candidate,
  type VerificationStatus,
  calculateCreditCost,
} from './schema'

const firstNames = [
  'Aarav',
  'Vivaan',
  'Aditya',
  'Vihaan',
  'Arjun',
  'Reyansh',
  'Muhammad',
  'Sai',
  'Arnav',
  'Dhruv',
  'Kabir',
  'Ritvik',
  'Aarush',
  'Ayaan',
  'Shaurya',
  'Atharv',
  'Advait',
  'Krishna',
  'Ishaan',
  'Rudra',
  'Priya',
  'Ananya',
  'Aanya',
  'Aadhya',
  'Diya',
  'Myra',
  'Sara',
  'Ira',
  'Anika',
  'Kiara',
  'Riya',
  'Avni',
  'Anvi',
  'Navya',
  'Shanaya',
  'Aarohi',
  'Saanvi',
  'Pari',
  'Aditi',
  'Kavya',
  'Neha',
  'Pooja',
  'Sneha',
  'Megha',
  'Tanvi',
  'Shruti',
  'Divya',
  'Rashmi',
  'Swati',
  'Mansi',
]

const lastNames = [
  'Sharma',
  'Verma',
  'Patel',
  'Gupta',
  'Singh',
  'Kumar',
  'Reddy',
  'Rao',
  'Iyer',
  'Nair',
  'Menon',
  'Pillai',
  'Das',
  'Bose',
  'Sen',
  'Chatterjee',
  'Mukherjee',
  'Banerjee',
  'Joshi',
  'Kulkarni',
  'Deshmukh',
  'Patil',
  'Shah',
  'Mehta',
  'Jain',
  'Agarwal',
  'Khanna',
  'Kapoor',
  'Malhotra',
  'Chopra',
]

const cities = [
  'Mumbai',
  'Bangalore',
  'Delhi',
  'Hyderabad',
  'Chennai',
  'Pune',
  'Kolkata',
  'Ahmedabad',
  'Gurgaon',
  'Noida',
  'Jaipur',
  'Lucknow',
  'Kochi',
  'Chandigarh',
  'Indore',
  'Coimbatore',
  'Thiruvananthapuram',
  'Bhubaneswar',
  'Nagpur',
  'Vadodara',
]

const jobTitles = [
  'Software Engineer',
  'Senior Software Engineer',
  'Staff Engineer',
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'DevOps Engineer',
  'Site Reliability Engineer',
  'Cloud Engineer',
  'Data Engineer',
  'Data Scientist',
  'ML Engineer',
  'AI Engineer',
  'Product Manager',
  'Technical Product Manager',
  'Engineering Manager',
  'QA Engineer',
  'SDET',
  'Security Engineer',
  'Mobile Developer',
  'iOS Developer',
  'Android Developer',
  'React Native Developer',
  'Solution Architect',
  'Technical Lead',
  'Principal Engineer',
]

const skillsPool = [
  'React',
  'TypeScript',
  'JavaScript',
  'Node.js',
  'Python',
  'Java',
  'Go',
  'Rust',
  'C++',
  'C#',
  'AWS',
  'Azure',
  'GCP',
  'Docker',
  'Kubernetes',
  'PostgreSQL',
  'MongoDB',
  'Redis',
  'GraphQL',
  'REST API',
  'Microservices',
  'System Design',
  'Data Structures',
  'Algorithms',
  'Machine Learning',
  'Deep Learning',
  'TensorFlow',
  'PyTorch',
  'NLP',
  'Computer Vision',
  'Agile',
  'Scrum',
  'CI/CD',
  'Git',
  'Linux',
  'Terraform',
  'Jenkins',
  'Angular',
  'Vue.js',
  'Next.js',
  'Django',
  'Flask',
  'Spring Boot',
  'Kafka',
  'RabbitMQ',
  'Elasticsearch',
  'Spark',
  'Hadoop',
  'Airflow',
]

const educationLevels = [
  'B.Tech',
  'B.E.',
  'M.Tech',
  'M.E.',
  'MCA',
  'BCA',
  'B.Sc',
  'M.Sc',
  'MBA',
  'PhD',
]

const institutions = [
  'IIT Bombay',
  'IIT Delhi',
  'IIT Madras',
  'IIT Kanpur',
  'IIT Kharagpur',
  'IIT Roorkee',
  'IIT Guwahati',
  'IIT Hyderabad',
  'BITS Pilani',
  'NIT Trichy',
  'NIT Warangal',
  'NIT Surathkal',
  'IIIT Hyderabad',
  'VIT Vellore',
  'SRM Chennai',
  'Manipal Institute of Technology',
  'COEP Pune',
  'Anna University',
  'Delhi University',
  'Mumbai University',
  'Jadavpur University',
  'PSG Tech',
  'RV College',
  'PES University',
]

const noticePeriods = [
  'Immediate',
  '15 days',
  '30 days',
  '45 days',
  '60 days',
  '90 days',
]

const documentsOptions = [
  'Aadhaar',
  'PAN',
  'Education Certificate',
  'Experience Letter',
  'Passport',
  'Driving License',
  'Bank Statement',
]

function randomItem<T>(arr: T[]): T {
  return arr[Math.floor(Math.random() * arr.length)]
}

function randomItems<T>(arr: T[], min: number, max: number): T[] {
  const count = Math.floor(Math.random() * (max - min + 1)) + min
  const shuffled = [...arr].sort(() => 0.5 - Math.random())
  return shuffled.slice(0, count)
}

function generateCandidate(index: number): Candidate {
  const firstName = randomItem(firstNames)
  const lastName = randomItem(lastNames)
  const experienceYears = Math.floor(Math.random() * 15) + 1
  const profileScore = Math.floor(Math.random() * 40) + 60
  const verificationOptions: VerificationStatus[] = [
    'verified',
    'partially_verified',
    'unverified',
  ]
  const verificationWeights = [0.6, 0.3, 0.1]
  const rand = Math.random()
  let verificationStatus: VerificationStatus = 'unverified'
  let cumulative = 0
  for (let i = 0; i < verificationOptions.length; i++) {
    cumulative += verificationWeights[i]
    if (rand <= cumulative) {
      verificationStatus = verificationOptions[i]
      break
    }
  }

  const currentLocation = randomItem(cities)
  const preferredLocations = randomItems(
    cities.filter((c) => c !== currentLocation),
    1,
    3
  )

  const baseSalary = experienceYears * 3 + Math.floor(Math.random() * 10)
  const expectedSalary = baseSalary + Math.floor(Math.random() * 5) + 2

  const skills = randomItems(skillsPool, 4, 8)

  let documentsVerified: string[] = []
  if (verificationStatus === 'verified') {
    documentsVerified = randomItems(documentsOptions, 4, 7)
  } else if (verificationStatus === 'partially_verified') {
    documentsVerified = randomItems(documentsOptions, 2, 3)
  }

  return {
    id: `cand-${String(index + 1).padStart(4, '0')}`,
    firstName,
    lastName,
    title: randomItem(jobTitles),
    avatar: undefined,
    skills,
    experienceYears,
    currentLocation,
    preferredLocations,
    highestEducation: randomItem(educationLevels),
    educationInstitution: randomItem(institutions),
    currentSalary: baseSalary,
    expectedSalary,
    noticePeriod: randomItem(noticePeriods),
    verificationStatus,
    profileScore,
    documentsVerified,
    creditCost: calculateCreditCost(experienceYears, profileScore),
    isUnlocked: false,
    email: `${firstName.toLowerCase()}.${lastName.toLowerCase()}${index}@email.com`,
    phone: `+91 ${String(Math.floor(Math.random() * 9000000000) + 1000000000)}`,
    lastActive: new Date(
      Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000
    ),
  }
}

export const mockCandidates: Candidate[] = Array.from({ length: 100 }, (_, i) =>
  generateCandidate(i)
)
