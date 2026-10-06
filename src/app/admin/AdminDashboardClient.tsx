'use client';

import Link from 'next/link';
import { 
  FolderKanban, 
  FileText, 
  MessageSquare, 
  Briefcase, 
  Users, 
  TrendingUp,
  Clock,
  Eye,
  Edit,
  Plus,
  Settings
} from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatDate, cn } from '@/lib/utils';

interface DashboardStats {
  projectsCount: number;
  blogCount: number;
  testimonialsCount: number;
  servicesCount: number;
}

interface RecentItem {
  id: string;
  title: string;
  status?: boolean;
  published?: boolean;
  createdAt: Date;
}

interface AdminDashboardClientProps {
  stats: DashboardStats;
  recentProjects: RecentItem[];
  recentBlog: RecentItem[];
}

export default function AdminDashboardClient({ stats, recentProjects, recentBlog }: AdminDashboardClientProps) {
  const statCards = [
    { 
      title: 'Projects', 
      value: stats.projectsCount, 
      icon: FolderKanban, 
      color: 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400',
      href: '/admin/projects',
      label: 'Total projects'
    },
    { 
      title: 'Blog Posts', 
      value: stats.blogCount, 
      icon: FileText, 
      color: 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400',
      href: '/admin/blog',
      label: 'Published & drafts'
    },
    { 
      title: 'Testimonials', 
      value: stats.testimonialsCount, 
      icon: Users, 
      color: 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400',
      href: '/admin/testimonials',
      label: 'Client feedback'
    },
    { 
      title: 'Services', 
      value: stats.servicesCount, 
      icon: Briefcase, 
      color: 'bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400',
      href: '/admin/services',
      label: 'Service offerings'
    },
  ];

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold text-dark-900 dark:text-white">Dashboard</h1>
          <p className="text-dark-600 dark:text-dark-400 mt-1">Welcome back! Here's an overview of your portfolio.</p>
        </div>
        <div className="flex gap-3">
          <Link href="/admin/projects/new">
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              New Project
            </Button>
          </Link>
          <Link href="/admin/blog/new">
            <Button variant="outline">
              <Plus className="w-4 h-4 mr-2" />
              New Post
            </Button>
          </Link>
        </div>
      </div>

      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {statCards.map((stat) => (
          <Link key={stat.title} href={stat.href} className="block">
            <Card className="hover:shadow-md transition-shadow">
              <CardContent className="p-6">
                <div className="flex items-start justify-between">
                  <div>
                    <p className="text-sm font-medium text-dark-500 dark:text-dark-400">{stat.title}</p>
                    <p className="text-3xl font-bold text-dark-900 dark:text-white mt-1">{stat.value}</p>
                    <p className="text-xs text-dark-500 dark:text-dark-400 mt-1">{stat.label}</p>
                  </div>
                  <div className={cn('p-3 rounded-xl', stat.color)}>
                    <stat.icon className="w-6 h-6" aria-hidden="true" />
                  </div>
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Projects</CardTitle>
            <Link href="/admin/projects" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-dark-200 dark:divide-dark-800">
              {recentProjects.length === 0 ? (
                <div className="p-6 text-center text-dark-500 dark:text-dark-400">
                  <FolderKanban className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No projects yet</p>
                  <Link href="/admin/projects/new" className="inline-flex items-center gap-1 text-primary-600 dark:text-primary-400 mt-2 text-sm font-medium">
                    Create your first project <Plus className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                recentProjects.map((project) => (
                  <Link 
                    key={project.id} 
                    href={`/admin/projects/${project.id}`}
                    className="flex items-center justify-between p-4 hover:bg-dark-50 dark:hover:bg-dark-800/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0 mr-4">
                      <p className="font-medium text-dark-900 dark:text-white truncate">{project.title}</p>
                      <p className="text-sm text-dark-500 dark:text-dark-400 mt-1">{formatDate(project.createdAt)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={project.status ? 'success' : 'outline'}>
                        {project.status ? 'Published' : 'Draft'}
                      </Badge>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <CardTitle>Recent Blog Posts</CardTitle>
            <Link href="/admin/blog" className="text-sm text-primary-600 dark:text-primary-400 hover:underline">
              View all
            </Link>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y divide-dark-200 dark:divide-dark-800">
              {recentBlog.length === 0 ? (
                <div className="p-6 text-center text-dark-500 dark:text-dark-400">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No blog posts yet</p>
                  <Link href="/admin/blog/new" className="inline-flex items-center gap-1 text-primary-600 dark:text-primary-400 mt-2 text-sm font-medium">
                    Write your first post <Plus className="w-4 h-4" />
                  </Link>
                </div>
              ) : (
                recentBlog.map((post) => (
                  <Link 
                    key={post.id} 
                    href={`/admin/blog/${post.id}`}
                    className="flex items-center justify-between p-4 hover:bg-dark-50 dark:hover:bg-dark-800/50 transition-colors"
                  >
                    <div className="flex-1 min-w-0 mr-4">
                      <p className="font-medium text-dark-900 dark:text-white truncate">{post.title}</p>
                      <p className="text-sm text-dark-500 dark:text-dark-400 mt-1">{formatDate(post.createdAt)}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge variant={post.published ? 'success' : 'outline'}>
                        {post.published ? 'Published' : 'Draft'}
                      </Badge>
                    </div>
                  </Link>
                ))
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <QuickActionCard
          icon={FolderKanban}
          title="Manage Projects"
          description="Create, edit, and organize your portfolio projects with case studies."
          href="/admin/projects"
          color="bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400"
        />
        <QuickActionCard
          icon={FileText}
          title="Write Blog Posts"
          description="Share insights, case studies, and design tutorials with your audience."
          href="/admin/blog/new"
          color="bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400"
        />
        <QuickActionCard
          icon={Users}
          title="Add Testimonials"
          description="Showcase client feedback to build trust and credibility."
          href="/admin/testimonials/new"
          color="bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400"
        />
        <QuickActionCard
          icon={Briefcase}
          title="Update Services"
          description="Keep your service offerings current with pricing and features."
          href="/admin/services"
          color="bg-orange-100 dark:bg-orange-900/30 text-orange-600 dark:text-orange-400"
        />
        <QuickActionCard
          icon={TrendingUp}
          title="View Analytics"
          description="Track portfolio views, project clicks, and contact form submissions."
          href="/admin/analytics"
          color="bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400"
        />
        <QuickActionCard
          icon={Settings}
          title="Site Settings"
          description="Configure SEO, social links, hero content, and general settings."
          href="/admin/settings"
          color="bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400"
        />
      </div>
    </div>
  );
}

function QuickActionCard({ 
  icon: Icon, 
  title, 
  description, 
  href, 
  color 
}: { 
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  description: string;
  href: string;
  color: string;
}) {
  return (
    <Link href={href} className="block">
      <Card className="h-full hover:shadow-md transition-shadow group">
        <CardContent className="p-6">
          <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-4 group-hover:scale-105 transition-transform', color)}>
            <Icon className="w-6 h-6" aria-hidden="true" />
          </div>
          <h3 className="font-semibold text-dark-900 dark:text-white mb-1">{title}</h3>
          <p className="text-sm text-dark-600 dark:text-dark-400">{description}</p>
        </CardContent>
      </Card>
    </Link>
  );
}