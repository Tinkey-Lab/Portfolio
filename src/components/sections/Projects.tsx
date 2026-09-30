'use client';

import { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ExternalLink, Github, Eye, Code, ChevronLeft, ChevronRight } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { cn, formatDate } from '@/lib/utils';

const categories = ['All', 'Web App', 'Mobile App', 'Dashboard', 'E-commerce', 'SaaS'];

const projects = [
  {
    id: '1',
    title: 'Finance Dashboard',
    shortDesc: 'Comprehensive financial analytics platform with real-time data visualization',
    description: 'A full-featured dashboard for financial analysts to track portfolios, analyze market trends, and generate reports with interactive charts.',
    thumbnail: '/projects/finance-dashboard.jpg',
    images: ['/projects/finance-1.jpg', '/projects/finance-2.jpg', '/projects/finance-3.jpg'],
    tags: ['React', 'TypeScript', 'D3.js', 'Tailwind'],
    category: 'Dashboard',
    featured: true,
    liveUrl: 'https://finance-dashboard.example.com',
    repoUrl: 'https://github.com/username/finance-dashboard',
    caseStudy: 'Detailed case study content...',
  },
  {
    id: '2',
    title: 'HealthTrack Mobile',
    shortDesc: 'Health & fitness tracking app with personalized coaching',
    description: 'A mobile application helping users track workouts, nutrition, and progress with AI-powered personalized recommendations.',
    thumbnail: '/projects/healthtrack.jpg',
    images: ['/projects/health-1.jpg', '/projects/health-2.jpg'],
    tags: ['React Native', 'Expo', 'Firebase', 'Figma'],
    category: 'Mobile App',
    featured: true,
    liveUrl: 'https://healthtrack.example.com',
    repoUrl: 'https://github.com/username/healthtrack',
    caseStudy: 'Detailed case study content...',
  },
  {
    id: '3',
    title: 'E-commerce Platform',
    shortDesc: 'Modern e-commerce experience with seamless checkout flow',
    description: 'End-to-end e-commerce platform featuring product discovery, personalized recommendations, and optimized checkout conversion.',
    thumbnail: '/projects/ecommerce.jpg',
    images: ['/projects/ecom-1.jpg', '/projects/ecom-2.jpg', '/projects/ecom-3.jpg'],
    tags: ['Next.js', 'Stripe', 'Prisma', 'PostgreSQL'],
    category: 'E-commerce',
    featured: true,
    liveUrl: 'https://shop.example.com',
    caseStudy: 'Detailed case study content...',
  },
  {
    id: '4',
    title: 'TaskFlow SaaS',
    shortDesc: 'Team collaboration tool with real-time synchronization',
    description: 'Project management platform with Kanban boards, Gantt charts, team workspaces, and advanced reporting features.',
    thumbnail: '/projects/taskflow.jpg',
    images: ['/projects/task-1.jpg', '/projects/task-2.jpg'],
    tags: ['Vue.js', 'Node.js', 'WebSocket', 'MongoDB'],
    category: 'SaaS',
    featured: false,
    liveUrl: 'https://taskflow.example.com',
    repoUrl: 'https://github.com/username/taskflow',
    caseStudy: 'Detailed case study content...',
  },
  {
    id: '5',
    title: 'Design System',
    shortDesc: 'Comprehensive component library for enterprise teams',
    description: 'A complete design system with 60+ components, tokens, documentation, and Figma integration for consistent product development.',
    thumbnail: '/projects/design-system.jpg',
    images: ['/projects/ds-1.jpg', '/projects/ds-2.jpg'],
    tags: ['Storybook', 'Figma', 'Tokens', 'TypeScript'],
    category: 'Web App',
    featured: true,
    repoUrl: 'https://github.com/username/design-system',
    caseStudy: 'Detailed case study content...',
  },
  {
    id: '6',
    title: 'Learning Platform',
    shortDesc: 'Interactive online learning experience with progress tracking',
    description: 'Educational platform featuring video courses, interactive exercises, progress tracking, and community features.',
    thumbnail: '/projects/learning.jpg',
    images: ['/projects/learn-1.jpg', '/projects/learn-2.jpg'],
    tags: ['Next.js', 'TypeScript', 'Prisma', 'Mux'],
    category: 'Web App',
    featured: false,
    liveUrl: 'https://learn.example.com',
    caseStudy: 'Detailed case study content...',
  },
];

export function Projects() {
  const [activeCategory, setActiveCategory] = useState('All');
  const [viewMode, setViewMode] = useState<'grid' | 'case-studies'>('grid');

  const filteredProjects = activeCategory === 'All' 
    ? projects 
    : projects.filter(p => p.category === activeCategory);

  return (
    <section 
      id="projects" 
      className="section"
      aria-labelledby="projects-title"
    >
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <h2 id="projects-title" className="section-title">Selected Work</h2>
            <p className="section-subtitle">
              A collection of projects showcasing my approach to solving complex design challenges.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-2">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={cn(
                  'px-4 py-2 rounded-full text-sm font-medium transition-all',
                  activeCategory === cat
                    ? 'bg-primary-600 text-white shadow-md'
                    : 'bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:bg-dark-200 dark:hover:bg-dark-700'
                )}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {viewMode === 'grid' ? (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProjects.map((project, index) => (
              <ProjectCard key={project.id} project={project} index={index} />
            ))}
          </div>
        ) : (
          <div className="space-y-12">
            {filteredProjects.map((project, index) => (
              <CaseStudyCard key={project.id} project={project} index={index} />
            ))}
          </div>
        )}

        <div className="mt-12 flex justify-center gap-4">
          <Button variant="outline" onClick={() => setViewMode('grid')}>
            Grid View
          </Button>
          <Button variant="outline" onClick={() => setViewMode('case-studies')}>
            Case Studies
          </Button>
        </div>
      </div>
    </section>
  );
}

