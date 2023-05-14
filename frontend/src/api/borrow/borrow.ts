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
  BookReservation,
  Book
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
 * @summary Tries to reserve the book
 */
export const borrowControllerReserve = (
    bookId: string,
 options?: SecondParameter<typeof customInstance>,) => {
      return customInstance<BookReservation>(
      {url: `/api/borrow/reserve/${bookId}`, method: 'post'
    },
      options);
    }
  


    export type BorrowControllerReserveMutationResult = NonNullable<Awaited<ReturnType<typeof borrowControllerReserve>>>
    
    export type BorrowControllerReserveMutationError = ErrorType<void>

    export const useBorrowControllerReserve = <TError = ErrorType<void>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof borrowControllerReserve>>, TError,{bookId: string}, TContext>, request?: SecondParameter<typeof customInstance>}
) => {
      const {mutation: mutationOptions, request: requestOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof borrowControllerReserve>>, {bookId: string}> = (props) => {
          const {bookId} = props ?? {};

          return  borrowControllerReserve(bookId,requestOptions)
        }

      return useMutation<Awaited<ReturnType<typeof borrowControllerReserve>>, TError, {bookId: string}, TContext>(mutationFn, mutationOptions)
    }
    /**
 * @summary Returns all reservations including the book and book availability
 */
export const borrowControllerGetBookReservations = (
    bookId: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      return customInstance<BookReservation[]>(
      {url: `/api/borrow/reservations/book/${bookId}`, method: 'get', signal
    },
      options);
    }
  

export const getBorrowControllerGetBookReservationsQueryKey = (bookId: string,) => [`/api/borrow/reservations/book/${bookId}`];

    
export type BorrowControllerGetBookReservationsQueryResult = NonNullable<Awaited<ReturnType<typeof borrowControllerGetBookReservations>>>
export type BorrowControllerGetBookReservationsQueryError = ErrorType<void>

export const useBorrowControllerGetBookReservations = <TData = Awaited<ReturnType<typeof borrowControllerGetBookReservations>>, TError = ErrorType<void>>(
 bookId: string, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof borrowControllerGetBookReservations>>, TError, TData>, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getBorrowControllerGetBookReservationsQueryKey(bookId);

  

  const queryFn: QueryFunction<Awaited<ReturnType<typeof borrowControllerGetBookReservations>>> = ({ signal }) => borrowControllerGetBookReservations(bookId, requestOptions, signal);

  const query = useQuery<Awaited<ReturnType<typeof borrowControllerGetBookReservations>>, TError, TData>(queryKey, queryFn, {enabled: !!(bookId), ...queryOptions}) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

/**
 * @summary Returns all reservations for books owned by userId and book availability
 */
export const borrowControllerGetOwnerReservations = (
    userId: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      return customInstance<BookReservation[]>(
      {url: `/api/borrow/reservations/owner/${userId}`, method: 'get', signal
    },
      options);
    }
  

export const getBorrowControllerGetOwnerReservationsQueryKey = (userId: string,) => [`/api/borrow/reservations/owner/${userId}`];

    
export type BorrowControllerGetOwnerReservationsQueryResult = NonNullable<Awaited<ReturnType<typeof borrowControllerGetOwnerReservations>>>
export type BorrowControllerGetOwnerReservationsQueryError = ErrorType<void>

export const useBorrowControllerGetOwnerReservations = <TData = Awaited<ReturnType<typeof borrowControllerGetOwnerReservations>>, TError = ErrorType<void>>(
 userId: string, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof borrowControllerGetOwnerReservations>>, TError, TData>, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getBorrowControllerGetOwnerReservationsQueryKey(userId);

  

  const queryFn: QueryFunction<Awaited<ReturnType<typeof borrowControllerGetOwnerReservations>>> = ({ signal }) => borrowControllerGetOwnerReservations(userId, requestOptions, signal);

  const query = useQuery<Awaited<ReturnType<typeof borrowControllerGetOwnerReservations>>, TError, TData>(queryKey, queryFn, {enabled: !!(userId), ...queryOptions}) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

/**
 * @summary Returns all resrvations made by userId and book availability
 */
export const borrowControllerGetUserReservations = (
    userId: string,
 options?: SecondParameter<typeof customInstance>,signal?: AbortSignal
) => {
      return customInstance<BookReservation[]>(
      {url: `/api/borrow/reservations/user/${userId}`, method: 'get', signal
    },
      options);
    }
  

export const getBorrowControllerGetUserReservationsQueryKey = (userId: string,) => [`/api/borrow/reservations/user/${userId}`];

    
export type BorrowControllerGetUserReservationsQueryResult = NonNullable<Awaited<ReturnType<typeof borrowControllerGetUserReservations>>>
export type BorrowControllerGetUserReservationsQueryError = ErrorType<void>

export const useBorrowControllerGetUserReservations = <TData = Awaited<ReturnType<typeof borrowControllerGetUserReservations>>, TError = ErrorType<void>>(
 userId: string, options?: { query?:UseQueryOptions<Awaited<ReturnType<typeof borrowControllerGetUserReservations>>, TError, TData>, request?: SecondParameter<typeof customInstance>}

  ):  UseQueryResult<TData, TError> & { queryKey: QueryKey } => {

  const {query: queryOptions, request: requestOptions} = options ?? {};

  const queryKey = queryOptions?.queryKey ?? getBorrowControllerGetUserReservationsQueryKey(userId);

  

  const queryFn: QueryFunction<Awaited<ReturnType<typeof borrowControllerGetUserReservations>>> = ({ signal }) => borrowControllerGetUserReservations(userId, requestOptions, signal);

  const query = useQuery<Awaited<ReturnType<typeof borrowControllerGetUserReservations>>, TError, TData>(queryKey, queryFn, {enabled: !!(userId), ...queryOptions}) as  UseQueryResult<TData, TError> & { queryKey: QueryKey };

  query.queryKey = queryKey;

  return query;
}

/**
 * @summary Book owner accepts one reservation
 */
export const borrowControllerAcceptReservation = (
    reservationId: string,
 options?: SecondParameter<typeof customInstance>,) => {
      return customInstance<void>(
      {url: `/api/borrow/reservations/accept/${reservationId}`, method: 'put'
    },
      options);
    }
  


    export type BorrowControllerAcceptReservationMutationResult = NonNullable<Awaited<ReturnType<typeof borrowControllerAcceptReservation>>>
    
    export type BorrowControllerAcceptReservationMutationError = ErrorType<unknown>

    export const useBorrowControllerAcceptReservation = <TError = ErrorType<unknown>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof borrowControllerAcceptReservation>>, TError,{reservationId: string}, TContext>, request?: SecondParameter<typeof customInstance>}
) => {
      const {mutation: mutationOptions, request: requestOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof borrowControllerAcceptReservation>>, {reservationId: string}> = (props) => {
          const {reservationId} = props ?? {};

          return  borrowControllerAcceptReservation(reservationId,requestOptions)
        }

      return useMutation<Awaited<ReturnType<typeof borrowControllerAcceptReservation>>, TError, {reservationId: string}, TContext>(mutationFn, mutationOptions)
    }
    /**
 * @summary The owner got the book back, so it's available again
 */
export const borrowControllerReturnBook = (
    bookId: string,
 options?: SecondParameter<typeof customInstance>,) => {
      return customInstance<Book>(
      {url: `/api/borrow/reservations/return/${bookId}`, method: 'put'
    },
      options);
    }
  


    export type BorrowControllerReturnBookMutationResult = NonNullable<Awaited<ReturnType<typeof borrowControllerReturnBook>>>
    
    export type BorrowControllerReturnBookMutationError = ErrorType<void>

    export const useBorrowControllerReturnBook = <TError = ErrorType<void>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof borrowControllerReturnBook>>, TError,{bookId: string}, TContext>, request?: SecondParameter<typeof customInstance>}
) => {
      const {mutation: mutationOptions, request: requestOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof borrowControllerReturnBook>>, {bookId: string}> = (props) => {
          const {bookId} = props ?? {};

          return  borrowControllerReturnBook(bookId,requestOptions)
        }

      return useMutation<Awaited<ReturnType<typeof borrowControllerReturnBook>>, TError, {bookId: string}, TContext>(mutationFn, mutationOptions)
    }
    /**
 * @summary Cancel reservation
 */
export const borrowControllerCancelReservation = (
    reservationId: string,
 options?: SecondParameter<typeof customInstance>,) => {
      return customInstance<void>(
      {url: `/api/borrow/reservations/cancel/${reservationId}`, method: 'delete'
    },
      options);
    }
  


    export type BorrowControllerCancelReservationMutationResult = NonNullable<Awaited<ReturnType<typeof borrowControllerCancelReservation>>>
    
    export type BorrowControllerCancelReservationMutationError = ErrorType<unknown>

    export const useBorrowControllerCancelReservation = <TError = ErrorType<unknown>,
    
    TContext = unknown>(options?: { mutation?:UseMutationOptions<Awaited<ReturnType<typeof borrowControllerCancelReservation>>, TError,{reservationId: string}, TContext>, request?: SecondParameter<typeof customInstance>}
) => {
      const {mutation: mutationOptions, request: requestOptions} = options ?? {};

      


      const mutationFn: MutationFunction<Awaited<ReturnType<typeof borrowControllerCancelReservation>>, {reservationId: string}> = (props) => {
          const {reservationId} = props ?? {};

          return  borrowControllerCancelReservation(reservationId,requestOptions)
        }

      return useMutation<Awaited<ReturnType<typeof borrowControllerCancelReservation>>, TError, {reservationId: string}, TContext>(mutationFn, mutationOptions)
    }
    