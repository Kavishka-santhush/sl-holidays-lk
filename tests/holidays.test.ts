import { describe, expect, it } from 'vitest';
import {
  getHoliday,
  getHolidays,
  getNextHoliday,
  isHoliday,
  isPoyaDay,
  isWorkingDay,
} from '../src/index';

describe('Sri Lanka Holidays Package', () => {
  describe('getHoliday', () => {
    it('returns holiday details for National Day (2026-02-04)', () => {
      const holiday = getHoliday('2026-02-04');
      expect(holiday).toBeDefined();
      expect(holiday?.name).toBe('National Day');
      expect(holiday?.isPoya).toBe(false);
    });

    it('supports passing a JavaScript Date object', () => {
      const date = new Date(2026, 3, 14); // April 14, 2026 (Month is 0-indexed)
      const holiday = getHoliday(date);
      expect(holiday).toBeDefined();
      expect(holiday?.name).toBe('Sinhala & Tamil New Year Day');
    });

    it('returns undefined for a regular non-holiday date', () => {
      expect(getHoliday('2026-01-10')).toBeUndefined();
    });

    it('throws an error for invalid date strings', () => {
      expect(() => getHoliday('2026/02/04')).toThrow();
      expect(() => getHoliday('invalid-date')).toThrow();
    });
  });

  describe('isHoliday', () => {
    it('returns true for holidays and false for normal days', () => {
      expect(isHoliday('2026-02-04')).toBe(true);
      expect(isHoliday('2026-01-10')).toBe(false);
    });

    it('filters accurately by category', () => {
      // Mahasivarathri is Public and Bank, not Mercantile
      expect(isHoliday('2026-02-15', 'Public')).toBe(true);
      expect(isHoliday('2026-02-15', 'Bank')).toBe(true);
      expect(isHoliday('2026-02-15', 'Mercantile')).toBe(false);
    });
  });

  describe('isPoyaDay', () => {
    it('identifies Full Moon Poya days accurately', () => {
      expect(isPoyaDay('2026-01-03')).toBe(true); // Duruthu Poya
      expect(isPoyaDay('2026-02-04')).toBe(false); // National Day
      expect(isPoyaDay('2026-01-10')).toBe(false);
    });
  });

  describe('isWorkingDay', () => {
    it('returns false on weekends (Saturday and Sunday)', () => {
      // 2026-01-03 is a Saturday (and Duruthu Poya)
      expect(isWorkingDay('2026-01-03')).toBe(false);
      // 2026-01-04 is a Sunday
      expect(isWorkingDay('2026-01-04')).toBe(false);
    });

    it('returns false on a weekday holiday', () => {
      // 2026-02-04 is a Wednesday (National Day)
      expect(isWorkingDay('2026-02-04')).toBe(false);
    });

    it('returns true on a normal weekday without holidays', () => {
      // 2026-01-05 is a Monday
      expect(isWorkingDay('2026-01-05')).toBe(true);
    });
  });

  describe('getHolidays', () => {
    it('filters holidays by year and month', () => {
      const april2026 = getHolidays({ year: 2026, month: 4 });
      expect(april2026.length).toBeGreaterThanOrEqual(3);
      expect(april2026.some((h) => h.date === '2026-04-14')).toBe(true);
    });

    it('filters holidays by Poya category', () => {
      const poyaDays2026 = getHolidays({ year: 2026, category: 'Poya' });
      expect(poyaDays2026.every((h) => h.isPoya)).toBe(true);
    });
  });

  describe('getNextHoliday', () => {
    it('finds the next holiday strictly after a given date', () => {
      const next = getNextHoliday('2026-02-01');
      expect(next?.date).toBe('2026-02-04');
      expect(next?.name).toBe('National Day');
    });
  });
});