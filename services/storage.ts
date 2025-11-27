import { Student, STORAGE_KEY } from '../types';

export const getStudents = (): Student[] => {
  try {
    const data = localStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : [];
  } catch (error) {
    console.error("Error reading from local storage", error);
    return [];
  }
};

export const saveStudents = (students: Student[]): void => {
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(students));
  } catch (error) {
    console.error("Error saving to local storage", error);
  }
};

export const addStudent = (student: Student): Student[] => {
  const current = getStudents();
  const updated = [...current, student];
  saveStudents(updated);
  return updated;
};

export const updateStudent = (updatedStudent: Student): Student[] => {
  const current = getStudents();
  const updated = current.map(s => s.id === updatedStudent.id ? updatedStudent : s);
  saveStudents(updated);
  return updated;
};

export const removeStudent = (id: string): Student[] => {
  const current = getStudents();
  const updated = current.filter(s => s.id !== id);
  saveStudents(updated);
  return updated;
};