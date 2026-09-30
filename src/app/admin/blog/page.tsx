import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import AdminBlogClient from './AdminBlogClient';

export default async function AdminBlogPage({
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
      { excerpt: { contains: search, mode: 'insensitive' } },
    ];
  }
  if (status === 'published') where.published = true;
  if (status === 'draft') where.published = false;

  const [posts, total] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      skip,
      take: limit,
      orderBy: { createdAt: 'desc' },
      include: { author: { select: { name: true } } },
    }),
    prisma.blogPost.count({ where }),
  ]);

  return <AdminBlogClient
    posts={posts}
    pagination={{ page: pageNum, limit, total, totalPages: Math.ceil(total / limit) }}
    search={search}
    status={status}
  />;
}