'use client';

import Link from 'next/link';
import { Github, Linkedin, Twitter, Dribbble, Palette, Instagram, Mail, ArrowRight } from 'lucide-react';

const socialLinks = [
  { name: 'GitHub', href: 'https://github.com', icon: Github },
  { name: 'LinkedIn', href: 'https://linkedin.com', icon: Linkedin },
  { name: 'Twitter', href: 'https://twitter.com', icon: Twitter },
  { name: 'Dribbble', href: 'https://dribbble.com', icon: Dribbble },
  { name: 'Behance', href: 'https://behance.net', icon: Palette },
  { name: 'Instagram', href: 'https://instagram.com', icon: Instagram },
];

const footerLinks = {
  'Quick Links': [
    { name: 'Home', href: '/' },
    { name: 'Projects', href: '/projects' },
    { name: 'Case Studies', href: '/projects?view=case-studies' },
    { name: 'Blog', href: '/blog' },
  ],
  'Services': [
    { name: 'UI Design', href: '/services#ui-design' },
    { name: 'UX Research', href: '/services#ux-research' },
    { name: 'Design Systems', href: '/services#design-systems' },
    { name: 'Prototyping', href: '/services#prototyping' },
  ],
  'Resources': [
    { name: 'Blog', href: '/blog' },
    { name: 'Case Studies', href: '/projects?view=case-studies' },
    { name: 'Testimonials', href: '/#testimonials' },
    { name: 'Contact', href: '/#contact' },
  ],
};

export function Footer() {
  return (
    <footer className="bg-dark-50 dark:bg-dark-950 border-t border-dark-200 dark:border-dark-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="xl:grid xl:grid-cols-3 xl:gap-8">
          <div className="space-y-8">
            <Link href="/" className="flex items-center gap-2" aria-label="Go to homepage">
              <span className="text-xl font-bold text-dark-900 dark:text-white">UI/UX</span>
              <span className="text-primary-600">Designer</span>
            </Link>
            <p className="text-dark-600 dark:text-dark-400 max-w-xs">
              Crafting beautiful, accessible, and user-centered digital experiences that make an impact.
            </p>
            <div className="flex gap-4">
              {socialLinks.map((social) => (
                <a
                  key={social.name}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 rounded-lg text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 hover:bg-dark-100 dark:hover:bg-dark-800 transition-colors"
                  aria-label={social.name}
                >
                  <social.icon className="w-5 h-5" aria-hidden="true" />
                </a>
              ))}
            </div>
          </div>

          <div className="mt-12 grid grid-cols-2 gap-8 xl:col-span-2 xl:mt-0">
            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-dark-900 dark:text-white uppercase tracking-wider">
                  Quick Links
                </h3>
                <ul className="mt-4 space-y-3">
                  {footerLinks['Quick Links'].map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-dark-600 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-dark-900 dark:text-white uppercase tracking-wider">
                  Services
                </h3>
                <ul className="mt-4 space-y-3">
                  {footerLinks['Services'].map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-dark-600 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-8">
              <div>
                <h3 className="text-sm font-semibold text-dark-900 dark:text-white uppercase tracking-wider">
                  Resources
                </h3>
                <ul className="mt-4 space-y-3">
                  {footerLinks['Resources'].map((link) => (
                    <li key={link.name}>
                      <Link
                        href={link.href}
                        className="text-sm text-dark-600 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                      >
                        {link.name}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-dark-900 dark:text-white uppercase tracking-wider">
                  Connect
                </h3>
                <ul className="mt-4 space-y-3">
                  <li>
                    <a
                      href="mailto:hello@designer.com"
                      className="flex items-center gap-2 text-sm text-dark-600 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      <Mail className="w-4 h-4" aria-hidden="true" />
                      hello@designer.com
                    </a>
                  </li>
                  <li>
                    <a
                      href="https://calendly.com"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-dark-600 dark:text-dark-400 hover:text-primary-600 dark:hover:text-primary-400 transition-colors"
                    >
                      <ArrowRight className="w-4 h-4" aria-hidden="true" />
                      Book a Call
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-dark-200 dark:border-dark-800">
          <p className="text-sm text-dark-500 dark:text-dark-400 text-center">
            &copy; {new Date().getFullYear()} UI/UX Designer. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}