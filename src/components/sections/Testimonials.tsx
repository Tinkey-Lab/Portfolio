'use client';

import { useState, useCallback } from 'react';
import { ChevronLeft, ChevronRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Avatar } from '@/components/ui/Avatar';
import { Card, CardContent } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

const testimonials = [
  {
    id: '1',
    name: 'Sarah Chen',
    role: 'Product Manager',
    company: 'TechCorp Inc.',
    content: 'Working with this designer was a game-changer for our product. They took our complex requirements and transformed them into an intuitive, beautiful interface that our users love. The attention to detail and user research depth was exceptional.',
    avatar: '/testimonials/sarah.jpg',
    rating: 5,
    featured: true,
  },
  {
    id: '2',
    name: 'Marcus Johnson',
    role: 'CTO',
    company: 'StartupXYZ',
    content: 'The design system they built for us has saved countless hours of development time. It\'s comprehensive, well-documented, and the component library is a joy to work with. Our design consistency across products has improved dramatically.',
    avatar: '/testimonials/marcus.jpg',
    rating: 5,
    featured: true,
  },
  {
    id: '3',
    name: 'Emily Rodriguez',
    role: 'Founder',
    company: 'HealthTech Solutions',
    content: 'They conducted thorough user research that uncovered insights we never would have found. The resulting prototype validated our concept and helped us secure Series A funding. Professional, communicative, and delivers on time.',
    avatar: '/testimonials/emily.jpg',
    rating: 5,
    featured: false,
  },
  {
    id: '4',
    name: 'David Park',
    role: 'VP of Design',
    company: 'Enterprise Co.',
    content: 'Rare combination of strong visual design skills and deep UX expertise. They led the redesign of our flagship product, improving key metrics by 40%. Their collaborative approach made them feel like a true part of our team.',
    avatar: '/testimonials/david.jpg',
    rating: 5,
    featured: true,
  },
  {
    id: '5',
    name: 'Lisa Thompson',
    role: 'Marketing Director',
    company: 'E-commerce Brand',
    content: 'The e-commerce redesign increased our conversion rate by 28% and average order value by 15%. They understood our brand perfectly and created something that feels premium yet accessible. Highly recommended.',
    avatar: '/testimonials/lisa.jpg',
    rating: 5,
    featured: false,
  },
  {
    id: '6',
    name: 'James Wilson',
    role: 'Engineering Lead',
    company: 'SaaS Platform',
    content: 'Best designer-developer handoff I\'ve ever experienced. Figma files are organized, specs are clear, and they\'re always available for questions. The design tokens and component documentation made implementation seamless.',
    avatar: '/testimonials/james.jpg',
    rating: 5,
    featured: false,
  },
];

export function Testimonials() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 3;
  const maxIndex = testimonials.length - itemsPerView;

  const next = useCallback(() => {
    setCurrentIndex(prev => prev >= maxIndex ? 0 : prev + 1);
  }, []);

  const prev = useCallback(() => {
    setCurrentIndex(prev => prev <= 0 ? maxIndex : prev - 1);
  }, []);

  const visibleTestimonials = testimonials.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <section 
      id="testimonials" 
      className="section bg-dark-50 dark:bg-dark-900"
      aria-labelledby="testimonials-title"
    >
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 id="testimonials-title" className="section-title">Client Testimonials</h2>
          <p className="section-subtitle">
            Don't just take my word for it—here's what clients have to say about working together.
          </p>
        </div>

        <div className="relative">
          <div className="overflow-hidden">
            <div 
              className="flex transition-transform duration-500 ease-out"
              style={{ transform: `translateX(-${(currentIndex / testimonials.length) * 100}%)` }}
              role="list"
              aria-label="Client testimonials"
            >
              {testimonials.map((testimonial) => (
                <div key={testimonial.id} className="w-full sm:w-1/2 lg:w-1/3 px-4" role="listitem">
                  <TestimonialCard testimonial={testimonial} />
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-center gap-4 mt-8">
            <Button
              variant="outline"
              size="icon"
              onClick={prev}
              aria-label="Previous testimonial"
              className="hidden sm:flex"
            >
              <ChevronLeft className="w-5 h-5" aria-hidden="true" />
            </Button>
            <div className="flex items-center gap-2" role="tablist" aria-label="Testimonial navigation">
              {testimonials.slice(0, itemsPerView + maxIndex).map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={cn(
                    'w-2.5 h-2.5 rounded-full transition-all',
                    index === currentIndex
                      ? 'bg-primary-600 w-8'
                      : 'bg-dark-300 dark:bg-dark-600 hover:bg-dark-400 dark:hover:bg-dark-500'
                  )}
                  role="tab"
                  aria-selected={index === currentIndex}
                  aria-label={`Go to testimonial ${index + 1}`}
                />
              ))}
            </div>
            <Button
              variant="outline"
              size="icon"
              onClick={next}
              aria-label="Next testimonial"
              className="hidden sm:flex"
            >
              <ChevronRight className="w-5 h-5" aria-hidden="true" />
            </Button>
          </div>
        </div>

        <div className="mt-16 grid md:grid-cols-3 gap-6">
          {testimonials.filter(t => t.featured).slice(0, 3).map((testimonial) => (
            <FeaturedQuote key={testimonial.id} testimonial={testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}

function TestimonialCard({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <Card className="h-full">
      <CardContent className="p-6">
        <div className="flex items-center gap-1 mb-4" aria-label={`${testimonial.rating} out of 5 stars`}>
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={cn('w-5 h-5', i < testimonial.rating ? 'fill-yellow-400 text-yellow-400' : 'text-dark-200 dark:text-dark-700')} aria-hidden="true" />
          ))}
        </div>
        <blockquote className="text-dark-600 dark:text-dark-400 leading-relaxed mb-6">
          &ldquo;{testimonial.content}&rdquo;
        </blockquote>
        <div className="flex items-center gap-4">
          <Avatar src={testimonial.avatar} alt={testimonial.name} fallback={testimonial.name} size="md" />
          <div>
            <div className="font-semibold text-dark-900 dark:text-white">{testimonial.name}</div>
            <div className="text-sm text-dark-500 dark:text-dark-400">{testimonial.role} at {testimonial.company}</div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

function FeaturedQuote({ testimonial }: { testimonial: typeof testimonials[0] }) {
  return (
    <Card className="p-6 relative overflow-hidden">
      <div className="absolute top-4 right-4 text-primary-200 dark:text-primary-800 opacity-50">
        <Star className="w-12 h-12" aria-hidden="true" />
      </div>
      <blockquote className="text-lg text-dark-700 dark:text-dark-300 leading-relaxed mb-6 relative z-10">
        &ldquo;{testimonial.content}&rdquo;
      </blockquote>
      <div className="flex items-center gap-3 relative z-10">
        <Avatar src={testimonial.avatar} alt={testimonial.name} fallback={testimonial.name} size="sm" />
        <div>
          <div className="font-medium text-dark-900 dark:text-white">{testimonial.name}</div>
          <div className="text-sm text-dark-500 dark:text-dark-400">{testimonial.role}, {testimonial.company}</div>
        </div>
      </div>
    </Card>
  );
}