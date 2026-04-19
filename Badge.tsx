import React from 'react';
import { cn } from '@/src/lib/utils';

export function Badge({ className, variant = 'default', ...props }: React.HTMLAttributes<HTMLDivElement> & { variant?: 'default' | 'outline' | 'destructive' | 'success' }) {
  const variants = {
    default: "bg-slate-800 text-slate-50 border-transparent",
    outline: "text-slate-300 border-slate-700",
    destructive: "bg-red-900/40 text-red-400 border-red-800/50",
    success: "bg-teal-900/40 text-teal-400 border-teal-800/50",
  };
  
  return (
    <div className={cn("inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-semibold transition-colors focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2", variants[variant], className)} {...props} />
  );
}
