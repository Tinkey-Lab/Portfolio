'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Save, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

const serviceSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  description: z.string().min(1, 'Description is required'),
  shortDesc: z.string().min(1, 'Short description is required'),
  icon: z.string().min(1, 'Icon is required'),
  features: z.array(z.string()).optional(),
  price: z.string().optional(),
  order: z.number().optional(),
  published: z.boolean().optional(),
});

type ServiceFormData = z.infer<typeof serviceSchema>;

interface AdminServiceFormClientProps {
  service: any | null;
  isNew: boolean;
}

const iconOptions = [
  'Layout', 'Users', 'GitBranch', 'MousePointer2', 'Smartphone', 
  'Palette', 'FileText', 'Zap', 'Shield', 'Layers',
  'Code', 'PenTool', 'Figma', 'Monitor', 'Tablet',
];

export default function AdminServiceFormClient({ service, isNew }: AdminServiceFormClientProps) {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [featureInput, setFeatureInput] = useState('');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<ServiceFormData>({
    resolver: zodResolver(serviceSchema),
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      shortDesc: '',
      icon: 'Layout',
      features: [],
      price: '',
      order: 0,
      published: false,
    },
  });

  const watchedFeatures = watch('features', []);

  useEffect(() => {
    if (service) {
      reset({
        title: service.title,
        slug: service.slug,
        description: service.description,
        shortDesc: service.shortDesc,
        icon: service.icon,
        features: service.features || [],
        price: service.price || '',
        order: service.order || 0,
        published: service.published,
      });
    }
  }, [service, reset]);

  const handleFeatureAdd = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && featureInput.trim()) {
      e.preventDefault();
      const newFeatures = [...watchedFeatures, featureInput.trim()];
      setValue('features', [...new Set(newFeatures)]);
      setFeatureInput('');
    }
  };

  const handleFeatureRemove = (feature: string) => {
    setValue('features', watchedFeatures.filter(f => f !== feature));
  };

  const onSubmit = async (data: ServiceFormData) => {
    setLoading(true);
    try {
      const url = isNew ? '/api/admin/services' : `/api/admin/services/${params.id}`;
      const method = isNew ? 'POST' : 'PUT';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save service');
      }

      router.push('/admin/services');
      router.refresh();
    } catch (error) {
      console.error('Save failed:', error);
      alert(error instanceof Error ? error.message : 'Failed to save service');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark-900 dark:text-white">
            {isNew ? 'Add Service' : 'Edit Service'}
          </h1>
          <p className="text-dark-600 dark:text-dark-400 mt-1">
            {isNew ? 'Create a new service offering' : `Editing "${service?.title}"`}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => router.back()}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          <Button onClick={handleSubmit(onSubmit)} loading={loading}>
            <Save className="w-4 h-4 mr-2" />
            {isNew ? 'Create' : 'Save Changes'}
          </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Input
              label="Title *"
              placeholder="UI Design"
              {...register('title')}
              error={errors.title?.message}
            />
            <Input
              label="Slug *"
              placeholder="ui-design"
              {...register('slug')}
              error={errors.slug?.message}
              helperText="URL-friendly identifier (lowercase, numbers, hyphens only)"
            />
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Icon *"
                {...register('icon')}
                error={errors.icon?.message}
              >
                <select {...register('icon')} className="w-full px-4 py-2.5 rounded-lg border border-dark-300 dark:border-dark-600 bg-white dark:bg-dark-800 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500">
                  {iconOptions.map(icon => (
                    <option key={icon} value={icon}>{icon}</option>
                  ))}
                </select>
              </Input>
              <Input
                label="Order"
                type="number"
                {...register('order', { valueAsNumber: true })}
              />
            </div>
            <Input
              label="Price"
              placeholder="Starting at $2,000"
              {...register('price')}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Descriptions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              label="Short Description *"
              placeholder="Beautiful, accessible interfaces that delight users"
              {...register('shortDesc')}
              error={errors.shortDesc?.message}
              rows={2}
            />
            <Textarea
              label="Full Description *"
              placeholder="I create visually stunning and highly usable interfaces following modern design principles..."
              {...register('description')}
              error={errors.description?.message}
              rows={4}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Features</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-3">
              {watchedFeatures.map((feature) => (
                <span key={feature} className="inline-flex items-center gap-1 px-3 py-1 bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 rounded-full text-sm">
                  {feature}
                  <button type="button" onClick={() => handleFeatureRemove(feature)} className="ml-1 hover:text-primary-500">×</button>
                </span>
              ))}
            </div>
            <input
              type="text"
              value={featureInput}
              onChange={(e) => setFeatureInput(e.target.value)}
              onKeyDown={handleFeatureAdd}
              placeholder="Press Enter to add feature (e.g., High-fidelity mockups, Design system creation)"
              className="w-full sm:w-80 px-4 py-2.5 rounded-lg border border-dark-300 dark:border-dark-600 bg-white dark:bg-dark-800 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <p className="text-sm text-dark-500 dark:text-dark-400 mt-1">Press Enter to add each feature</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" {...register('published')} className="w-4 h-4 rounded border-dark-300 text-primary-600 focus:ring-primary-500" />
                <span className="text-sm text-dark-700 dark:text-dark-300">Published</span>
              </label>
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}