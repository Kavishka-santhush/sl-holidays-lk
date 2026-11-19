export type HolidayCategory = 'Public' | 'Bank' | 'Mercantile' | 'Poya';

export interface Holiday {
  /** Date in YYYY-MM-DD format (e.g., "2026-02-04") */
  date: string;
  /** Official name of the holiday in English */
  name: string;
  /** Optional name in Sinhala */
  sinhalaName?: string;
  /** Applicable sectors for this holiday */
  categories: HolidayCategory[];
  /** Whether this is a Full Moon Poya Day */
  isPoya: boolean;
}

export interface HolidayFilterOptions {
  /** Filter by specific year (e.g., 2026) */
  year?: number;
  /** Filter by month (1 for January to 12 for December) */
  month?: number;
  /** Filter by holiday category ('Public' | 'Bank' | 'Mercantile' | 'Poya') */
  category?: HolidayCategory;
}