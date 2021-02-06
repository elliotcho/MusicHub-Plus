import { gql } from '@apollo/client';
import * as Apollo from '@apollo/client';
export type Maybe<T> = T | null;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Query = {
  __typename?: 'Query';
  me?: Maybe<User>;
  songs: PaginatedSongs;
  userSongs: PaginatedSongs;
  trendingSongs: PaginatedSongs;
};


export type QuerySongsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryUserSongsArgs = {
  cursor?: Maybe<Scalars['String']>;
  limit: Scalars['Int'];
};


export type QueryTrendingSongsArgs = {
  cursor?: Maybe<Scalars['Int']>;
  limit: Scalars['Int'];
};

export type User = {
  __typename?: 'User';
  id: Scalars['Float'];
  username: Scalars['String'];
  email: Scalars['String'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type PaginatedSongs = {
  __typename?: 'PaginatedSongs';
  songs: Array<Song>;
  hasMore: Scalars['Boolean'];
};

export type Song = {
  __typename?: 'Song';
  id: Scalars['Float'];
  title: Scalars['String'];
  name: Scalars['String'];
  url: Scalars['String'];
  uid: Scalars['Float'];
  user: User;
  ratingStatus?: Maybe<Scalars['Int']>;
  likes: Scalars['Float'];
  dislikes: Scalars['Float'];
  createdAt: Scalars['String'];
  updatedAt: Scalars['String'];
};

export type Mutation = {
  __typename?: 'Mutation';
  changeEmail: UserResponse;
  changePassword: UserResponse;
  forgotPassword: Scalars['Boolean'];
  register: UserResponse;
  login: UserResponse;
  logout: Scalars['Boolean'];
  dislikeSong: Scalars['Boolean'];
  likeSong: Scalars['Boolean'];
  deleteSong: Scalars['Boolean'];
  uploadSong: Scalars['Boolean'];
};


export type MutationChangeEmailArgs = {
  newEmail: Scalars['String'];
};


export type MutationChangePasswordArgs = {
  newPassword: Scalars['String'];
  token: Scalars['String'];
};


export type MutationForgotPasswordArgs = {
  email: Scalars['String'];
};


export type MutationRegisterArgs = {
  input: RegisterInput;
};


export type MutationLoginArgs = {
  input: LoginInput;
};


export type MutationDislikeSongArgs = {
  songId: Scalars['Int'];
};


export type MutationLikeSongArgs = {
  songId: Scalars['Int'];
};


export type MutationDeleteSongArgs = {
  id: Scalars['Int'];
};


export type MutationUploadSongArgs = {
  title: Scalars['String'];
  file: Scalars['Upload'];
};

export type UserResponse = {
  __typename?: 'UserResponse';
  errors?: Maybe<Array<FieldError>>;
  user?: Maybe<User>;
};

export type FieldError = {
  __typename?: 'FieldError';
  field: Scalars['String'];
  message: Scalars['String'];
};

export type RegisterInput = {
  username: Scalars['String'];
  email: Scalars['String'];
  password: Scalars['String'];
};

export type LoginInput = {
  username: Scalars['String'];
  password: Scalars['String'];
};


export type SongSnippetFragment = (
  { __typename?: 'Song' }
  & Pick<Song, 'id' | 'title' | 'url' | 'ratingStatus' | 'createdAt' | 'dislikes' | 'likes'>
  & { user: (
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  ) }
);

export type ChangeEmailMutationVariables = Exact<{
  newEmail: Scalars['String'];
}>;


export type ChangeEmailMutation = (
  { __typename?: 'Mutation' }
  & { changeEmail: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type ChangePasswordMutationVariables = Exact<{
  newPassword: Scalars['String'];
  token: Scalars['String'];
}>;


export type ChangePasswordMutation = (
  { __typename?: 'Mutation' }
  & { changePassword: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type DeleteSongMutationVariables = Exact<{
  id: Scalars['Int'];
}>;


export type DeleteSongMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'deleteSong'>
);

export type DislikeSongMutationVariables = Exact<{
  songId: Scalars['Int'];
}>;


export type DislikeSongMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'dislikeSong'>
);

export type ForgotPasswordMutationVariables = Exact<{
  email: Scalars['String'];
}>;


export type ForgotPasswordMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'forgotPassword'>
);

export type LikeSongMutationVariables = Exact<{
  songId: Scalars['Int'];
}>;


export type LikeSongMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'likeSong'>
);

export type LoginMutationVariables = Exact<{
  input: LoginInput;
}>;


export type LoginMutation = (
  { __typename?: 'Mutation' }
  & { login: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type LogoutMutationVariables = Exact<{ [key: string]: never; }>;


export type LogoutMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'logout'>
);

export type RegisterMutationVariables = Exact<{
  input: RegisterInput;
}>;


export type RegisterMutation = (
  { __typename?: 'Mutation' }
  & { register: (
    { __typename?: 'UserResponse' }
    & { user?: Maybe<(
      { __typename?: 'User' }
      & Pick<User, 'id' | 'username'>
    )>, errors?: Maybe<Array<(
      { __typename?: 'FieldError' }
      & Pick<FieldError, 'field' | 'message'>
    )>> }
  ) }
);

export type UploadSongMutationVariables = Exact<{
  file: Scalars['Upload'];
  title: Scalars['String'];
}>;


export type UploadSongMutation = (
  { __typename?: 'Mutation' }
  & Pick<Mutation, 'uploadSong'>
);

export type MeQueryVariables = Exact<{ [key: string]: never; }>;


export type MeQuery = (
  { __typename?: 'Query' }
  & { me?: Maybe<(
    { __typename?: 'User' }
    & Pick<User, 'id' | 'username'>
  )> }
);

export type SongsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type SongsQuery = (
  { __typename?: 'Query' }
  & { songs: (
    { __typename?: 'PaginatedSongs' }
    & Pick<PaginatedSongs, 'hasMore'>
    & { songs: Array<(
      { __typename?: 'Song' }
      & SongSnippetFragment
    )> }
  ) }
);

export type TrendingSongsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor: Scalars['Int'];
}>;


export type TrendingSongsQuery = (
  { __typename?: 'Query' }
  & { trendingSongs: (
    { __typename?: 'PaginatedSongs' }
    & Pick<PaginatedSongs, 'hasMore'>
    & { songs: Array<(
      { __typename?: 'Song' }
      & SongSnippetFragment
    )> }
  ) }
);

export type UserSongsQueryVariables = Exact<{
  limit: Scalars['Int'];
  cursor?: Maybe<Scalars['String']>;
}>;


export type UserSongsQuery = (
  { __typename?: 'Query' }
  & { userSongs: (
    { __typename?: 'PaginatedSongs' }
    & Pick<PaginatedSongs, 'hasMore'>
    & { songs: Array<(
      { __typename?: 'Song' }
      & SongSnippetFragment
    )> }
  ) }
);

export const SongSnippetFragmentDoc = gql`
    fragment SongSnippet on Song {
  id
  title
  url
  ratingStatus
  createdAt
  dislikes
  likes
  user {
    id
    username
  }
}
    `;
export const ChangeEmailDocument = gql`
    mutation ChangeEmail($newEmail: String!) {
  changeEmail(newEmail: $newEmail) {
    user {
      id
      username
    }
    errors {
      field
      message
    }
  }
}
    `;
export type ChangeEmailMutationFn = Apollo.MutationFunction<ChangeEmailMutation, ChangeEmailMutationVariables>;

/**
 * __useChangeEmailMutation__
 *
 * To run a mutation, you first call `useChangeEmailMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangeEmailMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changeEmailMutation, { data, loading, error }] = useChangeEmailMutation({
 *   variables: {
 *      newEmail: // value for 'newEmail'
 *   },
 * });
 */
export function useChangeEmailMutation(baseOptions?: Apollo.MutationHookOptions<ChangeEmailMutation, ChangeEmailMutationVariables>) {
        return Apollo.useMutation<ChangeEmailMutation, ChangeEmailMutationVariables>(ChangeEmailDocument, baseOptions);
      }
export type ChangeEmailMutationHookResult = ReturnType<typeof useChangeEmailMutation>;
export type ChangeEmailMutationResult = Apollo.MutationResult<ChangeEmailMutation>;
export type ChangeEmailMutationOptions = Apollo.BaseMutationOptions<ChangeEmailMutation, ChangeEmailMutationVariables>;
export const ChangePasswordDocument = gql`
    mutation ChangePassword($newPassword: String!, $token: String!) {
  changePassword(newPassword: $newPassword, token: $token) {
    user {
      id
      username
    }
    errors {
      field
      message
    }
  }
}
    `;
export type ChangePasswordMutationFn = Apollo.MutationFunction<ChangePasswordMutation, ChangePasswordMutationVariables>;

/**
 * __useChangePasswordMutation__
 *
 * To run a mutation, you first call `useChangePasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useChangePasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [changePasswordMutation, { data, loading, error }] = useChangePasswordMutation({
 *   variables: {
 *      newPassword: // value for 'newPassword'
 *      token: // value for 'token'
 *   },
 * });
 */
export function useChangePasswordMutation(baseOptions?: Apollo.MutationHookOptions<ChangePasswordMutation, ChangePasswordMutationVariables>) {
        return Apollo.useMutation<ChangePasswordMutation, ChangePasswordMutationVariables>(ChangePasswordDocument, baseOptions);
      }
export type ChangePasswordMutationHookResult = ReturnType<typeof useChangePasswordMutation>;
export type ChangePasswordMutationResult = Apollo.MutationResult<ChangePasswordMutation>;
export type ChangePasswordMutationOptions = Apollo.BaseMutationOptions<ChangePasswordMutation, ChangePasswordMutationVariables>;
export const DeleteSongDocument = gql`
    mutation DeleteSong($id: Int!) {
  deleteSong(id: $id)
}
    `;
export type DeleteSongMutationFn = Apollo.MutationFunction<DeleteSongMutation, DeleteSongMutationVariables>;

/**
 * __useDeleteSongMutation__
 *
 * To run a mutation, you first call `useDeleteSongMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDeleteSongMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [deleteSongMutation, { data, loading, error }] = useDeleteSongMutation({
 *   variables: {
 *      id: // value for 'id'
 *   },
 * });
 */
export function useDeleteSongMutation(baseOptions?: Apollo.MutationHookOptions<DeleteSongMutation, DeleteSongMutationVariables>) {
        return Apollo.useMutation<DeleteSongMutation, DeleteSongMutationVariables>(DeleteSongDocument, baseOptions);
      }
export type DeleteSongMutationHookResult = ReturnType<typeof useDeleteSongMutation>;
export type DeleteSongMutationResult = Apollo.MutationResult<DeleteSongMutation>;
export type DeleteSongMutationOptions = Apollo.BaseMutationOptions<DeleteSongMutation, DeleteSongMutationVariables>;
export const DislikeSongDocument = gql`
    mutation DislikeSong($songId: Int!) {
  dislikeSong(songId: $songId)
}
    `;
export type DislikeSongMutationFn = Apollo.MutationFunction<DislikeSongMutation, DislikeSongMutationVariables>;

/**
 * __useDislikeSongMutation__
 *
 * To run a mutation, you first call `useDislikeSongMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useDislikeSongMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [dislikeSongMutation, { data, loading, error }] = useDislikeSongMutation({
 *   variables: {
 *      songId: // value for 'songId'
 *   },
 * });
 */
export function useDislikeSongMutation(baseOptions?: Apollo.MutationHookOptions<DislikeSongMutation, DislikeSongMutationVariables>) {
        return Apollo.useMutation<DislikeSongMutation, DislikeSongMutationVariables>(DislikeSongDocument, baseOptions);
      }
export type DislikeSongMutationHookResult = ReturnType<typeof useDislikeSongMutation>;
export type DislikeSongMutationResult = Apollo.MutationResult<DislikeSongMutation>;
export type DislikeSongMutationOptions = Apollo.BaseMutationOptions<DislikeSongMutation, DislikeSongMutationVariables>;
export const ForgotPasswordDocument = gql`
    mutation ForgotPassword($email: String!) {
  forgotPassword(email: $email)
}
    `;
export type ForgotPasswordMutationFn = Apollo.MutationFunction<ForgotPasswordMutation, ForgotPasswordMutationVariables>;

/**
 * __useForgotPasswordMutation__
 *
 * To run a mutation, you first call `useForgotPasswordMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useForgotPasswordMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [forgotPasswordMutation, { data, loading, error }] = useForgotPasswordMutation({
 *   variables: {
 *      email: // value for 'email'
 *   },
 * });
 */
export function useForgotPasswordMutation(baseOptions?: Apollo.MutationHookOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>) {
        return Apollo.useMutation<ForgotPasswordMutation, ForgotPasswordMutationVariables>(ForgotPasswordDocument, baseOptions);
      }
export type ForgotPasswordMutationHookResult = ReturnType<typeof useForgotPasswordMutation>;
export type ForgotPasswordMutationResult = Apollo.MutationResult<ForgotPasswordMutation>;
export type ForgotPasswordMutationOptions = Apollo.BaseMutationOptions<ForgotPasswordMutation, ForgotPasswordMutationVariables>;
export const LikeSongDocument = gql`
    mutation LikeSong($songId: Int!) {
  likeSong(songId: $songId)
}
    `;
export type LikeSongMutationFn = Apollo.MutationFunction<LikeSongMutation, LikeSongMutationVariables>;

/**
 * __useLikeSongMutation__
 *
 * To run a mutation, you first call `useLikeSongMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLikeSongMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [likeSongMutation, { data, loading, error }] = useLikeSongMutation({
 *   variables: {
 *      songId: // value for 'songId'
 *   },
 * });
 */
export function useLikeSongMutation(baseOptions?: Apollo.MutationHookOptions<LikeSongMutation, LikeSongMutationVariables>) {
        return Apollo.useMutation<LikeSongMutation, LikeSongMutationVariables>(LikeSongDocument, baseOptions);
      }
export type LikeSongMutationHookResult = ReturnType<typeof useLikeSongMutation>;
export type LikeSongMutationResult = Apollo.MutationResult<LikeSongMutation>;
export type LikeSongMutationOptions = Apollo.BaseMutationOptions<LikeSongMutation, LikeSongMutationVariables>;
export const LoginDocument = gql`
    mutation Login($input: LoginInput!) {
  login(input: $input) {
    user {
      id
      username
    }
    errors {
      field
      message
    }
  }
}
    `;
export type LoginMutationFn = Apollo.MutationFunction<LoginMutation, LoginMutationVariables>;

/**
 * __useLoginMutation__
 *
 * To run a mutation, you first call `useLoginMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLoginMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [loginMutation, { data, loading, error }] = useLoginMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useLoginMutation(baseOptions?: Apollo.MutationHookOptions<LoginMutation, LoginMutationVariables>) {
        return Apollo.useMutation<LoginMutation, LoginMutationVariables>(LoginDocument, baseOptions);
      }
export type LoginMutationHookResult = ReturnType<typeof useLoginMutation>;
export type LoginMutationResult = Apollo.MutationResult<LoginMutation>;
export type LoginMutationOptions = Apollo.BaseMutationOptions<LoginMutation, LoginMutationVariables>;
export const LogoutDocument = gql`
    mutation Logout {
  logout
}
    `;
export type LogoutMutationFn = Apollo.MutationFunction<LogoutMutation, LogoutMutationVariables>;

/**
 * __useLogoutMutation__
 *
 * To run a mutation, you first call `useLogoutMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useLogoutMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [logoutMutation, { data, loading, error }] = useLogoutMutation({
 *   variables: {
 *   },
 * });
 */
export function useLogoutMutation(baseOptions?: Apollo.MutationHookOptions<LogoutMutation, LogoutMutationVariables>) {
        return Apollo.useMutation<LogoutMutation, LogoutMutationVariables>(LogoutDocument, baseOptions);
      }
export type LogoutMutationHookResult = ReturnType<typeof useLogoutMutation>;
export type LogoutMutationResult = Apollo.MutationResult<LogoutMutation>;
export type LogoutMutationOptions = Apollo.BaseMutationOptions<LogoutMutation, LogoutMutationVariables>;
export const RegisterDocument = gql`
    mutation Register($input: RegisterInput!) {
  register(input: $input) {
    user {
      id
      username
    }
    errors {
      field
      message
    }
  }
}
    `;
export type RegisterMutationFn = Apollo.MutationFunction<RegisterMutation, RegisterMutationVariables>;

/**
 * __useRegisterMutation__
 *
 * To run a mutation, you first call `useRegisterMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useRegisterMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [registerMutation, { data, loading, error }] = useRegisterMutation({
 *   variables: {
 *      input: // value for 'input'
 *   },
 * });
 */
export function useRegisterMutation(baseOptions?: Apollo.MutationHookOptions<RegisterMutation, RegisterMutationVariables>) {
        return Apollo.useMutation<RegisterMutation, RegisterMutationVariables>(RegisterDocument, baseOptions);
      }
export type RegisterMutationHookResult = ReturnType<typeof useRegisterMutation>;
export type RegisterMutationResult = Apollo.MutationResult<RegisterMutation>;
export type RegisterMutationOptions = Apollo.BaseMutationOptions<RegisterMutation, RegisterMutationVariables>;
export const UploadSongDocument = gql`
    mutation UploadSong($file: Upload!, $title: String!) {
  uploadSong(file: $file, title: $title)
}
    `;
export type UploadSongMutationFn = Apollo.MutationFunction<UploadSongMutation, UploadSongMutationVariables>;

/**
 * __useUploadSongMutation__
 *
 * To run a mutation, you first call `useUploadSongMutation` within a React component and pass it any options that fit your needs.
 * When your component renders, `useUploadSongMutation` returns a tuple that includes:
 * - A mutate function that you can call at any time to execute the mutation
 * - An object with fields that represent the current status of the mutation's execution
 *
 * @param baseOptions options that will be passed into the mutation, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options-2;
 *
 * @example
 * const [uploadSongMutation, { data, loading, error }] = useUploadSongMutation({
 *   variables: {
 *      file: // value for 'file'
 *      title: // value for 'title'
 *   },
 * });
 */
export function useUploadSongMutation(baseOptions?: Apollo.MutationHookOptions<UploadSongMutation, UploadSongMutationVariables>) {
        return Apollo.useMutation<UploadSongMutation, UploadSongMutationVariables>(UploadSongDocument, baseOptions);
      }
export type UploadSongMutationHookResult = ReturnType<typeof useUploadSongMutation>;
export type UploadSongMutationResult = Apollo.MutationResult<UploadSongMutation>;
export type UploadSongMutationOptions = Apollo.BaseMutationOptions<UploadSongMutation, UploadSongMutationVariables>;
export const MeDocument = gql`
    query Me {
  me {
    id
    username
  }
}
    `;

/**
 * __useMeQuery__
 *
 * To run a query within a React component, call `useMeQuery` and pass it any options that fit your needs.
 * When your component renders, `useMeQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useMeQuery({
 *   variables: {
 *   },
 * });
 */
export function useMeQuery(baseOptions?: Apollo.QueryHookOptions<MeQuery, MeQueryVariables>) {
        return Apollo.useQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
      }
export function useMeLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<MeQuery, MeQueryVariables>) {
          return Apollo.useLazyQuery<MeQuery, MeQueryVariables>(MeDocument, baseOptions);
        }
export type MeQueryHookResult = ReturnType<typeof useMeQuery>;
export type MeLazyQueryHookResult = ReturnType<typeof useMeLazyQuery>;
export type MeQueryResult = Apollo.QueryResult<MeQuery, MeQueryVariables>;
export const SongsDocument = gql`
    query Songs($limit: Int!, $cursor: String) {
  songs(limit: $limit, cursor: $cursor) {
    hasMore
    songs {
      ...SongSnippet
    }
  }
}
    ${SongSnippetFragmentDoc}`;

/**
 * __useSongsQuery__
 *
 * To run a query within a React component, call `useSongsQuery` and pass it any options that fit your needs.
 * When your component renders, `useSongsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useSongsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useSongsQuery(baseOptions: Apollo.QueryHookOptions<SongsQuery, SongsQueryVariables>) {
        return Apollo.useQuery<SongsQuery, SongsQueryVariables>(SongsDocument, baseOptions);
      }
export function useSongsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<SongsQuery, SongsQueryVariables>) {
          return Apollo.useLazyQuery<SongsQuery, SongsQueryVariables>(SongsDocument, baseOptions);
        }
export type SongsQueryHookResult = ReturnType<typeof useSongsQuery>;
export type SongsLazyQueryHookResult = ReturnType<typeof useSongsLazyQuery>;
export type SongsQueryResult = Apollo.QueryResult<SongsQuery, SongsQueryVariables>;
export const TrendingSongsDocument = gql`
    query trendingSongs($limit: Int!, $cursor: Int!) {
  trendingSongs(limit: $limit, cursor: $cursor) {
    hasMore
    songs {
      ...SongSnippet
    }
  }
}
    ${SongSnippetFragmentDoc}`;

/**
 * __useTrendingSongsQuery__
 *
 * To run a query within a React component, call `useTrendingSongsQuery` and pass it any options that fit your needs.
 * When your component renders, `useTrendingSongsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useTrendingSongsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useTrendingSongsQuery(baseOptions: Apollo.QueryHookOptions<TrendingSongsQuery, TrendingSongsQueryVariables>) {
        return Apollo.useQuery<TrendingSongsQuery, TrendingSongsQueryVariables>(TrendingSongsDocument, baseOptions);
      }
export function useTrendingSongsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<TrendingSongsQuery, TrendingSongsQueryVariables>) {
          return Apollo.useLazyQuery<TrendingSongsQuery, TrendingSongsQueryVariables>(TrendingSongsDocument, baseOptions);
        }
export type TrendingSongsQueryHookResult = ReturnType<typeof useTrendingSongsQuery>;
export type TrendingSongsLazyQueryHookResult = ReturnType<typeof useTrendingSongsLazyQuery>;
export type TrendingSongsQueryResult = Apollo.QueryResult<TrendingSongsQuery, TrendingSongsQueryVariables>;
export const UserSongsDocument = gql`
    query UserSongs($limit: Int!, $cursor: String) {
  userSongs(limit: $limit, cursor: $cursor) {
    hasMore
    songs {
      ...SongSnippet
    }
  }
}
    ${SongSnippetFragmentDoc}`;

/**
 * __useUserSongsQuery__
 *
 * To run a query within a React component, call `useUserSongsQuery` and pass it any options that fit your needs.
 * When your component renders, `useUserSongsQuery` returns an object from Apollo Client that contains loading, error, and data properties
 * you can use to render your UI.
 *
 * @param baseOptions options that will be passed into the query, supported options are listed on: https://www.apollographql.com/docs/react/api/react-hooks/#options;
 *
 * @example
 * const { data, loading, error } = useUserSongsQuery({
 *   variables: {
 *      limit: // value for 'limit'
 *      cursor: // value for 'cursor'
 *   },
 * });
 */
export function useUserSongsQuery(baseOptions: Apollo.QueryHookOptions<UserSongsQuery, UserSongsQueryVariables>) {
        return Apollo.useQuery<UserSongsQuery, UserSongsQueryVariables>(UserSongsDocument, baseOptions);
      }
export function useUserSongsLazyQuery(baseOptions?: Apollo.LazyQueryHookOptions<UserSongsQuery, UserSongsQueryVariables>) {
          return Apollo.useLazyQuery<UserSongsQuery, UserSongsQueryVariables>(UserSongsDocument, baseOptions);
        }
export type UserSongsQueryHookResult = ReturnType<typeof useUserSongsQuery>;
export type UserSongsLazyQueryHookResult = ReturnType<typeof useUserSongsLazyQuery>;
export type UserSongsQueryResult = Apollo.QueryResult<UserSongsQuery, UserSongsQueryVariables>;