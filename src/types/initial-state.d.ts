export type InitialState<T> = {
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: null | string | undefined;
  data: T;
};
