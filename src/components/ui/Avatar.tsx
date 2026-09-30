'use client';

import { ImageHTMLAttributes, forwardRef } from 'react';
import { cn } from '@/lib/utils';

interface AvatarProps extends ImageHTMLAttributes<HTMLImageElement> {
  src?: string | null;
  alt?: string;
  fallback?: string;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  shape?: 'circle' | 'square';
}

const Avatar = forwardRef<HTMLImageElement, AvatarProps>(
  ({ className, src, alt, fallback, size = 'md', shape = 'circle', ...props }, ref) => {
    const sizes = {
      xs: 'w-6 h-6 text-xs',
      sm: 'w-8 h-8 text-sm',
      md: 'w-10 h-10 text-base',
      lg: 'w-12 h-12 text-lg',
      xl: 'w-16 h-16 text-xl',
      '2xl': 'w-24 h-24 text-2xl',
    };
    
    const shapes = {
      circle: 'rounded-full',
      square: 'rounded-lg',
    };

    const getInitials = (name: string) => {
      return name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .toUpperCase()
        .slice(0, 2);
    };

    const initials = fallback || (alt ? getInitials(alt) : '?');
    const bgColors = [
      'bg-primary-100 text-primary-700',
      'bg-green-100 text-green-700',
      'bg-yellow-100 text-yellow-700',
      'bg-red-100 text-red-700',
      'bg-blue-100 text-blue-700',
      'bg-purple-100 text-purple-700',
      'bg-pink-100 text-pink-700',
      'bg-indigo-100 text-indigo-700',
    ];
    
    const colorIndex = initials.charCodeAt(0) % bgColors.length;
    const bgColor = bgColors[colorIndex];

    if (src) {
      return (
        <img
          ref={ref}
          src={src}
          alt={alt || ''}
          className={cn(sizes[size], shapes[shape], 'object-cover', className)}
          {...props}
        />
      );
    }

    return (
      <div
        ref={ref}
        className={cn(sizes[size], shapes[shape], bgColor, 'flex items-center justify-center font-medium', className)}
        {...props}
      >
        {initials}
      </div>
    );
  }
);

Avatar.displayName = 'Avatar';
export { Avatar };