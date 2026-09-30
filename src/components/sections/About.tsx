'use client';

import { CheckCircle, Award, Heart, Code, Users, BookOpen } from 'lucide-react';
import { cn } from '@/lib/utils';

const stats = [
  { value: '50+', label: 'Projects Delivered' },
  { value: '5★', label: 'Client Satisfaction' },
  { value: '3+', label: 'Years Experience' },
  { value: '15+', label: 'Happy Clients' },
];

const skills = [
  { name: 'User Research', icon: Users, color: 'text-blue-600', bg: 'bg-blue-100 dark:bg-blue-900/30' },
  { name: 'UI Design', icon: Heart, color: 'text-pink-600', bg: 'bg-pink-100 dark:bg-pink-900/30' },
  { name: 'Prototyping', icon: Code, color: 'text-purple-600', bg: 'bg-purple-100 dark:bg-purple-900/30' },
  { name: 'Design Systems', icon: Award, color: 'text-green-600', bg: 'bg-green-100 dark:bg-green-900/30' },
  { name: 'Usability Testing', icon: Users, color: 'text-orange-600', bg: 'bg-orange-100 dark:bg-orange-900/30' },
  { name: 'Continuous Learning', icon: BookOpen, color: 'text-indigo-600', bg: 'bg-indigo-100 dark:bg-indigo-900/30' },
];

const values = [
  {
    title: 'Empathy First',
    description: 'Every design decision starts with understanding the user\'s needs, frustrations, and goals.',
    icon: Heart,
  },
  {
    title: 'Pixel Perfect',
    description: 'Attention to detail isn\'t optional—it\'s the difference between good and exceptional.',
    icon: Award,
  },
  {
    title: 'Collaborative Spirit',
    description: 'Best results come from close collaboration with developers, stakeholders, and users.',
    icon: Users,
  },
  {
    title: 'Continuous Growth',
    description: 'Design evolves constantly. I stay curious and keep learning new tools and methodologies.',
    icon: BookOpen,
  },
];

export function About() {
  return (
    <section 
      id="about" 
      className="section bg-dark-50 dark:bg-dark-900"
      aria-labelledby="about-title"
    >
      <div className="container">
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 id="about-title" className="section-title">About Me</h2>
          <p className="section-subtitle">
            Hi, I'm a passionate UI/UX designer with 3+ years of experience creating digital products that users love and businesses trust.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 mb-16">
          <div className="space-y-6">
            <p className="text-lg text-dark-600 dark:text-dark-400 leading-relaxed">
              My journey into design started with a fascination for how people interact with technology. 
              What began as curiosity about visual aesthetics evolved into a deep commitment to solving 
              real problems through thoughtful, user-centered design.
            </p>
            <p className="text-lg text-dark-600 dark:text-dark-400 leading-relaxed">
              I specialize in creating intuitive interfaces, conducting user research, building scalable 
              design systems, and crafting delightful micro-interactions. My process combines analytical 
              thinking with creative exploration to deliver solutions that are both beautiful and functional.
            </p>
            <p className="text-lg text-dark-600 dark:text-dark-400 leading-relaxed">
              When I'm not designing, you'll find me exploring new design tools, reading about psychology 
              and behavioral economics, or contributing to the design community through mentorship and articles.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            {stats.map((stat, index) => (
              <div 
                key={stat.label} 
                className="p-6 bg-white dark:bg-dark-950 rounded-2xl border border-dark-200 dark:border-dark-800 hover:border-primary-300 dark:hover:border-primary-700 transition-colors animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="text-3xl sm:text-4xl font-bold text-primary-600 dark:text-primary-400 mb-1">
                  {stat.value}
                </div>
                <div className="text-sm text-dark-500 dark:text-dark-400">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="mb-16">
          <h3 className="text-2xl font-bold text-dark-900 dark:text-white text-center mb-10">
            Core Values
          </h3>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, index) => (
              <div 
                key={value.title}
                className="p-6 bg-white dark:bg-dark-950 rounded-2xl border border-dark-200 dark:border-dark-800 hover:shadow-lg hover:border-primary-300 dark:hover:border-primary-700 transition-all animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={cn('w-12 h-12 rounded-xl flex items-center justify-center mb-4', value.icon === Heart ? 'bg-pink-100 dark:bg-pink-900/30 text-pink-600 dark:text-pink-400' : value.icon === Award ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400' : value.icon === Users ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400' : 'bg-indigo-100 dark:bg-indigo-900/30 text-indigo-600 dark:text-indigo-400')}>
                  <value.icon className="w-6 h-6" aria-hidden="true" />
                </div>
                <h4 className="text-lg font-semibold text-dark-900 dark:text-white mb-2">{value.title}</h4>
                <p className="text-dark-600 dark:text-dark-400">{value.description}</p>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold text-dark-900 dark:text-white text-center mb-10">
            Skills & Expertise
          </h3>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-4xl mx-auto">
            {skills.map((skill, index) => (
              <div 
                key={skill.name}
                className="flex items-center gap-4 p-4 bg-white dark:bg-dark-950 rounded-xl border border-dark-200 dark:border-dark-800 hover:border-primary-300 dark:hover:border-primary-700 transition-colors animate-slide-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={cn('p-3 rounded-xl', skill.bg, skill.color)}>
                  <skill.icon className="w-5 h-5" aria-hidden="true" />
                </div>
                <span className="font-medium text-dark-900 dark:text-white">{skill.name}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}