/**
 * Creates a debounced version of the provided function. 
 * 
 * The debounced function delays the execution of the original function until 
 * after a specified wait time has elapsed since the last time it was invoked.
 * 
 * @param func Function to be called when the debounce period ends
 * @param wait Milliseconds to wait before calling the function
 * 
 * @returns A debounced version of the function
 */
export function debounce(func: Function, wait: number) {
  let timeout: number | null = null

  return function (...args: any[]) {
    if (timeout) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}
