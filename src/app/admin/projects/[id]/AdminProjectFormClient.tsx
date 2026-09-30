'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Save, X, Image as ImageIcon, Plus, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Modal } from '@/components/ui/Modal';
import { cn } from '@/lib/utils';

const projectSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  description: z.string().min(1, 'Description is required'),
  shortDesc: z.string().min(1, 'Short description is required').max(200, 'Short description must be under 200 characters'),
  thumbnail: z.string().url('Valid image URL required'),
  images: z.array(z.string().url()).optional(),
  tags: z.array(z.string()).optional(),
  category: z.string().min(1, 'Category is required'),
  featured: z.boolean().optional(),
  published: z.boolean().optional(),
  liveUrl: z.string().url().optional().or(z.literal('')),
  repoUrl: z.string().url().optional().or(z.literal('')),
  caseStudy: z.string().optional(),
  order: z.number().optional(),
});

type ProjectFormData = z.infer<typeof projectSchema>;

interface AdminProjectFormClientProps {
  project: any | null;
  isNew: boolean;
}

const categories = ['Web App', 'Mobile App', 'Dashboard', 'E-commerce', 'SaaS', 'Design System', 'Other'];

export default function AdminProjectFormClient({ project, isNew }: AdminProjectFormClientProps) {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [imageInput, setImageInput] = useState('');
  const [showImageModal, setShowImageModal] = useState(false);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<ProjectFormData>({
    resolver: zodResolver(projectSchema),
    defaultValues: {
      title: '',
      slug: '',
      description: '',
      shortDesc: '',
      thumbnail: '',
      images: [],
      tags: [],
      category: 'Web App',
      featured: false,
      published: false,
      liveUrl: '',
      repoUrl: '',
      caseStudy: '',
      order: 0,
    },
  });

  const watchedTags = watch('tags', []);
  const watchedImages = watch('images', []);

  useEffect(() => {
    if (project) {
      reset({
        title: project.title,
        slug: project.slug,
        description: project.description,
        shortDesc: project.shortDesc,
        thumbnail: project.thumbnail,
        images: project.images || [],
        tags: project.tags || [],
        category: project.category,
        featured: project.featured,
        published: project.published,
        liveUrl: project.liveUrl || '',
        repoUrl: project.repoUrl || '',
        caseStudy: project.caseStudy || '',
        order: project.order || 0,
      });
    }
  }, [project, reset]);

  const handleTagAdd = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && tagInput.trim()) {
      e.preventDefault();
      const newTags = [...watchedTags, tagInput.trim()];
      setValue('tags', [...new Set(newTags)]);
      setTagInput('');
    }
  };

  const handleTagRemove = (tag: string) => {
    setValue('tags', watchedTags.filter(t => t !== tag));
  };

  const handleImageAdd = () => {
    if (imageInput.trim()) {
      try {
        new URL(imageInput.trim());
        const newImages = [...watchedImages, imageInput.trim()];
        setValue('images', [...new Set(newImages)]);
        setImageInput('');
        setShowImageModal(false);
      } catch {
        alert('Please enter a valid URL');
      }
    }
  };

  const handleImageRemove = (image: string) => {
    setValue('images', watchedImages.filter(i => i !== image));
  };

  const handleThumbnailUpload = async () => {
    setUploading(true);
    try {
      const response = await fetch('/api/admin/upload', {
        method: 'POST',
        body: (() => {
          const formData = new FormData();
          const input = document.createElement('input');
          input.type = 'file';
          input.accept = 'image/*';
          input.onchange = async () => {
            if (input.files?.[0]) {
              formData.append('file', input.files[0]);
              formData.append('folder', 'projects/thumbnails');
              const res = await fetch('/api/admin/upload', { method: 'POST', body: formData });
              const data = await res.json();
              if (data.url) setValue('thumbnail', data.url);
            }
          };
          input.click();
        })(),
      });
    } catch (error) {
      console.error('Upload failed:', error);
    } finally {
      setUploading(false);
    }
  };

  const onSubmit = async (data: ProjectFormData) => {
    setLoading(true);
    try {
      const url = isNew ? '/api/admin/projects' : `/api/admin/projects/${params.id}`;
      const method = isNew ? 'POST' : 'PUT';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save project');
      }

      router.push('/admin/projects');
      router.refresh();
    } catch (error) {
      console.error('Save failed:', error);
      alert(error instanceof Error ? error.message : 'Failed to save project');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark-900 dark:text-white">
            {isNew ? 'Create Project' : 'Edit Project'}
          </h1>
          <p className="text-dark-600 dark:text-dark-400 mt-1">
            {isNew ? 'Add a new project to your portfolio' : `Editing "${project?.title}"`}
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
              placeholder="My Amazing Project"
              {...register('title')}
              error={errors.title?.message}
            />
            <Input
              label="Slug *"
              placeholder="my-amazing-project"
              {...register('slug')}
              error={errors.slug?.message}
              helperText="URL-friendly identifier (lowercase, numbers, hyphens only)"
            />
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Category *"
                {...register('category')}
                error={errors.category?.message}
              >
                <select {...register('category')} className="w-full px-4 py-2.5 rounded-lg border border-dark-300 dark:border-dark-600 bg-white dark:bg-dark-800 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500">
                  {categories.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
              </Input>
              <Input
                label="Order"
                type="number"
                {...register('order', { valueAsNumber: true })}
              />
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Descriptions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Textarea
              label="Short Description *"
              placeholder="A brief summary for project cards (max 200 chars)"
              {...register('shortDesc')}
              error={errors.shortDesc?.message}
              rows={3}
            />
            <Textarea
              label="Full Description *"
              placeholder="Detailed project description for the case study page..."
              {...register('description')}
              error={errors.description?.message}
              rows={6}
            />
            <Textarea
              label="Case Study Content (Markdown)"
              placeholder="Write your full case study in Markdown format..."
              {...register('caseStudy')}
              rows={10}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Images</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-1.5">
                Thumbnail Image *
              </label>
              <div className="flex items-center gap-4">
                <div className="relative w-32 h-20 rounded-lg overflow-hidden bg-dark-100 dark:bg-dark-800">
                  {watch('thumbnail') && (
                    <Image
                      src={watch('thumbnail')}
                      alt="Thumbnail preview"
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  )}
                </div>
                <div className="flex flex-col gap-2">
                  <Button variant="outline" onClick={handleThumbnailUpload} loading={uploading}>
                    <ImageIcon className="w-4 h-4 mr-2" />
                    {watch('thumbnail') ? 'Change' : 'Upload'}
                  </Button>
                  <Input
                    label=""
                    placeholder="https://example.com/image.jpg"
                    value={watch('thumbnail')}
                    onChange={(e) => setValue('thumbnail', e.target.value)}
                    error={errors.thumbnail?.message}
                    className="max-w-md"
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-dark-700 dark:text-dark-300 mb-2">
                Additional Images
              </label>
              <div className="flex flex-wrap gap-2 mb-2">
                {watchedImages.map((img, idx) => (
                  <div key={idx} className="relative group">
                    <div className="w-20 h-20 rounded-lg overflow-hidden bg-dark-100 dark:bg-dark-800">
                      <Image src={img} alt={`Additional ${idx + 1}`} fill className="object-cover" sizes="80px" />
                    </div>
                    <button
                      type="button"
                      onClick={() => handleImageRemove(img)}
                      className="absolute top-1 right-1 p-1 rounded bg-red-500 text-white opacity-0 group-hover:opacity-100 transition-opacity"
                      aria-label="Remove image"
                    >
                      <Trash2 className="w-3 h-3" />
                    </button>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => setShowImageModal(true)}
                  className="w-20 h-20 rounded-lg border-2 border-dashed border-dark-300 dark:border-dark-600 flex flex-col items-center justify-center text-dark-400 hover:border-primary-500 dark:hover:border-primary-500 transition-colors"
                >
                  <Plus className="w-6 h-6 mb-1" />
                  <span className="text-xs">Add</span>
                </button>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tags</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2 mb-3">
              {watchedTags.map((tag) => (
                <Badge key={tag} variant="outline" className="gap-1" onClick={() => handleTagRemove(tag)}>
                  {tag}
                  <span className="cursor-pointer ml-1">×</span>
                </Badge>
              ))}
            </div>
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={handleTagAdd}
              placeholder="Press Enter to add tag"
              className="w-full sm:w-64 px-4 py-2.5 rounded-lg border border-dark-300 dark:border-dark-600 bg-white dark:bg-dark-800 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <p className="text-sm text-dark-500 dark:text-dark-400 mt-1">Press Enter to add each tag</p>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Links & Settings</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid sm:grid-cols-2 gap-4">
              <Input
                label="Live Demo URL"
                placeholder="https://myproject.com"
                {...register('liveUrl')}
                error={errors.liveUrl?.message}
              />
              <Input
                label="Repository URL"
                placeholder="https://github.com/username/project"
                {...register('repoUrl')}
                error={errors.repoUrl?.message}
              />
            </div>
            <div className="flex items-center gap-6">
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" {...register('featured')} className="w-4 h-4 rounded border-dark-300 text-primary-600 focus:ring-primary-500" />
                <span className="text-sm text-dark-700 dark:text-dark-300">Featured Project</span>
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input type="checkbox" {...register('published')} className="w-4 h-4 rounded border-dark-300 text-primary-600 focus:ring-primary-500" />
                <span className="text-sm text-dark-700 dark:text-dark-300">Published</span>
              </label>
            </div>
          </CardContent>
        </Card>
      </form>

      <Modal open={showImageModal} onClose={() => setShowImageModal(false)} title="Add Image URL">
        <div className="space-y-4">
          <Input
            label="Image URL"
            placeholder="https://example.com/image.jpg"
            value={imageInput}
            onChange={(e) => setImageInput(e.target.value)}
          />
          <div className="flex justify-end gap-3">
            <Button variant="outline" onClick={() => setShowImageModal(false)}>Cancel</Button>
            <Button onClick={handleImageAdd}>Add Image</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}