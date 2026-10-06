'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { 
  Plus, 
  Search, 
  Filter, 
  Edit, 
  Trash2, 
  Eye, 
  ExternalLink,
  ChevronLeft,
  ChevronRight,
  MoreVertical
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Select } from '@/components/ui/Select';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Modal, ConfirmDialog } from '@/components/ui/Modal';
import { formatDate, cn } from '@/lib/utils';

interface AdminProjectsClientProps {
  projects: any[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
  search: string;
  status: string;
  categories: string[];
}

export default function AdminProjectsClient({ 
  projects, 
  pagination, 
  search, 
  status, 
  categories 
}: AdminProjectsClientProps) {
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
    router.push(`/admin/projects?${params.toString()}`);
  };

  const handleStatusFilter = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newStatus = e.target.value;
    const params = new URLSearchParams(searchParams.toString());
    if (newStatus) params.set('status', newStatus);
    else params.delete('status');
    params.set('page', '1');
    router.push(`/admin/projects?${params.toString()}`);
  };

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await fetch(`/api/admin/projects/${deleteId}`, { method: 'DELETE' });
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
          <h1 className="text-3xl font-bold text-dark-900 dark:text-white">Projects</h1>
          <p className="text-dark-600 dark:text-dark-400 mt-1">Manage your portfolio projects and case studies</p>
        </div>
        <Link href="/admin/projects/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            New Project
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
                placeholder="Search projects..."
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
            <Select
              value={searchParams.get('category') || ''}
              onChange={(e) => {
                const params = new URLSearchParams(searchParams.toString());
                if (e.target.value) params.set('category', e.target.value);
                else params.delete('category');
                params.set('page', '1');
                router.push(`/admin/projects?${params.toString()}`);
              }}
              options={[
                { value: '', label: 'All Categories' },
                ...categories.map(cat => ({ value: cat, label: cat })),
              ]}
              className="w-full sm:w-48"
            />
          </form>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          {projects.length === 0 ? (
            <div className="p-12 text-center">
              <svg className="w-16 h-16 mx-auto text-dark-300 dark:text-dark-600 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
              </svg>
              <h3 className="text-lg font-medium text-dark-900 dark:text-white mb-1">No projects found</h3>
              <p className="text-dark-500 dark:text-dark-400 mb-4">Get started by creating your first project</p>
              <Link href="/admin/projects/new">
                <Button>
                  <Plus className="w-4 h-4 mr-2" />
                  Create Project
                </Button>
              </Link>
            </div>
          ) : (
            <>
              <div className="overflow-x-auto">
                <table className="w-full" role="table">
                  <thead>
                    <tr className="border-b border-dark-200 dark:border-dark-800">
                      <th className="px-6 py-3 text-left text-xs font-semibold text-dark-500 dark:text-dark-400 uppercase tracking-wider">Project</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-dark-500 dark:text-dark-400 uppercase tracking-wider">Category</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-dark-500 dark:text-dark-400 uppercase tracking-wider">Status</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-dark-500 dark:text-dark-400 uppercase tracking-wider">Featured</th>
                      <th className="px-6 py-3 text-left text-xs font-semibold text-dark-500 dark:text-dark-400 uppercase tracking-wider">Created</th>
                      <th className="px-6 py-3 text-right text-xs font-semibold text-dark-500 dark:text-dark-400 uppercase tracking-wider">Actions</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-dark-100 dark:divide-dark-800">
                    {projects.map((project) => (
                      <tr key={project.id} className="hover:bg-dark-50 dark:hover:bg-dark-800/50">
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-4">
                            <div className="w-16 h-10 rounded-lg overflow-hidden bg-dark-100 dark:bg-dark-800 flex-shrink-0">
                              <Image
                                src={project.thumbnail}
                                alt={project.title}
                                fill
                                className="object-cover"
                                sizes="64px"
                              />
                            </div>
                            <div>
                              <Link href={`/admin/projects/${project.id}`} className="font-medium text-dark-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400">
                                {project.title}
                              </Link>
                              <p className="text-sm text-dark-500 dark:text-dark-400 truncate max-w-xs">{project.shortDesc}</p>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant="outline" className="text-xs">{project.category}</Badge>
                        </td>
                        <td className="px-6 py-4">
                          <Badge variant={project.published ? 'success' : 'outline'}>
                            {project.published ? 'Published' : 'Draft'}
                          </Badge>
                        </td>
                        <td className="px-6 py-4">
                          {project.featured && (
                            <Badge variant="warning">★ Featured</Badge>
                          )}
                        </td>
                        <td className="px-6 py-4 text-sm text-dark-500 dark:text-dark-400">
                          {formatDate(project.createdAt)}
                        </td>
                        <td className="px-6 py-4 text-right">
                          <div className="flex items-center justify-end gap-2">
                            <Link
                              href={project.liveUrl || '#'}
                              target={project.liveUrl ? '_blank' : undefined}
                              rel={project.liveUrl ? 'noopener noreferrer' : undefined}
                              className={cn(
                                'p-2 rounded-lg text-dark-400 hover:text-dark-600 dark:hover:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors',
                                !project.liveUrl && 'opacity-50 cursor-not-allowed'
                              )}
                              aria-label="View live"
                            >
                              <ExternalLink className="w-4 h-4" />
                            </Link>
                            <Link
                              href={`/admin/projects/${project.id}`}
                              className="p-2 rounded-lg text-dark-400 hover:text-dark-600 dark:hover:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
                              aria-label="Edit project"
                            >
                              <Edit className="w-4 h-4" />
                            </Link>
                            <Link
                              href={`/projects/${project.id}`}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="p-2 rounded-lg text-dark-400 hover:text-dark-600 dark:hover:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
                              aria-label="View case study"
                            >
                              <Eye className="w-4 h-4" />
                            </Link>
                            <button
                              onClick={() => {
                                setDeleteId(project.id);
                                setShowDeleteConfirm(true);
                              }}
                              className="p-2 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                              aria-label="Delete project"
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
                    Showing {(pagination.page - 1) * pagination.limit + 1} to {Math.min(pagination.page * pagination.limit, pagination.total)} of {pagination.total} projects
                  </p>
                  <div className="flex gap-2">
                    <Button
                      variant="outline"
                      size="sm"
                      disabled={pagination.page === 1}
                      onClick={() => {
                        const params = new URLSearchParams(searchParams.toString());
                        params.set('page', String(pagination.page - 1));
                        router.push(`/admin/projects?${params.toString()}`);
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
                        router.push(`/admin/projects?${params.toString()}`);
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
        title="Delete Project"
        message="Are you sure you want to delete this project? This action cannot be undone."
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
}