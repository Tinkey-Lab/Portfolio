import { getServerSession } from 'next-auth';
import { redirect, notFound } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import AdminProjectFormClient from './AdminProjectFormClient';

export default async function AdminProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const { id } = await params;
  const isNew = id === 'new';

  let project = null;
  if (!isNew) {
    project = await prisma.project.findUnique({
      where: { id },
      include: { author: { select: { name: true, email: true } } },
    });
    if (!project) notFound();
  }

  return <AdminProjectFormClient project={project} isNew={isNew} />;
}