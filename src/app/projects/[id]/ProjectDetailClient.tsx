'use client';

import Image from 'next/image';
import Link from 'next/link';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { ArrowLeft, ExternalLink, Github, Calendar, Tag, Eye, Share2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatDate, cn } from '@/lib/utils';

interface ProjectDetailClientProps {
  project: any;
}

export default function ProjectDetailClient({ project }: ProjectDetailClientProps) {
  const renderMarkdown = (text: string) => {
    if (!text) return '';
    const html = marked.parse(text);
    return DOMPurify.sanitize(html);
  };

  return (
    <article className="min-h-screen pt-16">
      <header className="relative">
        <div className="aspect-[21/9] w-full overflow-hidden">
          <Image
            src={project.thumbnail}
            alt={project.title}
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 p-8 sm:p-12 text-white">
          <div className="max-w-5xl mx-auto">
            <div className="flex flex-wrap items-center gap-3 mb-4">
              <Badge variant="outline" className="bg-white/20 text-white border-white/30">
                {project.category}
              </Badge>
              {project.featured && (
                <Badge variant="warning" className="bg-yellow-500 text-white border-none">★ Featured</Badge>
              )}
            </div>
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold mb-4">
              {project.title}
            </h1>
            <p className="text-lg sm:text-xl text-white/90 max-w-3xl mb-6">
              {project.shortDesc}
            </p>
            <div className="flex flex-wrap items-center gap-4">
              <div className="flex items-center gap-2 text-white/80">
                <Calendar className="w-5 h-5" />
                <span>{formatDate(project.createdAt)}</span>
              </div>
              {project.tags.map((tag: string) => (
                <Badge key={tag} variant="outline" className="bg-white/20 text-white border-white/30">
                  {tag}
                </Badge>
              ))}
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-20">
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-12">
          <div className="lg:col-span-2 space-y-12">
            {project.caseStudy && (
              <section className="prose prose-dark max-w-none" dangerouslySetInnerHTML={{ __html: renderMarkdown(project.caseStudy) }} />
            )}

            <section>
              <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-6">Project Gallery</h2>
              <div className="grid gap-4 md:grid-cols-2">
                {project.images?.map((image: string, index: number) => (
                  <div key={index} className="relative aspect-video rounded-xl overflow-hidden bg-dark-100 dark:bg-dark-800">
                    <Image
                      src={image}
                      alt={`${project.title} - Image ${index + 1}`}
                      fill
                      className="object-cover hover:scale-105 transition-transform duration-300"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  </div>
                ))}
              </div>
            </section>

            {(project.liveUrl || project.repoUrl) && (
              <section>
                <h2 className="text-2xl font-bold text-dark-900 dark:text-white mb-6">Links</h2>
                <div className="flex flex-wrap gap-4">
                  {project.liveUrl && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
                    >
                      <ExternalLink className="w-5 h-5" />
                      View Live Project
                    </a>
                  )}
                  {project.repoUrl && (
                    <a
                      href={project.repoUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-6 py-3 border border-dark-300 dark:border-dark-600 text-dark-700 dark:text-dark-300 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors font-medium"
                    >
                      <Github className="w-5 h-5" />
                      View Source Code
                    </a>
                  )}
                </div>
              </section>
            )}
          </div>

          <aside className="space-y-8">
            <div className="sticky top-24 space-y-6">
              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-dark-900 dark:text-white mb-4">Project Details</h3>
                  <dl className="space-y-4">
                    <div>
                      <dt className="text-sm text-dark-500 dark:text-dark-400">Category</dt>
                      <dd className="font-medium text-dark-900 dark:text-white">{project.category}</dd>
                    </div>
                    <div>
                      <dt className="text-sm text-dark-500 dark:text-dark-400">Completed</dt>
                      <dd className="font-medium text-dark-900 dark:text-white">{formatDate(project.createdAt)}</dd>
                    </div>
                    {project.liveUrl && (
                      <div>
                        <dt className="text-sm text-dark-500 dark:text-dark-400">Live Demo</dt>
                        <dd>
                          <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-primary-600 dark:text-primary-400 hover:underline">
                            View Project
                          </a>
                        </dd>
                      </div>
                    )}
                    {project.repoUrl && (
                      <div>
                        <dt className="text-sm text-dark-500 dark:text-dark-400">Source Code</dt>
                        <dd>
                          <a href={project.repoUrl} target="_blank" rel="noopener noreferrer" className="font-medium text-primary-600 dark:text-primary-400 hover:underline">
                            View on GitHub
                          </a>
                        </dd>
                      </div>
                    )}
                  </dl>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <h3 className="font-semibold text-dark-900 dark:text-white mb-4">Technologies</h3>
                  <div className="flex flex-wrap gap-2">
                    {project.tags.map((tag: string) => (
                      <Badge key={tag} variant="outline">{tag}</Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardContent className="p-6">
                  <div className="flex gap-3">
                    <Button variant="outline" className="flex-1">
                      <Share2 className="w-4 h-4 mr-2" />
                      Share
                    </Button>
                    <Link href="/projects" className="flex-1">
                      <Button variant="outline">
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        All Projects
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>
            </div>
          </aside>
        </div>
      </div>

      <footer className="border-t border-dark-200 dark:border-dark-800">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <Link 
            href="/projects" 
            className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline font-medium"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Projects
          </Link>
        </div>
      </footer>
    </article>
  );
}