/**
 * Seasonal feature flags.
 *
 * This repo shipped a Holiday Box promo + featured listing for the Christmas season.
 * By default, we hide it after Dec 25 (local time in the browser).
 *
 * You can override via env vars:
 * - NEXT_PUBLIC_ENABLE_HOLIDAY_BOX=true  -> always show
 * - NEXT_PUBLIC_ENABLE_HOLIDAY_BOX=false -> always hide
 */

export function isHolidayBoxEnabled(now: Date = new Date()): boolean {
	const override = process.env.NEXT_PUBLIC_ENABLE_HOLIDAY_BOX;
	if (override === 'true') return true;
	if (override === 'false') return false;

	// Default behavior: enabled from Nov 1 through Dec 25 inclusive.
	const year = now.getFullYear();
	const start = new Date(year, 10, 1, 0, 0, 0, 0); // Nov 1
	const end = new Date(year, 11, 25, 23, 59, 59, 999); // Dec 25
	return now >= start && now <= end;
}
