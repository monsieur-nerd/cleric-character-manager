import { afterEach, vi } from 'vitest';
import { cleanup } from '@testing-library/react';

// Cleanup after each test
afterEach(() => {
  cleanup();
  vi.clearAllMocks();
});

// Extend matchers if needed
declare module 'vitest' {
  interface Assertion<T = any> {
    toBeInTheDocument(): void;
  }
}
