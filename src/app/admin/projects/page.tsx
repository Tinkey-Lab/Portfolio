import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import AdminProjectsClient from './AdminProjectsClient';

export default async function AdminProjectsPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; search?: string; status?: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const { page = '1', search = '', status = '' } = await searchParams;
  const pageNum = parseInt(page);
  const limit = 10;
  const skip = (pageNum - 1) * limit;

  const where: any = {};
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { description: { contains: search, mode: 'insensitive' } },
    ];
  }
  if (status === 'published') where.published = true;
  if (status === 'draft') where.published = false;

  const [projects, total, categories] = await Promise.all([
    prisma.project.findMany({
      where,
      skip,
      take: limit,
      orderBy: { order: 'asc' },
      include: { author: { select: { name: true } } },
    }),
    prisma.project.count({ where }),
    prisma.project.groupBy({
      by: ['category'],
      _count: { category: true },
    }),
  ]);

  return <AdminProjectsClient
    projects={projects}
    pagination={{ page: pageNum, limit, total, totalPages: Math.ceil(total / limit) }}
    search={search}
    status={status}
    categories={categories.map(c => c.category)}
  />;
}