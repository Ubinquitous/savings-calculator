import * as React from 'react';

import { cn } from '@/lib/utils';
import { Label } from './label';

interface InputProps extends React.ComponentProps<'input'> {
  label?: string;
  guideline?: string;
}

function Input({ className, label, guideline, type, ...props }: InputProps) {
  return (
    <div className={cn('grid w-full max-w-sm items-center gap-3 py-2', className)}>
      <Label>{label || 'ㅤ'}</Label>
      <figure className="flex w-full flex-col gap-1 items-end">
        <input
          type={type}
          data-slot="input"
          className={cn(
            'file:text-foreground placeholder:text-muted-foreground selection:bg-primary selection:text-primary-foreground dark:bg-input/30 border-input flex h-9 w-full min-w-0 rounded-md border bg-transparent px-3 py-1 text-base shadow-xs transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm',
            'focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px]',
            'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
          )}
          {...props}
        />
        <span className="text-xs text-gray-500">{guideline || 'ㅤ'}</span>
      </figure>
    </div>
  );
}

export { Input };
