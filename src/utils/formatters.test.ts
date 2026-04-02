import { describe, it, expect } from 'vitest';
import { 
  formatModifier, 
  formatPrice, 
  formatWeight, 
  formatCastingTimeShort,
  truncate,
  formatSigned,
  formatSpellLevel,
  capitalize,
  slugToLabel,
  formatPercent,
  formatProgressBar
} from './formatters';

describe('formatModifier', () => {
  it('should return +0 for 10', () => {
    expect(formatModifier(10)).toBe('+0');
  });

  it('should return +1 for 12', () => {
    expect(formatModifier(12)).toBe('+1');
  });

  it('should return -1 for 8', () => {
    expect(formatModifier(8)).toBe('-1');
  });

  it('should return +5 for 20', () => {
    expect(formatModifier(20)).toBe('+5');
  });
});

describe('formatSigned', () => {
  it('should add + for positive numbers', () => {
    expect(formatSigned(5)).toBe('+5');
  });

  it('should keep - for negative numbers', () => {
    expect(formatSigned(-3)).toBe('-3');
  });

  it('should return +0 for zero', () => {
    expect(formatSigned(0)).toBe('+0');
  });
});

describe('formatPrice', () => {
  it('should format price with k for 1000+', () => {
    expect(formatPrice(1500)).toBe('1.5k po');
  });

  it('should format price without k for < 1000', () => {
    expect(formatPrice(500)).toBe('500 po');
  });

  it('should handle zero', () => {
    expect(formatPrice(0)).toBe('0 po');
  });

  it('should format large prices correctly', () => {
    expect(formatPrice(10000)).toBe('10k po');
  });
});

describe('formatWeight', () => {
  it('should format kg correctly', () => {
    expect(formatWeight(5.5)).toBe('5.5 kg');
  });

  it('should handle zero', () => {
    expect(formatWeight(0)).toBe('0 kg');
  });

  it('should return - for null/undefined', () => {
    expect(formatWeight(null)).toBe('-');
    expect(formatWeight(undefined)).toBe('-');
  });

  it('should show < 0.1 kg for very small weights', () => {
    expect(formatWeight(0.05)).toBe('< 0.1 kg');
  });
});

describe('formatSpellLevel', () => {
  it('should return Tour de magie for level 0', () => {
    expect(formatSpellLevel(0)).toBe('Tour de magie');
  });

  it('should return Niveau X for level > 0', () => {
    expect(formatSpellLevel(1)).toBe('Niveau 1');
    expect(formatSpellLevel(5)).toBe('Niveau 5');
  });
});

describe('formatCastingTimeShort', () => {
  it('should shorten 1 action', () => {
    expect(formatCastingTimeShort('1 action')).toBe('Action');
  });

  it('should shorten 1 action bonus', () => {
    expect(formatCastingTimeShort('1 action bonus')).toBe('Action B.');
  });

  it('should shorten réaction', () => {
    expect(formatCastingTimeShort('1 réaction')).toBe('Réaction');
  });

  it('should return original if unknown', () => {
    expect(formatCastingTimeShort('10 minutes')).toBe('10 minutes');
  });

  it('should handle empty string', () => {
    expect(formatCastingTimeShort('')).toBe('');
  });
});

describe('truncate', () => {
  it('should truncate long text', () => {
    expect(truncate('This is a very long text', 10)).toBe('This is a...');
  });

  it('should not truncate short text', () => {
    expect(truncate('Short', 20)).toBe('Short');
  });

  it('should handle exact length', () => {
    expect(truncate('Exactly10!', 10)).toBe('Exactly10!');
  });

  it('should handle empty string', () => {
    expect(truncate('', 10)).toBe('');
  });
});

describe('capitalize', () => {
  it('should capitalize first letter', () => {
    expect(capitalize('hello')).toBe('Hello');
  });

  it('should handle empty string', () => {
    expect(capitalize('')).toBe('');
  });

  it('should handle already capitalized', () => {
    expect(capitalize('Hello')).toBe('Hello');
  });
});

describe('slugToLabel', () => {
  it('should convert slug to label', () => {
    expect(slugToLabel('hello-world')).toBe('Hello World');
  });

  it('should handle single word', () => {
    expect(slugToLabel('hello')).toBe('Hello');
  });
});

describe('formatPercent', () => {
  it('should format percentage', () => {
    expect(formatPercent(50, 100)).toBe('50%');
  });

  it('should return 0% for total 0', () => {
    expect(formatPercent(10, 0)).toBe('0%');
  });

  it('should round to nearest integer', () => {
    expect(formatPercent(1, 3)).toBe('33%');
  });
});

describe('formatProgressBar', () => {
  it('should format full bar', () => {
    expect(formatProgressBar(10, 10, 5)).toBe('█████');
  });

  it('should format empty bar', () => {
    expect(formatProgressBar(0, 10, 5)).toBe('░░░░░');
  });

  it('should format partial bar', () => {
    expect(formatProgressBar(5, 10, 10)).toBe('█████░░░░░');
  });

  it('should handle max 0', () => {
    expect(formatProgressBar(5, 0, 5)).toBe('░░░░░');
  });
});
