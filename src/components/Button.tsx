import { forwardRef, ComponentProps } from 'react';
import { motion } from 'motion/react';
import { useWebHaptics } from 'web-haptics/react';

interface ButtonProps extends ComponentProps<typeof motion.button> {
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  ({ variant = 'primary', size = 'md', className = '', children, onClick, ...props }, ref) => {
    const { trigger } = useWebHaptics();

    const baseStyles = 'inline-flex items-center justify-center rounded-xl font-semibold transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600';
    
    const variantStyles = {
      primary: 'bg-[#2563EB] text-white hover:bg-[#1D4ED8] shadow-sm hover:shadow-md hover:shadow-blue-500/25',
      secondary: 'bg-[#14B8A6] text-white hover:bg-[#0D9488] shadow-sm hover:shadow-md hover:shadow-teal-500/25',
      outline: 'border border-slate-300 bg-white text-slate-800 hover:bg-slate-50 hover:border-slate-400 shadow-2xs',
      ghost: 'text-slate-700 hover:bg-slate-100 hover:text-slate-900'
    };
    
    const sizeStyles = {
      sm: 'px-4 py-2 text-xs sm:text-sm gap-1.5',
      md: 'px-5 py-2.5 text-sm sm:text-base gap-2',
      lg: 'px-7 py-3.5 text-base sm:text-lg gap-2.5'
    };

    const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
      if (!props.disabled) {
        trigger('nudge');
      }
      if (onClick) {
        onClick(e);
      }
    };
    
    return (
      <motion.button
        ref={ref}
        whileHover={{ scale: props.disabled ? 1 : 1.015 }}
        whileTap={{ scale: props.disabled ? 1 : 0.98 }}
        className={`${baseStyles} ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
        onClick={handleClick}
        {...props}
      >
        {children}
      </motion.button>
    );
  }
);

Button.displayName = 'Button';
