'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Save, X, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

const testimonialSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  role: z.string().min(1, 'Role is required'),
  company: z.string().optional(),
  content: z.string().min(1, 'Content is required'),
  avatar: z.string().url().optional().or(z.literal('')),
  rating: z.number().min(1).max(5),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
});

type TestimonialFormData = z.infer<typeof testimonialSchema>;

interface AdminTestimonialFormClientProps {
  testimonial: any | null;
  isNew: boolean;
}

export default function AdminTestimonialFormClient({ testimonial, isNew }: AdminTestimonialFormClientProps) {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm<TestimonialFormData>({
    resolver: zodResolver(testimonialSchema),
    defaultValues: {
      name: '',
      role: '',
      company: '',
      content: '',
      avatar: '',
      rating: 5,
      featured: false,
      published: false,
    },
  });

  const watchedAvatar = watch('avatar', '');
  const watchedRating = watch('rating', 5);

  useEffect(() => {
    if (testimonial) {
      reset({
        name: testimonial.name,
        role: testimonial.role,
        company: testimonial.company || '',
        content: testimonial.content,
        avatar: testimonial.avatar || '',
        rating: testimonial.rating,
        featured: testimonial.featured,
        published: testimonial.published,
      });
    }
  }, [testimonial, reset]);

  const onSubmit = async (data: TestimonialFormData) => {
    setLoading(true);
    try {
      const url = isNew ? '/api/admin/testimonials' : `/api/admin/testimonials/${params.id}`;
      const method = isNew ? 'POST' : 'PUT';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save testimonial');
      }

      router.push('/admin/testimonials');
      router.refresh();
    } catch (error) {
      console.error('Save failed:', error);
      alert(error instanceof Error ? error.message : 'Failed to save testimonial');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-2xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark-900 dark:text-white">
            {isNew ? 'Add Testimonial' : 'Edit Testimonial'}
          </h1>
          <p className="text-dark-600 dark:text-dark-400 mt-1">
            {isNew ? 'Add a new client testimonial' : `Editing "${testimonial?.name}"`}
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
            <CardTitle>Client Information</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Name *"
                placeholder="Sarah Chen"
                {...register('name')}
                error={errors.name?.message}
              />
              <Input
                label="Role *"
                placeholder="Product Manager"
                {...register('role')}
                error={errors.role?.message}
              />
            </div>
            <Input
              label="Company"
              placeholder="TechCorp Inc."
              {...register('company')}
            />
            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">
                Avatar Image URL
              </label>
              <div className="flex items-center gap-4">
                <div className="relative w-16 h-16 rounded-full overflow-hidden bg-dark-100 dark:bg-dark-800 flex-shrink-0">
                  {watchedAvatar && (
                    <img src={watchedAvatar} alt="Avatar preview" className="w-full h-full object-cover" />
                  )}
                </div>
                <Input
                  label=""
                  placeholder="https://example.com/avatar.jpg"
                  value={watchedAvatar}
                  onChange={(e) => register('avatar').onChange(e)}
                  error={errors.avatar?.message}
                  className="flex-1"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Testimonial Content</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              label="Content *"
              placeholder="Working with this designer was a game-changer for our product..."
              {...register('content')}
              error={errors.content?.message}
              rows={5}
            />
            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                Rating: {watchedRating} / 5
              </label>
              <div className="flex gap-1" role="radiogroup" aria-label="Rating">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => register('rating').onChange({ target: { value: star } })}
                    className={cn(
                      'p-2 rounded-lg transition-colors',
                      star <= watchedRating
                        ? 'text-yellow-400 bg-yellow-50 dark:bg-yellow-900/30'
                        : 'text-dark-300 dark:text-dark-600 hover:text-yellow-400 hover:bg-yellow-50 dark:hover:bg-yellow-900/30'
                    )}
                    role="radio"
                    aria-checked={star <= watchedRating}
                    aria-label={`${star} star${star > 1 ? 's' : ''}`}
                  >
                    <Star className="w-6 h-6 fill-current" />
                  </button>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Settings</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" {...register('featured')} className="w-4 h-4 rounded border-dark-300 text-primary-600 focus:ring-primary-500" />
                <span className="text-sm text-dark-700 dark:text-dark-300">Featured on homepage</span>
              </label>
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