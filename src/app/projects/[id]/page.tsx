import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import ProjectDetailClient from './ProjectDetailClient';

export const dynamic = 'force-dynamic';

export default async function ProjectDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const session = await getServerSession(authOptions);
  const { id } = await params;

  const project = await prisma.project.findUnique({
    where: { id },
    include: { author: { select: { name: true, image: true } } },
  });

  if (!project) {
    notFound();
  }

  // Allow viewing drafts if authenticated as admin
  if (!project.published && (!session || session.user.role !== 'ADMIN')) {
    notFound();
  }

  return <ProjectDetailClient project={project} />;
}