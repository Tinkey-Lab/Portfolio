import { getServerSession } from 'next-auth';
import { redirect, notFound } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import AdminBlogFormClient from './AdminBlogFormClient';

export default async function AdminBlogPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const { id } = await params;
  const isNew = id === 'new';

  let post = null;
  if (!isNew) {
    post = await prisma.blogPost.findUnique({
      where: { id },
      include: { author: { select: { name: true, email: true } } },
    });
    if (!post) notFound();
  }

  return <AdminBlogFormClient post={post} isNew={isNew} />;
}