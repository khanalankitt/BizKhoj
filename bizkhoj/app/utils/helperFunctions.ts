import { businessesData } from "./data";
import { Business, BusinessDetails, LocationHours } from "./types";

// Parse time strings like "10:00 AM" or "22:30" into a Date object for today
export const parseTimeToToday = (timeStr: string): Date | null => {
  const m = timeStr.match(/(\d{1,2}):(\d{2})\s*(AM|PM)?/i);
  const now = new Date();
  if (!m) return null;
  let hour = parseInt(m[1], 10);
  const minute = parseInt(m[2], 10);
  const ampm = m[3];
  if (ampm) {
    const upper = ampm.toUpperCase();
    if (upper === "PM" && hour !== 12) hour += 12;
    if (upper === "AM" && hour === 12) hour = 0;
  }
  const d = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    hour,
    minute,
    0
  );
  return d;
};

// Determine whether the current local time falls between openTime and closeTime.
// Supports 12h (AM/PM) and 24h formats and overnight ranges (close <= open => closes next day).
export const isBusinessOpenNow = (
  openTime: string,
  closeTime: string
): boolean => {
  const open = parseTimeToToday(openTime);
  const close = parseTimeToToday(closeTime);
  if (!open || !close) return false;
  const now = new Date();

  // If close is earlier or equal to open, assume close is on next day (overnight shift)
  if (close.getTime() <= open.getTime()) {
    close.setDate(close.getDate() + 1);
  }

  // Also check case where "open" refers to yesterday (when now is after midnight)
  const openYesterday = new Date(open.getTime());
  openYesterday.setDate(openYesterday.getDate() - 1);

  if (now >= open && now <= close) return true;
  if (now >= openYesterday && now <= close) return true;
  return false;
};
