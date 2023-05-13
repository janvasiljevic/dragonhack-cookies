/**
 * Generated by orval v6.15.0 🍺
 * Do not edit manually.
 * DH - Piskotki
 * API for DH - Piskotki
 * OpenAPI spec version: 1.0
 */
import { useQuery, useMutation } from '@tanstack/react-query';
import type {
  UseQueryOptions,
  UseMutationOptions,
  QueryFunction,
  MutationFunction,
  UseQueryResult,
  QueryKey,
} from '@tanstack/react-query';
import type { Book, CreateBookISBNDto, UpdateBookDto } from '.././model';
import { customInstance } from '.././mutator/custom-instance';
import type { ErrorType } from '.././mutator/custom-instance';

type AwaitedInput<T> = PromiseLike<T> | T;

type Awaited<O> = O extends AwaitedInput<infer T> ? T : never;

// eslint-disable-next-line
type SecondParameter<T extends (...args: any) => any> = T extends (
  config: any,
  args: infer P,
) => any
  ? P
  : never;

/**
 * @summary Creates a new book for the logged-in user from ISBN
 */
export const bookControllerCreate = (
  createBookISBNDto: CreateBookISBNDto,
  options?: SecondParameter<typeof customInstance>,
) => {
  return customInstance<Book>(
    {
      url: `/api/book/isbn`,
      method: 'post',
      headers: { 'Content-Type': 'application/json' },
      data: createBookISBNDto,
    },
    options,
  );
};

export const getBookControllerCreateMutationOptions = <
  TError = ErrorType<void>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof bookControllerCreate>>,
    TError,
    { data: CreateBookISBNDto },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof bookControllerCreate>>,
  TError,
  { data: CreateBookISBNDto },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof bookControllerCreate>>,
    { data: CreateBookISBNDto }
  > = (props) => {
    const { data } = props ?? {};

    return bookControllerCreate(data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type BookControllerCreateMutationResult = NonNullable<
  Awaited<ReturnType<typeof bookControllerCreate>>
>;
export type BookControllerCreateMutationBody = CreateBookISBNDto;
export type BookControllerCreateMutationError = ErrorType<void>;

export const useBookControllerCreate = <
  TError = ErrorType<void>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof bookControllerCreate>>,
    TError,
    { data: CreateBookISBNDto },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}) => {
  const mutationOptions = getBookControllerCreateMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary Returns all books in the DB
 */
export const bookControllerFindAll = (
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  return customInstance<Book[]>(
    { url: `/api/book`, method: 'get', signal },
    options,
  );
};

export const getBookControllerFindAllQueryKey = () => [`/api/book`] as const;

export const getBookControllerFindAllQueryOptions = <
  TData = Awaited<ReturnType<typeof bookControllerFindAll>>,
  TError = ErrorType<unknown>,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof bookControllerFindAll>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseQueryOptions<
  Awaited<ReturnType<typeof bookControllerFindAll>>,
  TError,
  TData
> & { queryKey: QueryKey } => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getBookControllerFindAllQueryKey();

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof bookControllerFindAll>>
  > = ({ signal }) => bookControllerFindAll(requestOptions, signal);

  return { queryKey, queryFn, ...queryOptions };
};

export type BookControllerFindAllQueryResult = NonNullable<
  Awaited<ReturnType<typeof bookControllerFindAll>>
>;
export type BookControllerFindAllQueryError = ErrorType<unknown>;

export const useBookControllerFindAll = <
  TData = Awaited<ReturnType<typeof bookControllerFindAll>>,
  TError = ErrorType<unknown>,
