import React from 'react';
import { FormField } from '../types/form';

interface FormInputProps {
  label: string;
  type: string;
  field: FormField;
  onChange: (value: string) => void;
  onBlur: () => void;
  min?: string;
  step?: string;
  rows?: number;
}

export function FormInput({
  label,
  type,
  field,
  onChange,
  onBlur,
  min,
  step,
  rows
}: FormInputProps) {
  const showError = field.touched && field.error;
  const InputComponent = type === 'textarea' ? 'textarea' : 'input';

  return (
    <div className="space-y-1">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
      </label>
      <InputComponent
        type={type}
        value={field.value}
        onChange={(e) => onChange(e.target.value)}
        onBlur={onBlur}
        min={min}
        step={step}
        rows={rows}
        className={`
          mt-1 block w-full rounded-md shadow-sm
          ${showError 
            ? 'border-red-300 focus:border-red-500 focus:ring-red-500' 
            : 'border-gray-300 dark:border-gray-600 focus:border-blue-500 focus:ring-blue-500'
          }
          dark:bg-gray-700 dark:text-white
        `}
      />
      {showError && (
        <p className={`text-sm ${
          field.error?.type === 'error' ? 'text-red-600' : 'text-yellow-600'
        }`}>
          {field.error.message}
        </p>
      )}
    </div>
  );
}