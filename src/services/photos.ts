import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export interface IPhotos {
    albumId: number,
    id: number,
    title: string,
    url: string,
    thumbnailUrl: string;
}

export const postApi = createApi({
    reducerPath: 'photosApi',
    baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URL}` }),
    tagTypes: ['Photos'],
    endpoints: (builder) => ({
      getPhotos: builder.query<IPhotos[], void>({
          query: () => '/posts',
          transformResponse: (response: IPhotos[]) => response.slice(0, 6),
          providesTags: ['Photos']
      }),
    }),
})
  
export const { useGetPhotosQuery,  } = postApi;