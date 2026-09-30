'use client';

import { ArrowRight, MousePointer, Keyboard, Layers, Sparkles } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { cn } from '@/lib/utils';

export function Hero() {
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section 
      id="hero" 
      className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16"
      aria-labelledby="hero-title"
    >
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-primary-100/50 via-transparent to-transparent dark:from-primary-900/20 dark:via-transparent" aria-hidden="true" />
      
      <div className="absolute inset-0 overflow-hidden" aria-hidden="true">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-primary-200/30 rounded-full blur-3xl animate-float" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-200/30 rounded-full blur-3xl animate-float animation-delay-300" />
      </div>

      <div className="relative container mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="text-center lg:text-left animate-slide-up">
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-sm font-medium mb-6 animate-fade-in">
              <Sparkles className="w-4 h-4" aria-hidden="true" />
              Available for freelance & contract work
            </div>
            
            <h1 
              id="hero-title"
              className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-display font-bold text-dark-900 dark:text-white leading-tight mb-6 animate-slide-up animation-delay-100"
            >
              Designing <span className="text-gradient">Digital Experiences</span> That Matter
            </h1>
            
            <p className="text-lg sm:text-xl lg:text-2xl text-dark-600 dark:text-dark-400 max-w-2xl mx-auto lg:mx-0 mb-10 animate-slide-up animation-delay-200">
              I craft intuitive, accessible, and visually stunning interfaces that solve real problems and delight users.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start animate-slide-up animation-delay-300">
              <Button 
                size="lg" 
                className="w-full sm:w-auto"
                onClick={() => scrollToSection('projects')}
              >
                View My Work
                <ArrowRight className="w-5 h-5" aria-hidden="true" />
              </Button>
              <Button 
                variant="outline" 
                size="lg" 
                className="w-full sm:w-auto"
                onClick={() => scrollToSection('contact')}
              >
                Let's Work Together
              </Button>
            </div>

            <div className="mt-16 flex flex-wrap items-center justify-center lg:justify-start gap-8 animate-slide-up animation-delay-400">
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-primary-100 dark:bg-primary-900/30">
                  <MousePointer className="w-6 h-6 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-dark-500 dark:text-dark-400">User-Centered</p>
                  <p className="font-medium text-dark-900 dark:text-white">Design Approach</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-purple-100 dark:bg-purple-900/30">
                  <Keyboard className="w-6 h-6 text-purple-600 dark:text-purple-400" aria-hidden="true" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-dark-500 dark:text-dark-400">Accessibility</p>
                  <p className="font-medium text-dark-900 dark:text-white">First Mindset</p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <div className="p-3 rounded-xl bg-green-100 dark:bg-green-900/30">
                  <Layers className="w-6 h-6 text-green-600 dark:text-green-400" aria-hidden="true" />
                </div>
                <div className="text-left">
                  <p className="text-sm text-dark-500 dark:text-dark-400">Design Systems</p>
                  <p className="font-medium text-dark-900 dark:text-white">& Scalability</p>
                </div>
              </div>
            </div>
          </div>

          <div className="relative animate-fade-in animation-delay-200">
            <div className="relative aspect-square max-w-md mx-auto">
              <div className="absolute inset-0 bg-gradient-to-br from-primary-200 to-purple-200 dark:from-primary-900/30 dark:to-purple-900/30 rounded-3xl blur-2xl opacity-50" aria-hidden="true" />
              <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-dark-200 dark:border-dark-700 bg-white dark:bg-dark-900">
                <div className="flex items-center gap-2 px-4 py-3 bg-dark-50 dark:bg-dark-900 border-b border-dark-200 dark:border-dark-700">
                  <div className="w-3 h-3 rounded-full bg-red-500" aria-hidden="true" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" aria-hidden="true" />
                  <div className="w-3 h-3 rounded-full bg-green-500" aria-hidden="true" />
                </div>
                <div className="p-8 space-y-6">
                  <div className="space-y-3">
                    <div className="h-4 bg-dark-100 dark:bg-dark-800 rounded w-3/4 animate-shimmer" />
                    <div className="h-4 bg-dark-100 dark:bg-dark-800 rounded w-1/2 animate-shimmer animation-delay-200" />
                    <div className="h-4 bg-dark-100 dark:bg-dark-800 rounded w-5/6 animate-shimmer animation-delay-300" />
                  </div>
                  <div className="grid grid-cols-3 gap-4">
                    {[1, 2, 3, 4, 5, 6].map((i) => (
                      <div key={i} className="aspect-square bg-dark-100 dark:bg-dark-800 rounded-xl animate-shimmer" style={{ animationDelay: `${i * 100}ms` }} />
                    ))}
                  </div>
                  <div className="space-y-3">
                    <div className="h-10 bg-primary-100 dark:bg-primary-900/30 rounded-lg flex items-center px-4">
                      <span className="text-sm font-medium text-primary-700 dark:text-primary-300">Prototype Mode</span>
                    </div>
                    <div className="h-20 bg-dark-100 dark:bg-dark-800 rounded-xl animate-shimmer" />
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -bottom-6 -left-6 w-20 h-20 bg-white dark:bg-dark-900 rounded-2xl shadow-xl border border-dark-200 dark:border-dark-700 p-4 animate-float">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">50+</div>
                <div className="text-xs text-dark-500 dark:text-dark-400">Projects Completed</div>
              </div>
            </div>
            <div className="absolute -top-6 -right-6 w-20 h-20 bg-white dark:bg-dark-900 rounded-2xl shadow-xl border border-dark-200 dark:border-dark-700 p-4 animate-float animation-delay-300">
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600 dark:text-purple-400">5★</div>
                <div className="text-xs text-dark-500 dark:text-dark-400">Client Rating</div>
              </div>
            </div>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce" aria-hidden="true">
          <button
            onClick={() => scrollToSection('about')}
            className="p-3 rounded-full bg-white/80 dark:bg-dark-950/80 backdrop-blur-md shadow-lg border border-dark-200 dark:border-dark-700 text-dark-600 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
            aria-label="Scroll down"
          >
            <MousePointer className="w-6 h-6" />
          </button>
        </div>
      </div>
    </section>
  );
}