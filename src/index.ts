import { SRI_LANKA_HOLIDAYS } from './data';
import { Holiday, HolidayCategory, HolidayFilterOptions } from './types';

// Export types and raw data so consumers can import them directly
export * from './types';
export { SRI_LANKA_HOLIDAYS };

/**
 * Helper to normalize a Date object or YYYY-MM-DD string into a YYYY-MM-DD string.
 * Uses local year/month/day components for Date objects to avoid UTC offset bugs.
 */
function normalizeDateString(input: Date | string): string {
  if (typeof input === 'string') {
    const trimmed = input.trim();
    if (!/^\d{4}-\d{2}-\d{2}$/.test(trimmed)) {
      throw new Error(
        `Invalid date format "${input}". Expected "YYYY-MM-DD" or a valid Date object.`
      );
    }
    return trimmed;
  }

  if (input instanceof Date) {
    if (isNaN(input.getTime())) {
      throw new Error('Invalid Date object provided.');
    }
    const year = input.getFullYear();
    const month = String(input.getMonth() + 1).padStart(2, '0');
    const day = String(input.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  throw new Error('Date input must be a Date object or a "YYYY-MM-DD" string.');
}

/**
 * Retrieves the holiday object for a specific date, or undefined if it is not a holiday.
 */
export function getHoliday(date: Date | string): Holiday | undefined {
  const dateStr = normalizeDateString(date);
  return SRI_LANKA_HOLIDAYS.find((h) => h.date === dateStr);
}

/**
 * Checks whether a given date is a Sri Lankan holiday.
 * Optionally filters by a specific category ('Public' | 'Bank' | 'Mercantile' | 'Poya').
 */
export function isHoliday(
  date: Date | string,
  category?: HolidayCategory
): boolean {
  const holiday = getHoliday(date);
  if (!holiday) return false;
  if (category) {
    return holiday.categories.includes(category);
  }
  return true;
}

/**
 * Checks whether a given date is a Full Moon Poya Day.
 */
export function isPoyaDay(date: Date | string): boolean {
  const holiday = getHoliday(date);
  return Boolean(holiday?.isPoya);
}

/**
 * Checks whether a given date is a standard working day in Sri Lanka
 * (i.e., not a Saturday, Sunday, or Public/Mercantile holiday).
 */
export function isWorkingDay(date: Date | string): boolean {
  const dateStr = normalizeDateString(date);
  const [year, month, day] = dateStr.split('-').map(Number);
  const localDate = new Date(year, month - 1, day);
  const dayOfWeek = localDate.getDay();

  // 0 = Sunday, 6 = Saturday
  if (dayOfWeek === 0 || dayOfWeek === 6) {
    return false;
  }

  return !isHoliday(dateStr);
}

/**
 * Returns a list of Sri Lankan holidays matching optional filter criteria.
 */
export function getHolidays(options?: HolidayFilterOptions): Holiday[] {
  return SRI_LANKA_HOLIDAYS.filter((holiday) => {
    const [yearStr, monthStr] = holiday.date.split('-');
    const year = Number(yearStr);
    const month = Number(monthStr);

    if (options?.year !== undefined && year !== options.year) {
      return false;
    }

    if (options?.month !== undefined && month !== options.month) {
      return false;
    }

    if (
      options?.category !== undefined &&
      !holiday.categories.includes(options.category)
    ) {
      return false;
    }

    return true;
  });
}

/**
 * Finds the next upcoming holiday strictly after (or on, if includeToday is true) the given date.
 * Defaults to today's date if no date is supplied.
 */
export function getNextHoliday(
  fromDate: Date | string = new Date(),
  includeToday = false
): Holiday | undefined {
  const targetStr = normalizeDateString(fromDate);
  return SRI_LANKA_HOLIDAYS.find((holiday) =>
    includeToday ? holiday.date >= targetStr : holiday.date > targetStr
  );
}