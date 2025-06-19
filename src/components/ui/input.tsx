import * as React from 'react';

import { cn } from '@/lib/utils';
import { Label } from './label';

interface InputProps extends React.ComponentProps<'input'> {
  label?: string;
  unit?: string;
  guideline?: string;
  errorText?: string;
}

function Input({ className, errorText, label, unit, guideline, type, ...props }: InputProps) {
  return (
    <div className={cn('grid w-full max-w-sm items-center gap-3 py-2', className)}>
      <Label>{label || 'ㅤ'}</Label>
      <figure className="flex w-full flex-col gap-1 items-end">
        <section className="flex items-center w-full gap-2">
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
          {!!unit && <span className="shrink-0 text-lg font-medium">{unit}</span>}
        </section>
        <section className="flex justify-between w-full">
          <span className="text-xs text-red-600">{errorText || 'ㅤ'}</span>
          <span className="text-xs text-gray-500">{guideline || 'ㅤ'}</span>
        </section>
      </figure>
    </div>
  );
}

export { Input };
