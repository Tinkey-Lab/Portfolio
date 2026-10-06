'use client';

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

const settingsSchema = z.object({
  siteName: z.string().min(1, 'Site name is required'),
  siteTagline: z.string().min(1, 'Site tagline is required'),
  heroTitle: z.string().min(1, 'Hero title is required'),
  heroSubtitle: z.string().min(1, 'Hero subtitle is required'),
  aboutTitle: z.string().min(1, 'About title is required'),
  aboutContent: z.string().min(1, 'About content is required'),
  contactEmail: z.string().email('Valid email required'),
  socialLinks: z.object({
    twitter: z.string().url().optional().or(z.literal('')),
    linkedin: z.string().url().optional().or(z.literal('')),
    github: z.string().url().optional().or(z.literal('')),
    dribbble: z.string().url().optional().or(z.literal('')),
    behance: z.string().url().optional().or(z.literal('')),
    instagram: z.string().url().optional().or(z.literal('')),
  }).optional(),
  seoTitle: z.string().min(1, 'SEO title is required'),
  seoDescription: z.string().min(1, 'SEO description is required'),
  ogImage: z.string().url().optional().or(z.literal('')),
});

type SettingsFormData = z.infer<typeof settingsSchema>;

interface AdminSettingsClientProps {
  settings: any;
}

export default function AdminSettingsClient({ settings }: AdminSettingsClientProps) {
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<SettingsFormData>({
    resolver: zodResolver(settingsSchema),
    defaultValues: {
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

  useEffect(() => {
    if (settings) {
      reset({
        siteName: settings.siteName,
        siteTagline: settings.siteTagline,
        heroTitle: settings.heroTitle,
        heroSubtitle: settings.heroSubtitle,
        aboutTitle: settings.aboutTitle,
        aboutContent: settings.aboutContent,
        contactEmail: settings.contactEmail,
        socialLinks: settings.socialLinks || {},
        seoTitle: settings.seoTitle,
        seoDescription: settings.seoDescription,
        ogImage: settings.ogImage || '',
      });
    }
  }, [settings, reset]);

  const onSubmit = async (data: SettingsFormData) => {
    setLoading(true);
    try {
      const response = await fetch('/api/admin/settings', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save settings');
      }

      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Save failed:', error);
      alert(error instanceof Error ? error.message : 'Failed to save settings');
    } finally {
      setLoading(false);
    }
  };

  const socialFields = [
    { key: 'twitter', label: 'Twitter/X', placeholder: 'https://twitter.com/username' },
    { key: 'linkedin', label: 'LinkedIn', placeholder: 'https://linkedin.com/in/username' },
    { key: 'github', label: 'GitHub', placeholder: 'https://github.com/username' },
    { key: 'dribbble', label: 'Dribbble', placeholder: 'https://dribbble.com/username' },
    { key: 'behance', label: 'Behance', placeholder: 'https://behance.net/username' },
    { key: 'instagram', label: 'Instagram', placeholder: 'https://instagram.com/username' },
  ];

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark-900 dark:text-white">Site Settings</h1>
          <p className="text-dark-600 dark:text-dark-400 mt-1">Configure your portfolio site settings</p>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>General Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Site Name *"
              {...register('siteName')}
              error={errors.siteName?.message}
            />
            <Input
              label="Site Tagline *"
              {...register('siteTagline')}
              error={errors.siteTagline?.message}
            />
            <Input
              label="Contact Email *"
              type="email"
              {...register('contactEmail')}
              error={errors.contactEmail?.message}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Hero Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Hero Title *"
              {...register('heroTitle')}
              error={errors.heroTitle?.message}
            />
            <Textarea
              label="Hero Subtitle *"
              {...register('heroSubtitle')}
              error={errors.heroSubtitle?.message}
              rows={3}
            />
            <Input
              label="OG Image URL"
              placeholder="https://example.com/og-image.png"
              {...register('ogImage')}
              error={errors.ogImage?.message}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>About Section</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="About Title *"
              {...register('aboutTitle')}
              error={errors.aboutTitle?.message}
            />
            <Textarea
              label="About Content *"
              placeholder="Tell your story, background, and what makes you unique..."
              {...register('aboutContent')}
              error={errors.aboutContent?.message}
              rows={6}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Social Links</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              {socialFields.map((field) => (
                <Input
                  key={field.key}
                  label={field.label}
                  placeholder={field.placeholder}
                  {...register(`socialLinks.${field.key}` as any)}
                />
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>SEO Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="SEO Title *"
              {...register('seoTitle')}
              error={errors.seoTitle?.message}
            />
            <Textarea
              label="SEO Description *"
              {...register('seoDescription')}
              error={errors.seoDescription?.message}
              rows={3}
            />
          </CardContent>
        </Card>

        <div className="flex justify-end gap-3">
          <Button type="submit" loading={loading}>
            <Save className="w-4 h-4 mr-2" />
            Save Settings
          </Button>
        </div>
      </form>
    </div>
  );
}