'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Calendar, Clock, ArrowRight, BookOpen } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { formatDate } from '@/lib/utils';

const blogPosts = [
  {
    id: '1',
    title: 'Designing for Accessibility: A Practical Guide',
    excerpt: 'Learn how to make your designs inclusive from day one. Covers WCAG guidelines, color contrast, keyboard navigation, and testing strategies.',
    coverImage: '/blog/accessibility.jpg',
    tags: ['Accessibility', 'WCAG', 'Inclusive Design'],
    publishedAt: '2024-03-15',
    readTime: '8 min read',
  },
  {
    id: '2',
    title: 'Building Scalable Design Systems in Figma',
    excerpt: 'A deep dive into creating maintainable design systems using Figma components, variants, and tokens. Includes file structure best practices.',
    coverImage: '/blog/design-systems.jpg',
    tags: ['Design Systems', 'Figma', 'Components'],
    publishedAt: '2024-02-28',
    readTime: '12 min read',
  },
  {
    id: '3',
    title: 'The Psychology Behind Effective Onboarding',
    excerpt: 'Explore cognitive psychology principles that make user onboarding stick. Reduce drop-off rates and increase feature adoption.',
    coverImage: '/blog/onboarding.jpg',
    tags: ['Psychology', 'Onboarding', 'UX Research'],
    publishedAt: '2024-02-10',
    readTime: '10 min read',
  },
  {
    id: '4',
    title: 'Micro-interactions That Delight Users',
    excerpt: 'Small details, big impact. Learn to design meaningful micro-interactions that provide feedback, guide users, and create moments of delight.',
    coverImage: '/blog/micro-interactions.jpg',
    tags: ['Interaction Design', 'Animation', 'UX'],
    publishedAt: '2024-01-22',
    readTime: '7 min read',
  },
  {
    id: '5',
    title: 'Conducting Remote User Research Effectively',
    excerpt: 'Best practices for remote user interviews, unmoderated testing, and synthesis. Tools, templates, and techniques for distributed teams.',
    coverImage: '/blog/remote-research.jpg',
    tags: ['User Research', 'Remote Work', 'Methods'],
    publishedAt: '2024-01-05',
    readTime: '15 min read',
  },
  {
    id: '6',
    title: 'Design Handoff: Bridging Design & Development',
    excerpt: 'Create seamless handoffs that developers love. Specs, assets, tokens, and communication strategies for frictionless implementation.',
    coverImage: '/blog/handoff.jpg',
    tags: ['Design Ops', 'Development', 'Collaboration'],
    publishedAt: '2023-12-18',
    readTime: '9 min read',
  },
];

export function BlogPreview() {
  return (
    <section 
      id="blog" 
      className="section bg-dark-50 dark:bg-dark-900"
      aria-labelledby="blog-title"
    >
      <div className="container">
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-12">
          <div>
            <h2 id="blog-title" className="section-title">Insights & Articles</h2>
            <p className="section-subtitle">
              Sharing knowledge on design, research, and building better products.
            </p>
          </div>
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-4 py-2 border border-dark-300 dark:border-dark-600 text-dark-700 dark:text-dark-300 rounded-lg hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors font-medium"
          >
            View All Articles
            <ArrowRight className="w-4 h-4" aria-hidden="true" />
          </Link>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogPosts.slice(0, 3).map((post, index) => (
            <BlogCard key={post.id} post={post} index={index} />
          ))}
        </div>

        <div className="mt-12 text-center">
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            Read More Articles
            <BookOpen className="w-5 h-5" aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function BlogCard({ post, index }: { post: typeof blogPosts[0]; index: number }) {
  return (
    <Card className="group overflow-hidden h-full animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
      <div className="relative aspect-video overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-105"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
      </div>
      <CardContent className="p-5">
        <div className="flex items-center gap-3 mb-3">
          <Badge variant="outline" className="text-xs">{post.tags[0]}</Badge>
          <div className="flex items-center gap-1.5 text-xs text-dark-500 dark:text-dark-400">
            <Calendar className="w-3.5 h-3.5" aria-hidden="true" />
            <time dateTime={post.publishedAt}>{formatDate(post.publishedAt)}</time>
            <span aria-hidden="true">·</span>
            <Clock className="w-3.5 h-3.5" aria-hidden="true" />
            {post.readTime}
          </div>
        </div>
        <Link href={`/blog/${post.id}`} className="block">
          <h3 className="text-lg font-bold text-dark-900 dark:text-white mb-2 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
            {post.title}
          </h3>
        </Link>
        <p className="text-dark-600 dark:text-dark-400 text-sm mb-4 line-clamp-3">
          {post.excerpt}
        </p>
        <Link
          href={`/blog/${post.id}`}
          className="inline-flex items-center gap-1.5 text-sm font-medium text-primary-600 dark:text-primary-400 hover:underline"
        >
          Read More
          <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </CardContent>
    </Card>
  );
}