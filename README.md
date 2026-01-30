# Nadir UZ Official Website

A production-ready website project for independent Turkish rapper Nadir UZ. Built with Next.js 15, Tailwind CSS, Prisma, and SQLite.

## Features

- **Cinematic Landing Page**: High-impact design with Hero, Latest Release, Music Grid, Video Gallery, Tour Dates, and About sections.
- **Admin Dashboard**: Secure management panel to update all site content dynamically.
- **Authentication**: Simple JWT-based login for administratation.
- **Responsive Design**: Mobile-first approach with smooth animations.
- **Robust Data Layer**: Prisma + SQLite with fallback mechanisms.

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Icons**: Lucide React
- **Database**: Prisma + SQLite
- **Auth**: JWT + Cookies

## Getting Started

### 1. Prerequisites
- Node.js 18.x or higher
- npm or yarn

### 2. Installation
```bash
npm install
```

### 3. Environment Setup
Create a `.env` file in the root directory:
```env
DATABASE_URL="file:./dev.db"
ADMIN_EMAIL="admin@nadiruz.net"
ADMIN_PASSWORD="your-secure-password"
SITE_URL="http://localhost:3000"
JWT_SECRET="your-random-secret-key"
```

### 4. Database Setup
```bash
npx prisma migrate dev --name init
npx prisma db seed
```

### 5. Run Development Server
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) to see the site.
Go to [http://localhost:3000/admin](http://localhost:3000/admin) for management.

## Project Structure

- `src/app`: Routes and API endpoints.
- `src/components`: UI components (sections, admin, shared).
- `src/lib`: Utilities (Prisma, Auth, cn).
- `prisma`: Database schema and seed scripts.

## License
MIT
