'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { marked } from 'marked';
import DOMPurify from 'dompurify';
import { ArrowLeft, Calendar, Clock, Tag, Share2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';
import { formatDate, cn } from '@/lib/utils';

interface BlogDetailClientProps {
  post: any;
}

export default function BlogDetailClient({ post }: BlogDetailClientProps) {
  const [renderedHtml, setRenderedHtml] = useState('');

  useEffect(() => {
    const renderMarkdown = async (text: string) => {
      if (!text) {
        setRenderedHtml('');
        return;
      }
      const html = await marked.parse(text);
      setRenderedHtml(DOMPurify.sanitize(html));
    };
    renderMarkdown(post.content);
  }, [post.content]);

  return (
    <article className="min-h-screen pt-16">
      <header className="relative py-16 lg:py-24">
        {post.coverImage && (
          <div className="absolute inset-0 z-0">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              priority
              className="object-cover"
              sizes="100vw"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
          </div>
        )}
        <div className="relative z-10 max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex flex-wrap items-center justify-center gap-3 mb-6">
            {post.tags.map((tag: string) => (
              <Badge key={tag} variant="outline" className={cn(
                post.coverImage ? 'bg-white/20 text-white border-white/30' : ''
              )}>
                {tag}
              </Badge>
            ))}
          </div>
          <h1 className={cn('text-3xl sm:text-4xl lg:text-5xl font-display font-bold mb-6', post.coverImage ? 'text-white' : 'text-dark-900 dark:text-white')}>
            {post.title}
          </h1>
          <div className="flex flex-wrap items-center justify-center gap-6 text-sm mb-6">
            {post.author && (
              <span className={cn('flex items-center gap-2', post.coverImage ? 'text-white/80' : 'text-dark-500 dark:text-dark-400')}>
                By {post.author.name}
              </span>
            )}
            <time dateTime={post.publishedAt || post.createdAt} className={cn('flex items-center gap-2', post.coverImage ? 'text-white/80' : 'text-dark-500 dark:text-dark-400')}>
              <Calendar className="w-4 h-4" />
              {formatDate(post.publishedAt || post.createdAt)}
            </time>
            <span className={cn('flex items-center gap-2', post.coverImage ? 'text-white/80' : 'text-dark-500 dark:text-dark-400')}>
              <Clock className="w-4 h-4" />
              {post.readTime || '8 min read'}
            </span>
          </div>
        </div>
      </header>

      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-12 lg:py-16">
        {post.coverImage && (
          <div className="relative aspect-video max-w-2xl mx-auto mb-12 rounded-xl overflow-hidden">
            <Image
              src={post.coverImage}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, 768px"
            />
          </div>
        )}

        <div className="prose prose-lg prose-dark max-w-none mb-12" dangerouslySetInnerHTML={{ __html: renderedHtml }} />

        <hr className="border-dark-200 dark:border-dark-800 my-12" />

        <footer className="space-y-6">
          <div className="flex flex-wrap items-center justify-between gap-4">
            <div className="flex flex-wrap gap-2">
              {post.tags.map((tag: string) => (
                <Link key={tag} href={`/blog?tag=${encodeURIComponent(tag)}`} className="hover:underline">
                  <Badge variant="outline">{tag}</Badge>
                </Link>
              ))}
            </div>
            <div className="flex gap-3">
              <Button variant="outline" size="sm">
                <Share2 className="w-4 h-4 mr-2" />
                Share
              </Button>
            </div>
          </div>

          {post.author && (
            <div className="flex items-start gap-4 p-6 bg-dark-50 dark:bg-dark-900 rounded-xl">
              <Image
                src={post.author.image || '/avatar-placeholder.jpg'}
                alt={post.author.name}
                width={64}
                height={64}
                className="rounded-full object-cover"
              />
              <div>
                <h3 className="font-semibold text-dark-900 dark:text-white">{post.author.name}</h3>
                <p className="text-sm text-dark-500 dark:text-dark-400 mt-1">UI/UX Designer & Writer</p>
              </div>
            </div>
          )}

          <nav className="flex items-center justify-between pt-6 border-t border-dark-200 dark:border-dark-800">
            <Link href="/blog" className="text-primary-600 dark:text-primary-400 hover:underline font-medium">
              <ArrowLeft className="w-4 h-4 inline mr-1" />
              All Articles
            </Link>
          </nav>
        </footer>
      </div>
    </article>
  );
}