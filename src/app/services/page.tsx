import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import ServicesPageClient from './ServicesPageClient';

export default async function ServicesPage() {
  const session = await getServerSession(authOptions);
  const isAdmin = session?.user?.role === 'ADMIN';

  const services = await prisma.service.findMany({
    where: isAdmin ? {} : { published: true },
    orderBy: { order: 'asc' },
  });

  return <ServicesPageClient services={services} isAdmin={isAdmin} />;
}