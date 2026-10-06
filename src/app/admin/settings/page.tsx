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
        siteName: 'UI/UX Designer',
        siteTagline: 'Crafting beautiful digital experiences',
        heroTitle: 'Designing with Purpose',
        heroSubtitle: 'I create intuitive, accessible, and visually stunning digital products.',
        aboutTitle: 'About Me',
        aboutContent: '',
        contactEmail: 'hello@example.com',
        socialLinks: {},
        seoTitle: 'UI/UX Designer | Portfolio',
        seoDescription: 'Award-winning UI/UX designer creating intuitive digital experiences.',
        ogImage: '',
      },
    });
  }

  return <AdminSettingsClient settings={settings} />;
}