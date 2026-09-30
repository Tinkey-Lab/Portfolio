'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { 
  Plus, 
  Search, 
  Edit, 
  Trash2, 
  Star,
  ChevronLeft,
  ChevronRight,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Modal, ConfirmDialog } from '@/components/ui/Modal';
import { Avatar } from '@/components/ui/Avatar';
import { formatDate, cn } from '@/lib/utils';

interface AdminTestimonialsClientProps {
  testimonials: any[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
  search: string;
  status: string;
}

export default function AdminTestimonialsClient({ 
  testimonials, 
  pagination, 
  search, 
  status 
}: AdminTestimonialsClientProps) {
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
    router.push(`/admin/testimonials?${params.toString()}`);
  };

  const handleStatusFilter = (newStatus: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newStatus) params.set('status', newStatus);
    else params.delete('status');
    params.set('page', '1');
    router.push(`/admin/testimonials?${params.toString()}`);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await fetch(`/api/admin/testimonials/${deleteId}`, { method: 'DELETE' });
      router.refresh();
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setShowDeleteConfirm(false);
      setDeleteId(null);
    }
  };

  const renderStars = (rating: number) => (
    <span className="flex gap-0.5" aria-label={`${rating} out of 5 stars`}>
      {[...Array(5)].map((_, i) => (
        <Star key={i} className={cn('w-4 h-4', i < rating ? 'fill-yellow-400 text-yellow-400' : 'text-dark-200 dark:text-dark-700')} />
      ))}
    </span>
  );

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-dark-900 dark:text-white">Testimonials</h1>
          <p className="text-dark-600 dark:text-dark-400 mt-1">Manage client feedback and reviews</p>
        </div>
        <Link href="/admin/testimonials/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Testimonial
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
                placeholder="Search testimonials..."
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
          {testimonials.length === 0 ? (
            <div className="p-12 text-center">
              <Star className="w-16 h-16 mx-auto text-dark-300 dark:text-dark-600 mb-4" />
              <h3 className="text-lg font-medium text-dark-900 dark:text-white mb-1">No testimonials yet</h3>
              <p className="text-dark-500 dark:text-dark-400 mb-4">Add client feedback to build trust</p>
              <Link href="/admin/testimonials/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Add Testimonial
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full" role="table">
                  <thead>
                    <tr className="border-b border-dark-200 dark:border-dark-800">
                      <th className="px-6 py-3 text-left text-xs font-semibold text-dark-500 dark:text-dark-400 uppercase tracking-wider">Client</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-dark-500 dark:text-dark-400 uppercase tracking-wider">Role & Company</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-dark-500 dark:text-dark-400 uppercase tracking-wider">Rating</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-dark-500 dark:text-dark-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-dark-500 dark:text-dark-400 uppercase tracking-wider">Featured</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-dark-500 dark:text-dark-400 uppercase tracking-wider">Created</th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-dark-500 dark:text-dark-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-100 dark:divide-dark-800">
                    {testimonials.map((testimonial) => (
                      <tr key={testimonial.id} className="hover:bg-dark-50 dark:hover:bg-dark-800/50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <Avatar 
                              src={testimonial.avatar} 
                              alt={testimonial.name} 
                              fallback={testimonial.name} 
                              size="sm" 
                            />
                            <div>
                              <p className="font-medium text-dark-900 dark:text-white">{testimonial.name}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <div>
                            <p className="text-sm text-dark-600 dark:text-dark-400">{testimonial.role}</p>
                            {testimonial.company && (
                              <p className="text-xs text-dark-400 dark:text-dark-500">{testimonial.company}</p>
                            )}
                          </div>
                        </td>
                        <td className="px-6 py-4">{renderStars(testimonial.rating)}</td>
                        <td className="px-6 py-4">
                          <Badge variant={testimonial.published ? 'success' : 'outline'}>
                            {testimonial.published ? 'Published' : 'Draft'}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          {testimonial.featured && <Badge variant="warning">★ Featured</Badge>}
                        </td>
                        <td className="px-6 py-4 text-sm text-dark-500 dark:text-dark-400">
                          {formatDate(testimonial.createdAt)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={`/admin/testimonials/${testimonial.id}`}
                              className="p-2 rounded-lg text-dark-400 hover:text-dark-600 dark:hover:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
                              aria-label="Edit testimonial"
                            >
                              <Edit className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => {
                                setDeleteId(testimonial.id);
                                setShowDeleteConfirm(true);
                              }}
                              className="p-2 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                              aria-label="Delete testimonial"
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
                    Showing {(pagination.page - 1) * pagination.limit + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} testimonials
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={pagination.page === 1}
                      onClick={() => {
                        const params = new URLSearchParams(searchParams.toString());
                        params.set('page', String(pagination.page - 1));
                        router.push(`/admin/testimonials?${params.toString()}`);
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
                        router.push(`/admin/testimonials?${params.toString()}`);
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
        title="Delete Testimonial"
        message="Are you sure you want to delete this testimonial? This action cannot be undone."
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
}