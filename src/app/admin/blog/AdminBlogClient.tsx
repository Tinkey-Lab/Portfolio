'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Eye, 
  FileText,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Modal, ConfirmDialog } from '@/components/ui/Modal';
import { formatDate, cn } from '@/lib/utils';

interface AdminBlogClientProps {
  posts: any[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
  search: string;
  status: string;
}

export default function AdminBlogClient({ 
  posts, 
  pagination, 
  search, 
  status 
}: AdminBlogClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const params = new URLSearchParams(searchParams.toString());
    params.set('search', formData.get('search') as string);
    params.set('page', '1');
    if (params.get('search') === '') params.delete('search');
    router.push(`/admin/blog?${params.toString()}`);
  };

  const handleStatusFilter = (newStatus: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newStatus) params.set('status', newStatus);
    else params.delete('status');
    params.set('page', '1');
    router.push(`/admin/blog?${params.toString()}`);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await fetch(`/api/admin/blog/${deleteId}`, { method: 'DELETE' });
      router.refresh();
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setShowDeleteConfirm(false);
      setDeleteId(null);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-dark-900 dark:text-white">Blog Posts</h1>
          <p className="text-dark-600 dark:text-dark-400 mt-1">Manage your blog articles and insights</p>
        </div>
        <Link href="/admin/blog/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Post
          </Button>
        </Link>
      </div>

      <Card>
        <CardContent className="p-4">
          <form onSubmit={handleSearch} className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-dark-400" />
              <input
                type="search"
                name="search"
                defaultValue={search}
                placeholder="Search posts..."
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-dark-300 dark:border-dark-600 bg-white dark:bg-dark-800 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
            <Select
              value={status}
              onChange={handleStatusFilter}
              options={[
                { value: '', label: 'All Status' },
                { value: 'published', label: 'Published' },
                { value: 'draft', label: 'Draft' },
              ]}
              className="w-full sm:w-48"
            />
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          {posts.length === 0 ? (
            <div className="p-12 text-center">
              <FileText className="w-16 h-16 mx-auto text-dark-300 dark:text-dark-600 mb-4" />
              <h3 className="text-lg font-medium text-dark-900 dark:text-white mb-1">No blog posts yet</h3>
              <p className="text-dark-500 dark:text-dark-400 mb-4">Share your design insights with the world</p>
              <Link href="/admin/blog/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Write Your First Post
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full" role="table">
                  <thead>
                    <tr className="border-b border-dark-200 dark:border-dark-800">
                      <th className="px-6 py-3 text-left text-xs font-semibold text-dark-500 dark:text-dark-400 uppercase tracking-wider">Post</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-dark-500 dark:text-dark-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-dark-500 dark:text-dark-400 uppercase tracking-wider">Published</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-dark-500 dark:text-dark-400 uppercase tracking-wider">Created</th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-dark-500 dark:text-dark-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-100 dark:divide-dark-800">
                    {posts.map((post) => (
                      <tr key={post.id} className="hover:bg-dark-50 dark:hover:bg-dark-800/50">
                        <td className="px-6 py-4">
                          <div>
                            <Link href={`/admin/blog/${post.id}`} className="font-medium text-dark-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400">
                              {post.title}
                            </Link>
                            <p className="text-sm text-dark-500 dark:text-dark-400 truncate max-w-xs mt-1">{post.excerpt}</p>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={post.published ? 'success' : 'outline'}>
                            {post.published ? 'Published' : 'Draft'}
                          </Badge>
                        </td>
                        <td className="px-6 py-4 text-sm text-dark-500 dark:text-dark-400">
                          {post.publishedAt ? formatDate(post.publishedAt) : '—'}
                        </td>
                        <td className="px-6 py-4 text-sm text-dark-500 dark:text-dark-400">
                          {formatDate(post.createdAt)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/blog/${post.slug}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className={cn(
                                'p-2 rounded-lg text-dark-400 hover:text-dark-600 dark:hover:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors',
                                !post.published && 'opacity-50 cursor-not-allowed'
                              )}
                              aria-label="View post"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <Link
                              href={`/admin/blog/${post.id}`}
                              className="p-2 rounded-lg text-dark-400 hover:text-dark-600 dark:hover:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
                              aria-label="Edit post"
                            >
                              <Edit className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => {
                                setDeleteId(post.id);
                                setShowDeleteConfirm(true);
                              }}
                              className="p-2 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                              aria-label="Delete post"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {pagination.totalPages > 1 && (
                <div className="px-6 py-4 border-t border-dark-200 dark:border-dark-800 flex items-center justify-between">
                  <p className="text-sm text-dark-500 dark:text-dark-400">
                    Showing {(pagination.page - 1) * pagination.limit + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} posts
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={pagination.page === 1}
                      onClick={() => {
                        const params = new URLSearchParams(searchParams.toString());
                        params.set('page', String(pagination.page - 1));
                        router.push(`/admin/blog?${params.toString()}`);
                      }}
                    >
                      <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={pagination.page === pagination.totalPages}
                      onClick={() => {
                        const params = new URLSearchParams(searchParams.toString());
                        params.set('page', String(pagination.page + 1));
                        router.push(`/admin/blog?${params.toString()}`);
                      }}
                    >
                      <ChevronRight className="w-4 h-4" />
                    </Button>
                  </div>
                </div>
              )}
            </>
          )}
        </CardContent>
      </Card>

      <ConfirmDialog
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Post"
        message="Are you sure you want to delete this blog post? This action cannot be undone."
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
}