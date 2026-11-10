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
  const baseStyles =
    'group/btn relative inline-flex items-center justify-center font-medium transition-all duration-200 rounded-[5px] select-none overflow-hidden active:scale-[0.98]';

  const variants = {
    primary:
      'bg-burnt-orange hover:bg-[#B34513] text-white shadow-sm hover:shadow [&>svg]:transition-transform [&>svg]:duration-200 group-hover/btn:[&>svg]:translate-x-[3px] [&>span>svg]:transition-transform [&>span>svg]:duration-200 group-hover/btn:[&>span>svg]:translate-x-[3px]',
    secondary:
      'bg-cream text-charcoal border border-warm-border',
    outline:
      'bg-white/90 text-charcoal border border-warm-border hover:border-charcoal/40 shadow-sm',
    ghost:
      'text-charcoal hover:text-burnt-orange hover:bg-cream/40',
  };

  const sizes = {
    sm: 'text-xs px-3 py-1.5 gap-1.5',
    md: 'text-sm px-5 py-2.5 gap-2',
    lg: 'text-base px-6 py-3.5 gap-2.5',
  };

  const computedClass = cn(baseStyles, variants[variant], sizes[size], className);

  // Subtle fill sweep from the left for secondary & outline buttons (ivory to a slightly darker cream #E5DDD0)
  const isSecondaryOrOutline = variant === 'secondary' || variant === 'outline';

  const content = (
    <>
      {isSecondaryOrOutline && (
        <span
          className="absolute inset-0 bg-[#E5DDD0] origin-left scale-x-0 group-hover/btn:scale-x-100 transition-transform duration-300 ease-out pointer-events-none z-0"
          aria-hidden="true"
        />
      )}
      <span className="relative z-10 inline-flex items-center gap-inherit">
        {children}
      </span>
    </>
  );

  if (asAnchor && href) {
    return (
      <a href={href} target={target} rel={rel} className={computedClass}>
        {content}
      </a>
    );
  }

  return (
    <button className={computedClass} {...props}>
      {content}
    </button>
  );
};

export default Button;
