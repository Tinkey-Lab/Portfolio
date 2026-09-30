import { getServerSession } from 'next-auth';
import { redirect, notFound } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import AdminTestimonialFormClient from './AdminTestimonialFormClient';

export default async function AdminTestimonialPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  const { id } = await params;
  const isNew = id === 'new';

  let testimonial = null;
  if (!isNew) {
    testimonial = await prisma.testimonial.findUnique({
      where: { id },
      include: { author: { select: { name: true, email: true } } },
    });
    if (!testimonial) notFound();
  }

  return <AdminTestimonialFormClient testimonial={testimonial} isNew={isNew} />;
}