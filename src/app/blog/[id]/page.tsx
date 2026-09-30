import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import BlogDetailClient from './BlogDetailClient';

export async function generateStaticParams() {
  const posts = await prisma.blogPost.findMany({
    where: { published: true },
    select: { id: true },
  });
  return posts.map((post) => ({ id: post.id }));
}

export default async function BlogDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);
  const { id } = await params;

  const post = await prisma.blogPost.findUnique({
    where: { id },
    include: { author: { select: { name: true, image: true } } },
  });

  if (!post) {
    notFound();
  }

  if (!post.published && (!session || session.user.role !== 'ADMIN')) {
    notFound();
  }

  return <BlogDetailClient post={post} />;
}