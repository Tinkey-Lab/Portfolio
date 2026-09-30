'use client';

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
  Layers
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/Card';
import { Badge } from '@/components/ui/Badge';
import { cn } from '@/lib/utils';

const services = [
  {
    id: 'ui-design',
    title: 'UI Design',
    shortDesc: 'Beautiful, accessible interfaces that delight users',
    description: 'I create visually stunning and highly usable interfaces following modern design principles. From landing pages to complex dashboards, every pixel serves a purpose.',
    icon: Layout,
    features: [
      'High-fidelity mockups & prototypes',
      'Design system creation & maintenance',
      'Responsive & adaptive layouts',
      'Dark/light mode designs',
      'Micro-interactions & animations',
      'Design handoff & specs',
    ],
    price: 'Starting at $2,000',
  },
  {
    id: 'ux-research',
    title: 'UX Research',
    shortDesc: 'Data-driven insights for better product decisions',
    description: 'Understanding your users is the foundation of great design. I conduct comprehensive research to uncover needs, behaviors, and pain points that drive meaningful solutions.',
    icon: Users,
    features: [
      'User interviews & surveys',
      'Usability testing & analysis',
      'Competitive audits',
      'Persona & journey mapping',
      'Information architecture',
      'Analytics & heatmap review',
    ],
    price: 'Starting at $1,500',
  },
  {
    id: 'design-systems',
    title: 'Design Systems',
    shortDesc: 'Scalable, consistent design at enterprise level',
    description: 'Build once, use everywhere. I create comprehensive design systems with tokens, components, and documentation that enable teams to ship faster with consistency.',
    icon: GitBranch,
    features: [
      'Design tokens (colors, spacing, typography)',
      'Component library (60+ components)',
      'Storybook documentation',
      'Figma component library',
      'Governance & contribution model',
      'Migration & adoption strategy',
    ],
    price: 'Starting at $5,000',
  },
  {
    id: 'prototyping',
    title: 'Prototyping',
    shortDesc: 'Interactive prototypes for validation & testing',
    description: 'Before writing code, validate ideas with clickable prototypes. From low-fidelity wireframes to high-fidelity interactive experiences that feel real.',
    icon: MousePointer2,
    features: [
      'Low-fi wireframes & flows',
      'High-fidelity interactive prototypes',
      'User testing prototypes',
      'Developer handoff prototypes',
      'Animation & transition specs',
      'Prototype presentations',
    ],
    price: 'Starting at $1,000',
  },
  {
    id: 'mobile-design',
    title: 'Mobile App Design',
    shortDesc: 'Native-feeling iOS & Android experiences',
    description: 'Design mobile apps that feel at home on each platform. Deep knowledge of HIG and Material Design guidelines for intuitive, performant mobile experiences.',
    icon: Smartphone,
    features: [
      'iOS (HIG) & Android (Material) design',
      'Cross-platform design systems',
      'App store assets & screenshots',
      'Onboarding & empty states',
      'Offline & error handling flows',
      'Accessibility compliance',
    ],
    price: 'Starting at $3,000',
  },
  {
    id: 'branding',
    title: 'Brand Identity',
    shortDesc: 'Cohesive visual identity that resonates',
    description: 'Your brand is more than a logo. I create comprehensive brand identities including strategy, visual system, and guidelines that build recognition and trust.',
    icon: Palette,
    features: [
      'Brand strategy & positioning',
      'Logo design & variations',
      'Color palette & typography',
      'Iconography & illustration style',
      'Brand guidelines document',
      'Marketing collateral templates',
    ],
    price: 'Starting at $3,500',
  },
];

const process = [
  { step: '01', title: 'Discover', description: 'Deep dive into your business, users, and goals through workshops and research.' },
  { step: '02', title: 'Define', description: 'Synthesize findings into clear problem statements, user personas, and success metrics.' },
  { step: '03', title: 'Design', description: 'Iterative design process with regular check-ins, from wireframes to high-fidelity mockups.' },
  { step: '04', title: 'Validate', description: 'Test with real users, gather feedback, and refine until the solution works.' },
  { step: '05', title: 'Deliver', description: 'Comprehensive handoff with specs, assets, design system, and developer support.' },
];

