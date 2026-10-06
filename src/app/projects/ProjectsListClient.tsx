'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Grid, List, ExternalLink, Github, Eye, ChevronLeft, ChevronRight, Filter, Plus } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { Card, CardContent } from '@/components/ui/Card';
import { formatDate, cn } from '@/lib/utils';

interface ProjectsListClientProps {
  projects: any[];
  view: string;
  category: string;
  categories: string[];
  isAdmin: boolean;
}

export default function ProjectsListClient({ 
  projects, 
  view, 
  category, 
  categories, 
  isAdmin 
}: ProjectsListClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleViewChange = (newView: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set('view', newView);
    router.push(`/projects?${params.toString()}`);
  };

  const handleCategoryChange = (newCategory: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newCategory) params.set('category', newCategory);
    else params.delete('category');
    router.push(`/projects?${params.toString()}`);
  };

  return (
    <div className="min-h-screen pt-16">
      <section className="py-12 lg:py-16 bg-dark-50 dark:bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <h1 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-dark-900 dark:text-white">
                Projects
              </h1>
              <p className="text-lg text-dark-600 dark:text-dark-400 mt-2">
                {projects.length} project{projects.length !== 1 ? 's' : ''} in portfolio
              </p>
            </div>
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1 bg-dark-100 dark:bg-dark-800 rounded-lg p-1">
                <button
                  onClick={() => handleViewChange('grid')}
                  className={cn(
                    'p-2 rounded transition-colors',
                    view === 'grid' ? 'bg-white dark:bg-dark-900 shadow-sm text-primary-600 dark:text-primary-400' : 'text-dark-400 dark:text-dark-500 hover:text-dark-600 dark:hover:text-dark-300'
                  )}
                  aria-label="Grid view"
                >
                  <Grid className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleViewChange('list')}
                  className={cn(
                    'p-2 rounded transition-colors',
                    view === 'list' ? 'bg-white dark:bg-dark-900 shadow-sm text-primary-600 dark:text-primary-400' : 'text-dark-400 dark:text-dark-500 hover:text-dark-600 dark:hover:text-dark-300'
                  )}
                  aria-label="List view"
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
              {isAdmin && (
                <Link href="/admin/projects/new" className="ml-2">
                  <Button size="sm">
                    <Plus className="w-4 h-4 mr-2" />
                    New Project
                  </Button>
                </Link>
              )}
            </div>
          </div>

          {categories.length > 0 && (
            <div className="flex flex-wrap gap-2 mb-8">
              <button
                onClick={() => handleCategoryChange('')}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                  !category
                    ? 'bg-primary-600 text-white'
                    : 'bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:bg-dark-200 dark:hover:bg-dark-700'
                )}
              >
                All
              </button>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => handleCategoryChange(cat)}
                  className={cn(
                    'px-4 py-2 rounded-full text-sm font-medium transition-colors',
                    category === cat
                      ? 'bg-primary-600 text-white'
                      : 'bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:bg-dark-200 dark:hover:bg-dark-700'
                  )}
                >
                  {cat}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-12 lg:py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {projects.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto text-dark-300 dark:text-dark-600 mb-4">
                <svg fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                </svg>
              </div>
              <h3 className="text-lg font-medium text-dark-900 dark:text-white mb-2">
                {category ? `No projects in "${category}"` : 'No projects yet'}
              </h3>
              <p className="text-dark-500 dark:text-dark-400 mb-6">
                {isAdmin ? 'Add your first project to get started' : 'Check back soon for new projects'}
              </p>
              {isAdmin && (
                <Link href="/admin/projects/new">
                  <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Project
                  </Button>
                </Link>
              )}
            </div>
          ) : view === 'grid' ? (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {projects.map((project) => (
                <ProjectCard key={project.id} project={project} isAdmin={isAdmin} />
              ))}
            </div>
          ) : (
            <div className="space-y-6">
              {projects.map((project) => (
                <ProjectListItem key={project.id} project={project} isAdmin={isAdmin} />
              ))}
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

function ProjectCard({ project, isAdmin }: { project: any; isAdmin: boolean }) {
  return (
    <Card className="group overflow-hidden h-full">
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.thumbnail}
          alt={project.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        <div className="absolute top-3 left-3 flex gap-2">
          <Badge variant={project.featured ? 'warning' : 'outline'} className="bg-white/90 dark:bg-dark-950/90">
            {project.featured ? '★ Featured' : project.category}
          </Badge>
        </div>
      </div>
      <CardContent className="p-5">
        <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-dark-600 dark:text-dark-400 text-sm mb-4 line-clamp-2">
          {project.shortDesc}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 4).map((tag: string) => (
            <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
          ))}
          {project.tags.length > 4 && (
            <Badge variant="outline" className="text-xs">+{project.tags.length - 4}</Badge>
          )}
        </div>
        <div className="flex items-center gap-2 pt-4 border-t border-dark-100 dark:border-dark-800">
          <Link
            href={`/projects/${project.id}`}
            className="flex items-center gap-1.5 text-sm text-primary-600 dark:text-primary-400 hover:underline font-medium"
          >
            <Eye className="w-4 h-4" />
            Case Study
          </Link>
          {project.liveUrl && (
            <a
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-dark-500 dark:text-dark-400 hover:text-dark-700 dark:hover:text-dark-200 font-medium ml-auto"
            >
              <ExternalLink className="w-4 h-4" />
              Live
            </a>
          )}
          {project.repoUrl && (
            <a
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-dark-500 dark:text-dark-400 hover:text-dark-700 dark:hover:text-dark-200 font-medium"
            >
              <Github className="w-4 h-4" />
              Code
            </a>
          )}
        </div>
      </CardContent>
    </Card>
  );
}

function ProjectListItem({ project, isAdmin }: { project: any; isAdmin: boolean }) {
  return (
    <Card className="overflow-hidden">
      <div className="grid lg:grid-cols-4 gap-0">
        <div className="relative aspect-video lg:aspect-auto min-h-[200px]">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 25vw"
            priority={false}
          />
        </div>
        <div className="lg:col-span-3 p-6 lg:p-8 flex flex-col justify-center">
          <div className="flex items-center gap-3 mb-4">
            <Badge variant="outline">{project.category}</Badge>
            {project.featured && <Badge variant="warning">★ Featured</Badge>}
          </div>
          <Link href={`/projects/${project.id}`} className="block">
            <h3 className="text-2xl lg:text-3xl font-bold text-dark-900 dark:text-white mb-3 hover:text-primary-600 dark:hover:text-primary-400 transition-colors">
              {project.title}
            </h3>
          </Link>
          <p className="text-dark-600 dark:text-dark-400 mb-6 max-w-2xl">{project.shortDesc}</p>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag: string) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            <Link
              href={`/projects/${project.id}`}
              className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
            >
              <Eye className="w-4 h-4" />
              View Case Study
            </Link>
            {project.liveUrl && (
              <a
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border border-dark-300 dark:border-dark-600 text-dark-700 dark:text-dark-300 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </a>
            )}
            {project.repoUrl && (
              <a
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border border-dark-300 dark:border-dark-600 text-dark-700 dark:text-dark-300 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors font-medium"
              >
                <Github className="w-4 h-4" />
                Source Code
              </a>
            )}
          </div>
        </div>
      </div>
    </Card>
  );
}