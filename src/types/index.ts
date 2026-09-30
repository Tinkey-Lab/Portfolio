import { DefaultSession, DefaultUser } from 'next-auth';
import { JWT, DefaultJWT } from 'next-auth/jwt';

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: 'ADMIN' | 'EDITOR';
    } & DefaultSession['user'];
  }

  interface User extends DefaultUser {
    role: 'ADMIN' | 'EDITOR';
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id: string;
    role: 'ADMIN' | 'EDITOR';
  }
}

export type Project = {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDesc: string;
  thumbnail: string;
  images: string[];
  tags: string[];
  category: string;
  featured: boolean;
  published: boolean;
  liveUrl?: string;
  repoUrl?: string;
  caseStudy?: string;
  order: number;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
};

export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  coverImage?: string;
  tags: string[];
  published: boolean;
  publishedAt?: Date;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
};

export type Testimonial = {
  id: string;
  name: string;
  role: string;
  company?: string;
  content: string;
  avatar?: string;
  rating: number;
  featured: boolean;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
};

export type Service = {
  id: string;
  title: string;
  slug: string;
  description: string;
  shortDesc: string;
  icon: string;
  features: string[];
  price?: string;
  order: number;
  published: boolean;
  createdAt: Date;
  updatedAt: Date;
  authorId: string;
};

export type SiteSettings = {
  id: string;
  siteName: string;
  siteTagline: string;
  heroTitle: string;
  heroSubtitle: string;
  aboutTitle: string;
  aboutContent: string;
  contactEmail: string;
  socialLinks: {
    twitter?: string;
    linkedin?: string;
    github?: string;
    dribbble?: string;
    behance?: string;
    instagram?: string;
  };
  seoTitle: string;
  seoDescription: string;
  ogImage?: string;
  updatedAt: Date;
};