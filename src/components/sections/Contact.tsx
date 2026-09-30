'use client';

import { useState } from 'react';
import { Mail, MapPin, Clock, Send, Loader2 } from 'lucide-react';
import { Button } from '@/components/ui/Button';
import { Input } from '@/components/ui/Input';
import { Textarea } from '@/components/ui/Textarea';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/Card';
import { cn } from '@/lib/utils';

export function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    company: '',
    projectType: '',
    budget: '',
    timeline: '',
    message: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');

  const validateForm = () => {
    const newErrors: Record<string, string> = {};
    if (!formData.name.trim()) newErrors.name = 'Name is required';
    if (!formData.email.trim()) newErrors.email = 'Email is required';
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.message.trim()) newErrors.message = 'Message is required';
    else if (formData.message.trim().length < 20) newErrors.message = 'Message must be at least 20 characters';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    setStatus('submitting');
    
    try {
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatus('success');
        setFormData({
          name: '', email: '', company: '', projectType: '', budget: '', timeline: '', message: '',
        });
      } else {
        setStatus('error');
      }
    } catch {
      setStatus('error');
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors(prev => ({ ...prev, [name]: '' }));
  };

  const contactInfo = [
    { icon: Mail, title: 'Email', value: 'hello@designer.com', href: 'mailto:hello@designer.com' },
    { icon: MapPin, title: 'Location', value: 'San Francisco, CA (Remote worldwide)', href: null },
    { icon: Clock, title: 'Availability', value: 'Mon–Fri, 9am–6pm PST', href: null },
  ];

  const projectTypes = [
    { value: '', label: 'Select project type' },
    { value: 'ui-design', label: 'UI Design' },
    { value: 'ux-research', label: 'UX Research' },
    { value: 'design-system', label: 'Design System' },
    { value: 'mobile-app', label: 'Mobile App Design' },
    { value: 'branding', label: 'Brand Identity' },
    { value: 'prototyping', label: 'Prototyping' },
    { value: 'other', label: 'Other' },
  ];

  const budgets = [
    { value: '', label: 'Select budget range' },
    { value: 'under-5k', label: 'Under $5,000' },
    { value: '5k-15k', label: '$5,000 - $15,000' },
    { value: '15k-30k', label: '$15,000 - $30,000' },
    { value: '30k-50k', label: '$30,000 - $50,000' },
    { value: '50k+', label: '$50,000+' },
  ];

  const timelines = [
    { value: '', label: 'Select timeline' },
    { value: 'asap', label: 'ASAP' },
    { value: '1-month', label: 'Within 1 month' },
    { value: '2-3-months', label: '2-3 months' },
    { value: '3-6-months', label: '3-6 months' },
    { value: 'flexible', label: 'Flexible' },
  ];

  return (
    <section 
      id="contact" 
      className="section"
      aria-labelledby="contact-title"
    >
      <div className="container">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16">
          <div>
            <h2 id="contact-title" className="section-title">Let's Work Together</h2>
            <p className="section-subtitle">
              Have a project in mind? I'd love to hear about it. Fill out the form and I'll get back to you within 24 hours.
            </p>

            <div className="mt-10 space-y-6">
              {contactInfo.map((item) => (
                <a 
                  key={item.title}
                  href={item.href || '#'}
                  className="flex items-start gap-4 p-4 rounded-xl bg-dark-50 dark:bg-dark-900 border border-dark-200 dark:border-dark-800 hover:border-primary-300 dark:hover:border-primary-700 transition-colors"
                >
                  <div className="flex-shrink-0 w-12 h-12 rounded-xl bg-primary-100 dark:bg-primary-900/30 flex items-center justify-center">
                    <item.icon className="w-6 h-6 text-primary-600 dark:text-primary-400" aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-dark-900 dark:text-white">{item.title}</h4>
                    <p className="text-dark-600 dark:text-dark-400 text-sm">{item.value}</p>
                  </div>
                </a>
              ))}
            </div>

            <div className="mt-10 pt-8 border-t border-dark-200 dark:border-dark-800">
              <h3 className="font-semibold text-dark-900 dark:text-white mb-4">What happens next?</h3>
              <ol className="space-y-3 text-sm text-dark-600 dark:text-dark-400">
                <li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-bold flex items-center justify-center">1</span>I'll review your inquiry and respond within 24 hours</li>
                <li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-bold flex items-center justify-center">2</span>We'll schedule a free 30-min discovery call</li>
                <li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-bold flex items-center justify-center">3</span>I'll send a detailed proposal with timeline & pricing</li>
                <li className="flex items-start gap-3"><span className="flex-shrink-0 w-6 h-6 rounded-full bg-primary-100 dark:bg-primary-900/30 text-primary-600 dark:text-primary-400 text-xs font-bold flex items-center justify-center">4</span>We kick off the project!</li>
              </ol>
            </div>
          </div>

          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Project Details</CardTitle>
            </CardHeader>
            <CardContent>
              {status === 'success' ? (
                <div className="text-center py-8">
                  <div className="w-16 h-16 rounded-full bg-green-100 dark:bg-green-900/30 flex items-center justify-center mx-auto mb-4">
                    <Send className="w-8 h-8 text-green-600 dark:text-green-400" aria-hidden="true" />
                  </div>
                  <h3 className="text-xl font-bold text-dark-900 dark:text-white mb-2">Message Sent!</h3>
                  <p className="text-dark-600 dark:text-dark-400 mb-6">
                    Thanks for reaching out. I'll get back to you within 24 hours.
                  </p>
                  <Button 
                    variant="outline" 
                    onClick={() => setStatus('idle')}
                    className="w-full"
                  >
                    Send Another Message
                  </Button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4" noValidate>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <Input
                      name="name"
                      label="Name *"
                      placeholder="John Doe"
                      value={formData.name}
                      onChange={handleChange}
                      error={errors.name}
                      required
                    />
                    <Input
                      name="email"
                      type="email"
                      label="Email *"
                      placeholder="john@company.com"
                      value={formData.email}
                      onChange={handleChange}
                      error={errors.email}
                      required
                    />
                  </div>
                  
                  <Input
                    name="company"
                    label="Company (Optional)"
                    placeholder="Acme Inc."
                    value={formData.company}
                    onChange={handleChange}
                  />
                  
                  <div className="grid sm:grid-cols-2 gap-4">
                    <select
                      name="projectType"
                      value={formData.projectType}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border bg-white text-dark-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent border-dark-300 hover:border-dark-400"
                      required
                    >
                      {projectTypes.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                    <select
                      name="budget"
                      value={formData.budget}
                      onChange={handleChange}
                      className="w-full px-4 py-2.5 rounded-lg border bg-white text-dark-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent border-dark-300 hover:border-dark-400"
                    >
                      {budgets.map((opt) => (
                        <option key={opt.value} value={opt.value}>{opt.label}</option>
                      ))}
                    </select>
                  </div>
                  
                  <select
                    name="timeline"
                    value={formData.timeline}
                    onChange={handleChange}
                    className="w-full px-4 py-2.5 rounded-lg border bg-white text-dark-900 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent border-dark-300 hover:border-dark-400"
                  >
                    {timelines.map((opt) => (
                      <option key={opt.value} value={opt.value}>{opt.label}</option>
                    ))}
                  </select>
                  
                  <Textarea
                    name="message"
                    label="Project Details *"
                    placeholder="Tell me about your project, goals, challenges, and anything else relevant..."
                    value={formData.message}
                    onChange={handleChange}
                    error={errors.message}
                    rows={5}
                    required
                  />
                  
                  {status === 'error' && (
                    <div className="p-3 rounded-lg bg-red-50 dark:bg-red-900/30 border border-red-200 dark:border-red-800 text-red-700 dark:text-red-300 text-sm" role="alert">
                      Something went wrong. Please try again or email me directly.
                    </div>
                  )}
                  
                  <Button type="submit" className="w-full" size="lg" loading={status === 'submitting'}>
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="w-5 h-5 animate-spin" aria-hidden="true" />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <Send className="w-5 h-5" aria-hidden="true" />
                      </>
                    )}
                  </Button>
                  
                  <p className="text-xs text-dark-500 dark:text-dark-400 text-center">
                    By submitting, you agree to my{' '}
                    <a href="/privacy" className="underline hover:text-primary-600">Privacy Policy</a>
                  </p>
                </form>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}