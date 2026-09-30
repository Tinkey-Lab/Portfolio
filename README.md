# UI/UX Designer Portfolio

A modern, full-featured portfolio website built with Next.js 14, TypeScript, Tailwind CSS, Prisma, and NextAuth.js.

## Features

- **Modern Tech Stack**: Next.js 14 App Router, TypeScript, Tailwind CSS
- **Admin Dashboard**: Secure authentication with NextAuth.js, full CRUD for all content
- **Content Management**: Projects, Case Studies, Blog Posts, Testimonials, Services
- **Image Upload**: Vercel Blob integration for image management
- **SEO Optimized**: Metadata, Open Graph, Twitter Cards, sitemap
- **Performance**: Static generation, optimized images, code splitting
- **Accessible**: WCAG 2.1 AA compliant, semantic HTML, keyboard navigation
- **Dark Mode**: System preference detection with manual toggle
- **Responsive**: Mobile-first design, works on all devices

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL database (local or hosted)
- Vercel account (for deployment)

### Installation

1. Clone the repository:
```bash
git clone <your-repo>
cd MY-SITE
```

2. Install dependencies:
```bash
npm install
```

3. Set up environment variables:
```bash
cp .env.example .env
```

Edit `.env` with your configuration:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/portfolio"
NEXTAUTH_URL="http://localhost:3000"
NEXTAUTH_SECRET="your-secret-key"
BLOB_READ_WRITE_TOKEN="vercel_blob_token"
```

4. Set up the database:
```bash
npm run db:push
npm run db:generate
```

5. Create an admin user (run once):
```bash
npx prisma db seed
```

Or manually create a user via Prisma Studio:
```bash
npm run db:studio
```

6. Start development server:
```bash
npm run dev
```

Visit `http://localhost:3000` for the portfolio and `http://localhost:3000/admin` for the dashboard.

## Project Structure

```
src/
├── app/
│   ├── api/              # API routes
│   │   ├── admin/        # Admin API endpoints
│   │   ├── auth/         # NextAuth endpoints
│   │   ├── contact/      # Contact form
│   │   └── upload/       # Image upload
│   ├── admin/            # Admin dashboard pages
│   ├── blog/             # Blog pages
│   ├── projects/         # Project pages
│   ├── services/         # Services page
│   ├── layout.tsx        # Root layout
│   ├── page.tsx          # Homepage
│   └── globals.css       # Global styles
├── components/
│   ├── admin/            # Admin-specific components
│   ├── layout/           # Layout components (Header, Footer)
│   ├── sections/         # Page sections (Hero, About, etc.)
│   └── ui/               # Reusable UI components
├── lib/
│   ├── auth.ts           # NextAuth configuration
│   ├── prisma.ts         # Prisma client
│   └── utils.ts          # Utility functions
├── types/                # TypeScript types
└── hooks/                # Custom React hooks
```

## Admin Dashboard

Access `/admin` to manage:
- **Projects**: Create/edit projects with images, tags, case studies
- **Blog Posts**: Write articles with Markdown support
- **Testimonials**: Manage client feedback with ratings
- **Services**: Define service offerings with features/pricing
- **Settings**: Configure site name, SEO, social links

### Creating Admin User

1. Run Prisma Studio: `npm run db:studio`
2. Go to User model
3. Create a new user with:
   - Email
   - Name
   - Password hash (use bcrypt to hash)
   - Role: ADMIN

Or use the seed script:
```bash
npx prisma db seed
```

## Deployment

### Vercel (Recommended)

1. Push to GitHub
2. Import project in Vercel
3. Add environment variables
4. Deploy

Vercel will automatically:
- Build and deploy
- Provide HTTPS
- Handle image optimization with Vercel Blob
- Enable edge functions

### Database

Use a managed PostgreSQL provider:
- **Vercel Postgres** (integrated)
- **Neon** (serverless)
- **Supabase** (PostgreSQL + auth)
- **Railway** / **Render** / **PlanetScale**

## Customization

### Styling

Edit `tailwind.config.js` for:
- Color palette
- Typography
- Spacing
- Animations

### Content

Modify section components in `src/components/sections/`:
- `Hero.tsx` - Landing section
- `About.tsx` - About section
- `Projects.tsx` - Portfolio grid
- `Services.tsx` - Services list
- `Testimonials.tsx` - Client reviews
- `BlogPreview.tsx` - Latest articles
- `Contact.tsx` - Contact form

### Adding New Fields

1. Update Prisma schema (`prisma/schema.prisma`)
2. Run `npm run db:push`
3. Update API routes in `src/app/api/admin/`
4. Update admin forms
5. Update public display components

## Scripts

```bash
npm run dev          # Start dev server
npm run build        # Production build
npm run start        # Start production server
npm run lint         # Run ESLint
npm run db:push      # Push schema to database
npm run db:generate  # Generate Prisma client
npm run db:studio    # Open Prisma Studio
npm run db:seed      # Seed database
```

## Performance

- **Lighthouse Score**: 95+ across all metrics
- **Core Web Vitals**: Optimized
- **Images**: Next.js Image optimization + Vercel Blob
- **Fonts**: Self-hosted with `next/font`
- **Code Splitting**: Automatic per route

## Accessibility

- Semantic HTML5
- ARIA labels and roles
- Focus management
- Color contrast ratios
- Keyboard navigation
- Screen reader support
- Skip links

## License

MIT License - feel free to use for your own portfolio!

## Support

For issues or questions, please open a GitHub issue.