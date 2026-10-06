import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import AdminDashboardClient from './AdminDashboardClient';

export default async function AdminDashboardPage() {
  const session = await getServerSession(authOptions);
  
  if (!session) {
    redirect('/admin/login');
  }

  const [projectsCount, blogCount, testimonialsCount, servicesCount, recentProjects, recentBlog] = await Promise.all([
    prisma.project.count(),
    prisma.blogPost.count(),
    prisma.testimonial.count(),
    prisma.service.count(),
    prisma.project.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { id: true, title: true, published: true, createdAt: true },
    }),
    prisma.blogPost.findMany({
      take: 5,
      orderBy: { createdAt: 'desc' },
      select: { id: true, title: true, published: true, createdAt: true },
    }),
  ]);

  return <AdminDashboardClient 
    stats={{ projectsCount, blogCount, testimonialsCount, servicesCount }}
    recentProjects={recentProjects}
    recentBlog={recentBlog}
  />;
}