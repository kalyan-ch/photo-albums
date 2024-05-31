import { faker } from "@faker-js/faker";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const albumsApi = createApi({
  reducerPath: "albums",

  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
    fetchFn: async (...args) => {
      await delay(800);
      return fetch(...args);
    },
  }),

  endpoints(builder) {
    return {
      fetchAlbums: builder.query({
        providesTags: (result, error, arg) => {
          const tags = result.map((album) => {
            return { type: "albums", id: album.id };
          });

          tags.push({
            type: "userAlbums",
            id: arg
          })

          return tags;
        },
        query: (userId) => {
          return {
            url: "/albums",
            params: {
              userId: userId,
            },
            method: "GET",
          };
        },
      }),
      addAlbum: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          return [
            {
              type: "userAlbums",
              id: arg,
            },
          ];
        },
        query: (userId) => {
          return {
            url: "/albums",
            method: "POST",
            body: {
              userId: userId,
              title: faker.commerce.productName(),
            },
          };
        },
      }),
      deleteAlbum: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          return [
            {
              type: "albums",
              id: arg.id,
            },
          ];
        },
        query: (album) => {
          return {
            url: `/albums/${album.id}`,
            method: "DELETE",
          };
        },
      }),
    };
  },
});

const delay = (duration) => {
  return new Promise((resolve) => {
    setTimeout(resolve, duration);
  });
};

export const {
  useFetchAlbumsQuery,
  useAddAlbumMutation,
  useDeleteAlbumMutation,
} = albumsApi;
export { albumsApi };
