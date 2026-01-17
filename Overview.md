# “PARICHAY” Development Overview



## 1. Project Overview

This is a job marketplace platform where the main innovation is that candidates earn money by selling their profile data to employers, rather than just applying for jobs.

### For Candidates (Job Seekers):

Candidates create detailed profiles with their skills, education, experience, and documents (CV, certificates, ID proof). They upload documents that get verified (either automatically through government APIs or manually). Verified information earns them credits (digital currency), which they can convert to real money. Employers can only access their profile if they pay credits, so candidates essentially get paid when employers view or download their information.

### For Employers (Recruiters):

Employers buy a subscription (1, 3, 6, or 12 months) and receive credits monthly. They use these credits to search and download candidate profiles. They can filter candidates by skills, experience, verified documents, and salary range. The more popular and verified a candidate profile is, the more credits it costs to download—it's dynamic pricing based on demand.

We will develop a complete ecosystem consisting of:

Candidate Mobile App (iOS & Android)

Employer Portal ( Website / WebApp )

Admin Management System ( WebApp )

Secured Backend Infrastructure

## 2. Components & Features

### Candidate App (Mobile)

Sign up with a phone number and OTP.

Create and edit biodata (skills, education, experience, hobbies, address, etc.).

Upload documents like CV, education certificates, payslips, and government ID.

Get documents verified through DigiLocker/NSDL and manual review

Also users can see verification status and badges.

See profile score, views, downloads, and activity in a simple dashboard.

Earn credits based on verified and rare fields; track earnings and history.

Use a wallet to hold earnings and request payouts by bank account or UPI.

Control who can see which fields/documents with field-level privacy and settings.

Receive notifications for profile views, downloads, earnings, and important updates.

# Employer Web Portal (THIS IS WHAT WE HAVE TO BUILD NOW THEN ADMIN DASHBOARD)

Register a company account and complete basic KYC.

Choose subscription duration (1/3/6/12+ months) and receive credits.

See credit balance, credit usage, and credit expiry (30-day window).

Search candidates using filters like skills, experience, location, salary range, verification status, and profile score.

View structured candidate snippets first, with masked contact info.

Spend credits to unlock and download full profiles and allowed documents.

Use dynamic pricing where highly demanded and more verified profiles cost more.

Save candidates to shortlist and contact them via in-app messaging or email.

Allow mass messaging and mass emailing towards bulk credits usage.

Use a dashboard to see search usage, downloads, and ROI/engagement metrics.

## Admin Dashboard

View overall platform metrics (total candidates, employers, active subscriptions, etc.)

See candidate and employer lists with status and flags.

Access a document verification console: review, approve, or reject documents.

Monitor suspicious accounts with fraud flags, bot detection, and IP/device tracking.

Configure and monitor credit rules, subscription tiers, and pricing logic.

View payouts and financial summaries for the platform.

Access analytics on usage, searches, downloads, verification rates, and growth.

Maintain audit logs for consent, data access, and compliance tracking.

### Master Admin & Sub Admin

Master admin has all rights and access to the entire app/webapp and all controls to edit/delete

All access with personalized code to operate, view and communicate

Add detailed analytics, AI reporting, usage intel, employer hiring trends etc

Administer complete financial transactions and should have super user access to everything

### Sub Admin (Admin Dashboard)

Access a document verification console: review, approve, or reject documents - this feature needs to be in such a manner where an admin & candidate can communicate between themselves regarding any query resolution

Backend & Core Services

Provide secure APIs for candidate apps, employer portal, and admin dashboard.

Handle user authentication, roles (candidate/employer/admin), and permissions.

Store structured profile and biodata fields in a relational database.

Run AI-powered matching: parse resumes, index profiles, and rank candidates.

Implement the credit system: allocation, usage, expiry, and rules for earning credits.

Integrate payments for employer subscriptions and credits.

Manage payouts to candidates and keep transaction/audit records.

Store documents securely and connect to DigiLocker/NSD..

Power semantic and faceted search with search/indexing tools.

Provide logging, monitoring, and security controls (access logs, rate limiting, etc.)

  

## 3. How “Parichay” Works

### For Candidates:

Create profile and upload documents

Get documents verified (automatically or manually)

Earn credits based on verification and profile completeness

Employers can view and download their profile for credits

Earn money when employers access profile

Withdraw earnings to bank account

### For Employers:

Subscribe to a plan and receive monthly credits

Search and filter candidates by multiple criteria (Add save search criteria for repeated use)

View candidate preview with basic info (Only first name can be viewed not full name)

Download full profile using credits

Connect with candidates through messaging

Save favorites and manage team access

## 4. Key Differentiators

Candidates monetize their profile data, earning real money from sales.

The marketplace ensures fairness with fully transparent pricing.

multi-layer document verification (both automated and manual).

Higher verification levels translate to increased profile value.

Verified data builds strong employer confidence.

Candidates are ranked intelligently based purely on job relevance.

Employers benefit from transparent tracking of access and profile views.

A range of subscription tiers are available for employers.

Long-term commitments are incentivized with bonus credits.

Dynamic pricing models promote consistent platform engagement.

## 5. Technology We’ll Use

  

Mobile App Framework (Candidate): Flutter ( Android + IOS )

Web Frontend (Employer + Admin): Next.js (React)

Backend Framework: FastAPI (Python) or NodeJs

Primary Database: PostgreSQL or MongoDB

Caching / Session Store ( For fast data fetching ): Redis

File & Document Storage: AWS S3 or Google Firestore

Message Queue / Background Jobs: RabbitMQ or Celery

Mobile Push Notifications: Firebase Cloud Messaging (FCM)

User Authentication: Firebase Auth (Login With Google) or Custom Auth

SMS Provider: Twilio or MSG91

Email Provider: SendGrid or Mailgun

Payment Gateway: Razorpay or Stripe

Payouts to Candidates: Razorpay Payouts or Cashfree ( Bank / UPI )

Document Verification: DigiLocker API + NSDL API

Deployment Platform: AWS EC2 or Self-Hosted on VPS

  

## 6. Why Choose Us?

We are your single point of contact, managing the entire project lifecycle from design to integration, covering mobile apps, web, and backend development.

We build robust systems ready for safe growth, with a paramount focus on security and the highest standards of data privacy.

We ensure a seamless working relationship through clear communication, timely updates, and easy-to-understand explanation.

Our modular design approach ensures that the system can easily evolve and adapt to meet your business's changing needs over time.
