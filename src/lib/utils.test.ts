import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('utils', () => {
  describe('cn', () => {
    it('merges tailwind classes correctly', () => {
      const result = cn('text-red-500', 'bg-blue-500');
      expect(result).toBe('text-red-500 bg-blue-500');
    });

    it('handles conditional classes', () => {
      const result = cn('text-red-500', false && 'bg-blue-500', 'p-4');
      expect(result).toBe('text-red-500 p-4');
    });

    it('resolves tailwind conflicts using tailwind-merge', () => {
      const result = cn('px-2 py-1', 'p-4');
      expect(result).toBe('p-4');
    });
  });
});
