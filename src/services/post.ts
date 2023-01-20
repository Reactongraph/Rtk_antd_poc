import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface IPost {
    userId: number;
    id: number;
    title: string;
    body: string;
}

export const postApi = createApi({
    reducerPath: 'postApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URL}` }),
    tagTypes: ['Post'],
    endpoints: (builder) => ({
      getPosts: builder.query<IPost[], void>({
          query: () => '/posts',
          transformResponse: (response: IPost[]) => response.slice(0, 12),
          providesTags: ['Post']
      }),
        addPost: builder.mutation({
            query: (payload) => ({
                url: '/posts',
                method: 'POST',
                body: payload,
                headers: {
                  'Content-type': 'application/json; charset=UTF-8',
                },
            }),
            invalidatesTags: ['Post']
      })
    }),
})
  
export const { useGetPostsQuery, useAddPostMutation } = postApi;