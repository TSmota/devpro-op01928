interface ISearchQuery {
  city: string;
}

interface IReply<T> {
  200: T;
  '4xx': {
    message: string;
  };
  '5xx': {
    message: string;
  };
}

export type {
  ISearchQuery,
  IReply,
}
