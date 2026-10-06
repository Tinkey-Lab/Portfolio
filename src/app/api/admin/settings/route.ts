import { NextRequest, NextResponse } from 'next/server';
import { getServerSession } from 'next-auth';
import { authOptions } from '@/lib/auth';
import { prisma } from '@/lib/prisma';
import { z } from 'zod';

const settingsSchema = z.object({
  siteName: z.string().min(1).optional(),
  siteTagline: z.string().min(1).optional(),
  heroTitle: z.string().min(1).optional(),
  heroSubtitle: z.string().min(1).optional(),
  aboutTitle: z.string().min(1).optional(),
  aboutContent: z.string().min(1).optional(),
  contactEmail: z.string().email().optional(),
  socialLinks: z.object({
    twitter: z.string().url().optional().or(z.literal('')),
    linkedin: z.string().url().optional().or(z.literal('')),
    github: z.string().url().optional().or(z.literal('')),
    dribbble: z.string().url().optional().or(z.literal('')),
    behance: z.string().url().optional().or(z.literal('')),
    instagram: z.string().url().optional().or(z.literal('')),
  }).optional(),
  seoTitle: z.string().min(1).optional(),
  seoDescription: z.string().min(1).optional(),
  ogImage: z.string().url().optional().or(z.literal('')),
});

export async function GET() {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

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

    return NextResponse.json(settings);
  } catch (error) {
    console.error('Settings GET error:', error);
    return NextResponse.json({ error: 'Failed to fetch settings' }, { status: 500 });
  }
}

export async function PUT(request: NextRequest) {
  try {
    const session = await getServerSession(authOptions);
    if (!session) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await request.json();
    const validatedData = settingsSchema.parse(body);

    let settings = await prisma.siteSettings.findFirst();
    
    if (!settings) {
      settings = await prisma.siteSettings.create({
        data: {
          siteName: validatedData.siteName || 'UI/UX Designer',
          siteTagline: validatedData.siteTagline || 'Crafting beautiful digital experiences',
          heroTitle: validatedData.heroTitle || 'Designing with Purpose',
          heroSubtitle: validatedData.heroSubtitle || 'I create intuitive, accessible, and visually stunning digital products.',
          aboutTitle: validatedData.aboutTitle || 'About Me',
          aboutContent: validatedData.aboutContent || '',
          contactEmail: validatedData.contactEmail || 'hello@example.com',
          socialLinks: validatedData.socialLinks || {},
          seoTitle: validatedData.seoTitle || 'UI/UX Designer | Portfolio',
          seoDescription: validatedData.seoDescription || 'Award-winning UI/UX designer creating intuitive digital experiences.',
          ogImage: validatedData.ogImage || '',
        },
      });
    } else {
      settings = await prisma.siteSettings.update({
        where: { id: settings.id },
        data: validatedData,
      });
    }

    return NextResponse.json(settings);
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Validation failed', details: error.flatten().fieldErrors },
        { status: 400 }
      );
    }
    console.error('Settings PUT error:', error);
    return NextResponse.json({ error: 'Failed to update settings' }, { status: 500 });
  }
}