function ProjectCard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <Card 
      className="group overflow-hidden h-full animate-slide-up"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={project.thumbnail}
          alt={`${project.title} preview`}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        {project.featured && (
          <div className="absolute top-3 left-3">
            <Badge variant="success">Featured</Badge>
          </div>
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
      </div>
      <CardContent className="p-5">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="outline" className="text-xs">{project.category}</Badge>
        </div>
        <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">
          {project.title}
        </h3>
        <p className="text-dark-600 dark:text-dark-400 text-sm mb-4 line-clamp-2">
          {project.shortDesc}
        </p>
        <div className="flex flex-wrap gap-1.5 mb-4">
          {project.tags.slice(0, 4).map((tag) => (
            <Badge key={tag} variant="outline" className="text-xs">{tag}</Badge>
          ))}
          {project.tags.length > 4 && (
            <Badge variant="outline" className="text-xs">+{project.tags.length - 4} more</Badge>
          )}
        </div>
        <div className="flex items-center gap-3 pt-4 border-t border-dark-100 dark:border-dark-800">
          {project.liveUrl && (
            <Link
              href={project.liveUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-primary-600 dark:text-primary-400 hover:underline font-medium"
            >
              <ExternalLink className="w-4 h-4" aria-hidden="true" />
              Live Demo
            </Link>
          )}
          {project.repoUrl && (
            <Link
              href={project.repoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 text-sm text-dark-500 dark:text-dark-400 hover:text-dark-700 dark:hover:text-dark-200 font-medium"
            >
              <Github className="w-4 h-4" aria-hidden="true" />
              Code
            </Link>
          )}
          <Link
            href={`/projects/${project.id}`}
            className="flex items-center gap-1.5 text-sm text-dark-500 dark:text-dark-400 hover:text-dark-700 dark:hover:text-dark-200 font-medium ml-auto"
          >
            <Eye className="w-4 h-4" aria-hidden="true" />
            Case Study
          </Link>
        </div>
      </CardContent>
    </Card>
  );
}

function CaseStudyCard({ project, index }: { project: typeof projects[0]; index: number }) {
  return (
    <Card className="overflow-hidden animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
      <div className="grid lg:grid-cols-2 gap-0">
        <div className="relative aspect-video lg:aspect-auto min-h-[400px]">
          <Image
            src={project.thumbnail}
            alt={`${project.title} case study`}
            fill
            className="object-cover"
            priority={index === 0}
            sizes="(max-width: 1024px) 100vw, 50vw"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/30 to-transparent" />
          <div className="absolute bottom-0 left-0 right-0 p-8 text-white">
            <Badge variant="outline" className="mb-4 border-white/30 text-white">{project.category}</Badge>
            <h3 className="text-3xl lg:text-4xl font-bold mb-4">{project.title}</h3>
            <p className="text-lg opacity-90 max-w-xl mb-6">{project.shortDesc}</p>
            <div className="flex flex-wrap gap-2">
              {project.tags.map((tag) => (
                <Badge key={tag} variant="outline" className="border-white/30 text-white">{tag}</Badge>
              ))}
            </div>
          </div>
        </div>
        <div className="p-8 lg:p-12 flex flex-col justify-center">
          <div className="mb-6">
            <Badge variant="outline" className="mb-3">{project.category}</Badge>
            <h3 className="text-3xl font-bold text-dark-900 dark:text-white mb-4">
              {project.title}
            </h3>
            <p className="text-lg text-dark-600 dark:text-dark-400 mb-6">
              {project.description}
            </p>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {project.tags.map((tag) => (
              <Badge key={tag} variant="outline">{tag}</Badge>
            ))}
          </div>
          <div className="flex flex-wrap gap-3">
            {project.liveUrl && (
              <Link
                href={project.liveUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
              >
                <ExternalLink className="w-4 h-4" />
                Live Demo
              </Link>
            )}
            {project.repoUrl && (
              <Link
                href={project.repoUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 px-4 py-2 border border-dark-300 dark:border-dark-600 text-dark-700 dark:text-dark-300 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors font-medium"
              >
                <Github className="w-4 h-4" />
                View Code
              </Link>
            )}
            <Link
              href={`/projects/${project.id}`}
              className="flex items-center gap-2 px-4 py-2 border border-dark-300 dark:border-dark-600 text-dark-700 dark:text-dark-300 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors font-medium"
            >
              <Code className="w-4 h-4" />
              Full Case Study
            </Link>
          </div>
        </div>
      </div>
    </Card>
  );
}