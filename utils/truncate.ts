// utils/truncate.ts

/**
 * Truncate text by characters
 *
 * @param text - The input string
 * @param limit - Number of characters allowed
 * @returns Truncated string
 */
export function truncateByChars(text: string, limit: number): string {
  if (!text) return ''
  if (text.length <= limit) return text
  return text.slice(0, limit) + '...'
}

/**
 * Truncate text by words
 *
 * @param text - The input string
 * @param limit - Number of words allowed
 * @returns Truncated string
 */
export function truncateByWords(text: string, limit: number): string {
  if (!text) return ''
  const words = text.split(/\s+/)
  if (words.length <= limit) return text
  return words.slice(0, limit).join(' ') + '...'
}
