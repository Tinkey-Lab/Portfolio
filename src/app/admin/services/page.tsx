import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import AdminServicesClient from './AdminServicesClient';

export default async function AdminServicesPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const services = await prisma.service.findMany({
    orderBy: { order: 'asc' },
    include: { author: { select: { name: true } } },
  });

  return <AdminServicesClient services={services} />;
}