import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import AdminSettingsClient from './AdminSettingsClient';

export default async function AdminSettingsPage() {
  const session = await getServerSession(authOptions);
  if (!session) redirect('/admin/login');

  let settings = await prisma.siteSettings.findFirst();
  
  if (!settings) {
    settings = await prisma.siteSettings.create({
      data: {
        contactEmail: 'hello@example.com',
        socialLinks: {},
        seoTitle: 'UI/UX Designer | Portfolio',
        seoDescription: 'Award-winning UI/UX designer creating intuitive digital experiences.',
      },
    });
  }

  return <AdminSettingsClient settings={settings} />;
}