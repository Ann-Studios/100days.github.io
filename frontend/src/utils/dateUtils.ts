import { format, differenceInDays, isToday, parseISO } from 'date-fns';

// Helper function to ensure we always have a Date object
const ensureDate = (date: Date | string): Date => {
  return typeof date === 'string' ? parseISO(date) : date;
};

export const formatDate = (date: Date | string) => format(ensureDate(date), 'MMM dd, yyyy');
export const formatDateTime = (date: Date | string) => format(ensureDate(date), 'MMM dd, yyyy • h:mm a');

export const getDaysSinceStart = (startDate: Date | string) => {
  return differenceInDays(new Date(), ensureDate(startDate)) + 1;
};

export const isDateToday = (date: Date | string) => isToday(ensureDate(date));

export const getProgressPercentage = (currentDay: number, totalDays: number = 100) => {
  return Math.min((currentDay / totalDays) * 100, 100);
};

export const generateId = () => {
  return Date.now().toString(36) + Math.random().toString(36).substr(2);
};