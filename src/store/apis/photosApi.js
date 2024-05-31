import { faker } from "@faker-js/faker";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const photosApi = createApi({
  reducerPath: "photos",
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:3005",
    fetchFn: async (...args) => {
      await delay(800);
      return fetch(...args);
    },
  }),
  endpoints(builder) {
    return {
      fetchPhotos: builder.query({
        providesTags: (result, error, arg) => {
          const tags = result.map((pic) => {
            return {
              type: "photos",
              id: pic.id,
            };
          });

          tags.push({
            type: "albPhotos",
            id: arg,
          });

          return tags;
        },
        query: (albumId) => {
          return {
            url: "/photos",
            params: {
              albumId: albumId,
            },
            method: "GET",
          };
        },
      }),
      addPhoto: builder.mutation({
        invalidatesTags: (results, error, arg) => {
          return [
            {
              type: "albPhotos",
              id: arg,
            },
          ];
        },
        query: (albumId) => {
          return {
            url: "/photos",
            method: "POST",
            body: {
              albumId: albumId,
              url: faker.image.abstract(150, 150, true),
            },
          };
        },
      }),
      deletePhoto: builder.mutation({
        invalidatesTags: (result, error, arg) => {
          return [
            {
              type: "photos",
              id: arg,
            },
          ];
        },
        query: (photoId) => {
          return {
            url: `/photos/${photoId}`,
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
  useFetchPhotosQuery,
  useAddPhotoMutation,
  useDeletePhotoMutation,
} = photosApi;

export { photosApi };
