import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import BlogListClient from './BlogListClient';

export default async function BlogListPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string; tag?: string; search?: string }>;
}) {
  const session = await getServerSession(authOptions);
  const { page = '1', tag = '', search = '' } = await searchParams;
  const pageNum = parseInt(page);
  const limit = 9;
  const skip = (pageNum - 1) * limit;

  const where: any = { published: true };
  if (tag) where.tags = { has: tag };
  if (search) {
    where.OR = [
      { title: { contains: search, mode: 'insensitive' } },
      { excerpt: { contains: search, mode: 'insensitive' } },
      { tags: { hasSome: [search] } },
    ];
  }

  const [posts, total, allTags] = await Promise.all([
    prisma.blogPost.findMany({
      where,
      skip,
      take: limit,
      orderBy: { publishedAt: 'desc' },
      include: { author: { select: { name: true, image: true } } },
    }),
    prisma.blogPost.count({ where }),
    prisma.blogPost.findMany({
      where: { published: true },
      select: { tags: true },
    }),
  ]);

  const uniqueTags = Array.from(new Set(allTags.flatMap(p => p.tags)));

  return <BlogListClient
    posts={posts}
    pagination={{ page: pageNum, limit, total, totalPages: Math.ceil(total / limit) }}
    tag={tag}
    search={search}
    allTags={uniqueTags}
  />;
}