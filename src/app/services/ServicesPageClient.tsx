'use client';

import Link from 'next/link';
import { 
  Layout, 
  Users, 
  GitBranch, 
  MousePointer2, 
  Smartphone, 
  Palette,
  FileText,
  Zap,
  Shield,
  Layers,
  Code,
  PenTool,
  Monitor,
  Tablet,
  Briefcase,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

interface ServicesPageClientProps {
  services: any[];
  isAdmin: boolean;
}

const iconMap: Record<string, any> = {
  Layout,
  Users,
  GitBranch,
  MousePointer2,
  Smartphone,
  Palette,
  FileText,
  Zap,
  Shield,
  Layers,
  Code,
  PenTool,
  Monitor,
  Tablet,
};

export default function ServicesPageClient({ services, isAdmin }: ServicesPageClientProps) {
  return (
    <div className="min-h-screen pt-16">
      <section className="py-16 lg:py-24 bg-gradient-to-b from-primary-50 to-white dark:from-primary-900/20 dark:to-dark-950">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-dark-900 dark:text-white mb-6">
            Services
          </h1>
          <p className="text-lg sm:text-xl text-dark-600 dark:text-dark-400 max-w-3xl mx-auto">
            End-to-end design services tailored to your product's needs. 
            From strategy to pixel-perfect delivery, I help teams build products users love.
          </p>
          {isAdmin && (
            <div className="mt-8">
              <Link href="/admin/services/new">
                <span className="text-primary-600 dark:text-primary-400 hover:underline font-medium">
                  + Add New Service
                </span>
              </Link>
            </div>
          )}
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          {services.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-16 h-16 mx-auto text-dark-300 dark:text-dark-600 mb-4">
                <Briefcase className="w-full h-full" />
              </div>
              <h3 className="text-lg font-medium text-dark-900 dark:text-white mb-2">No services yet</h3>
              <p className="text-dark-500 dark:text-dark-400 mb-6">
                {isAdmin ? 'Add your service offerings to showcase what you do' : 'Services coming soon'}
              </p>
              {isAdmin && (
                <Link href="/admin/services/new">
                  <span className="text-primary-600 dark:text-primary-400 hover:underline font-medium">
                    Add Your First Service
                  </span>
                </Link>
              )}
            </div>
          ) : (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {services.map((service, index) => (
                <ServiceCard key={service.id} service={service} index={index} />
              ))}
            </div>
          )}
        </div>
      </section>

      <section className="py-16 lg:py-24 bg-dark-50 dark:bg-dark-900">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-dark-900 dark:text-white mb-4">
              How I Work
            </h2>
            <p className="text-lg text-dark-600 dark:text-dark-400 max-w-2xl mx-auto">
              A collaborative, transparent process focused on delivering measurable results.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-6">
            {processSteps.map((step, index) => (
              <ProcessStep key={step.step} step={step} index={index} />
            ))}
          </div>
        </div>
      </section>

      <section className="py-16 lg:py-24">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-dark-900 dark:text-white mb-6">
            Ready to Start Your Project?
          </h2>
          <p className="text-lg text-dark-600 dark:text-dark-400 mb-8 max-w-2xl mx-auto">
            Let's discuss your goals and how I can help bring your vision to life.
          </p>
          <Link href="#contact" className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium text-lg">
            Get in Touch
            <Layers className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}

function ServiceCard({ service, index }: { service: any; index: number }) {
  const Icon = iconMap[service.icon] || Layout;

  return (
    <Card className="group h-full overflow-hidden animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
      <CardContent className="p-6 lg:p-8 h-full flex flex-col">
        <div className="w-14 h-14 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-6 group-hover:bg-primary-600 group-hover:text-white transition-all">
          <Icon className={cn('w-7 h-7 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors')} aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-3">{service.title}</h3>
        <p className="text-dark-600 dark:text-dark-400 mb-6 flex-1">{service.shortDesc}</p>
        {service.price && (
          <Badge variant="outline" className="mb-6 w-fit text-sm">{service.price}</Badge>
        )}
        <ul className="space-y-3 mb-6 flex-1">
          {service.features?.map((feature: string) => (
            <li key={feature} className="flex items-start gap-3 text-sm text-dark-600 dark:text-dark-400">
              <span className="w-2 h-2 rounded-full bg-primary-500 mt-2 flex-shrink-0" aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>
        <Link 
          href="#contact" 
          className="inline-flex items-center gap-2 text-primary-600 dark:text-primary-400 hover:underline font-medium mt-auto"
        >
          Learn More
          <Layers className="w-4 h-4" />
        </Link>
      </CardContent>
    </Card>
  );
}

function ProcessStep({ step, index }: { step: any; index: number }) {
  return (
    <div className="text-center animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
      <div className="w-16 h-16 rounded-2xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mx-auto mb-4 text-primary-600 dark:text-primary-400 font-bold text-2xl">
        {step.step}
      </div>
      <h3 className="font-semibold text-dark-900 dark:text-white mb-2">{step.title}</h3>
      <p className="text-dark-600 dark:text-dark-400 text-sm">{step.description}</p>
    </div>
  );
}

const processSteps = [
  { step: '01', title: 'Discover', description: 'Deep dive into your business, users, and goals through workshops and research.' },
  { step: '02', title: 'Define', description: 'Synthesize findings into clear problem statements, user personas, and success metrics.' },
  { step: '03', title: 'Design', description: 'Iterative design process with regular check-ins, from wireframes to high-fidelity mockups.' },
  { step: '04', title: 'Validate', description: 'Test with real users, gather feedback, and refine until the solution works.' },
  { step: '05', title: 'Deliver', description: 'Comprehensive handoff with specs, assets, design system, and developer support.' },
];

function Briefcase({ className }: { className?: string }) {
  return (
    <svg className={className} fill="none" stroke="currentColor" viewBox="0 0 24 24">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
    </svg>
  );
}