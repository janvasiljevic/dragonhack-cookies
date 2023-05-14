/**
 * Generated by orval v6.10.3 🍺
 * Do not edit manually.
 * DH - Piskotki
 * API for DH - Piskotki
 * OpenAPI spec version: 1.0
 */
import {
  useQuery,
  useMutation
} from '@tanstack/react-query'
import type {
  UseQueryOptions,
  UseMutationOptions,
  QueryFunction,
  MutationFunction,
  UseQueryResult,
  QueryKey
} from '@tanstack/react-query'
import type {
  Book,
  CreateBookISBNDto,
  BookControllerLike200
} from '.././model'
import { customInstance } from '.././mutator/custom-instance'
import type { ErrorType } from '.././mutator/custom-instance'

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
 options?: SecondParameter<typeof customInstance>,) => {
      return customInstance<Book>(
      {url: `/api/book/isbn`, method: 'post',
      headers: {'Content-Type': 'application/json', },
      data: createBookISBNDto
    },
      options);
    }
  


    export type BookControllerCreateMutationResult = NonNullable<Awaited<ReturnType<typeof bookControllerCreate>>>
    export type BookControllerCreateMutationBody = CreateBookISBNDto
    export type BookControllerCreateMutationError = ErrorType<void>

    export const useBookControllerCreate = <TError = ErrorType<void>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof bookControllerCreate>>, TError,{data: CreateBookISBNDto}, TContext>, request?: SecondParameter<typeof customInstance>}
) => {
      const {mutation: mutationOptions, request: requestOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof bookControllerCreate>>, {data: CreateBookISBNDto}> = (props) => {
          const {data} = props ?? {};

          return  bookControllerCreate(data,requestOptions)
        }

      return useMutation<Awaited<ReturnType<typeof bookControllerCreate>>, TError, {data: CreateBookISBNDto}, TContext>(mutationFn, mutationOptions)
    }
    /**
 * @summary Returns all books in the DB
 */
export const bookControllerFindAll = (
    
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      return customInstance<Book[]>(
      {url: `/api/book`, method: 'get', signal
    },
      options);
    }
  

export const getBookControllerFindAllQueryKey = () => [`/api/book`];

    
export type BookControllerFindAllQueryResult = NonNullable<Awaited<ReturnType<typeof bookControllerFindAll>>>
export type BookControllerFindAllQueryError = ErrorType<unknown>

export const useBookControllerFindAll = <TData = Awaited<ReturnType<typeof bookControllerFindAll>>, TError = ErrorType<unknown>>(
  options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof bookControllerFindAll>>, TError, TData>, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getBookControllerFindAllQueryKey();

  

  const queryFn: QueryFunction<Awaited<ReturnType<typeof bookControllerFindAll>>> = ({ signal }) => bookControllerFindAll(requestOptions, signal);

  const query = useQuery<Awaited<ReturnType<typeof bookControllerFindAll>>, TError, TData>(queryKey, queryFn, queryOptions) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

/**
 * @summary Returns the book with ID
 */
export const bookControllerFindOne = (
    id: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      return customInstance<Book>(
      {url: `/api/book/${id}`, method: 'get', signal
    },
      options);
    }
  

export const getBookControllerFindOneQueryKey = (id: string,) => [`/api/book/${id}`];

    
export type BookControllerFindOneQueryResult = NonNullable<Awaited<ReturnType<typeof bookControllerFindOne>>>
export type BookControllerFindOneQueryError = ErrorType<void>

export const useBookControllerFindOne = <TData = Awaited<ReturnType<typeof bookControllerFindOne>>, TError = ErrorType<void>>(
 id: string, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof bookControllerFindOne>>, TError, TData>, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getBookControllerFindOneQueryKey(id);

  

  const queryFn: QueryFunction<Awaited<ReturnType<typeof bookControllerFindOne>>> = ({ signal }) => bookControllerFindOne(id, requestOptions, signal);

  const query = useQuery<Awaited<ReturnType<typeof bookControllerFindOne>>, TError, TData>(queryKey, queryFn, {enabled: !!(id), ...queryOptions}) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

/**
 * @summary Deletes the book with ID
 */
export const bookControllerRemove = (
    id: string,
 options?: SecondParameter<typeof customInstance>,) => {
      return customInstance<string>(
      {url: `/api/book/${id}`, method: 'delete'
    },
      options);
    }
  


    export type BookControllerRemoveMutationResult = NonNullable<Awaited<ReturnType<typeof bookControllerRemove>>>
    
    export type BookControllerRemoveMutationError = ErrorType<void>

    export const useBookControllerRemove = <TError = ErrorType<void>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof bookControllerRemove>>, TError,{id: string}, TContext>, request?: SecondParameter<typeof customInstance>}
) => {
      const {mutation: mutationOptions, request: requestOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof bookControllerRemove>>, {id: string}> = (props) => {
          const {id} = props ?? {};

          return  bookControllerRemove(id,requestOptions)
        }

      return useMutation<Awaited<ReturnType<typeof bookControllerRemove>>, TError, {id: string}, TContext>(mutationFn, mutationOptions)
    }
    /**
 * @summary Like or unlike the book with ID
 */
export const bookControllerLike = (
    bookId: string,
    liked: boolean,
 options?: SecondParameter<typeof customInstance>,) => {
      return customInstance<BookControllerLike200>(
      {url: `/api/book/like/${bookId}/${liked}`, method: 'patch'
    },
      options);
    }
  


    export type BookControllerLikeMutationResult = NonNullable<Awaited<ReturnType<typeof bookControllerLike>>>
    
    export type BookControllerLikeMutationError = ErrorType<unknown>

    export const useBookControllerLike = <TError = ErrorType<unknown>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof bookControllerLike>>, TError,{bookId: string;liked: boolean}, TContext>, request?: SecondParameter<typeof customInstance>}
) => {
      const {mutation: mutationOptions, request: requestOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof bookControllerLike>>, {bookId: string;liked: boolean}> = (props) => {
          const {bookId,liked} = props ?? {};

          return  bookControllerLike(bookId,liked,requestOptions)
        }

      return useMutation<Awaited<ReturnType<typeof bookControllerLike>>, TError, {bookId: string;liked: boolean}, TContext>(mutationFn, mutationOptions)
    }
    /**
 * @summary Searches for books matching the query
 */
export const bookControllerSearch = (
    search: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      return customInstance<Book[]>(
      {url: `/api/book/search/${search}`, method: 'get', signal
    },
      options);
    }
  

export const getBookControllerSearchQueryKey = (search: string,) => [`/api/book/search/${search}`];

    
export type BookControllerSearchQueryResult = NonNullable<Awaited<ReturnType<typeof bookControllerSearch>>>
export type BookControllerSearchQueryError = ErrorType<unknown>

export const useBookControllerSearch = <TData = Awaited<ReturnType<typeof bookControllerSearch>>, TError = ErrorType<unknown>>(
 search: string, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof bookControllerSearch>>, TError, TData>, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getBookControllerSearchQueryKey(search);

  

  const queryFn: QueryFunction<Awaited<ReturnType<typeof bookControllerSearch>>> = ({ signal }) => bookControllerSearch(search, requestOptions, signal);

  const query = useQuery<Awaited<ReturnType<typeof bookControllerSearch>>, TError, TData>(queryKey, queryFn, {enabled: !!(search), ...queryOptions}) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

