'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  Plus, 
  Edit, 
  Trash2, 
  GripVertical,
  ChevronUp,
  ChevronDown,
} from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Modal, ConfirmDialog } from '@/components/ui/Modal';
import { cn } from '@/lib/utils';

interface AdminServicesClientProps {
  services: any[];
}

const icons = [
  { value: 'Layout', label: 'Layout' },
  { value: 'Users', label: 'Users' },
  { value: 'GitBranch', label: 'GitBranch' },
  { value: 'MousePointer2', label: 'MousePointer2' },
  { value: 'Smartphone', label: 'Smartphone' },
  { value: 'Palette', label: 'Palette' },
  { value: 'FileText', label: 'FileText' },
  { value: 'Zap', label: 'Zap' },
  { value: 'Shield', label: 'Shield' },
  { value: 'Layers', label: 'Layers' },
];

export default function AdminServicesClient({ services }: AdminServicesClientProps) {
  const router = useRouter();
  const [deleteId, setDeleteId] = useState<string | null>(null);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editForm, setEditForm] = useState<Record<string, any>>({});

  const handleDelete = async () => {
    if (!deleteId) return;
    try {
      await fetch(`/api/admin/services/${deleteId}`, { method: 'DELETE' });
      router.refresh();
    } catch (error) {
      console.error('Delete failed:', error);
    } finally {
      setShowDeleteConfirm(false);
      setDeleteId(null);
    }
  };

  const handleReorder = async (id: string, direction: 'up' | 'down') => {
    const service = services.find(s => s.id === id);
    if (!service) return;

    const currentOrder = service.order;
    const targetOrder = direction === 'up' ? currentOrder - 1 : currentOrder + 1;
    const targetService = services.find(s => s.order === targetOrder);

    if (targetService) {
      try {
        await Promise.all([
          fetch(`/api/admin/services/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ order: targetOrder }),
          }),
          fetch(`/api/admin/services/${targetService.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ order: currentOrder }),
          }),
        ]);
        router.refresh();
      } catch (error) {
        console.error('Reorder failed:', error);
      }
    }
  };

  const startEdit = (service: any) => {
    setEditingId(service.id);
    setEditForm({ ...service, features: service.features?.join(', ') || '' });
  };

  const saveEdit = async (service: any) => {
    try {
      const data = {
        ...editForm,
        features: editForm.features.split(',').map((f: string) => f.trim()).filter(Boolean),
      };
      await fetch(`/api/admin/services/${service.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(data),
      });
      setEditingId(null);
      router.refresh();
    } catch (error) {
      console.error('Save failed:', error);
    }
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditForm({});
  };

  const IconComponent = (name: string) => {
    // This would need actual icon imports - using a placeholder
    return <span className="text-primary-600 dark:text-primary-400">{name}</span>;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-dark-900 dark:text-white">Services</h1>
          <p className="text-dark-600 dark:text-dark-400 mt-1">Manage your service offerings</p>
        </div>
        <Link href="/admin/services/new">
          <Button>
            <Plus className="w-4 h-4 mr-2" />
            Add Service
          </Button>
        </Link>
      </div>

      {services.length === 0 ? (
        <Card>
          <CardContent className="p-12 text-center">
            <Plus className="w-16 h-16 mx-auto text-dark-300 dark:text-dark-600 mb-4" />
            <h3 className="text-lg font-medium text-dark-900 dark:text-white mb-1">No services yet</h3>
            <p className="text-dark-500 dark:text-dark-400 mb-4">Add your service offerings to showcase what you do</p>
            <Link href="/admin/services/new">
              <Button>
                <Plus className="w-4 h-4 mr-2" />
                Add Service
              </Button>
            </Link>
          </CardContent>
        </Card>
      ) : (
        <Card>
          <CardContent className="p-0">
            <div className="divide-y divide-dark-200 dark:divide-dark-800">
              {services.map((service) => (
                <div key={service.id} className="p-4 hover:bg-dark-50 dark:hover:bg-dark-800/50">
                  {editingId === service.id ? (
                    <div className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Input
                          label="Title"
                          value={editForm.title}
                          onChange={(e) => setEditForm({ ...editForm, title: e.target.value })}
                        />
                        <Input
                          label="Slug"
                          value={editForm.slug}
                          onChange={(e) => setEditForm({ ...editForm, slug: e.target.value })}
                        />
                      </div>
                      <div className="grid sm:grid-cols-2 gap-4">
                        <Input
                          label="Icon"
                          value={editForm.icon}
                          onChange={(e) => setEditForm({ ...editForm, icon: e.target.value })}
                        />
                        <Input
                          label="Price"
                          value={editForm.price || ''}
                          onChange={(e) => setEditForm({ ...editForm, price: e.target.value })}
                        />
                      </div>
                      <Textarea
                        label="Short Description"
                        value={editForm.shortDesc}
                        onChange={(e) => setEditForm({ ...editForm, shortDesc: e.target.value })}
                        rows={2}
                      />
                      <Textarea
                        label="Full Description"
                        value={editForm.description}
                        onChange={(e) => setEditForm({ ...editForm, description: e.target.value })}
                        rows={3}
                      />
                      <Input
                        label="Features (comma-separated)"
                        value={editForm.features}
                        onChange={(e) => setEditForm({ ...editForm, features: e.target.value })}
                      />
                      <div className="flex items-center gap-4">
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" checked={editForm.published} onChange={(e) => setEditForm({ ...editForm, published: e.target.checked })} className="w-4 h-4 rounded border-dark-300 text-primary-600 focus:ring-primary-500" />
                          <span className="text-sm">Published</span>
                        </label>
                        <label className="flex items-center gap-2 cursor-pointer">
                          <input type="checkbox" checked={editForm.featured} onChange={(e) => setEditForm({ ...editForm, featured: e.target.checked })} className="w-4 h-4 rounded border-dark-300 text-primary-600 focus:ring-primary-500" />
                          <span className="text-sm">Featured</span>
                        </label>
                      </div>
                      <div className="flex gap-2">
                        <Button onClick={() => saveEdit(service)} size="sm">Save</Button>
                        <Button variant="outline" onClick={cancelEdit} size="sm">Cancel</Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between gap-4">
                      <div className="flex items-center gap-4 flex-1 min-w-0">
                        <button
                          onClick={() => handleReorder(service.id, 'up')}
                          disabled={service.order === 0}
                          className="p-2 text-dark-400 hover:text-dark-600 dark:hover:text-dark-300 disabled:opacity-50 disabled:cursor-not-allowed"
                          aria-label="Move up"
                        >
                          <ChevronUp className="w-5 h-5" />
                        </button>
                        <button
                          onClick={() => handleReorder(service.id, 'down')}
                          className="p-2 text-dark-400 hover:text-dark-600 dark:hover:text-dark-300"
                          aria-label="Move down"
                        >
                          <ChevronDown className="w-5 h-5" />
                        </button>
                        <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                          <IconComponent name={service.icon} />
                        </div>
                        <div className="min-w-0">
                          <Link href={`/admin/services/${service.id}`} className="font-medium text-dark-900 dark:text-white hover:text-primary-600 dark:hover:text-primary-400">
                            {service.title}
                          </Link>
                          <p className="text-sm text-dark-500 dark:text-dark-400 truncate max-w-md">{service.shortDesc}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        {service.featured && <Badge variant="warning">★ Featured</Badge>}
                        <Badge variant={service.published ? 'success' : 'outline'}>
                          {service.published ? 'Published' : 'Draft'}
                        </Badge>
                        <Link
                          href={`/admin/services/${service.id}`}
                          className="p-2 rounded-lg text-dark-400 hover:text-dark-600 dark:hover:text-dark-300 hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
                          aria-label="Edit service"
                        >
                          <Edit className="w-4 h-4" />
                        </Link>
                        <button
                          onClick={() => {
                            setDeleteId(service.id);
                            setShowDeleteConfirm(true);
                          }}
                          className="p-2 rounded-lg text-red-400 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/30 transition-colors"
                          aria-label="Delete service"
                        >
                          <Trash2 className="w-4 h-4" />
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      )}

      <ConfirmDialog
        open={showDeleteConfirm}
        onClose={() => setShowDeleteConfirm(false)}
        onConfirm={handleDelete}
        title="Delete Service"
        message="Are you sure you want to delete this service? This action cannot be undone."
        confirmText="Delete"
        variant="danger"
      />
    </div>
  );
}