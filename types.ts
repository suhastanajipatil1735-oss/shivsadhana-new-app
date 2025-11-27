export interface Student {
  id: string;
  name: string;
  className: string;
  totalFees: number;
  feesPaid: number;
  dateJoined: string;
}

export enum AppScreen {
  SPLASH = 'SPLASH',
  LOGIN = 'LOGIN',
  DASHBOARD = 'DASHBOARD',
  ADD_STUDENT = 'ADD_STUDENT',
  FEES_REMINDER = 'FEES_REMINDER',
  VIEW_STUDENTS = 'VIEW_STUDENTS',
  REMOVE_STUDENTS = 'REMOVE_STUDENTS',
}

export const CLASS_OPTIONS = ['5th', '6th', '7th', '8th', '9th', '10th'];

export const STORAGE_KEY = 'shivsadhana_students';