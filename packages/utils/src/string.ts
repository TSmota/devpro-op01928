/**
 * Checks if the provided value is a non-empty string.
 * 
 * @param value The value to check
 * @returns true if the value is a non-empty string, false otherwise
 */
export function isContentfulString(value: unknown): value is string {
  return typeof value === 'string' && value.trim() !== '';
}