export function Services() {
  return (
    <section 
      id="services" 
      className="section"
      aria-labelledby="services-title"
    >
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 id="services-title" className="section-title">Services</h2>
          <p className="section-subtitle">
            End-to-end design services tailored to your product's needs. From strategy to pixel-perfect delivery.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8 mb-20">
          <div className="space-y-6">
            <h3 className="text-3xl font-bold text-dark-900 dark:text-white">
              How I Work
            </h3>
            <p className="text-lg text-dark-600 dark:text-dark-400">
              My process is collaborative, transparent, and focused on outcomes. 
              I believe the best results come from close partnership with your team.
            </p>
            <div className="space-y-6">
              {process.map((item, index) => (
                <div key={item.step} className="flex gap-4">
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center text-primary-600 dark:text-primary-400 font-bold text-lg">
                    {item.step}
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark-900 dark:text-white">{item.title}</h4>
                    <p className="text-dark-600 dark:text-dark-400 text-sm mt-1">{item.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="relative">
            <div className="aspect-square rounded-3xl bg-gradient-to-br from-primary-500 to-purple-600 p-1 opacity-10">
              <div className="w-full h-full rounded-2xl bg-white dark:bg-dark-950 p-8 flex items-center justify-center">
                <div className="text-center">
                  <div className="text-6xl font-bold text-primary-600 dark:text-primary-400 mb-2">50+</div>
                  <div className="text-dark-600 dark:text-dark-400">Projects Delivered</div>
                </div>
              </div>
            </div>
            <div className="absolute -bottom-6 -right-6 w-40 h-40 bg-white dark:bg-dark-950 rounded-2xl shadow-xl border border-dark-200 dark:border-dark-700 p-6 animate-float">
              <div className="text-center">
                <Zap className="w-10 h-10 text-yellow-500 mx-auto mb-3" aria-hidden="true" />
                <div className="font-bold text-dark-900 dark:text-white">Fast Turnaround</div>
                <div className="text-sm text-dark-500 dark:text-dark-400">2-4 weeks typical</div>
              </div>
            </div>
            <div className="absolute -top-6 -left-6 w-40 h-40 bg-white dark:bg-dark-950 rounded-2xl shadow-xl border border-dark-200 dark:border-dark-700 p-6 animate-float animation-delay-300">
              <div className="text-center">
                <Shield className="w-10 h-10 text-green-500 mx-auto mb-3" aria-hidden="true" />
                <div className="font-bold text-dark-900 dark:text-white">Quality Guaranteed</div>
                <div className="text-sm text-dark-500 dark:text-dark-400">Unlimited revisions</div>
              </div>
            </div>
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold text-dark-900 dark:text-white text-center mb-10">
            What I Offer
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service, index) => (
              <ServiceCard key={service.id} service={service} index={index} />
            ))}
          </div>
        </div>

        <div className="text-center">
          <p className="text-lg text-dark-600 dark:text-dark-400 mb-6 max-w-2xl mx-auto">
            Need something custom? I also offer design audits, team workshops, 
            design mentorship, and fractional design leadership.
          </p>
          <a
            href="#contact"
            className="inline-flex items-center gap-2 px-6 py-3 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors font-medium"
          >
            Discuss Your Project
            <Layers className="w-5 h-5" aria-hidden="true" />
          </a>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({ service, index }: { service: typeof services[0]; index: number }) {
  return (
    <Card className="group h-full overflow-hidden animate-slide-up" style={{ animationDelay: `${index * 100}ms` }}>
      <CardContent className="p-6 h-full flex flex-col">
        <div className="w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center mb-4 group-hover:bg-primary-600 group-hover:text-white transition-colors">
          <service.icon className={cn('w-6 h-6 text-primary-600 dark:text-primary-400 group-hover:text-white transition-colors')} aria-hidden="true" />
        </div>
        <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-2">{service.title}</h3>
        <p className="text-dark-600 dark:text-dark-400 text-sm mb-4 flex-1">{service.shortDesc}</p>
        <Badge variant="outline" className="mb-4 w-fit text-xs">{service.price}</Badge>
        <ul className="space-y-2 mb-6 flex-1">
          {service.features.map((feature) => (
            <li key={feature} className="flex items-start gap-2 text-sm text-dark-600 dark:text-dark-400">
              <span className="w-1.5 h-1.5 rounded-full bg-primary-500 mt-2 flex-shrink-0" aria-hidden="true" />
              {feature}
            </li>
          ))}
        </ul>
      </CardContent>
    </Card>
  );
}