import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import ProjectsListClient from './ProjectsListClient';

export default async function ProjectsListPage({
  searchParams,
}: {
  searchParams: Promise<{ view?: string; category?: string }>;
}) {
  const session = await getServerSession(authOptions);
  const { view = 'grid', category = '' } = await searchParams;
  const isAdmin = session?.user?.role === 'ADMIN';

  const where: any = isAdmin ? {} : { published: true };
  if (category) where.category = category;

  const [projects, categories] = await Promise.all([
    prisma.project.findMany({
      where,
      orderBy: { order: 'asc' },
    }),
    prisma.project.groupBy({
      by: ['category'],
      _count: { category: true },
    }),
  ]);

  return <ProjectsListClient
    projects={projects}
    view={view}
    category={category}
    categories={categories.map(c => c.category)}
    isAdmin={isAdmin}
  />;
}