# sl-holidays-lk

A lightweight TypeScript/JavaScript library to check and retrieve Sri Lankan Public, Bank, Mercantile, and Full Moon Poya holidays.

## Installation

```bash
npm install sl-holidays-lk


Quick Start


import {
  getHoliday,
  getHolidays,
  getNextHoliday,
  isHoliday,
  isPoyaDay,
  isWorkingDay,
} from 'sl-holidays-lk';

// Check if a date is a holiday
console.log(isHoliday('2026-02-04')); // true
console.log(isHoliday('2026-02-15', 'Mercantile')); // false
console.log(isHoliday('2026-02-15', 'Bank')); // true

// Check if a date is a Full Moon Poya day
console.log(isPoyaDay('2026-01-03')); // true

// Check if a date is a standard working day (excludes Sat, Sun, and holidays)
console.log(isWorkingDay('2026-01-05')); // true

// Get full holiday metadata for a specific date
const holiday = getHoliday('2026-04-14');
console.log(holiday);
// {
//   date: '2026-04-14',
//   name: 'Sinhala & Tamil New Year Day',
//   sinhalaName: 'සිංහල හා දෙමළ අලුත් අවුරුදු දිනය',
//   categories: ['Public', 'Bank', 'Mercantile'],
//   isPoya: false
// }

// Filter holidays by year, month, or category
const april2026Holidays = getHolidays({ year: 2026, month: 4 });
const poya2026 = getHolidays({ year: 2026, category: 'Poya' });

// Find the next upcoming holiday
const nextHoliday = getNextHoliday('2026-02-01');
console.log(nextHoliday?.name); // 'National Day'



API Reference
getHoliday(date: Date | string): Holiday | undefined

isHoliday(date: Date | string, category?: HolidayCategory): boolean

isPoyaDay(date: Date | string): boolean

isWorkingDay(date: Date | string): boolean

getHolidays(options?: HolidayFilterOptions): Holiday[]

getNextHoliday(fromDate?: Date | string, includeToday?: boolean): Holiday | undefined