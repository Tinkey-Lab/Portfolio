'use client';

import { useState, useEffect } from 'react';
import { useRouter, useParams } from 'next/navigation';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Loader2, Save, X, Image as ImageIcon, Eye, Edit } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

const blogSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  slug: z.string().min(1, 'Slug is required').regex(/^[a-z0-9-]+$/, 'Slug can only contain lowercase letters, numbers, and hyphens'),
  excerpt: z.string().min(1, 'Excerpt is required').max(300, 'Excerpt must be under 300 characters'),
  content: z.string().min(1, 'Content is required'),
  coverImage: z.string().url().optional().or(z.literal('')),
  tags: z.array(z.string()).optional(),
  published: z.boolean().optional(),
});

type BlogFormData = z.infer<typeof blogSchema>;

interface AdminBlogFormClientProps {
  post: any | null;
  isNew: boolean;
}

export default function AdminBlogFormClient({ post, isNew }: AdminBlogFormClientProps) {
  const router = useRouter();
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [tagInput, setTagInput] = useState('');
  const [previewMode, setPreviewMode] = useState<'edit' | 'preview'>('edit');

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
    reset,
  } = useForm<BlogFormData>({
    resolver: zodResolver(blogSchema),
    defaultValues: {
      title: '',
      slug: '',
      excerpt: '',
      content: '',
      coverImage: '',
      tags: [],
      published: false,
    },
  });

  const watchedTags = watch('tags', []);
  const watchedContent = watch('content', '');
  const watchedCoverImage = watch('coverImage', '');

  useEffect(() => {
    if (post) {
      reset({
        title: post.title,
        slug: post.slug,
        excerpt: post.excerpt,
        content: post.content,
        coverImage: post.coverImage || '',
        tags: post.tags || [],
        published: post.published,
      });
    }
  }, [post, reset]);

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

  const onSubmit = async (data: BlogFormData) => {
    setLoading(true);
    try {
      const url = isNew ? '/api/admin/blog' : `/api/admin/blog/${params.id}`;
      const method = isNew ? 'POST' : 'PUT';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.error || 'Failed to save post');
      }

      router.push('/admin/blog');
      router.refresh();
    } catch (error) {
      console.error('Save failed:', error);
      alert(error instanceof Error ? error.message : 'Failed to save post');
    } finally {
      setLoading(false);
    }
  };

  const renderMarkdown = (text: string) => {
    return text
      .replace(/^### (.*$)/gim, '<h3>$1</h3>')
      .replace(/^## (.*$)/gim, '<h2>$1</h2>')
      .replace(/^# (.*$)/gim, '<h1>$1</h1>')
      .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
      .replace(/\*(.+?)\*/g, '<em>$1</em>')
      .replace(/`(.+?)`/g, '<code>$1</code>')
      .replace(/\[(.+?)\]\((.+?)\)/g, '<a href="$2" target="_blank" rel="noopener">$1</a>')
      .replace(/\n/g, '<br>');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-dark-900 dark:text-white">
            {isNew ? 'Create Blog Post' : 'Edit Blog Post'}
          </h1>
          <p className="text-dark-600 dark:text-dark-400 mt-1">
            {isNew ? 'Write a new article for your blog' : `Editing "${post?.title}"`}
          </p>
        </div>
        <div className="flex gap-3">
          <Button variant="outline" onClick={() => router.back()}>
            <X className="w-4 h-4 mr-2" />
            Cancel
          </Button>
          {post?.published && (
            <a href={`/blog/${post.slug}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-dark-600 dark:text-dark-300 hover:text-primary-600 dark:hover:text-primary-400">
              <Eye className="w-4 h-4" />
              View Live
            </a>
          )}
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
              placeholder="My Amazing Design Article"
              {...register('title')}
              error={errors.title?.message}
            />
            <Input
              label="Slug *"
              placeholder="my-amazing-design-article"
              {...register('slug')}
              error={errors.slug?.message}
              helperText="URL-friendly identifier (lowercase, numbers, hyphens only)"
            />
            <Textarea
              label="Excerpt *"
              placeholder="A compelling summary that appears in previews and SEO (max 300 chars)"
              {...register('excerpt')}
              error={errors.excerpt?.message}
              rows={3}
            />
            <Input
              label="Cover Image URL"
              placeholder="https://example.com/cover.jpg"
              {...register('coverImage')}
              error={errors.coverImage?.message}
            />
            {watchedCoverImage && (
              <div className="relative w-64 h-36 rounded-lg overflow-hidden bg-dark-100 dark:bg-dark-800">
                <img src={watchedCoverImage} alt="Cover preview" className="w-full h-full object-cover" />
              </div>
            )}
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Content (Markdown)</CardTitle>
            <div className="flex gap-2">
              <Button 
                variant={previewMode === 'edit' ? 'primary' : 'outline'} 
                onClick={() => setPreviewMode('edit')}
                type="button"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit
              </Button>
              <Button 
                variant={previewMode === 'preview' ? 'primary' : 'outline'} 
                onClick={() => setPreviewMode('preview')}
                type="button"
              >
                <Eye className="w-4 h-4 mr-2" />
                Preview
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            {previewMode === 'edit' ? (
              <Textarea
                label="Markdown Content"
                placeholder="# Heading\n\nYour content here...\n\n## Subheading\n\n- List item 1\n- List item 2\n\n**Bold** and *italic* text\n\n[Link](https://example.com)\n\n`code` and ```code blocks```"
                {...register('content')}
                error={errors.content?.message}
                rows={25}
                className="font-mono text-sm"
              />
            ) : (
              <div 
                className="prose prose-dark max-w-none p-6 bg-white dark:bg-dark-900 rounded-lg min-h-[400px]"
                dangerouslySetInnerHTML={{ __html: renderMarkdown(watchedContent) }}
              />
            )}
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
              placeholder="Press Enter to add tag (e.g., Design, UX, Figma)"
              className="w-full sm:w-64 px-4 py-2.5 rounded-lg border border-dark-300 dark:border-dark-600 bg-white dark:bg-dark-800 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
            <p className="text-sm text-dark-500 dark:text-dark-400 mt-1">Press Enter to add each tag</p>
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
              {post?.publishedAt && (
                <span className="text-sm text-dark-500 dark:text-dark-400">
                  Published on {new Date(post.publishedAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </CardContent>
        </Card>
      </form>
    </div>
  );
}