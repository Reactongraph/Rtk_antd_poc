import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export interface ICompany {
  name: string;
  catchPhrase: string;
  bs: string;
}

export interface IGeoLocation {
  lat: number;
  lng: number;
}

export interface IAddress {
  street: string;
  suite: string;
  city: string;
  zipcode: number;
  geo: IGeoLocation;
}

export interface IUser {
  id: number;
  name: string;
  username: string;
  email: string;
  address: IAddress;
  phone: string;
  website: string;
  company: ICompany;
}

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({ baseUrl: `${process.env.REACT_APP_API_URL}` }),
  tagTypes: ["Users"],
  endpoints: (builder) => ({
    getUsers: builder.query<IUser[], void>({
      query: () => "/users",
      transformResponse: (response: IUser[]) => response.slice(0, 12),
      providesTags: ["Users"],
    }),
  }),
});

export const { useGetUsersQuery } = userApi;
