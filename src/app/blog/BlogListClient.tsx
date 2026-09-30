'use client';

import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import Image from 'next/image';
import { Calendar, Clock, Tag, ChevronLeft, ChevronRight, Search, X } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { formatDate, cn } from '@/lib/utils';

interface BlogListClientProps {
  posts: any[];
  pagination: { page: number; limit: number; total: number; totalPages: number };
  tag: string;
  search: string;
  allTags: string[];
}

export default function BlogListClient({ 
  posts, 
  pagination, 
  tag, 
  search, 
  allTags 
}: BlogListClientProps) {
  const router = useRouter();
  const searchParams = useSearchParams();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget as HTMLFormElement);
    const params = new URLSearchParams(searchParams.toString());
    params.set('search', formData.get('search') as string);
    params.set('page', '1');
    if (params.get('search') === '') params.delete('search');
    if (tag) params.delete('tag');
    router.push(`/blog?${params.toString()}`);
  };

  const handleTagClick = (newTag: string) => {
    const params = new URLSearchParams(searchParams.toString());
    if (newTag === tag) {
      params.delete('tag');
    } else {
      params.set('tag', newTag);
    }
    params.set('page', '1');
    params.delete('search');
    router.push(`/blog?${params.toString()}`);
  };

  const clearFilters = () => {
    router.push('/blog');
  };

  return (
    <div className="min-h-screen pt-16">
      <section className="py-16 lg:py-24 bg-dark-50 dark:bg-dark-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-dark-900 dark:text-white mb-6">
            Blog & Insights
          </h1>
          <p className="text-lg sm:text-xl text-dark-600 dark:text-dark-400 max-w-2xl mx-auto mb-10">
            Sharing knowledge on design, research, and building better products.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 max-w-2xl mx-auto">
            <form onSubmit={handleSearch} className="relative flex-1">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-dark-400" />
              <input
                type="search"
                name="search"
                defaultValue={search}
                placeholder="Search articles..."
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-dark-300 dark:border-dark-600 bg-white dark:bg-dark-800 text-dark-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </form>
            {(tag || search) && (
              <Button variant="outline" onClick={clearFilters} className="whitespace-nowrap">
                <X className="w-4 h-4 mr-2" />
                Clear Filters
              </Button>
            )}
          </div>

          {tag && (
            <div className="mt-6">
              <Badge variant="outline" className="text-sm">
                Filtered by: {tag}
                <X className="w-3 h-3 ml-1 cursor-pointer" onClick={clearFilters} />
              </Badge>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {allTags.length > 0 && (
            <div className="mb-8">
              <div className="flex flex-wrap gap-2">
                {allTags.map((t) => (
                  <button
                    key={t}
                    onClick={() => handleTagClick(t)}
                    className={cn(
                      'px-3 py-1.5 rounded-full text-sm font-medium transition-colors',
                      t === tag
                        ? 'bg-primary-600 text-white'
                        : 'bg-dark-100 dark:bg-dark-800 text-dark-600 dark:text-dark-300 hover:bg-dark-200 dark:hover:bg-dark-700'
                    )}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          )}

          {posts.length === 0 ? (
            <div className="text-center py-16">
              <Tag className="w-16 h-16 mx-auto text-dark-300 dark:text-dark-600 mb-4" />
              <h3 className="text-lg font-medium text-dark-900 dark:text-white mb-2">No articles found</h3>
              <p className="text-dark-500 dark:text-dark-400 mb-6">
                {search ? 'Try a different search term' : tag ? 'No articles with this tag' : 'No articles published yet'}
              </p>
              {!search && !tag && (
                <Link href="/admin/blog/new">
                  <Button>Write Your First Article</Button>
                </Link>
              )}
            </div>
          ) : (
            <>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                  <Link key={post.id} href={`/blog/${post.id}`} className="block group">
                    <div className="bg-white dark:bg-dark-950 rounded-xl overflow-hidden border border-dark-200 dark:border-dark-800 hover:shadow-lg hover:border-primary-300 dark:hover:border-primary-700 transition-all">
                      {post.coverImage && (
                        <div className="relative aspect-video overflow-hidden">
                          <Image
                            src={post.coverImage}
                            alt={post.title}
                            fill
                            className="object-cover transition-transform duration-500 group-hover:scale-105"
                            sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                          />
                        </div>
                      )}
                      <div className="p-5 space-y-3">
                        <div className="flex flex-wrap gap-2">
                          {post.tags.slice(0, 3).map((t: string) => (
                            <Badge key={t} variant="outline" className="text-xs">{t}</Badge>
                          ))}
                          {post.tags.length > 3 && (
                            <Badge variant="outline" className="text-xs">+{post.tags.length - 3}</Badge>
                          )}
                        </div>
                        <h3 className="text-lg font-semibold text-dark-900 dark:text-white group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors line-clamp-2">
                          {post.title}
                        </h3>
                        <p className="text-dark-600 dark:text-dark-400 text-sm line-clamp-3">
                          {post.excerpt}
                        </p>
                        <div className="flex items-center justify-between pt-3 border-t border-dark-100 dark:border-dark-800">
                          <div className="flex items-center gap-4 text-xs text-dark-500 dark:text-dark-400">
                            <span className="flex items-center gap-1">
                              <Calendar className="w-3.5 h-3.5" />
                              {formatDate(post.publishedAt || post.createdAt)}
                            </span>
                            <span className="flex items-center gap-1">
                              <Clock className="w-3.5 h-3.5" />
                              {post.readTime || '8 min read'}
                            </span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>

              {pagination.totalPages > 1 && (
                <div className="mt-12 flex items-center justify-center gap-2">
                  <Button
                    variant="outline"
                    disabled={pagination.page === 1}
                    onClick={() => {
                      const params = new URLSearchParams(searchParams.toString());
                      params.set('page', String(pagination.page - 1));
                      router.push(`/blog?${params.toString()}`);
                    }}
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </Button>
                  <span className="px-4 text-sm text-dark-600 dark:text-dark-400">
                    Page {pagination.page} of {pagination.totalPages}
                  </span>
                  <Button
                    variant="outline"
                    disabled={pagination.page === pagination.totalPages}
                    onClick={() => {
                      const params = new URLSearchParams(searchParams.toString());
                      params.set('page', String(pagination.page + 1));
                      router.push(`/blog?${params.toString()}`);
                    }}
                  >
                    <ChevronRight className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </div>
  );
}