import React from 'react';
import { cn } from '../../lib/utils';

export interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  asAnchor?: boolean;
  href?: string;
  target?: string;
  rel?: string;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  className,
  asAnchor = false,
  href,
  target,
  rel,
  ...props
}) => {
  const baseStyles = 'inline-flex items-center justify-center font-medium transition-all duration-200 rounded-[5px] select-none';

  const variants = {
    primary: 'bg-burnt-orange text-white hover:bg-light-orange shadow-sm hover:shadow active:scale-[0.99]',
    secondary: 'bg-cream text-charcoal hover:bg-white border border-warm-border',
    outline: 'bg-white/80 hover:bg-white text-charcoal border border-warm-border hover:border-charcoal/40 shadow-sm',
    ghost: 'text-charcoal hover:text-burnt-orange hover:bg-cream/40',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
  };

  const computedClass = cn(baseStyles, variants[variant], sizes[size], className);

  if (asAnchor && href) {
    return (
      <a href={href} target={target} rel={rel} className={computedClass}>
        {children}
      </a>
    );
  }

  return (
    <button className={computedClass} {...props}>
      {children}
    </button>
  );
};
