// Need to use the React-specific entry point to allow generating React hooks
import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { environment } from '../../environments/environment';
import { Comment } from '../../types/api/comment';

// Define a service using a base URL and expected endpoints
export const commentsApi = createApi({
  reducerPath: 'commentsApi',
  baseQuery: fetchBaseQuery({ baseUrl: environment.commentsServiceApi }),
  endpoints: (builder) => ({
    getAllComments: builder.query<Comment[], null>({
      query: () => `comments`,
    }),
  }),
});

// Export hooks for usage in function components, which are
// auto-generated based on the defined endpoints
export const { useGetAllCommentsQuery } = commentsApi;
