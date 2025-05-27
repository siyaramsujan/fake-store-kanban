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