>(options?: {
  query?: UseQueryOptions<
    Awaited<ReturnType<typeof bookControllerFindAll>>,
    TError,
    TData
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getBookControllerFindAllQueryOptions(options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

/**
 * @summary Returns the book with ID
 */
export const bookControllerFindOne = (
  id: string,
  options?: SecondParameter<typeof customInstance>,
  signal?: AbortSignal,
) => {
  return customInstance<Book>(
    { url: `/api/book/${id}`, method: 'get', signal },
    options,
  );
};

export const getBookControllerFindOneQueryKey = (id: string) =>
  [`/api/book/${id}`] as const;

export const getBookControllerFindOneQueryOptions = <
  TData = Awaited<ReturnType<typeof bookControllerFindOne>>,
  TError = ErrorType<void>,
>(
  id: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof bookControllerFindOne>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customInstance>;
  },
): UseQueryOptions<
  Awaited<ReturnType<typeof bookControllerFindOne>>,
  TError,
  TData
> & { queryKey: QueryKey } => {
  const { query: queryOptions, request: requestOptions } = options ?? {};

  const queryKey =
    queryOptions?.queryKey ?? getBookControllerFindOneQueryKey(id);

  const queryFn: QueryFunction<
    Awaited<ReturnType<typeof bookControllerFindOne>>
  > = ({ signal }) => bookControllerFindOne(id, requestOptions, signal);

  return { queryKey, queryFn, enabled: !!id, ...queryOptions };
};

export type BookControllerFindOneQueryResult = NonNullable<
  Awaited<ReturnType<typeof bookControllerFindOne>>
>;
export type BookControllerFindOneQueryError = ErrorType<void>;

export const useBookControllerFindOne = <
  TData = Awaited<ReturnType<typeof bookControllerFindOne>>,
  TError = ErrorType<void>,
>(
  id: string,
  options?: {
    query?: UseQueryOptions<
      Awaited<ReturnType<typeof bookControllerFindOne>>,
      TError,
      TData
    >;
    request?: SecondParameter<typeof customInstance>;
  },
): UseQueryResult<TData, TError> & { queryKey: QueryKey } => {
  const queryOptions = getBookControllerFindOneQueryOptions(id, options);

  const query = useQuery(queryOptions) as UseQueryResult<TData, TError> & {
    queryKey: QueryKey;
  };

  query.queryKey = queryOptions.queryKey;

  return query;
};

export const bookControllerUpdate = (
  id: string,
  updateBookDto: UpdateBookDto,
  options?: SecondParameter<typeof customInstance>,
) => {
  return customInstance<string>(
    {
      url: `/api/book/${id}`,
      method: 'patch',
      headers: { 'Content-Type': 'application/json' },
      data: updateBookDto,
    },
    options,
  );
};

export const getBookControllerUpdateMutationOptions = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof bookControllerUpdate>>,
    TError,
    { id: string; data: UpdateBookDto },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof bookControllerUpdate>>,
  TError,
  { id: string; data: UpdateBookDto },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof bookControllerUpdate>>,
    { id: string; data: UpdateBookDto }
  > = (props) => {
    const { id, data } = props ?? {};

    return bookControllerUpdate(id, data, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type BookControllerUpdateMutationResult = NonNullable<
  Awaited<ReturnType<typeof bookControllerUpdate>>
>;
export type BookControllerUpdateMutationBody = UpdateBookDto;
export type BookControllerUpdateMutationError = ErrorType<unknown>;

export const useBookControllerUpdate = <
  TError = ErrorType<unknown>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof bookControllerUpdate>>,
    TError,
    { id: string; data: UpdateBookDto },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}) => {
  const mutationOptions = getBookControllerUpdateMutationOptions(options);

  return useMutation(mutationOptions);
};
/**
 * @summary Deletes the book with ID
 */
export const bookControllerRemove = (
  id: string,
  options?: SecondParameter<typeof customInstance>,
) => {
  return customInstance<string>(
    { url: `/api/book/${id}`, method: 'delete' },
    options,
  );
};

export const getBookControllerRemoveMutationOptions = <
  TError = ErrorType<void>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof bookControllerRemove>>,
    TError,
    { id: string },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}): UseMutationOptions<
  Awaited<ReturnType<typeof bookControllerRemove>>,
  TError,
  { id: string },
  TContext
> => {
  const { mutation: mutationOptions, request: requestOptions } = options ?? {};

  const mutationFn: MutationFunction<
    Awaited<ReturnType<typeof bookControllerRemove>>,
    { id: string }
  > = (props) => {
    const { id } = props ?? {};

    return bookControllerRemove(id, requestOptions);
  };

  return { mutationFn, ...mutationOptions };
};

export type BookControllerRemoveMutationResult = NonNullable<
  Awaited<ReturnType<typeof bookControllerRemove>>
>;

export type BookControllerRemoveMutationError = ErrorType<void>;

export const useBookControllerRemove = <
  TError = ErrorType<void>,
  TContext = unknown,
>(options?: {
  mutation?: UseMutationOptions<
    Awaited<ReturnType<typeof bookControllerRemove>>,
    TError,
    { id: string },
    TContext
  >;
  request?: SecondParameter<typeof customInstance>;
}) => {
  const mutationOptions = getBookControllerRemoveMutationOptions(options);

  return useMutation(mutationOptions);
};