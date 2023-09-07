import { Reducer, useCallback, useEffect, useReducer, useRef } from 'react';
import { projectFetch } from 'src/client/projectFetch';
import { useSelector } from 'react-redux';
import { RootState } from 'src/store';
import { tokenSelectors } from 'src/store/token';

export type QueryData<T = unknown> = {
  loading: boolean;
  error: Error;
  data: T;
};

export type QueryActionLoading = {
  type: 'loading';
};

export type QueryActionError<E extends Error = Error> = {
  type: 'error';
  payload: E;
};

export type QueryActionData<T = unknown> = {
  type: 'data';
  payload: T;
};

export type QueryAction<T = unknown, E extends Error = Error> =
  | QueryActionLoading
  | QueryActionError<E>
  | QueryActionData<T>;

export const reducer = <T>(state: QueryData<T>, action: QueryAction<T>): QueryData<T> => {
  const { type } = action;
  switch (type) {
    case 'loading':
      return {
        ...state,
        error: null,
        loading: true,
      };

    case 'error':
      return {
        ...state,
        data: null,
        loading: false,
        error: (action as QueryActionError).payload,
      };

    case 'data':
      return {
        ...state,
        data: (action as QueryActionData<T>).payload,
        loading: false,
        error: null,
      };

    default: {
      const unhandled: never = type; // eslint-disable-line @typescript-eslint/no-unused-vars

      // Важно каким-то образом залогировать ошибку, чтобы быстро ее обнаружить
      console.error(new Error(`invalid type: ${type}`)); // eslint-disable-line no-console
      return state;
    }
  }
};

export const useQuery = <TData = unknown>(input: string, init?: RequestInit) => {
  const [state, dispatch] = useReducer<Reducer<QueryData<TData>, QueryAction<TData>>>(reducer, {
    loading: false,
    error: null,
    data: null,
  });

  useEffect(() => {
    dispatch({ type: 'loading' });
    projectFetch<TData>(input, init)
      .then((res) => dispatch({ type: 'data', payload: res }))
      .catch((e) => dispatch({ type: 'error', payload: e }));
  }, [init, input]);

  return state;
};

export type Mutate<TData = unknown, TVars = unknown> = (params?: {
  variables: TVars;
}) => Promise<{ data: TData | null; error: Error | null }>;

export const useMutation = <TData = unknown, TVars = unknown>(
  input: string
): [Mutate<TData, TVars>, QueryData<TData>] => {
  const token = useSelector<RootState, RootState['token']>(tokenSelectors.get);
  const [state, dispatch] = useReducer<Reducer<QueryData<TData>, QueryAction<TData>>>(reducer, {
    loading: false,
    error: null,
    data: null,
  });

  const tokenCopy = useRef(token);
  tokenCopy.current = token;

  const query = useCallback<Mutate<TData, TVars>>(
    ({ variables } = {} as { variables: TVars }) => {
      dispatch({ type: 'loading' });
      return projectFetch<TData>(
        input,
        variables
          ? {
              body: JSON.stringify(variables),
              method: 'post',
              headers: { 'Content-Type': 'application/json', authorization: tokenCopy.current },
            }
          : undefined
      )
        .then((res) => {
          dispatch({ type: 'data', payload: res });
          return Promise.resolve({ data: res, error: null });
        })
        .catch((e) => {
          dispatch({ type: 'error', payload: e });
          return Promise.reject(e);
        });
    },
    [input]
  );

  return [query, state];
};
