// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { environment } from '../../environments/environment';
import { Comment, CommentInstance } from '../../types/api/comment';

// Define a service using a base URL and expected endpoints
export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: environment.commentsServiceApi }),
  tagTypes: ['Comments'],
  endpoints: (builder) => ({
    getAllComments: builder.query<Comment[], null>({
      query: () => `comments`,
      providesTags: (result) =>
        result ? result.map(({ id }) => ({ type: 'Comments', id })) : [],
    }),
    getCommentById: builder.query<Comment, string | number>({
      query: (id) => `comments/${id}`,
    }),
    updateComment: builder.mutation<Comment, Comment>({
      query: (comment) => ({
        url: `comments/${comment.id}`,
        method: 'PUT',
        body: comment,
      }),
      invalidatesTags: ['Comments'],
    }),
    createComment: builder.mutation<Comment, CommentInstance>({
      query: (comment) => ({
        url: `comments`,
        method: 'POST',
        body: comment,
      }),
      invalidatesTags: ['Comments'],
    }),
    deleteComment: builder.mutation<null, number>({
      query: (id) => ({
        url: `comments/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['Comments'],
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const {
  useGetAllCommentsQuery,
  useGetCommentByIdQuery,
  useLazyGetCommentByIdQuery,
  useUpdateCommentMutation,
  useDeleteCommentMutation,
  useCreateCommentMutation,
} = commentsApi;
