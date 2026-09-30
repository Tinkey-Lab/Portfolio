import { getServerSession } from 'next-auth';
import { redirect, notFound } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import AdminServiceFormClient from './AdminServiceFormClient';

export default async function AdminServicePage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const { id } = await params;
  const isNew = id === 'new';

  let service = null;
  if (!isNew) {
    service = await prisma.service.findUnique({
      where: { id },
      include: { author: { select: { name: true, email: true } } },
    });
    if (!service) notFound();
  }

  return <AdminServiceFormClient service={service} isNew={isNew} />;
}