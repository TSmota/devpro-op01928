/**
 * Represents the generic structure of the API response.
 */
export interface RequestReply<T> {
  /** Successful response */
  200: T;
  /** Client error response */
  '4xx': {
    message: string;
  };
  /** Server error response */
  '5xx': {
    message: string;
  };
}
