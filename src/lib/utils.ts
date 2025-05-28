import { AxiosError } from "axios"
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function parseAxiosError(error: unknown): string {
  const err = error as AxiosError<{ message?: string }>
  return typeof err.response?.data === "string"
    ? err.response.data
    : err.response?.data?.message || err.message || "Unknown Error"
}


export function formatDate(iso: number) {
  const date = new Date(iso);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // Months are 0-based
  const year = String(date.getFullYear()).slice(-2); // Get last 2 digits
  return `${day}.${month}.${year}`;
}

