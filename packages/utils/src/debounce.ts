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
type Debounced<Args extends unknown[]> = ((...args: Args) => void) & {
  cancel: () => void
}

export function debounce<Args extends unknown[]>(func: (...args: Args) => void, wait: number): Debounced<Args> {
  let timeout: ReturnType<typeof setTimeout> | null = null

  function debounced(...args: Args) {
    if (timeout !== null) {
      clearTimeout(timeout)
    }

    timeout = setTimeout(() => {
      func(...args)
      timeout = null
    }, wait)
  }

  debounced.cancel = () => {
    if (timeout !== null) {
      clearTimeout(timeout)
      timeout = null
    }
  }

  return debounced as Debounced<Args>
}
