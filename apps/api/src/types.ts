/**
 * Represents the generic structure of the API response.
 */
export interface RequestReply<T> {
  /** Successful response */
  200: T;
  /** Client error response */
  '4xx': string;
  /** Server error response */
  '5xx': string;
}
