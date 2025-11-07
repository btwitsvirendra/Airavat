import { TextareaHTMLAttributes, forwardRef } from 'react';
import clsx from 'clsx';

export interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  error?: string;
  helperText?: string;
  fullWidth?: boolean;
}

export const Textarea = forwardRef<HTMLTextAreaElement, TextareaProps>(
  ({ className, label, error, helperText, fullWidth = false, disabled, ...props }, ref) => {
    return (
      <div className={clsx('flex flex-col gap-1', { 'w-full': fullWidth })}>
        {label && (
          <label className="text-sm font-medium text-gray-700">
            {label}
            {props.required && <span className="ml-1 text-red-500">*</span>}
          </label>
        )}

        <textarea
          ref={ref}
          className={clsx(
            'block w-full rounded-lg border px-4 py-2.5 text-gray-900 transition-colors placeholder:text-gray-400 focus:outline-none focus:ring-2',
            {
              'border-red-300 focus:border-red-500 focus:ring-red-500': error,
              'border-gray-300 focus:border-regal-blue-500 focus:ring-regal-blue-500': !error,
              'cursor-not-allowed bg-gray-100 opacity-60': disabled,
            },
            className
          )}
          disabled={disabled}
          {...props}
        />

        {error && <p className="text-sm text-red-600">{error}</p>}
        {helperText && !error && <p className="text-sm text-gray-500">{helperText}</p>}
      </div>
    );
  }
);

Textarea.displayName = 'Textarea';
